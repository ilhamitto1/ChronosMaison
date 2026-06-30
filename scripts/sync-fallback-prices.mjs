import { readFileSync, writeFileSync } from 'fs'

const catalog = JSON.parse(readFileSync('src/data/catalog-seed.json', 'utf8'))
const priceById = Object.fromEntries(catalog.map((item) => [item.legacyId, item.price]))

let source = readFileSync('src/data/fallbackProducts.ts', 'utf8')
source = source.replace(
  /\/\*\* Qiymətlər AZN.*?\*\//,
  '/** Qiymətlər USD ($) — luxe kataloq */',
)

for (const [id, price] of Object.entries(priceById)) {
  const pattern = new RegExp(`(id: '${id}',[\\s\\S]*?price: )\\d+`, 'm')
  source = source.replace(pattern, `$1${price}`)
}

writeFileSync('src/data/fallbackProducts.ts', source)
console.log('fallbackProducts.ts prices synced to USD')
