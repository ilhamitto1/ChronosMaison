export type CollectionId =
  | 'klassik-maison'
  | 'qizili-zeriflik'
  | 'seher-stili'
  | 'avtomatik-kolleksiya'

export type Category =
  | 'Klassik'
  | 'Qızıl'
  | 'Şəhər'
  | 'Avtomatik'
  | 'Xronograf'

export type Gender = 'Kişi' | 'Qadın' | 'Uniseks'

export type Mechanism = 'Avtomatik' | 'Kvars' | 'Mexaniki' | 'Xronograf'

export type Availability = 'Mövcuddur' | 'Məhdud' | 'Sifarişlə'

export interface Product {
  id: string
  name: string
  brand: string
  brandId: string
  slug: string
  category: Category
  collection: CollectionId
  price: number
  gender: Gender
  mechanism: Mechanism
  caseMaterial: string
  strapMaterial: string
  waterResistance: string
  color: string
  availability: Availability
  description: string
  features: string[]
  image: string
  gallery: string[]
  isNew?: boolean
  isPopular?: boolean
  isFeatured?: boolean
  createdAt: string
}

export interface Collection {
  id: CollectionId
  name: string
  description: string
  image: string
}

export const collections: Collection[] = [
  {
    id: 'klassik-maison',
    name: 'Klassik Maison',
    description: 'Zamansız klassik dizayn və incə detallarla hazırlanmış premium kolleksiya.',
    image: '/assets/collections/klassik-maison.png',
  },
  {
    id: 'qizili-zeriflik',
    name: 'Qızılı Zəriflik',
    description: 'Şampan qızılı tonlarında executive modellər — status və zəriflik bir arada.',
    image: '/assets/collections/qizili-zeriflik.png',
  },
  {
    id: 'seher-stili',
    name: 'Şəhər Stili',
    description: 'Müasir şəhər həyatı üçün dinamik, rahat və stil sahibi saatlar.',
    image: '/assets/collections/seher-stili.png',
  },
  {
    id: 'avtomatik-kolleksiya',
    name: 'Avtomatik Kolleksiya',
    description: 'Sənətkarlıq mexanizmləri ilə hazırlanmış avtomatik saatların seçilmiş seriyası.',
    image: '/assets/collections/avtomatik-kolleksiya.png',
  },
]

