#!/usr/bin/env python3
"""IndexNow 推送：每日数据更新并部署后，通知搜索引擎重新抓取受影响页面。

用法:
    python scripts/ping_indexnow.py            # 推送每日更新的 12 个页面
    python scripts/ping_indexnow.py URL ...     # 推送指定 URL

IndexNow 协议: https://www.indexnow.org/documentation
key 文件需托管在站点根目录，Bing/Yandex/Seznam/Naver 共享同一提交入口。
"""

import json
import sys
import urllib.request

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
KEY_FILE = next(p for p in ROOT.glob("*.txt") if p.stem == p.read_text(encoding="utf-8").strip())
KEY = KEY_FILE.stem
HOST = "heartopiaguide.net"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"

# 每日数据（兑换码/天气/物资）渲染到的页面，随 fetch_daily.py 更新而变化
# 注意：必须使用干净 URL（无 .html），与 canonical/sitemap 一致
DAILY_URLS = [
    f"https://{HOST}/{sub}{page}"
    for sub in ("", "en/", "ja/", "ko/")
    for page in ("", "codes", "weather")
]


def ping(urls: list[str]) -> int:
    payload = json.dumps({
        "host": HOST,
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls,
    }).encode("utf-8")

    req = urllib.request.Request(
        "https://api.indexnow.org/IndexNow",
        data=payload,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            code = resp.status
    except urllib.error.HTTPError as e:
        code = e.code
    # 200 = 成功, 202 = 已接收待校验, 4xx = key 校验失败或格式错误
    print(f"IndexNow 推送 {len(urls)} 个 URL -> HTTP {code}")
    return code


def main() -> None:
    urls = sys.argv[1:] or DAILY_URLS
    code = ping(urls)
    if code not in (200, 202):
        raise SystemExit(f"IndexNow 推送失败: HTTP {code}（检查 key 文件是否已部署）")


if __name__ == "__main__":
    main()
