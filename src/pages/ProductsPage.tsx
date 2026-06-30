import { ProductGrid } from '@/components/ProductGrid'
import { useProducts } from '@/hooks/useProducts'

export function ProductsPage() {
  const { products } = useProducts()

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
