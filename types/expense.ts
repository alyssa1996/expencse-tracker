export type Category =
  | '식비'
  | '의류/미용비'
  | '교통/통신비'
  | '건강관리비'
  | '자기계발/취미비'
  | '경조사비'
  | '고정비'
  | '주거비'
  | '생활용품비'
  | '구독서비스'
  | '기타'

export type Year = 2024 | 2025 | 2026

export interface Expense {
  id: string
  date: string // ISO format: YYYY-MM-DD
  details: string // 내역
  amount: number // 금액 in KRW
  category: Category // normalized category
  originalCategory: string // raw value from Notion
  isIncome: boolean // 수입 여부 (2026 only, others default to false)
  year: Year
}

export interface MonthlySummary {
  month: string // 'YYYY-MM'
  totalExpense: number
  totalIncome: number
  net: number
  byCategory: Record<Category, number>
}

export interface YearlySummary {
  year: Year
  totalExpense: number
  totalIncome: number
  net: number
  byMonth: MonthlySummary[]
  byCategory: Record<Category, number>
}

export interface BudgetTarget {
  category: Category
  monthlyTarget: number
}

export interface DashboardData {
  expenses: Expense[]
  yearlySummaries: YearlySummary[]
  currentMonthSummary: MonthlySummary
  currentYearSummary: YearlySummary
}
