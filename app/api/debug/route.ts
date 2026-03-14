import { notionClient, DATABASE_IDS } from '@/lib/notion/client'
import { Year } from '@/types/expense'

async function testDatabase(year: Year): Promise<{ year: Year; ok: boolean; error?: string; count?: number }> {
  try {
    const response = await notionClient.databases.query({
      database_id: DATABASE_IDS[year],
      page_size: 1,
    })
    return { year, ok: true, count: response.results.length }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return { year, ok: false, error: message }
  }
}

export async function GET() {
  const years: Year[] = [2024, 2025, 2026]
  const results = await Promise.all(years.map(testDatabase))

  return Response.json({ results }, { status: 200 })
}
