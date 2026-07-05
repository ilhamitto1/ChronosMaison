import type { Product, WatchSpecRow } from '@/types/product'
import type { WatchCondition } from '@/types/product'

export const WATCH_CONDITION_LABELS: Record<WatchCondition, string> = {
  new: 'Yeni',
  'like-new': 'Yeni kimi',
  'lightly-used': 'Az işlənmiş',
}

function textValue(value: string | null | undefined) {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}

export function formatWatchConditionValue(product: Product): string | null {
  const parts: string[] = []

  if (product.watchCondition) {
    parts.push(WATCH_CONDITION_LABELS[product.watchCondition])
  }
  if (product.watchYear != null) {
    parts.push(`(${product.watchYear})`)
  }

  return parts.length > 0 ? parts.join(' ') : null
}

export function getWatchSpecRows(product: Product): WatchSpecRow[] {
  if (product.category !== 'watches') return []

  const rows: WatchSpecRow[] = []

  if (product.caseSizeMm != null) {
    rows.push({ label: 'Məhsulun diametri', value: `${product.caseSizeMm} mm` })
  }

  const reference = textValue(product.watchReference)
  if (reference) rows.push({ label: 'Referans', value: reference })

  const collection = textValue(product.watchCollection)
  if (collection) rows.push({ label: 'Kolleksiya', value: collection })

  const caseMaterial = textValue(product.watchCaseMaterial)
  if (caseMaterial) rows.push({ label: 'Korpusun materialı', value: caseMaterial })

  const strapMaterial = textValue(product.watchStrapMaterial)
  if (strapMaterial) rows.push({ label: 'Qayışın materialı', value: strapMaterial })

  const dialColor = textValue(product.watchDialColor)
  if (dialColor) rows.push({ label: 'Siferblatın rəngi', value: dialColor })

  const movementType = textValue(product.watchMovementType)
  if (movementType) rows.push({ label: 'Mexanizm növü', value: movementType })

  const watchSet = textValue(product.watchSet)
  if (watchSet) rows.push({ label: 'Dəst', value: watchSet })

  const conditionValue = formatWatchConditionValue(product)
  if (conditionValue) {
    rows.push({ label: 'Vəziyyəti', value: conditionValue, accent: true })
  }

  if (product.hasCertificate != null) {
    rows.push({
      label: 'Sertifikat',
      value: product.hasCertificate ? 'Var' : 'Yoxdur',
    })
  }

  return rows
}

export function hasWatchSpecs(product: Product): boolean {
  return getWatchSpecRows(product).length > 0
}

export function formatWatchSpecLine(product: Product): string | null {
  const rows = getWatchSpecRows(product)
  if (rows.length === 0) return null

  const priority = ['Məhsulun diametri', 'Vəziyyəti', 'Kolleksiya', 'Referans']
  const picked = priority
    .map((label) => rows.find((row) => row.label === label))
    .filter((row): row is WatchSpecRow => row != null)
    .slice(0, 3)

  const fallback = rows.filter((row) => !priority.includes(row.label)).slice(0, 3 - picked.length)
  return [...picked, ...fallback].map((row) => row.value).join(' · ')
}
