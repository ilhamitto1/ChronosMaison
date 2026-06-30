import { Briefcase, Gem, Package, Watch } from 'lucide-react'
import type { Product } from '@/types/product'

interface AdminStatsProps {
  products: Product[]
}

const STAT_ITEMS = [
  { key: 'total', label: 'Cəmi', icon: Package },
  { key: 'watches', label: 'Saatlar', icon: Watch },
  { key: 'bags', label: 'Çantalar', icon: Briefcase },
  { key: 'jewelry', label: 'Zinət', icon: Gem },
] as const

export function AdminStats({ products }: AdminStatsProps) {
  const counts = {
    total: products.length,
    watches: products.filter((p) => p.category === 'watches').length,
    bags: products.filter((p) => p.category === 'bags').length,
    jewelry: products.filter((p) => p.category === 'jewelry').length,
  }

  return (
    <div className="admin-stats">
      {STAT_ITEMS.map(({ key, label, icon: Icon }) => (
        <div key={key} className="admin-stat-card">
          <div className="admin-stat-card__top">
            <span className="admin-stat-card__label">{label}</span>
            <span className="admin-stat-card__icon" aria-hidden="true">
              <Icon />
            </span>
          </div>
          <span className="admin-stat-card__value">{counts[key]}</span>
        </div>
      ))}
    </div>
  )
}
