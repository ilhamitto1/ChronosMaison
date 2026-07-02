interface LuxuryLoaderProps {
  label?: string
  compact?: boolean
}

export function LuxuryLoader({ label = 'Yüklənir...', compact = false }: LuxuryLoaderProps) {
  return (
    <div
      className={`luxury-loader${compact ? ' luxury-loader--compact' : ''}`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="luxury-loader__stage" aria-hidden="true">
        <span className="luxury-loader__orbit luxury-loader__orbit--outer" />
        <span className="luxury-loader__orbit luxury-loader__orbit--mid" />
        <span className="luxury-loader__orbit luxury-loader__orbit--inner" />
        <span className="luxury-loader__gem" />
      </div>
      <p className="luxury-loader__label">{label}</p>
    </div>
  )
}
