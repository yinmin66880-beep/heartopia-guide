/* 心动小镇 · 天气日历数据（游戏内天气为官方固定排期，由社区整理，随管道每日校对） */
window.HEARTOPIA_WEATHER = {
  updated: "2026-09-03",
  source: {
    name: "TapTap 心动小镇 · 天气预报策略库",
    url: "https://www.taptap.cn/app/45213/strategy/entity-collection/283527"
  },
  note: "心动小镇游戏内天气为官方固定排期，本日历由社区整理。特殊天气（雨/彩虹/雪/流星雨）决定限定鱼种与采集内容。",
  days: {
    "2026-09-01": { label: "晴",     icon: "☀️",    note: "" },
    "2026-09-02": { label: "晴转雨", icon: "🌤️",    note: "18:00 后转雨" },
    "2026-09-03": { label: "晴转雨", icon: "🌤️",    note: "12:00 后转雨" },
    "2026-09-08": { label: "雨+彩虹", icon: "🌧️🌈", note: "彩虹天限定鱼（锤头鲨/彩虹鳟）别错过", fish: "锤头鲨 · 彩虹鳟" },
    "2026-09-12": { label: "晴",     icon: "☀️",    note: "18:00–24:00 流星雨陨石", fish: "流星雨限定采集" }
  }
};
