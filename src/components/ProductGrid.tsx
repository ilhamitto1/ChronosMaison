import { Link } from 'react-router-dom'
import type { Product } from '@/data/products'
import { formatPrice } from '@/lib/utils'

interface ProductGridProps {
  items: Product[]
}

export function ProductGrid({ items }: ProductGridProps) {
  return (
    <div className="products2">
      <div className="grid">
        {items.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`} className="product">
            <img src={product.image} alt={product.name} loading="lazy" />
            <div className="content">
              <h3>{product.name}</h3>
              <div className="price">{formatPrice(product.price)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
