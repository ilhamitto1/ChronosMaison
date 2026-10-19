import { ProductGrid } from '@/components/ProductGrid'
import { useProductsByCategory } from '@/hooks/useProducts'

export function OtherPage() {
  const { products, loading } = useProductsByCategory('other')

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Digər</h1>
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          <ProductGrid
            items={products}
            loading={loading}
            emptyMessage="Hazırda məhsul yoxdur."
          />
        </div>
      </div>
    </>
  )
}
