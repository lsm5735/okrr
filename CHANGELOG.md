# OKRR Art Agency — 개발 변경 내용 보고서

**사이트 주소**: https://www.okrr.art  
**저장소**: https://github.com/lsm5735/okrr  
**작성일**: 2026년 6월 27일

---

## 1. 기능 제거 — 게시판 · 로그인 · Supabase 연동 삭제

### 삭제된 파일
| 파일 | 내용 |
|------|------|
| `src/pages/board/BoardList.jsx` | 게시판 목록 페이지 |
| `src/pages/board/BoardDetail.jsx` | 게시판 상세 페이지 |
| `src/pages/board/BoardWrite.jsx` | 게시글 작성 페이지 |
| `src/pages/board/BoardEdit.jsx` | 게시글 수정 페이지 |
| `src/pages/Login.jsx` | 로그인 페이지 |
| `src/pages/KakaoCallback.jsx` | 카카오 OAuth 콜백 |
| `src/context/AuthContext.jsx` | 인증 전역 컨텍스트 |
| `src/lib/supabase.js` | Supabase 클라이언트 |

### 수정된 파일
- **`App.jsx`** — 게시판·로그인 라우트 및 `PrivateRoute` 제거
- **`main.jsx`** — `AuthProvider` 래퍼 제거
- **`Header.jsx`** — Login/Logout 버튼 제거, `useAuth` 제거
- **`src/data/site.js`** — 네비게이션에서 Board 메뉴 제거
- **`package.json`** — `@supabase/supabase-js` 의존성 제거

---

## 2. 디자인 · 테마 변경

### 기본 색상 고정 (Nimbus Cloud)
- 색상 팔레트 선택 UI(ThemePicker) 제거
- 라이트/다크 모드 토글(ThemeToggle) 제거
- 배경색을 **Nimbus Cloud (`#C8CBCF`)** 로 고정
- `index.html` 초기화 스크립트 간소화 (CSS 변수 하드코딩)
- `ThemeContext.jsx` 단순화 — 팔레트 스위칭 로직 제거

### 로고 교체
- 헤더 텍스트 로고(`Okrr`) → 이미지 로고(`okrr_logo.png`)
- 데스크탑 헤더 및 모바일 사이드 패널 모두 적용
- 이미지 경로: `public/okrr_logo.png`

---

## 3. 커스텀 도메인 연결

| 항목 | 내용 |
|------|------|
| 도메인 | `www.okrr.art` (가비아 구매) |
| DNS — www | CNAME → `lsm5735.github.io.` |
| DNS — apex | A 레코드 4개 → GitHub Pages IP (`185.199.108~111.153`) |
| HTTPS | GitHub Pages Enforce HTTPS 활성화 |
| CNAME 파일 | `public/CNAME` 추가 (`www.okrr.art`) |
| Vite base 경로 | `/04/` → `/okrr/` → `/` (커스텀 도메인 적용 후) |

---

## 4. 콘텐츠 수정

### 연락처
- 이메일: `miart9484@gmail.com` → `lsm5735@gmail.com`

### 영상(Videos) 데이터 업데이트
| 영상 제목 | 변경 내용 |
|-----------|-----------|
| British Soul Art — 한국 전시 하이라이트 | videoId 교체, 연도 `2024`로 변경 |
| OPAKE PANIC — 롯데월드몰 넥스트 뮤지엄 | videoId 교체 |
| 1000s of Hours Contemporary Arts | videoId 교체 |
| OPAKE｜PANIC — PBG 더현대 | videoId 교체 |
| 하루컴퍼니 × 이주형 브랜드 런칭 | videoId 교체 |
| Okrr Art Agency 소개 영상 | **삭제** |
| 아티스트 인터뷰 — 협력 작가 모음 | **삭제** |
| 김포복지재단×사랑의열매 제13회 62일간의 나눔릴레이 | **신규 추가** (videoId: `WU24a0HyZCg`, 2025) |

### Works 데이터 업데이트
- `행사 기획(event)` 카테고리 신설
- **신규 추가**: 제13회 나눔릴레이 당신의 Gate, 김포의 Gates_세상에 온기를 여는 김포의 문
  - 부제: 사랑의열매 × 김포복지재단 62일간의 나눔릴레이
  - 장소: Bake 29s
  - 기간: 2025.12.01 — 2026.01.31
  - 설명: 김포 시민, 단체, 기업이 모금과 물품 기부에 참여하여 지역 사회의 어려운 이웃과 사회복지시설을 지원하는 행사로 목표 금액인 10억에서 16억 7,000만 원을 추가 달성. 나눔캠페인 행사 기획 및 운영 전반.

---

## 5. 기능 개선

### 메인 페이지 — Film & Records 영상 인라인 재생
- 기존: 영상 클릭 시 `/videos` 페이지로 이동
- 변경: 영상 클릭 시 화면 중앙에 유튜브 플레이어 모달 팝업 + 자동재생
- 배경 클릭 또는 ✕ 버튼으로 닫기

### 메인 페이지 노출 영상 3개 지정
1. 김포복지재단×사랑의열매 나눔릴레이
2. British Soul Art — 한국 전시 하이라이트
3. 하루컴퍼니 × 이주형 브랜드 런칭

### 메인 페이지 Featured Works 3개 지정
1. 제13회 나눔릴레이 (대형 카드)
2. 2024 화랑미술제 in 수원
3. OPAKE｜PANIC — PBG

### 날짜 최신순 정렬
- Videos 전체 영상 페이지 — 최신순 정렬 적용
- Works 페이지 — 최신순 정렬 적용

---

## 6. 배포 환경

| 항목 | 내용 |
|------|------|
| 빌드 도구 | Vite 5.4 |
| 배포 방법 | `npm run deploy` (gh-pages) |
| 배포 브랜치 | `gh-pages` |
| 소스 브랜치 | `main` |
| 총 커밋 수 | 13개 (이번 작업 기준) |
