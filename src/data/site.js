// ============================================================
// Okrr Art Agency — 전역 사이트 데이터
// ============================================================

export const company = {
  name: 'Okrr',
  fullName: 'Okrr Art Agency',
  slogan: '예술의 경계를 넓히다, 창조의 가치를 더하다',
  sloganEn: 'Expanding the boundaries of art, adding the value of creation',
  description: [
    '현대 미술의 발전과 아티스트 성장을 지원하기 위해 설립된 전문 미술 에이전시입니다.',
    '전시 기획, 아티스트 에이전시, 아트 컨설팅, IP 개발, 작품 유통 및 렌탈 등 다양한 서비스를 통해 미술 시장의 다양한 요구에 부응하고 있습니다.',
    '아티스트와 고객 간의 원활한 소통을 통해 예술의 가치를 극대화하고, 혁신적이고 창의적인 미술 프로젝트를 성공적으로 이끌어갑니다.',
  ],
  contact: {
    tel: '+82 10 7698 0098',
    email: 'miart9484@gmail.com',
  },
  copyright: '© 2024 Okrr Art Agency. All rights reserved.',
  presenter: 'Mia Lee',
}

export const nav = [
  {
    label: 'About',
    to: '/about',
    children: [
      { label: '회사 소개', to: '/about/intro' },
      { label: '비전과 미션', to: '/about/vision' },
    ],
  },
  {
    label: 'Works',
    to: '/works',
    children: [
      { label: '전시 기획', to: '/works/exhibition' },
      { label: '아티스트 에이전시', to: '/works/artist' },
      { label: '아트 컨설팅', to: '/works/consulting' },
      { label: '미술 장식품', to: '/works/decoration' },
    ],
  },
  {
    label: 'Videos',
    to: '/videos',
    children: [
      { label: '전체 영상', to: '/videos/all' },
      { label: '전시 영상', to: '/videos/exhibition' },
      { label: '행사 영상', to: '/videos/event' },
    ],
  },
  {
    label: 'Artists',
    to: '/artists',
    children: [],
  },
  {
    label: 'Contact',
    to: '/contact',
    children: [],
  },
  {
    label: 'Board',
    to: '/board',
    children: [],
  },
]

export const businessAreas = [
  {
    key: 'exhibition',
    number: '01',
    title: '전시 기획 및 조직',
    titleEn: 'Exhibition Planning',
    desc: '아티스트의 작품을 효과적으로 전시할 수 있는 공간을 찾아 기획 및 운영합니다. 전시의 컨셉부터 실행까지, 장소 선정, 일정 조율, 마케팅 전략 수립 등 전시 전반에 걸쳐 전문적인 서비스를 제공합니다.',
    to: '/works/exhibition',
  },
  {
    key: 'artist',
    number: '02',
    title: '아티스트 에이전시',
    titleEn: 'Artist Agency',
    desc: '신진 아티스트부터 유명 작가까지, 다양한 아티스트의 대리인 역할을 수행합니다. 작품 판매, 전시 기회 제공, 미디어 노출 등 아티스트의 경력 개발을 위한 전략적 파트너로서 역할을 수행합니다.',
    to: '/works/artist',
  },
  {
    key: 'consulting',
    number: '03',
    title: '아트 컨설팅',
    titleEn: 'Art Consulting',
    desc: '개인 및 기업 고객을 위한 맞춤형 아트 컨설팅 서비스를 제공합니다. 고객의 취향과 필요에 맞는 작품 추천, 컬렉션 기획, 브랜드 협업 등 다양한 아트 컨설팅 제안을 통해 고객의 미술 경험을 향상시킵니다.',
    to: '/works/consulting',
  },
  {
    key: 'decoration',
    number: '04',
    title: '미술 장식품',
    titleEn: 'Art Decoration',
    desc: '다양한 미술 장식품을 큐레이션 및 기획하여 고객의 공간에 적합한 예술적 요소를 제공합니다. 독창적이고 세련된 미술 장식품으로 공간의 품격을 높입니다.',
    to: '/works/decoration',
  },
  {
    key: 'ip',
    number: '05',
    title: 'IP 개발',
    titleEn: 'IP Development',
    desc: '미술 작품의 지적 재산권(IP) 관리를 통해 아티스트의 창작물을 보호하고 상업화합니다. IP 관련 전략 수립과 계약 체결을 지원하여 아티스트의 권익을 극대화합니다.',
    to: '/works/ip',
  },
  {
    key: 'rental',
    number: '06',
    title: '작품 유통 및 렌탈',
    titleEn: 'Distribution & Rental',
    desc: '다양한 미술 작품의 유통 및 렌탈 서비스를 제공합니다. 개인 및 기업 고객을 위한 작품 구매, 임대 서비스로 미술의 접근성을 높이고, 새로운 공간에 생명을 불어넣습니다.',
    to: '/works/rental',
  },
]

