import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const sources = [
  { file: 'public/assets/watches/rolex-daytona-two-tone.png', label: 'watch' },
  { file: 'public/assets/jewelry/paraiba-tourmaline-necklace.jpg', label: 'jewelry' },
  { file: 'public/assets/bags/hermes-kelly-orange.jpg', label: 'bag' },
]

const width = 1600
const height = 720
const pad = 48
const gap = 32
const cellW = Math.floor((width - pad * 2 - gap * 2) / 3)
const cellH = height - pad * 2

const bg = await sharp({
  create: {
    width,
    height,
    channels: 3,
    background: { r: 18, g: 18, b: 20 },
  },
})
  .png()
  .toBuffer()

const composites = []

for (let i = 0; i < sources.length; i++) {
  const srcPath = path.join(root, sources[i].file)
  const left = pad + i * (cellW + gap)

  const resized = await sharp(srcPath)
    .resize(cellW, cellH, { fit: 'contain', background: { r: 18, g: 18, b: 20 } })
    .png()
    .toBuffer()

  composites.push({ input: resized, left, top: pad })
}

const outDir = path.join(root, 'public', 'assets', 'banners')
fs.mkdirSync(outDir, { recursive: true })
const outPath = path.join(outDir, 'new-products.jpg')

await sharp(bg)
  .composite(composites)
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(outPath)

console.log('Created', outPath)
