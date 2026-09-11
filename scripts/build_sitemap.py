#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
生成多语言 sitemap.xml 并统一替换全站 SEO 域名占位符。

用法：
    python scripts/build_sitemap.py --base https://user.github.io/heartopia-guide --apply

参数：
    --base  站点基准 URL（末尾不带 / ），必填
    --apply 除生成 sitemap.xml 外，同时把 HTML 中的
            https://heartopia.example.com/ 占位域名替换为 --base，
            并更新 robots.txt 的 Sitemap 地址

多语言：
    zh = 站点根目录（默认语言），en/ja/ko = 同名子目录。
    sitemap 中每个语言版本的 <url> 条目都带完整的
    xhtml:link hreflang 互链组（zh-CN / en / ja / ko / x-default→zh）。
"""

import argparse
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PLACEHOLDER = "https://heartopia.example.com/"

PAGES = [
    # (路径, changefreq, priority)
    ("index.html",     "daily",   "1.0"),
    ("codes.html",     "daily",   "1.0"),
    ("weather.html",   "daily",   "0.9"),
    ("templates.html", "weekly",  "0.9"),
    ("fishing.html",   "weekly",  "0.8"),
    ("guide.html",     "monthly", "0.7"),
]

# (子目录, hreflang 值)；第一项为默认语言，部署在站点根目录
LOCALES = [
    ("",   "zh-CN"),
    ("en", "en"),
    ("ja", "ja"),
    ("ko", "ko"),
]


def page_url(base, sub, path):
    url = base + "/"
    if sub:
        url += sub + "/"
    if path != "index.html":
        url += path
    return url


def build_sitemap(base):
    urls = []
    for path, freq, pri in PAGES:
        alternates = [
            f'    <xhtml:link rel="alternate" hreflang="{hreflang}" href="{page_url(base, sub, path)}"/>'
            for sub, hreflang in LOCALES
        ]
        alternates.append(
            f'    <xhtml:link rel="alternate" hreflang="x-default" href="{page_url(base, "", path)}"/>'
        )
        alt_block = "\n".join(alternates)
        for sub, _ in LOCALES:
            loc = page_url(base, sub, path)
            urls.append(
                "  <url>\n"
                f"    <loc>{loc}</loc>\n"
                f"{alt_block}\n"
                f"    <changefreq>{freq}</changefreq>\n"
                f"    <priority>{pri}</priority>\n"
                "  </url>"
            )
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
        '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
        + "\n".join(urls) + "\n</urlset>\n"
    )


def apply_domain(base):
    html_files = sorted(ROOT.glob("*.html"))
    for sub, _ in LOCALES:
        if sub:
            html_files += sorted((ROOT / sub).glob("*.html"))
    n_files, n_hits = 0, 0
    for html in html_files:
        text = html.read_text(encoding="utf-8")
        if PLACEHOLDER in text:
            n_hits += text.count(PLACEHOLDER)
            html.write_text(text.replace(PLACEHOLDER, base + "/"), encoding="utf-8")
            n_files += 1
            print(f"  已替换域名占位符: {html.relative_to(ROOT).as_posix()}")
    robots = ROOT / "robots.txt"
    if robots.exists():
        text = robots.read_text(encoding="utf-8")
        text = re.sub(r"Sitemap: .*", f"Sitemap: {base}/sitemap.xml", text)
        robots.write_text(text, encoding="utf-8")
    print(f"域名替换完成：{n_files} 个文件 / {n_hits} 处占位符 → {base}/")


def main():
    ap = argparse.ArgumentParser(description="生成多语言 sitemap 并替换 SEO 域名")
    ap.add_argument("--base", required=True, help="站点基准 URL，如 https://user.github.io/repo")
    ap.add_argument("--apply", action="store_true", help="同时替换 HTML/robots.txt 中的占位域名")
    args = ap.parse_args()
    base = args.base.rstrip("/")

    sitemap = ROOT / "sitemap.xml"
    sitemap.write_text(build_sitemap(base), encoding="utf-8")
    print(f"sitemap.xml 已生成（{len(PAGES)} 页 × {len(LOCALES)} 语言，含 hreflang 互链，基准 {base}/）")

    if args.apply:
        apply_domain(base)


if __name__ == "__main__":
    main()
