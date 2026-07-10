import type { Product } from '@/types/product'
import { formatPrice } from '@/lib/utils'
import {
  hasDiscount,
  isPriceOnRequest,
  isSold,
} from '@/lib/productStatus'

interface ProductPriceDisplayProps {
  product: Product
  className?: string
  /** Kart üçün daha kiçik layout */
  compact?: boolean
}

export function ProductPriceDisplay({
  product,
  className = '',
  compact = false,
}: ProductPriceDisplayProps) {
  const rootClass = [
    'product-price',
    compact ? 'product-price--compact' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (isSold(product)) {
    return <div className={`${rootClass} product-price--sold`}>Satıldı</div>
  }

  if (isPriceOnRequest(product)) {
    return (
      <div className={`${rootClass} product-price--inquiry`}>Qiymət sorğu ilə</div>
    )
  }

  if (hasDiscount(product) && product.originalPrice != null) {
    return (
      <div className={`${rootClass} product-price--sale`}>
        <span className="product-price__current">{formatPrice(product.price)}</span>
        <span className="product-price__original">{formatPrice(product.originalPrice)}</span>
      </div>
    )
  }

  return <div className={rootClass}>{formatPrice(product.price)}</div>
}
