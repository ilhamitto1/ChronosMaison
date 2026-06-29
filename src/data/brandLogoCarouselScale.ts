/** Carousel logo boost when raster assets have large empty margins (content fill < ~50%). */
export const brandCarouselLogoScale: Record<string, number> = {
  bvlgari: 2.6,
  cartier: 1.55,
  'louis-vuitton': 1.35,
  urwerk: 1.25,
  'maurice-lacroix': 1.2,
  'audemars-piguet': 1.2,
  blancpain: 1.15,
  'girard-perreguax': 1.1,
  'ulysse-nardin': 1.1,
}

export function getBrandCarouselLogoScale(brandId: string) {
  return brandCarouselLogoScale[brandId] ?? 1
}
