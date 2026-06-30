import { useState } from 'react'
import { PageHero } from '@/components/PageHero'
import { ProductGrid } from '@/components/ProductGrid'
import { watchBrands } from '@/data/brands'
import { useProductsByCategory } from '@/hooks/useProducts'

export function WatchesPage() {
  const [activeBrand, setActiveBrand] = useState<string | null>(null)
  const { products: watches } = useProductsByCategory('watches')
  const filtered = activeBrand
    ? watches.filter((p) => p.brandId === activeBrand)
    : watches

  return (
    <>
      <PageHero title="Saatlar" />
      <div className="page-content">
        <div className="container">
          <div className="filterr">
            <button
              type="button"
              className={!activeBrand ? 'active' : ''}
              onClick={() => setActiveBrand(null)}
            >
              Hamısı
            </button>
            {watchBrands.map((b) => (
              <button
                key={b.id}
                type="button"
                className={activeBrand === b.id ? 'active' : ''}
                onClick={() => setActiveBrand(b.id)}
              >
                {b.name}
              </button>
            ))}
          </div>
          <ProductGrid
            items={filtered}
            emptyMessage="Bu brend üzrə saatlar tezliklə əlavə olunacaq. Qiymət sorğusu üçün bizimlə əlaqə saxlayın."
          />
        </div>
      </div>
    </>
  )
}
