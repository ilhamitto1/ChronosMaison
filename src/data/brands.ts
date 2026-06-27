export interface Brand {
  id: string
  name: string
  logo?: string
}

export const brands: Brand[] = [
  { id: 'louis-moinet', name: 'Louis Moinet' },
  { id: 'richard-mille', name: 'Richard Mille' },
  { id: 'carlfbucherer', name: 'Carl.F.Bucherer' },
  { id: 'maurice-lacroix', name: 'Maurice Lacroix' },
  { id: 'hermes', name: 'Hermes' },
  { id: 'messica', name: 'Messica' },
  { id: 'rolex', name: 'Rolex', logo: '/assets/brands/rolex.png' },
  { id: 'breguet', name: 'Breguet', logo: '/assets/brands/breguet.png' },
  { id: 'bovet', name: 'Bovet' },
  { id: 'audemars-piguet', name: 'Audemars Piguet', logo: '/assets/brands/audemars-piguet.png' },
  { id: 'ulysse-nardin', name: 'Ulysse Nardin' },
  { id: 'perrelet', name: 'Perrelet' },
  { id: 'roger-dubuis', name: 'Roger Dubuis' },
  { id: 'romain-jerome', name: 'Romain Jerome' },
  { id: 'tiffany-co', name: 'Tiffany & Co' },
  { id: 'urwerk', name: 'Urwerk' },
  { id: 'vacheron-constantin', name: 'Vacheron Constantin', logo: '/assets/brands/vacheron-constantin.png' },
  { id: 'van-cleefandarpels', name: 'Van Cleef & Arpels' },
  { id: 'zenith', name: 'Zenith', logo: '/assets/brands/zenith.png' },
  { id: 'breitling', name: 'Breitling', logo: '/assets/brands/breitling.png' },
  { id: 'chopard', name: 'Chopard', logo: '/assets/brands/chopard.png' },
  { id: 'corum', name: 'Corum' },
  { id: 'de-witt', name: 'De Witt' },
  { id: 'de-grisogono', name: 'De Grisogono' },
  { id: 'franck-muller', name: 'Franck Muller' },
  { id: 'girard-perreguax', name: 'Girard Perreguax' },
  { id: 'glashutte-original', name: 'Glashütte Original' },
  { id: 'graham', name: 'Graham' },
  { id: 'harry-winston', name: 'Harry Winston' },
  { id: 'hublot', name: 'Hublot', logo: '/assets/brands/hublot.png' },
  { id: 'iwc', name: 'IWC', logo: '/assets/brands/iwc.png' },
  { id: 'jacobco', name: 'Jacob & Co' },
  { id: 'jeager-lecoultre', name: 'Jaeger-LeCoultre', logo: '/assets/brands/jaeger-lecoultre.png' },
  { id: 'jaquet-ddoz', name: 'Jaquet Droz' },
  { id: 'montblanc', name: 'Montblanc', logo: '/assets/brands/montblanc.png' },
  { id: 'omega', name: 'Omega', logo: '/assets/brands/omega.png' },
  { id: 'patek-philippe', name: 'Patek Philippe', logo: '/assets/brands/patek-philippe.png' },
  { id: 'chanel', name: 'Chanel' },
  { id: 'cartier', name: 'Cartier', logo: '/assets/brands/cartier.png' },
  { id: 'bvlgari', name: 'Bvlgari', logo: '/assets/brands/bvlgari.png' },
  { id: 'u-boat', name: 'U-Boat' },
  { id: 'tag-heur', name: 'TAG Heuer', logo: '/assets/brands/tag-heuer.png' },
  { id: 'blancpain', name: 'Blancpain' },
]

export function getBrandById(id: string) {
  return brands.find((b) => b.id === id)
}
