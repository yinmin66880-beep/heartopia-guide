"""Validate focused guide metadata, static fallbacks, links and script syntax."""
import json,re,subprocess
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit,unquote
from xml.etree import ElementTree

ROOT=Path(__file__).resolve().parents[1]
class Inspect(HTMLParser):
    def __init__(self):super().__init__();self.h1=0;self.ids=[];self.links=[];self.scripts=[];self.styles=[];self.ld=[];self.in_ld=False;self.canonical=[];self.alternates=[]
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        if tag=='h1':self.h1+=1
        if d.get('id'):self.ids.append(d['id'])
        if tag=='a' and d.get('href'):self.links.append(d['href'])
        if tag=='script':
            if d.get('src'):self.scripts.append(d['src'])
            self.in_ld=d.get('type')=='application/ld+json'
        if tag=='link':
            if d.get('rel')=='stylesheet':self.styles.append(d['href'])
            if d.get('rel')=='canonical':self.canonical.append(d['href'])
            if d.get('rel')=='alternate':self.alternates.append((d.get('hreflang'),d.get('href')))
    def handle_endtag(self,tag):
        if tag=='script':self.in_ld=False
    def handle_data(self,data):
        if self.in_ld:self.ld.append(json.loads(data))

def resolve(path,url):
    parts=urlsplit(url)
    if parts.scheme or parts.netloc:return True
    link=unquote(parts.path)
    if not link:return True
    target=(ROOT/link.lstrip('/')) if link.startswith('/') else path.parent/link
    return target.exists() or (not target.suffix and target.with_suffix('.html').exists())

def main():
    guides=json.loads((ROOT/'data-src/focused-guides.json').read_text(encoding='utf-8'))['pages']
    pages=[ROOT/lang/(page+'.html') for lang in ['','en','ja','ko'] for page in ['weather','fishing']]
    pages += [ROOT/lang/(g['slug']+'.html') for lang in ['en','ja'] for g in guides]
    for path in pages:
        text=path.read_text(encoding='utf-8');parsed=Inspect();parsed.feed(text)
        assert parsed.h1==1,(path,'heading count')
        assert len(parsed.ids)==len(set(parsed.ids)),(path,'duplicate IDs')
        assert len(parsed.canonical)==1,(path,'canonical')
        for url in parsed.links+parsed.scripts+parsed.styles:assert resolve(path,url),(path,url)
        if path.name=='weather.html':
            assert 'weather-snapshot:start' in text,(path,'missing static summary')
            assert 'unlisted dates are sunny' not in text.lower()
            assert 'function todayStr' not in text
        if path.name=='fishing.html':
            assert '<tbody><tr>' in text,(path,'missing static catalog')
            assert 'id="plannerBrowseAll"' in text
        if path.stem.endswith('-guide'):
            assert {a[0] for a in parsed.alternates}=={'en','ja'},path
            assert parsed.ld and parsed.ld[0]['@type']=='Article',path
    tree=ElementTree.parse(ROOT/'sitemap.xml');namespace={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
    locations=[node.text for node in tree.findall('s:url/s:loc',namespace)]
    html_count=len(list(ROOT.glob('*.html')))+sum(len(list((ROOT/lang).glob('*.html'))) for lang in ['en','ja','ko'])
    assert len(locations)==html_count and len(set(locations))==html_count
    for location in locations:assert resolve(ROOT/'index.html',urlsplit(location).path),location
    scripts=list((ROOT/'assets/js').glob('*.js'))
    for path in scripts:subprocess.run(['node','--check',str(path)],check=True,capture_output=True)
    for lang in ['en','ja']:ElementTree.parse(ROOT/'assets/social'/f'weather-fishing-{lang}.svg')
    print(f'Growth validation passed: {len(pages)} feature/guide pages, {len(locations)} sitemap URLs, {len(scripts)} JavaScript files, static fallbacks and social SVGs.')

if __name__=='__main__':main()
