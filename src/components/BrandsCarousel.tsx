import { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { brands, type Brand } from '@/data/brands'
import { BrandLogo } from '@/components/BrandLogo'

function brandCtaLabel(category: Brand['category']) {
  switch (category) {
    case 'bags':
      return 'Çantalara bax'
    case 'jewelry':
      return 'Zinətə bax'
    case 'both':
      return 'Kolleksiyaya bax'
    default:
      return 'Saatlara bax'
  }
}

export function BrandsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  const getScrollStep = useCallback(() => {
    const el = trackRef.current
    if (!el) return 0
    const card = el.querySelector<HTMLElement>('.brend')
    if (!card) return el.clientWidth
    const gap = parseFloat(getComputedStyle(el).gap) || 4
    return card.offsetWidth + gap
  }, [])

  const scroll = (dir: 'prev' | 'next') => {
    const el = trackRef.current
    if (!el) return
    const step = getScrollStep()
    el.scrollBy({ left: dir === 'next' ? step : -step, behavior: 'smooth' })
  }

  return (
    <div className="subCategory">
      <div className="container">
        <h2 className="brendTitle">Brendlər</h2>
        <div className="brands-carousel-wrap">
          <button type="button" className="carousel-nav-btn prev" aria-label="Əvvəlki" onClick={() => scroll('prev')}>
            ‹
          </button>
          <div className="brands-carousel" ref={trackRef}>
            {brands.map((brand, i) => (
              <motion.div
                key={brand.id}
                className="brend"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: (i % 4) * 0.05, duration: 0.45 }}
              >
                <div className="item">
                  <Link className="category" to={`/markalar/${brand.id}`}>
                    <div className="brand-logo-wrap">
                      <BrandLogo brand={brand} />
                    </div>
                    <span className="brand-cta">{brandCtaLabel(brand.category)}</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <button type="button" className="carousel-nav-btn next" aria-label="Növbəti" onClick={() => scroll('next')}>
            ›
          </button>
        </div>
      </div>
    </div>
  )
}
