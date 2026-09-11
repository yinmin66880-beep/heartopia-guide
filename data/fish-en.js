/* Heartopia · fishing encyclopedia data, English edition
 * Same schema as data/fish.js (Chinese canonical) — keep entries in sync.
 * Source: game encyclopedia + community guides, cross-checked. */
window.HEARTOPIA_FISH = [
  {name:'Minnow',emoji:'🐟',loc:'Still River',times:['All day'],weathers:['Sunny','Rainy','Rainbow'],rarity:1,price:12,note:'A slender body, with slender scales to match.'},
  {name:'Bluegill Sunfish',emoji:'🐟',loc:'Still River',times:['Morning','Afternoon'],weathers:['Sunny'],rarity:1,price:18,note:'Most active when the sun is out.'},
  {name:'Sand Bream',emoji:'🐟',loc:'Still River',times:['All day'],weathers:['Rainy'],rarity:2,price:55,note:'Doubles its bite rate in the rain — the rainy-day bargain pick.'},
  {name:'River Perch',emoji:'🐟',loc:'River',times:['All day'],weathers:['Sunny','Rainy','Rainbow'],rarity:1,price:30,note:'Common and tasty — you have probably eaten one before.'},
  {name:'Rainbow Trout',emoji:'🐠',loc:'Lake',times:['Morning','Afternoon'],weathers:['Rainbow'],rarity:3,price:180,note:'Only shows up on rainbow days, scales shimmering in seven colors.'},
  {name:'Sakura Shrimp',emoji:'🦐',loc:'Hot Spring Stream',times:['Morning'],weathers:['Sunny'],rarity:2,price:65,note:'Loves warm stream water; easiest to catch at dawn.'},
  {name:'Sea Shrimp',emoji:'🦐',loc:'East Sea',times:['All day'],weathers:['Sunny','Rainy','Rainbow'],rarity:1,price:25,note:'A sea-dwelling shrimp and a dinner-table regular.'},
  {name:'Bonito',emoji:'🐟',loc:'All Sea Areas',times:['All day'],weathers:['Sunny','Rainy','Rainbow'],rarity:1,price:35,note:'Can be caught in every sea area on the map.'},
  {name:'Salmon',emoji:'🐟',loc:'All Sea Areas',times:['All day'],weathers:['Sunny','Rainy','Rainbow'],rarity:2,price:60,note:'A sea-area regular, on duty all day long.'},
  {name:'Horse Mackerel',emoji:'🐟',loc:'All Sea Areas',times:['All day'],weathers:['Sunny','Rainy','Rainbow'],rarity:1,price:28,note:'Travels in schools — practically one cast, one catch.'},
  {name:'Sardine',emoji:'🐟',loc:'Old Sea · Whale Sea',times:['All day'],weathers:['Sunny','Rainy'],rarity:1,price:20,note:'Little silver fish that show up in big schools.'},
  {name:'Pufferfish',emoji:'🐡',loc:'Old Sea',times:['Afternoon','Evening'],weathers:['Sunny'],rarity:3,price:120,note:'Puffs into a ball when angry — mind your fingers.'},
  {name:'European Flounder',emoji:'🐠',loc:'Old Sea',times:['Evening','Night'],weathers:['Sunny','Rainy'],rarity:2,price:80,note:'A flounder that prefers to feed after dark.'},
  {name:'European Eel',emoji:'🐟',loc:'Old Sea',times:['Evening'],weathers:['Rainy','Rainbow'],rarity:3,price:150,note:'Most active on rainy nights; a no-show in the small hours of rainbow days.'},
  {name:'Blackspot Sea Bream',emoji:'🐠',loc:'Old Sea',times:['Evening'],weathers:['Sunny'],rarity:2,price:90,note:'A stubborn one that will not bite until after dark.'},
  {name:'Hammerhead Shark',emoji:'🦈',loc:'Whale Sea',times:['Morning','Afternoon'],weathers:['Rainbow'],rarity:4,price:600,note:'A big one that only roams in the daytime on rainbow days — rod fully bent!'},
  {name:'Atlantic Mackerel',emoji:'🐟',loc:'Whale Sea',times:['All day'],weathers:['Sunny','Rainy'],rarity:2,price:70,note:'A long-time resident of Whale Sea.'},
  {name:'Atlantic Salmon',emoji:'🐟',loc:'Whale Sea',times:['All day'],weathers:['Sunny','Rainy'],rarity:3,price:110,note:'Quite the looker when it leaps out of the water.'},
  {name:'Silver Chimaera',emoji:'🐟',loc:'All Sea Areas',times:['Night'],weathers:['Sunny'],rarity:3,price:140,note:'Its silver body glitters underwater in the moonlight.'},
  {name:'Atlantic Silver Pepperfish',emoji:'🐠',loc:'Old Sea',times:['All day'],weathers:['Sunny'],rarity:3,price:130,note:'Sunny-day exclusive, spotted like grains of silver pepper.'},
  {name:'European Lobster',emoji:'🦞',loc:'East Sea',times:['Evening'],weathers:['Sunny','Rainy'],rarity:3,price:260,note:'A deep-sea aristocrat that comes out at night — sells for a happy price.'},
  {name:'Snow Crab',emoji:'🦀',loc:'Frozen Waters',times:['Evening'],weathers:['Snowy'],rarity:3,price:300,note:'Winter-season exclusive; its shell looks dusted with snow.'},
  {name:'Ice Sea Angel',emoji:'🐟',loc:'Frozen Waters',times:['All day'],weathers:['Snowy'],rarity:4,price:750,note:'A fish said to carry winter\u2019s blessing — good luck to whoever sees it.'},
  {name:'Koi',emoji:'🎏',loc:'Secret Pond',times:['Night'],weathers:['Sunny'],rarity:4,price:800,note:'Appears only at the secret pond past midnight — one of the rarest catches in the encyclopedia.'}
];
window.HEARTOPIA_RARITY = {
  1:{label:'Common',cls:'r1'},
  2:{label:'Uncommon',cls:'r2'},
  3:{label:'Rare',cls:'r3'},
  4:{label:'Legendary',cls:'r4'}
};
