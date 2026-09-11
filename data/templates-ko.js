/* ============================================================
 * 하트오피아 가이드 · 템플릿 라이브러리 데이터, 한국어판 v1.0
 * 실제 커뮤니티 사례 30건 · 2026-09-03 수집
 * ------------------------------------------------------------
 * data/templates.js(중국어 정본)와 동일한 스키마 — 업데이트 시
 * 두 파일 모두 항목과 id를 함께 유지하세요.
 * 모든 항목은 공개된 Bilibili / TapTap 커뮤니티 강좌에서
 * 수집했으며, 작성자와 링크는 실제로 추적 가능합니다.
 * 카드 이미지는 AI가 생성한 스타일 예시일 뿐(게임 실사 아님),
 * 실제 결과는 원문 게시물에서 확인하세요.
 * ============================================================ */

window.HEARTOPIA_TPL_META = {
  version: '1.0',
  updatedAt: '2026-09-03',
  total: 30,
  sourceNote: '템플릿은 Bilibili / TapTap 실제 커뮤니티 강좌에서 수집했습니다 — 카드를 열면 원문 게시물로 이동해 따라 지을 수 있어요'
};

window.HEARTOPIA_TPLS = [
  {
    id: 1,
    title: '무과금 산속 빌라 · 단계별 가이드',
    style: '숲', room: '집 전체', budget: '무과금', diff: 2,
    scale: '표준 부지',
    imgPrompt: 'zero cost forest style mountain villa exterior with wooden walls green roof in cute casual mobile game art style warm afternoon light',
    tips: ['무과금·무버그(오버랩 없음)로 짓는 숲 스타일 산속 빌라', '1.4배속 구조 영상과 함께하는 완전 건축 가이드', '전 구간 버그 없음 — 그대로 베껴도 완성'],
    steps: ['먼저 1.4배속 구조 영상으로 전체 흐름을 훑고 벽체 기둥과 층 위치를 기억하세요', '영상 순서대로 본체를 세우세요: 기초 → 1층 → 지붕, 오버랩 없이', '마지막에 문·창문·녹지로 마무리 — 숲 느낌은 덩굴과 화분으로 완성됩니다'],
    pit: '오버랩 버그 시공은 피하세요 — 패치 한 번에 무너질 수 있습니다. 이 사례는 전 구간 버그 없이 안심하고 따라 지어도 됩니다.',
    source: { platform: 'Bilibili', author: '平衡平衡白平衡', link: 'https://www.bilibili.com/video/BV1mpebzfEj8/', views: '6.0만 조회 · 3,567 저장', date: '2025-08' }
  },
  {
    id: 2,
    title: '씨솔트 앤 치즈 코티지 2.0',
    style: '블루', room: '집 전체', budget: '소과금', diff: 2,
    scale: '표준 부지',
    imgPrompt: 'sea salt blue and cheese cream white cottage exterior with seaside elements in cute casual mobile game art style soft daylight',
    tips: ['씨솔트 블루 × 치즈 크림 화이트의 클래식 배색', '구조가 개선된 2.0 버전, 완결 강좌', '커뮤니티 고인기 따라 짓기 사례'],
    steps: ['외벽을 먼저 씨솔트 블루로 칠하고, 지붕과 창틀은 치즈 크림 화이트로 밝게', '본체는 2.0 강좌를 따르세요 — 2.0과 1.0은 구조가 다르니 섞어 보지 마세요', '조개·닻 같은 바닷가 소품으로 포인트 — 몇 개만, 잔뜩 쌓지 말기'],
    pit: '2.0과 1.0 강좌를 섞지 마세요 — 구조가 다릅니다. 착수 전 최신 버전인지 확인하세요.',
    source: { platform: 'Bilibili', author: '小软软丿', link: 'https://www.bilibili.com/video/BV1j8suerEpR/', views: '6.3만 조회', date: 'unknown' }
  },
  {
    id: 3,
    title: '캐리어 하우스',
    style: '큐트', room: '집 전체', budget: '소과금', diff: 3,
    scale: '표준 부지',
    imgPrompt: 'creative suitcase shaped house with handle and straps in cute casual mobile game art style colorful playful design sunny day',
    tips: ['단 하나뿐인 창의적 조형, 알아보기 쉬운 실루엣', '커뮤니티 검증 고인기 사례', '남들과 다른 대표 하우스로 손색없음'],
    steps: ['납작한 직육면체 본체를 먼저 세워 캐리어 몸통을 만들고, 상단에 가로봉으로 손잡이를 장착하세요', '옆면에 문과 창문을 내세요 — 비율은 실제 캐리어처럼(가로 > 세로)', '외부에 스트랩과 스티커 장식을 더하면 "걸어 다니는 캐리어" 완성'],
    pit: '창의적 조형은 멋있지만 고치기 어렵습니다 — 입주 전에 기능 배치를 확실히 정하세요. 나중에 고치려면 절반을 허물어야 합니다.',
    source: { platform: 'Bilibili', author: '我快乐个球', link: 'https://www.bilibili.com/video/BV1LHvveuEXr/', views: '8.8만 조회 · 3,276 저장', date: '2024-08' }
  },
  {
    id: 4,
    title: '부지 18칸 신중국풍 빌라',
    style: '중국풍', room: '집 전체', budget: '소과금', diff: 3,
    scale: '부지 18칸 · 밭 36칸 · 꽃 59개',
    imgPrompt: 'modern chinese style villa with dark grey roof white walls wooden pillars in cute casual mobile game art style elegant garden',
    tips: ['부지 18칸 + 밭 36칸 + 꽃 59개의 완전한 계획', '상·중·하편 + 인테리어까지 총 4부작 강좌', '작가 공지: 출처를 밝히면 베껴도 OK, 상업적 이용 금지'],
    steps: ['상편으로 본체 구조부터: 흰 벽 + 짙은 회색 기와 + 목재 기둥 세트로 기조를 잡으세요', '중·하편에서 정원과 디테일을 더하고, 밭과 꽃밭은 강좌대로 구획하세요(작물 36 + 꽃 59)', '인테리어 편으로 마무리 — 베껴 지었다면 게시물에 원작자 출처를 밝히세요'],
    pit: '작가가 상업적 이용, 판매, 2차 가공을 금지했습니다 — 개인 베끼기는 출처만 밝히면 가능합니다.',
    source: { platform: 'Bilibili', author: '柑橘好好食', link: 'https://www.bilibili.com/video/BV1J7hCzUEVJ', views: '2.0만 조회 · 973 저장', date: '2025-09' }
  },
  {
    id: 5,
    title: '모던 다크우드 웜 빌라',
    style: '모던', room: '집 전체', budget: '무과금', diff: 2,
    scale: '부지 칸수 조절 가능',
    imgPrompt: 'modern dark wood warm toned villa exterior with large windows in cute casual mobile game art style dusk warm light',
    tips: ['전 구간 버그 없는 시공', '무과금으로도 쉬운 복제', '다크우드 + 웜톤 위주, 부지 칸수는 자유 조절'],
    steps: ['배색 고정: 다크우드 본체 + 따뜻한 노란 조명, 다른 색은 일절 금지', '보유 부지 크기에 맞춰 칸수를 조절하세요 — 구조 비율은 그대로', '대형 창문을 활용하세요 — 다크우드는 어두워서 자연광으로 살립니다'],
    pit: '다크우드 외벽은 빛을 먹습니다 — 낮에도 웜 라이트를 켜두세요, 안 그러면 집 안이 정전 난 것 같습니다.',
    source: { platform: 'Bilibili', author: '问水水耶', link: 'https://www.bilibili.com/video/BV1Ebg46eE84/', views: '5,662 조회 · 398 저장', date: '2026-07' }
  },
  {
    id: 6,
    title: '블랙 & 화이트 아티스트 로프트',
    style: '모던', room: '집 전체', budget: '소과금', diff: 2,
    scale: '표준 부지',
    imgPrompt: 'black and white artist loft apartment interior with high ceiling in cute casual mobile game art style minimalist gallery feel',
    tips: ['입문자용 인테리어 강좌', '블랙 앤 화이트 미니멀 공식', '로프트 층고를 최대한 활용'],
    steps: ['실내는 블랙·화이트·그레이 계열만 — 컬러는 한 조각도 들이지 마세요', '층고를 활용해 복층 거실을 만들고 대형 그림을 걸어 갤러리 포인트로', '회차별로 따라 지으면 초보자도 한 번에 완성됩니다'],
    pit: '순수 블랙 앤 화이트는 차가워 보입니다 — 목재 가구나 화분 한두 개만 있어도 바로 온기가 살아납니다.',
    source: { platform: 'Bilibili', author: '问水水耶', link: 'https://www.bilibili.com/video/BV1EpcWzUE6v/', views: '3.8만 조회', date: 'unknown' }
  },
  {
    id: 7,
    title: '무과금 숲 스타일 목조 주택',
    style: '숲', room: '집 전체', budget: '무과금', diff: 2,
    scale: '표준 부지',
    imgPrompt: 'cozy exquisite forest style wooden house with plants and warm lamp in cute casual mobile game art style evening glow',
    tips: ['무과금·오버랩 없음', '정갈하고 아늑한 스타일', '무료 재료만으로 완성'],
    steps: ['무료 원목색 재료로 본체를 세우세요 — 배색은 원목 + 그린 두 가지만', '채광 부족을 메우기 위해 창문은 전부 최대 사이즈로', '집 둘레의 화분 + 실내 웜 라이트 = 아늑함 완성'],
    pit: '무과금의 대가는 염색 목재를 직접 모아야 한다는 것 — 착수 일주일 전부터 염료와 목재를 미리 모으세요.',
    source: { platform: 'Bilibili', author: '平衡平衡白平衡', link: 'https://www.bilibili.com/video/BV1ML61B3ECo/', views: '2.9만 조회', date: 'unknown' }
  },
  {
    id: 8,
    title: '부지 12칸 숲 오두막',
    style: '숲', room: '집 전체', budget: '소과금', diff: 1,
    scale: '부지 12칸',
    imgPrompt: 'small compact forest cabin on limited plot with vertical garden in cute casual mobile game art style morning mist',
    tips: ['부지 12칸 콤팩트 배치', '소규모 부지 플레이어 배려', '처음부터 끝까지 따라 지을 수 있는 강좌 영상'],
    steps: ['12칸을 전부 본체에 투자하고 기능은 위로 쌓으세요 — 옆으로 확장보다 2층이 이득', '계단 위치는 첫 단계에서 확정하세요 — 칸을 많이 차지해서 나중에 못 넣습니다', '외벽은 꽃밭 대신 식물 벽으로 — 부지도 아끼고 숲 느낌도 유지됩니다'],
    pit: '좁은 부지에서 욕심은 금물 — 가구를 놓기 전에 구역마다 격자를 그리세요, 아니면 몸을 돌릴 틈도 없습니다.',
    source: { platform: 'Bilibili', author: '柑橘好好食', link: 'https://www.bilibili.com/video/BV1AuzbB7E35/', views: '9,364 조회', date: 'unknown' }
  },
  {
    id: 9,
    title: '아일 블루 심해 레지던스',
    style: '블루', room: '집 전체', budget: '소과금', diff: 3,
    scale: '대형 평면',
    imgPrompt: 'deep ocean blue gradient residence exterior with navy walls and light blue accents in cute casual mobile game art style moonlight',
    tips: ['심해 블루 그러데이션 외벽, 커뮤니티 인기', '그림 강좌(외관) + 상세 영상 강좌', '염색 배합은 원문 댓글에'],
    steps: ['외벽은 심해블루 → 라이트블루 그러데이션으로, 아래가 짙게 — 수면 아래 빛 느낌을 연출하세요', '외관은 그림 강좌대로, 디테일은 영상으로 확인하세요(인테리어 미포함)', '염색 배합은 원문 댓글에서 그대로 복사 — 색번호만 옮기면 실패 없습니다'],
    pit: '강좌에 인테리어가 없습니다 — 실내는 직접 계획하세요. 짙은 벽은 자연광을 먹으니 낮에도 웜 라이트를 보조로 켜세요.',
    source: { platform: 'TapTap', author: '兔稚好可爱', link: 'https://www.taptap.cn/moment/828020326779586206', views: '2,836 조회', date: '2026-08' }
  },
  {
    id: 10,
    title: '마운틴 아일 빌라',
    style: '모던', room: '집 전체', budget: '소과금', diff: 3,
    scale: '표준 부지',
    imgPrompt: 'modern mountain island villa with terraced levels and water feature in cute casual mobile game art style sunset',
    tips: ['지형과 물을 활용한 "마운틴 아일" 구조', '완결 강좌 영상', '상급 건축가의 구조 참고용'],
    steps: ['부지 주변 지형부터 파악하고 빌라의 주 방향을 정하세요', '단차 구조를 강좌대로 세우세요 — 테라스와 수경은 건너뛰지 마세요', '난이도가 높습니다 — 강좌 영상을 켜두고 구역별로 차근차근'],
    pit: '이 구조는 지형에 의존합니다 — 주변 환경이 다르다면 무작정 베끼지 말고 배치를 조정하세요, 아니면 어색해집니다.',
    source: { platform: 'Bilibili', author: '烩鱼_', link: 'https://www.bilibili.com/video/BV1rMCRYMEz8/', views: '3.8만 조회', date: 'unknown' }
  },
  {
    id: 11,
    title: '모던 스프링 마카롱 빌라',
    style: '큐트', room: '집 전체', budget: '소과금', diff: 3,
    scale: '부지 18칸',
    imgPrompt: 'modern pastel macaron colored villa exterior with spring flowers garden in cute casual mobile game art style bright daylight',
    tips: ['부지 18칸 도파민 하우스', '버그 없이 따라 짓기 가능', '자재 목록만 있으면 초보자도 OK'],
    steps: ['이번 화는 앞마당입니다 — 먼저 자재 목록에서 이번 화 소재를 모으세요', '도파민 배색은 마카롱 톤 3~4가지로 제한하세요 — 그 이상은 지저분해집니다', '앞마당이 끝나면 다음 화를 기다리세요 — 뒷마당을 즉흥으로 짓지 마세요'],
    pit: '시리즈가 회차별로 공개됩니다 — 시작 전에 이번 화 소재를 미리 모아두세요, 중간에 떨어지면 흐름이 끊깁니다.',
    source: { platform: 'Bilibili', author: '问水水耶', link: 'https://www.bilibili.com/video/BV1t6KD6zEgM/', views: '3,212 조회 · 113 저장', date: '2026-06' }
  },
  {
    id: 12,
    title: '핑크 드림 빌라 · 강좌 1편',
    style: '큐트', room: '집 전체', budget: '소과금', diff: 3,
    scale: '부지 18칸',
    imgPrompt: 'pink dreamy modern villa exterior with gradient pink walls in cute casual mobile game art style dreamy clouds',
    tips: ['부지 18칸 모던 빌라 구조', '드리미한 핑크 그러데이션 외벽', '연재 중인 시리즈 강좌'],
    steps: ['본체는 모던 빌라로 세우고 핑크 칠은 마지막에 하세요', '외벽은 핑크 그러데이션(위로 갈수록 연하게), 최상단은 무채색으로 남기세요', '시리즈는 순서대로 따르세요 — 회차를 건너뛰지 마세요'],
    pit: '단색 핑크 벽은 금방 질립니다 — 그러데이션과 무채색 상단이 이 집의 혼이니 대충하지 마세요.',
    source: { platform: 'Bilibili', author: '问水水耶', link: 'https://www.bilibili.com/video/BV1x44bzrEU3/', views: '8,521 조회', date: 'unknown' }
  },
  {
    id: 13,
    title: '핑크 빌라 인테리어 · 침실과 욕실',
    style: '큐트', room: '침실', budget: '소과금', diff: 2,
    scale: '소형 빌라 실내',
    imgPrompt: 'pink girly bedroom interior with matching bathroom in cute casual mobile game art style soft pastel tones warm light',
    tips: ['핑크 빌라 인테리어 시리즈의 완결편', '이번 화: 침실 + 욕실', '몰입형 따라 하기 영상 — 이전 화에서 서재/주방/거실을 다룹니다'],
    steps: ['이번 화 전에 이전 화(서재, 현관, 주방/식당/거실)를 먼저 보세요', '침실·욕실 가구를 하나씩 배치하고 핑크는 진한 것부터 연한 것 순으로 레이어하세요', '댓글에서 작가의 다음 컬러 시리즈를 확인하세요'],
    pit: '핑크 색조는 좁은 면적에 먼저 테스트하세요 — 한 톤만 어긋나면 지나치게 달아집니다. 만족할 때만 넓히세요.',
    source: { platform: 'Bilibili', author: '撞进你的梦里', link: 'https://www.bilibili.com/video/BV1dvQAYTEwa/', views: '1.1만 조회 · 644 저장', date: '2025-03' }
  },
  {
    id: 14,
    title: '부지 18칸 페어리 코티지 · 풀빌드',
    style: '숲', room: '집 전체', budget: '소과금', diff: 3,
    scale: '부지 18칸',
    imgPrompt: 'elf fairy tale cottage with mushroom decorations and vines in cute casual mobile game art style magical forest glow',
    tips: ['부지 18칸 완전 건축 가이드', '동화 테마 요소 가득', '버그 없이 안심하고 따라 짓기'],
    steps: ['전체 설계부터: 본체 코티지 + 버섯 밭 + 덩굴 통로', '버섯이냐 덩굴이냐, 하나만 메인으로 삼으세요 — 나머지는 포인트로만', '웜그린과 웜옐로 조명을 섞으세요 — 밤이 되면 "요정 마을"이 됩니다'],
    pit: '테마 소품은 과하면 안 됩니다 — 버섯과 덩굴을 사방에 깔면 촌스러워집니다. 주종 관계가 분명해야 고급스럽습니다.',
    source: { platform: 'Bilibili', author: '爱吃鸡腿achy', link: 'https://www.bilibili.com/video/BV15bfCBbEE3/', views: '1.3만 조회', date: 'unknown' }
  },
  {
    id: 15,
    title: '"즈샤" 여름 청량 하우스',
    style: '코티지코어', room: '집 전체', budget: '소과금', diff: 2,
    scale: '표준 부지',
    imgPrompt: 'summer fresh courtyard house with green plants and wooden fence in cute casual mobile game art style bright summer day',
    tips: ['"즈샤" 청량한 여름 디자인', '따라 지을 수 있는 완전 시공 과정', '커뮤니티 인기 강좌'],
    steps: ['청량 배색 기본: 흰 벽 + 라이트 우드 + 녹지, 세 가지 색만', '완전 시공 과정을 따라 가되 마당에는 여백을 남기세요', '여름 소품(파라솔, 정자)은 취향껏 추가하세요'],
    pit: '여름 테마에 차가운 톤을 잔뜩 쌓지 마세요 — 원목 브라운이 살짝 깔려야 청량하면서도 아늑합니다.',
    source: { platform: 'Bilibili', author: '萌优i', link: 'https://www.bilibili.com/video/BV1ryKA6hEHm/', views: '1.4만 조회', date: 'unknown' }
  },
  {
    id: 16,
    title: '그린 리틀 매너 (부지 18칸)',
    style: '코티지코어', room: '집 전체', budget: '소과금', diff: 2,
    scale: '부지 18칸',
    imgPrompt: 'green country manor estate with garden and hedges in cute casual mobile game art style sunny afternoon',
    tips: ['부지 18칸에 담아낸 매너급 계획', '부지 전체를 하나의 그린 테마로', '밭과 꽃밭 구획 완비'],
    steps: ['땅의 대부분을 실외에 투자하세요: 정원 + 밭 구획 계획', '그린을 기조로 — 초록도 레이어링하세요(관목이 가장 짙게, 잔디가 가장 연하게)', '실내는 심플하게 — 매너의 혼은 정원에 있습니다'],
    pit: '매너 스타일은 예산을 실외에 씁니다 — 전부 실내에 쏟지 마세요. 정원과 밭이 얼굴입니다.',
    source: { platform: 'Bilibili', author: '小软软丿', link: 'https://www.bilibili.com/video/BV1Q7t7eaE1c/', views: '1.4만 조회', date: 'unknown' }
  },
  {
    id: 17,
    title: '부지 18칸 수변 빌라 (해체 강좌)',
    style: '모던', room: '집 전체', budget: '소과금', diff: 3,
    scale: '부지 18칸',
    imgPrompt: 'modern waterfall villa with water flowing through terraces in cute casual mobile game art style elegant evening',
    tips: ['수변 빌라 구조 해부', '"분해하며 이해하는" 건축 학습법', '구조를 이해하고 싶은 상급자용'],
    steps: ['먼저 해체 편을 보세요: 어느 층이 하중을 받고 물이 어디로 들어오는지', '그다음 건축 편으로 재현하세요 — 단차 + 수로가 핵심입니다', '해체 사고방식을 익히면 남의 집 구조가 훤히 보입니다'],
    pit: '해체 강좌입니다 — 구조를 이해하고 시작하지 않으면 층 전환에서 막힙니다.',
    source: { platform: 'Bilibili', author: '平衡平衡白平衡', link: 'https://www.bilibili.com/video/BV1R41xYJE1U/', views: '2.6만 조회', date: 'unknown' }
  },
  {
    id: 18,
    title: '써니 코스트 모던 빌라',
    style: '블루', room: '집 전체', budget: '소과금', diff: 2,
    scale: '부지 18칸',
    imgPrompt: 'sunny coast seaside modern villa with deck chairs and umbrella in cute casual mobile game art style bright beach day',
    tips: ['부지 18칸 모던 빌라 구조', '써니 코스트 배색(화이트 + 씨블루 + 옐로)', '바닷가 휴양 소품으로 마무리'],
    steps: ['본체는 화이트 베이스의 모던 빌라로 세우세요', '창틀·문틀과 수영장은 씨블루로, 옐로는 포인트로만', '야외에 라운저 + 파라솔을 놓으세요 — 리조트 분위기가 즉시 완성됩니다'],
    pit: '코스트 스타일의 핵심은 야외입니다 — 벽에 예산을 날리지 마세요. 수영장 자리와 라운저가 이 집의 혼입니다.',
    source: { platform: 'Bilibili', author: '问水水耶', link: 'https://www.bilibili.com/video/BV1wFNueYED1/', views: '1.2만 조회', date: 'unknown' }
  },
  {
    id: 19,
    title: '윈터 오드 모던 빌라',
    style: '모던', room: '집 전체', budget: '소과금', diff: 3,
    scale: '표준 부지',
    imgPrompt: 'winter theme modern villa with snow decorations and warm window light in cute casual mobile game art style snowfall',
    tips: ['겨울 테마의 계절 감성', '초보자도 가능한 완결 가이드', '모던 빌라 기본기도 함께 배움'],
    steps: ['배색 고정: 화이트 + 딥블루 + 웜옐로(눈 + 밤하늘 + 조명)', '구조를 먼저 단단히 세우세요 — 겨울 장식은 마지막에', '초보자에게 추천: 이 집을 한 바퀴 돌면 건축 기본기까지 익힙니다'],
    pit: '눈 장식은 부지를 잡아먹습니다 — 본체부터 짓고 장식하세요, 아니면 부지가 모자랍니다.',
    source: { platform: 'Bilibili', author: '问水水耶', link: 'https://www.bilibili.com/video/BV1mFZZBDEfL/', views: '1.7만 조회', date: 'unknown' }
  },
  {
    id: 20,
    title: '무과금 버그프리 욕실',
    style: '모던', room: '욕실', budget: '무과금', diff: 1,
    scale: '단일 공간',
    imgPrompt: 'simple modern clean bathroom with zero cost furniture in cute casual mobile game art style bright tidy',
    tips: ['무료 재료만으로 완성', '버그 없는 배치', '같은 작가의 서재 + 침실 강좌도 있음'],
    steps: ['무료 화이트 재료로 베이스를 만드세요 — 밝은 바닥이 가장 깔끔해 보입니다', '욕조는 안쪽 끝 중앙에 배치하고 거울은 입구 마주 보게', '작가의 서재 + 침실 강좌와 세트로 맞추면 온전한 집이 완성됩니다'],
    pit: '욕실 바닥에 어두운 색은 피하세요 — 물때 텍스처가 더러워 보입니다. 밝은 색이 정답입니다.',
    source: { platform: 'Bilibili', author: '心动小齐', link: 'https://www.bilibili.com/video/BV1t4wJzWEnd/', views: 'unknown', date: '2026-03' }
  },
  {
    id: 21,
    title: '무과금 서재 + 침실 원 레이아웃',
    style: '모던', room: '침실', budget: '무과금', diff: 1,
    scale: '부지 1칸에 방 2개',
    imgPrompt: 'compact study and bedroom combination room with desk and bed in cute casual mobile game art style efficient layout',
    tips: ['하나의 배치로 방 두 개: 서재 + 침실', '무과금·버그프리', '소형 주택에 최적'],
    steps: ['부지 한 칸에 두 구획: 창가에 서재(채광), 안쪽에 침대(안정감)', '가벽 대신 가구 방향 + 러그로 구역을 나누세요', '벽에 붙인 천장높이 책장 — 수납 최대, 바닥 비용 제로'],
    pit: '소형 주택에 억지로 가벽을 넣지 마세요 — 가구 구획이 칸도 아끼고 더 넓어 보입니다.',
    source: { platform: 'Bilibili', author: '心动小齐', link: 'https://www.bilibili.com/video/BV1yGQpBPEZw/', views: '182 조회', date: '2026-04' }
  },
  {
    id: 22,
    title: '초간단 신중국풍 주택',
    style: '중국풍', room: '집 전체', budget: '소과금', diff: 1,
    scale: '소형 주택',
    imgPrompt: 'simple new chinese style small building with white walls and dark wood in cute casual mobile game art style clean daylight',
    tips: ['초간단, 입문자 추천', '신중국풍 배색(흰 벽 + 다크 우드)', '자재 목록과 치수는 게시물 댓글에'],
    steps: ['두 가지 색으로 기조를 잡으세요: 흰 벽 + 다크 우드 — 초보자도 한 번에 성공합니다', '시작하기 전에 댓글의 자재 목록과 치수를 먼저 확인하세요', '간단한 구조 — 첫 중국풍 건축으로 완벽합니다'],
    pit: '자재 목록과 치수는 댓글에 있습니다 — 구매 전에 읽으세요, 감으로 하면 안 됩니다.',
    source: { platform: 'TapTap', author: '姜梨.', link: 'https://www.taptap.cn/moment/563093677061177365', views: 'unknown', date: 'unknown' }
  },
  {
    id: 23,
    title: '쑤저우 스타일 정원 강좌',
    style: '중국풍', room: '야외', budget: '소과금', diff: 3,
    scale: '마당 부지 전부 해금',
    imgPrompt: 'suzhou classical chinese garden courtyard with moon gate and corridor in cute casual mobile game art style serene',
    tips: ['쑤저우 정원 요소(달문 / 회랑 / 가산)', '부지 전부 해금 후 시공, 확장 대응', '중국풍 마당의 바로미터 게시물'],
    steps: ['먼저 마당 부지를 전부 해금하세요 — 쑤저우 정원의 소형 버전은 없습니다', '달문을 정문으로 삼고 회랑으로 기능 구역을 연결하세요', '가산 + 수경으로 마무리 — 빈 공간이 채우는 것보다 더 쑤저우답습니다'],
    pit: '마당은 부지를 잔뜩 먹습니다 — 시작 전에 전부 해금하세요, 중간 확장은 고통스럽습니다.',
    source: { platform: 'TapTap', author: '阿离酱', link: 'https://www.taptap.cn/moment/571703292032192173', views: 'unknown', date: '2024-08' }
  },
  {
    id: 24,
    title: '레트로 난양 스타일 (가구 리스트 포함)',
    style: '레트로', room: '집 전체', budget: '소과금', diff: 2,
    scale: '집 전체',
    imgPrompt: 'retro nanyang style interior with rattan furniture and wooden shutters in cute casual mobile game art style vintage warm',
    tips: ['완결 레트로 난양 사례', '가구 리스트는 원문에 — 그대로 복사', '필수 3요소: 라탄 우드 + 셔터 + 녹지'],
    steps: ['게시물의 가구 목록대로 소재를 모으세요 — 라탄 가구와 셔터가 이 집의 혼입니다', '배색: 라탄 브라운 위주 + 식물 많이 + 레트로 레드 포인트', '셔터는 집 전체에 통일감 있게 — 난양 분위기가 즉시 완성됩니다'],
    pit: '난양 스타일은 디테일에 살아있습니다 — 라탄과 셔터가 빠지면 그냥 목조 주택입니다. 아끼지 마세요.',
    source: { platform: 'TapTap', author: '棉绵min', link: 'https://www.taptap.cn/moment/565512216636296770', views: 'unknown', date: 'unknown' }
  },
  {
    id: 25,
    title: '원목 신중국풍 거실',
    style: '중국풍', room: '거실', budget: '소과금', diff: 1,
    scale: '단일 공간',
    imgPrompt: 'wood new chinese style living room with tea table and bookshelf in cute casual mobile game art style warm wood tones',
    tips: ['원목 × 신중국풍 공식', '거실 배치 강좌', '클래식 다기 + 진열장 구성'],
    steps: ['원목색을 베이스로, 가구는 한 단계 짙게 레이어링하세요', '다기는 중앙에, 진열장은 벽에 — 중국풍 거실의 기본 공식입니다', '조명은 웜옐로만 — 백색광은 우드 감성을 망칩니다'],
    pit: '신중국풍 거실에 유럽풍 가구를 섞지 마세요 — 한 공간에 두 스타일은 분위기를 깹니다.',
    source: { platform: 'TapTap', author: '磕不磕瓜子', link: 'https://www.taptap.cn/moment/577241060451814324', views: 'unknown', date: 'unknown' }
  },
  {
    id: 26,
    title: '빈티지 서재',
    style: '레트로', room: '서재', budget: '소과금', diff: 2,
    scale: '단일 공간',
    imgPrompt: 'vintage study room with dark wood bookshelves and green lamp in cute casual mobile game art style classic scholar feel',
    tips: ['빈티지 서재 배색(다크 우드 + 잉크그린 / 와인레드)', '클래식 책장 + 러그 배치', '따라 하기 강좌 게시물'],
    steps: ['벽을 따라 천장높이 다크우드 책장을 세우고 독서 코너에 러그를 깔세요', '포인트는 하나만 — 잉크그린이나 와인레드(책상 램프 / 커튼)', '빈티지 책상으로 마무리하세요 — 감성이 최고조에 이릅니다'],
    pit: '빈티지에는 웜옐로 조명이 필수입니다 — 백색 램프 하나로 분위기가 바닥을 췄습니다.',
    source: { platform: 'TapTap', author: '暴躁小熊尼尼', link: 'https://www.taptap.cn/moment/577187784767310358', views: 'unknown', date: 'unknown' }
  },
  {
    id: 27,
    title: '8×10 새해 코티지 강좌',
    style: '중국풍', room: '집 전체', budget: '소과금', diff: 1,
    scale: '8×10 스타터',
    imgPrompt: '8x10 chinese new year cottage with red lanterns in cute casual mobile game art style festive winter',
    tips: ['8×10 — 커뮤니티 검증 가성비 스타터 사이즈', '구조 → 칠하기 → 지붕 순서로 분할 공개', '새해 테마 입문 건축'],
    steps: ['8×10 기초로 시작해 강좌대로 본체 구조를 세우세요', '칠하기·지붕 화가 나올 때까지 원목색을 유지하세요', '입주하고 모아서 서서히 업그레이드하세요 — 한 번에 끝내려 하지 마세요'],
    pit: '8×10은 검증된 가성비 스타터입니다 — 초반에 크게 짓지 마세요, 바닥재만으로도 지갑이 깨집니다.',
    source: { platform: 'TapTap', author: '洁洁羔', link: 'https://www.taptap.cn/hashtag/%E5%BF%83%E5%8A%A8%E5%B0%8F%E9%95%87%E6%95%99%E7%A8%8B?page=9', views: 'unknown', date: '2025-01' }
  },
  {
    id: 28,
    title: '욕조 업그레이드: 럭셔리 배스 풀',
    style: '모던', room: '욕실', budget: '무과금', diff: 2,
    scale: '부분 리모델링',
    imgPrompt: 'modern luxury bathtub upgraded bathing pool in cute casual mobile game art style spa feeling soft light',
    tips: ['미니멀 욕조를 럭셔리 배스 풀로', '초보자도 가능', '버그 활용 있음(민감하면 패스)'],
    steps: ['욕조는 그대로 두고 주변을 단과 돌 텍스처로 감싸세요', '강좌의 버그 기법대로 욕조를 움푹 가라앉혀 매립식 연출을 내세요', '무드 조명을 더하세요 — 럭셔리의 정체는 조명과 그림자입니다'],
    pit: '버그가 들어가는 시공입니다 — 시작 전에 세이브 스크린샷을 남겨 복구에 대비하세요. 버그가 부담되면 패스하세요.',
    source: { platform: 'TapTap', author: '问水', link: 'https://www.taptap.cn/hashtag/%E5%BF%83%E5%8A%A8%E5%B0%8F%E9%95%87%E5%86%85%E9%A5%B0%E6%95%99%E7%A8%8B?type=newest', views: 'unknown', date: '2026-07' }
  },
  {
    id: 29,
    title: '다크우드 웜 홈 · 몰입형 인테리어',
    style: '모던', room: '집 전체', budget: '무과금', diff: 2,
    scale: '집 전체 인테리어',
    imgPrompt: 'dark wood warm interior living room with soft lamp light in cute casual mobile game art style cozy evening healing',
    tips: ['몰입형 인테리어 강좌, 초보 건축 가능', '모든 재료를 저가 대체재로 교체', '비 오는 날 어울리는 대표 아늑 하우스'],
    steps: ['강좌대로 저가 대체재를 사용하세요 — 절약 효과가 확실합니다', '대체재는 색이 살짝 다릅니다 — 방 전체에 쓰기 전에 한 칸 테스트하세요', '웜 라이트는 넉넉히 — 다크우드 홈의 "웜"은 전부 조명에서 나옵니다'],
    pit: '대체재는 돈은 아끼지만 색이 달라집니다 — 좁은 면적에서 만족한 뒤에 집 전체로 확장하세요.',
    source: { platform: 'TapTap', author: '问水', link: 'https://www.taptap.cn/user/709351257', views: 'unknown', date: '2026-07' }
  },
  {
    id: 30,
    title: '크림 스타일 힐링 다다미 침실',
    style: '크림프렌치', room: '침실', budget: '소과금', diff: 1,
    scale: '단일 공간',
    imgPrompt: 'cream style tatami bedroom with soft beige tones in cute casual mobile game art style sunset glow through window',
    tips: ['크림 배색(밀크 화이트 + 라이트 우드 + 라탄)', '다다미 단 구조', '노을 조명과 함께면 인생샷 완성'],
    steps: ['다다미 단부터 깔되 판을 너무 높게 쌓지 마세요(천장고를 먹습니다)', '3종 세트: 밀크 화이트 벽 + 라이트 우드 가구 + 라탄 포인트', '해 질 녘에 스크린샷을 찍으세요 — 이 집의 포토존은 창가입니다'],
    pit: '다다미 단은 천장고를 깎아먹습니다 — 낮은 방이라면 판 한 겹을 빼세요, 안 그러면 답답하게 느껴집니다.',
    source: { platform: 'TapTap', author: '社区作者', link: 'https://www.taptap.cn/hashtag/%E5%BF%83%E5%8A%A8%E5%B0%8F%E9%95%87%E5%86%85%E9%A5%B0%E6%95%99%E7%A8%8B?page=2', views: 'unknown', date: '2025-07' }
  }
];
