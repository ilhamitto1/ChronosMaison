import { Link, useParams } from 'react-router-dom'
import { getBrandById } from '@/data/brands'
import { getProductsByBrand } from '@/data/products'
import { ProductGrid } from '@/components/ProductGrid'
import { BrandLogo } from '@/components/BrandLogo'
import { buildWhatsAppUrl } from '@/lib/utils'

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

  const whatsappMsg = `Salam, ${brand.name} brendi üzrə məhsullarla maraqlanıram.`

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <BrandLogo brand={brand} className="brand-page-logo" />
          <h1>{brand.name}</h1>
          <p>{brand.name} kolleksiyası</p>
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          {items.length > 0 ? (
            <ProductGrid items={items} />
          ) : (
            <div className="products-empty">
              <p>
                {brand.name} brendi üzrə məhsullar tezliklə əlavə olunacaq. Ətraflı məlumat və qiymət
                sorğusu üçün bizimlə əlaqə saxlayın.
              </p>
              <a
                href={buildWhatsAppUrl(whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="ins-btn"
                style={{ display: 'inline-flex', marginTop: 16 }}
              >
                Qiymət sorğu ilə
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
