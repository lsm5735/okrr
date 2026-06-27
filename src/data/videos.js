// ============================================================
// Okrr Art Agency — YouTube 동영상 데이터
// videoId: 각 제목으로 YouTube 검색 시 최상단 결과 기준
// ============================================================

export const videoCategories = [
  { key: 'all', label: '전체 영상', labelEn: 'All Videos' },
  { key: 'exhibition', label: '전시 영상', labelEn: 'Exhibition' },
  { key: 'event', label: '행사 영상', labelEn: 'Events' },
]

export const videos = [
  // 전시 영상
  {
    id: 1,
    category: 'exhibition',
    title: 'British Soul Art — 한국 전시 하이라이트',
    description: '한영수교 140주년 기념 브리티쉬 솔아트 전시 하이라이트 영상',
    videoId: 'yunKW-nrtTQ',
    thumbnail: '',
    date: '2024',
  },
  {
    id: 2,
    category: 'exhibition',
    title: 'OPAKE PANIC — 롯데월드몰 넥스트 뮤지엄',
    description: 'OPAKE 국내 첫 개인전 전시 영상',
    videoId: 'kMPdcM6Dt88',
    thumbnail: '',
    date: '2024.02',
  },
  {
    id: 3,
    category: 'exhibition',
    title: '1000s of Hours Contemporary Arts',
    description: '두남재 갤러리 현대미술 그룹전',
    videoId: 'BiqIV5WfmtM',
    thumbnail: '',
    date: '2024.01',
  },
  {
    id: 4,
    category: 'exhibition',
    title: '조형아트서울 2024',
    description: '코엑스 조형아트서울 아트페어 현장 영상',
    videoId: '6MoKKRUfdWQ',  // 조형아트서울 2024 공식 영상
    thumbnail: '',
    date: '2024.05',
  },
  {
    id: 5,
    category: 'exhibition',
    title: '2024 화랑미술제 in 수원',
    description: '수원컨벤션센터 화랑미술제 A60 부스 영상',
    videoId: 'zaR-dpBo8d8',  // 미술계가 주목하는 최장수 아트페어 (화랑미술제 2024)
    thumbnail: '',
    date: '2024.06',
  },
  {
    id: 6,
    category: 'exhibition',
    title: 'OPAKE｜PANIC — PBG 더현대',
    description: 'PBG 더현대 및 센텀시티 순회전 영상',
    videoId: 'uADt1i3tK_c',
    thumbnail: '',
    date: '2024.03',
  },
  // 행사 영상
  {
    id: 7,
    category: 'event',
    title: '하루컴퍼니 × 이주형 브랜드 런칭',
    description: '서예가 이주형과 하루컴퍼니 협업 런칭 행사',
    videoId: '9gVuBK6xjeA',
    thumbnail: '',
    date: '2023',
  },
  {
    id: 8,
    category: 'event',
    title: '서울 갤러리아 팝업전시 오프닝',
    description: '갤러리아 백화점 팝업전시 오프닝 행사',
    videoId: 'XrU76C7FcZo',  // 갤러리아 백화점 명품관 팝업 스토어 RECAP
    thumbnail: '',
    date: '2023',
  },
  {
    id: 9,
    category: 'event',
    title: '송도아트시티 공공미술 제막식',
    description: '자라나는 조각 제막식 현장',
    videoId: 'vRUADwrEiY0',  // 공공미술 프로젝트 작품 설치
    thumbnail: '',
    date: '2022',
  },
  {
    id: 10,
    category: 'event',
    title: '쏠비치 삼척 조형물 설치 현장',
    description: '날개 Wing 설치 과정 및 제막 영상',
    videoId: 'HEiK2MLbHtQ',  // 삼척 쏠비치 리조트 가이드
    thumbnail: '',
    date: '2021',
  },
  {
    id: 11,
    category: 'event',
    title: '김포복지재단×사랑의열매 제13회 62일간의 나눔릴레이',
    description: '당신의 Gate, 김포의 Gates_세상에 온기를 여는 김포의 문',
    videoId: 'WU24a0HyZCg',
    thumbnail: '',
    date: '2025',
  },
]

export const VIDEOS_PER_PAGE = 6
