import { PageObjectResponse, QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { notionClient, DATABASE_IDS } from './client'
import { Year } from '@/types/expense'

export interface RawExpenseRow {
  id: string
  date: string | null
  details: string | null
  amount: number | null
  category: string | null // '품목' (2024) or '유형' (2025/2026)
  isIncome: boolean // '수입' checkbox, only meaningful for 2026
  year: Year
}

// Safely extract property values from Notion page objects
function extractDate(page: PageObjectResponse, key: string): string | null {
  const prop = page.properties[key]
  if (!prop || prop.type !== 'date') return null
  return prop.date?.start ?? null
}

function extractTitle(page: PageObjectResponse, key: string): string | null {
  const prop = page.properties[key]
  if (!prop) return null
  if (prop.type === 'title') return prop.title.map((t) => t.plain_text).join('') || null
  if (prop.type === 'rich_text') return prop.rich_text.map((t) => t.plain_text).join('') || null
  return null
}

function extractNumber(page: PageObjectResponse, key: string): number | null {
  const prop = page.properties[key]
  if (!prop || prop.type !== 'number') return null
  return prop.number
}

function extractSelect(page: PageObjectResponse, key: string): string | null {
  const prop = page.properties[key]
  if (!prop || prop.type !== 'select') return null
  return prop.select?.name ?? null
}

function extractCheckbox(page: PageObjectResponse, key: string): boolean {
  const prop = page.properties[key]
  if (!prop || prop.type !== 'checkbox') return false
  return prop.checkbox
}

function parsePage(page: PageObjectResponse, year: Year): RawExpenseRow {
  // Category column name differs by year
  const categoryKey = year === 2024 ? '품목' : '유형'

  return {
    id: page.id,
    date: extractDate(page, '날짜'),
    details: extractTitle(page, '내역'),
    amount: extractNumber(page, '금액'),
    category: extractSelect(page, categoryKey),
    isIncome: year === 2026 ? extractCheckbox(page, '수입') : false,
    year,
  }
}

// Fetch all pages from a database, handling Notion's 100-item pagination
async function fetchAllPages(databaseId: string): Promise<PageObjectResponse[]> {
  const pages: PageObjectResponse[] = []
  let cursor: string | undefined = undefined

  do {
    const response: QueryDatabaseResponse = await notionClient.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
      page_size: 100,
    })

    for (const page of response.results) {
      if (page.object === 'page' && 'properties' in page) {
        pages.push(page as PageObjectResponse)
      }
    }

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
  } while (cursor)

  return pages
}

export async function fetchExpensesForYear(year: Year): Promise<RawExpenseRow[]> {
  const databaseId = DATABASE_IDS[year]
  const pages = await fetchAllPages(databaseId)

  return pages
    .map((page) => parsePage(page, year))
    .filter((row) => row.date !== null && row.amount !== null)
}

export async function fetchAllExpenses(): Promise<RawExpenseRow[]> {
  const years: Year[] = [2024, 2025, 2026]
  const results = await Promise.all(years.map((year) => fetchExpensesForYear(year)))
  return results.flat()
}
