export interface Brand {
  id: string
  name: string
  logo: string
  /** Saat, çanta və ya zinət əşyası kateqoriyası */
  category: 'watches' | 'bags' | 'jewelry' | 'both'
}

export const brands: Brand[] = [
  { id: 'louis-moinet', name: 'Louis Moinet', logo: '/assets/brands/louis-moinet.svg', category: 'watches' },
  { id: 'richard-mille', name: 'Richard Mille', logo: '/assets/brands/richard-mille.svg', category: 'watches' },
  { id: 'carlfbucherer', name: 'Carl F. Bucherer', logo: '/assets/brands/carl-f-bucherer.svg', category: 'watches' },
  { id: 'maurice-lacroix', name: 'Maurice Lacroix', logo: '/assets/brands/maurice-lacroix.svg', category: 'watches' },
  { id: 'hermes', name: 'Hermès', logo: '/assets/brands/hermes.svg', category: 'both' },
  { id: 'messica', name: 'Messika', logo: '/assets/brands/messika.svg', category: 'jewelry' },
  { id: 'rolex', name: 'Rolex', logo: '/assets/brands/rolex.png', category: 'watches' },
  { id: 'breguet', name: 'Breguet', logo: '/assets/brands/breguet.png', category: 'watches' },
  { id: 'bovet', name: 'Bovet', logo: '/assets/brands/bovet.png', category: 'watches' },
  { id: 'audemars-piguet', name: 'Audemars Piguet', logo: '/assets/brands/audemars-piguet.png', category: 'watches' },
  { id: 'ulysse-nardin', name: 'Ulysse Nardin', logo: '/assets/brands/ulysse-nardin.png', category: 'watches' },
  { id: 'perrelet', name: 'Perrelet', logo: '/assets/brands/perrelet.png', category: 'watches' },
  { id: 'roger-dubuis', name: 'Roger Dubuis', logo: '/assets/brands/roger-dubuis.png', category: 'watches' },
  { id: 'romain-jerome', name: 'Romain Jerome', logo: '/assets/brands/romain-jerome.png', category: 'watches' },
  { id: 'tiffany-co', name: 'Tiffany & Co.', logo: '/assets/brands/tiffany-co.png', category: 'jewelry' },
  { id: 'urwerk', name: 'Urwerk', logo: '/assets/brands/urwerk.png', category: 'watches' },
  { id: 'vacheron-constantin', name: 'Vacheron Constantin', logo: '/assets/brands/vacheron-constantin.png', category: 'watches' },
  { id: 'van-cleefandarpels', name: 'Van Cleef & Arpels', logo: '/assets/brands/van-cleef-arpels.png', category: 'jewelry' },
  { id: 'zenith', name: 'Zenith', logo: '/assets/brands/zenith.png', category: 'watches' },
  { id: 'breitling', name: 'Breitling', logo: '/assets/brands/breitling.png', category: 'watches' },
  { id: 'chopard', name: 'Chopard', logo: '/assets/brands/chopard.png', category: 'both' },
  { id: 'corum', name: 'Corum', logo: '/assets/brands/corum.png', category: 'watches' },
  { id: 'de-witt', name: 'DeWitt', logo: '/assets/brands/de-witt.png', category: 'watches' },
  { id: 'de-grisogono', name: 'de Grisogono', logo: '/assets/brands/de-grisogono.png', category: 'jewelry' },
  { id: 'franck-muller', name: 'Franck Muller', logo: '/assets/brands/franck-muller.png', category: 'watches' },
  { id: 'girard-perreguax', name: 'Girard-Perregaux', logo: '/assets/brands/girard-perregaux.png', category: 'watches' },
  { id: 'glashutte-original', name: 'Glashütte Original', logo: '/assets/brands/glashutte-original.png', category: 'watches' },
  { id: 'graham', name: 'Graham', logo: '/assets/brands/graham.png', category: 'watches' },
  { id: 'harry-winston', name: 'Harry Winston', logo: '/assets/brands/harry-winston.png', category: 'both' },
  { id: 'hublot', name: 'Hublot', logo: '/assets/brands/hublot.png', category: 'watches' },
  { id: 'iwc', name: 'IWC Schaffhausen', logo: '/assets/brands/iwc.png', category: 'watches' },
  { id: 'jacobco', name: 'Jacob & Co.', logo: '/assets/brands/jacob-co.png', category: 'watches' },
  { id: 'jeager-lecoultre', name: 'Jaeger-LeCoultre', logo: '/assets/brands/jaeger-lecoultre.png', category: 'watches' },
  { id: 'jaquet-ddoz', name: 'Jaquet Droz', logo: '/assets/brands/jaquet-droz.png', category: 'watches' },
  { id: 'montblanc', name: 'Montblanc', logo: '/assets/brands/montblanc.png', category: 'both' },
  { id: 'omega', name: 'Omega', logo: '/assets/brands/omega.png', category: 'watches' },
  { id: 'patek-philippe', name: 'Patek Philippe', logo: '/assets/brands/patek-philippe.png', category: 'watches' },
  { id: 'chanel', name: 'Chanel', logo: '/assets/brands/chanel.png', category: 'bags' },
  { id: 'louis-vuitton', name: 'Louis Vuitton', logo: '/assets/brands/louis-vuitton.png', category: 'bags' },
  { id: 'dior', name: 'Dior', logo: '/assets/brands/dior.svg', category: 'bags' },
  { id: 'cartier', name: 'Cartier', logo: '/assets/brands/cartier.png', category: 'both' },
  { id: 'bvlgari', name: 'Bvlgari', logo: '/assets/brands/bvlgari.png', category: 'both' },
  { id: 'u-boat', name: 'U-Boat', logo: '/assets/brands/u-boat.png', category: 'watches' },
  { id: 'tag-heur', name: 'TAG Heuer', logo: '/assets/brands/tag-heuer.png', category: 'watches' },
  { id: 'blancpain', name: 'Blancpain', logo: '/assets/brands/blancpain.png', category: 'watches' },
]

export const bagBrands = brands.filter((b) => b.category === 'bags' || b.category === 'both')
export const jewelryBrands = brands.filter(
  (b) => b.category === 'jewelry' || b.category === 'both',
)
export const watchBrands = brands.filter((b) => b.category === 'watches' || b.category === 'both')

export function getBrandById(id: string) {
  return brands.find((b) => b.id === id)
}
