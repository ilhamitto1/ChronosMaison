import { useParams } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { LuxuryLoader } from '@/components/LuxuryLoader'
import { ProductBackNav } from '@/components/ProductBackNav'
import { WatchSpecs } from '@/components/WatchSpecs'
import { useProduct } from '@/hooks/useProducts'
import { hasWatchSpecs } from '@/lib/watchSpecs'
import { buildWhatsAppUrl, formatPrice } from '@/lib/utils'

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { product, loading } = useProduct(id)

  if (loading) {
    return (
      <div className="page-content product-detail product-detail--loading">
        <LuxuryLoader label="Məhsul yüklənir..." />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="page-content product-detail">
        <div className="container">
          <ProductBackNav to="/watches" label="Saatlara qayıt" />
          <div className="product-detail-empty">
            <h1>Məhsul tapılmadı</h1>
            <p>Seçilmiş məhsul mövcud deyil və ya silinib.</p>
          </div>
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
  const whatsAppHref = buildWhatsAppUrl(message)

  if (product.category === 'watches') {
    return (
      <div className="page-content product-detail product-detail--watch">
        <div className="container container--watch-detail">
          <ProductBackNav to={back.to} label={back.label} />

          <article className="watch-detail">
            <div className="watch-detail__layout">
              <div className="watch-detail__media">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="watch-detail__panel">
                <header className="watch-detail__head">
                  {product.brand && <p className="product-detail-brand">{product.brand}</p>}
                  <h1>{product.name}</h1>
                  <p className="product-detail-price">{formatPrice(product.price)}</p>
                </header>

                <div className="watch-detail__divider" aria-hidden="true" />

                {hasWatchSpecs(product) && (
                  <section className="watch-detail__specs" aria-label="Saat xüsusiyyətləri">
                    <h2 className="watch-detail__specs-title">Xüsusiyyətlər</h2>
                    <WatchSpecs product={product} variant="detail" />
                  </section>
                )}

                <div className="watch-detail__actions watch-detail__actions--inline">
                  <a
                    href={whatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ins-btn watch-detail__cta"
                  >
                    <MessageCircle aria-hidden="true" />
                    Qiymət sorğu ilə
                  </a>
                  <p className="product-detail-note">
                    Ətraflı məlumat və qiymət sorğusu üçün WhatsApp vasitəsilə bizimlə əlaqə saxlayın.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className="watch-detail__sticky-cta">
          <div className="watch-detail__sticky-price">{formatPrice(product.price)}</div>
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className="ins-btn watch-detail__cta watch-detail__cta--sticky"
          >
            <MessageCircle aria-hidden="true" />
            Sorğu göndər
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="page-content product-detail">
      <div className="container">
        <ProductBackNav to={back.to} label={back.label} />
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
              href={whatsAppHref}
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
