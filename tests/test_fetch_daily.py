import importlib.util
import unittest
from datetime import date
from pathlib import Path


spec = importlib.util.spec_from_file_location(
    "fetch_daily", Path(__file__).resolve().parents[1] / "scripts" / "fetch_daily.py"
)
pipeline = importlib.util.module_from_spec(spec)
spec.loader.exec_module(pipeline)


class ForecastTests(unittest.TestCase):
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
