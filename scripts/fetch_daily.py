#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
心动小镇攻略手账 · 每日情报管道 v2.1
====================================

v2.1 相比 v2.0 的修复与增强：
  1. 兑换码改用 TapTap 评论 API 抓取 —— 每日码已迁移到主帖评论区
     （作者「努力再努力」每日 ~18:00 发布，最新一条会被置顶），帖子正文
     不再包含当日码，HTML 抓取自 9 月下旬起持续抓空。评论 API 按评论
     created_time 的北京时间归属日期，精确到天，杜绝串日/捞旧码。
     接口注意：limit 上限 20、from 为偏移量、必须携带 X-UA 头。
  2. 质量保护：同日低分不覆盖高分；空数据不覆盖任何旧数据

v2.0 相比 v1.0 的修复与增强：
  1. 目标日期按北京时间计算 —— 修复 GitHub Actions runner（UTC）凌晨任务
     日期错位一天导致抓旧数据的 bug
  2. 天气自动学习 —— 解析帖子里的「今日天气」分相与「N日 周X 天气」预告，
     写回 data-src/weather-calendar.json（人工条目永不被覆盖，auto 条目可被修正）
  3. 由日历自动生成 4 语言 data/weather*.js（zh/en/ja/ko），phases 结构化存储，
     标签/图标/提示按语言派生
  4. 物资点位动态建条 —— 种子没有当日条目时自动创建溜溜橡木/无瑕萤石
  5. 聚合页（话题标签/策略库/论坛）按帖子日期切分后再提取，
     兑换码/物资/天气都归属到正确的日期，杜绝跨帖串数据
  6. 源抓取失败自动重试；同日数据质量保护（低分不覆盖高分）

用法：
    python fetch_daily.py                     # 在线模式（默认今天，北京时间）
    python fetch_daily.py --offline           # 离线模式：仅用本地日历 + 种子
    python fetch_daily.py --date 2026-09-22   # 指定日期
    python fetch_daily.py --dry-run           # 只打印，不写文件

产出：
    data/daily.json / data/daily.js                    每日情报（页面直接加载）
    data-src/weather-calendar.json                     天气日历（学习有变更时）
    data/weather.js / weather-{en,ja,ko}.js            4 语言天气日历（有变更时）
    logs/fetch_YYYYMMDD_HHMMSS.log                     审计日志

退出码：0 = 有任一有效数据（天气/兑换码/物资），或早间运行源可达但当日帖未发布；
       1 = 离线模式无数据 / 所有在线源不可达 / 晚间兜底(北京≥20点)仍无当日数据
