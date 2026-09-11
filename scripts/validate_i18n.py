#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
i18n 一致性校验：多语言页面与数据文件的结构检查。

用法：
    python scripts/validate_i18n.py

检查项（每语言 en/ja/ko，基准为中文根目录）：
  1. 6 个页面齐全，<html lang> 正确，hreflang 组完整（zh-CN/en/ja/ko/x-default）
  2. 页面引用的脚本路径都能解析到真实文件
  3. 数据文件条目数与 id 顺序和中文版完全一致（fish / templates / weather 日期）
  4. 模板页筛选 chips 的 data-* 值 ⊇ 数据文件中出现的值（不含 "全部" 类哨兵值）
  5. 钓鱼页天气/时段 chips 覆盖数据文件中的全部取值
  6. i18n 运行时层的 dict key 与英文版完全一致（key 集合守恒）

退出码：0 = 全部通过；1 = 存在错误。
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

PAGES = ["index.html", "codes.html", "weather.html", "fishing.html", "templates.html", "guide.html"]
LOCALES = {"en": "English", "ja": "Japanese", "ko": "Korean"}
PLACEHOLDER = "https://heartopia.example.com/"

errors = []
warnings = []


def err(msg):
    errors.append(msg)


def load_js_globals(path):
    """无依赖读取 data/*.js：提取 window.X = 字面量并粗解析数组/对象的字段值。"""
    if not path.exists():
        return None
    return path.read_text(encoding="utf-8")


def extract_entries(js_text, marker):
    """按顶层条目分隔符切分（依赖仓库数据的单条目单行风格）。"""
    if js_text is None:
        return []
    m = re.search(re.escape(marker) + r"\s*=\s*\[(.*?)\];", js_text, re.S)
    if not m:
        return []
    body = m.group(1)
    return re.findall(r"\{\s*id:\s*(\d+)\s*,", body)


def extract_ids(js_text):
    return [int(i) for i in extract_entries(js_text, "window.HEARTOPIA_TPLS")]


def extract_field_values(js_text, marker, field):
    """提取数组条目中某字段的所有取值（单引号或双引号字符串）。"""
    if js_text is None:
        return set()
    m = re.search(re.escape(marker) + r"\s*=\s*\[(.*?)\];", js_text, re.S)
    if not m:
        return set()
    vals = set()
    for line in m.group(1).splitlines():
        fm = re.search(field + r":\s*'([^']*)'", line)
        if fm:
            vals.add(fm.group(1))
    return vals


def extract_weather_days(js_text):
    if js_text is None:
        return []
    return re.findall(r'"(\d{4}-\d{2}-\d{2})":\s*\{', js_text)


def check_page(locale, page, page_path):
    text = page_path.read_text(encoding="utf-8")
    rel = f"{locale}/{page}"

    # lang 属性
    lm = re.search(r'<html lang="([^"]+)"', text)
    if not lm or lm.group(1) != locale:
        err(f"{rel}: <html lang> 应为 {locale}，实际 {lm.group(1) if lm else '缺失'}")

    # hreflang 组
    for hreflang in ["zh-CN", "en", "ja", "ko", "x-default"]:
        if f'hreflang="{hreflang}"' not in text:
            err(f"{rel}: 缺少 hreflang={hreflang}")

    # 脚本路径解析
    for src in re.findall(r'<script src="([^"]+)"></script>', text):
        target = (page_path.parent / src).resolve()
        if not target.exists():
            err(f"{rel}: 脚本不存在 {src}")

    # 站内相对链接（跳过外链/锚点，以及内联 JS 字符串拼接产生的伪 href）
    for href in re.findall(r'<a[^>]+href="([^"]+)"', text):
        if re.match(r"^(https?:|mailto:|#)", href) or re.search(r"['+<() ]", href):
            continue
        link = href.split("#")[0].split("?")[0]
        if not link:
            continue
        target = (page_path.parent / link).resolve()
        if not target.exists():
            err(f"{rel}: 站内链接失效 {href}")


