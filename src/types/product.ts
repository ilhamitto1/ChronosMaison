import type { ProductCategory } from '@/types/database'

export type WatchCondition = 'new' | 'pre-owned'

/** App-level product shape used by existing UI components. */
export interface Product {
  id: string
  name: string
  brand: string
  brandId: string
  price: number
  image: string
  category: ProductCategory
  description: string
  caseSizeMm?: number | null
  watchReference?: string | null
  watchCollection?: string | null
  watchCaseMaterial?: string | null
  watchStrapMaterial?: string | null
  watchDialColor?: string | null
  watchMovementType?: string | null
  watchSet?: string | null
  watchCondition?: WatchCondition | null
  hasCertificate?: boolean | null
  watchYear?: number | null
}

export interface ProductFormValues {
  title: string
  price: string
  category: ProductCategory | ''
  description: string
  brand: string
  brand_id: string
  case_size_mm: string
  watch_reference: string
  watch_collection: string
  watch_case_material: string
  watch_strap_material: string
  watch_dial_color: string
  watch_movement_type: string
  watch_set: string
  watch_condition: WatchCondition | ''
  has_certificate: '' | 'yes' | 'no'
  watch_year: string
}

export interface ProductFormErrors {
  title?: string
  price?: string
  category?: string
  description?: string
  image?: string
  case_size_mm?: string
  watch_condition?: string
  has_certificate?: string
  watch_year?: string
}

export interface WatchSpecRow {
  label: string
  value: string
  accent?: boolean
}
