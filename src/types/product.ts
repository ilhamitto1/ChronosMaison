import type { ProductCategory } from '@/types/database'

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
}

export interface ProductFormValues {
  title: string
  price: string
  category: ProductCategory | ''
  description: string
  brand: string
  brand_id: string
}

export interface ProductFormErrors {
  title?: string
  price?: string
  category?: string
  description?: string
  image?: string
}