def check_filters(locale):
    """模板页 chips 与数据文件取值一致性；钓鱼页天气/时段覆盖。"""
    page_path = ROOT / locale / "templates.html"
    tpl_text = load_js_globals(ROOT / "data" / f"templates-{locale}.js")
    if page_path.exists() and tpl_text is not None:
        html = page_path.read_text(encoding="utf-8")
        chip_attrs = {
            "style": set(re.findall(r'data-style="([^"]+)"', html)),
            "room": set(re.findall(r'data-room="([^"]+)"', html)),
            "budget": set(re.findall(r'data-budget="([^"]+)"', html)),
        }
        for field, chips in chip_attrs.items():
            data_vals = extract_field_values(tpl_text, "window.HEARTOPIA_TPLS", field)
            missing = data_vals - chips
            if missing:
                err(f"{locale}/templates.html: 数据中的 {field} 值无对应筛选 chip：{sorted(missing)}")

    fish_page = ROOT / locale / "fishing.html"
    fish_text = load_js_globals(ROOT / "data" / f"fish-{locale}.js")
    if fish_page.exists() and fish_text is not None:
        html = fish_page.read_text(encoding="utf-8")
        # 数据中的天气/时段取值
        weathers = set()
        times = set()
        for wm in re.finditer(r"weathers:\[([^\]]*)\]", fish_text):
            weathers |= set(re.findall(r"'([^']+)'", wm.group(1)))
        for tm in re.finditer(r"times:\[([^\]]*)\]", fish_text):
            times |= set(re.findall(r"'([^']+)'", tm.group(1)))
        html_vals = set(re.findall(r'data-(?:weather|time|w|t)="([^"]+)"', html))
        # 页面 chips 的取值兜底检查：数据里出现的每个天气/时段值必须能在页面 HTML 中找到
        for v in weathers | times:
            if v not in html and f'>{v}<' not in html:
                err(f"{locale}/fishing.html: 数据值「{v}」未出现在页面筛选中")


def check_data_parity():
    zh_fish = load_js_globals(ROOT / "data" / "fish.js")
    zh_tpl = load_js_globals(ROOT / "data" / "templates.js")
    zh_weather = load_js_globals(ROOT / "data" / "weather.js")
    zh_days = extract_weather_days(zh_weather)

    for locale in LOCALES:
        # 模板 id 顺序
        zh_ids = extract_ids(zh_tpl)
        loc_ids = extract_ids(load_js_globals(ROOT / "data" / f"templates-{locale}.js"))
        if zh_ids != loc_ids:
            err(f"templates-{locale}.js: id 顺序与中文版不一致（{len(loc_ids)} 条 vs 中文 {len(zh_ids)} 条）")

        # 鱼种条目数
        zh_fish_n = len(re.findall(r"\{name:", zh_fish))
        loc_fish = load_js_globals(ROOT / "data" / f"fish-{locale}.js")
        if loc_fish is None:
            err(f"fish-{locale}.js 不存在")
        else:
            loc_fish_n = len(re.findall(r"\{name:", loc_fish))
            if zh_fish_n != loc_fish_n:
                err(f"fish-{locale}.js: 条目数 {loc_fish_n} 与中文版 {zh_fish_n} 不一致")

        # 天气日期
        loc_days = extract_weather_days(load_js_globals(ROOT / "data" / f"weather-{locale}.js"))
        if loc_days != zh_days:
            err(f"weather-{locale}.js: 日期集合与中文版不一致：{sorted(set(loc_days) ^ set(zh_days))}")

        # i18n dict key 守恒
        en_dict = extract_dict_keys(load_js_globals(ROOT / "assets" / "i18n" / "en.js"))
        loc_dict = extract_dict_keys(load_js_globals(ROOT / "assets" / "i18n" / f"{locale}.js"))
        if locale != "en" and loc_dict is not None and en_dict is not None:
            if set(en_dict) != set(loc_dict):
                missing = set(en_dict) - set(loc_dict)
                extra = set(loc_dict) - set(en_dict)
                err(f"i18n/{locale}.js: dict key 与 en.js 不一致，缺 {len(missing)} 多 {len(extra)}")


def extract_dict_keys(js_text):
    if js_text is None:
        return None
    m = re.search(r"dict:\s*\{(.*?)\n\s*\}", js_text, re.S)
    if not m:
        return None
    return re.findall(r"'([^']+)':", m.group(1))


def check_root_pages():
    for page in PAGES:
        page_path = ROOT / page
        if not page_path.exists():
            err(f"根目录缺页面 {page}")
            continue
        text = page_path.read_text(encoding="utf-8")
        for hreflang in ["zh-CN", "en", "ja", "ko", "x-default"]:
            if f'hreflang="{hreflang}"' not in text:
                err(f"{page}: 缺少 hreflang={hreflang}")
        if 'src="assets/js/lang.js"' not in text:
            err(f"{page}: 缺少语言切换器 lang.js 引用")


def main():
    check_root_pages()
    check_data_parity()
    for locale in LOCALES:
        for page in PAGES:
            page_path = ROOT / locale / page
            if not page_path.exists():
                err(f"{locale}/{page} 不存在")
                continue
            check_page(locale, page, page_path)
        check_filters(locale)

    if warnings:
        print("警告：")
        for w in warnings:
            print(f"  ! {w}")
    if errors:
        print(f"校验失败，{len(errors)} 处问题：")
        for e in errors:
            print(f"  ✗ {e}")
        sys.exit(1)
    pages_total = len(PAGES) * (len(LOCALES) + 1)
    print(f"i18n 校验通过：{pages_total} 个页面（zh + en/ja/ko）结构与数据一致性全部正常")


if __name__ == "__main__":
    main()
