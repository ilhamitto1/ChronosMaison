import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { brands } from '@/data/brands'

export function BrandsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'prev' | 'next') => {
    const el = trackRef.current
    if (!el) return
    const amount = el.clientWidth * 0.8
    el.scrollBy({ left: dir === 'next' ? amount : -amount, behavior: 'smooth' })
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
            {brands.map((brand) => (
              <div key={brand.id} className="brend">
                <div className="item">
                  <Link className="category" to={`/markalar/${brand.id}`}>
                    {brand.logo ? (
                      <img src={brand.logo} alt={brand.name} />
                    ) : (
                      <div className="brand-name-fallback">{brand.name}</div>
                    )}
                    <button type="button">Bütün saatlara bax</button>
                  </Link>
                </div>
              </div>
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
