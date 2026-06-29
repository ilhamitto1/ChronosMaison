import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { BG, replaceSolidBlackBackground } from './lib/cream-bg.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const bannerDir = path.join(root, 'public', 'assets', 'banners')
const srcPath = path.join(bannerDir, 'herosection-source.png')
const outPath = path.join(bannerDir, 'herosection.png')
const fallbackSrc = path.join(bannerDir, 'herosection.png')

const input = fs.existsSync(srcPath) ? srcPath : fallbackSrc

if (!fs.existsSync(input)) {
  console.error('Hero source tapılmadı:', input)
  process.exit(1)
}

if (!fs.existsSync(srcPath) && fs.existsSync(fallbackSrc)) {
  fs.copyFileSync(fallbackSrc, srcPath)
  console.log('Orijinal saxlanıldı → herosection-source.png')
}

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

replaceSolidBlackBackground(data, info.width, info.height)

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png({ compressionLevel: 6, effort: 6 })
  .toFile(outPath)

console.log(`Hero banner yeniləndi → ${path.relative(root, outPath)} (${info.width}×${info.height}, fon #${BG.r.toString(16)}${BG.g.toString(16)}${BG.b.toString(16)})`)
