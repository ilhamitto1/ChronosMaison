import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const bagsDir = path.join(root, 'public', 'assets', 'bags')
const size = 1200
const paddingRatio = 0.1
const inner = Math.round(size * (1 - paddingRatio * 2))
const bg = { r: 18, g: 18, b: 18 }

/** removebg PNG → çıxış faylı */
const bagSources = {
  'hermes-birkin-25-rouge-pivoine-swift-gold.jpg':
    'Hermes-Birkin-25-Rouge-Pivoine-Swift-Gold-Hardware-3-removebg-preview.png',
  'hermes-birkin-gold-togo-palladium.jpg':
    'P260610150540-Side1-JPG-1_f70307b5-47a2-4fb0-8035-cf3d6f5bcbfd-removebg-preview.png',
  'hermes-birkin-jaune-poussin-togo-palladium.jpg':
    'P260625124243-2-jpg-1_9ea03126-2bdc-44e8-8107-fc0474d63363-removebg-preview.png',
  'hermes-mini-kelly-20-etoupe-epsom-gold.jpg': '36659778_68734218_1000-removebg-preview.png',
  'hermes-kelly-20-orange-sellier-palladium.jpg': '35498353_66982130_1000-removebg-preview.png',
  'hermes-kelly-25-rouge-sellier-palladium.jpg': '32909057_63259668_1000-removebg-preview.png',
}

async function trimSubject(inputPath) {
  const ext = path.extname(inputPath).toLowerCase()
  if (ext === '.png') {
    return sharp(inputPath).ensureAlpha().trim({ threshold: 12 }).png().toBuffer()
  }
  return sharp(inputPath)
    .flatten({ background: '#ffffff' })
    .trim({ threshold: 22, background: '#ffffff' })
    .png()
    .toBuffer()
}

async function normalizeBag(outputName, sourceRel) {
  const sourcePath = path.join(root, sourceRel)
  if (!fs.existsSync(sourcePath)) {
    console.warn('Skip — source missing:', sourceRel)
    return
  }

  const trimmed = await trimSubject(sourcePath)
  const meta = await sharp(trimmed).metadata()
  const maxDim = Math.max(meta.width ?? 1, meta.height ?? 1)
  const scale = inner / maxDim
  const newW = Math.round((meta.width ?? 1) * scale)
  const newH = Math.round((meta.height ?? 1) * scale)

  const resized = await sharp(trimmed)
    .resize(newW, newH, { fit: 'fill' })
    .flatten({ background: bg })
    .toBuffer()

  const left = Math.round((size - newW) / 2)
  const top = Math.round((size - newH) / 2)
  const out = path.join(bagsDir, outputName)
  const tmp = out + '.tmp.jpg'

  await sharp({ create: { width: size, height: size, channels: 3, background: bg } })
    .composite([{ input: resized, left, top }])
    .jpeg({ quality: 93, mozjpeg: true })
    .toFile(tmp)

  fs.renameSync(tmp, out)
  console.log('✓', outputName, '←', path.basename(sourceRel), `${newW}×${newH}`)
}

fs.mkdirSync(bagsDir, { recursive: true })

for (const [out, src] of Object.entries(bagSources)) {
  await normalizeBag(out, src)
}

// Çantalar banneri
const bannerSrc = path.join(bagsDir, 'hermes-birkin-gold-togo-palladium.jpg')
if (fs.existsSync(bannerSrc)) {
  await sharp(bannerSrc)
    .resize(1400, 560, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(root, 'public', 'assets', 'banners', 'bags.jpg'))
  console.log('✓ bags.jpg banner')
}
