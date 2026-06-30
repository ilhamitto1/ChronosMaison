import type { Brand } from '@/types/brand'
import brandsSeedJson from './brands-seed.json'

interface BrandSeedRow {
  slug: string
  name: string
  logo_url: string
  category: Brand['category']
  show_on_homepage: boolean
  sort_order: number
}

export const fallbackBrands: Brand[] = (brandsSeedJson as BrandSeedRow[]).map((row) => ({
  id: row.slug,
  name: row.name,
  logo: row.logo_url,
  category: row.category,
  showOnHomepage: row.show_on_homepage,
  sortOrder: row.sort_order,
}))

export const bagBrands = fallbackBrands.filter((b) => b.category === 'bags' || b.category === 'both')
export const jewelryBrands = fallbackBrands.filter(
  (b) => b.category === 'jewelry' || b.category === 'both',
)
export const watchBrands = fallbackBrands.filter((b) => b.category === 'watches' || b.category === 'both')
export const homepageBrands = fallbackBrands
  .filter((b) => b.showOnHomepage)
  .sort((a, b) => a.sortOrder - b.sortOrder)

export function getBrandById(id: string) {
  return fallbackBrands.find((b) => b.id === id)
}
