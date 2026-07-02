import type { ProductCategory } from '@/types/database'
import type { Product } from '@/types/product'

const byCategory = new Map<ProductCategory, Product[]>()
const byId = new Map<string, Product>()
let allProducts: Product[] | null = null

export function getCachedProductsByCategory(category: ProductCategory): Product[] | undefined {
  return byCategory.get(category)
}

export function getCachedProductById(id: string): Product | undefined {
  return byId.get(id)
}

export function getCachedAllProducts(): Product[] | undefined {
  return allProducts ?? undefined
}

export function setCachedProductsByCategory(category: ProductCategory, products: Product[]) {
  byCategory.set(category, products)
  for (const product of products) {
    byId.set(product.id, product)
  }
}

export function setCachedProduct(product: Product) {
  byId.set(product.id, product)
}

export function setCachedAllProducts(products: Product[]) {
  allProducts = products
  const grouped = new Map<ProductCategory, Product[]>()
  for (const product of products) {
    byId.set(product.id, product)
    const list = grouped.get(product.category) ?? []
    list.push(product)
    grouped.set(product.category, list)
  }
  for (const [category, list] of grouped) {
    byCategory.set(category, list)
  }
}

export function invalidateProductCache() {
  byCategory.clear()
  byId.clear()
  allProducts = null
}
