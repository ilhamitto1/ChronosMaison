/**
 * Kateqoriya portal şəkilləri — #0a0a0a fon
 */
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const outDir = path.join(root, 'public/assets/banners')

const BG = { r: 10, g: 10, b: 10 }
const CANVAS = 1600

function lum(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function chroma(r, g, b) {
  return Math.max(r, g, b) - Math.min(r, g, b)
}

function isProtectedSubject(r, g, b, a) {
  if (a < 16) return false

  const L = lum(r, g, b)
  const c = chroma(r, g, b)

  // Dəri — açıq əllər/üz flood fill-ə düşməsin
  if (r > 95 && g > 55 && b > 35 && r >= g - 8 && g >= b - 12 && r - b > 10 && L >= 82 && L <= 245 && c >= 8 && c <= 95) {
    return true
  }

  // Qızıl zinət / sarı libas
  if (r > 145 && g > 105 && b < 135 && L >= 95 && c >= 18) return true

  // Çəhrayı / amber daşlar
  if (r > 120 && g > 70 && b > 45 && r >= g - 5 && L >= 70 && c >= 16) return true

  // Tünd saç / kölgə
  if (L < 78 && c < 55) return true

  return false
}

function isStudioBackground(r, g, b, a) {
  if (a < 16) return true
  if (isProtectedSubject(r, g, b, a)) return false

  const L = lum(r, g, b)
  const c = chroma(r, g, b)

  if (L > 218 && c < 36) return true
  if (L > 198 && c < 26) return true
  if (L > 178 && c < 20) return true
  if (b > r + 10 && b > g + 5 && L >= 65 && L <= 252 && c >= 18) return true
  if (L < 88 && c < 38) return true

  return false
}

function isStrongBackground(r, g, b, a) {
  if (a < 16) return true
  if (isProtectedSubject(r, g, b, a)) return false

  const L = lum(r, g, b)
  const c = chroma(r, g, b)

  return L > 205 && c < 28
}

function buildBackgroundMask(data, width, height) {
  const size = width * height
  const mask = new Uint8Array(size)
  const visited = new Uint8Array(size)
  const queue = []

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return
    const p = y * width + x
    if (visited[p]) return
    visited[p] = 1
    const i = p * 4
    if (isStudioBackground(data[i], data[i + 1], data[i + 2], data[i + 3])) {
      queue.push(p)
    }
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

  for (let pass = 0; pass < 3; pass++) {
    let changed = false
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const p = y * width + x
        if (mask[p]) continue

        const i = p * 4
        if (!isStrongBackground(data[i], data[i + 1], data[i + 2], data[i + 3])) continue

        const touchesBg =
          (x > 0 && mask[p - 1]) ||
          (x < width - 1 && mask[p + 1]) ||
          (y > 0 && mask[p - width]) ||
          (y < height - 1 && mask[p + width])

        if (touchesBg) {
          mask[p] = 1
          changed = true
        }
      }
    }
    if (!changed) break
  }

  return mask
}

function flattenBackground(data, width, height, mask) {
  for (let p = 0; p < width * height; p++) {
    const i = p * 4
    if (mask[p]) {
      data[i] = BG.r
      data[i + 1] = BG.g
      data[i + 2] = BG.b
      data[i + 3] = 255
      continue
    }

    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const minRg = Math.min(r, g)
    if (b > r && b > g && b - minRg > 10 && lum(r, g, b) > 58 && lum(r, g, b) < 248) {
      data[i] = BG.r
      data[i + 1] = BG.g
      data[i + 2] = BG.b
      data[i + 3] = 255
    }
  }
}

function isBgPixel(data, p) {
  const i = p * 4
  return data[i] <= BG.r + 10 && data[i + 1] <= BG.g + 10 && data[i + 2] <= BG.b + 10
}

function subjectBounds(data, width, height) {
  let minX = width
  let minY = height
  let maxX = 0
  let maxY = 0

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      if (r <= BG.r + 8 && g <= BG.g + 8 && b <= BG.b + 8) continue
      if (minX > x) minX = x
      if (minY > y) minY = y
      if (maxX < x) maxX = x
      if (maxY < y) maxY = y
    }
  }

  const padX = Math.round((maxX - minX + 1) * 0.035)
  const padY = Math.round((maxY - minY + 1) * 0.035)

  return {
    left: Math.max(0, minX - padX),
    top: Math.max(0, minY - padY),
    width: Math.min(width, maxX + padX + 1) - Math.max(0, minX - padX),
    height: Math.min(height, maxY + padY + 1) - Math.max(0, minY - padY),
  }
}

