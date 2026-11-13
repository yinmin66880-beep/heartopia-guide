import importlib.util
import json
import tempfile
import unittest
from datetime import date
from pathlib import Path
from unittest.mock import patch


spec = importlib.util.spec_from_file_location(
    "fetch_daily", Path(__file__).resolve().parents[1] / "scripts" / "fetch_daily.py"
)
pipeline = importlib.util.module_from_spec(spec)
spec.loader.exec_module(pipeline)


class CodeHistoryTests(unittest.TestCase):
    def test_pending_morning_and_visitor_comment_do_not_create_no_code_day(self):
        target = date(2026, 11, 3)
        history = [{"date": "2026-11-02", "codes": ["HEGZSP5"], "api": True}]
        for seen in ([], [str(target)]):
            with self.subTest(seen=seen), tempfile.TemporaryDirectory() as tmp:
                path = Path(tmp) / "history.js"
                original = "window.HEARTOPIA_CODE_HISTORY = " + json.dumps(history) + ";\n"
                path.write_text(original, encoding="utf-8")
                with patch.object(pipeline, "CODES_HIST_JS", path):
                    pipeline.update_codes_history(target, {"codes": []},
                        {"pairs": [], "seen": seen, "no_code": []}, history)
                self.assertEqual(path.read_text(encoding="utf-8"), original)

    def test_explicit_no_code_and_later_published_code_are_archived(self):
        target = date(2026, 11, 3)
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "history.js"
            with patch.object(pipeline, "CODES_HIST_JS", path), patch.object(pipeline, "ROOT", Path(tmp)):
                pipeline.update_codes_history(target, {"codes": []},
                    {"pairs": [], "seen": [str(target)], "no_code": [str(target)]}, [])
                self.assertEqual(pipeline.load_codes_history(), [{"date": str(target), "codes": []}])
                pipeline.update_codes_history(target, {"codes": [{"code": "HEGZSP5"}]},
                    {"pairs": [(target, "HEGZSP5", True, "author", "18:01")],
                     "seen": [str(target)], "no_code": []}, pipeline.load_codes_history())
                self.assertEqual(pipeline.load_codes_history(),
                                 [{"date": str(target), "codes": ["HEGZSP5"], "api": True}])


class ResourceTests(unittest.TestCase):
    def test_live_forest_wood_and_home_fluorite(self):
        self.assertEqual(
            pipeline.extract_res_segment(
                "溜溜木/橡木位置：森林灵橡松林 萤石位置：8号家园门口"
            ),
            {"wood": "森林灵橡松林", "stone": "8 号家园门口"},
        )

    def test_each_resource_keeps_its_own_location_in_either_order(self):
        for text in (
            "萤石位置：8号家园门口 溜溜木位置：森林灵橡松林",
            "溜溜木：森林灵橡松林，无瑕萤石：8号房",
        ):
            with self.subTest(text=text):
                self.assertEqual(
                    pipeline.extract_res_segment(text),
                    {"wood": "森林灵橡松林", "stone": "8 号家园门口"},
                )

    def test_unknown_location_does_not_borrow_from_other_resource(self):
        for text, expected in (
            ("溜溜木位置待更新 萤石位置：8号家园门口", {"stone": "8 号家园门口"}),
            ("萤石位置待更新 溜溜木位置：森林灵橡松林", {"wood": "森林灵橡松林"}),
        ):
            with self.subTest(text=text):
                self.assertEqual(pipeline.extract_res_segment(text), expected)

    def test_previous_day_and_existing_aliases(self):
        for text in (
            "溜溜木/橡木位置：12号家园门口 萤石位置：温泉山遗迹老家",
            "溜溜橡木：12号（溜溜木） 无暇萤石在温泉山老家",
            "溜溜木在12号房 无瑕萤石：遗迹老家",
        ):
            with self.subTest(text=text):
                self.assertEqual(
                    pipeline.extract_res_segment(text),
                    {"wood": "12 号家园门口", "stone": "温泉山遗迹"},
                )

    def test_first_location_wins_and_invalid_home_is_ignored(self):
        self.assertEqual(
            pipeline.extract_res_segment("萤石在8号房，附近通往森林灵橡松林"),
            {"stone": "8 号家园门口"},
        )
        self.assertEqual(pipeline.extract_res_segment("溜溜木在13号房 萤石在0号房"), {})


