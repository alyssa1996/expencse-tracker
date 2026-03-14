import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '가계부 대시보드',
  description: 'Notion 기반 개인 지출 현황 대시보드',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-slate-50 font-sans">
        <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">가계부 대시보드</span>
              <span className="text-xs text-gray-400 font-medium">Notion 연동</span>
            </div>
            <span className="text-xs text-gray-400">
              {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-5 py-8">{children}</main>
      </body>
    </html>
  )
}
