/**
 * Kateqoriya portal şəkilləri — krem fon (#f5f0e6)
 */
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { BG, isNearBg, processRawToCream } from './lib/cream-bg.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const outDir = path.join(root, 'public/assets/banners')

const CANVAS = 2000
const WATCHES_PRODUCT = 'public/assets/watches/rolex-datejust-champagne-diamond.png'

const CANVAS_LEGACY = 1600

function subjectBounds(data, width, height, cropPad = 0.04) {
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
      if (isNearBg(r, g, b)) continue
      if (minX > x) minX = x
      if (minY > y) minY = y
      if (maxX < x) maxX = x
      if (maxY < y) maxY = y
    }
  }

  const padX = Math.round((maxX - minX + 1) * cropPad)
  const padY = Math.round((maxY - minY + 1) * cropPad)

  return {
    left: Math.max(0, minX - padX),
    top: Math.max(0, minY - padY),
    width: Math.min(width, maxX + padX + 1) - Math.max(0, minX - padX),
    height: Math.min(height, maxY + padY + 1) - Math.max(0, minY - padY),
  }
}

async function loadCreamRaw(src, { scrub = false } = {}) {
  const inputPath = path.join(root, src)
  if (!fs.existsSync(inputPath)) {
    console.warn('Skip — missing:', src)
    return null
  }

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  processRawToCream(data, info.width, info.height, { scrub })
  return { data, width: info.width, height: info.height }
}

async function buildHeroCover(
  src,
  out,
  { canvasW = 3200, canvasH = 1600, focusX = 0.58, focusY = 0.46, scrub = false } = {},
) {
  const loaded = await loadCreamRaw(src, { scrub })
  if (!loaded) return

  const { data, width, height } = loaded
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
    .sharpen({ sigma: 0.4, m1: 0.35, m2: 0.25 })
    .avif({ quality: 86, effort: 4 })
    .toFile(outPath)

  console.log('✓', out)
}

async function buildCoverTile(
  src,
  out,
  {
    size = CANVAS,
    focusX = 0.5,
    focusY = 0.42,
    scrub = false,
  } = {},
) {
  const loaded = await loadCreamRaw(src, { scrub })
  if (!loaded) return

  const { data, width, height } = loaded
  const flatBuffer = await sharp(data, { raw: { width, height, channels: 4 } })
    .png()
    .toBuffer()

  const scale = Math.max(size / width, size / height)
  const resizedW = Math.round(width * scale)
  const resizedH = Math.round(height * scale)
  const cropLeft = Math.max(0, Math.min(resizedW - size, Math.round((resizedW - size) * focusX)))
  const cropTop = Math.max(0, Math.min(resizedH - size, Math.round((resizedH - size) * focusY)))

  fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, out)

  await sharp(flatBuffer)
    .resize(resizedW, resizedH, { fit: 'fill', kernel: sharp.kernel.lanczos3 })
    .extract({ left: cropLeft, top: cropTop, width: size, height: size })
    .sharpen({ sigma: 0.45, m1: 0.4, m2: 0.28 })
    .jpeg({ quality: 98, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(outPath)

  console.log('✓', out)
}

async function buildProductPortal(
  src,
  out,
  {
    canvas = PRODUCT_CANVAS,
    scrub = true,
    fillRatio = 0.7,
    maxUpscale = 2,
  } = {},
) {
  const loaded = await loadCreamRaw(src, { scrub })
  if (!loaded) return

  const { data, width, height } = loaded
  const crop = subjectBounds(data, width, height)
  const flat = await sharp(data, { raw: { width, height, channels: 4 } })
    .extract(crop)
    .png()
    .toBuffer()

  const meta = await sharp(flat).metadata()
  const srcW = meta.width ?? 1
  const srcH = meta.height ?? 1

  const topBand = Math.round(canvas * 0.19)
  const bottomPad = Math.round(canvas * 0.05)
  const availH = canvas - topBand - bottomPad
  const availW = Math.round(canvas * 0.9)

  const fillScale = (Math.min(availW, availH) * fillRatio) / Math.max(srcW, srcH)
  let scale = Math.min(availW / srcW, availH / srcH)
  scale = Math.max(scale, fillScale)
  scale = Math.min(scale, maxUpscale)

  const w = Math.round(srcW * scale)
  const h = Math.round(srcH * scale)

  const subject = await sharp(flat)
    .resize(w, h, { fit: 'inside', kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.55, m1: 0.5, m2: 0.35 })
    .png()
    .toBuffer()

  fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, out)

  await sharp({
    create: { width: canvas, height: canvas, channels: 3, background: BG },
  })
    .composite([
      {
        input: subject,
        left: Math.round((canvas - w) / 2),
        top: topBand + Math.round((availH - h) / 2),
      },
    ])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outPath)

  console.log('✓', out)
}

