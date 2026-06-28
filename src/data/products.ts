export interface Product {
  id: string
  name: string
  brand: string
  brandId: string
  price: number
  image: string
  category: 'watches' | 'bags' | 'jewelry'
  description: string
}

/** Qiymətlər AZN (₼) — Bakı ikinci bazar / butik segmentinə uyğun (1 USD ≈ 1,70 ₼, 2026) */
export const products: Product[] = [
  // ─── Saatlar ───
  {
    id: 'w001',
    name: 'Rolex Datejust 41 Blue Dial Fluted Bezel Jubilee',
    brand: 'Rolex',
    brandId: 'rolex',
    price: 25500,
    image: '/assets/watches/rolex-datejust-41-blue-dial.png',
    category: 'watches',
    description:
      'Ref. 126334. Oystersteel korpus, 18 kt ağ qızıl yivli bezel, mavi sunray dial, Jubilee bilərzik. Superlative Chronometer. Bakı bazarında bu konfiqurasiya təxminən 24 000–27 000 ₼ aralığındadır.',
  },
  {
    id: 'w002',
    name: 'Hublot Spirit of Big Bang Black Magic',
    brand: 'Hublot',
    brandId: 'hublot',
    price: 44000,
    image: '/assets/watches/hublot-spirit-big-bang-black.png',
    category: 'watches',
    description:
      'Tonnel formalı qara keramika korpus, skelet dial, HUB4700 avtomatik xronoqraf. Qara kauçuk qayış. Bakı bazarında təxminən 42 000–46 000 ₼.',
  },
  {
    id: 'w003',
    name: 'Rolex Cosmograph Daytona Two-Tone Ref. 116503',
    brand: 'Rolex',
    brandId: 'rolex',
    price: 44500,
    image: '/assets/watches/rolex-daytona-two-tone.png',
    category: 'watches',
    description:
      'Rolesor — Oystersteel və 18 kt sarı qızıl. Qara dial, qızıl tachymetric bezel, Oyster bilərzik. Bakı bazarında iki tonlu Daytona təxminən 43 000–47 000 ₼.',
  },
  {
    id: 'w004',
    name: 'Rolex Datejust 41 Everose Diamond Dial Ref. 126331',
    brand: 'Rolex',
    brandId: 'rolex',
    price: 32000,
    image: '/assets/watches/rolex-datejust-41-everose-diamond.png',
    category: 'watches',
    description:
      'Everose qızıl yivli bezel, brilyant saat işarələri, Jubilee bilərzik. İki tonlu Rolesor. Bakı bazarında təxminən 30 000–34 000 ₼.',
  },
  {
    id: 'w005',
    name: 'Rolex Submariner Date «Bluesy» Ref. 126613LB',
    brand: 'Rolex',
    brandId: 'rolex',
    price: 29500,
    image: '/assets/watches/rolex-submariner-bluesy.png',
    category: 'watches',
    description:
      'İki tonlu Oystersteel və sarı qızıl. Mavi Cerachrom bezel, mavi dial, 300 m suya davamlılıq. Bakı bazarında «Bluesy» təxminən 28 000–31 000 ₼.',
  },
  {
    id: 'w006',
    name: 'Rolex Submariner Date «Starbucks» Ref. 126610LV',
    brand: 'Rolex',
    brandId: 'rolex',
    price: 28000,
    image: '/assets/watches/rolex-submariner-starbucks.png',
    category: 'watches',
    description:
      'Oystersteel, yaşıl Cerachrom bezel, qara dial, 41 mm Oyster bilərzik. Bakı bazarında yaşıl bezel Submariner təxminən 26 500–29 500 ₼.',
  },
  {
    id: 'w007',
    name: 'Hublot Big Bang Blue Chronograph',
    brand: 'Hublot',
    brandId: 'hublot',
    price: 20000,
    image: '/assets/watches/hublot-big-bang-blue.png',
    category: 'watches',
    description:
      'Mavi sunray dial, üç xronoqraf sub-dial, fusion dəri/kauçuk qayış. Bakı bazarında Big Bang xronoqraf təxminən 18 500–21 500 ₼.',
  },
  {
    id: 'w008',
    name: 'Patek Philippe Nautilus 7118/1200R Purple Dial',
    brand: 'Patek Philippe',
    brandId: 'patek-philippe',
    price: 118000,
    image: '/assets/watches/patek-nautilus-7118-purple.png',
    category: 'watches',
    description:
      'Qadın Nautilus, 18 kt rose qızıl, brilyant bezel, bənövşəyi dial. Bakı bazarında bu model təxminən 110 000–125 000 ₼ aralığındadır.',
  },
  {
    id: 'w009',
    name: 'Hublot Big Bang Unico White Ceramic',
    brand: 'Hublot',
    brandId: 'hublot',
    price: 34000,
    image: '/assets/watches/hublot-big-bang-unico-white.png',
    category: 'watches',
    description:
      'Ağ keramika korpus, skelet Unico mexanizm, ağ kauçuk qayış. Bakı bazarında təxminən 32 000–36 000 ₼.',
  },
  {
    id: 'w010',
    name: 'Rolex Datejust Two-Tone Champagne Diamond Dial',
    brand: 'Rolex',
    brandId: 'rolex',
    price: 24500,
    image: '/assets/watches/rolex-datejust-champagne-diamond.png',
    category: 'watches',
    description:
      'Champagne dial, 10 brilyant işarə, hamar qızıl bezel, Oyster bilərzik. Ref. 126203. Bakı bazarında təxminən 23 000–26 000 ₼.',
  },
  {
    id: 'w011',
    name: 'Rolex Datejust 41 Green Dial Fluted Bezel Jubilee',
    brand: 'Rolex',
    brandId: 'rolex',
    price: 26500,
    image: '/assets/watches/rolex-datejust-41-green-dial.png',
    category: 'watches',
    description:
      'Ref. 126334. Mint yaşıl dial, ağ qızıl yivli bezel, Jubilee bilərzik. Bakı bazarında yaşıl Datejust təxminən 25 000–28 000 ₼.',
  },

  // ─── Çantalar ───
  {
    id: 'b001',
    name: 'Louis Vuitton Alma BB Damier Ebene',
    brand: 'Louis Vuitton',
    brandId: 'louis-vuitton',
    price: 2800,
    image: '/assets/bags/lv-alma-bb-damier-ebene.jpg',
    category: 'bags',
    description:
      'Damier Ebene canvas, qızıl hardware, double-zip bağlama. Qutu və dust bag ilə. Bakı bazarında yaxşı vəziyyətli model təxminən 2 600–3 200 ₼.',
  },
  {
    id: 'b002',
    name: 'Louis Vuitton Alma BB Monogram Canvas',
    brand: 'Louis Vuitton',
    brandId: 'louis-vuitton',
    price: 2900,
    image: '/assets/bags/lv-alma-bb-monogram.jpg',
    category: 'bags',
    description:
      'Klassik Monogram canvas, vachetta dəri, qızıl hardware. Bakı bazarında Alma BB Monogram təxminən 2 700–3 300 ₼.',
  },
  {
    id: 'b003',
    name: 'Louis Vuitton Petit Palais Monogram Giant',
    brand: 'Louis Vuitton',
    brandId: 'louis-vuitton',
    price: 5500,
    image: '/assets/bags/lv-petit-palais-monogram-giant.jpg',
    category: 'bags',
    description:
      'Monogram Giant canvas, Monogram Reverse tutacaqlar, qızıl hardware. Bakı bazarında yeni vəziyyətdə təxminən 5 200–6 000 ₼.',
  },
  {
    id: 'b004',
    name: 'Bottega Veneta Large Andiamo Tote Cognac',
    brand: 'Bottega Veneta',
    brandId: 'bottega-veneta',
    price: 14500,
    image: '/assets/bags/bottega-veneta-andiamo-tote.jpg',
    category: 'bags',
    description:
      'Cognac buzəyi dəri, intrecciato düyünlü bağlama, böyük tote. Bakı bazarında Andiamo Large təxminən 13 500–15 500 ₼.',
  },
  {
    id: 'b005',
    name: 'Hermès Kelly Ado II Vert Cypress',
    brand: 'Hermès',
    brandId: 'hermes',
    price: 32000,
    image: '/assets/bags/hermes-kelly-ado-vert-cypress.jpg',
    category: 'bags',
    description:
      'Togo dəri, Vert Cypress rəng, palladium hardware, Kelly turn-lock. Hermès Azərbaycanda rəsmi təmsilçi olmadığından Bakı bazarında təxminən 30 000–35 000 ₼.',
  },
  {
    id: 'b006',
    name: 'Louis Vuitton Easy Pouch Monogram Empreinte',
    brand: 'Louis Vuitton',
    brandId: 'louis-vuitton',
    price: 3600,
    image: '/assets/bags/lv-easy-pouch-empreinte.jpg',
    category: 'bags',
    description:
      'Monogram Empreinte dəri, qızıl hardware, tənzimlənən qayış. Qutu ilə. Bakı bazarında təxminən 3 300–4 000 ₼.',
  },

  // ─── Zinət əşyaları ───
  {
    id: 'j001',
    name: 'Harry Winston Lily Cluster Diamond Bracelet',
    brand: 'Harry Winston',
    brandId: 'harry-winston',
    price: 16500,
    image: '/assets/jewelry/harry-winston-lily-cluster-bracelet.jpg',
    category: 'jewelry',
    description:
      '18 kt sarı qızıl, Lily Cluster kolleksiyası, pavé brilyantlar. Bakı bazarında təxminən 15 500–18 000 ₼.',
  },
  {
    id: 'j002',
    name: 'Paraiba Tourmaline High Jewelry Necklace',
    brand: 'Harry Winston',
    brandId: 'harry-winston',
    price: 485000,
    image: '/assets/jewelry/paraiba-tourmaline-necklace.jpg',
    category: 'jewelry',
    description:
      'Haute Joaillerie — mərkəzdə Paraiba turmalin, brilyant halo. Daşın keyfiyyətinə görə Bakıda belə parçalar adətən 450 000 ₼-dən yuxarı qiymətləndirilir.',
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
