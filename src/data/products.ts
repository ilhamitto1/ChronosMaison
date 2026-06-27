export interface Product {
  id: string
  name: string
  brand: string
  brandId: string
  price: number
  image: string
  category: 'watches' | 'bags' | 'jewelry'
}

export const products: Product[] = [
  // ─── Saatlar ───
  {
    id: '980',
    name: 'Rolex Datejust 36 Two-Tone Champagne Diamond Dial',
    brand: 'Rolex',
    brandId: 'rolex',
    price: 29500,
    image: '/assets/watches/gold-heritage.jpg',
    category: 'watches',
  },
  {
    id: '979',
    name: 'Rolex Cosmograph Daytona Two-Tone Steel & Diamond Dial',
    brand: 'Rolex',
    brandId: 'rolex',
    price: 67500,
    image: '/assets/watches/executive-chronograph.jpg',
    category: 'watches',
  },
  {
    id: '978',
    name: 'Audemars Piguet Royal Oak Offshore Steel',
    brand: 'Audemars Piguet',
    brandId: 'audemars-piguet',
    price: 54000,
    image: '/assets/watches/midnight-steel.jpg',
    category: 'watches',
  },
  {
    id: '927',
    name: 'Rolex Datejust 41 Yellow Gold Wimbledon Dial',
    brand: 'Rolex',
    brandId: 'rolex',
    price: 33500,
    image: '/assets/watches/noble-blue.jpg',
    category: 'watches',
  },
  {
    id: '867',
    name: 'Rolex GMT-Master II «Root Beer»',
    brand: 'Rolex',
    brandId: 'rolex',
    price: 41000,
    image: '/assets/watches/royal-black.jpg',
    category: 'watches',
  },
  {
    id: '977',
    name: 'Breguet Marine Titanium Black Dial',
    brand: 'Breguet',
    brandId: 'breguet',
    price: 26500,
    image: '/assets/watches/sapphire-automatic.jpg',
    category: 'watches',
  },
  {
    id: '976',
    name: 'Patek Philippe Nautilus 5711/1A Blue Dial',
    brand: 'Patek Philippe',
    brandId: 'patek-philippe',
    price: 128000,
    image: '/assets/watches/royal-black-2.jpg',
    category: 'watches',
  },
  {
    id: '975',
    name: 'Omega Speedmaster Professional Moonwatch',
    brand: 'Omega',
    brandId: 'omega',
    price: 9800,
    image: '/assets/watches/silver-moon.jpg',
    category: 'watches',
  },
  {
    id: '974',
    name: 'IWC Portugieser Chronograph Blue Dial',
    brand: 'IWC Schaffhausen',
    brandId: 'iwc',
    price: 14200,
    image: '/assets/watches/noble-blue.jpg',
    category: 'watches',
  },
  {
    id: '973',
    name: 'TAG Heuer Carrera Calibre Heuer 02',
    brand: 'TAG Heuer',
    brandId: 'tag-heur',
    price: 6500,
    image: '/assets/watches/urban-leather.jpg',
    category: 'watches',
  },
  {
    id: '972',
    name: 'Jaeger-LeCoultre Reverso Classic Medium',
    brand: 'Jaeger-LeCoultre',
    brandId: 'jeager-lecoultre',
    price: 19800,
    image: '/assets/watches/emerald-classic.jpg',
    category: 'watches',
  },
  {
    id: '971',
    name: 'Hublot Big Bang Unico Titanium',
    brand: 'Hublot',
    brandId: 'hublot',
    price: 18500,
    image: '/assets/watches/midnight-steel.jpg',
    category: 'watches',
  },

  // ─── Çantalar ───
  {
    id: '950',
    name: 'Hermès Birkin 30 Togo Gold Hardware',
    brand: 'Hermès',
    brandId: 'hermes',
    price: 52000,
    image: '/assets/bags/hermes-birkin.jpg',
    category: 'bags',
  },
  {
    id: '949',
    name: 'Chanel Classic Flap Medium Caviar Black',
    brand: 'Chanel',
    brandId: 'chanel',
    price: 19500,
    image: '/assets/bags/chanel-classic-flap.jpg',
    category: 'bags',
  },
  {
    id: '948',
    name: 'Hermès Kelly 25 Sellier Epsom Gold',
    brand: 'Hermès',
    brandId: 'hermes',
    price: 48000,
    image: '/assets/bags/hermes-kelly.jpg',
    category: 'bags',
  },
  {
    id: '946',
    name: 'Louis Vuitton Capucines BB Magnolia',
    brand: 'Louis Vuitton',
    brandId: 'louis-vuitton',
    price: 13800,
    image: '/assets/bags/lv-capucines.jpg',
    category: 'bags',
  },
  {
    id: '929',
    name: 'Bvlgari Serpenti Forever Crossbody',
    brand: 'Bvlgari',
    brandId: 'bvlgari',
    price: 10500,
    image: '/assets/bags/bvlgari-serpenti-bag.jpg',
    category: 'bags',
  },
  {
    id: '917',
    name: 'Cartier Panthère Top Handle Bag',
    brand: 'Cartier',
    brandId: 'cartier',
    price: 12400,
    image: '/assets/bags/cartier-panthere-bag.jpg',
    category: 'bags',
  },
  {
    id: '873',
    name: 'Dior Lady Dior Medium Cannage',
    brand: 'Dior',
    brandId: 'dior',
    price: 15600,
    image: '/assets/bags/dior-lady-dior.jpg',
    category: 'bags',
  },
  {
    id: '872',
    name: 'Chanel Boy Bag Medium Calfskin',
    brand: 'Chanel',
    brandId: 'chanel',
    price: 16800,
    image: '/assets/bags/chanel-boy-bag.jpg',
    category: 'bags',
  },

  // ─── Zinət əşyaları ───
  {
    id: '860',
    name: 'Tiffany & Co. Victoria Diamond Necklace',
    brand: 'Tiffany & Co.',
    brandId: 'tiffany-co',
    price: 28500,
    image: '/assets/jewelry/tiffany-necklace.jpg',
    category: 'jewelry',
  },
  {
    id: '859',
    name: 'Van Cleef & Arpels Vintage Alhambra Bracelet',
    brand: 'Van Cleef & Arpels',
    brandId: 'van-cleefandarpels',
    price: 22400,
    image: '/assets/jewelry/van-cleef-bracelet.jpg',
    category: 'jewelry',
  },
  {
    id: '858',
    name: 'Messika Move Classique Diamond Ring',
    brand: 'Messika',
    brandId: 'messica',
    price: 8900,
    image: '/assets/jewelry/messika-ring.jpg',
    category: 'jewelry',
  },
  {
    id: '857',
    name: 'Cartier Love Bracelet 18K Yellow Gold',
    brand: 'Cartier',
    brandId: 'cartier',
    price: 11200,
    image: '/assets/jewelry/cartier-love-bracelet.jpg',
    category: 'jewelry',
  },
  {
    id: '856',
    name: 'Chopard Happy Diamonds Icons Pendant',
    brand: 'Chopard',
    brandId: 'chopard',
    price: 15600,
    image: '/assets/jewelry/chopard-happy-diamonds.jpg',
    category: 'jewelry',
  },
  {
    id: '855',
    name: 'Bvlgari Serpenti Viper Diamond Necklace',
    brand: 'Bvlgari',
    brandId: 'bvlgari',
    price: 19800,
    image: '/assets/jewelry/bvlgari-serpenti-necklace.jpg',
    category: 'jewelry',
  },
  {
    id: '854',
    name: 'Tiffany & Co. Soleste Platinum Diamond Ring',
    brand: 'Tiffany & Co.',
    brandId: 'tiffany-co',
    price: 34200,
    image: '/assets/jewelry/tiffany-diamond-ring.jpg',
    category: 'jewelry',
  },
  {
    id: '853',
    name: 'Harry Winston Cluster Diamond Earrings',
    brand: 'Harry Winston',
    brandId: 'harry-winston',
    price: 46500,
    image: '/assets/jewelry/harry-winston-earrings.jpg',
    category: 'jewelry',
  },
]

export const featuredWatches = products.filter((p) => p.category === 'watches').slice(0, 6)
export const featuredBags = products.filter((p) => p.category === 'bags').slice(0, 6)
export const featuredJewelry = products.filter((p) => p.category === 'jewelry').slice(0, 6)

export function getProductsByCategory(category: 'watches' | 'bags' | 'jewelry') {
  return products.filter((p) => p.category === category)
}

export function getProductsByBrand(brandId: string) {
  return products.filter((p) => p.brandId === brandId)
}
