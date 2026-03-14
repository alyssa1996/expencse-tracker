'use client'

import { useState } from 'react'
import { Expense, MonthlySummary, YearlySummary } from '@/types/expense'
import { SummaryCards } from './SummaryCards'
import { MonthlyChart } from './MonthlyChart'
import { CategoryPieChart } from './CategoryPieChart'
import { BudgetProgress } from './BudgetProgress'
import { YearComparison } from './YearComparison'
import { YearlyView } from './YearlyView'
import { FixedExpenseAnalysis } from './FixedExpenseAnalysis'

interface DashboardClientProps {
  expenses: Expense[]
  currentMonthSummary: MonthlySummary
  previousMonthSummary: MonthlySummary
  yearlySummaries: YearlySummary[]
  currentYearSummary: YearlySummary | undefined
  currentYear: number
  currentMonth: string
}

const TABS = [
  { id: 'current', label: '현재 현황' },
  { id: 'yearly', label: '연도별' },
  { id: 'compare', label: '연도 비교' },
]

export function DashboardClient({
  expenses,
  currentMonthSummary,
  previousMonthSummary,
  yearlySummaries,
  currentYearSummary,
  currentYear,
  currentMonth,
}: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState('current')

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
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
    </div>
  )
}
