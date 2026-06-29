import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const dir = path.join(root, 'public', 'assets', 'brands')

function parseViewBox(svg) {
  const match = svg.match(/viewBox=["']([^"']+)["']/i)
  if (!match) return null
  const [minX, minY, width, height] = match[1].split(/[\s,]+/).map(Number)
  return { minX, minY, width, height, raw: match[1] }
}

function replaceViewBox(svg, viewBox) {
  const next = `viewBox="${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}"`
  if (/viewBox=/i.test(svg)) {
    return svg.replace(/viewBox=["'][^"']+["']/i, next)
  }
  return svg.replace(/<svg\b/i, `<svg ${next}`)
}

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.svg'))) {
  const filePath = path.join(dir, file)
  const svgText = fs.readFileSync(filePath, 'utf8')
  const viewBox = parseViewBox(svgText)
  if (!viewBox) {
    console.warn('skip (no viewBox):', file)
    continue
  }

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

  if (maxX <= minX || maxY <= minY) {
    console.warn('skip (empty):', file)
    continue
  }

  const padX = Math.max(2, Math.round((maxX - minX + 1) * 0.04))
  const padY = Math.max(2, Math.round((maxY - minY + 1) * 0.06))

  const pxMinX = Math.max(0, minX - padX)
  const pxMinY = Math.max(0, minY - padY)
  const pxMaxX = Math.min(info.width - 1, maxX + padX)
  const pxMaxY = Math.min(info.height - 1, maxY + padY)

  const sx = viewBox.width / info.width
  const sy = viewBox.height / info.height

  const nextViewBox = {
    minX: viewBox.minX + pxMinX * sx,
    minY: viewBox.minY + pxMinY * sy,
    width: (pxMaxX - pxMinX + 1) * sx,
    height: (pxMaxY - pxMinY + 1) * sy,
  }

  const rounded = {
    minX: +nextViewBox.minX.toFixed(3),
    minY: +nextViewBox.minY.toFixed(3),
    width: +nextViewBox.width.toFixed(3),
    height: +nextViewBox.height.toFixed(3),
  }

  const updated = replaceViewBox(svgText, rounded)
    .replace(/\s(width|height)=["'][^"']*["']/gi, '')
  fs.writeFileSync(filePath, updated)
  console.log(file, '→', `${rounded.minX} ${rounded.minY} ${rounded.width} ${rounded.height}`)
}
