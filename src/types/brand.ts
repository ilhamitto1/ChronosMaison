export type BrandCategory = 'watches' | 'bags' | 'jewelry' | 'both'

export interface Brand {
  id: string
  name: string
  logo: string
  category: BrandCategory
  showOnHomepage: boolean
  sortOrder: number
}

export interface BrandFormValues {
  name: string
  slug: string
  category: BrandCategory | ''
  showOnHomepage: boolean
  sortOrder: string
}

export interface BrandFormErrors {
  name?: string
  slug?: string
  category?: string
  image?: string
}
