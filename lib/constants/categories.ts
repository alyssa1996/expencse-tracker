import { Category, BudgetTarget } from '@/types/expense'

export const CATEGORIES: Category[] = [
  '식비',
  '의류/미용비',
  '교통/통신비',
  '건강관리비',
  '자기계발/취미비',
  '경조사비',
  '고정비',
  '주거비',
  '생활용품비',
  '구독서비스',
  '기타',
]

// Budget targets (monthly, in KRW)
export const BUDGET_TARGETS: BudgetTarget[] = [
  { category: '식비', monthlyTarget: 300000 },
  { category: '의류/미용비', monthlyTarget: 150000 },
  { category: '교통/통신비', monthlyTarget: 100000 },
  { category: '건강관리비', monthlyTarget: 200000 },
  { category: '자기계발/취미비', monthlyTarget: 100000 },
  { category: '생활용품비', monthlyTarget: 100000 },
  { category: '구독서비스', monthlyTarget: 100000 },
]

// Category color mapping for charts
export const CATEGORY_COLORS: Record<Category, string> = {
  '식비': '#f97316',
  '의류/미용비': '#ec4899',
  '교통/통신비': '#3b82f6',
  '건강관리비': '#22c55e',
  '자기계발/취미비': '#a855f7',
  '경조사비': '#f59e0b',
  '고정비': '#6366f1',
  '주거비': '#14b8a6',
  '생활용품비': '#84cc16',
  '구독서비스': '#06b6d4',
  '기타': '#94a3b8',
}

// Normalize raw category strings from Notion to standard Category type
// Handles variations across 2024 (품목) and 2025/2026 (유형)
export const CATEGORY_NORMALIZATION_MAP: Record<string, Category> = {
  // 식비
  '식비': '식비',
  '식품': '식비',
  '외식': '식비',
  '카페': '식비',
  '음식': '식비',

  // 의류/미용비
  '의류/미용비': '의류/미용비',
  '의류': '의류/미용비',
  '미용': '의류/미용비',
  '패션': '의류/미용비',
  '의류비': '의류/미용비',
  '미용비': '의류/미용비',

  // 교통/통신비
  '교통/통신비': '교통/통신비',
  '교통': '교통/통신비',
  '통신': '교통/통신비',
  '교통비': '교통/통신비',
  '통신비': '교통/통신비',

  // 건강관리비
  '건강관리비': '건강관리비',
  '건강': '건강관리비',
  '의료': '건강관리비',
  '병원': '건강관리비',
  '약': '건강관리비',
  '헬스': '건강관리비',

  // 자기계발/취미비
  '자기계발/취미비': '자기계발/취미비',
  '자기계발': '자기계발/취미비',
  '취미': '자기계발/취미비',
  '교육': '자기계발/취미비',
  '도서': '자기계발/취미비',
  '문화': '자기계발/취미비',

  // 경조사비
  '경조사비': '경조사비',
  '경조사': '경조사비',

  // 고정비
  '고정비': '고정비',

  // 주거비
  '주거비': '주거비',
  '주거': '주거비',
  '월세': '주거비',
  '관리비': '주거비',

  // 생활용품비
  '생활용품비': '생활용품비',
  '생활용품': '생활용품비',
  '생필품': '생활용품비',

  // 구독서비스
  '구독서비스': '구독서비스',
  '구독': '구독서비스',
  '구독료': '구독서비스',

  // 기타
  '기타': '기타',
}
