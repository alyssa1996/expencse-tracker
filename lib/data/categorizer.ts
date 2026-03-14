import { Category } from '@/types/expense'
import { CATEGORY_NORMALIZATION_MAP } from '@/lib/constants/categories'
import { SUBSCRIPTION_KEYWORDS } from '@/lib/constants/subscriptions'

// Check if the details text contains any subscription keyword
function isSubscriptionByDetails(details: string): boolean {
  const lowerDetails = details.toLowerCase()
  return SUBSCRIPTION_KEYWORDS.some((keyword) =>
    lowerDetails.includes(keyword.toLowerCase())
  )
}

// Normalize raw category string to a standard Category
// If the raw category is '기타' and the details suggest a subscription, reclassify
export function normalizeCategory(
  rawCategory: string | null,
  details: string | null
): Category {
  // Auto-detect subscriptions from details regardless of original category
  if (details && isSubscriptionByDetails(details)) {
    return '구독서비스'
  }

  if (!rawCategory) return '기타'

  const trimmed = rawCategory.trim()

  // Direct match
  const direct = CATEGORY_NORMALIZATION_MAP[trimmed]
  if (direct) return direct

  // Case-insensitive match
  const lower = trimmed.toLowerCase()
  for (const [key, value] of Object.entries(CATEGORY_NORMALIZATION_MAP)) {
    if (key.toLowerCase() === lower) return value
  }

  // Partial match fallback
  for (const [key, value] of Object.entries(CATEGORY_NORMALIZATION_MAP)) {
    if (trimmed.includes(key) || key.includes(trimmed)) return value
  }

  return '기타'
}
