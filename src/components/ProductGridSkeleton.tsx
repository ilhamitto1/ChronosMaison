interface ProductGridSkeletonProps {
  count?: number
}

export function ProductGridSkeleton({ count = 6 }: ProductGridSkeletonProps) {
  return (
    <div className="products2 products2--loading" aria-hidden="true">
      <div className="grid">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="product product--skeleton">
            <div className="product__skeleton-image" />
            <div className="product__skeleton-line" />
            <div className="product__skeleton-line product__skeleton-line--short" />
          </div>
        ))}
      </div>
    </div>
  )
}
