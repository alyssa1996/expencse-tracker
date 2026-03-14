import { getCachedExpenses } from '@/lib/notion/cache'
import { normalizeExpenses } from '@/lib/data/normalizer'
import {
  buildMonthlySummary,
  buildYearlySummary,
  getCurrentMonthKey,
  getPreviousMonthKey,
} from '@/lib/data/aggregator'
import { Year } from '@/types/expense'
import { DashboardClient } from '@/components/dashboard/DashboardClient'

export default async function DashboardPage() {
  const rawExpenses = await getCachedExpenses()
  const expenses = normalizeExpenses(rawExpenses)

  const currentMonth = getCurrentMonthKey()
  const previousMonth = getPreviousMonthKey(currentMonth)
  const currentYear = new Date().getFullYear() as Year

  const currentMonthSummary = buildMonthlySummary(expenses, currentMonth)
  const previousMonthSummary = buildMonthlySummary(expenses, previousMonth)

  const years: Year[] = [2024, 2025, 2026]
  const yearlySummaries = years.map((year) => buildYearlySummary(expenses, year))
  const currentYearSummary = yearlySummaries.find((s) => s.year === currentYear)

  return (
    <DashboardClient
      expenses={expenses}
      currentMonthSummary={currentMonthSummary}
      previousMonthSummary={previousMonthSummary}
      yearlySummaries={yearlySummaries}
      currentYearSummary={currentYearSummary}
      currentYear={currentYear}
      currentMonth={currentMonth}
    />
  )
}