export const products: Product[] = [
  {
    id: 'cm-001',
    name: 'Rolex Submariner Date',
    brand: 'Rolex',
    brandId: 'rolex',
    slug: 'rolex-submariner-date',
    category: 'Klassik',
    collection: 'klassik-maison',
    price: 18500,
    gender: 'Kişi',
    mechanism: 'Avtomatik',
    caseMaterial: 'Paslanmaz polad',
    strapMaterial: 'Əsl dəri',
    waterResistance: '300m',
    color: 'Qara',
    availability: 'Mövcuddur',
    description: 'Rolex Submariner Date — dalğıc saatlarının əfsanəvi modeli. Dərin qara dial, keramik bezel və Oystersteel korpus ilə zamansız klassik.',
    features: ["Cerachrom bezel","Calibre 3235","Oystersteel korpus","300m su keçirməzlik"],
    image: '/assets/watches/royal-black.png',
    gallery: ["/assets/watches/royal-black.png","/assets/watches/royal-black-2.png"],
    isPopular: true,
    isFeatured: true,
    createdAt: '2025-11-15',
  },
  {
    id: 'cm-002',
    name: 'Rolex Day-Date 40',
    brand: 'Rolex',
    brandId: 'rolex',
    slug: 'rolex-day-date-40',
    category: 'Avtomatik',
    collection: 'avtomatik-kolleksiya',
    price: 42000,
    gender: 'Kişi',
    mechanism: 'Avtomatik',
    caseMaterial: 'Sarı qızıl',
    strapMaterial: 'President biləkzənciri',
    waterResistance: '100m',
    color: 'Qızıl',
    availability: 'Mövcuddur',
    description: 'Rolex Day-Date 40 — Prezident saatı kimi tanınan ikonik model. Sarı qızıl korpus və President biləkzənciri.',
    features: ["Sarı qızıl","Gün və tarix","President bracelet","Calibre 3255"],
    image: '/assets/watches/gold-heritage.png',
    gallery: ["/assets/watches/gold-heritage.png","/assets/watches/gold-heritage-2.png"],
    isNew: true,
    isFeatured: true,
    createdAt: '2026-01-10',
  },
  {
    id: 'cm-003',
    name: 'Omega De Ville Prestige',
    brand: 'Omega',
    brandId: 'omega',
    slug: 'omega-de-ville-prestige',
    category: 'Klassik',
    collection: 'klassik-maison',
    price: 4850,
    gender: 'Qadın',
    mechanism: 'Avtomatik',
    caseMaterial: 'Paslanmaz polad',
    strapMaterial: 'Metal biləkzənciri',
    waterResistance: '30m',
    color: 'Gümüş',
    availability: 'Mövcuddur',
    description: 'Omega De Ville Prestige — incə və zərif dizayn. Master Chronometer sertifikatlı avtomatik mexanizm.',
    features: ["Master Chronometer","Co-Axial 8800","Gümüş dial","34mm korpus"],
    image: '/assets/watches/silver-moon.png',
    gallery: ["/assets/watches/silver-moon.png"],
    isPopular: true,
    createdAt: '2025-09-20',
  },
  {
    id: 'cm-004',
    name: 'Rolex Datejust 41',
    brand: 'Rolex',
    brandId: 'rolex',
    slug: 'rolex-datejust-41',
    category: 'Klassik',
    collection: 'klassik-maison',
    price: 15800,
    gender: 'Uniseks',
    mechanism: 'Avtomatik',
    caseMaterial: 'Paslanmaz polad',
    strapMaterial: 'Jubilee biləkzənciri',
    waterResistance: '100m',
    color: 'Yaşıl',
    availability: 'Məhdud',
    description: 'Rolex Datejust 41 — yaşıl dial və fluted bezel ilə klassik zəriflik.',
    features: ["Yaşıl dial","Fluted bezel","Jubilee bracelet","Calibre 3235"],
    image: '/assets/watches/emerald-classic.png',
    gallery: ["/assets/watches/emerald-classic.png"],
    isNew: true,
    createdAt: '2026-02-01',
  },
  {
    id: 'cm-005',
    name: 'TAG Heuer Carrera Chronograph',
    brand: 'TAG Heuer',
    brandId: 'tag-heuer',
    slug: 'tag-heuer-carrera-chronograph',
    category: 'Xronograf',
    collection: 'qizili-zeriflik',
    price: 7200,
    gender: 'Kişi',
    mechanism: 'Xronograf',
    caseMaterial: 'Paslanmaz polad',
    strapMaterial: 'Əsl dəri',
    waterResistance: '100m',
    color: 'Gümüş',
    availability: 'Mövcuddur',
    description: 'TAG Heuer Carrera Chronograph — avtomobil yarışlarından ilhamlanan professional xronograf.',
    features: ["Xronograf","Tachymeter","Heuer 02","Safir kristal"],
    image: '/assets/watches/executive-chronograph.png',
    gallery: ["/assets/watches/executive-chronograph.png"],
    isPopular: true,
    isFeatured: true,
    createdAt: '2025-10-05',
  },
  {
    id: 'cm-006',
    name: 'Cartier Ballon Bleu',
    brand: 'Cartier',
    brandId: 'cartier',
    slug: 'cartier-ballon-bleu',
    category: 'Klassik',
    collection: 'klassik-maison',
    price: 9800,
    gender: 'Qadın',
    mechanism: 'Avtomatik',
    caseMaterial: 'Rose gold örtüklü polad',
    strapMaterial: 'Əsl dəri',
    waterResistance: '30m',
    color: 'Rose gold',
    availability: 'Mövcuddur',
    description: 'Cartier Ballon Bleu — qadın zərifliyinin simvolu. Mavi kabochon tacı ilə ikonik dizayn.',
    features: ["Rose gold","Mavi kabochon","Avtomatik","33mm korpus"],
    image: '/assets/watches/rose-pearl.png',
    gallery: ["/assets/watches/rose-pearl.png"],
    isPopular: true,
    createdAt: '2025-08-12',
  },
  {
    id: 'cm-007',
    name: 'IWC Portugieser',
    brand: 'IWC',
    brandId: 'iwc',
    slug: 'iwc-portugieser',
    category: 'Şəhər',
    collection: 'seher-stili',
    price: 12400,
    gender: 'Kişi',
    mechanism: 'Avtomatik',
    caseMaterial: 'Paslanmaz polad',
    strapMaterial: 'Əsl dəri',
    waterResistance: '30m',
    color: 'Boz',
    availability: 'Mövcuddur',
    description: 'IWC Portugieser — klassik portuqal dizaynı və məşhur IWC sənətkarlığı.',
    features: ["Böyük dial","Calibre 82100","Əsl dəri","60h power reserve"],
    image: '/assets/watches/midnight-steel.png',
    gallery: ["/assets/watches/midnight-steel.png"],

    createdAt: '2025-07-18',
  },
  {
    id: 'cm-008',
    name: 'Omega Seamaster Aqua Terra',
    brand: 'Omega',
    brandId: 'omega',
    slug: 'omega-seamaster-aqua-terra',
    category: 'Şəhər',
    collection: 'seher-stili',
    price: 6500,
    gender: 'Uniseks',
    mechanism: 'Avtomatik',
    caseMaterial: 'Paslanmaz polad',
    strapMaterial: 'Əsl dəri',
    waterResistance: '150m',
    color: 'Bej',
    availability: 'Mövcuddur',
    description: 'Omega Seamaster Aqua Terra — gündəlik lüks üçün ideal. Teak doku dial.',
    features: ["Teak dial","Master Chronometer","150m","Co-Axial 8900"],
    image: '/assets/watches/urban-leather.png',
    gallery: ["/assets/watches/urban-leather.png"],
    isNew: true,
    createdAt: '2026-01-25',
  },
  {
    id: 'cm-009',
    name: 'Audemars Piguet Royal Oak',
    brand: 'Audemars Piguet',
    brandId: 'audemars-piguet',
    slug: 'audemars-piguet-royal-oak',
    category: 'Avtomatik',
    collection: 'avtomatik-kolleksiya',
    price: 38500,
    gender: 'Kişi',
    mechanism: 'Avtomatik',
    caseMaterial: 'Paslanmaz polad',
    strapMaterial: 'Metal biləkzənciri',
    waterResistance: '50m',
    color: 'Gümüş',
    availability: 'Məhdud',
    description: 'Audemars Piguet Royal Oak — Tapisserie dial və octagonal bezel ilə ikon.',
    features: ["Tapisserie dial","Integrated bracelet","Calibre 4302","50m"],
    image: '/assets/watches/sapphire-automatic.png',
    gallery: ["/assets/watches/sapphire-automatic.png"],
    isFeatured: true,
    createdAt: '2025-12-01',
  },
  {
    id: 'cm-010',
    name: 'Patek Philippe Nautilus',
    brand: 'Patek Philippe',
    brandId: 'patek-philippe',
    slug: 'patek-philippe-nautilus',
    category: 'Qızıl',
    collection: 'qizili-zeriflik',
    price: 95000,
    gender: 'Kişi',
    mechanism: 'Avtomatik',
    caseMaterial: 'Paslanmaz polad',
    strapMaterial: 'Metal biləkzənciri',
    waterResistance: '120m',
    color: 'Göy',
    availability: 'Sifarişlə',
    description: 'Patek Philippe Nautilus — lüks saat dünyasının ən arzuolunan modellərindən biri.',
    features: ["Mavi dial","Calibre 26-330","Embossed dial","120m"],
    image: '/assets/watches/noble-blue.png',
    gallery: ["/assets/watches/noble-blue.png"],
    isPopular: true,
    createdAt: '2025-10-28',
  },
  {
    id: 'cm-011',
    name: 'Bvlgari Serpenti Tubogas',
    brand: 'Bvlgari',
    brandId: 'bvlgari',
    slug: 'bvlgari-serpenti-tubogas',
    category: 'Qızıl',
    collection: 'qizili-zeriflik',
    price: 14200,
    gender: 'Qadın',
    mechanism: 'Kvars',
    caseMaterial: 'Sarı qızıl',
    strapMaterial: 'Tubogas biləkzənciri',
    waterResistance: '30m',
    color: 'Qızıl',
    availability: 'Mövcuddur',
    description: 'Bvlgari Serpenti Tubogas — ilan formasında ikonik qızıl biləkzəncir.',
    features: ["Tubogas bracelet","Serpenti dizayn","Qızıl korpus","35mm"],
    image: '/assets/watches/velvet-gold.png',
    gallery: ["/assets/watches/velvet-gold.png"],
    isFeatured: true,
    createdAt: '2025-11-20',
  },
  {
    id: 'cm-012',
    name: 'Jaeger-LeCoultre Master Ultra Thin',
    brand: 'Jaeger-LeCoultre',
    brandId: 'jaeger-lecoultre',
    slug: 'jaeger-lecoultre-master-ultra-thin',
    category: 'Avtomatik',
    collection: 'avtomatik-kolleksiya',
    price: 11800,
    gender: 'Uniseks',
    mechanism: 'Avtomatik',
    caseMaterial: 'Paslanmaz polad',
    strapMaterial: 'Əsl dəri',
    waterResistance: '50m',
    color: 'Ağ',
    availability: 'Mövcuddur',
    description: 'Jaeger-LeCoultre Master Ultra Thin — incəlik və sənətkarlığın zirvəsi.',
    features: ["Ultra thin 7.5mm","Calibre 896/1","Ağ dial","Əsl dəri"],
    image: '/assets/watches/crystal-line.png',
    gallery: ["/assets/watches/crystal-line.png"],
    isNew: true,
    isPopular: true,
    createdAt: '2026-02-15',
  }
]

export const filterOptions = {
  categories: ['Klassik', 'Qızıl', 'Şəhər', 'Avtomatik', 'Xronograf'] as Category[],
  genders: ['Kişi', 'Qadın', 'Uniseks'] as Gender[],
  mechanisms: ['Avtomatik', 'Kvars', 'Mexaniki', 'Xronograf'] as Mechanism[],
  materials: ['Paslanmaz polad', 'Sarı qızıl', 'Rose gold örtüklü polad'],
  colors: ['Qara', 'Qızıl', 'Gümüş', 'Yaşıl', 'Rose gold', 'Boz', 'Bej', 'Mavi', 'Göy', 'Ağ'],
  availability: ['Mövcuddur', 'Məhdud', 'Sifarişlə'] as Availability[],
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id)
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id && (p.brandId === product.brandId || p.collection === product.collection))
    .slice(0, limit)
}
