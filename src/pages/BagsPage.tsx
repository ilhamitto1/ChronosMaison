import { BrandsGrid } from '@/components/BrandsGrid'
import { PageHero } from '@/components/PageHero'
import { PageSectionHeading } from '@/components/PageSectionHeading'
import { ProductGrid } from '@/components/ProductGrid'
import { bagBrands } from '@/data/brands'
import { getProductsByCategory } from '@/data/products'

export function BagsPage() {
  const bags = getProductsByCategory('bags')

  return (
    <>
      <PageHero
        title="Çantalar"
        image="/assets/banners/bags.jpg"
        imagePosition="center 40%"
      />
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