"""

import argparse
import html as html_mod
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
SRC_DIR = ROOT / "data-src"
LOG_DIR = ROOT / "logs"

WEATHER_CAL = SRC_DIR / "weather-calendar.json"
SEED = SRC_DIR / "seed-daily.json"
OUT_JSON = DATA_DIR / "daily.json"
OUT_JS = DATA_DIR / "daily.js"
WEATHER_JS = {
    "zh": DATA_DIR / "weather.js",
    "en": DATA_DIR / "weather-en.js",
    "ja": DATA_DIR / "weather-ja.js",
    "ko": DATA_DIR / "weather-ko.js",
}

BJT = timezone(timedelta(hours=8))
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")
CODE_RE = re.compile(r"\b([A-Z0-9]{7})\b")
CODE_BLACKLIST = {"JAVASCR", "CHARSET", "ENCODE", "DEFAULT", "DISPLAY", "CONTENT"}
WEEKDAYS = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]

# TapTap 评论 API：每日兑换码由作者「努力再努力」以评论形式发布（约 18:00），
# 帖子正文不再包含当日码，HTML 抓取拿不到 —— 评论 API 是兑换码的权威源。
# 注意：limit 上限 20（50/100 会 400）；from 为偏移量；X-UA 必须携带。
COMMENT_API = "https://www.taptap.cn/webapiv2/moment-comment/v1/by-moment"
XUA_HEADER = ("V=1&PN=WebApp&LANG=zh_CN&VN_CODE=100000000&LOC=CN&PLT=PC&DS=Android"
              "&UID=11111111-2222-3333-4444-555555555555&OS=Windows&OSV=10&DT=PC")

# 学习窗口：只回填最近 N 天内的历史（防止策略库旧帖无限膨胀日历）
LEARN_PAST_DAYS = 10


def log(msg):
    print(msg, flush=True)


def today_bjt():
    return datetime.now(BJT).date()


def load_json(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except (OSError, json.JSONDecodeError) as e:
        log(f"  [warn] 读取失败 {path.name}: {e}")
        return None


# ---------------------------------------------------------------- HTTP

def quote_url(url):
    p = urllib.parse.urlsplit(url)
    path = urllib.parse.quote(p.path, safe="/%")
    return urllib.parse.urlunsplit((p.scheme, p.netloc, path, p.query, p.fragment))


def http_get(url, timeout=12):
    req = urllib.request.Request(quote_url(url), headers={
        "User-Agent": UA,
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "zh-CN,zh;q=0.9",
    })
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read().decode("utf-8", errors="replace")


def fetch_source(src, retries=2):
    """抓单个监控源（失败重试），返回 (ok, text_or_error)。"""
    for attempt in range(retries):
        try:
            return True, http_get(src["url"])
        except (urllib.error.URLError, TimeoutError, OSError) as e:
            if attempt + 1 < retries:
                time.sleep(3)
                continue
            return False, f"{type(e).__name__}: {e}"


# ---------------------------------------------------------------- 评论 API（兑换码权威源）

def comment_text(c):
    """评论正文：contents 为 {json: [{children: [{text}]}]} 富文本结构。"""
    cont = c.get("contents")
    if isinstance(cont, str):
        try:
            cont = json.loads(cont)
        except Exception:
            return cont or ""
    if isinstance(cont, dict):
        blocks = cont.get("json") or []
    elif isinstance(cont, list):
        blocks = cont
    else:
        return ""
    parts = []
    for b in blocks if isinstance(blocks, list) else []:
        if isinstance(b, dict):
            for ch in b.get("children", []):
                if isinstance(ch, dict) and ch.get("text"):
                    parts.append(str(ch["text"]))
    return " ".join(parts)


def fetch_comment_codes(moment_id, target, tries=3):
    """从评论 API 提取【当日】兑换码。

    作者每日 ~18:00 发布一条仅含码的评论（最新一条会被置顶）。
    按评论 created_time 的北京时间归属日期，天然精确，无需文本日期匹配。
    第一页（最新 20 条）足以覆盖最近半个月的每日码。
    返回 [(code, is_pinned, author, hh:mm)]；抓取失败抛异常由调用方记录。
    """
    url = (f"{COMMENT_API}?moment_id={moment_id}&sort=created_at&order=desc"
           f"&regulate_all=false&group_id=4761&limit=20")
    last_err = None
    for attempt in range(tries):
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": UA, "X-UA": XUA_HEADER, "Accept": "application/json"})
            with urllib.request.urlopen(req, timeout=20) as resp:
                data = json.loads(resp.read().decode("utf-8", errors="replace"))
            break
        except (urllib.error.URLError, TimeoutError, OSError, json.JSONDecodeError) as e:
            last_err = e
            if attempt + 1 < tries:
                time.sleep(3)
    else:
        raise last_err

    out = []
    for c in (data.get("data") or {}).get("list") or []:
        ts = c.get("created_time")
        if not ts:
            continue
        if datetime.fromtimestamp(ts, BJT).date() != target:
            continue
        text = comment_text(c)
        for code in CODE_RE.findall(text):
            if (code in CODE_BLACKLIST or not re.search(r"[A-Z]", code)
                    or not re.search(r"\d", code)):
                continue
            if code not in [x[0] for x in out]:
                hm = datetime.fromtimestamp(ts, BJT).strftime("%H:%M")
                out.append((code, bool(c.get("is_top_comment")),
                            (c.get("author") or {}).get("name", "?"), hm))
    return out


def strip_html(html):
    t = re.sub(r"<[^>]+>", " ", html)
    t = t.replace("\\n", " ").replace("\\t", " ").replace("\\r", " ")
    t = html_mod.unescape(t)
    return re.sub(r"\s+", " ", t).strip()


# ---------------------------------------------------------------- 天气模型

TYPE_ZH = {"sunny": "晴", "rain": "雨", "rainbow": "彩虹", "meteor": "流星雨",
           "snow": "雪", "heat": "酷暑"}
TYPE_ICON = {"sunny": "☀️", "rain": "🌧️", "rainbow": "🌈", "meteor": "🌠",
             "snow": "❄️", "heat": "🔥"}
# fish 优先级：彩虹天限定鱼最值得提醒
FISH_PRIORITY = ["rainbow", "meteor", "rain", "snow"]
FISH_ZH = {
    "rainbow": "锤头鲨 · 彩虹鳟",
    "meteor": "流星雨限定采集（星陨矿石）",
    "rain": "沙白鱼 · 欧洲鳗鲡",
    "snow": "雪蟹 · 冰海天使",
}


def wx_types_in(token):
    """从文本片段识别天气类型（按出现顺序），流星雨中的「雨」不误判为雨。"""
    t = token
    found = []
    if "流星" in t:
        found.append("meteor")
        t = t.replace("流星雨", "").replace("流星", "")
    if "彩虹" in t:
        found.append("rainbow")
        t = t.replace("彩虹天", "").replace("彩虹", "")
    if "雨" in t:
        found.append("rain")
        t = re.sub(r"下雨天|雨天|下雨|雨", "", t)
    if "雪" in t:
        found.append("snow")
        t = re.sub(r"下雪天|雪天|下雪|雪", "", t)
    if "酷暑" in t:
        found.append("heat")
        t = t.replace("酷暑天", "").replace("酷暑", "")
    if "晴" in t:
        found.append("sunny")
    return found


def parse_phases(line):
    """解析一行天气文本 → phases 列表。
    支持「晴天 12-18点下雨天 18-24点彩虹天」「流星 18:00-24:00」「晴」。
    """
    phases = []
    for m in re.finditer(r"(\d{1,2})(?::\d{2})?\s*[-–~]\s*(\d{1,2})(?::\d{2})?\s*点?\s*", line):
        s, e = int(m.group(1)), int(m.group(2))
        if not (0 <= s < 24 and 0 < e <= 24 and s < e):
            continue
        rest = line[m.end():m.end() + 10]
        types = wx_types_in(rest) if rest else []
        if not types:
            before = line[max(0, m.start() - 8):m.start()]
            types = wx_types_in(before)
        for t in types:
            phases.append({"t": t, "s": s, "e": e})
    # 全日基线：第一个天气词出现在首个时段之前时作为基线
    m = re.search(r"晴天|晴|下雨天|雨天|下雨|彩虹天|彩虹|流星雨|流星|下雪天|雪天|下雪|酷暑天", line)
    if m:
        first_range = re.search(r"\d{1,2}\s*[-–~]\s*\d{1,2}", line)
        if not first_range or m.start() < first_range.start():
            for t in wx_types_in(m.group(0)):
                if not any(p["t"] == t and "s" not in p for p in phases):
                    phases.insert(0, {"t": t})
    return phases or None


def parse_today_weather(seg):
    """帖子段内的「今日天气」→ phases；主帖无该关键词时识别「流星 18:00-24:00」格式。"""
    m = re.search(
        r"(?:今日天气|小镇天气)\s*[:：]?\s*(.+?)"
        r"(?=\s*\d{1,2}日\s*周|\s*🎁|每日物资|活动时间表|⏰|溜溜|萤石|$)", seg)
    if m:
        return parse_phases(m.group(1))
    m2 = re.search(
        r"(流星雨|流星|彩虹天|彩虹|下雨天|雨天|下雪天|雪天|酷暑天)\s*"
        r"(\d{1,2})(?::\d{2})?\s*[-–~]\s*(\d{1,2})(?::\d{2})?", seg)
    if m2:
        key = wx_types_in(m2.group(1))[0]
        s, e = int(m2.group(2)), int(m2.group(3))
        return [{"t": key, "s": s, "e": e}, {"t": "sunny"}]
    return None


def type_sequence(phases):
    """按时间顺序输出类型序列（全日基线排在开头时段之后）。"""
    ranged = sorted([p for p in phases if "s" in p], key=lambda p: p["s"])
    base = [p["t"] for p in phases if "s" not in p]
    seq = []
    if not (ranged and ranged[0]["s"] == 0):
        seq.extend(base)
    for p in ranged:
        if p["t"] not in seq:
            seq.append(p["t"])
    for b in base:
        if b not in seq:
            seq.append(b)
    return seq


def derive_entry(phases):
    """phases → {label, icon, note, fish}（中文派生字段）。"""
    seq = type_sequence(phases)
    specials = [t for t in seq if t != "sunny"]
    if not specials:
        label, icon = "晴", "☀️"
    else:
        label = "转".join(TYPE_ZH[t] for t in seq)
        icon = "".join(TYPE_ICON[t] for t in specials) if len(specials) > 1 else TYPE_ICON[specials[0]]
    notes = []
    for p in sorted([p for p in phases if "s" in p and p["t"] != "sunny"], key=lambda p: p["s"]):
        notes.append(f"{p['s']:02d}:00-{p['e']:02d}:00 {TYPE_ZH[p['t']]}")
    note = "，".join(notes)
    fish = ""
    for t in FISH_PRIORITY:
        if t in specials:
            fish = FISH_ZH[t]
            break
    return {"label": label, "icon": icon, "note": note, "fish": fish}


# ---------------------------------------------------------------- 帖子切分

# 聚合页里每个帖子的日期标记（标题或正文头）
POST_MARKS = [
    re.compile(r"心动小镇\s*(\d{1,2})月(\d{1,2})日\s*星期[一二三四五六日天]"),   # 筱鑫正文头
    re.compile(r"(?<![\d.])(\d{1,2})\.(\d{1,2})(?![\d.])[）)\s]*(?:溜溜木|心动小镇)"),  # 9.21溜溜木 / 9.21心动小镇 标题
    re.compile(r"(\d{1,2})月(\d{1,2})日小镇日报"),                                # 主帖标题
    re.compile(r"(\d{1,2})月(\d{1,2})日位置播报"),                                # 位置播报帖
    re.compile(r"(\d{1,2})月(\d{1,2})日溜溜木和萤石位置"),                        # 呗呗标题
    re.compile(r"(\d{4})\.(\d{1,2})\.(\d{1,2})今日兑换码"),                       # 诗音 2026.9.21今日兑换码
]


def resolve_date(year, month, day, ref):
    """把帖子里的月日解析成合理年份（跨年/跨月容错）。"""
    if year is None:
        year = ref.year
        d = date(year, month, day)
        if d > ref + timedelta(days=183):
            d = date(year - 1, month, day)
        elif d < ref - timedelta(days=183):
            d = date(year + 1, month, day)
        return d
    return date(year, month, day)


def split_posts(text, ref):
    """把聚合页文本按帖子日期标记切分 → [(date, segment)]。"""
    marks = []
    for pat in POST_MARKS:
        for m in pat.finditer(text):
            g = m.groups()
            if len(g) == 3:
                y, mo, d = int(g[0]), int(g[1]), int(g[2])
            else:
                y, mo, d = None, int(g[0]), int(g[1])
            try:
                dt = resolve_date(y, mo, d, ref)
            except ValueError:
                continue
            marks.append((m.start(), dt))
    marks.sort(key=lambda x: x[0])
    out = []
    for i, (pos, dt) in enumerate(marks):
        end = marks[i + 1][0] if i + 1 < len(marks) else len(text)
        seg = text[pos:end]
        if out and out[-1][0] == dt and len(seg) < 10:
            continue
        out.append((dt, seg))
    return out


# ---------------------------------------------------------------- 段内提取

CODE_IN_SEG = re.compile(r"(?:今日)?(?:兑换码|礼包码)\s*[：:]?\s*([A-Z0-9]{7})\b")
CODE_DATE_AFTER = re.compile(r"\b([A-Z0-9]{7})\s*[（(]\s*(\d{1,2})月(\d{1,2})日")


def extract_codes_segment(seg, seg_date, target):
    """段内兑换码：归属段日期；另有「CODE（9月20日限定）」后置日期格式。"""
    codes = []
    for m in CODE_IN_SEG.finditer(seg):
        c = m.group(1)
        if c in CODE_BLACKLIST or not re.search(r"[A-Z]", c):
            continue
        if seg_date == target and c not in codes:
            codes.append(c)
    for m in CODE_DATE_AFTER.finditer(seg):
        c = m.group(1)
        if c in CODE_BLACKLIST or not re.search(r"[A-Z]", c):
            continue
        try:
            d = resolve_date(None, int(m.group(2)), int(m.group(3)), target)
        except ValueError:
            continue
        if d == target and c not in codes:
            codes.append(c)
    return codes


STONE_SPOTS = [("温泉山遗迹", "温泉山遗迹"), ("温泉山老家", "温泉山遗迹"), ("遗迹老家", "温泉山遗迹"),
               ("森林灵橡松林", "森林灵橡松林"), ("灵橡松林", "森林灵橡松林")]


def extract_res_segment(seg):
    """段内物资点位 → {wood: 位置, stone: 位置}。
    支持「溜溜橡木：12号（溜溜木）」「溜溜木在12号房」「溜溜木/橡木位置：12家园门口」
    「无瑕萤石：温泉山遗迹」「萤石在温泉山老家」等格式。
    """
    res = {}
    for aliases in (("溜溜橡木", "溜溜木", "橡木"), ("无瑕萤石", "无暇萤石", "萤石")):
        key = "wood" if "木" in aliases[0] else "stone"
        if key in res:
            continue
        for alias in aliases:
            hit = False
            for m in re.finditer(re.escape(alias), seg):
                win = seg[m.end(): m.end() + 30]
                if key == "wood":
                    hm = re.search(r"(\d{1,2})\s*号", win) or re.search(r"(\d{1,2})\s*家园", win)
                    if hm and 1 <= int(hm.group(1)) <= 12:
                        res[key] = f"{int(hm.group(1))} 号家园门口"
                        hit = True
                        break
                else:
                    for spot, norm in STONE_SPOTS:
                        if spot in win:
                            res[key] = norm
                            hit = True
                            break
                    if not hit:
                        hm = re.search(r"(\d{1,2})\s*号", win) or re.search(r"(\d{1,2})\s*家园", win)
                        if hm and 1 <= int(hm.group(1)) <= 12:
                            res[key] = f"{int(hm.group(1))} 号家园门口"
                            hit = True
                    if hit:
                        break
            if hit:
                break
    return res


def parse_forecasts(seg, seg_date):
    """段内多日预告「21日 周一 流星雨」「17日 周四 0-6点 下雨天」→ [(date, phases)]。"""
    out = []
    for m in re.finditer(
            r"(\d{1,2})日\s*周[一二三四五六日天]\s*"
            r"(?:(\d{1,2})\s*[-–~]\s*(\d{1,2})\s*点?\s*)?(\S{1,12})", seg):
        day = int(m.group(1))
        types = wx_types_in(m.group(4))
        if not types:
            continue
        if day >= seg_date.day:
            month = seg_date.month
            year = seg_date.year
        else:
            nxt = seg_date.replace(day=28) + timedelta(days=7)
            month, year = nxt.month, nxt.year
        try:
            fdate = date(year, month, day)
        except ValueError:
            continue
        if fdate > seg_date + timedelta(days=14):
            continue  # 预告不会超过两周，超出视为解析噪声
        if m.group(2):
            phases = [{"t": t, "s": int(m.group(2)), "e": int(m.group(3))} for t in types]
            phases.append({"t": "sunny"})
        else:
            phases = [{"t": t} for t in types]
        out.append((fdate, phases))
    return out


# ---------------------------------------------------------------- 天气学习

def learn_weather(cal, segments, src, target, audit):
    """从切分后的帖子段学习天气：当日实际天气 + 未来预告。
    人工条目（无 auto 标记）永不被覆盖；auto 条目仅被 primary 源的当日实际修正。
    返回 True 表示日历有变更需要落盘。
    """
    days = cal.setdefault("days", {})
    dirty = False
    is_primary = src.get("priority", "primary") == "primary"
    floor = target - timedelta(days=LEARN_PAST_DAYS)
    for seg_date, seg in segments:
        if seg_date < floor:
            continue
        if seg_date > target + timedelta(days=1):
            # 聚合页含数月前的旧帖，无年份的月日标记经跨年容错可能解析成未来日期
            continue
        iso = seg_date.isoformat()
        phases = parse_today_weather(seg)
        if phases:
            cur = days.get(iso)
            if cur is None:
                days[iso] = {"phases": phases, "auto": True}
                dirty = True
                audit["notes"].append(
                    f"{src['name']} 学习到 {iso} 天气: {derive_entry(phases)['label']}")
            elif cur.get("auto") and is_primary and cur.get("phases") != phases:
                cur["phases"] = phases
                dirty = True
                audit["notes"].append(
                    f"{src['name']} 修正 {iso} 天气 → {derive_entry(phases)['label']}")
        for fdate, fphases in parse_forecasts(seg, seg_date):
            fiso = fdate.isoformat()
            if fiso not in days:
                days[fiso] = {"phases": fphases, "auto": True}
                dirty = True
                audit["notes"].append(
                    f"{src['name']} 学习到 {fiso} 预告: {derive_entry(fphases)['label']}")
    return dirty


# ---------------------------------------------------------------- 多语言天气文件

I18N = {
    "zh": {
        "header": "/* 心动小镇 · 天气日历数据（正本）\n"
                  " * 由 scripts/fetch_daily.py 从 data-src/weather-calendar.json 自动生成，勿手改。\n"
                  " * 游戏内天气为官方固定排期，本日历由社区攻略帖每日对照维护。 */",
        "src_name": "TapTap 心动小镇 · 社区天气攻略汇总",
        "note": "心动小镇的游戏内天气为官方固定排期。特殊天气（雨/彩虹/雪/流星雨）决定限定鱼种与专属采集内容。",
        "joiner": "转", "sep": "，",
        "types": TYPE_ZH,
        "fish": FISH_ZH,
    },
    "en": {
        "header": "/* Heartopia · weather calendar data, English edition\n"
                  " * Auto-generated by scripts/fetch_daily.py from weather-calendar.json — do not edit.\n"
                   " * In-game weather follows an official fixed schedule; cross-checked against community reports daily. */",
        "src_name": "TapTap Heartopia · Community Weather Reports",
        "note": "Weather in Heartopia follows an official fixed schedule. Special weather (rain / rainbow / snow / meteor showers) determines limited fish and exclusive gathering spots.",
        "joiner": " → ", "sep": ", ",
        "types": {"sunny": "Sunny", "rain": "Rain", "rainbow": "Rainbow",
                  "meteor": "Meteor Shower", "snow": "Snow", "heat": "Heatwave"},
        "fish": {
            "rainbow": "Hammerhead Shark · Rainbow Trout",
            "meteor": "Exclusive meteorite gathering",
            "rain": "Sand Bream · European Eel",
            "snow": "Snow Crab · Sea Angel",
        },
    },
    "ja": {
        "header": "/* ハートピア · 天気カレンダーデータ（日本語版）\n"
                  " * scripts/fetch_daily.py による自動生成 — 手書き編集はしないでください。\n"
                  " * ゲーム内天気は公式の固定スケジュールに従います。コミュニティ投稿と毎日照合しています。 */",
        "src_name": "TapTap ハートピア · コミュニティ天気情報",
        "note": "ハートピアのゲーム内天気は公式の固定スケジュールに従います。特殊天気（雨／虹／雪／流星群）が限定魚と限定採集スポットを決めます。",
        "joiner": "のち", "sep": "、",
        "types": {"sunny": "晴れ", "rain": "雨", "rainbow": "虹",
                  "meteor": "流星群", "snow": "雪", "heat": "酷暑"},
        "fish": {
            "rainbow": "シュモクザメ · ニジマス",
            "meteor": "隕石の限定採集",
            "rain": "サンドブリーム · ウナギ",
            "snow": "ズワイガニ · 氷の海の天使",
        },
    },
    "ko": {
        "header": "/* 하트오피아 · 날씨 캘린더 데이터, 한국어판\n"
                  " * scripts/fetch_daily.py가 자동 생성합니다 — 수동 수정하지 마세요.\n"
                  " * 게임 내 날씨는 공식 고정 일정을 따르며, 커뮤니티 게시물과 매일 대조합니다. */",
        "src_name": "TapTap 하트오피아 · 커뮤니티 날씨 정보",
        "note": "하트오피아의 게임 내 날씨는 공식 고정 일정으로 진행됩니다. 특수 날씨(비/무지개/눈/유성우)가 한정 어종과 전용 채집 콘텐츠를 결정합니다.",
        "joiner": " 후 ", "sep": ", ",
        "types": {"sunny": "맑음", "rain": "비", "rainbow": "무지개",
                  "meteor": "유성우", "snow": "눈", "heat": "폭염"},
        "fish": {
            "rainbow": "망치상어 · 무지개송어",
            "meteor": "유성우 한정 운석 채집",
            "rain": "샌드브림 · 뱀장어",
            "snow": "대게 · 얼음바다 천사",
        },
    },
}


def tr_entry(phases, lang):
    """phases → 指定语言的 {label, icon, note, fish}。"""
    i18n = I18N[lang]
    seq = type_sequence(phases)
    specials = [t for t in seq if t != "sunny"]
    if not specials:
        label = i18n["types"]["sunny"]
    else:
        label = i18n["joiner"].join(i18n["types"][t] for t in seq)
    notes = []
    for p in sorted([p for p in phases if "s" in p and p["t"] != "sunny"], key=lambda p: p["s"]):
        notes.append(f"{p['s']:02d}:00-{p['e']:02d}:00 {i18n['types'][p['t']]}")
    note = i18n["sep"].join(notes)
    fish = ""
    for t in FISH_PRIORITY:
        if t in specials:
            fish = i18n["fish"][t]
            break
    return {"label": label, "icon": derive_entry(phases)["icon"], "note": note, "fish": fish}


def generate_weather_js(cal, target, dry_run=False):
    """从 weather-calendar.json 生成 4 语言 weather.js（滚动窗口：今天起往前 30 天）。
    与现有文件内容一致时跳过写入 —— 幂等，日历无变更时零开销。"""
    window_start = (target - timedelta(days=30)).isoformat()
    src = cal.get("source") or {}
    for lang, path in WEATHER_JS.items():
        i18n = I18N[lang]
        days = {}
        for iso in sorted(cal.get("days", {}).keys()):
            if iso < window_start:
                continue
            entry = tr_entry(cal["days"][iso]["phases"], lang)
            if entry["fish"]:
                days[iso] = entry
            else:
                days[iso] = {k: v for k, v in entry.items() if k != "fish"}
        js = (f"{i18n['header']}\nwindow.HEARTOPIA_WEATHER = {{\n"
              f'  updated: "{cal.get("updated", target.isoformat())}",\n'
              f'  source: {{\n    name: "{i18n["src_name"]}",\n'
              f'    url: "{src.get("url", "")}"\n  }},\n'
              f'  note: "{i18n["note"]}",\n'
              f'  days: {json.dumps(days, ensure_ascii=False, indent=2)}\n}};\n')
        if dry_run:
            log(f"[dry-run] 将生成 {path.relative_to(ROOT)}（{len(days)} 天）")
            continue
        if path.exists() and path.read_text(encoding="utf-8") == js:
            continue
        path.write_text(js, encoding="utf-8")
        log(f"生成 {path.relative_to(ROOT)}（{len(days)} 天）")


# ---------------------------------------------------------------- 每日情报合成

def fish_tip(entry):
    label, detail = entry["label"], entry["note"]
    if "流星" in label:
        return "🌠 今晚流星雨 —— 星陨矿石全图刷新，记得找朵朵兑换限定家具。"
    if "彩虹" in label:
        return "🌈 彩虹天限定鱼别错过：锤头鲨（白天）、彩虹鳟（清晨/午后）。"
    if "雪" in label:
        return "❄️ 雪天限定：雪蟹、冰海天使（冰雪海域）。"
    if "雨" in label:
        if "转" in label and detail:
            return f"🌧️ 今天{detail} —— 转雨后可钓雨天限定：沙白鱼、欧洲鳗鲡（夜晚）。"
        return "🌧️ 雨天限定鱼可钓：沙白鱼、欧洲鳗鲡（夜晚）。"
    return "☀️ 晴天全图常规鱼种待机，出门顺路收图鉴。"


def mentions_target_date(text, target):
    m, d = target.month, target.day
    patterns = [f"{m}月{d}日", f"{m:02d}-{d:02d}", f"{m:02d}.{d:02d}", f"{m}.{d}"]
    return any(p in text for p in patterns)


def build_daily(target, mode):
    cal = load_json(WEATHER_CAL) or {"updated": target.isoformat(), "days": {}}
    seed = load_json(SEED) or {}
    audit = {
        "fetchMode": mode,
        "targetDate": target.isoformat(),
        "sourcesTried": [], "sourcesOk": [], "sourcesFailed": [],
        "conflicts": [], "notes": [],
    }
    cal_dirty = False

    # ---- 种子情报（降级基准） ----
    key = target.isoformat()
    known = (seed.get("known") or {}).get(key) or {}
    codes = [dict(c) for c in known.get("codes", [])]
    resources = [dict(r) for r in known.get("resources", [])]
    sources = [dict(s) for s in known.get("sources", [])]
    status = "fallback"
    if known:
        status = "stale"

    # ---- 在线源：切分 → 提取 → 学习 ----
    if mode == "online":
        votes = {}       # code -> {source names}
        pos_locked = {}  # wood/stone -> (位置, 源名)，首个 primary 源锁定
        for src in seed.get("watchUrls", []):
            if not src.get("enabled", True):
                continue
            audit["sourcesTried"].append(src["name"])

            # 评论 API 源：兑换码权威通道（正文里已无当日码）
            if src.get("type") == "moment-comments":
                try:
                    pairs = fetch_comment_codes(src.get("momentId"), target)
                except Exception as e:
                    audit["sourcesFailed"].append({"name": src["name"],
                                                   "error": f"{type(e).__name__}: {e}"})
                    log(f"  [fail] {src['name']}: {type(e).__name__}: {e}")
                    continue
                audit["sourcesOk"].append({"name": src["name"], "isTargetDate": bool(pairs),
                                           "posts": len(pairs)})
                for code, pinned, author, hm in pairs:
                    votes.setdefault(code, set()).add(src["name"])
                    if code not in {x["code"] for x in codes}:
                        codes.append({"code": code, "note": "置顶码评 · 当日 23:59:59 前有效"})
                        audit["notes"].append(
                            f"{src['name']} 提取到当日兑换码 {code}（{author} {hm} 发布）")
                log(f"  [ok]   {src['name']}（评论 API, 当日码 {len(pairs)} 个）")
                if pairs:
                    if src["url"] not in {s.get("url") for s in sources}:
                        sources.append({"name": src["name"], "url": src["url"]})
                    status = "live"
                continue

            ok, payload = fetch_source(src)
            if not ok:
                audit["sourcesFailed"].append({"name": src["name"], "error": payload})
                log(f"  [fail] {src['name']}: {payload}")
                continue
            text = strip_html(payload)
            segments = split_posts(text, target)
            seg_dates = {d for d, _ in segments}
            same_day = target in seg_dates or mentions_target_date(text, target)
            audit["sourcesOk"].append({"name": src["name"], "isTargetDate": same_day,
                                       "posts": len(segments)})
            log(f"  [ok]   {src['name']}（{len(payload)} 字节, {len(segments)} 帖, 当日: {same_day}）")
            if not same_day:
                continue
            is_primary = src.get("priority", "primary") == "primary"

            # 天气学习（所有源；当日实际修正仅 primary）
            if learn_weather(cal, segments, src, target, audit):
                cal_dirty = True

            for seg_date, seg in segments:
                if seg_date != target:
                    continue
                # 兑换码：所有源投票，primary 引入
                for c in extract_codes_segment(seg, seg_date, target):
                    votes.setdefault(c, set()).add(src["name"])
                    if is_primary and c not in {x["code"] for x in codes}:
                        codes.append({"code": c, "note": "在线抓取 · 当日有效"})
                        audit["notes"].append(f"{src['name']} 提取到当日兑换码 {c}")
                # 物资点位：仅 primary，先到先得，缺条目自动创建
                if is_primary:
                    pos = extract_res_segment(seg)
                    for k, name, emo in (("wood", "溜溜橡木", "🪵"), ("stone", "无瑕萤石", "💎")):
                        v = pos.get(k)
                        if not v:
                            continue
                        entry = next((r for r in resources if r["name"] == name), None)
                        if entry is None:
                            resources.append({"emo": emo, "name": name, "pos": v})
                            audit["notes"].append(f"{src['name']} 新建物资条目 {name}: {v}")
                        elif k not in pos_locked:
                            if entry["pos"] != v:
                                audit["conflicts"].append(
                                    f"物资点位更新: {name} {entry['pos']} → {v}（{src['name']}）")
                                entry["pos"] = v
                            pos_locked[k] = (v, src["name"])
                        elif entry["pos"] != v:
                            audit["conflicts"].append(
                                f"物资点位分歧: {name} 采信「{pos_locked[k][1]}」的 {entry['pos']}"
                                f" / {src['name']} 提到 {v}")

            if src["url"] not in {s.get("url") for s in sources}:
                sources.append({"name": src["name"], "url": src["url"]})
            status = "live"

        # 投票标注：≥2 个独立源命中的码标记 verified
        for c in codes:
            n_votes = len(votes.get(c["code"], set()))
            if n_votes >= 2:
                c["note"] = f"已获 {n_votes} 个独立源交叉验证 · 当日有效"
                c["verified"] = n_votes

    # ---- 学习结果落盘 ----
    if cal_dirty:
        cal["updated"] = target.isoformat()
        WEATHER_CAL.parent.mkdir(parents=True, exist_ok=True)
        WEATHER_CAL.write_text(
            json.dumps(cal, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        log(f"天气日历已更新 → {WEATHER_CAL.relative_to(ROOT)}")

    # ---- 天气（学习后的日历） ----
    day = (cal.get("days") or {}).get(key)
    weather = None
    if day:
        e = derive_entry(day["phases"])
        weather = {"icon": e["icon"], "label": e["label"], "detail": e["note"],
                   "fishTip": fish_tip(e)}
    else:
        audit["notes"].append(f"天气日历未覆盖 {key}，等待自动学习或人工补录")

    # ---- 下一个特殊天气日 ----
    special = None
    for iso in sorted((cal.get("days") or {}).keys()):
        if iso <= key:
            continue
        e = derive_entry(cal["days"][iso]["phases"])
        if e["label"] != "晴":
            special = {"date": iso, "label": e["label"], "note": e["note"], "icon": e["icon"]}
            break

    # ---- 降级：读上次缓存 ----
    if status != "live" and OUT_JSON.exists():
        audit["notes"].append("在线源未命中当日数据，尝试读取上次 daily.json 缓存")
        prev = load_json(OUT_JSON)
        if prev and prev.get("date") == key and prev.get("codes"):
            codes = prev["codes"] if not codes else codes
            resources = prev.get("resources") or resources

    rules = seed.get("gameRules") or {}
    daily = {
        "date": key,
        "weekday": WEEKDAYS[target.weekday()],
        "generatedAt": datetime.now(BJT).strftime("%Y-%m-%d %H:%M:%S"),
        "status": status,
        "weather": weather,
        "specialForecast": special,
        "codes": codes,
        "redeemPath": rules.get("redeemPath", "游戏内【手表】→【设置】→【兑换码】"),
        "codeRule": rules.get("codeRule", "每日兑换码约 18:00 更新，有效至当日 23:59:59"),
        "resources": resources,
        "resourceNote": rules.get("resourceRule", "溜溜橡木 / 无瑕萤石每日 06:00 刷新，每处每天 1 次、每次 3 个，位置每日随机"),
        "resourceUnlock": rules.get("resourceUnlock", ""),
        "sources": sources,
        "audit": audit,
    }
    return daily, cal, cal_dirty


def validate(daily):
    issues = []
    for c in daily["codes"]:
        if not CODE_RE.fullmatch(c["code"]):
            issues.append(f"兑换码格式异常: {c['code']}")
    if not daily["weather"]:
        issues.append("天气数据缺失（日历未覆盖该日期）")
    if not daily["codes"]:
        issues.append("兑换码为空（18:00 前属预期）")
    if not daily["resources"]:
        issues.append("物资点位为空")
    return issues


def data_score(daily):
    if not daily:
        return -1
    score = 0
    if daily.get("weather"):
        score += 1
    if daily.get("codes"):
        score += 1
    if daily.get("resources"):
        score += 1
    return score


def emit(daily, dry_run):
    payload_json = json.dumps(daily, ensure_ascii=False, indent=2)
    payload_js = ("/* 心动小镇每日情报 · 由 scripts/fetch_daily.py 自动生成，勿手改 */\n"
                  f"window.HEARTOPIA_DAILY = {payload_json};\n")
    if dry_run:
        log("\n[dry-run] 产出预览（前 40 行）:")
        log("\n".join(payload_json.splitlines()[:40]))
        return

    # 质量保护：同日低分不覆盖高分；空数据不覆盖任何旧数据
    if OUT_JSON.exists():
        try:
            prev = json.loads(OUT_JSON.read_text(encoding="utf-8"))
        except Exception:
            prev = None
        if prev:
            if data_score(daily) == 0:
                log(f"\n[skip] 本次抓取为空，保留现有 {prev.get('date')} 数据不覆盖")
                return
            if prev.get("date") == daily["date"] and data_score(daily) < data_score(prev):
                log(f"\n[skip] 本次数据质量({data_score(daily)})低于现有({data_score(prev)})，"
                    f"保留 {prev.get('date')} 已有数据")
                return

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(payload_json + "\n", encoding="utf-8")
    OUT_JS.write_text(payload_js, encoding="utf-8")
    log(f"\n[done] 已写出 {OUT_JSON.relative_to(ROOT)} / {OUT_JS.relative_to(ROOT)}")


def main():
    if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
        try:
            sys.stdout.reconfigure(encoding="utf-8")
        except Exception:
            pass

    ap = argparse.ArgumentParser(description="心动小镇每日情报管道 v2.1")
    ap.add_argument("--date", help="目标日期 YYYY-MM-DD，默认今天（北京时间）")
    ap.add_argument("--offline", action="store_true", help="不联网，仅用本地数据")
    ap.add_argument("--dry-run", action="store_true", help="不写文件，仅打印")
    args = ap.parse_args()

    target = date.fromisoformat(args.date) if args.date else today_bjt()
    mode = "offline" if args.offline else "online"
    log(f"=== 心动小镇每日情报管道 v2.1 | 目标 {target.isoformat()} | 模式 {mode} ===")

    daily, cal, cal_dirty = build_daily(target, mode)
    issues = validate(daily)

    LOG_DIR.mkdir(parents=True, exist_ok=True)
    log_file = LOG_DIR / f"fetch_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log"

    log(f"\n状态: {daily['status']}  天气: "
        f"{(daily['weather'] or {}).get('label', '缺失')}  兑换码: {[c['code'] for c in daily['codes']]}  "
        f"物资: {[r['pos'] for r in daily['resources']]}")
    if issues:
        log("校验提示:")
        for i in issues:
            log(f"  - {i}")

    generate_weather_js(cal, target, dry_run=args.dry_run)

    emit(daily, args.dry_run)

    with open(log_file, "w", encoding="utf-8") as f:
        f.write(f"target={target.isoformat()} mode={mode} status={daily['status']}\n")
        f.write(json.dumps(daily, ensure_ascii=False, indent=2))
    log(f"日志: {log_file.relative_to(ROOT)}")

    # 退出码：有任一数据即成功；早间运行当日帖未发布属预期不报警；
    # 所有在线源不可达、或晚间兜底(≥20点)仍无当日数据才判失败提醒人工介入
    score = data_score(daily)
    sources_ok = len(daily["audit"]["sourcesOk"])
    bjt_hour = datetime.now(BJT).hour
    if score > 0:
        ok = True
    elif mode != "online":
        ok = False
    elif sources_ok == 0:
        ok = False
    elif bjt_hour >= 20:
        ok = False
    else:
        ok = True
    if not ok:
        log("[exit1] 当日无有效数据（源不可达或晚间兜底仍为空），标记失败")
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
