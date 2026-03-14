import { Expense, Year } from '@/types/expense'
import { RawExpenseRow } from '@/lib/notion/fetcher'
import { normalizeCategory } from './categorizer'

export function normalizeExpense(row: RawExpenseRow): Expense | null {
  if (!row.date || row.amount === null) return null

  return {
    id: row.id,
    date: row.date,
    details: row.details ?? '',
    amount: row.amount,
    category: normalizeCategory(row.category, row.details),
    originalCategory: row.category ?? '기타',
    isIncome: row.isIncome,
    year: row.year,
  }
}

export function normalizeExpenses(rows: RawExpenseRow[]): Expense[] {
  return rows.map(normalizeExpense).filter((e): e is Expense => e !== null)
}

export function getAvailableYears(expenses: Expense[]): Year[] {
  return [...new Set(expenses.map((e) => e.year))].sort() as Year[]
}