class StrategyCardTests(unittest.TestCase):
    def test_undated_bird_guide_cannot_supply_daily_weather(self):
        payload = '''
          <a class="tap-router app-strategy-v2__item" href="/moment/1">
            <div>10月26日小镇日报</div><div>溜溜木在7号家园 萤石在2号家园</div>
          </a>
          <a class="app-strategy-v2__item" href="/moment/2">
            <div>近幽集限定鸟 五星攻略</div>
            <div>天气：下雨/彩虹 时间：6-18点 下雨/彩虹</div>
          </a>
          <script>["10月26日小镇日报", "天气：6-18点下雨"]</script>
        '''
        segments = pipeline.source_posts(payload, date(2026, 10, 26), "strategy-collection")
        self.assertEqual(len(segments), 1)
        self.assertEqual(pipeline.extract_res_segment(segments[0][1]),
                         {"wood": "7 号家园门口", "stone": "2 号家园门口"})
        self.assertIsNone(pipeline.parse_today_weather(segments[0][1]))

    def test_dated_cards_keep_weather_and_codes_on_their_own_dates(self):
        payload = '''
          <a href="/moment/1" class="app-strategy-v2__item">
            <div>10.25号心动小镇攻略</div><div>6点-12点，18点-24点有雨</div>
          </a>
          <a href="/moment/2" class="app-strategy-v2__item">
            <div>2026.10.26今日兑换码 W3XH6UA</div>
          </a>
        '''
        segments = pipeline.source_posts(payload, date(2026, 10, 26), "strategy-collection")
        self.assertEqual([day.day for day, _ in segments], [25, 26])
        self.assertEqual(pipeline.parse_today_weather(segments[0][1]),
                         [{"t": "rain", "s": 6, "e": 12}, {"t": "rain", "s": 18, "e": 24}])
        self.assertIsNone(pipeline.parse_today_weather(segments[1][1]))
        self.assertEqual(pipeline.extract_codes_segment(segments[1][1], date(2026, 10, 26), date(2026, 10, 26)),
                         ["W3XH6UA"])

    def test_collection_scripts_and_unknown_layout_supply_no_dated_evidence(self):
        payload = '<script>"10月26日小镇日报 天气6-18点有雨"</script>'
        self.assertEqual(pipeline.source_posts(payload, date(2026, 10, 26), "strategy-collection"), [])
        self.assertEqual(pipeline.source_posts('<div>10月26日小镇日报 天气6-18点有雨</div>',
                                             date(2026, 10, 26), "strategy-collection"), [])
        self.assertEqual(pipeline.source_posts("10.26号心动小镇攻略 18-24点有流星雨",
                                             date(2026, 10, 26), "daily-moment"),
                         [(date(2026, 10, 26), "10.26号心动小镇攻略 18-24点有流星雨")])


class FeedCardTests(unittest.TestCase):
    def test_hidden_old_forecast_and_adjacent_guides_cannot_borrow_today_date(self):
        payload = '''
          <a class="tap-router moment-article__link" href="/moment/1?group_id=4761">
            <span>11.3心动小镇刚更新溜溜橡木和萤石位置</span>
            <div>2026.11.3位置日报 无特殊天气 溜溜木在4号家园 萤石在1号家园</div>
          </a>
          <div class="comment">今日兑换码 E6VT9QA</div>
          <a class="moment-article__link" href="/moment/2">
            <span>近幽集限定鸟攻略</span><div>彩虹时间：12:00-18:00</div>
          </a>
          <aside><a href="/moment/3">11月2日 彩虹天攻略</a></aside>
          <script id="__NUXT_DATA__">["11.3心动小镇刚更新溜溜橡木和萤石位置",
            "11月2日 彩虹天攻略", "彩虹时间：12:00-18:00 兑换码：E6VT9QA"]</script>
        '''
        target = date(2026, 11, 3)
        for source_type in ("topic", "hashtag", "user-moments"):
            with self.subTest(source_type=source_type):
                [(day, text)] = pipeline.source_posts(payload, target, source_type)
                self.assertEqual(day, target)
                self.assertEqual(pipeline.extract_res_segment(text),
                                 {"wood": "4 号家园门口", "stone": "1 号家园门口"})
                self.assertIsNone(pipeline.parse_today_weather(text))
                self.assertEqual(pipeline.extract_codes_segment(text, day, target), [])
                cal = {"days": {}}
                pipeline.learn_weather(cal, [(day, text)], {"name": "feed"}, target, {"notes": []})
                self.assertEqual(cal["days"], {})

    def test_spaced_weather_title_keeps_forecast_on_its_own_card_date(self):
        payload = '''
          <a class="moment-article__link" href="/moment/1">
            <span>11月2日 彩虹天攻略</span><div>彩虹时间：12:00-18:00<br/>朵朵位置待更新</div>
          </a>
          <a class="moment-article__link" href="/moment/2">
            <span>11.3号心动小镇攻略来啦！！！</span><div>溜溜木在4号家园</div>
          </a>
        '''
        for source_type in ("topic", "hashtag"):
            with self.subTest(source_type=source_type):
                segments = pipeline.source_posts(payload, date(2026, 11, 3), source_type)
                self.assertEqual([day for day, _ in segments], [date(2026, 11, 2), date(2026, 11, 3)])
                self.assertEqual(pipeline.parse_today_weather(segments[0][1]),
                                 [{"t": "rainbow", "s": 12, "e": 18}])
                self.assertIsNone(pipeline.parse_today_weather(segments[1][1]))

    def test_unrecognized_feed_layout_supplies_no_dated_evidence(self):
        for source_type in ("topic", "hashtag"):
            self.assertEqual(pipeline.source_posts(
                '<div>11.3心动小镇攻略 彩虹时间：12:00-18:00</div>',
                date(2026, 11, 3), source_type), [])


