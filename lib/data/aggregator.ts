import { Expense, MonthlySummary, YearlySummary, Category, Year } from '@/types/expense'
import { CATEGORIES } from '@/lib/constants/categories'

function emptyByCategory(): Record<Category, number> {
  return Object.fromEntries(CATEGORIES.map((c) => [c, 0])) as Record<Category, number>
}

export function buildMonthlySummary(expenses: Expense[], month: string): MonthlySummary {
  const filtered = expenses.filter((e) => e.date.startsWith(month))
  const byCategory = emptyByCategory()

  let totalExpense = 0
  let totalIncome = 0

  for (const e of filtered) {
    if (e.isIncome) {
      totalIncome += e.amount
    } else {
      totalExpense += e.amount
      byCategory[e.category] += e.amount
    }
  }

  return {
    month,
    totalExpense,
    totalIncome,
    net: totalIncome - totalExpense,
    byCategory,
  }
}

export function buildYearlySummary(expenses: Expense[], year: Year): YearlySummary {
  const yearExpenses = expenses.filter((e) => e.year === year)

  // Collect all months in this year that have data
  const monthsSet = new Set(yearExpenses.map((e) => e.date.slice(0, 7)))
  // Fill all 12 months so charts are complete even with missing months
  for (let m = 1; m <= 12; m++) {
    monthsSet.add(`${year}-${String(m).padStart(2, '0')}`)
  }
  const months = [...monthsSet].sort()

  const byMonth = months.map((month) => buildMonthlySummary(yearExpenses, month))
  const byCategory = emptyByCategory()
  let totalExpense = 0
  let totalIncome = 0

  for (const e of yearExpenses) {
    if (e.isIncome) {
      totalIncome += e.amount
    } else {
      totalExpense += e.amount
      byCategory[e.category] += e.amount
    }
  }

  return {
    year,
    totalExpense,
    totalIncome,
    net: totalIncome - totalExpense,
    byMonth,
    byCategory,
  }
}

export function getCurrentMonthKey(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export function getPreviousMonthKey(monthKey: string): string {
  const [year, month] = monthKey.split('-').map(Number)
  const prev = new Date(year, month - 2, 1)
  return `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}`
}

export function formatKRW(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatKRWShort(amount: number): string {
  if (amount >= 10000) {
    return `${(amount / 10000).toFixed(1)}만원`
  }
  return `${amount.toLocaleString('ko-KR')}원`
}
