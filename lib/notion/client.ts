import { Client } from '@notionhq/client'

if (!process.env.NOTION_API_KEY) {
  throw new Error('NOTION_API_KEY is not set in environment variables')
}

export const notionClient = new Client({
  auth: process.env.NOTION_API_KEY,
})

export const DATABASE_IDS: Record<2024 | 2025 | 2026, string> = {
  2024: process.env.NOTION_DATABASE_ID_2024!,
  2025: process.env.NOTION_DATABASE_ID_2025!,
  2026: process.env.NOTION_DATABASE_ID_2026!,
}
