import { MonthlySummary } from '@/types/expense'
import { Card } from '@/components/ui/Card'
import { formatKRW } from '@/lib/data/aggregator'

interface SummaryCardsProps {
  current: MonthlySummary
  previous: MonthlySummary
}

function ChangeIndicator({ current, previous }: { current: number; previous: number }) {
  if (previous === 0) return null
  const diff = current - previous
  const pct = Math.round((diff / previous) * 100)
  const isUp = diff > 0
  return (
    <span className={`text-xs font-medium ${isUp ? 'text-red-500' : 'text-green-500'}`}>
      {isUp ? '▲' : '▼'} {Math.abs(pct)}% 전월 대비
    </span>
  )
}

export function SummaryCards({ current, previous }: SummaryCardsProps) {
  const [year, month] = current.month.split('-')
  const title = `${year}년 ${Number(month)}월`

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title} 현황</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">총 지출</p>
          <p className="text-2xl font-bold text-gray-900">{formatKRW(current.totalExpense)}</p>
          <div className="mt-1">
            <ChangeIndicator current={current.totalExpense} previous={previous.totalExpense} />
          </div>
        </Card>

        <Card>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">총 수입</p>
          <p className="text-2xl font-bold text-blue-600">{formatKRW(current.totalIncome)}</p>
          {current.totalIncome === 0 && (
            <p className="text-xs text-gray-400 mt-1">2026년부터 기록</p>
          )}
        </Card>

        <Card>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">순수익</p>
          <p className={`text-2xl font-bold ${current.net >= 0 ? 'text-green-600' : 'text-red-500'}`}>
            {formatKRW(current.net)}
          </p>
        </Card>

        <Card>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">전월 지출</p>
          <p className="text-2xl font-bold text-gray-400">{formatKRW(previous.totalExpense)}</p>
          <p className="text-xs text-gray-400 mt-1">
            {previous.month.split('-')[0]}년 {Number(previous.month.split('-')[1])}월
          </p>
        </Card>
      </div>
    </div>
  )
}
