'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const isMultiSourceError = error.message?.includes('multiple data sources')

  return (
    <div className="max-w-2xl mx-auto mt-16 p-8 bg-white rounded-2xl border border-red-100 shadow-sm">
      <div className="text-4xl mb-4">⚠️</div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">데이터를 불러오지 못했어요</h2>

      {isMultiSourceError ? (
        <div className="space-y-4 text-sm text-gray-600">
          <p className="font-medium text-red-600">
            Notion API가 &quot;연결된 데이터베이스(Connected Database)&quot;를 지원하지 않아요.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
            <p className="font-semibold text-amber-800">해결 방법</p>
            <p className="text-amber-700">
              현재 DB가 여러 소스를 합친 뷰(Connected DB)일 수 있어요.
              아래 중 하나를 확인해 주세요:
            </p>
            <ol className="list-decimal pl-4 space-y-1 text-amber-700">
              <li>노션에서 해당 DB 페이지를 열고, 상단의 &quot;···&quot; 메뉴를 확인하세요</li>
              <li>
                &quot;연결된 보기(Connected view)&quot; 표시가 있다면 원본 DB 페이지로 이동하세요
              </li>
              <li>원본 DB의 URL에서 database_id를 다시 복사해 .env를 업데이트하세요</li>
            </ol>
          </div>
          <p className="text-gray-500">
            또는 노션 DB가 &quot;데이터베이스 연결(Merge with CSV)&quot; 등으로 외부 소스와 연결되어 있다면
            일반 DB로 새로 만들어야 해요.
          </p>
        </div>
      ) : (
        <p className="text-sm text-gray-600">{error.message}</p>
      )}

      <button
        onClick={reset}
        className="mt-6 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
      >
        다시 시도
      </button>
    </div>
  )
}
