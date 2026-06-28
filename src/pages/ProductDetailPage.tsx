import { Link, useParams } from 'react-router-dom'
import { products } from '@/data/products'
import { buildWhatsAppUrl, formatPrice } from '@/lib/utils'

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="page-content">
        <div className="container">
          <h1 style={{ color: 'var(--gold-light)' }}>Məhsul tapılmadı</h1>
          <Link to="/watches" style={{ color: 'var(--gold)' }}>
            Saatlara qayıt
          </Link>
        </div>
      </div>
    )
  }

  const backPaths = {
    bags: { to: '/bags', label: 'Çantalara qayıt' },
    jewelry: { to: '/jewelry', label: 'Zinət əşyalarına qayıt' },
    watches: { to: '/watches', label: 'Saatlara qayıt' },
  } as const
  const back = backPaths[product.category]
  const message = `Salam, ${product.name} məhsulu ilə maraqlanıram. Qiymət: ${formatPrice(product.price)}`

  return (
    <div className="page-content product-detail">
      <div className="container">
        <Link to={back.to} className="product-back-link">
          ← {back.label}
        </Link>
        <div className="product-detail-grid">
          <div className={`product-detail-image${product.category === 'bags' ? ' product-detail-image--bag' : ''}`}>
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-detail-info">
            <p className="product-detail-brand">{product.brand}</p>
            <h1>{product.name}</h1>
            <p className="product-detail-price">{formatPrice(product.price)}</p>
            <p className="product-detail-description">{product.description}</p>
            <a
              href={buildWhatsAppUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="ins-btn"
            >
              Qiymət sorğu ilə
            </a>
            <p className="product-detail-note">
              Ətraflı məlumat və qiymət sorğusu üçün WhatsApp vasitəsilə bizimlə əlaqə saxlayın.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
