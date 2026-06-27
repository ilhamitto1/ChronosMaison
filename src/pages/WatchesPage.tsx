import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductGrid } from '@/components/ProductGrid'
import { brands } from '@/data/brands'
import { getProductsByCategory } from '@/data/products'

export function WatchesPage() {
  const [activeBrand, setActiveBrand] = useState<string | null>(null)
  const watches = getProductsByCategory('watches')
  const filtered = activeBrand
    ? watches.filter((p) => p.brandId === activeBrand)
    : watches

  const watchBrands = brands.filter((b) =>
    watches.some((w) => w.brandId === b.id),
  )

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Saatlar</h1>
          <p>Elit və luks saat kolleksiyamız</p>
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          <div className="filterr">
            <Link
              to="/watches"
              className={!activeBrand ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault()
                setActiveBrand(null)
              }}
            >
              Hamısı
            </Link>
            {watchBrands.map((b) => (
              <Link
                key={b.id}
                to={`/watches?brand=${b.id}`}
                className={activeBrand === b.id ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveBrand(b.id)
                }}
              >
                {b.name}
              </Link>
            ))}
          </div>
          <ProductGrid items={filtered} />
        </div>
      </div>
    </>
  )
}
