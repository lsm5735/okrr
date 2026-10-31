// ============================================================
// Okrr Art Agency — 프로젝트 데이터
// upcoming: 홈 화면 Upcoming Project 영역에 노출되는 프로젝트
// ============================================================

export const projects = [
  {
    id: 1,
    upcoming: true,
    title: 'Coming Soon',
    subtitle: '새로운 전시를 준비하고 있습니다',
    period: '',
    venue: '',
    description: '곧 전시 소식을 전해드리겠습니다.',
    image: '',
  },
]

export const upcomingProject = projects.find((p) => p.upcoming)
