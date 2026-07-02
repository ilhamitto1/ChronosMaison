import { Link } from 'react-router-dom'
import type { Product } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { ProductGridSkeleton } from '@/components/ProductGridSkeleton'
import { WatchSpecs } from '@/components/WatchSpecs'

interface ProductGridProps {
  items: Product[]
  loading?: boolean
  emptyMessage?: string
}

export function ProductGrid({ items, loading = false, emptyMessage }: ProductGridProps) {
  if (loading) {
    return <ProductGridSkeleton />
  }

  if (items.length === 0) {
    return (
      <div className="products-empty">
        <p>{emptyMessage ?? 'Bu bölmədə hələ məhsul yoxdur.'}</p>
        <Link to="/contact" className="ins-btn" style={{ display: 'inline-flex', marginTop: 16 }}>
          Əlaqə saxlayın
        </Link>
      </div>
    )
  }

  return (
    <div className="products2">
      <div className="grid">
        {items.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`} className="product">
            {product.category === 'bags' ? (
              <div className="product-media product-media--bag">
                <img src={product.image} alt={product.name} loading="lazy" />
              </div>
            ) : (
              <img src={product.image} alt={product.name} loading="lazy" />
            )}
            <div className="content">
              <h3>{product.name}</h3>
              {product.category === 'watches' && <WatchSpecs product={product} variant="card" />}
              <div className="price">{formatPrice(product.price)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