async function buildShowcase(
  src,
  out,
  {
    inner = 1280,
    canvasW = CANVAS_LEGACY,
    canvasH = CANVAS_LEGACY,
    scrub = false,
    fillRatio = 0.82,
    maxUpscale = 2.5,
    jpegQuality = 96,
    sharpenSigma = 0.5,
  } = {},
) {
  const loaded = await loadCreamRaw(src, { scrub })
  if (!loaded) return

  const { data, width, height } = loaded
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
  const minSide = Math.min(canvasW, canvasH)
  const fillScale = (minSide * fillRatio) / Math.max(srcW, srcH)
  let scale = Math.min(maxInnerW / srcW, maxInnerH / srcH)
  scale = Math.max(scale, fillScale)
  scale = Math.min(scale, maxUpscale)

  const w = Math.round(srcW * scale)
  const h = Math.round(srcH * scale)

  const subject = await sharp(flat)
    .resize(w, h, { fit: 'inside', kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: sharpenSigma, m1: 0.48, m2: 0.32 })
    .toBuffer()

  fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, out)

  await sharp({
    create: { width: canvasW, height: canvasH, channels: 3, background: BG },
  })
    .composite([
      {
        input: subject,
        left: Math.round((canvasW - w) / 2),
        top: Math.round((canvasH - h) / 2),
      },
    ])
    .jpeg({ quality: jpegQuality, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(outPath)

  console.log('✓', out)
}

async function buildWatchPortalCover(
  src,
  out,
  {
    size = 2000,
    scrub = true,
    maxUpscale = 3.05,
    cropPad = 0.01,
    jpegQuality = 98,
    sharpenSigma = 0.78,
  } = {},
) {
  const loaded = await loadCreamRaw(src, { scrub })
  if (!loaded) return

  const { data, width, height } = loaded
  const crop = subjectBounds(data, width, height, cropPad)
  const flat = await sharp(data, { raw: { width, height, channels: 4 } })
    .extract(crop)
    .png()
    .toBuffer()

  const meta = await sharp(flat).metadata()
  const srcW = meta.width ?? 1
  const srcH = meta.height ?? 1
  const coverScale = Math.max(size / srcW, size / srcH) * 1.06
  const scale = Math.min(coverScale, maxUpscale)
  const w = Math.round(srcW * scale)
  const h = Math.round(srcH * scale)

  const subject = await sharp(flat)
    .resize(w, h, { fit: 'inside', kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: sharpenSigma, m1: 0.52, m2: 0.34 })
    .toBuffer()

  fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, out)

  await sharp({
    create: { width: size, height: size, channels: 3, background: BG },
  })
    .composite([
      {
        input: subject,
        left: Math.round((size - w) / 2),
        top: Math.round((size - h) / 2),
      },
    ])
    .jpeg({ quality: jpegQuality, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(outPath)

  console.log('✓', out)
}

await buildHeroCover(
  'public/assets/banners/jewelry-portal-source.avif',
  'jewelry-portal-hero.avif',
  { canvasW: 3200, canvasH: 1600, focusX: 0.58, focusY: 0.46 },
)
await buildWatchPortalCover(WATCHES_PRODUCT, 'watches-portal.jpg')
await buildShowcase(
  'public/assets/bags/hermes-birkin-gold-togo-palladium.jpg',
  'bags-portal.jpg',
  { inner: 1280, scrub: true, fillRatio: 0.84 },
)
