import type { Product } from '@/types/product'
import { formatPrice } from '@/lib/utils'

/** Endirim faizi — original_price > price olduqda. */
export function getDiscountPercent(product: Product): number | null {
  const original = product.originalPrice
  if (original == null || original <= 0) return null
  if (product.priceOnRequest || product.price <= 0) return null
  if (original <= product.price) return null
  return Math.round(((original - product.price) / original) * 100)
}

export function hasDiscount(product: Product): boolean {
  const percent = getDiscountPercent(product)
  return percent != null && percent > 0
}

export function isPriceOnRequest(product: Product): boolean {
  return Boolean(product.priceOnRequest)
}

export function isSold(product: Product): boolean {
  return Boolean(product.isSold)
}

/** Kart / detail üçün qiymət mətni. */
export function getProductPriceLabel(product: Product): string {
  if (isSold(product)) return 'Satıldı'
  if (isPriceOnRequest(product)) return 'Qiymət sorğu ilə'
  return formatPrice(product.price)
}

export function buildProductWhatsAppMessage(product: Product): string {
  if (isSold(product)) {
    return `Salam, ${product.name} məhsulu ilə maraqlanıram. Status: Satıldı — oxşar model varmı?`
  }
  if (isPriceOnRequest(product)) {
    return `Salam, ${product.name} məhsulu ilə maraqlanıram. Qiymət sorğusu göndərirəm.`
  }
  if (hasDiscount(product) && product.originalPrice != null) {
    return `Salam, ${product.name} məhsulu ilə maraqlanıram. Qiymət: ${formatPrice(product.price)} (endirimdən əvvəl ${formatPrice(product.originalPrice)}).`
  }
  return `Salam, ${product.name} məhsulu ilə maraqlanıram. Qiymət: ${formatPrice(product.price)}`
}
