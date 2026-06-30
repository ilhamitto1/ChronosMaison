import { Download, Pencil, Trash2 } from 'lucide-react'
import { formatAdminPrice } from '@/lib/utils'
import type { Product } from '@/types/product'
import type { ProductCategory } from '@/types/database'

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  watches: 'Saatlar',
  bags: 'Çantalar',
  jewelry: 'Zinət əşyaları',
}

interface ProductTableProps {
  products: Product[]
  loading: boolean
  catalogEmpty?: boolean
  importing?: boolean
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
  onCreate: () => void
  onImportCatalog?: () => void
}

function ProductRow({
  product,
  onEdit,
  onDelete,
}: {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}) {
  return (
    <tr>
      <td>
        <div className="admin-table__product">
          <img src={product.image} alt={product.name} className="admin-table__thumb" loading="lazy" />
          <span className="admin-table__title">{product.name}</span>
        </div>
      </td>
      <td>
        <span className="admin-badge">{CATEGORY_LABELS[product.category]}</span>
      </td>
      <td>{product.brand || '—'}</td>
      <td className="admin-table__price">{formatAdminPrice(product.price)}</td>
      <td>
        <div className="admin-table__actions">
          <button
            type="button"
            className="admin-btn admin-btn--ghost admin-btn--icon"
            onClick={() => onEdit(product)}
            aria-label="Redaktə et"
            title="Redaktə et"
          >
            <Pencil />
          </button>
          <button
            type="button"
            className="admin-btn admin-btn--danger admin-btn--icon"
            onClick={() => onDelete(product)}
            aria-label="Sil"
            title="Sil"
          >
            <Trash2 />
          </button>
        </div>
      </td>
    </tr>
  )
}

function ProductCard({
  product,
  onEdit,
  onDelete,
}: {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}) {
  return (
    <article className="admin-product-card">
      <div className="admin-product-card__media">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="admin-product-card__content">
        <div className="admin-product-card__head">
          <div className="admin-product-card__titles">
            <strong>{product.name}</strong>
            {product.brand && <span className="admin-product-card__brand">{product.brand}</span>}
          </div>
          <span className="admin-table__price">{formatAdminPrice(product.price)}</span>
        </div>
        <div className="admin-product-card__footer">
          <span className="admin-badge">{CATEGORY_LABELS[product.category]}</span>
          <div className="admin-product-card__actions">
            <button
              type="button"
              className="admin-btn admin-btn--ghost admin-btn--icon"
              onClick={() => onEdit(product)}
              aria-label="Redaktə et"
            >
              <Pencil />
            </button>
            <button
              type="button"
              className="admin-btn admin-btn--danger admin-btn--icon"
              onClick={() => onDelete(product)}
              aria-label="Sil"
            >
              <Trash2 />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export function ProductTable({
  products,
  loading,
  catalogEmpty = false,
  importing = false,
  onEdit,
  onDelete,
  onCreate,
  onImportCatalog,
}: ProductTableProps) {
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

  if (products.length === 0) {
    return (
      <div className="admin-surface admin-empty">
        <PackageIcon />
        <h3>{catalogEmpty ? 'Kataloq boşdur' : 'Məhsul tapılmadı'}</h3>
        <p>
          {catalogEmpty
            ? 'Saytdakı 19 məhsulu (saat, çanta, zinət) bir kliklə əlavə edin və ya əl ilə yeni məhsul yaradın.'
            : 'Filtrə uyğun məhsul yoxdur. Başqa axtarış və ya kateqoriya sınayın.'}
        </p>
        <div className="admin-empty__actions">
          {catalogEmpty && onImportCatalog && (
            <button
              type="button"
              className="admin-btn admin-btn--primary"
              onClick={onImportCatalog}
              disabled={importing}
            >
              <Download />
              {importing ? 'Əlavə olunur...' : 'Kataloqu idxal et (19)'}
            </button>
          )}
          <button type="button" className="admin-btn admin-btn--ghost" onClick={onCreate}>
            {catalogEmpty ? 'Əl ilə əlavə et' : 'Yeni məhsul'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-surface admin-surface--list">
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Məhsul</th>
              <th>Kateqoriya</th>
              <th>Brend</th>
              <th>Qiymət</th>
              <th aria-label="Əməliyyatlar" />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-product-cards">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}

function PackageIcon() {
  return (
    <svg
      className="admin-empty__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12" />
    </svg>
  )
}
