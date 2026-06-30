import { BrandsGrid } from '@/components/BrandsGrid'
import { PageHero } from '@/components/PageHero'
import { PageSectionHeading } from '@/components/PageSectionHeading'
import { ProductGrid } from '@/components/ProductGrid'
import { bagBrands } from '@/data/brands'
import { useProductsByCategory } from '@/hooks/useProducts'

export function BagsPage() {
  const { products: bags } = useProductsByCategory('bags')

  return (
    <>
      <PageHero title="Çantalar" />
      <div className="page-content">
        <div className="container">
          <section className="page-section">
            <PageSectionHeading title="Brendlər" />
            <BrandsGrid brands={bagBrands} showAllLink="/brends" centered />
          </section>

          <section className="page-section">
            <PageSectionHeading title="Çantalar" />
            <ProductGrid items={bags} emptyMessage="Hazırda çanta yoxdur." />
          </section>
        </div>
      </div>
    </>
  )
}
