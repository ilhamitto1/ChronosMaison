import fs from 'fs'

const products = [
  { id: 'cm-001', name: 'Rolex Submariner Date', brand: 'Rolex', brandId: 'rolex', slug: 'rolex-submariner-date', category: 'Klassik', collection: 'klassik-maison', price: 18500, gender: 'Kişi', mechanism: 'Avtomatik', caseMaterial: 'Paslanmaz polad', strapMaterial: 'Əsl dəri', waterResistance: '300m', color: 'Qara', availability: 'Mövcuddur', description: 'Rolex Submariner Date — dalğıc saatlarının əfsanəvi modeli. Dərin qara dial, keramik bezel və Oystersteel korpus ilə zamansız klassik.', features: ['Cerachrom bezel', 'Calibre 3235', 'Oystersteel korpus', '300m su keçirməzlik'], image: '/assets/watches/royal-black.jpg', gallery: ['/assets/watches/royal-black.jpg', '/assets/watches/royal-black-2.jpg'], isFeatured: true, isPopular: true, createdAt: '2025-11-15' },
  { id: 'cm-002', name: 'Rolex Day-Date 40', brand: 'Rolex', brandId: 'rolex', slug: 'rolex-day-date-40', category: 'Avtomatik', collection: 'avtomatik-kolleksiya', price: 42000, gender: 'Kişi', mechanism: 'Avtomatik', caseMaterial: 'Sarı qızıl', strapMaterial: 'President biləkzənciri', waterResistance: '100m', color: 'Qızıl', availability: 'Mövcuddur', description: 'Rolex Day-Date 40 — Prezident saatı kimi tanınan ikonik model. Sarı qızıl korpus və President biləkzənciri.', features: ['Sarı qızıl', 'Gün və tarix', 'President bracelet', 'Calibre 3255'], image: '/assets/watches/gold-heritage.jpg', gallery: ['/assets/watches/gold-heritage.jpg', '/assets/watches/gold-heritage-2.jpg'], isFeatured: true, isNew: true, createdAt: '2026-01-10' },
  { id: 'cm-003', name: 'Omega De Ville Prestige', brand: 'Omega', brandId: 'omega', slug: 'omega-de-ville-prestige', category: 'Klassik', collection: 'klassik-maison', price: 4850, gender: 'Qadın', mechanism: 'Avtomatik', caseMaterial: 'Paslanmaz polad', strapMaterial: 'Metal biləkzənciri', waterResistance: '30m', color: 'Gümüş', availability: 'Mövcuddur', description: 'Omega De Ville Prestige — incə və zərif dizayn. Master Chronometer sertifikatlı avtomatik mexanizm.', features: ['Master Chronometer', 'Co-Axial 8800', 'Gümüş dial', '34mm korpus'], image: '/assets/watches/silver-moon.jpg', gallery: ['/assets/watches/silver-moon.jpg'], isPopular: true, createdAt: '2025-09-20' },
  { id: 'cm-004', name: 'Rolex Datejust 41', brand: 'Rolex', brandId: 'rolex', slug: 'rolex-datejust-41', category: 'Klassik', collection: 'klassik-maison', price: 15800, gender: 'Uniseks', mechanism: 'Avtomatik', caseMaterial: 'Paslanmaz polad', strapMaterial: 'Jubilee biləkzənciri', waterResistance: '100m', color: 'Yaşıl', availability: 'Məhdud', description: 'Rolex Datejust 41 — yaşıl dial və fluted bezel ilə klassik zəriflik.', features: ['Yaşıl dial', 'Fluted bezel', 'Jubilee bracelet', 'Calibre 3235'], image: '/assets/watches/emerald-classic.jpg', gallery: ['/assets/watches/emerald-classic.jpg'], isNew: true, createdAt: '2026-02-01' },
  { id: 'cm-005', name: 'TAG Heuer Carrera Chronograph', brand: 'TAG Heuer', brandId: 'tag-heuer', slug: 'tag-heuer-carrera-chronograph', category: 'Xronograf', collection: 'qizili-zeriflik', price: 7200, gender: 'Kişi', mechanism: 'Xronograf', caseMaterial: 'Paslanmaz polad', strapMaterial: 'Əsl dəri', waterResistance: '100m', color: 'Gümüş', availability: 'Mövcuddur', description: 'TAG Heuer Carrera Chronograph — avtomobil yarışlarından ilhamlanan professional xronograf.', features: ['Xronograf', 'Tachymeter', 'Heuer 02', 'Safir kristal'], image: '/assets/watches/executive-chronograph.jpg', gallery: ['/assets/watches/executive-chronograph.jpg'], isFeatured: true, isPopular: true, createdAt: '2025-10-05' },
  { id: 'cm-006', name: 'Cartier Ballon Bleu', brand: 'Cartier', brandId: 'cartier', slug: 'cartier-ballon-bleu', category: 'Klassik', collection: 'klassik-maison', price: 9800, gender: 'Qadın', mechanism: 'Avtomatik', caseMaterial: 'Rose gold örtüklü polad', strapMaterial: 'Əsl dəri', waterResistance: '30m', color: 'Rose gold', availability: 'Mövcuddur', description: 'Cartier Ballon Bleu — qadın zərifliyinin simvolu. Mavi kabochon tacı ilə ikonik dizayn.', features: ['Rose gold', 'Mavi kabochon', 'Avtomatik', '33mm korpus'], image: '/assets/watches/rose-pearl.jpg', gallery: ['/assets/watches/rose-pearl.jpg'], isPopular: true, createdAt: '2025-08-12' },
  { id: 'cm-007', name: 'IWC Portugieser', brand: 'IWC', brandId: 'iwc', slug: 'iwc-portugieser', category: 'Şəhər', collection: 'seher-stili', price: 12400, gender: 'Kişi', mechanism: 'Avtomatik', caseMaterial: 'Paslanmaz polad', strapMaterial: 'Əsl dəri', waterResistance: '30m', color: 'Boz', availability: 'Mövcuddur', description: 'IWC Portugieser — klassik portuqal dizaynı və məşhur IWC sənətkarlığı.', features: ['Böyük dial', 'Calibre 82100', 'Əsl dəri', '60h power reserve'], image: '/assets/watches/midnight-steel.jpg', gallery: ['/assets/watches/midnight-steel.jpg'], createdAt: '2025-07-18' },
  { id: 'cm-008', name: 'Omega Seamaster Aqua Terra', brand: 'Omega', brandId: 'omega', slug: 'omega-seamaster-aqua-terra', category: 'Şəhər', collection: 'seher-stili', price: 6500, gender: 'Uniseks', mechanism: 'Avtomatik', caseMaterial: 'Paslanmaz polad', strapMaterial: 'Əsl dəri', waterResistance: '150m', color: 'Bej', availability: 'Mövcuddur', description: 'Omega Seamaster Aqua Terra — gündəlik lüks üçün ideal. Teak doku dial.', features: ['Teak dial', 'Master Chronometer', '150m', 'Co-Axial 8900'], image: '/assets/watches/urban-leather.jpg', gallery: ['/assets/watches/urban-leather.jpg'], isNew: true, createdAt: '2026-01-25' },
  { id: 'cm-009', name: 'Audemars Piguet Royal Oak', brand: 'Audemars Piguet', brandId: 'audemars-piguet', slug: 'audemars-piguet-royal-oak', category: 'Avtomatik', collection: 'avtomatik-kolleksiya', price: 38500, gender: 'Kişi', mechanism: 'Avtomatik', caseMaterial: 'Paslanmaz polad', strapMaterial: 'Metal biləkzənciri', waterResistance: '50m', color: 'Gümüş', availability: 'Məhdud', description: 'Audemars Piguet Royal Oak — Tapisserie dial və octagonal bezel ilə ikon.', features: ['Tapisserie dial', 'Integrated bracelet', 'Calibre 4302', '50m'], image: '/assets/watches/sapphire-automatic.jpg', gallery: ['/assets/watches/sapphire-automatic.jpg'], isFeatured: true, createdAt: '2025-12-01' },
  { id: 'cm-010', name: 'Patek Philippe Nautilus', brand: 'Patek Philippe', brandId: 'patek-philippe', slug: 'patek-philippe-nautilus', category: 'Qızıl', collection: 'qizili-zeriflik', price: 95000, gender: 'Kişi', mechanism: 'Avtomatik', caseMaterial: 'Paslanmaz polad', strapMaterial: 'Metal biləkzənciri', waterResistance: '120m', color: 'Göy', availability: 'Sifarişlə', description: 'Patek Philippe Nautilus — lüks saat dünyasının ən arzuolunan modellərindən biri.', features: ['Mavi dial', 'Calibre 26-330', 'Embossed dial', '120m'], image: '/assets/watches/noble-blue.jpg', gallery: ['/assets/watches/noble-blue.jpg'], isPopular: true, createdAt: '2025-10-28' },
  { id: 'cm-011', name: 'Bvlgari Serpenti Tubogas', brand: 'Bvlgari', brandId: 'bvlgari', slug: 'bvlgari-serpenti-tubogas', category: 'Qızıl', collection: 'qizili-zeriflik', price: 14200, gender: 'Qadın', mechanism: 'Kvars', caseMaterial: 'Sarı qızıl', strapMaterial: 'Tubogas biləkzənciri', waterResistance: '30m', color: 'Qızıl', availability: 'Mövcuddur', description: 'Bvlgari Serpenti Tubogas — ilan formasında ikonik qızıl biləkzəncir.', features: ['Tubogas bracelet', 'Serpenti dizayn', 'Qızıl korpus', '35mm'], image: '/assets/watches/velvet-gold.jpg', gallery: ['/assets/watches/velvet-gold.jpg'], isFeatured: true, createdAt: '2025-11-20' },
  { id: 'cm-012', name: 'Jaeger-LeCoultre Master Ultra Thin', brand: 'Jaeger-LeCoultre', brandId: 'jaeger-lecoultre', slug: 'jaeger-lecoultre-master-ultra-thin', category: 'Avtomatik', collection: 'avtomatik-kolleksiya', price: 11800, gender: 'Uniseks', mechanism: 'Avtomatik', caseMaterial: 'Paslanmaz polad', strapMaterial: 'Əsl dəri', waterResistance: '50m', color: 'Ağ', availability: 'Mövcuddur', description: 'Jaeger-LeCoultre Master Ultra Thin — incəlik və sənətkarlığın zirvəsi.', features: ['Ultra thin 7.5mm', 'Calibre 896/1', 'Ağ dial', 'Əsl dəri'], image: '/assets/watches/crystal-line.jpg', gallery: ['/assets/watches/crystal-line.jpg'], isNew: true, isPopular: true, createdAt: '2026-02-15' },
]

