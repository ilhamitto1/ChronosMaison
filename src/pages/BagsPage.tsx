import { BrandsGrid } from '@/components/BrandsGrid'
import { PageHero } from '@/components/PageHero'
import { ProductGrid } from '@/components/ProductGrid'
import { bagBrands } from '@/data/brands'
import { getProductsByCategory } from '@/data/products'

export function BagsPage() {
  const bags = getProductsByCategory('bags')

  return (
    <>
      <PageHero
        title="Çantalar"
        subtitle="Eksklüziv dizayner çantalar kolleksiyamız"
        image="/assets/banners/bags.jpg"
      />
      <div className="page-content">
        <div className="container">
          <h2 className="section-page-title">Brendlər</h2>
          <p className="section-page-desc">
            Dünyanın ən prestijli moda evlərinin orijinal çantaları
          </p>
          <BrandsGrid brands={bagBrands} showAllLink="/brends" />

          <h2 className="section-page-title" style={{ marginTop: 56 }}>
            Çanta kolleksiyası
          </h2>
          <ProductGrid items={bags} emptyMessage="Çanta kolleksiyası tezliklə yenilənəcək." />
        </div>
      </div>
    </>
  )
}
