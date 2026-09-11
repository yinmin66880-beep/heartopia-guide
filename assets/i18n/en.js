/* ============================================================
 * Heartopia Guide · i18n runtime layer (English) v1.0
 * ------------------------------------------------------------
 * data/daily.js 是数据管道产出的中文规范数据（单一数据源），
 * 英文页面加载本文件后在渲染时做运行时翻译：
 *   I18N.t(s)      —— 词典精确匹配（星期 / 天气 / 规则 / 来源名等）
 *   I18N.pos(s)    —— 物资点位翻译（「N 号家园门口」模式 + 固定地名）
 *   I18N.note(s)   —— 兑换码备注按句式翻译
 *   I18N.fishTip(label, detail) —— 按天气重新生成英文钓鱼提示
 * 未命中词典时回退显示中文原文（新数据上线后页面不空白）。
 * 维护：新增固定文案时在对应 dict 补一条即可。
 * ============================================================ */
window.HEARTOPIA_I18N = {
  lang: 'en',

  dict: {
    /* 星期 */
    '星期一': 'Monday', '星期二': 'Tuesday', '星期三': 'Wednesday',
    '星期四': 'Thursday', '星期五': 'Friday', '星期六': 'Saturday', '星期日': 'Sunday',

    /* 天气标签 */
    '晴': 'Sunny', '雨': 'Rainy', '雪': 'Snowy', '彩虹': 'Rainbow',
    '晴转雨': 'Sunny → Rain', '雨+彩虹': 'Rain + Rainbow', '未知': 'Unknown',

    /* 天气备注 */
    '12:00 后转雨': 'Rain after 12:00',
    '18:00 后转雨': 'Rain after 18:00',
    '彩虹天限定鱼（锤头鲨/彩虹鳟）别错过': 'Don\u2019t miss the rainbow-day fish (Hammerhead Shark / Rainbow Trout)',
    '18:00–24:00 流星雨陨石': 'Meteor shower with meteorites, 18:00–24:00',

    /* 物资名称 */
    '溜溜橡木': 'Yo-yo Oak',
    '无瑕萤石': 'Flawless Fluorite',

    /* 固定点位 */
    '温泉山遗迹': 'Hot Spring Mountain Ruins',
    '森林灵橡松林': 'Spirit Oakpine Forest',
    '灵橡松林': 'Spirit Oakpine Forest',

    /* 游戏规则（data-src/seed-daily.json 的 gameRules） */
    '游戏内【手表】→【设置】→【兑换码】': 'In-game: [Watch] → [Settings] → [Redeem Code]',
    '每日兑换码约 18:00 更新，有效至当日 23:59:59': 'Daily codes drop around 18:00 and are valid until 23:59:59 the same day',
    '溜溜橡木 / 无瑕萤石每日 06:00 刷新，每处每天 1 次、每次 3 个，位置每日随机（多见于各家园门口、森林灵橡松林、温泉山遗迹）': 'Yo-yo Oak and Flawless Fluorite reset daily at 06:00 — one gather per spot per day, 3 items each; spots change daily (usually near house entrances, in Spirit Oakpine Forest, or at Hot Spring Mountain Ruins)',
    '需完成【寻找星灵】主线任务后才能采集': 'Gathering unlocks after the "Finding Star Spirits" main quest',

    /* 页面兜底文案 */
    '每日 06:00 刷新 · 顺路领完再去钓鱼': 'Resets daily at 06:00 · grab them on your way to the fishing spot',

    /* 情报来源名（seed watchUrls / known sources） */
    'TapTap 每日更新帖（溜溜木/萤石/兑换码/天气）': 'TapTap daily update thread (oak / fluorite / codes / weather)',
    'TapTap 官方论坛 · 每日兑换码': 'TapTap official forum · daily codes',
    'TapTap 社区攻略 · 当日情报': 'TapTap community guide · daily intel',
    'TapTap 策略库 · 每日兑换码汇总': 'TapTap strategy library · daily code roundup',
    'TapTap 策略库 · 天气预报汇总': 'TapTap strategy library · weather roundup',
    'TapTap 每日更新帖': 'TapTap daily update thread',
    'TapTap 官方论坛兑换码帖': 'TapTap official forum code thread',
    'TapTap 社区攻略': 'TapTap community guide',
    'TapTap 攻略帖': 'TapTap guide thread'
  },

  t: function (s) {
    if (s == null) return s;
    return this.dict[s] || s;
  },

  /* 物资点位：「N 号家园门口」模式 + 固定地名词典，未命中回退原文 */
  pos: function (s) {
    if (s == null) return s;
    const m = String(s).match(/^(\d+)\s*号家园门口$/);
    if (m) return 'Entrance of House No. ' + m[1];
    return this.dict[s] || s;
  },

  /* 兑换码备注：按句式翻译，未命中回退原文 */
  note: function (s) {
    if (s == null) return s;
    const str = String(s);
    let m = str.match(/^已获\s*(\d+)\s*个独立源交叉验证/);
    if (m) return 'Cross-verified by ' + m[1] + ' independent sources · valid today';
    if (/^每日码/.test(str)) return 'Daily code · posted around 18:00 · valid until 23:59:59 today';
    if (/^在线抓取/.test(str)) return 'Scraped live from community sources · valid today';
    if (/^已过期/.test(str)) return 'Expired · kept for verification only';
    return this.dict[str] || str;
  },

  /* 按天气生成英文钓鱼提示（对应管道 fish_tip 的逻辑） */
  fishTip: function (labelZh, detailZh) {
    const label = labelZh || '';
    const detail = detailZh ? this.t(detailZh) : '';
    if (label.indexOf('彩虹') >= 0) {
      return '🌈 Rainbow-day exclusives: Hammerhead Shark (daytime) and Rainbow Trout (morning/afternoon).';
    }
    if (label.indexOf('雪') >= 0) {
      return '❄️ Snow-day exclusives: Snow Crab and Ice Sea Angel (Frozen Waters).';
    }
    if (label.indexOf('雨') >= 0) {
      if (label.indexOf('转雨') >= 0 && detail) {
        return '🌧️ ' + detail + ' — once it rains, go for the rainy-day exclusives: Sand Bream and European Eel (evening).';
      }
      return '🌧️ Rainy-day fish are biting: Sand Bream and European Eel (evening).';
    }
    return '☀️ All the regular fish are out — top up your encyclopedia while you roam.';
  }
};
