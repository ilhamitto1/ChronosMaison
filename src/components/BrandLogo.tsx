import type { CSSProperties } from 'react'
import type { Brand } from '@/data/brands'
import { getBrandCarouselLogoScale } from '@/data/brandLogoCarouselScale'

interface BrandLogoProps {
  brand: Pick<Brand, 'id' | 'name' | 'logo'>
  className?: string
  variant?: 'default' | 'carousel'
}

export function BrandLogo({ brand, className = '', variant = 'default' }: BrandLogoProps) {
  const isRaster = /\.(png|jpe?g|webp)$/i.test(brand.logo)
  const carouselScale = variant === 'carousel' ? getBrandCarouselLogoScale(brand.id) : 1

  return (
    <img
      src={brand.logo}
      alt={brand.name}
      loading="lazy"
      className={`brand-logo ${isRaster ? 'brand-logo--raster' : 'brand-logo--vector'} ${variant === 'carousel' ? 'brand-logo--carousel' : ''} ${className}`.trim()}
      style={
        carouselScale !== 1
          ? ({ '--brand-logo-scale': carouselScale } as CSSProperties)
          : undefined
      }
    />
  )
}
