# 🎨 Daker: 디자인 및 UI/UX 구현 상세 태스크

디자인 프롬프팅 및 구현 시 참고할 수 있는 상세 UI/UX 가이드라인입니다. 프리미엄 다크 모드(Premium Dark Mode)와 고급스러운 인터랙션을 지향합니다.

---

## 1. 공통 디자인 시스템 (Global Design System)

이 시스템은 앱 전체의 일관성을 유지하며, AI에게 스타일 가이드를 줄 때 핵심 프롬프트로 활용됩니다.

### 🎨 디자인 테마 및 컬러 (Color Palette)

- [ ] **Background**: Soft Peach (#FFF5F2) - 토마토톤을 우아하게 한 겹 뺀, 매우 연하고 따뜻한 살구색 베이스
- [ ] **Main Text**: Dark Charcoal (#2D3436) - 높은 가독성과 모던함을 제공하는 짙은 챠콜
- [ ] **Accent**: Tomato Red (#FF6347) - 로고, 핵심 버튼, 강조 타이틀 등 활기를 불어넣는 토마토 컬러
- [ ] **Support**: Coral (#FAB1A0) - 태그, 배지, 비활성 버튼 등 보조적 요소의 세련된 조화
- [ ] **Typography**:
  - Title: 에너제틱한 **Outfit** 또는 **Bebas Neue** (굵고 인상적인 대문자 타이틀 활용)
  - Body: 친근하고 가독성이 뛰어난 **Inter** 또는 **Roboto**

### 🧩 글로벌 UI 컴포넌트

- [ ] **Navigation Bar**:
  - 세련된 화이트 혹은 Soft Peach 배경의 상단 고정 바
  - 얇은 그레이 혹은 연한 토마토 틴트가 섞인 보더 (Border-bottom: 1px solid rgba(255,99,71,0.1))
- [ ] **Buttons & Interactive**:
  - **Premium Button**: Tomato (#FF6347) 베이스에 화이트 텍스트, 호버 시 밝기가 살아나는 Warm Glow 효과
  - **Support/In-active Button**: Coral (#FAB1A0) 컬러의 텍스트와 얇은 보더
- [ ] **Badges**:
  - 상태별 컬러 조합: 진행중(Tomato-red), 종료(Charcoal-gray), 예정(Coral-soft)

---

## 2. 페이지별 상세 디자인 (Page-Specific UI)

프롬프팅 시 각 페이지의 시각적 완성도를 높이기 위한 포인트입니다.

### 🏠 메인 페이지 (/)

- [ ] **Hero Section**: 중앙 정렬된 "Daker" 텍스트에 화려한 그라데이션 유성(Meteor) 또는 웨이브 애니메이션 적용
- [ ] **Main Action Cards**: 3대 진입 카드에 큼직한 아이콘과 각 카드별 고유의 액센트 컬러 배경 적용

### 📋 해커톤 목록 (/hackathons)

- [ ] **Hackathon Cards**:
  - 썸네일/아이콘 영역과 텍스트 정보의 명확한 구분
  - 하단에 참가자 수 지표(Indicator) 및 태그 칩의 세련된 정렬
- [ ] **Filter Bar**: 스크롤 시 상단에 고정되거나 간결한 아이콘 버튼 기반의 필터 선택창

### 상세 페이지 (/hackathons/:slug)

- [ ] **Vertical/Horizontal Tab**: 부드러운 하이라이트 슬라이딩 애니메이션이 포함된 탭 전환 인터페이스
- [ ] **Schedule Timeline**: 현대적인 노드(Node) 형태가 강조된 타임라인 레이아웃
- [ ] **Submit Form**: 깔끔한 보더라인의 입력 필드와 직관적인 파일 업로드/드롭존 컴포넌트 디자인

### ⛺ 팀원 모집 (/camp)

- [ ] **Team List Grid**: 가로형 카드와 세로형 카드를 적절히 섞거나 포지션 배지가 돋보이는 레이아웃
- [ ] **Position Tags**: Frontend, Backend 등의 포지션을 아이콘화하거나 뚜렷한 식별이 가능한 컬러칩 처리

### 🏆 리더보드 & 글로벌 랭킹 (/rankings)

- [ ] **Leaderboard Table**:
  - 세련된 격자 없는 행(Row) 디자인
  - 1~3위 팀 특별 배지(Crown icon), 승격/강등 시각적 피드백 시뮬레이션
- [ ] **Point Visualizer**: 단순히 텍스트 포인트뿐만 아니라 미세한 프로그래스 바 또는 게이지 바 UI 활용

---

## 3. 마이크로-인터랙션 및 피드백 (Micro-interactions)

- [ ] **Skeleton UI**: 데이터 로딩 중 카드 형태의 부드러운 펄스(Pulse) 애니메이션
- [ ] **Toast/Notifications**: 우측 상단 또는 하단 중앙에서 매끄럽게 등장하는 토스트 알림 디자인
- [ ] **Scroll Animations**: 페이지 하단으로 갈 때 섹션들이 서서히 나타나는 페이드 인/업 애니메이션
