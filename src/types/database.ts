export type ProductCategory = 'watches' | 'bags' | 'jewelry'
export type BrandCategory = 'watches' | 'bags' | 'jewelry' | 'both'

export interface DbBrand {
  id: string
  slug: string
  name: string
  logo_url: string
  category: BrandCategory
  show_on_homepage: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface DbBrandInsert {
  slug: string
  name: string
  logo_url: string
  category: BrandCategory
  show_on_homepage?: boolean
  sort_order?: number
}

export interface DbBrandUpdate {
  slug?: string
  name?: string
  logo_url?: string
  category?: BrandCategory
  show_on_homepage?: boolean
  sort_order?: number
}

export interface DbProduct {
  id: string
  title: string
  category: ProductCategory
  price: number
  description: string
  image_url: string
  brand: string | null
  brand_id: string | null
  created_at: string
  updated_at: string
}

export interface DbProductInsert {
  id?: string
  title: string
  category: ProductCategory
  price: number
  description?: string
  image_url: string
  brand?: string | null
  brand_id?: string | null
  created_at?: string
  updated_at?: string
}

export interface DbProductUpdate {
  title?: string
  category?: ProductCategory
  price?: number
  description?: string
  image_url?: string
  brand?: string | null
  brand_id?: string | null
}

export interface Database {
  public: {
    Tables: {
      brands: {
        Row: DbBrand
        Insert: DbBrandInsert
        Update: DbBrandUpdate
        Relationships: []
      }
      products: {
        Row: DbProduct
        Insert: DbProductInsert
        Update: DbProductUpdate
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
