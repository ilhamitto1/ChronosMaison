import { getWatchSpecRows } from '@/lib/watchSpecs'
import type { Product } from '@/types/product'

interface WatchSpecTableProps {
  product: Product
}

export function WatchSpecTable({ product }: WatchSpecTableProps) {
  const rows = getWatchSpecRows(product)
  if (rows.length === 0) return null

  return (
    <div className="watch-spec-table" role="table" aria-label="Saat xüsusiyyətləri">
      {rows.map((row) => (
        <div className="watch-spec-table__row" role="row" key={row.label}>
          <div className="watch-spec-table__label" role="rowheader">
            {row.label}
          </div>
          <div
            className={`watch-spec-table__value${row.accent ? ' watch-spec-table__value--accent' : ''}`}
            role="cell"
          >
            {row.value}
          </div>
        </div>
      ))}
    </div>
  )
}
