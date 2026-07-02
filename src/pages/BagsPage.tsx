import { BrandsGrid } from '@/components/BrandsGrid'
import { PageHero } from '@/components/PageHero'
import { PageSectionHeading } from '@/components/PageSectionHeading'
import { ProductGrid } from '@/components/ProductGrid'
import { useBrandsByCategory } from '@/hooks/useBrands'
import { useProductsByCategory } from '@/hooks/useProducts'

export function BagsPage() {
  const bagBrands = useBrandsByCategory('bags')
  const { products: bags, loading } = useProductsByCategory('bags')

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
            <ProductGrid items={bags} loading={loading} emptyMessage="Hazırda çanta yoxdur." />
          </section>
        </div>
      </div>
    </>
  )
}
