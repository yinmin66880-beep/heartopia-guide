/* Heartopia · weather calendar data, English edition
 * Same schema as data/weather.js (Chinese canonical) — keep entries in sync.
 * In-game weather follows an official fixed schedule; this calendar is
 * community-maintained and cross-checked by the daily pipeline. */
window.HEARTOPIA_WEATHER = {
  updated: "2026-09-03",
  source: {
    name: "TapTap Heartopia · Weather Forecast Library",
    url: "https://www.taptap.cn/app/45213/strategy/entity-collection/283527"
  },
  note: "Weather in Heartopia follows an official fixed schedule. Special weather (rain / rainbow / snow / meteor showers) determines limited fish and exclusive gathering spots.",
  days: {
    "2026-09-01": { label: "Sunny",     icon: "☀️",    note: "" },
    "2026-09-02": { label: "Sunny → Rain", icon: "🌤️", note: "Rain after 18:00" },
    "2026-09-03": { label: "Sunny → Rain", icon: "🌤️", note: "Rain after 12:00" },
    "2026-09-08": { label: "Rain + Rainbow", icon: "🌧️🌈", note: "Don't miss the rainbow-day fish (Hammerhead Shark / Rainbow Trout)", fish: "Hammerhead Shark · Rainbow Trout" },
    "2026-09-12": { label: "Sunny",     icon: "☀️",    note: "Meteor shower 18:00–24:00 — meteorite gathering", fish: "Meteor-shower exclusive gathering" }
  }
};
