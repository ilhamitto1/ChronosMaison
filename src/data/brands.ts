export interface Brand {
  id: string
  name: string
  logo: string
}

export const brands: Brand[] = [
  { id: 'rolex', name: 'Rolex', logo: '/assets/brands/rolex.png' },
  { id: 'patek-philippe', name: 'Patek Philippe', logo: '/assets/brands/patek-philippe.png' },
  { id: 'audemars-piguet', name: 'Audemars Piguet', logo: '/assets/brands/audemars-piguet.png' },
  { id: 'omega', name: 'Omega', logo: '/assets/brands/omega.png' },
  { id: 'cartier', name: 'Cartier', logo: '/assets/brands/cartier.png' },
  { id: 'iwc', name: 'IWC', logo: '/assets/brands/iwc.png' },
  { id: 'hublot', name: 'Hublot', logo: '/assets/brands/hublot.png' },
  { id: 'breitling', name: 'Breitling', logo: '/assets/brands/breitling.png' },
  { id: 'tag-heuer', name: 'TAG Heuer', logo: '/assets/brands/tag-heuer.png' },
  { id: 'jaeger-lecoultre', name: 'Jaeger-LeCoultre', logo: '/assets/brands/jaeger-lecoultre.png' },
  { id: 'bvlgari', name: 'Bvlgari', logo: '/assets/brands/bvlgari.png' },
  { id: 'vacheron-constantin', name: 'Vacheron Constantin', logo: '/assets/brands/vacheron-constantin.png' },
  { id: 'breguet', name: 'Breguet', logo: '/assets/brands/breguet.png' },
  { id: 'chopard', name: 'Chopard', logo: '/assets/brands/chopard.png' },
  { id: 'zenith', name: 'Zenith', logo: '/assets/brands/zenith.png' },
  { id: 'montblanc', name: 'Montblanc', logo: '/assets/brands/montblanc.png' },
]

export function getBrandById(id: string) {
  return brands.find((b) => b.id === id)
}
