import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, '..', 'public', 'assets')

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close()
          fs.unlinkSync(dest)
          return download(res.headers.location, dest).then(resolve).catch(reject)
        }
        if (res.statusCode !== 200) {
          file.close()
          fs.unlink(dest, () => {})
          return reject(new Error(`HTTP ${res.statusCode}`))
        }
        res.pipe(file)
        file.on('finish', () => {
          file.close()
          resolve()
        })
      })
      .on('error', reject)
  })
}

const bagImages = {
  'hermes-birkin.jpg': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&q=85',
  'chanel-classic-flap.jpg': 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=85',
  'hermes-kelly.jpg': 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&q=85',
  'lv-capucines.jpg': 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=900&q=85',
  'bvlgari-serpenti-bag.jpg': 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=900&q=85',
  'cartier-panthere-bag.jpg': 'https://images.unsplash.com/photo-1564422170194-896b89110ef8?w=900&q=85',
  'dior-lady-dior.jpg': 'https://images.unsplash.com/photo-1524498250077-390f9e378fc0?w=900&q=85',
  'chanel-boy-bag.jpg': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=85',
}

const jewelryImages = {
  'tiffany-necklace.jpg': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=85',
  'van-cleef-bracelet.jpg': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=85',
  'messika-ring.jpg': 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=900&q=85',
  'cartier-love-bracelet.jpg': 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=900&q=85',
  'chopard-happy-diamonds.jpg': 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=900&q=85',
  'bvlgari-serpenti-necklace.jpg': 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=85',
  'tiffany-diamond-ring.jpg': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85',
  'harry-winston-earrings.jpg': 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=85',
}

const banners = {
  'bags.jpg': 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1400&q=85',
  'jewelry.jpg': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1400&q=85',
}

async function downloadAll(map, dir) {
  fs.mkdirSync(dir, { recursive: true })
  for (const [file, url] of Object.entries(map)) {
    const dest = path.join(dir, file)
    try {
      process.stdout.write(`Downloading ${file}... `)
      await download(url, dest)
      console.log('OK')
    } catch (e) {
      console.log(`FAIL (${e.message})`)
    }
  }
}

await downloadAll(bagImages, path.join(publicDir, 'bags'))
await downloadAll(jewelryImages, path.join(publicDir, 'jewelry'))
await downloadAll(banners, path.join(publicDir, 'banners'))
console.log('Done!')
