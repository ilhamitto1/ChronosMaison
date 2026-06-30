import { BrandsGrid } from '@/components/BrandsGrid'
import { PageHero } from '@/components/PageHero'
import { PageSectionHeading } from '@/components/PageSectionHeading'
import { ProductGrid } from '@/components/ProductGrid'
import { useBrandsByCategory } from '@/hooks/useBrands'
import { useProductsByCategory } from '@/hooks/useProducts'

export function JewelryPage() {
  const jewelryBrands = useBrandsByCategory('jewelry')
  const { products: jewelry } = useProductsByCategory('jewelry')

  return (
    <>
      <PageHero title="Zinət əşyaları" />
      <div className="page-content">
        <div className="container">
          <section className="page-section">
            <PageSectionHeading title="Brendlər" />
            <BrandsGrid brands={jewelryBrands} showAllLink="/brends" />
          </section>

          <section className="page-section">
            <PageSectionHeading title="Zinət əşyaları" />
            <ProductGrid
              items={jewelry}
              emptyMessage="Hazırda zinət əşyası yoxdur."
            />
          </section>
        </div>
      </div>
    </>
  )
}
