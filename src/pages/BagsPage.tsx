import { ProductGrid } from '@/components/ProductGrid'
import { getProductsByCategory } from '@/data/products'

export function BagsPage() {
  const bags = getProductsByCategory('bags')

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Çantalar</h1>
          <p>Eksklüziv dizayner çantalar kolleksiyamız</p>
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          <ProductGrid items={bags} />
        </div>
      </div>
    </>
  )
}
