-- ChronosMaison — sayt kataloqunun Supabase-ə köçürülməsi
-- Supabase SQL Editor-də işlədin (18 məhsul: 11 saat, 6 çanta, 2 zinət)
-- Artıq mövcud olan başlıqlar təkrar əlavə edilmir.

insert into public.products (title, category, price, description, image_url, brand, brand_id)
select v.title, v.category, v.price, v.description, v.image_url, v.brand, v.brand_id
from (
  values
(
  'Rolex Datejust 41 Blue Dial Fluted Bezel Jubilee',
  'watches',
  25500,
  'Ref. 126334. Oystersteel korpus, 18 kt ağ qızıl yivli bezel, mavi sunray dial, Jubilee bilərzik. Superlative Chronometer. Bakı bazarında bu konfiqurasiya təxminən 24 000–27 000 ₼ aralığındadır.',
  '/assets/watches/rolex-datejust-41-blue-dial.png',
  'Rolex',
  'rolex'
),
(
  'Hublot Spirit of Big Bang Black Magic',
  'watches',
  44000,
  'Tonnel formalı qara keramika korpus, skelet dial, HUB4700 avtomatik xronoqraf. Qara kauçuk qayış. Bakı bazarında təxminən 42 000–46 000 ₼.',
  '/assets/watches/hublot-spirit-big-bang-black.png',
  'Hublot',
  'hublot'
),
(
  'Rolex Cosmograph Daytona Two-Tone Ref. 116503',
  'watches',
  44500,
  'Rolesor — Oystersteel və 18 kt sarı qızıl. Qara dial, qızıl tachymetric bezel, Oyster bilərzik. Bakı bazarında iki tonlu Daytona təxminən 43 000–47 000 ₼.',
  '/assets/watches/rolex-daytona-two-tone.png',
  'Rolex',
  'rolex'
),
(
  'Rolex Datejust 41 Everose Diamond Dial Ref. 126331',
  'watches',
  32000,
  'Everose qızıl yivli bezel, brilyant saat işarələri, Jubilee bilərzik. İki tonlu Rolesor. Bakı bazarında təxminən 30 000–34 000 ₼.',
  '/assets/watches/rolex-datejust-41-everose-diamond.png',
  'Rolex',
  'rolex'
),
(
  'Rolex Submariner Date «Bluesy» Ref. 126613LB',
  'watches',
  29500,
  'İki tonlu Oystersteel və sarı qızıl. Mavi Cerachrom bezel, mavi dial, 300 m suya davamlılıq. Bakı bazarında «Bluesy» təxminən 28 000–31 000 ₼.',
  '/assets/watches/rolex-submariner-bluesy.png',
  'Rolex',
  'rolex'
),
(
  'Rolex Submariner Date «Starbucks» Ref. 126610LV',
  'watches',
  28000,
  'Oystersteel, yaşıl Cerachrom bezel, qara dial, 41 mm Oyster bilərzik. Bakı bazarında yaşıl bezel Submariner təxminən 26 500–29 500 ₼.',
  '/assets/watches/rolex-submariner-starbucks.png',
  'Rolex',
  'rolex'
),
(
  'Hublot Big Bang Blue Chronograph',
  'watches',
  20000,
  'Mavi sunray dial, üç xronoqraf sub-dial, fusion dəri/kauçuk qayış. Bakı bazarında Big Bang xronoqraf təxminən 18 500–21 500 ₼.',
  '/assets/watches/hublot-big-bang-blue.png',
  'Hublot',
  'hublot'
),
(
  'Patek Philippe Nautilus 7118/1200R Purple Dial',
  'watches',
  118000,
  'Qadın Nautilus, 18 kt rose qızıl, brilyant bezel, bənövşəyi dial. Bakı bazarında bu model təxminən 110 000–125 000 ₼ aralığındadır.',
  '/assets/watches/patek-nautilus-7118-purple.png',
  'Patek Philippe',
  'patek-philippe'
),
(
  'Hublot Big Bang Unico White Ceramic',
  'watches',
  34000,
  'Ağ keramika korpus, skelet Unico mexanizm, ağ kauçuk qayış. Bakı bazarında təxminən 32 000–36 000 ₼.',
  '/assets/watches/hublot-big-bang-unico-white.png',
  'Hublot',
  'hublot'
),
(
  'Rolex Datejust Two-Tone Champagne Diamond Dial',
  'watches',
  24500,
  'Champagne dial, 10 brilyant işarə, hamar qızıl bezel, Oyster bilərzik. Ref. 126203. Bakı bazarında təxminən 23 000–26 000 ₼.',
  '/assets/watches/rolex-datejust-champagne-diamond.png',
  'Rolex',
  'rolex'
),
(
  'Rolex Datejust 41 Green Dial Fluted Bezel Jubilee',
  'watches',
  26500,
  'Ref. 126334. Mint yaşıl dial, ağ qızıl yivli bezel, Jubilee bilərzik. Bakı bazarında yaşıl Datejust təxminən 25 000–28 000 ₼.',
  '/assets/watches/rolex-datejust-41-green-dial.png',
  'Rolex',
  'rolex'
),
(
  'Hermès Birkin 25 Rouge Pivoine Swift Gold Hardware',
  'bags',
  54800,
  'Birkin 25, Rouge Pivoine Swift dəri, qızıl hardware, touret kilid və clochette. İkonik qırmızı ton, hamar Swift texture. Bakı bazarında təxminən 52 000–58 000 ₼.',
  '/assets/bags/hermes-birkin-25-rouge-pivoine-swift-gold.jpg',
  'Hermès',
  'hermes'
),
(
  'Hermès Birkin 30 Gold Togo Palladium Hardware',
  'bags',
  46500,
  'Klassik Gold rəngi Togo dəri, palladium hardware, ağ kontrast tikiş. Birkin 30, padlock və clochette ilə. Bakı bazarında təxminən 44 000–49 000 ₼.',
  '/assets/bags/hermes-birkin-gold-togo-palladium.jpg',
  'Hermès',
  'hermes'
),
(
  'Hermès Birkin 25 Jaune Poussin Togo Palladium Hardware',
  'bags',
  51200,
  'Birkin 25, Jaune Poussin (açıq sarı) Togo dəri, palladium hardware. Nadir rəng, tonal tikiş. Bakı bazarında təxminən 48 000–54 000 ₼.',
  '/assets/bags/hermes-birkin-jaune-poussin-togo-palladium.jpg',
  'Hermès',
  'hermes'
),
(
  'Hermès Mini Kelly 20 Etoupe Epsom Gold Hardware',
  'bags',
  40200,
  'Mini Kelly 20, Etoupe Epsom dəri, qızıl hardware, ağ kontrast tikiş. Sellier siluet, tək qulp. Bakı bazarında təxminən 38 000–43 000 ₼.',
  '/assets/bags/hermes-mini-kelly-20-etoupe-epsom-gold.jpg',
  'Hermès',
  'hermes'
),
(
  'Hermès Kelly 20 Sellier Orange Epsom Palladium Hardware',
  'bags',
  36800,
  'Kelly 20 Sellier, klassik Hermès narıncısı Epsom dəri, palladium hardware. Kəskin kənarlı struktur. Bakı bazarında təxminən 34 000–39 000 ₼.',
  '/assets/bags/hermes-kelly-20-orange-sellier-palladium.jpg',
  'Hermès',
  'hermes'
),
(
  'Hermès Kelly 25 Sellier Rouge Casaque Epsom Palladium Hardware',
  'bags',
  41500,
  'Kelly 25 Sellier, Rouge Casaque Epsom dəri, palladium hardware. İkonik qırmızı ton, xarici tikiş. Bakı bazarında təxminən 39 000–44 000 ₼.',
  '/assets/bags/hermes-kelly-25-rouge-sellier-palladium.jpg',
  'Hermès',
  'hermes'
),
(
  'Paraiba Tourmaline High Jewelry Necklace',
  'jewelry',
  485000,
  'Haute Joaillerie — mərkəzdə Paraiba turmalin, brilyant halo. Daşın keyfiyyətinə görə Bakıda belə parçalar adətən 450 000 ₼-dən yuxarı qiymətləndirilir.',
  '/assets/jewelry/paraiba-tourmaline-necklace.jpg',
  'Harry Winston',
  'harry-winston'
),
(
  'Van Cleef & Arpels Frivole Diamond Ring & Bracelet',
  'jewelry',
  92000,
  'Frivole kolleksiyası — ağ qızıl, pavé brilyant çiçək motivləri. Between the finger üzük və açıq bilərzik. Bakı bazarında təxminən 85 000–100 000 ₼.',
  '/assets/jewelry/van-cleef-frivole-diamond-set.jpg',
  'Van Cleef & Arpels',
  'van-cleefandarpels'
)
) as v(title, category, price, description, image_url, brand, brand_id)
where not exists (
  select 1 from public.products p
  where lower(trim(p.title)) = lower(trim(v.title))
);
