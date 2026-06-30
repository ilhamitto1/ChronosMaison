import type { ProductCategory } from '@/types/database'
import catalogSeedJson from './catalog-seed.json'

export interface CatalogSeedItem {
  legacyId: string
  title: string
  brand: string
  brand_id: string
  price: number
  image_url: string
  category: ProductCategory
  description: string
}

export const catalogSeed = catalogSeedJson as CatalogSeedItem[]
