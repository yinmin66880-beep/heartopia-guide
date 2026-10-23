import importlib.util
import unittest
from datetime import date
from pathlib import Path


spec = importlib.util.spec_from_file_location(
    "fetch_daily", Path(__file__).resolve().parents[1] / "scripts" / "fetch_daily.py"
)
pipeline = importlib.util.module_from_spec(spec)
spec.loader.exec_module(pipeline)


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


class ForecastTests(unittest.TestCase):
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
