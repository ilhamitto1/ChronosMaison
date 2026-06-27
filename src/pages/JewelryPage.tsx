import { BrandsGrid } from '@/components/BrandsGrid'
import { PageHero } from '@/components/PageHero'
import { ProductGrid } from '@/components/ProductGrid'
import { jewelryBrands } from '@/data/brands'
import { getProductsByCategory } from '@/data/products'

export function JewelryPage() {
  const jewelry = getProductsByCategory('jewelry')

  return (
    <>
      <PageHero
        title="Zinət əşyaları"
        subtitle="Brilyant, qızıl və eksklüziv zərgərlik kolleksiyamız"
        image="/assets/banners/jewelry.jpg"
      />
      <div className="page-content">
        <div className="container">
          <h2 className="section-page-title">Brendlər</h2>
          <p className="section-page-desc">
            Dünyanın ən prestijli zərgərlik evlərinin orijinal kolleksiyaları
          </p>
          <BrandsGrid brands={jewelryBrands} showAllLink="/brends" />

          <h2 className="section-page-title" style={{ marginTop: 56 }}>
            Zinət əşyaları kolleksiyası
          </h2>
          <ProductGrid
            items={jewelry}
            emptyMessage="Zinət əşyaları kolleksiyası tezliklə yenilənəcək."
          />
        </div>
      </div>
    </>
  )
}
