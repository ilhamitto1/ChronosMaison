import { ProductGrid } from '@/components/ProductGrid'
import { products } from '@/data/products'

export function ProductsPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Yeni daxil olmuş məhsullar</h1>
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          <ProductGrid items={products} />
        </div>
      </div>
    </>
  )
}
