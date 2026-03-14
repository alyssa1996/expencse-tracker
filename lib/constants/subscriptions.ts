// Keywords in 내역 (details) that indicate a subscription service
// Used to auto-reclassify '기타' entries as '구독서비스'
export const SUBSCRIPTION_KEYWORDS = [
  // Streaming - Video
  '넷플릭스', 'netflix',
  '왓챠', 'watcha',
  '웨이브', 'wavve',
  '티빙', 'tving',
  '디즈니', 'disney+', 'disney plus',
  '시즌', 'seezn',
  '쿠팡플레이', 'coupang play',
  '애플tv', 'apple tv',

  // Streaming - Music
  '멜론', 'melon',
  '스포티파이', 'spotify',
  '유튜브프리미엄', '유튜브 프리미엄', 'youtube premium',
  '플로', 'flo',
  '벅스', 'bugs',
  '지니', 'genie',
  '애플뮤직', 'apple music',

  // Cloud / Storage
  '아이클라우드', 'icloud',
  '네이버박스', 'naver box', 'mybox',
  '구글원', 'google one',
  '원드라이브', 'onedrive',
  '드롭박스', 'dropbox',

  // AI / Productivity
  '챗지피티', 'chatgpt', 'chat gpt',
  'claude', '클로드',
  'notion', '노션',
  'obsidian',
  'figma',

  // Shopping / Other
  '쿠팡로켓', '쿠팡 로켓', 'rocket wow', '로켓와우',
  '네이버플러스', '네이버 플러스', 'naver plus',

  // Generic keywords
  '구독료', '구독', '월정액', '정기결제',
]
