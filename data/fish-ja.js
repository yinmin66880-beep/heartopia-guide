/* ハートピア · 釣り図鑑データ（日本語版）
 * data/fish.js（中国語 正規データ）と同じスキーマ — 項目は同期を保つこと。
 * 出典：ゲーム内図鑑 + コミュニティ攻略のクロスチェック。 */
window.HEARTOPIA_FISH = [
  {name:'ミノー',emoji:'🐟',loc:'静かな川',times:['終日'],weathers:['晴れ','雨','虹'],rarity:1,price:12,note:'体も鱗もほっそりしている。'},
  {name:'ブルーギル',emoji:'🐟',loc:'静かな川',times:['朝','昼'],weathers:['晴れ'],rarity:1,price:18,note:'日が出ている時間が最も活発。'},
  {name:'サンドブリーム',emoji:'🐟',loc:'静かな川',times:['終日'],weathers:['雨'],rarity:2,price:55,note:'雨の日は食いつき率が倍増 — 雨の日の、お得な一匹。'},
  {name:'パーチ',emoji:'🐟',loc:'川',times:['終日'],weathers:['晴れ','雨','虹'],rarity:1,price:30,note:'定番で美味 — きっと一度は食べたことがあるはず。'},
  {name:'ニジマス',emoji:'🐠',loc:'湖',times:['朝','昼'],weathers:['虹'],rarity:3,price:180,note:'虹の日にだけ現れ、鱗は七色にきらめく。'},
  {name:'サクラエビ',emoji:'🦐',loc:'温泉の小川',times:['朝'],weathers:['晴れ'],rarity:2,price:65,note:'あたたかい流れが好き — 明け方が一番釣りやすい。'},
  {name:'海エビ',emoji:'🦐',loc:'東の海',times:['終日'],weathers:['晴れ','雨','虹'],rarity:1,price:25,note:'海に住むエビ — 食卓の常連。'},
  {name:'カツオ',emoji:'🐟',loc:'全海域',times:['終日'],weathers:['晴れ','雨','虹'],rarity:1,price:35,note:'マップ上のどの海域でも釣れる。'},
  {name:'サケ',emoji:'🐟',loc:'全海域',times:['終日'],weathers:['晴れ','雨','虹'],rarity:2,price:60,note:'海域の常連 — 終日フル稼働。'},
  {name:'アジ',emoji:'🐟',loc:'全海域',times:['終日'],weathers:['晴れ','雨','虹'],rarity:1,price:28,note:'群れで回遊 — まるで一投一獲。'},
  {name:'イワシ',emoji:'🐟',loc:'旧海 · クジラ海',times:['終日'],weathers:['晴れ','雨'],rarity:1,price:20,note:'大群でやってくる銀色の小魚。'},
  {name:'フグ',emoji:'🐡',loc:'旧海',times:['昼','夜'],weathers:['晴れ'],rarity:3,price:120,note:'怒ると膨らむ — 指を噛まれないように。'},
  {name:'ヒラメ',emoji:'🐠',loc:'旧海',times:['夜','深夜'],weathers:['晴れ','雨'],rarity:2,price:80,note:'日が暮れてから餌を探しに出るヒラメ。'},
  {name:'ウナギ',emoji:'🐟',loc:'旧海',times:['夜'],weathers:['雨','虹'],rarity:3,price:150,note:'雨の夜が最も活発 — 虹の日の未明には姿を見せない。'},
  {name:'クロダイ',emoji:'🐠',loc:'旧海',times:['夜'],weathers:['晴れ'],rarity:2,price:90,note:'日が暮れないと針にかからない、ツンとしたやつ。'},
  {name:'シュモクザメ',emoji:'🦈',loc:'クジラ海',times:['朝','昼'],weathers:['虹'],rarity:4,price:600,note:'虹の日の昼間にだけ回遊する大物 — 竿が限界まで曲がる！'},
  {name:'サバ',emoji:'🐟',loc:'クジラ海',times:['終日'],weathers:['晴れ','雨'],rarity:2,price:70,note:'クジラ海の長年老住人。'},
  {name:'アトランティックサーモン',emoji:'🐟',loc:'クジラ海',times:['終日'],weathers:['晴れ','雨'],rarity:3,price:110,note:'水面から躍り出る瞬間はかなり映える。'},
  {name:'ギンザメ',emoji:'🐟',loc:'全海域',times:['深夜'],weathers:['晴れ'],rarity:3,price:140,note:'月光を浴びて、銀の体が水中できらめく。'},
  {name:'ギンコショウドジョウ',emoji:'🐠',loc:'旧海',times:['終日'],weathers:['晴れ'],rarity:3,price:130,note:'晴れの日限定 — 銀の胡椒のような斑点が散る。'},
  {name:'オマールエビ',emoji:'🦞',loc:'東の海',times:['夜'],weathers:['晴れ','雨'],rarity:3,price:260,note:'夜に現れる深海の貴族 — 売値が嬉しい。'},
  {name:'ズワイガニ',emoji:'🦀',loc:'氷雪海域',times:['夜'],weathers:['雪'],rarity:3,price:300,note:'冬期限定 — 甲羅に雪が積もったように見える。'},
  {name:'氷の海の天使',emoji:'🐟',loc:'氷雪海域',times:['終日'],weathers:['雪'],rarity:4,price:750,note:'冬の祝福を運ぶとされる魚 — 出会えた人はラッキー。'},
  {name:'ニシキゴイ',emoji:'🎏',loc:'秘密の池',times:['深夜'],weathers:['晴れ'],rarity:4,price:800,note:'真夜中に秘密の池だけに現れる — 全図鑑で最もレアな漁獲のひとつ。'}
];
window.HEARTOPIA_RARITY = {
  1:{label:'よく見かける',cls:'r1'},
  2:{label:'あまり見かけない',cls:'r2'},
  3:{label:'レア',cls:'r3'},
  4:{label:'伝説',cls:'r4'}
};
