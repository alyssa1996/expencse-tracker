import { unstable_cache } from 'next/cache'
import { fetchAllExpenses } from './fetcher'

// Cache Notion data for 30 minutes
export const getCachedExpenses = unstable_cache(
  async () => fetchAllExpenses(),
  ['all-expenses'],
  { revalidate: 1800 }
)
