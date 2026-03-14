import { Expense } from '@/types/expense'
import { Card, CardHeader } from '@/components/ui/Card'
import { formatKRWShort } from '@/lib/data/aggregator'

interface FixedExpenseAnalysisProps {
  expenses: Expense[]
  month: string
}

export function FixedExpenseAnalysis({ expenses, month }: FixedExpenseAnalysisProps) {
  const fixedExpenses = expenses.filter(
    (e) => e.date.startsWith(month) && e.category === '고정비' && !e.isIncome
  )

  const total = fixedExpenses.reduce((sum, e) => sum + e.amount, 0)

  // Group by details to find recurring patterns
  const detailGroups: Record<string, { count: number; total: number }> = {}
  for (const e of fixedExpenses) {
    const key = e.details.trim()
    if (!detailGroups[key]) detailGroups[key] = { count: 0, total: 0 }
    detailGroups[key].count++
    detailGroups[key].total += e.amount
  }

  const sorted = Object.entries(detailGroups).sort(([, a], [, b]) => b.total - a.total)

  return (
    <Card>
      <CardHeader
        title="고정비 내역 분석"
        subtitle="가족 용돈, 데이트비 등 정기 지출"
      />
      {fixedExpenses.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-6">이번달 고정비 데이터 없음</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
            <span className="text-sm text-gray-600">이번달 고정비 합계</span>
            <span className="font-bold text-gray-900">{formatKRWShort(total)}</span>
          </div>
          <div className="space-y-2">
            {sorted.map(([detail, { total: amt }]) => (
              <div key={detail} className="flex justify-between items-center text-sm">
                <span className="text-gray-700 truncate max-w-[70%]">{detail}</span>
                <span className="text-gray-500 font-medium">{formatKRWShort(amt)}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  )
}
