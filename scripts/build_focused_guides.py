"""Build the paired EN/JA editorial guides; uses only the Python standard library.

Content is authored in data-src/focused-guides.json. Dates describe editorial
review, not automated rebuild time. Run with --check to detect stale output.
"""
from __future__ import annotations

import argparse
from html import escape
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://heartopiaguide.net"
LABELS = {
    "en": {
        "brand": "Heartopia Guide", "home": "Home", "weather": "Weather", "fishing": "Fishing",
        "templates": "Templates", "codes": "Codes", "guide": "Newbie Route", "money": "Money Guide",
        "recipes": "Recipes", "gifts": "Gift Guide", "about": "About", "privacy": "Privacy",
        "skip": "Skip to guide", "nav": "Main navigation", "contents": "In this guide",
        "read": "More useful guides", "sources": "Sources & scope", "reviewed": "Editorial review",
        "editor": "Heartopia Guide", "unofficial": "Independent fan guide. Not affiliated with XD Inc.",
        "quick": "Start here", "print": "Print-friendly: use your browser's Print command for the checklist and worksheet.",
        "worksheet": "Your session notes", "field": "Write your own details in the spaces below.",
        "correction": "Report a correction", "lang": "Guide languages",
    },
    "ja": {
        "brand": "ハートピア攻略手帳", "home": "ホーム", "weather": "天気", "fishing": "釣り",
        "templates": "家づくり", "codes": "コード", "guide": "初心者ルート", "money": "金策",
        "recipes": "料理", "gifts": "ギフト", "about": "運営情報", "privacy": "プライバシー",
        "skip": "本文へ移動", "nav": "メインナビゲーション", "contents": "このガイドの内容",
        "read": "あわせて読みたいガイド", "sources": "参照元と対象範囲", "reviewed": "編集確認日",
        "editor": "ハートピア攻略手帳", "unofficial": "XD Inc.とは関係のない非公式ファンガイドです。",
        "quick": "まず確認すること", "print": "印刷対応：ブラウザーの印刷機能でチェックリストと記入欄を印刷できます。",
        "worksheet": "自分用メモ", "field": "空欄に、ゲーム内で確認した内容を記入してください。",
        "correction": "誤りを報告する", "lang": "このガイドの言語",
    },
}


def e(value: str) -> str:
    return escape(str(value), quote=True)