async function buildHeroCover(src, out, { canvasW = 3200, canvasH = 1600, focusX = 0.58, focusY = 0.46 } = {}) {
  const inputPath = path.join(root, src)
  if (!fs.existsSync(inputPath)) {
    console.warn('Skip — missing:', src)
    return
  }

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height } = info
  const mask = buildBackgroundMask(data, width, height)
  flattenBackground(data, width, height, mask)

  const flatBuffer = await sharp(data, { raw: { width, height, channels: 4 } })
    .png()
    .toBuffer()

  const scale = Math.max(canvasW / width, canvasH / height)
  const resizedW = Math.round(width * scale)
  const resizedH = Math.round(height * scale)
  const cropLeft = Math.max(0, Math.min(resizedW - canvasW, Math.round((resizedW - canvasW) * focusX)))
  const cropTop = Math.max(0, Math.min(resizedH - canvasH, Math.round((resizedH - canvasH) * focusY)))

  fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, out)

  await sharp(flatBuffer)
    .resize(resizedW, resizedH, { fit: 'fill', kernel: sharp.kernel.lanczos3 })
    .extract({ left: cropLeft, top: cropTop, width: canvasW, height: canvasH })
    .sharpen({ sigma: 0.65, m1: 0.45, m2: 0.3 })
    .avif({ quality: 84, effort: 4 })
    .toFile(outPath)

  console.log('✓', out)
}

async function buildShowcase(src, out, { inner = 1240, format = 'jpeg', canvasW = CANVAS, canvasH = CANVAS } = {}) {
  const inputPath = path.join(root, src)
  if (!fs.existsSync(inputPath)) {
    console.warn('Skip — missing:', src)
    return
  }

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height } = info
  const mask = buildBackgroundMask(data, width, height)
  flattenBackground(data, width, height, mask)

  const crop = subjectBounds(data, width, height)
  const flat = await sharp(data, { raw: { width, height, channels: 4 } })
    .extract(crop)
    .png()
    .toBuffer()

  const meta = await sharp(flat).metadata()
  const srcW = meta.width ?? 1
  const srcH = meta.height ?? 1
  const maxInnerW = canvasW === canvasH ? inner : Math.round(canvasW * 0.94)
  const maxInnerH = canvasW === canvasH ? inner : Math.round(canvasH * 0.88)
  const scale = Math.min(maxInnerW / srcW, maxInnerH / srcH)
  const w = Math.round(srcW * scale)
  const h = Math.round(srcH * scale)

  const subject = await sharp(flat)
    .resize(w, h, { fit: 'inside', kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.85, m1: 0.5, m2: 0.35 })
    .toBuffer()

  fs.mkdirSync(outDir, { recursive: true })

  const base = sharp({
    create: { width: canvasW, height: canvasH, channels: 3, background: BG },
  }).composite([
    {
      input: subject,
      left: Math.round((canvasW - w) / 2),
      top: Math.round((canvasH - h) / 2),
    },
  ])

  const outPath = path.join(outDir, out)
  if (format === 'avif') {
    await base.avif({ quality: 82, effort: 4 }).toFile(outPath)
  } else {
    await base.jpeg({ quality: 96, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(outPath)
  }

  console.log('✓', out)
}

await buildHeroCover(
  'public/assets/banners/jewelry-portal-source.avif',
  'jewelry-portal-hero.avif',
  { canvasW: 3200, canvasH: 1600, focusX: 0.58, focusY: 0.46 },
)
await buildShowcase(
  'public/assets/banners/jewelry-portal-source.avif',
  'jewelry-portal.avif',
  { inner: 1280, format: 'avif' },
)
await buildShowcase(
  'public/assets/bags/hermes-birkin-gold-togo-palladium.jpg',
  'bags-portal.jpg',
  { inner: 1180 },
)
