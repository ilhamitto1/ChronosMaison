export type ProductCategory = 'watches' | 'bags' | 'jewelry'

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
