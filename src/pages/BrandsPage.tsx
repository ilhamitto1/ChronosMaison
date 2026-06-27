import { BrandsGrid } from '@/components/BrandsGrid'
import { brands } from '@/data/brands'

export function BrandsPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Brendlər</h1>
          <p>Ən prestijli dünya saat və çanta brendləri</p>
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
