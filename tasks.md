# 📋 Daker: 긴급 인수인계 해커톤 플랫폼 개발 태스크 현황

`draft_original.md`를 기반으로 정리된 단계별 개발 태스크 목록입니다.

---

## 🏗️ Phase 1: 기반 및 핵심 기능 구현 (Day 1 ~ 4)

### 1. 프로젝트 기초 설정 (Day 1)

- [x] Next.js (App Router) 프로젝트 초기화
- [x] Vanilla CSS 디자인 시스템 구축 (Color Palette, Typography, UI Tokens) (Tailwind v4 기반 적용)
- [x] 글로벌 레이아웃: 상단 네비게이션 바 구현 (`/`, `/hackathons`, `/camp`, `/rankings` 항목 고정)
- [x] LocalStorage 데이터 매니저 유틸리티 작성 (`hackathons`, `teams`, `submissions`, `leaderboards` 키 관리)
- [x] 앱 최초 실행 시 `예시자료/*.json`을 localStorage에 시딩하는 로직 구현
- [x] 공통 UI 상태 컴포넌트 3종 구현: 로딩 스피너 / 데이터 없음(Empty State) / 에러 메시지

### 2. 메인 페이지 (/) (Day 1)

- [x] 서비스 소개 섹션 구현
- [x] 3대 핵심 진입 카드 UI 및 라우팅 구현
  - [x] "해커톤 보기" → `/hackathons`
  - [x] "팀 찾기" → `/camp`
  - [x] "랭킹 보기" → `/rankings`
- [ ] [예외] localStorage 초기화 오류 시 에러 메시지 + 새로고침 안내 표시

### 3. 해커톤 목록 페이지 (/hackathons) (Day 2)

- [x] 해커톤 카드 UI 컴포넌트 개발 (제목, 상태 배지, 태그, 시작일, 종료일, 참가자 수 포함)
- [x] LocalStorage `hackathons` 읽어 카드 목록 렌더링 (JSON 직접 참조 방식으로 우선 적용)
- [x] 카드 클릭 시 `/hackathons/:slug` 이동 연결
- [ ] [예외] 데이터 로딩 지연 시 로딩 스피너 표시

### 4. 해커톤 상세 페이지 (/hackathons/:slug) (Day 2)

