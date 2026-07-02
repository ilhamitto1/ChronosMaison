import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { WatchSpecs } from '@/components/WatchSpecs'
import { useBrands } from '@/hooks/useBrands'
import { useFeaturedProducts } from '@/hooks/useProducts'
import { BRAND } from '@/lib/constants'

const FOOTER_BRANDS_UNTIL_ID = 'bovet'

export function Footer() {
  const year = new Date().getFullYear()
  const { brands } = useBrands()
  const { featuredWatches, featuredBags, featuredJewelry } = useFeaturedProducts()
  const [brandsExpanded, setBrandsExpanded] = useState(false)

  const { footerBrandsInitial, footerBrandsRest } = useMemo(() => {
    const cutoffIdx = brands.findIndex((b) => b.id === FOOTER_BRANDS_UNTIL_ID)
    const footerBrandsCutoff = cutoffIdx === -1 ? 9 : cutoffIdx + 1
    return {
      footerBrandsInitial: brands.slice(0, footerBrandsCutoff),
      footerBrandsRest: brands.slice(footerBrandsCutoff),
    }
  }, [brands])

  const visibleBrands = brandsExpanded ? brands : footerBrandsInitial

  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-6">
            <h4>Məlumatlar</h4>
            <p className="footer-intro">{BRAND.intro}</p>
            <ul>
              <li>
                <Link to="/">Ana səhifə</Link>
              </li>
              <li>
                <Link to="/brends">Brendlər</Link>
              </li>
              <li>
                <Link to="/watches">Saatlar</Link>
              </li>
              <li>
                <Link to="/jewelry">Zinət əşyaları</Link>
              </li>
              <li>
                <Link to="/bags">Çantalar</Link>
              </li>
              <li>
                <Link to="/contact">Əlaqə</Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3 col-6">
            <h4>Brendlər</h4>
            <ul className="bre">
              {visibleBrands.map((brand) => (
                <li key={brand.id}>
                  <Link to={`/markalar/${brand.id}`}>{brand.name}</Link>
                </li>
              ))}
            </ul>
            {footerBrandsRest.length > 0 && (
              <button
                type="button"
                className="footer-brands-toggle"
                onClick={() => setBrandsExpanded((open) => !open)}
                aria-expanded={brandsExpanded}
              >
                {brandsExpanded ? 'Gizlət' : 'Bütün brendlər'}
              </button>
            )}
          </div>

          <div className="col-md-3 col-6">
            <h4>Saatlar</h4>
            <ul>
              {featuredWatches.map((p) => (
                <li key={p.id}>
                  <Link to={`/products/${p.id}`}>
                    <span className="footer-product-link">{p.name}</span>
                    <WatchSpecs product={p} variant="footer" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-3 col-6">
            <h4>Zinət əşyaları</h4>
            <ul>
              {featuredJewelry.map((p) => (
                <li key={p.id}>
                  <Link to={`/products/${p.id}`}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-3 col-6">
            <h4>Çantalar</h4>
            <ul>
              {featuredBags.map((p) => (
                <li key={p.id}>
                  <Link to={`/products/${p.id}`}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-3 col-6">
            <h4>Əlaqə</h4>
            <ul>
              <li>
                <a href={`tel:${BRAND.phoneTel}`}>{BRAND.phone}</a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="social">
          <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a href={BRAND.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>
        </div>

        <div className="footerBottom">
          <span>
            © {year} {BRAND.fullName}, Bütün hüquqlar qorunur.
          </span>
        </div>
      </div>
    </footer>
  )
}
