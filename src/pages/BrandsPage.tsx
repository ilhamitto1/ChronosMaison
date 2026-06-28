import { BrandsGrid } from '@/components/BrandsGrid'
import { brands } from '@/data/brands'

export function BrandsPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Brendlər</h1>
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          <BrandsGrid brands={brands} />
        </div>
      </div>
    </>
  )
}
