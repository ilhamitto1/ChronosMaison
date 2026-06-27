import fs from 'fs'
import path from 'path'
import https from 'https'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const brandsDir = path.join(__dirname, '..', 'public', 'assets', 'brands')

const sources = {
  'richard-mille': [
    'https://www.vectorlogo.zone/logos/richardmille/richardmille-ar21.svg',
    'https://cdn.worldvectorlogo.com/logos/richard-mille.svg',
  ],
  'maurice-lacroix': [
    'https://www.vectorlogo.zone/logos/mauricelacroix/mauricelacroix-ar21.svg',
    'https://cdn.worldvectorlogo.com/logos/maurice-lacroix.svg',
  ],
  'hermes': [
    'https://www.vectorlogo.zone/logos/hermes/hermes-ar21.svg',
    'https://cdn.worldvectorlogo.com/logos/hermes-2.svg',
  ],
  'carl-f-bucherer': [
    'https://www.vectorlogo.zone/logos/carlfbucherer/carlfbucherer-ar21.svg',
    'https://cdn.worldvectorlogo.com/logos/carl-f-bucherer.svg',
  ],
  'messika': [
    'https://cdn.worldvectorlogo.com/logos/messika.svg',
  ],
  'louis-moinet': [
    'https://www.louismoinet.com/wp-content/themes/louismoinet/assets/img/logo.svg',
    'https://www.louismoinet.com/wp-content/uploads/2021/03/logo-lm.png',
  ],
}

function fetch(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const next = res.headers.location.startsWith('http')
            ? res.headers.location
            : new URL(res.headers.location, url).href
          return fetch(next).then(resolve).catch(reject)
        }
        const chunks = []
        res.on('data', (c) => chunks.push(c))
        res.on('end', () => resolve({ status: res.statusCode, buf: Buffer.concat(chunks), type: res.headers['content-type'] }))
      })
      .on('error', reject)
  })
}

function detectType(buf) {
  if (buf.length < 4) return null
  if (buf[0] === 0x89 && buf[1] === 0x50) return 'png'
  if (buf[0] === 0xff && buf[1] === 0xd8) return 'jpg'
  const head = buf.toString('utf8', 0, Math.min(200, buf.length))
  if (head.includes('<svg') || head.trimStart().startsWith('<?xml')) return 'svg'
  return null
}

fs.mkdirSync(brandsDir, { recursive: true })

for (const [id, urls] of Object.entries(sources)) {
  let saved = false
  for (const url of urls) {
    try {
      const { status, buf } = await fetch(url)
      const kind = detectType(buf)
      if (status !== 200 || !kind || buf.length < 200) {
        console.log(`${id}: skip ${url} (${status}, ${kind}, ${buf.length}b)`)
        continue
      }
      const ext = kind === 'svg' ? '.svg' : '.png'
      const dest = path.join(brandsDir, `${id}${ext}`)
      fs.writeFileSync(dest, buf)
      console.log(`${id}: OK ${dest} (${buf.length}b, ${kind})`)
      saved = true
      break
    } catch (e) {
      console.log(`${id}: fail ${url} — ${e.message}`)
    }
  }
  if (!saved) console.log(`${id}: ALL SOURCES FAILED`)
}
