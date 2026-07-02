import { useCallback, useEffect, useState } from 'react'
import { fallbackProducts } from '@/data/fallbackProducts'
import {
  getCachedAllProducts,
  getCachedProductById,
  getCachedProductsByCategory,
} from '@/lib/productCache'
import { isSupabaseConfigured } from '@/lib/supabase'
import {
  getAllProducts,
  getProductById,
  getProductsByBrand,
  getProductsByCategory,
} from '@/services/productService'
import type { ProductCategory } from '@/types/database'
import type { Product } from '@/types/product'

function getFallbackByCategory(category: ProductCategory) {
  return isSupabaseConfigured ? [] : fallbackProducts.filter((p) => p.category === category)
}

function getFallbackByBrand(brandId: string) {
  return isSupabaseConfigured ? [] : fallbackProducts.filter((p) => p.brandId === brandId)
}

function initialAllProducts(): Product[] {
  return getCachedAllProducts() ?? (isSupabaseConfigured ? [] : fallbackProducts)
}

function initialCategoryProducts(category: ProductCategory): Product[] {
  return getCachedProductsByCategory(category) ?? getFallbackByCategory(category)
}

function shouldLoadWithoutCache(getCache: () => Product[] | Product | undefined) {
  return isSupabaseConfigured && getCache() === undefined
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(initialAllProducts)
  const [loading, setLoading] = useState(() => shouldLoadWithoutCache(() => getCachedAllProducts()))

  const refresh = useCallback(async () => {
    const hasCache = getCachedAllProducts() !== undefined
    if (!hasCache && isSupabaseConfigured) setLoading(true)

    try {
      const data = await getAllProducts()
      setProducts(data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return { products, loading, refresh }
}

export function useProductsByCategory(category: ProductCategory) {
  const [products, setProducts] = useState<Product[]>(() => initialCategoryProducts(category))
  const [loading, setLoading] = useState(() =>
    shouldLoadWithoutCache(() => getCachedProductsByCategory(category)),
  )

  const refresh = useCallback(async () => {
    const hasCache = getCachedProductsByCategory(category) !== undefined
    if (!hasCache && isSupabaseConfigured) setLoading(true)

    try {
      const data = await getProductsByCategory(category)
      setProducts(data)
    } finally {
      setLoading(false)
    }
  }, [category])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return { products, loading, refresh }
}

export function useProductsByBrand(brandId: string | undefined) {
  const [products, setProducts] = useState<Product[]>(() =>
    brandId ? getFallbackByBrand(brandId) : [],
  )
  const [loading, setLoading] = useState(() => Boolean(brandId) && isSupabaseConfigured)

  const refresh = useCallback(async () => {
    if (!brandId) {
      setProducts([])
      setLoading(false)
      return
    }

    if (isSupabaseConfigured) setLoading(true)
    try {
      const data = await getProductsByBrand(brandId)
      setProducts(data)
    } finally {
      setLoading(false)
    }
  }, [brandId])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return { products, loading, refresh }
}

export function useProduct(id: string | undefined) {
  const [product, setProduct] = useState<Product | null>(() =>
    id ? (getCachedProductById(id) ?? null) : null,
  )
  const [loading, setLoading] = useState(() => {
    if (!id) return false
    return getCachedProductById(id) === undefined
  })

  useEffect(() => {
    if (!id) {
      setProduct(null)
      setLoading(false)
      return
    }

    const cached = getCachedProductById(id)
    if (cached) {
      setProduct(cached)
      setLoading(false)
    } else {
      setProduct(null)
      setLoading(true)
    }

    let active = true

    getProductById(id)
      .then((data) => {
        if (active) setProduct(data)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [id])

  return { product, loading }
}

export function useFeaturedProducts() {
  const { products } = useProducts()

  return {
    featuredWatches: products.filter((p) => p.category === 'watches').slice(0, 6),
    featuredBags: products.filter((p) => p.category === 'bags').slice(0, 6),
    featuredJewelry: products.filter((p) => p.category === 'jewelry').slice(0, 6),
  }
}
