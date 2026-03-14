'use client'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { YearlySummary } from '@/types/expense'
import { Card, CardHeader } from '@/components/ui/Card'
import { formatKRWShort } from '@/lib/data/aggregator'

interface YearComparisonProps {
  summaries: YearlySummary[]
}

const YEAR_COLORS: Record<number, string> = {
  2024: '#94a3b8',
  2025: '#3b82f6',
  2026: '#f97316',
}

export function YearComparison({ summaries }: YearComparisonProps) {
  // Build data indexed by month number (1-12)
  const data = Array.from({ length: 12 }, (_, i) => {
    const monthNum = i + 1
    const point: Record<string, number | string> = { month: `${monthNum}월` }
    for (const summary of summaries) {
      const ms = summary.byMonth.find(
        (m) => Number(m.month.split('-')[1]) === monthNum
      )
      point[`${summary.year}년`] = ms?.totalExpense ?? 0
    }
    return point
  })

  return (
    <Card>
      <CardHeader title="연도별 월별 지출 비교" subtitle="2024 · 2025 · 2026" />
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={formatKRWShort} tick={{ fontSize: 11 }} width={60} />
          <Tooltip
            formatter={(value: number, name: string) => [formatKRWShort(value), name]}
            contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
          />
          <Legend />
          {summaries.map((s) => (
            <Line
              key={s.year}
              type="monotone"
              dataKey={`${s.year}년`}
              stroke={YEAR_COLORS[s.year] ?? '#94a3b8'}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
