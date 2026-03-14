'use client'

import { useState } from 'react'
import { YearlySummary, Year } from '@/types/expense'
import { MonthlyChart } from './MonthlyChart'
import { CategoryPieChart } from './CategoryPieChart'
import { Card } from '@/components/ui/Card'
import { formatKRW } from '@/lib/data/aggregator'

interface YearlyViewProps {
  summaries: YearlySummary[]
}

export function YearlyView({ summaries }: YearlyViewProps) {
  const years = summaries.map((s) => s.year)
  const [selectedYear, setSelectedYear] = useState<Year>(years[years.length - 1])

  const summary = summaries.find((s) => s.year === selectedYear)

  return (
    <div>
      {/* Year selector */}
      <div className="flex gap-2 mb-6">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all border ${
              selectedYear === year
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
            }`}
          >
            {year}년
          </button>
        ))}
      </div>

      {summary && (
        <>
          {/* Year summary row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card>
              <p className="text-xs text-gray-500 font-medium mb-1">연간 총 지출</p>
              <p className="text-xl font-bold text-gray-900">{formatKRW(summary.totalExpense)}</p>
            </Card>
            <Card>
              <p className="text-xs text-gray-500 font-medium mb-1">연간 총 수입</p>
              <p className="text-xl font-bold text-blue-600">
                {summary.totalIncome > 0 ? formatKRW(summary.totalIncome) : '기록 없음'}
              </p>
            </Card>
            <Card>
              <p className="text-xs text-gray-500 font-medium mb-1">월 평균 지출</p>
              <p className="text-xl font-bold text-gray-700">
                {formatKRW(Math.round(summary.totalExpense / 12))}
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <MonthlyChart
              monthlySummaries={summary.byMonth}
              showIncome={selectedYear === 2026}
            />
            <CategoryPieChart
              byCategory={summary.byCategory}
              title={`${selectedYear}년 카테고리별 지출`}
            />
          </div>
        </>
      )}
    </div>
  )
}
