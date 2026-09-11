#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
心动小镇攻略手账 · 每日情报管道 v1.0
====================================

职责：多源抓取当日情报（天气 / 兑换码 / 物资点位）→ 合并校验 → 产出前端数据文件。

用法：
    python fetch_daily.py                     # 在线模式：抓取 TapTap 监控源 + 本地日历/种子合并
    python fetch_daily.py --offline           # 离线模式：仅用本地数据（天气日历 + 种子/缓存）
    python fetch_daily.py --date 2026-09-04   # 指定日期（默认今天）
    python fetch_daily.py --dry-run           # 只打印结果，不写文件

数据源（见 data-src/seed-daily.json 的 watchUrls）：
    1. 本地天气日历   data-src/weather-calendar.json   —— 天气为官方固定排期，人工维护，可靠性最高
    2. 本地情报种子   data-src/seed-daily.json         —— 降级基准 + 监控源登记
    3. 在线 TapTap 帖子（moment 页面 / 策略库）        —— 兑换码、物资点位、天气提及校验

合并与校验规则：
    - 兑换码必须匹配 ^[A-Z0-9]{7}$，且出现在「兑换码」关键词附近窗口内
    - 在线源需包含目标日期（如「9月3日」）才视为当日数据，否则仅作参考
    - 多源冲突时：在线源优先，冲突记录进 audit.conflicts 供人工复核
    - 全部在线源失败 → 降级使用种子/上次缓存，status 标记 fallback

产出：
    data/daily.json   结构化数据（含审计字段，供人工核查）
    data/daily.js     window.HEARTOPIA_DAILY = {...}（页面直接加载）
    logs/fetch_YYYYMMDD_HHMMSS.log

