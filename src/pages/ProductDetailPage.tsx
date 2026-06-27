import { Link, useParams } from 'react-router-dom'
import { products } from '@/data/products'
import { BRAND } from '@/lib/constants'
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

  const message = `Salam, ${product.name} məhsulu ilə maraqlanıram. Qiymət: ${formatPrice(product.price)}`

  return (
    <>
      <div className="page-content" style={{ paddingTop: 40 }}>
        <div className="container">
          <div className="row" style={{ alignItems: 'flex-start', gap: 24 }}>
            <div className="col-md-3" style={{ flex: '0 0 45%', maxWidth: '45%' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', borderRadius: 5, border: '2px solid var(--border-muted)' }}
              />
            </div>
            <div className="col-md-3" style={{ flex: 1 }}>
              <p style={{ color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: 2 }}>
                {product.brand}
              </p>
              <h1 style={{ fontWeight: 400, color: 'var(--gold-light)', fontSize: 28, margin: '0 0 16px' }}>
                {product.name}
              </h1>
              <p style={{ fontSize: 32, color: 'var(--gold)', margin: '0 0 24px' }}>
                {formatPrice(product.price)}
              </p>
              <a
                href={buildWhatsAppUrl(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="ins-btn"
                style={{ display: 'inline-flex' }}
              >
                Qiymət sorğu ilə
              </a>
              <p style={{ marginTop: 24, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                {BRAND.name} olaraq orijinal və sertifikatlı məhsullar təqdim edirik. Ətraflı məlumat
                üçün WhatsApp vasitəsilə bizimlə əlaqə saxlayın.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
