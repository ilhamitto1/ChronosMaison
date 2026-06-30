import { BrandsGrid } from '@/components/BrandsGrid'
import { useBrands } from '@/hooks/useBrands'

export function BrandsPage() {
  const { brands } = useBrands()

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
