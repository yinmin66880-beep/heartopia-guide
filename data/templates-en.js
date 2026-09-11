/* ============================================================
 * Heartopia Guide · Template library data, English edition v1.0
 * 30 real community case studies · collected 2026-09-03
 * ------------------------------------------------------------
 * Same schema as data/templates.js (Chinese canonical) — keep
 * entries and ids in sync when either file is updated.
 * All entries come from public Bilibili / TapTap community
 * tutorials; authors and links are real and traceable.
 * Card images are AI-generated style illustrations (not in-game
 * screenshots) — see the original posts for actual results.
 * ============================================================ */

window.HEARTOPIA_TPL_META = {
  version: '1.0',
  updatedAt: '2026-09-03',
  total: 30,
  sourceNote: 'Templates are collected from real Bilibili / TapTap community tutorials — open a card to jump to the original post and build along'
};

window.HEARTOPIA_TPLS = [
  {
    id: 1,
    title: 'F2P Mountain Forest Villa · Step-by-Step',
    style: 'Forest', room: 'Whole House', budget: 'F2P', diff: 2,
    scale: 'Standard plot',
    imgPrompt: 'zero cost forest style mountain villa exterior with wooden walls green roof in cute casual mobile game art style warm afternoon light',
    tips: ['Forest-style mountain villa with zero spending and no overlap glitches', 'Full build walkthrough with a 1.4x speed structure video', 'Completely glitch-free — copy it as-is'],
    steps: ['Watch the 1.4x structure video first for the main flow — note the load-bearing pillars and floor positions', 'Build the main structure in video order: foundation → ground floor → roof, with no overlap glitches', 'Finish with doors, windows and greenery — the forest vibe comes from vines and potted plants'],
    pit: 'Avoid overlap-glitch builds — a patch can collapse them. This one is glitch-free throughout, safe to copy.',
    source: { platform: 'Bilibili', author: '平衡平衡白平衡', link: 'https://www.bilibili.com/video/BV1mpebzfEj8/', views: '60K views · 3,567 saves', date: '2025-08' }
  },
  {
    id: 2,
    title: 'Sea Salt & Cheese Cottage 2.0',
    style: 'Blue', room: 'Whole House', budget: 'Low-Spend', diff: 2,
    scale: 'Standard plot',
    imgPrompt: 'sea salt blue and cheese cream white cottage exterior with seaside elements in cute casual mobile game art style soft daylight',
    tips: ['Classic sea-salt blue × cheese-cream white palette', 'Optimized 2.0 structure with a complete tutorial', 'A community favorite to build along'],
    steps: ['Paint the walls sea-salt blue first; brighten the roof and window frames with cheese-cream white', 'Follow the 2.0 tutorial for the main body — the 2.0 structure differs from 1.0, don\u2019t mix them up', 'Accent with seaside pieces like shells and anchors — a few, not a pile'],
    pit: 'Don\u2019t mix the 2.0 and 1.0 tutorials — the structures differ. Confirm the latest version before you start.',
    source: { platform: 'Bilibili', author: '小软软丿', link: 'https://www.bilibili.com/video/BV1j8suerEpR/', views: '63K views', date: 'unknown' }
  },
  {
    id: 3,
    title: 'Suitcase Cottage',
    style: 'Cute', room: 'Whole House', budget: 'Low-Spend', diff: 3,
    scale: 'Standard plot',
    imgPrompt: 'creative suitcase shaped house with handle and straps in cute casual mobile game art style colorful playful design sunny day',
    tips: ['A creative one-of-a-kind shape, instantly recognizable', 'A community-verified popular build', 'Distinctive enough to be your showcase house'],
    steps: ['Start with a flat rectangular body as the "case"; mount the handle on top with horizontal bars', 'Cut doors and windows into the sides — proportions like a real suitcase (width > height)', 'Add straps and sticker decorations outside: a "walking suitcase" in one step'],
    pit: 'Creative shapes look great but are hard to modify — settle the functional layout before moving in; later renovations mean tearing half of it down.',
    source: { platform: 'Bilibili', author: '我快乐个球', link: 'https://www.bilibili.com/video/BV1LHvveuEXr/', views: '88K views · 3,276 saves', date: '2024-08' }
  },
  {
    id: 4,
    title: '18-Plot New Chinese-Style Villa',
    style: 'Chinese', room: 'Whole House', budget: 'Low-Spend', diff: 3,
    scale: '18 plots · 36 crop fields · 59 flowers',
    imgPrompt: 'modern chinese style villa with dark grey roof white walls wooden pillars in cute casual mobile game art style elegant garden',
    tips: ['Full plan: 18 plots + 36 crop fields + 59 flowers', 'Three-part tutorial (upper / middle / lower + interiors)', 'Author\u2019s terms: rebuilds allowed with credit, no commercial use'],
    steps: ['Set up the main structure with part one: white walls + dark grey roof tiles + wooden pillars', 'Parts two and three add the courtyard and details; zone fields and flower beds as taught (36 crops + 59 flowers)', 'Finish with the interiors episode — credit the original author in your post if you rebuild'],
    pit: 'The author forbids commercial use, reselling, and edits — personal rebuilds are fine as long as you credit the source.',
    source: { platform: 'Bilibili', author: '柑橘好好食', link: 'https://www.bilibili.com/video/BV1J7hCzUEVJ', views: '20K views · 973 saves', date: '2025-09' }
  },
  {
    id: 5,
    title: 'Modern Dark-Wood Warm Villa',
    style: 'Modern', room: 'Whole House', budget: 'F2P', diff: 2,
    scale: 'Adjustable plot count',
    imgPrompt: 'modern dark wood warm toned villa exterior with large windows in cute casual mobile game art style dusk warm light',
    tips: ['Glitch-free build from start to finish', 'Easy to replicate with zero spending', 'Dark wood + warm tones; plot count adjusts freely'],
    steps: ['Lock the palette: dark-wood body + warm yellow lighting — nothing else', 'Adjust the plot count to your land size; keep the structural proportions', 'Add large windows — dark wood reads dim, natural light saves it'],
    pit: 'Dark-wood walls drink up light — keep warm lamps on even in the daytime, or the room looks like a blackout.',
    source: { platform: 'Bilibili', author: '问水水耶', link: 'https://www.bilibili.com/video/BV1Ebg46eE84/', views: '5,662 views · 398 saves', date: '2026-07' }
  },
  {
    id: 6,
    title: 'Black & White Artist Loft',
    style: 'Modern', room: 'Whole House', budget: 'Low-Spend', diff: 2,
    scale: 'Standard plot',
    imgPrompt: 'black and white artist loft apartment interior with high ceiling in cute casual mobile game art style minimalist gallery feel',
    tips: ['Beginner-friendly interior tutorial', 'Minimalist black-and-white formula', 'Makes full use of the loft ceiling height'],
    steps: ['Use only black, white and grey gradients indoors — no colors allowed', 'Use the height for a double-height living room; hang large art as a "gallery spot"', 'Follow along episode by episode — beginners get it right in one pass'],
    pit: 'Pure black-and-white can feel cold — one or two wooden pieces or plants warm it right up.',
    source: { platform: 'Bilibili', author: '问水水耶', link: 'https://www.bilibili.com/video/BV1EpcWzUE6v/', views: '38K views', date: 'unknown' }
  },
  {
    id: 7,
    title: 'No-Spend Forest Cabin',
    style: 'Forest', room: 'Whole House', budget: 'F2P', diff: 2,
    scale: 'Standard plot',
    imgPrompt: 'cozy exquisite forest style wooden house with plants and warm lamp in cute casual mobile game art style evening glow',
    tips: ['Zero spending, zero overlap glitches', 'Refined and cozy style', 'Builds entirely with free materials'],
    steps: ['Build the body with free log-colored materials; keep the palette to log + green', 'Use the largest windows everywhere to make up for poor lighting', 'Pots around the house + warm lamps inside = instant coziness'],
    pit: 'The catch: you farm the dyed wood yourself — stock up dyes and wood for a week before starting.',
    source: { platform: 'Bilibili', author: '平衡平衡白平衡', link: 'https://www.bilibili.com/video/BV1ML61B3ECo/', views: '29K views', date: 'unknown' }
  },
  {
    id: 8,
    title: '12-Plot Forest Cabin',
    style: 'Forest', room: 'Whole House', budget: 'Low-Spend', diff: 1,
    scale: '12 plots',
    imgPrompt: 'small compact forest cabin on limited plot with vertical garden in cute casual mobile game art style morning mist',
    tips: ['Compact 12-plot layout', 'Friendly for small-plot players', 'A full follow-along tutorial video'],
    steps: ['Give all 12 plots to the main body and stack functions — a second floor beats expanding sideways', 'Fix the staircase position first; it eats tiles and can\u2019t be patched in later', 'Use plant walls instead of flower beds on the facade — saves land and keeps the forest feel'],
    pit: 'Small plots punish greed — grid out each zone before placing furniture, or you won\u2019t have room to turn around.',
    source: { platform: 'Bilibili', author: '柑橘好好食', link: 'https://www.bilibili.com/video/BV1AuzbB7E35/', views: '9,364 views', date: 'unknown' }
  },
  {
    id: 9,
    title: 'Isle Blue Deep-Sea Residence',
    style: 'Blue', room: 'Whole House', budget: 'Low-Spend', diff: 3,
    scale: 'Large layout',
    imgPrompt: 'deep ocean blue gradient residence exterior with navy walls and light blue accents in cute casual mobile game art style moonlight',
    tips: ['Deep-sea blue gradient walls, a community favorite', 'Illustrated tutorial (exterior) + detailed video', 'Dye recipes are in the original post\u2019s comments'],
    steps: ['Lay the walls in a deep-sea-blue → light-blue gradient, darker below, to mimic light through water', 'Build the exterior from the illustrated guide; details are in the video (interiors not included)', 'Copy the dye recipes from the comments — exact color codes, no misses'],
    pit: 'Interiors are not covered — plan your own. Dark walls absorb daylight, so add warm lamps for the daytime.',
    source: { platform: 'TapTap', author: '兔稚好可爱', link: 'https://www.taptap.cn/moment/828020326779586206', views: '2,836 views', date: '2026-08' }
  },
  {
    id: 10,
    title: 'Mountain Isle Villa',
    style: 'Modern', room: 'Whole House', budget: 'Low-Spend', diff: 3,
    scale: 'Standard plot',
    imgPrompt: 'modern mountain island villa with terraced levels and water feature in cute casual mobile game art style sunset',
    tips: ['"Mountain isle" structure (built around terrain and water)', 'Complete tutorial video', 'A good structure reference for advanced builders'],
    steps: ['Study the terrain around your plot first and pick the villa\u2019s main orientation', 'Build the split-level structure as taught — don\u2019t skip terraces and water features', 'It\u2019s complex: keep the tutorial video open and build section by section'],
    pit: 'The structure depends on terrain — if your surroundings differ, adapt the layout instead of copying blindly or it will look off.',
    source: { platform: 'Bilibili', author: '烩鱼_', link: 'https://www.bilibili.com/video/BV1rMCRYMEz8/', views: '38K views', date: 'unknown' }
  },
  {
    id: 11,
    title: 'Modern Spring Macaron Villa',
    style: 'Cute', room: 'Whole House', budget: 'Low-Spend', diff: 3,
    scale: '18 plots',
    imgPrompt: 'modern pastel macaron colored villa exterior with spring flowers garden in cute casual mobile game art style bright daylight',
    tips: ['18-plot dopamine-style home', 'Follow along with no glitches needed', 'Great for beginners with the materials handbook'],
    steps: ['This episode covers the front yard — gather its materials from the handbook first', 'Keep the dopamine palette to 3–4 rotating macaron shades; more gets messy', 'Wait for later episodes after the front yard — don\u2019t improvise the backyard'],
    pit: 'The series releases in episodes — stock the current episode\u2019s materials before you start; running out mid-build kills the rhythm.',
    source: { platform: 'Bilibili', author: '问水水耶', link: 'https://www.bilibili.com/video/BV1t6KD6zEgM/', views: '3,212 views · 113 saves', date: '2026-06' }
  },
  {
    id: 12,
    title: 'Pink Dream Villa · Tutorial Part 1',
    style: 'Cute', room: 'Whole House', budget: 'Low-Spend', diff: 3,
    scale: '18 plots',
    imgPrompt: 'pink dreamy modern villa exterior with gradient pink walls in cute casual mobile game art style dreamy clouds',
    tips: ['18-plot modern villa structure', 'Dreamy pink gradient walls', 'Ongoing multi-part tutorial series'],
    steps: ['Raise the main body as a modern villa; paint the pink last', 'Gradient the walls pink (darker → lighter going up); leave the top plain', 'Follow the series in order — don\u2019t skip episodes'],
    pit: 'A flat pink wall gets tiring — the gradient + plain top is the soul of this build; don\u2019t cut corners.',
    source: { platform: 'Bilibili', author: '问水水耶', link: 'https://www.bilibili.com/video/BV1x44bzrEU3/', views: '8,521 views', date: 'unknown' }
  },
  {
    id: 13,
    title: 'Pink Villa Interiors · Bedroom & Bathroom',
    style: 'Cute', room: 'Bedroom', budget: 'Low-Spend', diff: 2,
    scale: 'Small villa interiors',
    imgPrompt: 'pink girly bedroom interior with matching bathroom in cute casual mobile game art style soft pastel tones warm light',
    tips: ['The finale of the pink villa interior series', 'This episode: bedroom + bathroom', 'Immersive follow-along video; earlier episodes cover study/kitchen/living room'],
    steps: ['Catch up on the earlier episodes (study, entryway, kitchen/dining/living) before this one', 'Place the bedroom and bathroom pieces one by one; layer the pinks dark-to-light', 'Watch the comments for the author\u2019s next color series'],
    pit: 'Test pink shades on a small patch first — one shade off and it\u2019s "too sweet"; go big only when satisfied.',
    source: { platform: 'Bilibili', author: '撞进你的梦里', link: 'https://www.bilibili.com/video/BV1dvQAYTEwa/', views: '11K views · 644 saves', date: '2025-03' }
  },
  {
    id: 14,
    title: '18-Plot Fairy Cottage · Full Build',
    style: 'Forest', room: 'Whole House', budget: 'Low-Spend', diff: 3,
    scale: '18 plots',
    imgPrompt: 'elf fairy tale cottage with mushroom decorations and vines in cute casual mobile game art style magical forest glow',
    tips: ['Full 18-plot walkthrough', 'Fairy-theme elements maxed out', 'Glitch-free, follow along safely'],
    steps: ['Plan the whole map first: main cottage + mushroom patch + vine corridor', 'Pick mushrooms OR vines as the main visual; use the other only as accents', 'Mix warm green and warm yellow lights — at night it becomes a "fairy village"'],
    pit: 'Themed pieces are easy to overdo — mushrooms AND vines everywhere gets gaudy; a clear hierarchy looks classy.',
    source: { platform: 'Bilibili', author: '爱吃鸡腿achy', link: 'https://www.bilibili.com/video/BV15bfCBbEE3/', views: '13K views', date: 'unknown' }
  },
  {
    id: 15,
    title: '"Zhi Xia" Summer-Fresh Build',
    style: 'Cottagecore', room: 'Whole House', budget: 'Low-Spend', diff: 2,
    scale: 'Standard plot',
    imgPrompt: 'summer fresh courtyard house with green plants and wooden fence in cute casual mobile game art style bright summer day',
    tips: ['"Zhi Xia" fresh-and-light summer design', 'Full build process to follow', 'A community favorite tutorial'],
    steps: ['Base it on a fresh palette: white walls + light wood + greenery, three colors only', 'Follow the full build process; leave breathing room in the courtyard', 'Add summer pieces (sun shades, gazebos) as you like'],
    pit: 'Don\u2019t pile on cold tones for a summer theme — a little log-brown grounding keeps it fresh AND cozy.',
    source: { platform: 'Bilibili', author: '萌优i', link: 'https://www.bilibili.com/video/BV1ryKA6hEHm/', views: '14K views', date: 'unknown' }
  },
  {
    id: 16,
    title: 'Green Little Manor (18 Plots)',
    style: 'Cottagecore', room: 'Whole House', budget: 'Low-Spend', diff: 2,
    scale: '18 plots',
    imgPrompt: 'green country manor estate with garden and hedges in cute casual mobile game art style sunny afternoon',
    tips: ['Manor-grade planning on 18 plots', 'One green theme across the whole estate', 'Zoned crop fields and flower beds'],
    steps: ['Spend most of the land outdoors: plan garden + field zones', 'Green as the keynote; layer the greens (hedges darkest, lawn lightest)', 'Keep interiors simple — the soul of a manor is the grounds'],
    pit: 'Manor style spends its budget outdoors — don\u2019t dump it all inside; the garden and fields are the face.',
    source: { platform: 'Bilibili', author: '小软软丿', link: 'https://www.bilibili.com/video/BV1Q7t7eaE1c/', views: '14K views', date: 'unknown' }
  },
  {
    id: 17,
    title: '18-Plot Waterside Villa (Teardown)',
    style: 'Modern', room: 'Whole House', budget: 'Low-Spend', diff: 3,
    scale: '18 plots',
    imgPrompt: 'modern waterfall villa with water flowing through terraces in cute casual mobile game art style elegant evening',
    tips: ['Waterside villa structure, dissected', 'Learn the "how to take it apart" approach to building', 'For advanced players who want to understand structure'],
    steps: ['Watch the teardown episode first: which floors bear load, where the water enters', 'Then replicate with the build episode — split levels + water channels are the core', 'Once you learn teardown thinking, you can "see through" anyone\u2019s house'],
    pit: 'This is a teardown tutorial — understand the structure before building, or you\u2019ll get stuck at the floor transitions.',
    source: { platform: 'Bilibili', author: '平衡平衡白平衡', link: 'https://www.bilibili.com/video/BV1R41xYJE1U/', views: '26K views', date: 'unknown' }
  },
  {
    id: 18,
    title: 'Sunny Coast Modern Villa',
    style: 'Blue', room: 'Whole House', budget: 'Low-Spend', diff: 2,
    scale: '18 plots',
    imgPrompt: 'sunny coast seaside modern villa with deck chairs and umbrella in cute casual mobile game art style bright beach day',
    tips: ['18-plot modern villa structure', 'Sunny coast palette (white + sea blue + yellow)', 'Seaside vacation accents to finish'],
    steps: ['Build the body as a modern villa with a white base', 'Sea blue for window/door frames and the pool; yellow only as accents', 'Add loungers + a parasol outdoors — instant resort vibes'],
    pit: 'Coastal style is about the outdoors — don\u2019t blow the budget on walls; the pool spot and loungers are the soul.',
    source: { platform: 'Bilibili', author: '问水水耶', link: 'https://www.bilibili.com/video/BV1wFNueYED1/', views: '12K views', date: 'unknown' }
  },
  {
    id: 19,
    title: 'Winter Ode Modern Villa',
    style: 'Modern', room: 'Whole House', budget: 'Low-Spend', diff: 3,
    scale: 'Standard plot',
    imgPrompt: 'winter theme modern villa with snow decorations and warm window light in cute casual mobile game art style snowfall',
    tips: ['Winter-theme seasonal atmosphere', 'Complete beginner-friendly walkthrough', 'Also teaches modern villa fundamentals'],
    steps: ['Lock the palette: white + deep blue + warm yellow (snow + night sky + lights)', 'Get the structure solid first; winter decor comes last', 'Beginners: one full run through this teaches the building basics too'],
    pit: 'Snow decor eats land — build the main house before decorating, or you\u2019ll run out of plots.',
    source: { platform: 'Bilibili', author: '问水水耶', link: 'https://www.bilibili.com/video/BV1mFZZBDEfL/', views: '17K views', date: 'unknown' }
  },
  {
    id: 20,
    title: 'F2P Glitch-Free Bathroom',
    style: 'Modern', room: 'Bathroom', budget: 'F2P', diff: 1,
    scale: 'Single room',
    imgPrompt: 'simple modern clean bathroom with zero cost furniture in cute casual mobile game art style bright tidy',
    tips: ['Done entirely with free materials', 'Glitch-free layout', 'Same author has matching study + bedroom tutorials'],
    steps: ['Base it on free white materials; light floors read cleanest', 'Put the bathtub center-stage at the far end; hang the mirror opposite the entrance', 'Pair with the author\u2019s study + bedroom tutorials for a full house'],
    pit: 'Skip dark bathroom floors — the water-stain texture looks dirty on them; light colors are the answer.',
    source: { platform: 'Bilibili', author: '心动小齐', link: 'https://www.bilibili.com/video/BV1t4wJzWEnd/', views: 'unknown', date: '2026-03' }
  },
  {
    id: 21,
    title: 'F2P Study + Bedroom in One Layout',
    style: 'Modern', room: 'Bedroom', budget: 'F2P', diff: 1,
    scale: 'One plot, two rooms',
    imgPrompt: 'compact study and bedroom combination room with desk and bed in cute casual mobile game art style efficient layout',
    tips: ['One layout, two rooms: study + bedroom', 'F2P and glitch-free', 'Small-home friendly'],
    steps: ['Plan two zones on one plot: study by the window (light), bed at the back (quiet)', 'Zone with furniture direction + rugs instead of partition walls', 'Full-height bookcases against the wall — max storage, zero floor cost'],
    pit: 'Don\u2019t force partition walls into small homes — furniture zoning saves tiles and looks roomier.',
    source: { platform: 'Bilibili', author: '心动小齐', link: 'https://www.bilibili.com/video/BV1yGQpBPEZw/', views: '182 views', date: '2026-04' }
  },
  {
    id: 22,
    title: 'Super-Simple New Chinese-Style House',
    style: 'Chinese', room: 'Whole House', budget: 'Low-Spend', diff: 1,
    scale: 'Small house',
    imgPrompt: 'simple new chinese style small building with white walls and dark wood in cute casual mobile game art style clean daylight',
    tips: ['Super simple, beginner-friendly', 'New Chinese palette (white walls + dark wood)', 'Materials list and dimensions are in the thread\u2019s later replies'],
    steps: ['Two colors set the tone: white walls + dark wood — beginners nail it in one go', 'Read through the thread replies for the materials list and dimensions before starting', 'Simple structure — a perfect first Chinese-style build'],
    pit: 'The materials list and sizes live in the thread replies — read them before buying; don\u2019t go by feel.',
    source: { platform: 'TapTap', author: '姜梨.', link: 'https://www.taptap.cn/moment/563093677061177365', views: 'unknown', date: 'unknown' }
  },
  {
    id: 23,
    title: 'Suzhou-Style Garden Tutorial',
    style: 'Chinese', room: 'Outdoor', budget: 'Low-Spend', diff: 3,
    scale: 'Courtyard land fully unlocked',
    imgPrompt: 'suzhou classical chinese garden courtyard with moon gate and corridor in cute casual mobile game art style serene',
    tips: ['Suzhou garden elements (moon gate / corridors / rockery)', 'Build after fully unlocking the land; supports expansion', 'A benchmark post for Chinese-style courtyards'],
    steps: ['Fully unlock the courtyard land first — there is no small-plot version of a Suzhou garden', 'Moon gate as the main entrance; corridors link the functional zones', 'Finish with rockery + water; empty space is more "Suzhou" than filling every tile'],
    pit: 'Courtyards devour land — unlock everything before starting; expanding mid-build is painful.',
    source: { platform: 'TapTap', author: '阿离酱', link: 'https://www.taptap.cn/moment/571703292032192173', views: 'unknown', date: '2024-08' }
  },
  {
    id: 24,
    title: 'Retro Nanyang Style (Furniture List Included)',
    style: 'Retro', room: 'Whole House', budget: 'Low-Spend', diff: 2,
    scale: 'Whole house',
    imgPrompt: 'retro nanyang style interior with rattan furniture and wooden shutters in cute casual mobile game art style vintage warm',
    tips: ['A complete retro Nanyang case', 'Furniture list in the original post, copy as-is', 'The three essentials: rattan wood + shutters + greenery'],
    steps: ['Gather materials from the post\u2019s furniture list — rattan pieces and shutters are the soul', 'Palette: rattan-brown dominant + lots of plants + a touch of retro red', 'Install shutters consistently across the house — instant Nanyang atmosphere'],
    pit: 'Nanyang style lives in the details — missing the rattan or the shutters leaves you with a plain wood house. Don\u2019t economize.',
    source: { platform: 'TapTap', author: '棉绵min', link: 'https://www.taptap.cn/moment/565512216636296770', views: 'unknown', date: 'unknown' }
  },
  {
    id: 25,
    title: 'Log-Wood New Chinese Living Room',
    style: 'Chinese', room: 'Living Room', budget: 'Low-Spend', diff: 1,
    scale: 'Single room',
    imgPrompt: 'wood new chinese style living room with tea table and bookshelf in cute casual mobile game art style warm wood tones',
    tips: ['Log wood × new Chinese-style formula', 'Living room layout tutorial', 'Classic tea table + display shelf setup'],
    steps: ['Log color as the base; furniture one shade darker for layering', 'Tea table centered + display shelf against the wall — the Chinese living room standard', 'Warm yellow lighting only; white light ruins the wood feel'],
    pit: 'Never mix European furniture into a new Chinese living room — two styles in one palette breaks the illusion.',
    source: { platform: 'TapTap', author: '磕不磕瓜子', link: 'https://www.taptap.cn/moment/577241060451814324', views: 'unknown', date: 'unknown' }
  },
  {
    id: 26,
    title: 'Vintage Study',
    style: 'Retro', room: 'Study', budget: 'Low-Spend', diff: 2,
    scale: 'Single room',
    imgPrompt: 'vintage study room with dark wood bookshelves and green lamp in cute casual mobile game art style classic scholar feel',
    tips: ['Vintage study palette (dark wood + ink green / wine red)', 'Classic bookshelf + rug layout', 'A follow-along tutorial post'],
    steps: ['Full-height dark-wood shelves along the wall; rug in the reading nook', 'Pick ONE accent — ink green or wine red (desk lamp / curtains)', 'Finish with a vintage desk; the atmosphere tops out'],
    pit: 'Vintage style demands warm yellow light — one cold white lamp and the vibe hits zero.',
    source: { platform: 'TapTap', author: '暴躁小熊尼尼', link: 'https://www.taptap.cn/moment/577187784767310358', views: 'unknown', date: 'unknown' }
  },
  {
    id: 27,
    title: '8×10 New Year Cottage Tutorial',
    style: 'Chinese', room: 'Whole House', budget: 'Low-Spend', diff: 1,
    scale: '8×10 starter',
    imgPrompt: '8x10 chinese new year cottage with red lanterns in cute casual mobile game art style festive winter',
    tips: ['8×10 — the community-verified value starter size', 'Released in parts: structure → paint → roof', 'New Year theme entry-level build'],
    steps: ['Start with an 8×10 foundation; build the main structure as taught', 'Stay log-colored until the paint and roof episodes drop', 'Move in, save up, upgrade gradually — don\u2019t try to finish in one go'],
    pit: '8×10 is the verified value starter — don\u2019t go big early; flooring alone can drain your wallet.',
    source: { platform: 'TapTap', author: '洁洁羔', link: 'https://www.taptap.cn/hashtag/%E5%BF%83%E5%8A%A8%E5%B0%8F%E9%95%87%E6%95%99%E7%A8%8B?page=9', views: 'unknown', date: '2025-01' }
  },
  {
    id: 28,
    title: 'Bathtub Upgrade: Luxury Bath Pool',
    style: 'Modern', room: 'Bathroom', budget: 'F2P', diff: 2,
    scale: 'Partial makeover',
    imgPrompt: 'modern luxury bathtub upgraded bathing pool in cute casual mobile game art style spa feeling soft light',
    tips: ['A minimalist bathtub turned into a luxury bath pool', 'Doable even for beginners', 'Requires a few glitches (skip if you mind them)'],
    steps: ['Keep the bathtub itself; surround it with platform and stone textures', 'Follow the tutorial\u2019s glitches to sink the tub into a "sunken" look', 'Add mood lighting — the luxe feel is mostly light and shadow'],
    pit: 'Glitches involved — screenshot your save before starting so you can restore; glitch-averse players should pass.',
    source: { platform: 'TapTap', author: '问水', link: 'https://www.taptap.cn/hashtag/%E5%BF%83%E5%8A%A8%E5%B0%8F%E9%95%87%E5%86%85%E9%A5%B0%E6%95%99%E7%A8%8B?type=newest', views: 'unknown', date: '2026-07' }
  },
  {
    id: 29,
    title: 'Dark-Wood Warm Home · Immersive Interiors',
    style: 'Modern', room: 'Whole House', budget: 'F2P', diff: 2,
    scale: 'Whole-house interiors',
    imgPrompt: 'dark wood warm interior living room with soft lamp light in cute casual mobile game art style cozy evening healing',
    tips: ['Immersive interior tutorial, beginner-buildable', 'All materials swapped for budget alternatives', 'A signature cozy build for rainy days'],
    steps: ['Use the budget substitutes as taught — the savings are real', 'Substitute colors differ slightly — test one tile before doing the whole room', 'Place warm lights generously; the "warm" in a dark-wood home is all lighting'],
    pit: 'Substitutes save money but shift the colors — go house-wide only after a small patch looks right.',
    source: { platform: 'TapTap', author: '问水', link: 'https://www.taptap.cn/user/709351257', views: 'unknown', date: '2026-07' }
  },
  {
    id: 30,
    title: 'Cream-Style Healing Tatami Bedroom',
    style: 'Cream French', room: 'Bedroom', budget: 'Low-Spend', diff: 1,
    scale: 'Single room',
    imgPrompt: 'cream style tatami bedroom with soft beige tones in cute casual mobile game art style sunset glow through window',
    tips: ['Cream palette (milk white + light wood + rattan)', 'Tatami platform layout', 'Pair with sunset lighting for the "instant crush" shot'],
    steps: ['Lay the tatami platform first; don\u2019t stack boards too high (it eats headroom)', 'The trio: milk-white walls + light-wood furniture + rattan accents', 'Screenshot at sunset — this build\u2019s money shot is by the window'],
    pit: 'The tatami platform eats ceiling height — remove a board layer in low rooms or it feels stuffy.',
    source: { platform: 'TapTap', author: '社区作者', link: 'https://www.taptap.cn/hashtag/%E5%BF%83%E5%8A%A8%E5%B0%8F%E9%95%87%E5%86%85%E9%A5%B0%E6%95%99%E7%A8%8B?page=2', views: 'unknown', date: '2025-07' }
  }
];
