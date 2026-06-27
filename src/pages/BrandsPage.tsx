import { Link } from 'react-router-dom'
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
          <div className="brands-grid">
            {brands.map((brand) => (
              <Link key={brand.id} to={`/markalar/${brand.id}`} className="brand-card">
                {brand.logo ? (
                  <img src={brand.logo} alt={brand.name} />
                ) : (
                  <div className="brand-name-fallback" style={{ height: 80, fontSize: 14 }}>
                    {brand.name}
                  </div>
                )}
                <span>{brand.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
