'use client'

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { MonthlySummary } from '@/types/expense'
import { Card, CardHeader } from '@/components/ui/Card'
import { formatKRWShort } from '@/lib/data/aggregator'

interface MonthlyChartProps {
  monthlySummaries: MonthlySummary[]
  showIncome?: boolean
}

export function MonthlyChart({ monthlySummaries, showIncome = false }: MonthlyChartProps) {
  const data = monthlySummaries.map((s) => ({
    month: `${Number(s.month.split('-')[1])}월`,
    지출: s.totalExpense,
    ...(showIncome ? { 수입: s.totalIncome } : {}),
  }))

  return (
    <Card>
      <CardHeader title="월별 지출 추이" />
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={formatKRWShort} tick={{ fontSize: 11 }} width={60} />
          <Tooltip
            formatter={(value: number) => [formatKRWShort(value)]}
            contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
          />
          {showIncome && <Legend />}
          {showIncome && <Bar dataKey="수입" fill="#3b82f6" radius={[4, 4, 0, 0]} />}
          <Bar dataKey="지출" fill="#f97316" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
