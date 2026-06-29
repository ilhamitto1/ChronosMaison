import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { BG, processProductToCream } from './lib/cream-bg.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const bagsDir = path.join(root, 'public', 'assets', 'bags')

async function creamifyBag(fileName) {
  const filePath = path.join(bagsDir, fileName)
  if (!fs.existsSync(filePath)) return

  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  processProductToCream(data, info.width, info.height)

  const tmp = filePath + '.tmp.jpg'
  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .flatten({ background: BG })
    .jpeg({ quality: 94, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(tmp)

  fs.renameSync(tmp, filePath)
  console.log('✓', fileName, `${info.width}×${info.height}`)
}

const files = fs.readdirSync(bagsDir).filter((f) => f.endsWith('.jpg'))
for (const file of files) {
  await creamifyBag(file)
}

// Çantalar banneri
const bannerSrc = path.join(bagsDir, 'hermes-birkin-gold-togo-palladium.jpg')
if (fs.existsSync(bannerSrc)) {
  await sharp(bannerSrc)
    .resize(1400, 560, { fit: 'cover', position: 'centre', kernel: sharp.kernel.lanczos3 })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(path.join(root, 'public', 'assets', 'banners', 'bags.jpg'))
  console.log('✓ bags.jpg banner')
}

console.log(`Çanta şəkilləri krem fona çevrildi (#${BG.r.toString(16)}${BG.g.toString(16)}${BG.b.toString(16)})`)