- [x] 탭 시스템 (7개 섹션) UI 구조 설계 및 탭 전환 구현
- [x] [예외] 해당 slug 해커톤 미존재 시 안내 메시지 + "목록으로 돌아가기" 버튼 표시
- [x] **[탭 1] Overview/Info**: 대회 한줄 요약, 팀 정책(솔로 허용 여부·최대 인원), 공지사항, 규정·FAQ 링크 표시
- [x] **[탭 2] Eval**: 평가 지표명, 평가 설명, 점수 가중치(참가자 30% / 심사위원 70%) 표시
- [x] **[탭 3] Schedule**: 마일스톤 타임라인 목록 표시 (이름·날짜·시간, 시간대 표시)
- [x] **[탭 4] Prize**: 순위별 상금 목록 표시 (1st·2nd·3rd 등)
- [x] **[탭 5] Teams**: 해당 해커톤 팀 카드 목록 (팀명·소개·모집 포지션·연락처) 렌더링
- [x] **[탭 6] Submit**: 제출 탭 (→ 아래 #6 참고)
- [x] **[탭 7] Leaderboard**: 리더보드 탭 (→ 아래 #6 참고)

### 5. 팀원 모집 (/camp) 및 연동 (Day 3)

- [x] `/camp` 전체 팀 목록 UI 구현 (팀명·모집 상태 배지·소개·포지션 태그·연락하기 버튼)
- [x] `/camp?hackathon=slug` 쿼리 파라미터로 특정 해커톤 팀만 필터링 (필터 UI 연동)
- [x] 해커톤 상세 **Teams** 탭: "이 해커톤 팀 구성" 버튼 → `/camp?hackathon=slug` 이동 구현
- [x] [예외] 등록된 팀 없을 시 "아직 팀이 없습니다. 팀을 만들어보세요!" + 생성 버튼 표시
- [x] 팀 모집글 생성 폼 (Modal 또는 Page) 개발 및 LocalStorage `teams` 저장 로직
  - [x] 팀명(`name`) — 필수
  - [x] 소개(`intro`) — 필수
  - [x] 모집 중 여부(`isOpen`) — 필수
  - [x] 모집 포지션(`lookingFor[]`) — Frontend/Backend/Designer 등 복수 선택, 선택
  - [x] 연락 링크(`contact.url`) — 오픈카톡 또는 구글폼 링크, 선택
- [x] 팀 카드 생성 즉시 목록에 반영 (모집 중 배지 포함)

### 6. 제출 및 리더보드 (Day 4)

- [ ] **Submit 탭**: 제출 가이드 텍스트 표시
- [ ] 단계별 제출 폼 구현 및 유효성 검사
  - [ ] 메모(`notes`) — 텍스트, 선택
  - [ ] 기획서 (1차) — text 또는 URL
  - [ ] 최종 웹링크 (2차) — URL
  - [ ] 솔루션 PDF (3차) — PDF URL
  - [ ] 파일 (zip·pdf·csv 등, 해커톤 설정에 따라 허용 형식 다름)
- [ ] [예외] 필수 항목 미입력 시 인라인 에러 메시지 노출 및 "제출" 버튼 비활성화
- [ ] "제출" 클릭 시 localStorage `submissions` 저장 및 제출 완료 알림
- [ ] **Leaderboard 탭**: `leaderboards[slug]` + 제출 데이터 join하여 순위 테이블 렌더링 (rank·팀명·score·제출일)
- [ ] [예외] 미제출 팀: "미제출" 배지 표시 및 순위 제외
- [ ] 제출 완료 시 리더보드 상태 자동 갱신 ("미제출" → "제출 완료")
- [x] **Global Rankings (/rankings)**: 전체 `leaderboards`에서 팀별 points 합산, rank·닉네임(팀명)·points 테이블 표시

---

## ✨ Phase 2: 고도화 및 UX 개선 (Day 5 ~ 6)

### 7. 필터 및 검색 기능 고도화 (Day 5)

- [x] 해커톤 목록: 진행중/종료/예정 상태 필터 구현
- [x] 해커톤 목록: 기술 태그 기반 필터링 구현
- [x] 글로벌 랭킹: 최근 7일/30일/전체 기간 필터 구현

### 8. 팀 인터랙션 기능 강화 (Day 5 ~ 6)

- [ ] 팀 탭: 초대/수락/거절 버튼 기능 및 상태 변화 구현
- [ ] 팀 구성 시 유의사항 팝업(탭) 추가
- [ ] 팀 모집글 수정 및 마감(`isOpen` 전환) 기능 추가
- [ ] 연락처(오픈카톡/구글폼) 링크 연동 강화

### 9. UX/UI 디테일 향상 (Day 6)

- [ ] Skeleton UI 또는 로딩 스피너 적용 (데이터 로드 시)
- [ ] 데이터 없음(Empty State) 안내 UI 전체 점검 및 폴리싱
- [ ] 토스트 알림(Toast) 및 모달 인터랙션 폴리싱
- [ ] 반응형 레이아웃 최적화 (Mobile/Tablet/Desktop)
- [ ] (옵션) 팀/유저 채팅·쪽지 연결 기능

---

## 🚀 Phase 3: 최종 점검 및 배포 (Day 7)

### 10. 테스트 및 배포

- [ ] 주요 사용자 흐름 통합 테스트
  - [ ] 메인 진입 → 해커톤 목록 → 상세 → 팀 구성(/camp) → 제출 → 리더보드 → 글로벌 랭킹
- [ ] 예외 처리 시나리오 점검 (slug 미존재, 팀 없음, 필수 미입력, localStorage 오류 등)
- [ ] 데이터 보안 원칙 준수 확인
  - [ ] 내부 유저 정보 공개 금지
  - [ ] 다른 팀 내부 정보 공개 금지
  - [ ] 유저가 비공개한 정보 노출 금지
  - [ ] 심사자: 별도 키 없이 전체 기능 확인 가능하도록 유지
- [ ] Vercel 배포 및 최종 외부 접속 확인
- [ ] README 작성 및 최종 코드 정리

---

## 🛠️ 기술 스택 메모

- **Framework**: Next.js 14+ (App Router)
- **State/Storage**: React Hooks + LocalStorage (`hackathons` / `teams` / `submissions` / `leaderboards`)
- **Styling**: Vanilla CSS
- **Deployment**: Vercel
- **초기 데이터**: `예시자료/*.json` → 앱 최초 실행 시 localStorage 시딩
