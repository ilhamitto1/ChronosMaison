import type { ProductCategory } from '@/types/database'

export const PRODUCT_CATEGORY_OPTIONS: { value: ProductCategory; label: string }[] = [
  { value: 'watches', label: 'Saatlar' },
  { value: 'bags', label: 'Çantalar' },
  { value: 'jewelry', label: 'Zinət əşyaları' },
  { value: 'other', label: 'Digər' },
]

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  watches: 'Saatlar',
  bags: 'Çantalar',
  jewelry: 'Zinət əşyaları',
  other: 'Digər',
}

export const PRODUCT_CATEGORY_BACK: Record<ProductCategory, { to: string; label: string }> = {
  watches: { to: '/watches', label: 'Saatlara qayıt' },
  bags: { to: '/bags', label: 'Çantalara qayıt' },
  jewelry: { to: '/jewelry', label: 'Zinət əşyalarına qayıt' },
  other: { to: '/other', label: 'Digərə qayıt' },
}
