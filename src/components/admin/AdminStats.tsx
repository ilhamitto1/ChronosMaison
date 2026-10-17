import { Briefcase, Gem, Layers, Package, Watch } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PRODUCT_CATEGORY_OPTIONS } from '@/lib/productCategories'
import type { Product } from '@/types/product'
import type { ProductCategory } from '@/types/database'

interface AdminStatsProps {
  products: Product[]
}

const CATEGORY_ICONS: Record<ProductCategory, LucideIcon> = {
  watches: Watch,
  bags: Briefcase,
  jewelry: Gem,
  other: Layers,
}

export function AdminStats({ products }: AdminStatsProps) {
  const counts = {
    total: products.length,
    ...Object.fromEntries(
      PRODUCT_CATEGORY_OPTIONS.map((option) => [
        option.value,
        products.filter((p) => p.category === option.value).length,
      ]),
    ),
  } as Record<'total' | ProductCategory, number>

  const items: { key: 'total' | ProductCategory; label: string; icon: LucideIcon }[] = [
    { key: 'total', label: 'Cəmi', icon: Package },
    ...PRODUCT_CATEGORY_OPTIONS.map((option) => ({
      key: option.value,
      label: option.value === 'jewelry' ? 'Zinət' : option.label,
      icon: CATEGORY_ICONS[option.value],
    })),
  ]

  return (
    <div className="admin-stats">
      {items.map(({ key, label, icon: Icon }) => (
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
