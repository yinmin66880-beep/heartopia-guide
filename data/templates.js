/* ============================================================
 * 心动小镇攻略手账 · 装修模板库数据 v1.0
 * 30 套真实社区案例 · 收录于 2026-09-03
 * ------------------------------------------------------------
 * 数据说明：
 *  - 全部条目来自 B站 / TapTap 公开社区教程，作者与链接真实可溯
 *  - 「跟建要点」提炼自原帖标题与简介；「三步上手」「坑点」为编辑提炼
 *  - 配图为 AI 生成的风格示意图（非游戏实机截图），实际效果请看原帖
 *  - 收录标准：教程类优先（标题带"教程/攻略/分享"），覆盖多风格多场景
 * ============================================================ */

window.HEARTOPIA_TPL_META = {
  version: '1.0',
  updatedAt: '2026-09-03',
  total: 30,
  sourceNote: '模板均收录自 B站 / TapTap 真实社区教程，点开卡片可跳转原帖跟建'
};

window.HEARTOPIA_TPLS = [
  {
    id: 1,
    title: '零氪山野别墅 · 手把手教学',
    style: '森系', room: '整屋', budget: '零氪', diff: 2,
    scale: '标准地皮',
    imgPrompt: 'zero cost forest style mountain villa exterior with wooden walls green roof in cute casual mobile game art style warm afternoon light',
    tips: ['0 氪 0 卡（不卡重叠）森系山野别墅', '完整建造流程，提供 1.4 倍速结构视频', '全程无 bug，照抄就能建'],
    steps: ['先看 1.4 倍速结构视频过一遍主体流程，记住承重柱和楼层位置', '按视频顺序搭主体结构：地基 → 一层 → 屋顶，不卡任何重叠', '最后补门窗和绿植点缀，森系感靠藤蔓和盆栽堆出来'],
    pit: '别用卡重叠 bug —— 有修复后塌房风险，这套全程不卡，安全抄作业。',
    source: { platform: 'B站', author: '平衡平衡白平衡', link: 'https://www.bilibili.com/video/BV1mpebzfEj8/', views: '6.0万播放 · 3567收藏', date: '2025-08' }
  },
  {
    id: 2,
    title: '海盐芝士小屋 2.0',
    style: '蓝系', room: '整屋', budget: '微氪', diff: 2,
    scale: '标准地皮',
    imgPrompt: 'sea salt blue and cheese cream white cottage exterior with seaside elements in cute casual mobile game art style soft daylight',
    tips: ['海盐蓝 × 芝士奶白经典配色', '2.0 版本结构优化，教程完整', '社区高人气跟建款'],
    steps: ['外墙先刷海盐蓝，屋顶和门窗框用芝士奶白提亮', '主体按 2.0 教程走，注意 2.0 与 1.0 结构有改动，别看串', '点缀贝壳、船锚类海边小件，控制数量别堆满'],
    pit: '2.0 和 1.0 教程别混着看 —— 结构不一样，认准最新版再开工。',
    source: { platform: 'B站', author: '小软软丿', link: 'https://www.bilibili.com/video/BV1j8suerEpR/', views: '6.3万播放', date: '未知' }
  },
  {
    id: 3,
    title: '手提箱小屋',
    style: '可爱', room: '整屋', budget: '微氪', diff: 3,
    scale: '标准地皮',
    imgPrompt: 'creative suitcase shaped house with handle and straps in cute casual mobile game art style colorful playful design sunny day',
    tips: ['创意造型小屋，辨识度拉满', '社区验证的高人气案例', '造型独特适合当门面'],
    steps: ['先搭一个扁长方体主体当"箱体"，把手用横杆件装顶上', '箱体侧面开门窗，比例参考真实行李箱（宽 > 高）', '外部加绑带和贴纸装饰，一秒变成"会走路的行李箱"'],
    pit: '创意造型类好看但难改 —— 入住前想清楚功能布局，后期改造要拆一半。',
    source: { platform: 'B站', author: '我快乐个球', link: 'https://www.bilibili.com/video/BV1LHvveuEXr/', views: '8.8万播放 · 3276收藏', date: '2024-08' }
  },
  {
    id: 4,
    title: '18 块地新中式别墅',
    style: '中式', room: '整屋', budget: '微氪', diff: 3,
    scale: '18 块地 · 36 菜地 · 59 花',
    imgPrompt: 'modern chinese style villa with dark grey roof white walls wooden pillars in cute casual mobile game art style elegant garden',
    tips: ['18 块地 + 36 菜地 + 59 花的完整规划', '分上、中、下 + 内饰三集教程', '作者声明：可仿建需标明出处，禁商用'],
    steps: ['先按上集立主体结构：白墙 + 深灰瓦 + 木柱三件套定调', '中下集补庭院和细节，菜地花圃按教程分区（36 菜 + 59 花）', '内饰集收尾，仿建记得在动态标明原作者出处'],
    pit: '作者明确禁商禁代禁二改 —— 个人仿建可以，标出处，别拿去商用。',
    source: { platform: 'B站', author: '柑橘好好食', link: 'https://www.bilibili.com/video/BV1J7hCzUEVJ', views: '2.0万播放 · 973收藏', date: '2025-09' }
  },
  {
    id: 5,
    title: '现代黑木暖居别墅',
    style: '现代', room: '整屋', budget: '零氪', diff: 2,
    scale: '地块数量可调',
    imgPrompt: 'modern dark wood warm toned villa exterior with large windows in cute casual mobile game art style dusk warm light',
    tips: ['全程无 bug 搭建', '0 氪也能轻松复刻', '黑木 + 暖色为主，地块数量可自由调整'],
    steps: ['锁定配色：黑木主体 + 暖黄灯光，多余颜色一件不要', '按自家地皮大小调整地块数量，结构比例不变', '大面积开窗 —— 黑木显暗，靠自然光救'],
    pit: '黑木外墙特别吃光 —— 白天也要布置暖光源，不然屋里像停电。',
    source: { platform: 'B站', author: '问水水耶', link: 'https://www.bilibili.com/video/BV1Ebg46eE84/', views: '5662播放 · 398收藏', date: '2026-07' }
  },
  {
    id: 6,
    title: '黑白艺术家公寓',
    style: '现代', room: '整屋', budget: '微氪', diff: 2,
    scale: '标准地皮',
    imgPrompt: 'black and white artist loft apartment interior with high ceiling in cute casual mobile game art style minimalist gallery feel',
    tips: ['新手装修向教程', '黑白二色极简配方', '公寓层高利用充分'],
    steps: ['全屋只用黑白 + 灰阶过渡，彩色一律不进屋', '利用层高做挑空客厅，挂大幅装饰画当"展馆位"', '按集跟建，新手也能一次成型'],
    pit: '纯黑白容易冷冰冰 —— 加一两件木色家具或绿植点睛，马上有家的温度。',
    source: { platform: 'B站', author: '问水水耶', link: 'https://www.bilibili.com/video/BV1EpcWzUE6v/', views: '3.8万播放', date: '未知' }
  },
  {
    id: 7,
    title: '不氪金森系木屋',
    style: '森系', room: '整屋', budget: '零氪', diff: 2,
    scale: '标准地皮',
    imgPrompt: 'cozy exquisite forest style wooden house with plants and warm lamp in cute casual mobile game art style evening glow',
    tips: ['不氪金、不卡重叠', '精致温馨路线', '零氪建材即可完成'],
    steps: ['用免费原木色建材搭主体，配色控制在原木 + 绿两色', '窗户全用最大尺寸，弥补木屋采光短板', '屋外一圈盆栽 + 屋内暖灯，温馨感就出来了'],
    pit: '零氪的代价是染色木料要自己攒 —— 开工前一周先囤染料和木料。',
    source: { platform: 'B站', author: '平衡平衡白平衡', link: 'https://www.bilibili.com/video/BV1ML61B3ECo/', views: '2.9万播放', date: '未知' }
  },
  {
    id: 8,
    title: '12 块地森系小屋',
    style: '森系', room: '整屋', budget: '微氪', diff: 1,
    scale: '12 块地',
    imgPrompt: 'small compact forest cabin on limited plot with vertical garden in cute casual mobile game art style morning mist',
    tips: ['12 块地紧凑布局', '小地块玩家友好', '教程类视频可全程跟建'],
    steps: ['12 块地全留给主体，功能往上叠 —— 二层比横向扩建划算', '楼梯位置第一步就定好，占格大户不能后补', '外立面用绿植墙替代花圃，省地又有森系感'],
    pit: '小地块最忌贪心 —— 每个区域先画格子再放家具，塞满了连转身都难。',
    source: { platform: 'B站', author: '柑橘好好食', link: 'https://www.bilibili.com/video/BV1AuzbB7E35/', views: '9364播放', date: '未知' }
  },
  {
    id: 9,
    title: '屿蓝深海居',
    style: '蓝系', room: '整屋', budget: '微氪', diff: 3,
    scale: '大户型',
    imgPrompt: 'deep ocean blue gradient residence exterior with navy walls and light blue accents in cute casual mobile game art style moonlight',
    tips: ['深海蓝渐变外墙，社区人气款', '图文教程（外观）+ 视频详细教程', '染色配方放在原帖评论区'],
    steps: ['外墙做"深海蓝 → 浅蓝"渐变贴法，下深上浅模拟海面光线', '按图文教程搭外观，细节看视频版（详细教程不含内饰）', '染色配方去原帖评论区抄，色号照抄不翻车'],
    pit: '教程不含内饰 —— 内饰要自己配；深色墙会吃自然光，白天记得补暖光灯。',
    source: { platform: 'TapTap', author: '兔稚好可爱', link: 'https://www.taptap.cn/moment/828020326779586206', views: '2836浏览', date: '2026-08' }
  },
  {
    id: 10,
    title: '山屿别墅',
    style: '现代', room: '整屋', budget: '微氪', diff: 3,
    scale: '标准地皮',
    imgPrompt: 'modern mountain island villa with terraced levels and water feature in cute casual mobile game art style sunset',
    tips: ['山屿结构（依山傍水布局）', '完整教程视频', '适合进阶玩家参考结构'],
    steps: ['先观察自家地皮周边地形，确定"山屿"的主朝向', '按教程搭错层结构，露台和水面要素别省', '结构复杂，建议全程开着教程视频分段跟建'],
    pit: '山屿结构对地形有要求 —— 地皮周围环境不像就调整布局，硬抄会四不像。',
    source: { platform: 'B站', author: '烩鱼_', link: 'https://www.bilibili.com/video/BV1rMCRYMEz8/', views: '3.8万播放', date: '未知' }
  },
  {
    id: 11,
    title: '现代春日马卡龙别墅',
    style: '可爱', room: '整屋', budget: '微氪', diff: 3,
    scale: '18 块地',
    imgPrompt: 'modern pastel macaron colored villa exterior with spring flowers garden in cute casual mobile game art style bright daylight',
    tips: ['18 块地多巴胺风格住宅', '无需任何 bug 即可跟建', '适合新手 + 手册较齐全的玩家'],
    steps: ['本条为前院部分，先把前院建材按手册备齐', '多巴胺配色控制数量：3–4 个马卡龙色轮换，再多就乱', '跟完前院等后续更新，别自己脑补后院结构'],
    pit: '系列分集更新 —— 先备齐本集建材再开工，中途断料最伤节奏。',
    source: { platform: 'B站', author: '问水水耶', link: 'https://www.bilibili.com/video/BV1t6KD6zEgM/', views: '3212播放 · 113收藏', date: '2026-06' }
  },
  {
    id: 12,
    title: '粉色梦幻别墅 · 教程一',
    style: '可爱', room: '整屋', budget: '微氪', diff: 3,
    scale: '18 块地',
    imgPrompt: 'pink dreamy modern villa exterior with gradient pink walls in cute casual mobile game art style dreamy clouds',
    tips: ['18 地现代别墅结构', '梦幻粉渐变外墙', '系列教程分集连载'],
    steps: ['主体按现代别墅结构立起来，粉色放最后刷', '外墙做粉色渐变（深 → 浅往上），顶部留白耐看', '系列分集跟建，单集别跳'],
    pit: '大面积粉墙单色容易腻 —— 渐变 + 顶部留白是这套的灵魂，别偷懒。',
    source: { platform: 'B站', author: '问水水耶', link: 'https://www.bilibili.com/video/BV1x44bzrEU3/', views: '8521播放', date: '未知' }
  },
  {
    id: 13,
    title: '粉色系小别墅 · 卧室浴室内饰',
    style: '可爱', room: '卧室', budget: '微氪', diff: 2,
    scale: '小别墅内饰',
    imgPrompt: 'pink girly bedroom interior with matching bathroom in cute casual mobile game art style soft pastel tones warm light',
    tips: ['粉色系小别墅内饰完结篇', '本期含卧室 + 浴室教程', '沉浸式跟建类视频，前置集含书房/厨房/客厅'],
    steps: ['先补系列前置集（书房、入户、厨房餐厅客厅），再跟本期', '卧室浴室内饰按视频一件件摆，粉色深浅分层', '跟完在评论区蹲作者下一色系'],
    pit: '粉色系先小面积试色 —— 色号差一点就"甜过头"，试满意再铺满。',
    source: { platform: 'B站', author: '撞进你的梦里', link: 'https://www.bilibili.com/video/BV1dvQAYTEwa/', views: '1.1万播放 · 644收藏', date: '2025-03' }
  },
  {
    id: 14,
    title: '18 块地精灵屋全图教程',
    style: '森系', room: '整屋', budget: '微氪', diff: 3,
    scale: '18 块地',
    imgPrompt: 'elf fairy tale cottage with mushroom decorations and vines in cute casual mobile game art style magical forest glow',
    tips: ['18 块地全图教程', '精灵主题元素满配', '无 bug 可跟建'],
    steps: ['全图规划先行：主体小屋 + 蘑菇装饰区 + 藤蔓回廊', '蘑菇和藤蔓选一个当主视觉，另一个只做点缀', '灯光用暖绿和暖黄混搭，晚上就是"精灵村"'],
    pit: '主题元素容易堆过头 —— 蘑菇 + 藤蔓全上就花哨了，主次分明才高级。',
    source: { platform: 'B站', author: '爱吃鸡腿achy', link: 'https://www.bilibili.com/video/BV15bfCBbEE3/', views: '1.3万播放', date: '未知' }
  },
  {
    id: 15,
    title: '「知夏」建造教程',
    style: '田园', room: '整屋', budget: '微氪', diff: 2,
    scale: '标准地皮',
    imgPrompt: 'summer fresh courtyard house with green plants and wooden fence in cute casual mobile game art style bright summer day',
    tips: ['「知夏」主题清爽设计', '完整建造流程可参考', '社区人气教程'],
    steps: ['清爽配色打底：白墙 + 浅木 + 绿植三色', '按教程流程走完整建造，注意庭院留白', '夏季元素（遮阳、凉亭）按需添加'],
    pit: '夏季主题别堆冷色 —— 加原木色压一压，清爽和温馨可以兼得。',
    source: { platform: 'B站', author: '萌优i', link: 'https://www.bilibili.com/video/BV1ryKA6hEHm/', views: '1.4万播放', date: '未知' }
  },
  {
    id: 16,
    title: '绿色小庄园（18 块地）',
    style: '田园', room: '整屋', budget: '微氪', diff: 2,
    scale: '18 块地',
    imgPrompt: 'green country manor estate with garden and hedges in cute casual mobile game art style sunny afternoon',
    tips: ['18 块地庄园级规划', '绿色主调统一全园', '菜地花圃可分区'],
    steps: ['地皮大头留给户外：花园 + 菜地分区规划', '绿色做主调，用深浅绿分层（树篱最深、草坪最浅）', '室内从简，庄园的灵魂在户外'],
    pit: '庄园风占地大头是户外 —— 预算别全砸室内，花园菜地才是门面。',
    source: { platform: 'B站', author: '小软软丿', link: 'https://www.bilibili.com/video/BV1Q7t7eaE1c/', views: '1.4万播放', date: '未知' }
  },
  {
    id: 17,
    title: '18 块地流水别墅（拆房教程）',
    style: '现代', room: '整屋', budget: '微氪', diff: 3,
    scale: '18 块地',
    imgPrompt: 'modern waterfall villa with water flowing through terraces in cute casual mobile game art style elegant evening',
    tips: ['流水别墅结构拆解', '学"怎么拆"的建房思路', '适合想理解结构的进阶玩家'],
    steps: ['先看拆解集理解结构：哪层承重、水面从哪进', '再按建造集复刻，错层 + 水道是核心', '学完拆解思路，下次看别人房子也能"看穿"'],
    pit: '这是"拆房教程" —— 先看懂结构再动手，直接跟建容易卡在楼层衔接位。',
    source: { platform: 'B站', author: '平衡平衡白平衡', link: 'https://www.bilibili.com/video/BV1R41xYJE1U/', views: '2.6万播放', date: '未知' }
  },
  {
    id: 18,
    title: '阳光海岸现代别墅',
    style: '蓝系', room: '整屋', budget: '微氪', diff: 2,
    scale: '18 块地',
    imgPrompt: 'sunny coast seaside modern villa with deck chairs and umbrella in cute casual mobile game art style bright beach day',
    tips: ['18 地现代别墅结构', '阳光海岸配色（白 + 海蓝 + 黄）', '海滨度假元素点睛'],
    steps: ['主体按现代别墅搭，白色为基底', '海蓝用在门窗框和泳池，黄色只做点缀', '户外配躺椅 + 遮阳伞，度假感立刻拉满'],
    pit: '海滨风的重点是户外 —— 别把预算全砸外墙上，泳池位和躺椅才是灵魂。',
    source: { platform: 'B站', author: '问水水耶', link: 'https://www.bilibili.com/video/BV1wFNueYED1/', views: '1.2万播放', date: '未知' }
  },
  {
    id: 19,
    title: '冬日颂现代别墅',
    style: '现代', room: '整屋', budget: '微氪', diff: 3,
    scale: '标准地皮',
    imgPrompt: 'winter theme modern villa with snow decorations and warm window light in cute casual mobile game art style snowfall',
    tips: ['冬日主题限定氛围', '新手向完整流程', '现代别墅基础结构教学'],
    steps: ['配色锁定：白 + 深蓝 + 暖黄（雪 + 夜空 + 灯光）', '主体结构先立稳，冬季装饰放最后', '新手跟着完整流程走一遍，顺便学会建房基本功'],
    pit: '雪景装饰占地大 —— 先搭主屋再点缀，不然地皮不够用。',
    source: { platform: 'B站', author: '问水水耶', link: 'https://www.bilibili.com/video/BV1mFZZBDEfL/', views: '1.7万播放', date: '未知' }
  },
  {
    id: 20,
    title: '零氪无 bug 浴室装修',
    style: '现代', room: '浴室', budget: '零氪', diff: 1,
    scale: '单间',
    imgPrompt: 'simple modern clean bathroom with zero cost furniture in cute casual mobile game art style bright tidy',
    tips: ['零氪建材完成', '无 bug 布局', '同作者另有书房 + 卧室同图教程'],
    steps: ['零氪白色系建材打底，地面浅色显干净', '浴缸靠最里侧当"C 位"，镜子挂入口对面', '同作者有书房 + 卧室教程，凑一套整屋'],
    pit: '浴室地板别用深色 —— 水渍贴图叠上去显脏，浅色才是正解。',
    source: { platform: 'B站', author: '心动小齐', link: 'https://www.bilibili.com/video/BV1t4wJzWEnd/', views: '未知', date: '2026-03' }
  },
  {
    id: 21,
    title: '零氪书房 + 卧室同图教程',
    style: '现代', room: '卧室', budget: '零氪', diff: 1,
    scale: '一图两用房',
    imgPrompt: 'compact study and bedroom combination room with desk and bed in cute casual mobile game art style efficient layout',
    tips: ['一图两用：书房 + 卧室', '零氪无 bug', '小户型玩家友好'],
    steps: ['一张图规划两个功能区：书房靠窗（采光），床靠里（安静）', '用家具朝向 + 地毯分区，不用隔断墙', '书架靠墙立顶，收纳拉满不占活动区'],
    pit: '小户型别硬塞隔断墙 —— 家具分区更省格子，视觉还开阔。',
    source: { platform: 'B站', author: '心动小齐', link: 'https://www.bilibili.com/video/BV1yGQpBPEZw/', views: '182播放', date: '2026-04' }
  },
  {
    id: 22,
    title: '超简单新中式小楼房',
    style: '中式', room: '整屋', budget: '微氪', diff: 1,
    scale: '小楼房',
    imgPrompt: 'simple new chinese style small building with white walls and dark wood in cute casual mobile game art style clean daylight',
    tips: ['超简单新手向', '新中式配色（白墙 + 深木）', '建材与尺寸信息在帖子后续楼层'],
    steps: ['白墙 + 深木两色定调，新手一次能成型', '翻完原帖楼层拿建材清单和尺寸再开工', '结构简单，适合当第一套中式练手'],
    pit: '帖子楼层里有建材清单和尺寸 —— 翻完评论区再动手，别凭感觉买料。',
    source: { platform: 'TapTap', author: '姜梨.', link: 'https://www.taptap.cn/moment/563093677061177365', views: '未知', date: '未知' }
  },
  {
    id: 23,
    title: '苏式庭院教程',
    style: '中式', room: '户外', budget: '微氪', diff: 3,
    scale: '庭院地皮全开',
    imgPrompt: 'suzhou classical chinese garden courtyard with moon gate and corridor in cute casual mobile game art style serene',
    tips: ['苏式园林元素（月洞门 / 回廊 / 假山）', '地皮全开再建，支持扩建', '中式庭院标杆帖'],
    steps: ['先把庭院地皮全开 —— 苏式庭院没有小地块版本', '月洞门定主入口，回廊串联各功能区', '假山 + 水景收尾，留白比堆满更"苏式"'],
    pit: '庭院类地皮消耗巨大 —— 地皮开满再动工，建到一半扩建很尴尬。',
    source: { platform: 'TapTap', author: '阿离酱', link: 'https://www.taptap.cn/moment/571703292032192173', views: '未知', date: '2024-08' }
  },
  {
    id: 24,
    title: '复古南洋风装修（附家具清单）',
    style: '复古', room: '整屋', budget: '微氪', diff: 2,
    scale: '整屋',
    imgPrompt: 'retro nanyang style interior with rattan furniture and wooden shutters in cute casual mobile game art style vintage warm',
    tips: ['复古南洋风完整案例', '原帖附家具清单可照抄', '藤木 + 百叶 + 绿三要素'],
    steps: ['按原帖家具清单备料，藤编和百叶窗是灵魂', '配色：藤木色为主 + 大量绿植 + 一点复古红', '百叶窗全屋统一装，南洋氛围立刻到位'],
    pit: '南洋风靠细节堆氛围 —— 藤编和百叶窗缺一样就像普通木屋，别省。',
    source: { platform: 'TapTap', author: '棉绵min', link: 'https://www.taptap.cn/moment/565512216636296770', views: '未知', date: '未知' }
  },
  {
    id: 25,
    title: '原木风新中式客厅',
    style: '中式', room: '客厅', budget: '微氪', diff: 1,
    scale: '单间',
    imgPrompt: 'wood new chinese style living room with tea table and bookshelf in cute casual mobile game art style warm wood tones',
    tips: ['原木 × 新中式配方', '客厅布局教程', '茶台 / 博古架经典配置'],
    steps: ['原木色全屋打底，家具选深一号木色分层', '茶台居中 + 博古架靠墙，中式客厅标配', '灯光选暖黄，白光会毁掉木质感'],
    pit: '新中式客厅最忌混入欧式家具 —— 一套配色里出现两种风格就穿了帮。',
    source: { platform: 'TapTap', author: '磕不磕瓜子', link: 'https://www.taptap.cn/moment/577241060451814324', views: '未知', date: '未知' }
  },
  {
    id: 26,
    title: '复古风书房',
    style: '复古', room: '书房', budget: '微氪', diff: 2,
    scale: '单间',
    imgPrompt: 'vintage study room with dark wood bookshelves and green lamp in cute casual mobile game art style classic scholar feel',
    tips: ['复古书房配色（深木 + 墨绿 / 酒红）', '书架 + 地毯经典布局', '教程类帖子可跟建'],
    steps: ['深木书架靠墙立顶，地毯铺阅读区', '墨绿或酒红选一个做点缀色（台灯 / 窗帘）', '配一张复古书桌收尾，氛围感直接封顶'],
    pit: '复古风灯光必须暖黄 —— 冷白光一打，复古感直接归零。',
    source: { platform: 'TapTap', author: '暴躁小熊尼尼', link: 'https://www.taptap.cn/moment/577187784767310358', views: '未知', date: '未知' }
  },
  {
    id: 27,
    title: '8×10 新春小屋建造教程',
    style: '中式', room: '整屋', budget: '微氪', diff: 1,
    scale: '8×10 起步',
    imgPrompt: '8x10 chinese new year cottage with red lanterns in cute casual mobile game art style festive winter',
    tips: ['8×10 社区验证的性价比起步尺寸', '主体建造 → 染色 → 屋顶分步更新', '新春主题入门款'],
    steps: ['8×10 地基起步，主体结构按教程搭建', '等楼主更新染色和屋顶篇再上色，先用原木色', '住进去边攒钱边升级，别一步到位'],
    pit: '8×10 是社区验证的性价比起步尺寸 —— 前期别贪大，光铺地板就能掏空家底。',
    source: { platform: 'TapTap', author: '洁洁羔', link: 'https://www.taptap.cn/hashtag/%E5%BF%83%E5%8A%A8%E5%B0%8F%E9%95%87%E6%95%99%E7%A8%8B?page=9', views: '未知', date: '2025-01' }
  },
  {
    id: 28,
    title: '浴缸爆改高级感浴池',
    style: '现代', room: '浴室', budget: '零氪', diff: 2,
    scale: '局部改造',
    imgPrompt: 'modern luxury bathtub upgraded bathing pool in cute casual mobile game art style spa feeling soft light',
    tips: ['极简浴缸爆改高级感浴池', '新手也可以做', '需要卡一些 bug（介意绕行）'],
    steps: ['保留原浴缸本体，周围用地台和石材质感围合', '按教程卡 bug 调整浴缸嵌位，做出"下沉式"效果', '加一盏氛围灯，高级感主要靠光影'],
    pit: '要卡 bug —— 动手前先存档截图，卡坏了方便恢复；介意 bug 的玩家绕行。',
    source: { platform: 'TapTap', author: '问水', link: 'https://www.taptap.cn/hashtag/%E5%BF%83%E5%8A%A8%E5%B0%8F%E9%95%87%E5%86%85%E9%A5%B0%E6%95%99%E7%A8%8B?type=newest', views: '未知', date: '2026-07' }
  },
  {
    id: 29,
    title: '黑木暖居 · 沉浸式内饰教程',
    style: '现代', room: '整屋', budget: '零氪', diff: 2,
    scale: '整屋内饰',
    imgPrompt: 'dark wood warm interior living room with soft lamp light in cute casual mobile game art style cozy evening healing',
    tips: ['沉浸式内饰教程，新手可建', '建材全部做了平替处理', '阴雨天治愈系代表作'],
    steps: ['按教程用平替建材搭内饰，省下的钱不是小数目', '平替色号和原版有差 —— 先搭一格试色再铺全屋', '暖光多点几位，黑木暖居的"暖"全靠灯光'],
    pit: '平替建材省钱但色号有偏差 —— 小面积试满意了再全屋铺开。',
    source: { platform: 'TapTap', author: '问水', link: 'https://www.taptap.cn/user/709351257', views: '未知', date: '2026-07' }
  },
  {
    id: 30,
    title: '奶油风治愈系榻榻米卧室',
    style: '法式', room: '卧室', budget: '微氪', diff: 1,
    scale: '单间',
    imgPrompt: 'cream style tatami bedroom with soft beige tones in cute casual mobile game art style sunset glow through window',
    tips: ['奶油风配色（奶白 + 浅木 + 藤编）', '榻榻米地台布局', '配晚霞场景"狠狠心动"'],
    steps: ['榻榻米地台先铺，层板别叠太高（吃层高）', '奶白墙面 + 浅木家具 + 藤编点缀三件套', '挑个晚霞时段截图 —— 这套的出片位在窗边'],
    pit: '榻榻米地台会吃层高 —— 房间矮的话层板减一层，不然压抑。',
    source: { platform: 'TapTap', author: '社区作者', link: 'https://www.taptap.cn/hashtag/%E5%BF%83%E5%8A%A8%E5%B0%8F%E9%95%87%E5%86%85%E9%A5%B0%E6%95%99%E7%A8%8B?page=2', views: '未知', date: '2025-07' }
  }
];
