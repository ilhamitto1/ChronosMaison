import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { brands } from '@/data/brands'
import { BrandLogo } from '@/components/BrandLogo'

export function BrandsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'prev' | 'next') => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'next' ? el.clientWidth * 0.75 : -el.clientWidth * 0.75, behavior: 'smooth' })
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
                    <button type="button">Bütün saatlara bax</button>
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
