/**
 * Çanta vitrin şəkli — sayt fonu ilə eyni #0a0a0a, halo təmizləmə, yüksək keyfiyyət
 */
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const BG = { r: 10, g: 10, b: 10 }
const CANVAS = 1600
const INNER = 1280

const SOURCE = path.join(
  root,
  'public/assets/bags/hermes-birkin-jaune-poussin-togo-palladium.jpg',
)
const OUTPUT = path.join(root, 'public/assets/banners/vault-bags-showcase.jpg')

function lum(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function chroma(r, g, b) {
  return Math.max(r, g, b) - Math.min(r, g, b)
}

/** Flood-fill ilə fon + boz halo kənarları */
function buildBackgroundMask(data, width, height) {
  const size = width * height
  const mask = new Uint8Array(size)
  const visited = new Uint8Array(size)
  const queue = []

  const canBeBackground = (i) => {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const a = data[i + 3]
    if (a < 16) return true
    const L = lum(r, g, b)
    const c = chroma(r, g, b)
    if (L < 95 && c < 48) return true
    if (L < 55) return true
    // Boz halo (ağ kəsik qalıqları)
    if (L < 175 && c < 32) return true
    return false
  }

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return
    const p = y * width + x
    if (visited[p]) return
    visited[p] = 1
    if (canBeBackground(p * 4)) queue.push(p)
  }

  for (let x = 0; x < width; x++) {
    push(x, 0)
    push(x, height - 1)
  }
  for (let y = 0; y < height; y++) {
    push(0, y)
    push(width - 1, y)
  }

  while (queue.length > 0) {
    const p = queue.pop()
    if (mask[p]) continue
    mask[p] = 1
    const x = p % width
    const y = (p - x) / width
    push(x - 1, y)
    push(x + 1, y)
    push(x, y - 1)
    push(x, y + 1)
  }

  // Halo genişləndirmə — boz kənar pikselləri fonla birləşdir
  for (let pass = 0; pass < 6; pass++) {
    const next = new Uint8Array(mask)
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const p = y * width + x
        if (mask[p]) continue
        const i = p * 4
        const L = lum(data[i], data[i + 1], data[i + 2])
        const c = chroma(data[i], data[i + 1], data[i + 2])
        if (L > 210 || c > 55) continue
        const touchesBg =
          (x > 0 && mask[p - 1]) ||
          (x < width - 1 && mask[p + 1]) ||
          (y > 0 && mask[p - width]) ||
          (y < height - 1 && mask[p + width])
        if (touchesBg && L < 195 && c < 42) next[p] = 1
      }
    }
    for (let p = 0; p < size; p++) if (next[p]) mask[p] = 1
  }

  return mask
}

async function processSubject(inputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height } = info
  const mask = buildBackgroundMask(data, width, height)

  for (let p = 0; p < width * height; p++) {
    const i = p * 4
    if (mask[p]) {
      data[i] = BG.r
      data[i + 1] = BG.g
      data[i + 2] = BG.b
      data[i + 3] = 255
    }
  }

  return sharp(data, { raw: { width, height, channels: 4 } })
    .png()
    .toBuffer()
}

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error('Source missing:', SOURCE)
    process.exit(1)
  }

  const flattened = await processSubject(SOURCE)
  const meta = await sharp(flattened).metadata()
  const maxDim = Math.max(meta.width ?? 1, meta.height ?? 1)
  const scale = INNER / maxDim
  const w = Math.round((meta.width ?? 1) * scale)
  const h = Math.round((meta.height ?? 1) * scale)

  const subject = await sharp(flattened)
    .resize(w, h, { fit: 'inside', kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 1, m1: 0.6, m2: 0.4 })
    .toBuffer()

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true })

  await sharp({
    create: {
      width: CANVAS,
      height: CANVAS,
      channels: 3,
      background: BG,
    },
  })
    .composite([
      {
        input: subject,
        left: Math.round((CANVAS - w) / 2),
        top: Math.round((CANVAS - h) / 2),
      },
    ])
    .jpeg({ quality: 96, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(OUTPUT)

  console.log('✓ vault-bags-showcase.jpg', `${CANVAS}px`, '← Jaune Poussin Birkin')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