退出码：0 = 成功（天气/物资/兑换码任一有值，含降级），1 = 彻底失败（无任何可用数据）
质量保护：凌晨等发布空窗期抓到空数据时，不覆盖现有可用数据（日志标记 [skip]）
"""

import argparse
import json
import re
import sys
import urllib.error
import urllib.request
from datetime import date, datetime, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
SRC_DIR = ROOT / "data-src"
LOG_DIR = ROOT / "logs"

WEATHER_CAL = SRC_DIR / "weather-calendar.json"
SEED = SRC_DIR / "seed-daily.json"
OUT_JSON = DATA_DIR / "daily.json"
OUT_JS = DATA_DIR / "daily.js"

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")
CODE_RE = re.compile(r"\b([A-Z0-9]{7})\b")
CODE_BLACKLIST = {"JAVASCR", "CHARSET", "ENCODE", "DEFAULT", "DISPLAY", "CONTENT"}
DATE_CN_RE = re.compile(r"(\d{1,2})月(\d{1,2})日")
DATE_DOT_RE = re.compile(r"(\d{4})\.(\d{1,2})\.(\d{1,2})")  # 「2026.9.3」写法
DATE_PLAIN_DOT_RE = re.compile(r"(?<!\d)(\d{1,2})\.(\d{1,2})(?!\d)")  # 「(8.26)」写法
DATE_ATTRIB_WINDOW = 800  # 码向前归属日期的最大字符距离
DATE_NEAR_WINDOW = 200    # 无年份点分日期仅在码紧邻时参与归属（降低版本号误判）
WEEKDAYS = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]


def log(msg):
    print(msg, flush=True)


def load_json(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except (OSError, json.JSONDecodeError) as e:
        log(f"  [warn] 读取失败 {path.name}: {e}")
        return None


def http_get(url, timeout=12):
    req = urllib.request.Request(url, headers={
        "User-Agent": UA,
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "zh-CN,zh;q=0.9",
    })
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read().decode("utf-8", errors="replace")


# ---------------------------------------------------------------- 在线源抓取

def fetch_source(src):
    """抓单个监控源，返回 (ok, text_or_error)。"""
    try:
        html = http_get(src["url"])
        return True, html
    except (urllib.error.URLError, TimeoutError, OSError) as e:
        return False, f"{type(e).__name__}: {e}"


def strip_html(html):
    return re.sub(r"<[^>]+>", " ", html)


def mentions_target_date(text, target):
    """帖子文本是否包含目标日期（9月3日 / 09-03 / 9.3 等写法）。"""
    m, d = target.month, target.day
    patterns = [f"{m}月{d}日", f"{m:02d}-{d:02d}", f"{m:02d}.{d:02d}", f"{m}.{d}"]
    return any(p in text for p in patterns)


def extract_codes(text, target):
    """提取归属于目标日期的 7 位兑换码。

    过滤规则（排除策略库历史码与页面 JSON 数字字段误报）：
      1. 含字母 + 关键词邻近：码须含字母，且出现在「兑换码/礼包码」附近窗口内
      2. 日期归属：码归属于它前方最近的日期文本（「9月3日」「2026.9.3」800 字符内，
         或「(8.26)」这类无年份写法 200 字符内）且等于目标日期
      3. 「今日」回退：码前方 200 字符内无任何日期文本、但有「今日」字样时视为当日
    """
    dates = []  # (位置, (月, 日), 仅紧邻参与)
    for m in DATE_CN_RE.finditer(text):
        dates.append((m.start(), (int(m.group(1)), int(m.group(2))), False))
    for m in DATE_DOT_RE.finditer(text):
        dates.append((m.start(), (int(m.group(2)), int(m.group(3))), False))
    for m in DATE_PLAIN_DOT_RE.finditer(text):
        dates.append((m.start(), (int(m.group(1)), int(m.group(2))), True))
    kw_spans = []
    for km in re.finditer(r"(?:兑换码|礼包码)", text):
        kw_spans.append((max(0, km.start() - 100), min(len(text), km.end() + 280)))
    found = []
    for cm in CODE_RE.finditer(text):
        code = cm.group(1)
        if code in CODE_BLACKLIST or not re.search(r"[A-Z]", code):
            continue
        if not any(s <= cm.start() <= e for s, e in kw_spans):
            continue
        prev = [d for d in dates
                if d[0] < cm.start()
                and cm.start() - d[0] <= (DATE_NEAR_WINDOW if d[2] else DATE_ATTRIB_WINDOW)]
        if prev:
            _, (mm, dd), _ = max(prev, key=lambda d: d[0])
            if (mm, dd) != (target.month, target.day):
                continue
        else:
            # 无日期前缀时，回退到「今日」关键词归属（页面整体已确认提及目标日期）
            window_before = text[max(0, cm.start() - 200): cm.start()]
            if "今日" not in window_before:
                continue
        if code not in found:
            found.append(code)
    return found


RES_POS_HINTS = [
    "温泉山遗迹", "森林灵橡松林", "灵橡松林",
] + (
    [f"{i}号家园门口" for i in range(1, 13)]
    + [f"{i} 号家园门口" for i in range(1, 13)]
    + [f"{i}家园门口" for i in range(1, 13)]      # 社区常写「5家园门口」（省略「号」）
    + [f"{i} 家园门口" for i in range(1, 13)]
)


def normalize_pos(p):
    """「5家园门口 / 5号家园门口 / 5 家园门口」统一为「5 号家园门口」。"""
    m = re.match(r"^(\d+)\s*号?\s*家园门口$", p)
    return f"{m.group(1)} 号家园门口" if m else p


def extract_resources(text):
    """提取溜溜橡木 / 无瑕萤石位置。返回 {wood: 位置, stone: 位置} 或 None。

    帖子正文格式（TapTap 每日更新帖）：
        溜溜木/橡木位置：5家园门口
        萤石位置：温泉山遗迹
    匹配规则：窗口只向物资名后方看（正文里位置写在物资名之后，向前看会误抓
    上一行另一位物资的点位），窗口内多个候选点位取文本位置最邻近物资名的。
    """
    res = {}
    for aliases, key in ((("溜溜木", "溜溜橡木", "橡木"), "wood"), (("萤石",), "stone")):
        best = None  # (hint 在全文中的绝对位置, hint 文本)
        for alias in aliases:
            for m in re.finditer(re.escape(alias), text):
                w_start, w_end = m.start(), min(len(text), m.start() + 110)
                window = text[w_start:w_end]
                for h in RES_POS_HINTS:
                    p = window.find(h)
                    if p >= 0:
                        abs_pos = w_start + p
                        if best is None or abs_pos < best[0]:
                            best = (abs_pos, h)
        if best:
            res[key] = normalize_pos(best[1])
    return res or None


def extract_weather_hint(text):
    """在线文本中的天气提及（仅用于交叉校验，不直接采信）。"""
    hints = [w for w in ("下雨", "雨天", "彩虹", "下雪", "流星雨") if w in text]
    return hints


# ---------------------------------------------------------------- 合并与产出

def fish_tip(label, detail):
    if "彩虹" in label:
        return "🌈 彩虹天限定鱼别错过：锤头鲨（白天）、彩虹鳟（清晨/午后）。"
    if "雪" in label:
        return "❄️ 雪天限定：雪蟹、冰海天使（冰雪海域）。"
    if "雨" in label:
        if "转雨" in label and detail:
            return f"🌧️ 今天{detail} —— 转雨后可钓雨天限定：沙白鱼、欧洲鳗鲡（夜晚）。"
        return "🌧️ 雨天限定鱼可钓：沙白鱼、欧洲鳗鲡（夜晚）。"
    return "☀️ 晴天全图常规鱼种待机，出门顺路收图鉴。"


def build_daily(target, mode):
    cal = load_json(WEATHER_CAL) or {}
    seed = load_json(SEED) or {}

    audit = {
        "fetchMode": mode,
        "targetDate": target.isoformat(),
        "sourcesTried": [], "sourcesOk": [], "sourcesFailed": [],
        "conflicts": [], "notes": [],
    }

    # ---- 天气（本地日历为准） ----
    key = target.isoformat()
    day = (cal.get("days") or {}).get(key)
    weather_src = cal.get("source") or {}
    if day:
        weather = {
            "icon": day.get("icon", "☀️"),
            "label": day.get("label", "未知"),
            "detail": day.get("note", ""),
        }
        weather["fishTip"] = fish_tip(weather["label"], weather["detail"])
    else:
        weather = None
        audit["notes"].append(f"天气日历未覆盖 {key}，需人工更新 weather-calendar.json")

    # ---- 下一个特殊天气日（提前预告） ----
    special = None
    for iso in sorted((cal.get("days") or {}).keys()):
        d = date.fromisoformat(iso)
        if d > target and "晴" != (cal["days"][iso].get("label") or "晴"):
            entry = cal["days"][iso]
            special = {
                "date": iso,
                "label": entry.get("label"),
                "note": entry.get("note", ""),
                "icon": entry.get("icon", ""),
            }
            break

    # ---- 种子情报（降级基准） ----
    known = (seed.get("known") or {}).get(key) or {}
    codes = [dict(c) for c in known.get("codes", [])]
    resources = [dict(r) for r in known.get("resources", [])]
    sources = [dict(s) for s in known.get("sources", [])]
    status = "fallback"
    if known:
        status = "stale"  # 种子数据：真实但来自人工归档

    # ---- 在线源 ----
    if mode == "online":
        votes = {}      # code -> [source names]，secondary 源只投票不引入
        pos_locked = {}  # wood/stone -> 采信源名；首个成功提取的 primary 源锁定
        for src in seed.get("watchUrls", []):
            if not src.get("enabled", True):
                continue
            audit["sourcesTried"].append(src["name"])
            ok, payload = fetch_source(src)
            if not ok:
                audit["sourcesFailed"].append({"name": src["name"], "error": payload})
                log(f"  [fail] {src['name']}: {payload}")
                continue
            text = strip_html(payload)
            same_day = mentions_target_date(text, target)
            audit["sourcesOk"].append({"name": src["name"], "isTargetDate": same_day})
            log(f"  [ok]   {src['name']} (抓取 {len(payload)} 字节, 当日内容: {same_day})")
            if not same_day:
                audit["notes"].append(f"{src['name']} 未提及目标日期，内容仅作参考")
                continue
            is_primary = src.get("priority", "primary") == "primary"

            # 兑换码：日期归属提取；primary 引入新码，secondary 只投票
            for c in extract_codes(text, target):
                votes.setdefault(c, []).append(src["name"])
                seed_codes = {x["code"] for x in codes}
                if is_primary and c not in seed_codes:
                    codes.append({"code": c, "note": "在线抓取 · 当日有效"})
                    audit["notes"].append(f"{src['name']} 提取到当日兑换码 {c}")

            # 物资点位：仅 primary 参与且先到先得（watchUrls 顺序即权威度顺序，
            # 每日更新帖排首位；secondary 为历史汇总页，日期归属不可靠，不采信点位）
            if is_primary:
                pos = extract_resources(text)
                if pos:
                    for r in resources:
                        k = "wood" if "橡木" in r["name"] else "stone"
                        v = pos.get(k)
                        if not v:
                            continue
                        if k not in pos_locked:
                            if r["pos"] != v:
                                audit["conflicts"].append(
                                    f"物资点位更新: {r['name']} 种子={r['pos']} / {src['name']}={v}（以在线为准）")
                            r["pos"] = v
                            pos_locked[k] = src["name"]
                        elif r["pos"] != v:
                            audit["conflicts"].append(
                                f"物资点位分歧: {r['name']} 采信「{pos_locked[k]}」的 {r['pos']} / "
                                f"{src['name']} 提到 {v}（首个 primary 源优先）")

            # 天气交叉校验
            hints = extract_weather_hint(text)
            if weather and hints and "雨" not in weather["label"] and ("下雨" in hints or "雨天" in hints):
                audit["conflicts"].append(
                    f"天气分歧: 日历={weather['label']} / 在线提及={hints}（请人工复核日历）")

            if src["url"] not in {s.get("url") for s in sources}:
                sources.append({"name": src["name"], "url": src["url"]})
            status = "live"

        # 投票标注：≥2 个独立源命中的码标记 verified
        for c in codes:
            n_votes = len(set(votes.get(c["code"], [])))
            if n_votes >= 2:
                c["note"] = f"已获 {n_votes} 个独立源交叉验证 · 当日有效"
                c["verified"] = n_votes

    if status != "live" and OUT_JSON.exists():
        audit["notes"].append("在线源未命中当日数据，已尝试读取上次 daily.json 缓存")
        prev = load_json(OUT_JSON)
        if prev and prev.get("date") == key and prev.get("codes"):
            codes = prev["codes"] if not codes else codes
            resources = prev.get("resources") or resources

    rules = seed.get("gameRules") or {}
    daily = {
        "date": key,
        "weekday": WEEKDAYS[target.weekday()],
        "generatedAt": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "status": status,
        "weather": weather,
        "specialForecast": special,
        "codes": codes,
        "redeemPath": rules.get("redeemPath", "游戏内【手表】→【设置】→【兑换码】"),
        "codeRule": rules.get("codeRule", "每日约 18:00 更新，当日 23:59:59 前有效"),
        "resources": resources,
        "resourceNote": rules.get("resourceRule", "每日 06:00 刷新 · 位置每日随机"),
        "resourceUnlock": rules.get("resourceUnlock", ""),
        "sources": sources,
        "audit": audit,
    }
    return daily


def validate(daily):
    issues = []
    for c in daily["codes"]:
        if not CODE_RE.fullmatch(c["code"]):
            issues.append(f"兑换码格式异常: {c['code']}")
    if not daily["weather"]:
        issues.append("天气数据缺失（日历未覆盖该日期）")
    if not daily["codes"]:
        issues.append("兑换码为空")
    if not daily["resources"]:
        issues.append("物资点位为空")
    return issues


def data_score(daily):
    """数据可用性评分：天气/兑换码/物资任一有值即 > 0，用于质量保护比较"""
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
        log("\n[dry-run] 产出预览（前 60 行）:")
        log("\n".join(payload_json.splitlines()[:60]))
        return

    # 质量保护：凌晨等发布空窗期抓到空数据时，不覆盖现有可用数据
    # （页面状态条会把过期数据标为「待更新」，比全空体验好；有真数据时正常写入）
    if OUT_JSON.exists():
        try:
            prev = json.loads(OUT_JSON.read_text(encoding="utf-8"))
        except Exception:
            prev = None
        if prev and data_score(prev) > 0 and data_score(daily) == 0:
            log(f"\n[skip] 本次抓取为空（发布空窗期），保留现有 {prev.get('date')} 数据不覆盖；"
                f"如需强制重写请删除 data/daily.json 后重跑")
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

    ap = argparse.ArgumentParser(description="心动小镇每日情报管道")
    ap.add_argument("--date", help="目标日期 YYYY-MM-DD，默认今天")
    ap.add_argument("--offline", action="store_true", help="不联网，仅用本地数据")
    ap.add_argument("--dry-run", action="store_true", help="不写文件，仅打印")
    args = ap.parse_args()

    target = date.fromisoformat(args.date) if args.date else date.today()
    mode = "offline" if args.offline else "online"
    log(f"=== 心动小镇每日情报管道 | 目标 {target.isoformat()} | 模式 {mode} ===")

    daily = build_daily(target, mode)
    issues = validate(daily)

    LOG_DIR.mkdir(parents=True, exist_ok=True)
    log_file = LOG_DIR / f"fetch_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log"

    log(f"\n状态: {daily['status']}  天气: "
        f"{(daily['weather'] or {}).get('label', '缺失')}  兑换码: {[c['code'] for c in daily['codes']]}")
    if issues:
        log("校验问题:")
        for i in issues:
            log(f"  - {i}")

    emit(daily, args.dry_run)

    with open(log_file, "w", encoding="utf-8") as f:
        f.write(f"target={target.isoformat()} mode={mode} status={daily['status']}\n")
        f.write(json.dumps(daily, ensure_ascii=False, indent=2))
    log(f"日志: {log_file.relative_to(ROOT)}")
    # 兑换码 18:00 才发布：早上任务码空属预期，天气/物资任一有值即算成功
    sys.exit(0 if data_score(daily) > 0 else 1)


if __name__ == "__main__":
    main()
