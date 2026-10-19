import { ProductGrid } from '@/components/ProductGrid'
import { useProducts } from '@/hooks/useProducts'

/** Ana səhifə «Yeni daxil olmuş məhsullar» — bütün kateqoriyalar */
export function ProductsPage() {
  const { products, loading } = useProducts()

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Yeni daxil olmuş məhsullar</h1>
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
