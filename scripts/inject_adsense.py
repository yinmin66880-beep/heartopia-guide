#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""向全站 HTML 注入 / 移除 Google AdSense 自动广告加载器，并维护 ads.txt。

用法：
    python scripts/inject_adsense.py --pub pub-1234567890123456   # 注入（幂等，可重复执行）
    python scripts/inject_adsense.py --remove                     # 移除已注入的代码并还原 ads.txt 占位

说明：
    - 注入位置：每个 HTML 的 </head> 前，带注释标记便于移除。
    - ads.txt 同步写入 pub-ID；授权 tag 固定为 f08c47fec0942fa0（Google 官方值）。
    - AdSense 账号在 https://adsense.google.com 创建，pub-ID 形如 ca-pub-1234567890123456。
"""

import argparse
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ADS_TXT = ROOT / "ads.txt"
MARKER = "<!-- adsense:auto-ads -->"
TAG_TPL = (
    f'{MARKER}\n'
    '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={pub}" crossorigin="anonymous"></script>'
)
PLACEHOLDER_LINE = "# AdSense 授权占位：拿到 pub-ID 后运行 python scripts/inject_adsense.py --pub ca-pub-XXXX 自动生成\n"
PLACEHOLDER_LINE += "# google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0"


def all_html_files():
    files = sorted(ROOT.glob("*.html"))
    for sub in ("en", "ja", "ko"):
        files += sorted((ROOT / sub).glob("*.html"))
    return files


def inject(pub: str) -> None:
    tag = TAG_TPL.format(pub=pub)
    n_new, n_skip = 0, 0
    for html in all_html_files():
        text = html.read_text(encoding="utf-8")
        if "adsbygoogle.js" in text:
            n_skip += 1
            continue
        if "</head>" not in text:
            print(f"  WARN 无 </head>，跳过: {html.relative_to(ROOT).as_posix()}")
            continue
        text = text.replace("</head>", tag + "\n</head>", 1)
        html.write_text(text, encoding="utf-8")
        n_new += 1
    print(f"AdSense 加载器注入完成：新注入 {n_new} 页 / 已存在跳过 {n_skip} 页（{pub}）")

    m = re.fullmatch(r"ca-(pub-\d{16})", pub)
    pub_id = m.group(1) if m else pub.removeprefix("ca-")
    ADS_TXT.write_text(
        f"google.com, {pub_id}, DIRECT, f08c47fec0942fa0\n", encoding="utf-8"
    )
    print(f"ads.txt 已写入：google.com, {pub_id}, DIRECT, f08c47fec0942fa0")


def remove() -> None:
    n_removed = 0
    for html in all_html_files():
        text = html.read_text(encoding="utf-8")
        if MARKER not in text:
            continue
        text = re.sub(
            re.escape(MARKER) + r"\s*<script[^>]*adsbygoogle\.js[^>]*></script>\s*",
            "",
            text,
        )
        html.write_text(text, encoding="utf-8")
        n_removed += 1
    print(f"AdSense 加载器已从 {n_removed} 页移除")
    ADS_TXT.write_text(PLACEHOLDER_LINE + "\n", encoding="utf-8")
    print("ads.txt 已还原为占位模板")


def main() -> None:
    ap = argparse.ArgumentParser(description="注入/移除 Google AdSense 自动广告代码")
    ap.add_argument("--pub", help="AdSense 发布商 ID，如 ca-pub-1234567890123456")
    ap.add_argument("--remove", action="store_true", help="移除已注入的 AdSense 代码")
    args = ap.parse_args()

    if args.remove:
        remove()
        return
    if not args.pub:
        ap.error("需要 --pub（ca-pub-XXXX）或 --remove")
    if not re.fullmatch(r"ca-pub-\d{16}", args.pub):
        ap.error("pub-ID 格式应为 ca-pub- + 16 位数字，如 ca-pub-1234567890123456")
    inject(args.pub)


if __name__ == "__main__":
    main()
