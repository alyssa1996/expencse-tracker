# 가계부 대시보드 프로젝트 회의록

**날짜:** 2026년 3월 14일
**목적:** Notion 가계부 데이터 기반 대시보드 구축

---

## 요약

Notion에 정리된 2024~2026년 가계부 데이터를 시각화하는 웹 대시보드를 구축했다.
Next.js 14 + TypeScript + Tailwind CSS + Recharts 스택으로 구현하였으며,
Notion API를 통해 실시간 데이터를 연동한다.

---

## 주요 결정 사항

### 기술 스택
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Data source:** Notion API (`@notionhq/client`)
- **Deployment:** Vercel 예정

### 데이터 구조
| 연도 | 카테고리 컬럼 | 수입/지출 구분 |
|------|-------------|--------------|
| 2024 | `품목` | 없음 (지출만) |
| 2025 | `유형` | 없음 (지출만) |
| 2026 | `유형` | `수입` (checkbox) |

- 날짜 컬럼: 모든 연도 공통 `날짜`
- 금액 단위: 원(KRW)

### 카테고리 정규화
- 기준: 2026년 카테고리를 표준으로 사용
- 표준 카테고리: 식비, 의류/미용비, 교통/통신비, 건강관리비, 자기계발/취미비, 경조사비, 고정비, 주거비, 생활용품비, 구독서비스, 기타
- `기타`로 분류된 항목 중 구독 키워드(넷플릭스, 멜론, 쿠팡, ChatGPT 등) 포함 시 → `구독서비스`로 자동 재분류
- `고정비`: 가족 용돈, 데이트비 등 정기 지출 포함

### 예산 목표 (월 기준, 참고용)
| 카테고리 | 월 목표 |
|---------|--------|
| 식비 | 30만원 |
| 의류/미용비 | 15만원 |
| 교통/통신비 | 10만원 |
| 건강관리비 | 20만원 |
| 자기계발/취미비 | 10만원 |
| 생활용품비 | 10만원 |
| 구독서비스 | 10만원 |

---

## 구현된 기능

### 대시보드 탭 구성
1. **현재 현황** — 이번달 요약 카드, 월별 바 차트, 카테고리 파이 차트, 예산 진행률, 고정비 내역 분석
2. **연도별** — 연도 선택 후 해당 연도 월별 추이 + 카테고리 분석
3. **연도 비교** — 2024/2025/2026 월별 지출 라인 차트 + 연도별 카테고리 파이 차트 3개 비교

### 기술적 구현 포인트
- Notion API 페이지네이션 처리 (100건 단위)
- `unstable_cache`로 30분 캐싱 (Notion API 호출 최소화)
- Recharts 컴포넌트 `ssr: false` dynamic import (useContext 에러 방지)
- Server Component에서 데이터 fetch → Client Component로 직렬화 가능한 데이터만 전달
- `.env`는 `.gitignore`에 포함 — API 키 보안 보장

---

## 트러블슈팅

| 에러 | 원인 | 해결 |
|------|------|------|
| `multiple data sources not supported` | 2026 DB가 Connected Database (다중 소스 병합) | 원본 단일 DB ID로 교체 |
| `Functions are not valid as a child of Client Components` | Server Component에서 render prop 함수를 Client Component에 전달 | `DashboardClient` 컴포넌트로 분리 |
| `Cannot read properties of null (reading 'useContext')` | Recharts가 SSR 환경에서 React context 접근 실패 | `next/dynamic` + `ssr: false`로 dynamic import |
| TypeScript `Set` iteration error | `tsconfig` target 이슈 | `Array.from()` 으로 교체 |

---

## 향후 개선 아이디어 (아이디에이션)

### 인터랙션 강화
- **날짜 범위 필터** — 특정 기간만 선택해서 보기 (e.g. 최근 3개월)
- **카테고리 드릴다운** — 파이 차트 클릭 시 해당 카테고리 내역 목록 표시
- **차트 hover 상세** — 바 차트 hover 시 그 달의 top 3 지출 항목 표시
- **지출 내역 테이블** — 필터/정렬/검색 가능한 raw 데이터 테이블

### 분석 관점 추가
- **요일별 지출 패턴** — 월~일 중 어느 요일에 가장 많이 소비하는지
- **주차별 추이** — 월초 vs 월말 소비 패턴 차이
- **카테고리 YoY 비교** — 식비가 작년 대비 얼마나 늘었는지 수치화
- **지출 빈도 vs 금액 분석** — 자주 쓰는 항목 vs 한번에 크게 쓰는 항목 분리
- **구독서비스 전용 뷰** — 월별 구독료 합계 + 항목별 breakdown

### 인사이트 / 자동화
- **이상 지출 감지** — 평소 대비 급증한 카테고리 자동 하이라이트
- **이번달 지출 예측** — 현재 추이 기반으로 월말 예상 총액 표시
- **절약 포인트 메시지** — "지난달보다 식비 2만원 줄었어요" 형태의 인사이트
- **고정비 캘린더** — 정기 지출 예정일 캘린더 뷰

### UX 개선
- **다크모드** — 야간 사용 편의
- **모바일 최적화** — 폰에서 빠르게 확인하는 뷰
- **데이터 새로고침 버튼** — Notion 업데이트 후 즉시 반영
- **CSV 내보내기** — 가공된 데이터를 엑셀로 다운로드

---

## Notion DB 정보

| 연도 | Database ID |
|------|------------|
| 2024 | `4a8ea22cd64b4889b4d86747071edffa` |
| 2025 | `171aa0b001828076a152fab2c51574c9` |
| 2026 | `323aa0b00182807880e0f3d0b49f743f` |

> API Key는 `.env` 파일에 저장 (git 제외)
