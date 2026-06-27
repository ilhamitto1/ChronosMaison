import fs from 'fs'
import path from 'path'
import https from 'https'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const brandsDir = path.join(__dirname, '..', 'public', 'assets', 'brands')

const cdnLogos = {
  'richard-mille.svg': 'https://cdn.worldvectorlogo.com/logos/richard-mille-1.svg',
  'carl-f-bucherer.svg': 'https://cdn.worldvectorlogo.com/logos/bucherer.svg',
  'hermes.svg': 'https://cdn.worldvectorlogo.com/logos/hermes-2.svg',
  'maurice-lacroix.svg': 'https://cdn.worldvectorlogo.com/logos/maurice-lacroix.svg',
}

function fetch(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetch(res.headers.location).then(resolve).catch(reject)
        }
        const chunks = []
        res.on('data', (c) => chunks.push(c))
        res.on('end', () => resolve({ status: res.statusCode, buf: Buffer.concat(chunks) }))
      })
      .on('error', reject)
  })
}

for (const [file, url] of Object.entries(cdnLogos)) {
  try {
    const { status, buf } = await fetch(url)
    if (status !== 200 || !buf.toString('utf8', 0, 50).includes('<svg')) {
      console.log(`${file}: skip (${status})`)
      continue
    }
    fs.writeFileSync(path.join(brandsDir, file), buf)
    console.log(`${file}: OK (${buf.length}b)`)
    await new Promise((r) => setTimeout(r, 800))
  } catch (e) {
    console.log(`${file}: ${e.message}`)
  }
}

// Maurice Lacroix: remove white background, use light gold on dark cards
const mlPath = path.join(brandsDir, 'maurice-lacroix.svg')
if (fs.existsSync(mlPath)) {
  let svg = fs.readFileSync(mlPath, 'utf8')
  svg = svg
    .replace(/<path fill="#fff" d="M0 0h192\.756v192\.756H0V0z"\/>/g, '')
    .replace(/fill="#cc2229"/g, 'fill="#e8d5a3"')
    .replace(/stroke="#cc2229"/g, 'stroke="#e8d5a3"')
  fs.writeFileSync(mlPath, svg)
  console.log('maurice-lacroix.svg: cleaned for dark theme')
}

// Carl F. Bucherer: remove white background, gold paths
const cfbPath = path.join(brandsDir, 'carl-f-bucherer.svg')
if (fs.existsSync(cfbPath)) {
  let svg = fs.readFileSync(cfbPath, 'utf8')
  svg = svg
    .replace(/<path fill="#fff" d="M0 0h192\.756v192\.756H0V0z"\/>/g, '')
    .replace(/<path d="/g, '<path fill="#e8d5a3" d="')
  fs.writeFileSync(cfbPath, svg)
  console.log('carl-f-bucherer.svg: cleaned for dark theme')
}

// Richard Mille: black paths → gold for dark cards
const rmPath = path.join(brandsDir, 'richard-mille.svg')
if (fs.existsSync(rmPath)) {
  let svg = fs.readFileSync(rmPath, 'utf8')
  if (!svg.includes('fill=')) {
    svg = svg.replace('<path d="', '<path fill="#e8d5a3" d="')
  }
  fs.writeFileSync(rmPath, svg)
  console.log('richard-mille.svg: recolored for dark theme')
}

// Custom logos for brands not on CDN
const messikaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" fill="none">
  <text x="160" y="36" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="26" fill="#e8d5a3" letter-spacing="12">MESSIKA</text>
  <path d="M160 48 L166 58 L160 68 L154 58 Z" fill="#c9a962"/>
  <line x1="130" y1="74" x2="190" y2="74" stroke="#c9a962" stroke-width="1" opacity="0.6"/>
</svg>`

const louisMoinetSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 100" fill="none">
  <circle cx="160" cy="32" r="18" stroke="#c9a962" stroke-width="1.5" fill="none"/>
  <line x1="160" y1="20" x2="160" y2="26" stroke="#e8d5a3" stroke-width="1.5"/>
  <line x1="160" y1="38" x2="160" y2="44" stroke="#e8d5a3" stroke-width="1.5"/>
  <line x1="148" y1="32" x2="154" y2="32" stroke="#e8d5a3" stroke-width="1.5"/>
  <line x1="166" y1="32" x2="172" y2="32" stroke="#e8d5a3" stroke-width="1.5"/>
  <text x="160" y="72" text-anchor="middle" font-family="Georgia, serif" font-size="15" fill="#e8d5a3" letter-spacing="3">LOUIS MOINET</text>
  <text x="160" y="88" text-anchor="middle" font-family="Georgia, serif" font-size="9" fill="#c9a962" letter-spacing="4">SWISS WATCHES</text>
</svg>`

fs.writeFileSync(path.join(brandsDir, 'messika.svg'), messikaSvg)
fs.writeFileSync(path.join(brandsDir, 'louis-moinet.svg'), louisMoinetSvg)
console.log('messika.svg + louis-moinet.svg: created')

// Remove corrupt HTML disguised as PNG
for (const file of fs.readdirSync(brandsDir)) {
  if (!file.endsWith('.png')) continue
  const fp = path.join(brandsDir, file)
  const head = fs.readFileSync(fp).toString('utf8', 0, 20)
  if (head.includes('<!DOCTYPE') || head.includes('<html')) {
    fs.unlinkSync(fp)
    console.log(`${file}: removed corrupt file`)
  }
}
