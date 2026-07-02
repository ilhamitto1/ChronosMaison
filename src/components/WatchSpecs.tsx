import { WatchSpecTable } from '@/components/WatchSpecTable'
import { formatWatchSpecLine, hasWatchSpecs } from '@/lib/watchSpecs'
import type { Product } from '@/types/product'

interface WatchSpecsProps {
  product: Product
  variant?: 'card' | 'detail' | 'footer'
}

export function WatchSpecs({ product, variant = 'card' }: WatchSpecsProps) {
  if (product.category !== 'watches' || !hasWatchSpecs(product)) return null

  if (variant === 'footer') {
    const line = formatWatchSpecLine(product)
    if (!line) return null
    return <span className="watch-specs watch-specs--footer">{line}</span>
  }

  if (variant === 'detail') {
    return <WatchSpecTable product={product} />
  }

  const line = formatWatchSpecLine(product)
  if (!line) return null
  return <p className="watch-specs watch-specs--card">{line}</p>
}
