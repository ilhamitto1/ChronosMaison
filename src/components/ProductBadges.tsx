import type { Product } from '@/types/product'
import {
  getDiscountPercent,
  hasDiscount,
  isSold,
} from '@/lib/productStatus'

interface ProductBadgesProps {
  product: Product
  /** Kart: şəkil üzərində; detail: media üzərində */
  className?: string
}

/**
 * Prioritet: Satıldı > Endirim.
 * Satıldı olanda endirim göstərilmir.
 */
export function ProductBadges({ product, className = '' }: ProductBadgesProps) {
  if (isSold(product)) {
    return (
      <div className={`product-badges ${className}`.trim()}>
        <span className="product-badge product-badge--sold">Satıldı</span>
      </div>
    )
  }

  if (hasDiscount(product)) {
    const percent = getDiscountPercent(product)
    if (percent == null) return null
    return (
      <div className={`product-badges ${className}`.trim()}>
        <span className="product-badge product-badge--discount">-{percent}%</span>
      </div>
    )
  }

  return null
}
