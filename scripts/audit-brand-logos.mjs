import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const dir = path.join(root, 'public', 'assets', 'brands')

for (const file of fs.readdirSync(dir)) {
  const filePath = path.join(dir, file)
  const { data, info } = await sharp(filePath, { density: 200 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  let minX = info.width
  let minY = info.height
  let maxX = 0
  let maxY = 0

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 4
      const a = data[i + 3]
      if (a < 24) continue
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      if (r > 250 && g > 250 && b > 250) continue
      if (x < minX) minX = x
      if (y < minY) minY = y
      if (x > maxX) maxX = x
      if (y > maxY) maxY = y
    }
  }

  const contentW = maxX - minX + 1
  const contentH = maxY - minY + 1
  const fill = ((contentW * contentH) / (info.width * info.height) * 100).toFixed(1)
  console.log(
    file,
    `${info.width}x${info.height}`,
    `content ${contentW}x${contentH}`,
    `fill ${fill}%`,
    `bounds ${minX},${minY}`,
  )
}