function formatProduct(p) {
  const optional = []
  if (p.isNew) optional.push('    isNew: true,')
  if (p.isPopular) optional.push('    isPopular: true,')
  if (p.isFeatured) optional.push('    isFeatured: true,')
  return `  {
    id: '${p.id}',
    name: '${p.name}',
    brand: '${p.brand}',
    brandId: '${p.brandId}',
    slug: '${p.slug}',
    category: '${p.category}',
    collection: '${p.collection}',
    price: ${p.price},
    gender: '${p.gender}',
    mechanism: '${p.mechanism}',
    caseMaterial: '${p.caseMaterial}',
    strapMaterial: '${p.strapMaterial}',
    waterResistance: '${p.waterResistance}',
    color: '${p.color}',
    availability: '${p.availability}',
    description: '${p.description}',
    features: ${JSON.stringify(p.features)},
    image: '${p.image}',
    gallery: ${JSON.stringify(p.gallery)},
${optional.join('\n')}
    createdAt: '${p.createdAt}',
  }`
}

const header = fs.readFileSync('src/data/products.ts', 'utf8').split('export const products')[0]
const footer = `]

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
`

const body = 'export const products: Product[] = [\n' + products.map(formatProduct).join(',\n') + '\n'
fs.writeFileSync('src/data/products.ts', header + body + footer)
console.log('Patched products.ts')
