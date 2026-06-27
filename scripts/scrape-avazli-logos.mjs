import https from 'https'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const brandsDir = path.join(__dirname, '..', 'public', 'assets', 'brands')

function fetchText(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0' }, timeout: 15000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects < 5) {
        const next = res.headers.location.startsWith('http') ? res.headers.location : `https://avazli.com${res.headers.location}`
        return fetchText(next, redirects + 1).then(resolve).catch(reject)
      }
      const chunks = []
      res.on('data', (c) => chunks.push(c))
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    })
    req.on('error', reject)
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')) })
  })
}

function fetchBuf(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0' }, timeout: 15000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects < 5) {
        const next = res.headers.location.startsWith('http') ? res.headers.location : new URL(res.headers.location, url).href
        return fetchBuf(next, redirects + 1).then(resolve).catch(reject)
      }
      const chunks = []
      res.on('data', (c) => chunks.push(c))
      res.on('end', () => resolve({ status: res.statusCode, buf: Buffer.concat(chunks) }))
    })
    req.on('error', reject)
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')) })
  })
}

function isImage(buf) {
  if (buf.length < 8) return false
  if (buf[0] === 0x89 && buf[1] === 0x50) return 'png'
  if (buf[0] === 0xff && buf[1] === 0xd8) return 'jpg'
  const s = buf.toString('utf8', 0, 120)
  if (s.includes('<svg') && !s.includes('<!DOCTYPE')) return 'svg'
  return null
}

const html = await fetchText('https://avazli.com/az/')
const imgPaths = [...html.matchAll(/\/uploads\/posts\/[^"'\s>]+\.(?:png|jpe?g|svg)/gi)].map((m) => m[0])
const unique = [...new Set(imgPaths)]
console.log(`Found ${unique.length} images`)

const keywords = {
  'richard-mille': ['richard', 'mille'],
  'maurice-lacroix': ['maurice', 'lacroix'],
  'louis-moinet': ['moinet'],
  'carl-f-bucherer': ['bucherer'],
  'messika': ['messika', 'messica'],
}

for (const [id, keys] of Object.entries(keywords)) {
  const matches = unique.filter((p) => keys.some((k) => p.toLowerCase().includes(k)))
  console.log(id, 'candidates:', matches)
  const match = matches[0]
  if (!match) continue
  const url = `https://avazli.com${match}`
  const { status, buf } = await fetchBuf(url)
  const kind = isImage(buf)
  if (status === 200 && kind) {
    const dest = path.join(brandsDir, `${id}.${kind === 'jpg' ? 'png' : kind}`)
    fs.writeFileSync(dest, buf)
    console.log(`  -> saved ${dest} (${buf.length}b)`)
  } else {
    console.log(`  -> failed ${status} kind=${kind}`)
  }
}

// worldvectorlogo for brands not on avazli
const cdn = {
  hermes: 'https://cdn.worldvectorlogo.com/logos/hermes-2.svg',
  'maurice-lacroix': 'https://cdn.worldvectorlogo.com/logos/maurice-lacroix.svg',
}
for (const [id, url] of Object.entries(cdn)) {
  try {
    const { status, buf } = await fetchBuf(url)
    const kind = isImage(buf)
    if (status === 200 && kind) {
      const dest = path.join(brandsDir, `${id}.svg`)
      fs.writeFileSync(dest, buf)
      console.log(`cdn ${id} OK (${buf.length}b)`)
    }
  } catch (e) {
    console.log(`cdn ${id} fail`, e.message)
  }
}
