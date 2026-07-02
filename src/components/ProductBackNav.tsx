import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

interface ProductBackNavProps {
  to: string
  label: string
}

export function ProductBackNav({ to, label }: ProductBackNavProps) {
  return (
    <nav className="product-back-nav" aria-label="Geri naviqasiya">
      <Link to={to} className="product-back-nav__link">
        <span className="product-back-nav__icon" aria-hidden="true">
          <ChevronLeft strokeWidth={1.75} />
        </span>
        <span className="product-back-nav__label">{label}</span>
      </Link>
    </nav>
  )
}
