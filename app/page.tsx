import { fetchAllExpenses } from '@/lib/notion/fetcher'
import { normalizeExpenses } from '@/lib/data/normalizer'
import {
  buildMonthlySummary,
  buildYearlySummary,
  getCurrentMonthKey,
  getPreviousMonthKey,
} from '@/lib/data/aggregator'
import { Year } from '@/types/expense'
import { Tabs } from '@/components/ui/Tabs'
import { SummaryCards } from '@/components/dashboard/SummaryCards'
import { MonthlyChart } from '@/components/dashboard/MonthlyChart'
import { CategoryPieChart } from '@/components/dashboard/CategoryPieChart'
import { BudgetProgress } from '@/components/dashboard/BudgetProgress'
import { YearComparison } from '@/components/dashboard/YearComparison'
import { YearlyView } from '@/components/dashboard/YearlyView'
import { FixedExpenseAnalysis } from '@/components/dashboard/FixedExpenseAnalysis'

// Revalidate data every 30 minutes
export const revalidate = 1800

const TABS = [
  { id: 'current', label: '현재 현황' },
  { id: 'yearly', label: '연도별' },
  { id: 'compare', label: '연도 비교' },
]

export default async function DashboardPage() {
  // Fetch and normalize all data server-side
  const rawExpenses = await fetchAllExpenses()
  const expenses = normalizeExpenses(rawExpenses)

  const currentMonth = getCurrentMonthKey()
  const previousMonth = getPreviousMonthKey(currentMonth)

  const currentMonthSummary = buildMonthlySummary(expenses, currentMonth)
  const previousMonthSummary = buildMonthlySummary(expenses, previousMonth)

  const years: Year[] = [2024, 2025, 2026]
  const yearlySummaries = years.map((year) => buildYearlySummary(expenses, year))

  // Current year monthly data for chart
  const currentYear = new Date().getFullYear() as Year
  const currentYearSummary = yearlySummaries.find((s) => s.year === currentYear)

  return (
    <Tabs tabs={TABS} defaultTab="current">
      {(activeTab) => (
        <>
          {activeTab === 'current' && (
            <div className="space-y-6">
              <SummaryCards
                current={currentMonthSummary}
                previous={previousMonthSummary}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {currentYearSummary && (
                  <MonthlyChart
                    monthlySummaries={currentYearSummary.byMonth}
                    showIncome={currentYear === 2026}
                  />
                )}
                <CategoryPieChart byCategory={currentMonthSummary.byCategory} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <BudgetProgress monthlySummary={currentMonthSummary} />
                <FixedExpenseAnalysis expenses={expenses} month={currentMonth} />
              </div>
            </div>
          )}

          {activeTab === 'yearly' && (
            <YearlyView summaries={yearlySummaries} />
          )}

          {activeTab === 'compare' && (
            <div className="space-y-6">
              <YearComparison summaries={yearlySummaries} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {yearlySummaries.map((s) => (
                  <CategoryPieChart
                    key={s.year}
                    byCategory={s.byCategory}
                    title={`${s.year}년`}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </Tabs>
  )
}
