import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const sources = [
  { file: 'public/assets/watches/rolex-daytona-two-tone.png', label: 'watch' },
  { file: 'public/assets/jewelry/van-cleef-frivole-diamond-set.jpg', label: 'jewelry' },
  { file: 'public/assets/bags/hermes-birkin-25-rouge-pivoine-swift-gold.jpg', label: 'bag' },
]

const width = 1800
const height = 640
const colW = Math.floor(width / 3)
const bgColor = { r: 14, g: 14, b: 16 }

const composites = []

for (let i = 0; i < sources.length; i++) {
  const srcPath = path.join(root, sources[i].file)
  const left = i * colW

  const resized = await sharp(srcPath)
    .resize(colW, height, { fit: 'cover', position: 'centre' })
    .toBuffer()

  composites.push({ input: resized, left, top: 0 })
}

const outDir = path.join(root, 'public', 'assets', 'banners')
fs.mkdirSync(outDir, { recursive: true })
const outPath = path.join(outDir, 'new-products.jpg')

await sharp({
  create: { width, height, channels: 3, background: bgColor },
})
  .composite(composites)
  .modulate({ brightness: 0.92 })
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(outPath)

console.log('Created', outPath)
