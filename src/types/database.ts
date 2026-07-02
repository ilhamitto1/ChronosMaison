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
  case_size_mm: number | null
  watch_reference: string | null
  watch_collection: string | null
  watch_case_material: string | null
  watch_strap_material: string | null
  watch_dial_color: string | null
  watch_movement_type: string | null
  watch_set: string | null
  watch_condition: 'new' | 'pre-owned' | null
  has_certificate: boolean | null
  watch_year: number | null
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
  case_size_mm?: number | null
  watch_reference?: string | null
  watch_collection?: string | null
  watch_case_material?: string | null
  watch_strap_material?: string | null
  watch_dial_color?: string | null
  watch_movement_type?: string | null
  watch_set?: string | null
  watch_condition?: 'new' | 'pre-owned' | null
  has_certificate?: boolean | null
  watch_year?: number | null
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
  case_size_mm?: number | null
  watch_reference?: string | null
  watch_collection?: string | null
  watch_case_material?: string | null
  watch_strap_material?: string | null
  watch_dial_color?: string | null
  watch_movement_type?: string | null
  watch_set?: string | null
  watch_condition?: 'new' | 'pre-owned' | null
  has_certificate?: boolean | null
  watch_year?: number | null
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
