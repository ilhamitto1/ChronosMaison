import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { BG, processRawToCream } from './lib/cream-bg.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const sources = [
  { file: 'public/assets/watches/rolex-daytona-two-tone.png', cream: true, scrub: true },
  { file: 'public/assets/jewelry/van-cleef-frivole-diamond-set.jpg', cream: false, scrub: false },
  { file: 'public/assets/bags/hermes-birkin-25-rouge-pivoine-swift-gold.jpg', cream: true, scrub: true },
]

const width = 1800
const height = 640
const colW = Math.floor(width / 3)
const pad = 28

async function creamPanel(srcPath, panelW, panelH, scrub) {
  const innerW = panelW - pad * 2
  const innerH = panelH - pad * 2

  const { data, info } = await sharp(srcPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  processRawToCream(data, info.width, info.height, { scrub })

  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .resize(innerW, innerH, {
      fit: 'contain',
      position: 'centre',
      background: BG,
      kernel: sharp.kernel.lanczos3,
    })
    .extend({
      top: pad,
      bottom: pad,
      left: pad,
      right: pad,
      background: BG,
    })
    .jpeg({ quality: 96, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toBuffer()
}

async function buildPanel(srcPath, panelW, panelH, { cream, scrub }) {
  if (!cream) {
    return sharp(srcPath)
      .resize(panelW, panelH, { fit: 'cover', position: 'centre', kernel: sharp.kernel.lanczos3 })
      .jpeg({ quality: 96, mozjpeg: true, chromaSubsampling: '4:4:4' })
      .toBuffer()
  }

  return creamPanel(srcPath, panelW, panelH, scrub)
}

const composites = []

for (let i = 0; i < sources.length; i++) {
  const srcPath = path.join(root, sources[i].file)
  const left = i * colW
  const panel = await buildPanel(srcPath, colW, height, sources[i])
  composites.push({ input: panel, left, top: 0 })
}

const outDir = path.join(root, 'public', 'assets', 'banners')
fs.mkdirSync(outDir, { recursive: true })
const outPath = path.join(outDir, 'new-products.jpg')

await sharp({
  create: { width, height, channels: 3, background: BG },
})
  .composite(composites)
  .jpeg({ quality: 96, mozjpeg: true, chromaSubsampling: '4:4:4' })
  .toFile(outPath)

console.log('Created', outPath)
