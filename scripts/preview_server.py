"""Local-only static preview with Cloudflare Pages-style clean HTML URLs."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote,urlsplit

ROOT=Path(__file__).resolve().parents[1]
class Handler(SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(ROOT),**kwargs)
    def do_GET(self):
        path=urlsplit(self.path).path
        target=(ROOT/unquote(path).lstrip('/')).resolve()
        if target.is_relative_to(ROOT) and not target.suffix and target.with_suffix('.html').is_file():
            self.path=path+'.html'
        return super().do_GET()

if __name__=='__main__':
    print('Local preview: http://127.0.0.1:8765',flush=True)
    ThreadingHTTPServer(('127.0.0.1',8765),Handler).serve_forever()
