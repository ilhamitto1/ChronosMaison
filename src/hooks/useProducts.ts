import { useCallback, useEffect, useState } from 'react'
import { fallbackProducts } from '@/data/fallbackProducts'
import {
  getAllProducts,
  getProductById,
  getProductsByBrand,
  getProductsByCategory,
} from '@/services/productService'
import type { ProductCategory } from '@/types/database'
import type { Product } from '@/types/product'

function getFallbackByCategory(category: ProductCategory) {
  return fallbackProducts.filter((p) => p.category === category)
}

function getFallbackByBrand(brandId: string) {
  return fallbackProducts.filter((p) => p.brandId === brandId)
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts)

  const refresh = useCallback(async () => {
    const data = await getAllProducts()
    setProducts(data)
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return { products, refresh }
}

export function useProductsByCategory(category: ProductCategory) {
  const [products, setProducts] = useState<Product[]>(() => getFallbackByCategory(category))

  const refresh = useCallback(async () => {
    const data = await getProductsByCategory(category)
    setProducts(data)
  }, [category])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return { products, refresh }
}

export function useProductsByBrand(brandId: string | undefined) {
  const [products, setProducts] = useState<Product[]>(() =>
    brandId ? getFallbackByBrand(brandId) : [],
  )

  const refresh = useCallback(async () => {
    if (!brandId) {
      setProducts([])
      return
    }
    const data = await getProductsByBrand(brandId)
    setProducts(data)
  }, [brandId])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return { products, refresh }
}

export function useProduct(id: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) {
      setProduct(null)
      setLoading(false)
      return
    }

    let active = true
    setLoading(true)

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