class MomentContentTests(unittest.TestCase):
    def test_old_recommendation_cannot_borrow_main_post_date(self):
        payload = """
          <div class="moment-detail__main-inner">
            <h1 class="heading-m20-w20 moment-head__title">10月31日小镇日报</h1>
            <div><div class="tap-rich-content__wrapper moment-detail__module-space">
              <div>溜溜木位置：12号家园门口<br>萤石位置：4号家园门口</div>
              <img src="wood.png"><p>每日18点更新码</p>
              <script>今日兑换码 E6VT9QA</script>
            </div></div>
          </div>
          <aside><a class="ugc-rec-card"><div>10.18兑换码心动小镇</div>
            <div>无瑕萤石：温泉山遗迹 兑换码：E6VT9QA 天气6-18点有雨</div>
          </a></aside>
          <script id="__NUXT_DATA__">["10月31日小镇日报", "兑换码：E6VT9QA"]</script>
        """
        target = date(2026, 10, 31)
        segments = pipeline.source_posts(payload, target, "daily-moment")
        self.assertEqual(len(segments), 1)
        self.assertEqual(segments[0][0], target)
        self.assertEqual(pipeline.extract_res_segment(segments[0][1]),
                         {"wood": "12 号家园门口", "stone": "4 号家园门口"})
        self.assertEqual(pipeline.extract_codes_segment(segments[0][1], target, target), [])
        self.assertIsNone(pipeline.parse_today_weather(segments[0][1]))

    def test_dated_body_keeps_real_codes_and_weather(self):
        payload = """<div class="moment-detail__main-inner">
          <h1 class="moment-head__title">心动小镇最新每日兑换码</h1>
          <div class="tap-rich-content__wrapper">
            2026.10.30今日兑换码 <b>6C3KYC6</b> 18-24点有流星雨
          </div></div>"""
        target = date(2026, 10, 30)
        [(day, segment)] = pipeline.source_posts(payload, target, "daily-moment")
        self.assertEqual(day, target)
        self.assertEqual(pipeline.extract_codes_segment(segment, day, target), ["6C3KYC6"])
        self.assertEqual(pipeline.parse_today_weather(segment), [{"t": "meteor", "s": 18, "e": 24}])

    def test_unknown_html_or_scripts_supply_no_main_post_evidence(self):
        for payload in ('<div>10月31日小镇日报 兑换码：E6VT9QA</div>',
                        '<script>10月31日小镇日报 兑换码：E6VT9QA</script>'):
            self.assertEqual(pipeline.source_posts(payload, date(2026, 10, 31), "daily-moment"), [])


