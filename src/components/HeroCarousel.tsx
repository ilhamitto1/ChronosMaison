import { BRAND } from '@/lib/constants'
import { InstagramIcon } from '@/components/icons/InstagramIcon'

export function HeroCarousel() {
  return (
    <section className="carousel" aria-label="Chronos Maison">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="carousel-media">
            <img
              className="hero-banner"
              src="/assets/banners/herosection.png"
              alt={BRAND.name}
              fetchPriority="high"
              decoding="async"
            />
            <div className="hero-overlay" aria-hidden="true" />
          </div>

          <div className="caption">
            <div className="container">
              <div className="cap-row">
                <div className="text">
                  <p>
                    <a href={`tel:${BRAND.phoneTel}`} className="d-block text-white">
                      Tel: {BRAND.phone}
                    </a>
                    <span className="d-block">Ünvan: {BRAND.address}</span>
                  </p>
                </div>
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ins-btn"
                >
                  <InstagramIcon />
                  INSTAGRAMDA BİZİ İZLƏYİN
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
