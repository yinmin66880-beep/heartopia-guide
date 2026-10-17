import importlib.util,json,tempfile,unittest
from pathlib import Path

spec=importlib.util.spec_from_file_location('render_weather',Path(__file__).resolve().parents[1]/'scripts/render_weather.py')
renderer=importlib.util.module_from_spec(spec);spec.loader.exec_module(renderer)

class RenderWeatherTests(unittest.TestCase):
    def test_unknown_date_is_not_sunny_or_previous_day(self):
        cal={'updated':'2026-10-17','days':{'2026-10-17':{'phases':[{'t':'rain'}]}}}
        result=renderer.snapshot(cal,{'generatedAt':'2026-10-17 23:00:00'},'2026-10-18','en')
        self.assertIn('Not yet confirmed',result)
        self.assertNotIn('<strong>Rain</strong>',result)
        self.assertIn('2026-10-18',result)
        self.assertIn('UTC+8',result)

    def test_render_is_idempotent_and_preserves_source(self):
        with tempfile.TemporaryDirectory() as folder:
            root=Path(folder);(root/'data-src').mkdir();(root/'data').mkdir()
            cal={'updated':'2026-10-17','days':{'2026-10-17':{'phases':[{'t':'rain','s':12,'e':18}]}}}
            (root/'data-src/weather-calendar.json').write_text(json.dumps(cal),encoding='utf-8')
            (root/'data/daily.json').write_text(json.dumps({'generatedAt':'2026-10-17 10:00:00'}),encoding='utf-8')
            for lang in ['','en','ja','ko']:
                (root/lang).mkdir(exist_ok=True);(root/lang/'weather.html').write_text('<main class="wrap"></main>',encoding='utf-8')
            renderer.render(root,'2026-10-17');first=(root/'en/weather.html').read_text(encoding='utf-8')
            renderer.render(root,'2026-10-17')
            self.assertEqual(first,(root/'en/weather.html').read_text(encoding='utf-8'))
            self.assertEqual(first.count('weather-snapshot:start'),1)
            self.assertIn('Rain 12:00–18:00',first)
            self.assertEqual(json.loads((root/'data-src/weather-calendar.json').read_text(encoding='utf-8')),cal)

if __name__=='__main__':unittest.main()
