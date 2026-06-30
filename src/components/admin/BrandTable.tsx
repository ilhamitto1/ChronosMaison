import { Pencil, Trash2 } from 'lucide-react'
import { BrandLogo } from '@/components/BrandLogo'
import type { AdminBrand } from '@/services/brandService'
import type { BrandCategory } from '@/types/brand'

const CATEGORY_LABELS: Record<BrandCategory, string> = {
  watches: 'Saatlar',
  bags: 'Çantalar',
  jewelry: 'Zinət',
  both: 'Hamısı',
}

interface BrandTableProps {
  brands: AdminBrand[]
  loading: boolean
  onEdit: (brand: AdminBrand) => void
  onDelete: (brand: AdminBrand) => void
  onCreate: () => void
}

export function BrandTable({ brands, loading, onEdit, onDelete, onCreate }: BrandTableProps) {
  if (loading) {
    return (
      <div className="admin-surface">
        <div className="admin-skeleton-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="admin-skeleton-row" />
          ))}
        </div>
      </div>
    )
  }

  if (brands.length === 0) {
    return (
      <div className="admin-surface admin-empty">
        <h3>Brend tapılmadı</h3>
        <p>İlk brendi əlavə edin və ya kataloqu idxal edin.</p>
        <button type="button" className="admin-btn admin-btn--primary" onClick={onCreate}>
          Brend əlavə et
        </button>
      </div>
    )
  }

  return (
    <div className="admin-surface admin-surface--list">
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Brend</th>
              <th>Kateqoriya</th>
              <th>Ana səhifə</th>
              <th>Sıra</th>
              <th aria-label="Əməliyyatlar" />
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand.recordId}>
                <td>
                  <div className="admin-table__product">
                    <div className="admin-brand-thumb">
                      <BrandLogo brand={brand} variant="carousel" />
                    </div>
                    <div>
                      <span className="admin-table__title">{brand.name}</span>
                      <span className="admin-brand-slug">/{brand.id}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="admin-badge">{CATEGORY_LABELS[brand.category]}</span>
                </td>
                <td>
                  <span className={`admin-badge${brand.showOnHomepage ? ' admin-badge--success' : ''}`}>
                    {brand.showOnHomepage ? 'Bəli' : 'Xeyr'}
                  </span>
                </td>
                <td>{brand.sortOrder}</td>
                <td>
                  <div className="admin-table__actions">
                    <button
                      type="button"
                      className="admin-btn admin-btn--ghost admin-btn--icon"
                      onClick={() => onEdit(brand)}
                      aria-label="Redaktə et"
                    >
                      <Pencil />
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn--danger admin-btn--icon"
                      onClick={() => onDelete(brand)}
                      aria-label="Sil"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-product-cards">
        {brands.map((brand) => (
          <article key={brand.recordId} className="admin-product-card">
            <div className="admin-brand-thumb admin-brand-thumb--card">
              <BrandLogo brand={brand} variant="carousel" />
            </div>
            <div className="admin-product-card__content">
              <div className="admin-product-card__head">
                <div className="admin-product-card__titles">
                  <strong>{brand.name}</strong>
                  <span className="admin-brand-slug">/{brand.id}</span>
                </div>
              </div>
              <div className="admin-product-card__footer">
                <span className="admin-badge">{CATEGORY_LABELS[brand.category]}</span>
                <div className="admin-product-card__actions">
                  <button
                    type="button"
                    className="admin-btn admin-btn--ghost admin-btn--icon"
                    onClick={() => onEdit(brand)}
                    aria-label="Redaktə et"
                  >
                    <Pencil />
                  </button>
                  <button
                    type="button"
                    className="admin-btn admin-btn--danger admin-btn--icon"
                    onClick={() => onDelete(brand)}
                    aria-label="Sil"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
