import { useParams } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { LuxuryLoader } from '@/components/LuxuryLoader'
import { ProductBackNav } from '@/components/ProductBackNav'
import { ProductBadges } from '@/components/ProductBadges'
import { ProductPriceDisplay } from '@/components/ProductPriceDisplay'
import { WatchSpecs } from '@/components/WatchSpecs'
import { useProduct } from '@/hooks/useProducts'
import {
  buildProductWhatsAppMessage,
  isPriceOnRequest,
  isSold,
} from '@/lib/productStatus'
import { hasWatchSpecs } from '@/lib/watchSpecs'
import { buildWhatsAppUrl } from '@/lib/utils'

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
  const whatsAppHref = buildWhatsAppUrl(buildProductWhatsAppMessage(product))
  const sold = isSold(product)
  const inquiry = isPriceOnRequest(product)
  const ctaLabel = sold ? 'Oxşar model soruş' : 'Qiymət sorğu ilə'
  const stickyCtaLabel = sold ? 'Soruş' : inquiry ? 'Qiymət sorğu ilə' : 'Sorğu göndər'
  const note = sold
    ? 'Bu məhsul satılıb. Oxşar model və ya digər variantlar üçün WhatsApp ilə yazın.'
    : inquiry
      ? 'Qiymət sorğu ilədir. WhatsApp vasitəsilə bizimlə əlaqə saxlayın.'
      : 'Ətraflı məlumat və qiymət sorğusu üçün WhatsApp vasitəsilə bizimlə əlaqə saxlayın.'

  if (product.category === 'watches') {
    return (
      <div className={`page-content product-detail product-detail--watch${sold ? ' product-detail--sold' : ''}`}>
        <div className="container container--watch-detail">
          <ProductBackNav to={back.to} label={back.label} />

          <article className="watch-detail">
            <div className="watch-detail__layout">
              <div className="watch-detail__media">
                <ProductBadges product={product} className="product-badges--detail" />
                <img src={product.image} alt={product.name} />
              </div>

              <div className="watch-detail__panel">
                <header className="watch-detail__head">
                  {product.brand && <p className="product-detail-brand">{product.brand}</p>}
                  <h1>{product.name}</h1>
                  <ProductPriceDisplay product={product} className="product-detail-price" />
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
                    {ctaLabel}
                  </a>
                  <p className="product-detail-note">{note}</p>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className="watch-detail__sticky-cta">
          <div className="watch-detail__sticky-price">
            <ProductPriceDisplay product={product} compact />
          </div>
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className="ins-btn watch-detail__cta watch-detail__cta--sticky"
          >
            <MessageCircle aria-hidden="true" />
            {stickyCtaLabel}
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className={`page-content product-detail${sold ? ' product-detail--sold' : ''}`}>
      <div className="container">
        <ProductBackNav to={back.to} label={back.label} />
        <div className="product-detail-grid">
          <div
            className={`product-detail-image${product.category === 'bags' ? ' product-detail-image--bag' : ''}`}
          >
            <ProductBadges product={product} className="product-badges--detail" />
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-detail-info">
            <p className="product-detail-brand">{product.brand}</p>
            <h1>{product.name}</h1>
            <ProductPriceDisplay product={product} className="product-detail-price" />
            <p className="product-detail-description">{product.description}</p>
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ins-btn"
            >
              <MessageCircle aria-hidden="true" />
              {ctaLabel}
            </a>
            <p className="product-detail-note">{note}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