class ForecastTests(unittest.TestCase):
    def test_dated_chinese_clock_weather_and_rainbow_emoji_backfill_only_the_post_day(self):
        payload = '''
          <a class="app-strategy-v2__item" href="/moment/870085879299834129">
            <div>11月12日位置播报</div>
            <div>今天萤石在11号房，溜溜木在6号房<br/>
              今晚兑换码EF8J6AM<br/>中午12点-晚上6点下雨<br/>
              晚上6点-半夜12点有🌈<br/>本次的彩虹花束在温泉山</div>
          </a>
          <a class="app-strategy-v2__item" href="/moment/1">
            <div>11月13日小镇日报</div><div>天气待更新</div>
          </a>
        '''
        phases = [{"t": "rain", "s": 12, "e": 18},
                  {"t": "rainbow", "s": 18, "e": 24}]
        segments = pipeline.source_posts(payload, date(2026, 11, 13), "strategy-collection")
        self.assertEqual(pipeline.parse_today_weather(segments[0][1]), phases)
        self.assertIsNone(pipeline.parse_today_weather(segments[1][1]))
        calendar = {"days": {}}
        pipeline.learn_weather(calendar, segments, {"name": "community", "priority": "secondary"},
                               date(2026, 11, 13), {"notes": []})
        self.assertEqual(calendar["days"], {"2026-11-12": {"phases": phases, "auto": True}})
        manual = {"phases": [{"t": "snow", "s": 6, "e": 12}]}
        calendar["days"]["2026-11-12"] = manual
        pipeline.learn_weather(calendar, segments, {"name": "community"},
                               date(2026, 11, 13), {"notes": []})
        self.assertEqual(calendar["days"]["2026-11-12"], manual)

    def test_chinese_clock_ranges_keep_relative_dates_and_unknown_hours(self):
        text = "今天中午12点-晚上6点下雨；明天晚上6点-半夜12点有🌈"
        self.assertEqual(pipeline.parse_today_weather(text), [{"t": "rain", "s": 12, "e": 18}])
        self.assertEqual(pipeline.parse_forecasts(text, date(2026, 12, 31)), [
            (date(2027, 1, 1), [{"t": "rainbow", "s": 18, "e": 24}])])
        self.assertEqual(pipeline.parse_today_weather("半夜12点-早上6点下雨"),
                         [{"t": "rain", "s": 0, "e": 6}])
        for text in ("中午12点-晚上25点下雨", "中午12点-晚上6:30下雨",
                     "晚上6点-早上6点有🌈", "中午12点有🌈", "晚上6点更新兑换码 🌈",
                     "中午12点-晚上6点购买彩虹花束", "中午12点-晚上6点有雨伞",
                     "晚上6点-半夜12点🌈花束位置", "晚上6点-半夜12点有🌈花束"):
            with self.subTest(text=text):
                self.assertIsNone(pipeline.parse_today_weather(text))

    def test_live_tomorrow_rain_is_not_today_weather(self):
        text = ("11.6号心动小镇攻略来啦！！！ 1、萤石和溜溜木在8号家园 "
                "2、森林岛空心树可采摘 3、18点更新兑换码 "
                "4、明天6-12点有雨，可以找朵朵买糖")
        self.assertIsNone(pipeline.parse_today_weather(text))
        calendar = {"days": {}}
        pipeline.learn_weather(calendar, [(date(2026, 11, 6), text)],
                               {"name": "community"}, date(2026, 11, 6), {"notes": []})
        self.assertEqual(calendar["days"], {
            "2026-11-07": {"phases": [{"t": "rain", "s": 6, "e": 12}], "auto": True}})

    def test_relative_weather_keeps_separate_days_and_year_rollover(self):
        text = "今日天气：晴天；明日6-12点有雨；后天18-24点有雪"
        self.assertEqual(pipeline.parse_today_weather(text), [{"t": "sunny"}])
        self.assertEqual(pipeline.parse_forecasts(text, date(2026, 12, 31)), [
            (date(2027, 1, 1), [{"t": "rain", "s": 6, "e": 12}]),
            (date(2027, 1, 2), [{"t": "snow", "s": 18, "e": 24}])])
        self.assertEqual(pipeline.parse_today_weather(
            "昨天6-12点有雨 今天18-24点有流星雨 明天6-12点有雪"),
            [{"t": "meteor", "s": 18, "e": 24}])
        self.assertEqual(pipeline.parse_today_weather(
            "1、明天6-12点有雨 2、彩虹时间：12:00-18:00"),
            [{"t": "rainbow", "s": 12, "e": 18}])

    def test_relative_forecast_preserves_unknown_hours_and_manual_calendar(self):
        manual = {"phases": [{"t": "rainbow"}]}
        calendar = {"days": {"2026-11-07": manual}}
        pipeline.learn_weather(calendar, [(date(2026, 11, 6), "明天6-12点有雨")],
                               {"name": "community"}, date(2026, 11, 6), {"notes": []})
        self.assertEqual(calendar["days"], {"2026-11-07": manual})
        for text in ("明天24-30点有雨", "明天6:30-12:00有雨", "明天18点更新兑换码"):
            with self.subTest(text=text):
                self.assertIsNone(pipeline.parse_today_weather(text))
                self.assertEqual(pipeline.parse_forecasts(text, date(2026, 11, 6)), [])

    def test_dated_rainbow_guide_keeps_its_explicit_range_on_its_own_day(self):
        text = (
            "10.22号心动小镇攻略 18点-24点有流星雨 "
            "10月23日彩虹攻略 朵朵位置 彩虹泡泡花束 彩虹时间：12:00-18:00 "
            "10.24心动小镇攻略 天气待更新"
        )
        segments = pipeline.split_posts(text, date(2026, 10, 23))
        self.assertEqual([day.day for day, _ in segments], [22, 23, 24])
        calendar = {"days": {}}
        pipeline.learn_weather(calendar, segments, {"name": "community", "priority": "primary"},
                               date(2026, 10, 23), {"notes": []})
        self.assertEqual(calendar["days"], {
            "2026-10-22": {"phases": [{"t": "meteor", "s": 18, "e": 24}], "auto": True},
            "2026-10-23": {"phases": [{"t": "rainbow", "s": 12, "e": 18}], "auto": True},
        })

    def test_labelled_weather_ranges_preserve_unknown_hours_and_reject_invalid_times(self):
        self.assertEqual(pipeline.parse_today_weather(
            "下雨时间：6点-12点 彩虹时间：12:00-18:00 彩虹时间：12:00-18:00"
        ), [{"t": "rain", "s": 6, "e": 12}, {"t": "rainbow", "s": 12, "e": 18}])
        for text in ("彩虹时间：12:30-18:00", "彩虹时间：12:00-18:30",
                     "彩虹时间：24:00-30:00", "彩虹时间：18:00-6:00",
                     "早上六点有雨 中午12点有彩虹", "彩虹时间：12点"):
            with self.subTest(text=text):
                self.assertIsNone(pipeline.parse_today_weather(text))

    def test_dated_community_post_keeps_weather_on_its_own_day(self):
        text = (
            "2026.10.20今日兑换码 YAQVD96 "
            "10.21号心动小镇攻略来啦！！！ "
            "1、萤石在4号家园 2、溜溜木在1号家园 "
            "4、18点-24点有流星雨，会在🍎更新陨石位置 5、18点更新兑换码 "
            "10.22心动小镇攻略 天气待更新"
        )
        segments = pipeline.split_posts(text, date(2026, 10, 21))
        self.assertEqual([day for day, _ in segments], [date(2026, 10, day) for day in (20, 21, 22)])
        self.assertIsNone(pipeline.parse_today_weather(segments[0][1]))
        self.assertIsNone(pipeline.parse_today_weather(segments[2][1]))
        calendar = {"days": {}}
        pipeline.learn_weather(calendar, segments, {"name": "community", "priority": "primary"},
                               date(2026, 10, 21), {"notes": []})
        self.assertEqual(calendar["days"], {
            "2026-10-21": {"phases": [{"t": "meteor", "s": 18, "e": 24}], "auto": True}
        })

    def test_time_before_weather_does_not_invent_other_hours(self):
        for text in ("18点-24点有流星雨", "18:00–24:00 流星雨", "18-24点流星雨"):
            with self.subTest(text=text):
                self.assertEqual(pipeline.parse_today_weather(text), [{"t": "meteor", "s": 18, "e": 24}])
        for text in ("24点-30点有流星雨", "18点-6点有流星雨", "18:30-24:00流星雨",
                     "流星雨24-30", "18点更新兑换码", "无特殊天气"):
            with self.subTest(text=text):
                self.assertIsNone(pipeline.parse_today_weather(text))

    def test_shared_and_separate_explicit_weather_windows(self):
        self.assertEqual(pipeline.parse_today_weather(
            "6点-12点，18点-24点有雨，可以去找朵朵买糖哦"
        ), [{"t": "rain", "s": 6, "e": 12}, {"t": "rain", "s": 18, "e": 24}])
        self.assertEqual(pipeline.parse_today_weather(
            "6:00-12:00有雨，18点-24点有流星雨"
        ), [{"t": "rain", "s": 6, "e": 12}, {"t": "meteor", "s": 18, "e": 24}])
        self.assertEqual(pipeline.parse_today_weather(
            "6-12点、18-24点有雪；18-24点有雪"
        ), [{"t": "snow", "s": 6, "e": 12}, {"t": "snow", "s": 18, "e": 24}])
        for text in ("6点-12点，18点更新兑换码", "18:30-24:00有雨",
                     "24点-30点有雨", "18点-6点有雨", "18点-24点有雨伞"):
            with self.subTest(text=text):
                self.assertIsNone(pipeline.parse_today_weather(text))

    def test_live_rain_post_keeps_both_windows_on_its_own_date(self):
        text = ("10.24心动小镇攻略 天气待更新 "
                "10.25号心动小镇攻略来啦！！！ 1、萤石在8号家园 2、溜溜木在4号家园 "
                "3、6点-12点，18点-24点有雨，可以去找朵朵买糖哦 "
                "10.26心动小镇攻略 天气待更新")
        manual = {"phases": [{"t": "rainbow"}]}
        calendar = {"days": {"2026-10-24": manual}}
        pipeline.learn_weather(calendar, pipeline.split_posts(text, date(2026, 10, 25)),
                               {"name": "community", "priority": "primary"},
                               date(2026, 10, 25), {"notes": []})
        self.assertEqual(calendar["days"], {
            "2026-10-24": manual,
            "2026-10-25": {"phases": [{"t": "rain", "s": 6, "e": 12},
                                      {"t": "rain", "s": 18, "e": 24}], "auto": True},
        })

    def test_live_grouped_rain_forecast(self):
        text = "今日天气: 晴天 13日周二 14日周三 17日周六 下雨天 🎁 今日物资"
        self.assertEqual(
            pipeline.parse_forecasts(text, date(2026, 10, 11)),
            [(date(2026, 10, day), [{"t": "rain"}]) for day in (13, 14, 17)],
        )

    def test_separate_groups_keep_their_own_weather(self):
        self.assertEqual(
            pipeline.parse_forecasts(
                "13日周二14日周三 下雨天 17日周六 流星雨", date(2026, 10, 11)
            ),
            [
                (date(2026, 10, 13), [{"t": "rain"}]),
                (date(2026, 10, 14), [{"t": "rain"}]),
                (date(2026, 10, 17), [{"t": "meteor"}]),
            ],
        )

    def test_grouped_time_range_across_year_boundary(self):
        phases = [{"t": "rain", "s": 0, "e": 6}, {"t": "sunny"}]
        self.assertEqual(
            pipeline.parse_forecasts(
                "1日周五 2日周六 0-6点 下雨天", date(2026, 12, 31)
            ),
            [(date(2027, 1, day), phases) for day in (1, 2)],
        )

    def test_invalid_dates_ranges_and_distant_forecasts_are_ignored(self):
        for text in (
            "31日周二 下雨天", "30日周五 下雨天",
            "13日周二14日周三 24-30点 下雨天", "13日周二 18-6点 下雨天",
            "13日周二14日周三 兑换码18点更新",
        ):
            with self.subTest(text=text):
                self.assertEqual(pipeline.parse_forecasts(text, date(2026, 4, 11)), [])

    def test_learning_fills_group_without_overwriting_manual_weather(self):
        manual = {"phases": [{"t": "rainbow"}]}
        calendar = {"days": {"2026-10-14": manual}}
        audit = {"notes": []}
        changed = pipeline.learn_weather(
            calendar,
            [(date(2026, 10, 11), "13日周二 14日周三 17日周六 下雨天")],
            {"name": "author forecast", "priority": "primary"},
            date(2026, 10, 13), audit,
        )
        self.assertTrue(changed)
        self.assertEqual(calendar["days"]["2026-10-14"], manual)
        for day in (13, 17):
            self.assertEqual(
                calendar["days"][f"2026-10-{day}"],
                {"phases": [{"t": "rain"}], "auto": True},
            )


if __name__ == "__main__":
    unittest.main()
