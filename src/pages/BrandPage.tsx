import { Link, useParams } from 'react-router-dom'
import { getBrandById } from '@/data/brands'
import { getProductsByBrand } from '@/data/products'
import { ProductGrid } from '@/components/ProductGrid'

export function BrandPage() {
  const { slug } = useParams<{ slug: string }>()
  const brand = slug ? getBrandById(slug) : undefined
  const items = slug ? getProductsByBrand(slug) : []

  if (!brand) {
    return (
      <div className="page-content">
        <div className="container">
          <h1 style={{ color: 'var(--gold-light)' }}>Brend tapılmadı</h1>
          <Link to="/brends" style={{ color: 'var(--gold)' }}>
            Bütün brendlər
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          {brand.logo && (
            <img
              src={brand.logo}
              alt={brand.name}
              style={{
                height: 80,
                objectFit: 'contain',
                filter: 'grayscale(1) invert(1) brightness(9.5)',
                marginBottom: 16,
              }}
            />
          )}
          <h1>{brand.name}</h1>
          <p>{brand.name} saat kolleksiyası</p>
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          {items.length > 0 ? (
            <ProductGrid items={items} />
          ) : (
            <p className="about-desc">
              Bu brend üzrə məhsullar tezliklə əlavə olunacaq. Qiymət sorğusu üçün bizimlə əlaqə
              saxlayın.
            </p>
          )}
        </div>
      </div>
    </>
  )
}
