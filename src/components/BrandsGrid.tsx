import { Link } from 'react-router-dom'
import type { Brand } from '@/types/brand'
import { BrandLogo } from '@/components/BrandLogo'

interface BrandsGridProps {
  brands: Brand[]
  linkPrefix?: string
  showAllLink?: string
  centered?: boolean
}

export function BrandsGrid({
  brands,
  linkPrefix = '/markalar',
  showAllLink,
  centered = false,
}: BrandsGridProps) {
  return (
    <div className={`brands-section${centered ? ' brands-section--centered' : ''}`}>
      <div className="brands-grid">
        {brands.map((brand) => (
          <Link key={brand.id} to={`${linkPrefix}/${brand.id}`} className="brand-card">
            <BrandLogo brand={brand} />
            <span>{brand.name}</span>
          </Link>
        ))}
      </div>
      {showAllLink && (
        <div className="brands-section-footer">
          <Link to={showAllLink} className="black">
            Bütün brendlər...
          </Link>
        </div>
      )}
    </div>
  )
}
