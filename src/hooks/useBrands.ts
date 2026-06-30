import { useCallback, useEffect, useState } from 'react'
import { fallbackBrands, homepageBrands as fallbackHomepageBrands } from '@/data/fallbackBrands'
import { getAllBrands, getBrandBySlug, getHomepageBrands } from '@/services/brandService'
import type { Brand, BrandCategory } from '@/types/brand'

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>(fallbackBrands)

  const refresh = useCallback(async () => {
    const data = await getAllBrands()
    setBrands(data)
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return { brands, refresh }
}

export function useHomepageBrands() {
  const [brands, setBrands] = useState<Brand[]>(fallbackHomepageBrands)

  useEffect(() => {
    void getHomepageBrands().then(setBrands)
  }, [])

  return brands
}

export function useBrandsByCategory(category: BrandCategory | 'bags' | 'jewelry' | 'watches') {
  const { brands } = useBrands()

  if (category === 'bags') {
    return brands.filter((b) => b.category === 'bags' || b.category === 'both')
  }
  if (category === 'jewelry') {
    return brands.filter((b) => b.category === 'jewelry' || b.category === 'both')
  }
  return brands.filter((b) => b.category === 'watches' || b.category === 'both')
}

export function useBrand(slug: string | undefined) {
  const [brand, setBrand] = useState<Brand | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) {
      setBrand(null)
      setLoading(false)
      return
    }

    let active = true
    setLoading(true)

    getBrandBySlug(slug)
      .then((data) => {
        if (active) setBrand(data)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [slug])

  return { brand, loading }
}
