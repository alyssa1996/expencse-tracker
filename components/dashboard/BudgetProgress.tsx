import { Category, MonthlySummary } from '@/types/expense'
import { Card, CardHeader } from '@/components/ui/Card'
import { BUDGET_TARGETS, CATEGORY_COLORS } from '@/lib/constants/categories'
import { formatKRWShort } from '@/lib/data/aggregator'

interface BudgetProgressProps {
  monthlySummary: MonthlySummary
}

export function BudgetProgress({ monthlySummary }: BudgetProgressProps) {
  const items = BUDGET_TARGETS.map((target) => {
    const spent = monthlySummary.byCategory[target.category] ?? 0
    const pct = Math.min(Math.round((spent / target.monthlyTarget) * 100), 100)
    const isOver = spent > target.monthlyTarget
    return { ...target, spent, pct, isOver }
  }).sort((a, b) => b.pct - a.pct)

  return (
    <Card>
      <CardHeader
        title="예산 현황"
        subtitle="카테고리별 이번달 목표 대비 지출"
      />
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.category}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-700 font-medium">{item.category}</span>
              <span className={`text-xs font-semibold ${item.isOver ? 'text-red-500' : 'text-gray-500'}`}>
                {formatKRWShort(item.spent)} / {formatKRWShort(item.monthlyTarget)}
                {item.isOver && ' ⚠️'}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all"
                style={{
                  width: `${item.pct}%`,
                  backgroundColor: item.isOver
                    ? '#ef4444'
                    : CATEGORY_COLORS[item.category as Category],
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-4">
        * 예산은 참고용이며, 실제 지출 추이를 먼저 확인하세요
      </p>
    </Card>
  )
}
