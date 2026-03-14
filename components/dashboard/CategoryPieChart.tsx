'use client'

import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { Category } from '@/types/expense'
import { Card, CardHeader } from '@/components/ui/Card'
import { CATEGORY_COLORS } from '@/lib/constants/categories'
import { formatKRWShort } from '@/lib/data/aggregator'

interface CategoryPieChartProps {
  byCategory: Record<Category, number>
  title?: string
}

export function CategoryPieChart({ byCategory, title = '카테고리별 지출' }: CategoryPieChartProps) {
  const data = Object.entries(byCategory)
    .filter(([, value]) => value > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([name, value]) => ({ name, value }))

  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <Card>
      <CardHeader title={title} />
      {data.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-10">데이터 없음</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={CATEGORY_COLORS[entry.name as Category] ?? '#94a3b8'}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${formatKRWShort(value)} (${((value / total) * 100).toFixed(1)}%)`,
                  name,
                ]}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {data.slice(0, 6).map((d) => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: CATEGORY_COLORS[d.name as Category] ?? '#94a3b8' }}
                  />
                  <span className="text-gray-700">{d.name}</span>
                </div>
                <span className="text-gray-500 font-medium">{formatKRWShort(d.value)}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  )
}
