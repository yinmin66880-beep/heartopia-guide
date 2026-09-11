/* ============================================================
 * ハートピア攻略ガイド · テンプレートライブラリデータ（日本語版） v1.0
 * 実在コミュニティ事例 30 件 · 2026-09-03 収集
 * ------------------------------------------------------------
 * data/templates.js（中国語 正規データ）と同じスキーマ —
 * どちらかを更新する場合は項目と id を同期すること。
 * すべての項目は Bilibili / TapTap の公開コミュニティ解説から
 * 収集しており、作者とリンクは実在し、追跡可能です。
 * カード画像は AI 生成のイメージイラスト（ゲーム内スクリーン
 * ショットではありません）— 実際の仕上がりは元の投稿で確認を。
 * ============================================================ */

window.HEARTOPIA_TPL_META = {
  version: '1.0',
  updatedAt: '2026-09-03',
  total: 30,
  sourceNote: 'テンプレートは Bilibili / TapTap の実在コミュニティ解説から収録 — カードを開けば元の投稿に飛んで、見ながら作れます'
};

window.HEARTOPIA_TPLS = [
  {
    id: 1,
    title: '無課金 森の山ヴィラ · ステップバイステップ',
    style: '森林風', room: '家全体', budget: '無課金', diff: 2,
    scale: '標準区画',
    imgPrompt: 'zero cost forest style mountain villa exterior with wooden walls green roof in cute casual mobile game art style warm afternoon light',
    tips: ['無課金で重なりバグなしの森林風マウンテンヴィラ', '1.4 倍速の構造動画つきで全工程を解説', '完全ノーバグ — そのまま写して OK'],
    steps: ['まず 1.4 倍速の構造動画で全体の流れを把握 — 耐力柱と各階の位置を覚える', '動画の順番で本体を建てる：基礎 → 1 階 → 屋根、重なりバグは一切使わない', '最後にドア・窓・緑で仕上げ — 森林風の雰囲気はツタと鉢植えで作る'],
    pit: '重なりバグを使う建築は避けよう — 修正パッチで崩壊するリスクがある。この作例は最後までバグ不使用で、安全にコピーできる。',
    source: { platform: 'Bilibili', author: '平衡平衡白平衡', link: 'https://www.bilibili.com/video/BV1mpebzfEj8/', views: '再生6.0万回 · お気に入り3,567', date: '2025-08' }
  },
  {
    id: 2,
    title: 'シーソルト＆チーズのコテージ 2.0',
    style: 'マリン', room: '家全体', budget: '微課金', diff: 2,
    scale: '標準区画',
    imgPrompt: 'sea salt blue and cheese cream white cottage exterior with seaside elements in cute casual mobile game art style soft daylight',
    tips: ['海塩ブルー × チーズクリームホワイトの定番配色', '構造を改善した 2.0 版で、解説も完全', 'コミュニティで人気のフォローアロング作例'],
    steps: ['外壁は先に海塩ブルー、屋根と窓枠はチーズクリームホワイトで明るく', '本体は 2.0 チュートリアルどおりに — 2.0 と 1.0 は構造が違うので混同注意', '貝殻や船の錨など海辺の小物は差し色程度に — 堆積させない'],
    pit: '2.0 と 1.0 のチュートリアルを混ぜない — 構造が違います。着工前に最新版を確認しよう。',
    source: { platform: 'Bilibili', author: '小软软丿', link: 'https://www.bilibili.com/video/BV1j8suerEpR/', views: '再生6.3万回', date: '不明' }
  },
  {
    id: 3,
    title: 'スーツケースのコテージ',
    style: 'キュート', room: '家全体', budget: '微課金', diff: 3,
    scale: '標準区画',
    imgPrompt: 'creative suitcase shaped house with handle and straps in cute casual mobile game art style colorful playful design sunny day',
    tips: ['世界にひとつだけの創造的なフォルムで一目瞭然', 'コミュニティ検証済みの人気作例', '見せ場・門面にぴったりの個性派'],
    steps: ['平たい直方体を本体の「ケース」に — 持ち手は横棒パーツで上部に装着', '側面にドアと窓を開ける — 本物のスーツケースと同じ比率（幅 > 高さ）', 'ベルトとステッカーを外側に足せば「歩くスーツケース」のできあがり'],
    pit: '創造的な形は美しいが改造が難しい — 入居前に間取りを固めてから。後からのリノベは半分取り壊しになる。',
    source: { platform: 'Bilibili', author: '我快乐个球', link: 'https://www.bilibili.com/video/BV1LHvveuEXr/', views: '再生8.8万回 · お気に入り3,276', date: '2024-08' }
  },
  {
    id: 4,
    title: '18 区画の新中国風ヴィラ',
    style: '中国風', room: '家全体', budget: '微課金', diff: 3,
    scale: '18 区画 · 畑 36 · 花 59',
    imgPrompt: 'modern chinese style villa with dark grey roof white walls wooden pillars in cute casual mobile game art style elegant garden',
    tips: ['18 区画 + 畑 36 + 花 59 の完全プラン', '前編・中編・後編 + 内装の 3 部構成解説', '作者の条件：クレジット付き再現は可、商用利用は禁止'],
    steps: ['前編どおりに白壁 + 濃灰の瓦 + 木柱の 3 点セットで主構造を立てる', '中編・後編で庭と細部を追加 — 畑と花壇は解説どおりに区画（畑 36 + 花 59）', '内装編で仕上げ — 再現したら投稿で原作者のクレジットを忘れずに'],
    pit: '作者は商用利用・転売・改変を禁止 — 個人の再現はクレジットすれば OK。',
    source: { platform: 'Bilibili', author: '柑橘好好食', link: 'https://www.bilibili.com/video/BV1J7hCzUEVJ', views: '再生2.0万回 · お気に入り973', date: '2025-09' }
  },
  {
    id: 5,
    title: 'ダークウッドの温もりあるモダンヴィラ',
    style: 'モダン', room: '家全体', budget: '無課金', diff: 2,
    scale: '区画数は調整可能',
    imgPrompt: 'modern dark wood warm toned villa exterior with large windows in cute casual mobile game art style dusk warm light',
    tips: ['最後までバグなしの建築', '無課金でも簡単に再現できる', '黒木 + 暖色が主役 — 区画数は自由に調整'],
    steps: ['配色を固定：黒木の本体 + 暖黄色の照明、それ以外は入れない', '土地の大きさに合わせて区画数を調整 — 構造の比率はそのまま', '大きな窓を開ける — 黒木は暗いので自然光で救う'],
    pit: '黒木の外壁は光を吸う — 昼間も暖色の灯りを点けておかないと、部屋が停電みたいになる。',
    source: { platform: 'Bilibili', author: '问水水耶', link: 'https://www.bilibili.com/video/BV1Ebg46eE84/', views: '再生5,662 · お気に入り398', date: '2026-07' }
  },
  {
    id: 6,
    title: 'モノクロ アーティストロフト',
    style: 'モダン', room: '家全体', budget: '微課金', diff: 2,
    scale: '標準区画',
    imgPrompt: 'black and white artist loft apartment interior with high ceiling in cute casual mobile game art style minimalist gallery feel',
    tips: ['初心者向けの内装解説', '白黒 2 色のミニマルレシピ', 'ロフトの天井高をフル活用'],
    steps: ['室内は白・黒・グレーの階調だけ — 色物は一切入れない', '天井高を活かして吹き抜けリビングに — 大きなアートを「ギャラリースポット」に飾る', 'エピソード順に見ながら建てれば、初心者でも一発で形になる'],
    pit: '白黒だけでは冷たい印象に — 木製家具か植物を 1〜2 点足すだけで、一気にあたたかくなる。',
    source: { platform: 'Bilibili', author: '问水水耶', link: 'https://www.bilibili.com/video/BV1EpcWzUE6v/', views: '再生3.8万回', date: '不明' }
  },
  {
    id: 7,
    title: '無課金の森林風ログハウス',
    style: '森林風', room: '家全体', budget: '無課金', diff: 2,
    scale: '標準区画',
    imgPrompt: 'cozy exquisite forest style wooden house with plants and warm lamp in cute casual mobile game art style evening glow',
    tips: ['無課金・重なりバグなし', '上品であたたかい路線', '無料建材だけで完成'],
    steps: ['無料の丸太色建材で本体を建てる — 配色は丸太色 + 緑の 2 色だけ', '採光不足を補うため、窓はすべて最大サイズに', '家の周りに鉢植え + 室内に暖色の灯りで、たちまち居心地よく'],
    pit: '無課金の代償は染料の確保 — 着工前に 1 週間かけて染料と木材を貯めよう。',
    source: { platform: 'Bilibili', author: '平衡平衡白平衡', link: 'https://www.bilibili.com/video/BV1ML61B3ECo/', views: '再生2.9万回', date: '不明' }
  },
  {
    id: 8,
    title: '12 区画のコンパクトな森の家',
    style: '森林風', room: '家全体', budget: '微課金', diff: 1,
    scale: '12 区画',
    imgPrompt: 'small compact forest cabin on limited plot with vertical garden in cute casual mobile game art style morning mist',
    tips: ['12 区画のコンパクトなレイアウト', '小区画プレイヤーにやさしい', '最後まで見ながら作れる解説動画'],
    steps: ['12 区画はすべて本体に — 機能は上に重ねる。横へ広げるより 2 階がお得', '階段の位置は最初に決める — マスを食うので後からは足せない', '外観の花壇は緑の壁で代用 — 土地を節約しつつ森林感もキープ'],
    pit: '小区画は欲張りが禁物 — 家具を置く前に各エリアをマス割りしよう。詰め込むと身動きも取れない。',
    source: { platform: 'Bilibili', author: '柑橘好好食', link: 'https://www.bilibili.com/video/BV1AuzbB7E35/', views: '再生9,364', date: '不明' }
  },
  {
    id: 9,
    title: '深海ブルーのアイランド住居',
    style: 'マリン', room: '家全体', budget: '微課金', diff: 3,
    scale: '大型間取り',
    imgPrompt: 'deep ocean blue gradient residence exterior with navy walls and light blue accents in cute casual mobile game art style moonlight',
    tips: ['深海ブルーのグラデ外壁はコミュニティ人気', 'イラスト解説（外観）+ 詳細動画', '染料レシピは元投稿のコメント欄に'],
    steps: ['外壁は「深海ブルー → ライトブルー」のグラデ貼り — 下は濃く上は薄く、水中の光を再現', '外観はイラスト解説どおりに — 詳細は動画で（内装は含まず）', '染料レシピはコメント欄からそのまま写す — 色番号どおりなら失敗しない'],
    pit: '解説に内装は含まれない — 内装は自前で計画を。濃い壁は昼光を吸うので、昼間も暖色の灯りを追加。',
    source: { platform: 'TapTap', author: '兔稚好可爱', link: 'https://www.taptap.cn/moment/828020326779586206', views: '閲覧2,836', date: '2026-08' }
  },
  {
    id: 10,
    title: 'マウンテンアイル ヴィラ',
    style: 'モダン', room: '家全体', budget: '微課金', diff: 3,
    scale: '標準区画',
    imgPrompt: 'modern mountain island villa with terraced levels and water feature in cute casual mobile game art style sunset',
    tips: ['山と水辺を活かした「マウンテンアイル」構造', '完全な解説動画つき', '上級者向けの構造参考に最適'],
    steps: ['まず自分の区画周辺の地形を見て、ヴィラの主方位を決める', '解説どおりにスキップフロア構造を建てる — テラスと水辺要素は省かない', '構造は複雑 — 解説動画を開きながら、区画ごとに進めよう'],
    pit: '構造は地形に依存する — 周囲の環境が違う場合は、そのまま写さずレイアウトを調整しないと違和感が出る。',
    source: { platform: 'Bilibili', author: '烩鱼_', link: 'https://www.bilibili.com/video/BV1rMCRYMEz8/', views: '再生3.8万回', date: '不明' }
  },
  {
    id: 11,
    title: '春マカロンのモダンヴィラ',
    style: 'キュート', room: '家全体', budget: '微課金', diff: 3,
    scale: '18 区画',
    imgPrompt: 'modern pastel macaron colored villa exterior with spring flowers garden in cute casual mobile game art style bright daylight',
    tips: ['18 区画のドーパミン系住宅', 'バグなしでそのまま作れる', '素材手帳がそろっている初心者に最適'],
    steps: ['この回は前庭パート — まず手帳どおりに前庭の素材を集める', 'ドーパミン配色はマカロン色 3〜4 色のローテーション — それ以上はごちゃつく', '前庭が終わったら続きの更新を待つ — 庭を勝手に想像して作らない'],
    pit: 'シリーズは分割更新 — 今回分の素材を揃えてから着工。途中で素材切れになるとテンポが崩れる。',
    source: { platform: 'Bilibili', author: '问水水耶', link: 'https://www.bilibili.com/video/BV1t6KD6zEgM/', views: '再生3,212 · お気に入り113', date: '2026-06' }
  },
  {
    id: 12,
    title: 'ピンクの夢見るヴィラ · 解説パート 1',
    style: 'キュート', room: '家全体', budget: '微課金', diff: 3,
    scale: '18 区画',
    imgPrompt: 'pink dreamy modern villa exterior with gradient pink walls in cute casual mobile game art style dreamy clouds',
    tips: ['18 区画のモダンヴィラ構造', '夢見るピンクのグラデ外壁', 'シリーズもの・分割連載中'],
    steps: ['本体はモダンヴィラの構造で立てて、ピンクは最後に塗る', '外壁はピンクのグラデ（下は濃く上へ薄く）— 上部は白のままスッキリ', 'シリーズは順番どおりに — 回を飛ばさない'],
    pit: '一面の単色ピンクはすぐ飽きる — グラデ + 上部の余白がこの作例の命。手を抜かないこと。',
    source: { platform: 'Bilibili', author: '问水水耶', link: 'https://www.bilibili.com/video/BV1x44bzrEU3/', views: '再生8,521', date: '不明' }
  },
  {
    id: 13,
    title: 'ピンクのミニヴィラ · 寝室と浴室の内装',
    style: 'キュート', room: '寝室', budget: '微課金', diff: 2,
    scale: 'ミニヴィラの内装',
    imgPrompt: 'pink girly bedroom interior with matching bathroom in cute casual mobile game art style soft pastel tones warm light',
    tips: ['ピンク系ミニヴィラ内装の完結編', '今回の内容：寝室 + 浴室', '没入型のフォローアロング動画 — 前回までに書斎・キッチン・リビングあり'],
    steps: ['まず前置きの各回（書斎・玄関・キッチン・ダイニング・リビング）を見てから', '寝室と浴室の家具を 1 つずつ配置 — ピンクは濃い色から薄い色へレイヤー', 'コメント欄で作者の次のカラーシリーズをチェック'],
    pit: 'ピンクはまず小さい面積で試す — 色番号が少し違うだけで「甘すぎ」になる。納得してから全面に。',
    source: { platform: 'Bilibili', author: '撞进你的梦里', link: 'https://www.bilibili.com/video/BV1dvQAYTEwa/', views: '再生1.1万回 · お気に入り644', date: '2025-03' }
  },
  {
    id: 14,
    title: '18 区画のフェアリーコテージ · 完全版',
    style: '森林風', room: '家全体', budget: '微課金', diff: 3,
    scale: '18 区画',
    imgPrompt: 'elf fairy tale cottage with mushroom decorations and vines in cute casual mobile game art style magical forest glow',
    tips: ['18 区画まるごとの全図解説', 'フェアリー要素は満載', 'バグなしで安全に作れる'],
    steps: ['まず全体図を計画：本体コテージ + キノコの装飾区 + ツタの回廊', 'キノコかツタのどちらかを主役に — もう一方は差し色だけ', '灯りはあたたかい緑とあたたかい黄色のミックス — 夜には「フェアリー村」に'],
    pit: 'テーマ要素は盛りすぎ注意 — キノコもツタも全面に張ると野暮ったくなる。主従をはっきりさせると上品に。',
    source: { platform: 'Bilibili', author: '爱吃鸡腿achy', link: 'https://www.bilibili.com/video/BV15bfCBbEE3/', views: '再生1.3万回', date: '不明' }
  },
  {
    id: 15,
    title: '「知夏」夏の爽やか建築',
    style: 'カントリー', room: '家全体', budget: '微課金', diff: 2,
    scale: '標準区画',
    imgPrompt: 'summer fresh courtyard house with green plants and wooden fence in cute casual mobile game art style bright summer day',
    tips: ['「知夏」テーマの爽やかデザイン', '参考にできる完全建造プロセス', 'コミュニティ人気の解説'],
    steps: ['爽やかな配色で土台：白壁 + 薄木 + 緑の 3 色だけ', '解説の工程どおりに建てる — 中庭には余白を残す', '夏の要素（日除け・ガゼボ）はお好みで足す'],
    pit: '夏テーマに冷色を盛りすぎない — 丸太ブラウンを少し加えて落着かせれば、爽やかさとあたたかさを両立できる。',
    source: { platform: 'Bilibili', author: '萌优i', link: 'https://www.bilibili.com/video/BV1ryKA6hEHm/', views: '再生1.4万回', date: '不明' }
  },
  {
    id: 16,
    title: '緑の小さなエステート（18 区画）',
    style: 'カントリー', room: '家全体', budget: '微課金', diff: 2,
    scale: '18 区画',
    imgPrompt: 'green country manor estate with garden and hedges in cute casual mobile game art style sunny afternoon',
    tips: ['18 区画でエステート級のプランニング', '全敷地をグリーンひと色で統一', '畑と花壇はゾーン分け可能'],
    steps: ['土地の大半は屋外に — 庭 + 畑のゾーニングを先に', '緑を基調に、濃淡でレイヤー（生垣が最も濃く、芝生が最も薄く）', '室内はシンプルに — エステートの魂は屋外にある'],
    pit: 'エステート風は予算を屋外に使う — 室内につぎ込まず、庭と畑こそが顔になる。',
    source: { platform: 'Bilibili', author: '小软软丿', link: 'https://www.bilibili.com/video/BV1Q7t7eaE1c/', views: '再生1.4万回', date: '不明' }
  },
  {
    id: 17,
    title: '18 区画の水辺ヴィラ（解体解説つき）',
    style: 'モダン', room: '家全体', budget: '微課金', diff: 3,
    scale: '18 区画',
    imgPrompt: 'modern waterfall villa with water flowing through terraces in cute casual mobile game art style elegant evening',
    tips: ['水辺ヴィラの構造を解剖', '「どう解体するか」という建築の考え方を学べる', '構造を理解したい上級者向け'],
    steps: ['まず解体回で構造を理解：どの階が耐力を持つか、水はどこから入るか', 'それから建造回で再現 — スキップフロア + 水路が核心', '解体の考え方を覚えれば、他人の家も「透けて」見えるようになる'],
    pit: 'これは解体解説 — 構造を理解してから着手しないと、階のつなぎ目で詰まる。',
    source: { platform: 'Bilibili', author: '平衡平衡白平衡', link: 'https://www.bilibili.com/video/BV1R41xYJE1U/', views: '再生2.6万回', date: '不明' }
  },
  {
    id: 18,
    title: 'サニーコーストのモダンヴィラ',
    style: 'マリン', room: '家全体', budget: '微課金', diff: 2,
    scale: '18 区画',
    imgPrompt: 'sunny coast seaside modern villa with deck chairs and umbrella in cute casual mobile game art style bright beach day',
    tips: ['18 区画のモダンヴィラ構造', 'サニーコースト配色（白 + 海ブルー + イエロー）', '海辺リゾートの差し色で仕上げ'],
    steps: ['本体は白基調のモダンヴィラで', '海ブルーは窓枠・ドア枠とプールに、イエローは差し色だけ', '屋外にデッキチェア + パラソル — 瞬時にリゾート感が出る'],
    pit: 'コーストスタイルの主戦場は屋外 — 壁に予算をつぎ込まない。プールの位置とデッキチェアこそが魂。',
    source: { platform: 'Bilibili', author: '问水水耶', link: 'https://www.bilibili.com/video/BV1wFNueYED1/', views: '再生1.2万回', date: '不明' }
  },
  {
    id: 19,
    title: '冬の賛歌モダンヴィラ',
    style: 'モダン', room: '家全体', budget: '微課金', diff: 3,
    scale: '標準区画',
    imgPrompt: 'winter theme modern villa with snow decorations and warm window light in cute casual mobile game art style snowfall',
    tips: ['冬テーマの季節感あふれる雰囲気', '初心者向けの完全ウォークスルー', 'モダンヴィラの基本も学べる'],
    steps: ['配色を固定：白 + 濃紺 + 暖黄（雪 + 夜空 + 灯り）', 'まず主構造をがっちり — 冬の装飾は最後に', '初心者はこの完全工程を 1 周すれば、建築の基本も身につく'],
    pit: '雪の装飾は土地を食う — 主屋を先に建ててから飾らないと、区画が足りなくなる。',
    source: { platform: 'Bilibili', author: '问水水耶', link: 'https://www.bilibili.com/video/BV1mFZZBDEfL/', views: '再生1.7万回', date: '不明' }
  },
  {
    id: 20,
    title: '無課金ノーバグの浴室装飾',
    style: 'モダン', room: '浴室', budget: '無課金', diff: 1,
    scale: 'ワンルーム',
    imgPrompt: 'simple modern clean bathroom with zero cost furniture in cute casual mobile game art style bright tidy',
    tips: ['無料建材だけで完成', 'バグなしのレイアウト', '同じ作者に書斎 + 寝室の同図解説あり'],
    steps: ['無料の白系建材で土台 — 床は明るい色が最も清潔に見える', '浴槽は最奥の「主役」に、鏡は入口の対面に掛ける', '作者の書斎 + 寝室解説と組み合わせれば、一軒分そろう'],
    pit: '浴室の床に暗色は使わない — 水しぶきのテクスチャが汚く見える。明るい色こそ正解。',
    source: { platform: 'Bilibili', author: '心动小齐', link: 'https://www.bilibili.com/video/BV1t4wJzWEnd/', views: '不明', date: '2026-03' }
  },
  {
    id: 21,
    title: '無課金 書斎 + 寝室の同図解説',
    style: 'モダン', room: '寝室', budget: '無課金', diff: 1,
    scale: '1 区画 2 部屋',
    imgPrompt: 'compact study and bedroom combination room with desk and bed in cute casual mobile game art style efficient layout',
    tips: ['1 つの図で 2 用途：書斎 + 寝室', '無課金でバグなし', '小住宅プレイヤーにやさしい'],
    steps: ['1 枚の図で 2 つのゾーンを計画：書斎は窓側（採光）、ベッドは奥（静か）', '仕切り壁ではなく家具の向き + ラグでゾーニング', '本棚は壁一面に立てて — 収納最大で床を消費しない'],
    pit: '小住宅に仕切り壁を無理に入れない — 家具でゾーニングするほうがマスを節約でき、広くも見える。',
    source: { platform: 'Bilibili', author: '心动小齐', link: 'https://www.bilibili.com/video/BV1yGQpBPEZw/', views: '再生182', date: '2026-04' }
  },
  {
    id: 22,
    title: '超カンタンな新中国風の小さな家',
    style: '中国風', room: '家全体', budget: '微課金', diff: 1,
    scale: '小さな家',
    imgPrompt: 'simple new chinese style small building with white walls and dark wood in cute casual mobile game art style clean daylight',
    tips: ['超カンタン・初心者向け', '新中国風の配色（白壁 + 濃木）', '建材と寸法は投稿の後続コメントに'],
    steps: ['白壁 + 濃木の 2 色で決まり — 初心者でも一発で形になる', 'コメント欄を最後まで読み、建材リストと寸法を確認してから着手', '構造はシンプル — 初めての中国風の練習に最適'],
    pit: '建材リストと寸法は投稿のコメント欄 — 買い物の前に読むこと。感覚で買わない。',
    source: { platform: 'TapTap', author: '姜梨.', link: 'https://www.taptap.cn/moment/563093677061177365', views: '不明', date: '不明' }
  },
  {
    id: 23,
    title: '蘇州風庭園の解説',
    style: '中国風', room: '屋外', budget: '微課金', diff: 3,
    scale: '庭の区画を全開放',
    imgPrompt: 'suzhou classical chinese garden courtyard with moon gate and corridor in cute casual mobile game art style serene',
    tips: ['蘇州庭園の要素（月洞門 / 回廊 / 築山）', '地皮を全開放してから建築、拡張にも対応', '中国風庭園のベンチマーク投稿'],
    steps: ['まず庭の地皮を全開放 — 蘇州庭園に小区画版はない', '月洞門を主入口に、回廊で各機能ゾーンをつなぐ', '築山 + 水景で仕上げ — 詰め込むより余白のほうが「蘇州らしい」'],
    pit: '庭園は地皮を大量に食う — すべて開放してから着工。建てている最中の拡張はツライ。',
    source: { platform: 'TapTap', author: '阿离酱', link: 'https://www.taptap.cn/moment/571703292032192173', views: '不明', date: '2024-08' }
  },
  {
    id: 24,
    title: 'レトロ南洋風インテリア（家具リストつき）',
    style: 'レトロ', room: '家全体', budget: '微課金', diff: 2,
    scale: '家全体',
    imgPrompt: 'retro nanyang style interior with rattan furniture and wooden shutters in cute casual mobile game art style vintage warm',
    tips: ['レトロ南洋風の完全事例', '家具リストは元投稿にあり、そのまま写せる', '3 種の神器：籐家具 + ブラインド + グリーン'],
    steps: ['投稿の家具リストどおりに素材を集める — 籐家具とブラインドが魂', '配色：籐ブラウン中心 + 緑を多め + レトロレッドをひとさじ', 'ブラインドは家中で統一 — 一気に南洋の空気感が出る'],
    pit: '南洋風は細部で作る — 籐かブラインドが欠けると、ただの木の家になる。ケチらない。',
    source: { platform: 'TapTap', author: '棉绵min', link: 'https://www.taptap.cn/moment/565512216636296770', views: '不明', date: '不明' }
  },
  {
    id: 25,
    title: '無垢材の新中国風リビング',
    style: '中国風', room: 'リビング', budget: '微課金', diff: 1,
    scale: 'ワンルーム',
    imgPrompt: 'wood new chinese style living room with tea table and bookshelf in cute casual mobile game art style warm wood tones',
    tips: ['無垢材 × 新中国風のレシピ', 'リビングのレイアウト解説', '茶卓 + 飾り棚の定番構成'],
    steps: ['原木色で部屋を統一し、家具はひとトーン濃い色でレイヤー', '茶卓を中央に + 飾り棚は壁際 — 中国風リビングの定番', '照明は暖黄色だけ — 白色光は木の質感を台なしにする'],
    pit: '新中国風のリビングに西洋風家具を混ぜない — ひとつの配色に 2 つのスタイルが出たら、台なしになる。',
    source: { platform: 'TapTap', author: '磕不磕瓜子', link: 'https://www.taptap.cn/moment/577241060451814324', views: '不明', date: '不明' }
  },
  {
    id: 26,
    title: 'レトロな書斎',
    style: 'レトロ', room: '書斎', budget: '微課金', diff: 2,
    scale: 'ワンルーム',
    imgPrompt: 'vintage study room with dark wood bookshelves and green lamp in cute casual mobile game art style classic scholar feel',
    tips: ['レトロ書斎の配色（濃木 + 墨緑 / ワインレッド）', '本棚 + ラグの定番レイアウト', '見ながら作れる解説投稿'],
    steps: ['壁一面に濃木の本棚、読書スペースにラグを敷く', '差し色は墨緑かワインレッドのどちらか 1 色だけ（デスクライト / カーテン）', '最後にレトロなデスクを置けば、空気感は最高潮に'],
    pit: 'レトロ風の照明は暖黄色でなければならない — 白色光 1 つで雰囲気はゼロになる。',
    source: { platform: 'TapTap', author: '暴躁小熊尼尼', link: 'https://www.taptap.cn/moment/577187784767310358', views: '不明', date: '不明' }
  },
  {
    id: 27,
    title: '8×10 新春コテージの建築解説',
    style: '中国風', room: '家全体', budget: '微課金', diff: 1,
    scale: '8×10 スタート',
    imgPrompt: '8x10 chinese new year cottage with red lanterns in cute casual mobile game art style festive winter',
    tips: ['8×10 — コミュニティ検証済みのコスパ最強スタートサイズ', '構造 → 塗装 → 屋根の順に分割更新', '新春テーマの入門作例'],
    steps: ['8×10 の基礎から着手 — 主構造は解説どおりに建てる', '塗装と屋根の回が更新されるまで、原木色のままで', '住みながら貯めて徐々にアップグレード — 一気に完成を狙わない'],
    pit: '8×10 は検証済みのコスパ最強スタートサイズ — 序盤に大きく張らない。床を敷くだけで家計が空になる。',
    source: { platform: 'TapTap', author: '洁洁羔', link: 'https://www.taptap.cn/hashtag/%E5%BF%83%E5%8A%A8%E5%B0%8F%E9%95%87%E6%95%99%E7%A8%8B?page=9', views: '不明', date: '2025-01' }
  },
  {
    id: 28,
    title: 'バスタブを高級バスプールにグレードアップ',
    style: 'モダン', room: '浴室', budget: '無課金', diff: 2,
    scale: '部分リメイク',
    imgPrompt: 'modern luxury bathtub upgraded bathing pool in cute casual mobile game art style spa feeling soft light',
    tips: ['ミニマルなバスタブを高級感あるバスプールに改造', '初心者でもできる', 'いくつかバグを使う（気になる人は回避）'],
    steps: ['バスタブ本体は残して、周囲をデッキと石のテクスチャで囲む', '解説どおりにバグを使い、浴槽を「沈み込み」風にする', 'ムード照明を追加 — 高級感の正体はほぼ光と影'],
    pit: 'バグを使う — 着工前にセーブのスクリーンショットを撮って復元できるように。バグが嫌いな人は回避を。',
    source: { platform: 'TapTap', author: '问水', link: 'https://www.taptap.cn/hashtag/%E5%BF%83%E5%8A%A8%E5%B0%8F%E9%95%87%E5%86%85%E9%A5%B0%E6%95%99%E7%A8%8B?type=newest', views: '不明', date: '2026-07' }
  },
  {
    id: 29,
    title: 'ダークウッドの温もり住まい · 没入型内装解説',
    style: 'モダン', room: '家全体', budget: '無課金', diff: 2,
    scale: '家全体の内装',
    imgPrompt: 'dark wood warm interior living room with soft lamp light in cute casual mobile game art style cozy evening healing',
    tips: ['没入型の内装解説 — 初心者でも建築可能', '素材はすべて安い代替品に差し替え', '雨の日にもってこいの癒し系代表作'],
    steps: ['解説どおりに代替素材で内装 — 節約額はバカにならない', '代替品は色味が少し違う — 全面に広げる前に 1 マスで試す', '暖色の灯りは多めに — ダークウッド住まいの「温もり」はすべて照明で決まる'],
    pit: '代替素材は節約になるが色味がずれる — 小さい面積で納得してから家全体に広げること。',
    source: { platform: 'TapTap', author: '问水', link: 'https://www.taptap.cn/user/709351257', views: '不明', date: '2026-07' }
  },
  {
    id: 30,
    title: 'クリーム風の癒しタタミ寝室',
    style: 'クリームフレンチ', room: '寝室', budget: '微課金', diff: 1,
    scale: 'ワンルーム',
    imgPrompt: 'cream style tatami bedroom with soft beige tones in cute casual mobile game art style sunset glow through window',
    tips: ['クリーム配色（ミルキーホワイト + 薄木 + 籐）', 'タタミの床台レイアウト', '夕暮れ光と合わせれば「一目惚れ」の一枚に'],
    steps: ['まずタタミの床台を敷く — 層板を積みすぎない（天井高を食う）', '3 点セット：ミルキーホワイトの壁 + 薄木の家具 + 籐の差し色', '夕暮れの時間にスクリーンショット — この作例の映えポイントは窓辺'],
    pit: 'タタミの床台は天井高を食う — 部屋が低い場合は層板を 1 枚減らさないと、圧迫感が出る。',
    source: { platform: 'TapTap', author: '社区作者', link: 'https://www.taptap.cn/hashtag/%E5%BF%83%E5%8A%A8%E5%B0%8F%E9%95%87%E5%86%85%E9%A5%B0%E6%95%99%E7%A8%8B?page=2', views: '不明', date: '2025-07' }
  }
];
