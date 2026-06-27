import type { Brand } from '@/data/brands'

interface BrandLogoProps {
  brand: Pick<Brand, 'name' | 'logo'>
  className?: string
}

export function BrandLogo({ brand, className = '' }: BrandLogoProps) {
  const isRaster = /\.(png|jpe?g|webp)$/i.test(brand.logo)

  return (
    <img
      src={brand.logo}
      alt={brand.name}
      loading="lazy"
      className={`brand-logo ${isRaster ? 'brand-logo--raster' : 'brand-logo--vector'} ${className}`.trim()}
    />
  )
}