def render(page: dict, lang: str, dataset: dict) -> str:
    text = page[lang]
    labels = LABELS[lang]
    slug = page["slug"]
    url = f"{ORIGIN}/{lang}/{slug}"
    topic = page.get("topic", "fishing")
    nav = "".join(f'<a href="{key}">{e(labels[key])}</a>' for key in
                  ("codes", "weather", "fishing", "templates", "guide", "money", "recipes", "gifts"))
    sections = "\n".join(
        f'<section class="fg-section" id="{e(section["id"])}"><h2>{e(section["title"])}</h2>{section["html"]}</section>'
        for section in text["sections"]
    )
    toc = "".join(f'<li><a href="#{e(section["id"])}">{e(section["title"])}</a></li>' for section in text["sections"])
    quick = "".join(f"<li>{e(item)}</li>" for item in text["quick"])
    worksheet = "".join(f'<div class="fg-write-line"><strong>{e(field)}</strong><span aria-hidden="true"></span></div>' for field in text["worksheet"])
    sources = "".join(f'<li><a href="{e(source["url"])}">{e(source[lang]["title"])}</a><p>{e(source[lang]["note"])}</p></li>' for source in page["sources"])
    related = "".join(f'<a class="fg-related-card" href="{e(other["slug"])}"><strong>{e(other[lang]["title"])}</strong><span>{e(other[lang]["description"])}</span></a>' for other in dataset["pages"] if other["slug"] != slug)
    language_links = "".join(f'<a href="/{code}/{slug}" lang="{code}" hreflang="{code}"' + (' aria-current="page"' if code == lang else '') + f'>{name}</a>' for code, name in (("en", "English"), ("ja", "日本語")))
    schema = {
        "@context": "https://schema.org", "@type": "Article", "headline": text["title"],
        "description": text["description"], "inLanguage": lang, "url": url,
        "datePublished": dataset["reviewed"], "dateModified": dataset["reviewed"],
        "author": {"@type": "Organization", "name": labels["editor"], "url": f"{ORIGIN}/{lang}/about"},
        "publisher": {"@type": "Organization", "name": labels["brand"], "url": f"{ORIGIN}/{lang}/"},
        "citation": [source["url"] for source in page["sources"]],
    }
    schema_json = json.dumps(schema, ensure_ascii=False).replace('</', '<\\/')
    social = (f'<meta property="og:image" content="{ORIGIN}/assets/social/weather-fishing-{lang}.png">\n'
              '<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n'
              '<meta name="twitter:card" content="summary_large_image">') if topic == 'fishing' else ''
    return f'''<!DOCTYPE html>
<html lang="{lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{e(text["title"])} | {e(labels["brand"])}</title>
<meta name="description" content="{e(text["description"])}">
<meta name="theme-color" content="#FAF5EA">
<link rel="canonical" href="{url}">
<link rel="alternate" hreflang="en" href="{ORIGIN}/en/{slug}">
<link rel="alternate" hreflang="ja" href="{ORIGIN}/ja/{slug}">
<meta property="og:type" content="article">
<meta property="og:title" content="{e(text["title"])}">
<meta property="og:description" content="{e(text["description"])}">
<meta property="og:url" content="{url}">
{social}
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🏡%3C/text%3E%3C/svg%3E">
<link rel="stylesheet" href="../assets/css/style.css">
<link rel="stylesheet" href="../assets/css/focused-guides.css">
<link rel="stylesheet" href="../assets/css/planner.css">
<script type="application/ld+json">{schema_json}</script>
</head>
<body class="focused-guide" data-page="{topic}">
<a class="fg-skip" href="#main">{e(labels["skip"])}</a>
<nav aria-label="{e(labels["nav"])}"><div class="nav-inner">
<a class="logo display" href="./"><span class="house" aria-hidden="true">🏡</span>{e(labels["brand"])}</a>
<div class="nav-links"><a href="./">{e(labels["home"])}</a>{nav}</div>
</div></nav>
<header class="fg-hero wrap">
<p class="crumbs"><a href="./">{e(labels["home"])}</a> / <a href="{topic}">{e(labels[topic])}</a></p>
<div class="fg-hero-meta"><span class="hero-kicker">{e(text["kicker"])}</span><div class="fg-languages" aria-label="{e(labels["lang"])}">{language_links}</div></div>
<h1 class="display">{e(text["title"])}</h1>
<p class="fg-deck">{e(text["description"])}</p>
<p class="fg-byline">{e(labels["editor"])} · {e(labels["reviewed"])} <time datetime="{dataset["reviewed"]}">{dataset["reviewed"]}</time></p>
</header>
<main id="main" class="wrap fg-main">
<div class="fg-layout">
<article>
<aside class="fg-quick" aria-labelledby="fg-quick-title"><h2 id="fg-quick-title">{e(labels["quick"])}</h2><ol>{quick}</ol></aside>
{sections}
<section class="fg-section fg-worksheet" aria-labelledby="worksheet-title"><h2 id="worksheet-title">{e(labels["worksheet"])}</h2><p>{e(labels["field"])}</p>{worksheet}<p class="fg-print-note">{e(labels["print"])}</p></section>
<section class="fg-section fg-sources" id="sources"><h2>{e(labels["sources"])}</h2><p>{e(text["scope"])}</p><ol>{sources}</ol><p><a href="mailto:contact@heartopiaguide.net">{e(labels["correction"])}</a></p></section>
</article>
<aside class="fg-toc"><h2>{e(labels["contents"])}</h2><ol>{toc}<li><a href="#sources">{e(labels["sources"])}</a></li></ol><a class="fg-tool-link" href="weather">{e(text["weather_cta"])}</a><a class="fg-tool-link" href="fishing#now">{e(text["fish_cta"])}</a></aside>
</div>
<section class="fg-related" aria-labelledby="related-title"><h2 id="related-title">{e(labels["read"])}</h2><div>{related}</div></section>
</main>
<footer><div class="foot-logo display">🏡 {e(labels["brand"])}</div><div class="foot-nav"><a href="./">{e(labels["home"])}</a><a href="weather">{e(labels["weather"])}</a><a href="fishing">{e(labels["fishing"])}</a><a href="templates">{e(labels["templates"])}</a><a href="about">{e(labels["about"])}</a><a href="privacy">{e(labels["privacy"])}</a></div><p>{e(labels["unofficial"])}</p></footer>
<script src="../assets/js/analytics-config.js"></script>
<script src="../assets/js/analytics.js"></script>
</body>
</html>
'''


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Fail if generated pages differ from authored content")
    args = parser.parse_args()
    dataset = json.loads((ROOT / "data-src/focused-guides.json").read_text(encoding="utf-8"))
    changed = []
    for page in dataset["pages"]:
        for lang in LABELS:
            path = ROOT / lang / f'{page["slug"]}.html'
            output = render(page, lang, dataset)
            if not path.exists() or path.read_text(encoding="utf-8") != output:
                changed.append(path.relative_to(ROOT).as_posix())
                if not args.check:
                    path.write_text(output, encoding="utf-8", newline="\n")
    if args.check and changed:
        print("Stale focused guides: " + ", ".join(changed))
        return 1
    print(f'{"Checked" if args.check else "Built"} {len(dataset["pages"]) * len(LABELS)} focused guides.')
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
