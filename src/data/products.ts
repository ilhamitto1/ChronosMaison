export interface Product {
  id: string
  name: string
  brand: string
  brandId: string
  price: number
  image: string
  category: 'watches' | 'bags'
}

export const products: Product[] = [
  {
    id: '980',
    name: 'Rolex Datejust Two-Tone Champagne Diamond Dial (RBR)',
    brand: 'Rolex',
    brandId: 'rolex',
    price: 28500,
    image: '/assets/watches/gold-heritage.png',
    category: 'watches',
  },
  {
    id: '979',
    name: 'Rolex Daytona Cosmograph Two-Tone Steel & Diamond Dial',
    brand: 'Rolex',
    brandId: 'rolex',
    price: 42000,
    image: '/assets/watches/executive-chronograph.png',
    category: 'watches',
  },
  {
    id: '978',
    name: 'Audemars Piguet Royal Oak Offshore Steel',
    brand: 'Audemars Piguet',
    brandId: 'audemars-piguet',
    price: 38500,
    image: '/assets/watches/midnight-steel.png',
    category: 'watches',
  },
  {
    id: '927',
    name: 'Rolex Datejust Yellow Gold Wimbledon',
    brand: 'Rolex',
    brandId: 'rolex',
    price: 24800,
    image: '/assets/watches/noble-blue.png',
    category: 'watches',
  },
  {
    id: '867',
    name: 'Rolex GMT Master II (RootBeer)',
    brand: 'Rolex',
    brandId: 'rolex',
    price: 31200,
    image: '/assets/watches/royal-black.png',
    category: 'watches',
  },
  {
    id: '977',
    name: 'Breguet Marine Titanium Black',
    brand: 'Breguet',
    brandId: 'breguet',
    price: 19800,
    image: '/assets/watches/sapphire-automatic.png',
    category: 'watches',
  },
  {
    id: '950',
    name: 'Hermes Birkin 30 Togo Gold Hardware',
    brand: 'Hermes',
    brandId: 'hermes',
    price: 42500,
    image: '/assets/watches/rose-pearl.png',
    category: 'bags',
  },
  {
    id: '949',
    name: 'Chanel Classic Flap Medium Caviar Black',
    brand: 'Chanel',
    brandId: 'chanel',
    price: 15800,
    image: '/assets/watches/velvet-gold.png',
    category: 'bags',
  },
  {
    id: '946',
    name: 'Louis Vuitton Capucines BB Magnolia',
    brand: 'Cartier',
    brandId: 'cartier',
    price: 22000,
    image: '/assets/watches/silver-moon.png',
    category: 'bags',
  },
  {
    id: '929',
    name: 'Bvlgari Serpenti Forever Crossbody',
    brand: 'Bvlgari',
    brandId: 'bvlgari',
    price: 9800,
    image: '/assets/watches/crystal-line.png',
    category: 'bags',
  },
  {
    id: '917',
    name: 'Cartier Panthère Top Handle Bag',
    brand: 'Cartier',
    brandId: 'cartier',
    price: 11200,
    image: '/assets/watches/emerald-classic.png',
    category: 'bags',
  },
  {
    id: '873',
    name: 'Dior Lady Dior Medium Cannage',
    brand: 'Chanel',
    brandId: 'chanel',
    price: 14500,
    image: '/assets/watches/gold-heritage-2.png',
    category: 'bags',
  },
]

export const featuredWatches = products.filter((p) => p.category === 'watches').slice(0, 6)
export const featuredBags = products.filter((p) => p.category === 'bags').slice(0, 6)

export function getProductsByCategory(category: 'watches' | 'bags') {
  return products.filter((p) => p.category === category)
}

export function getProductsByBrand(brandId: string) {
  return products.filter((p) => p.brandId === brandId)
}
