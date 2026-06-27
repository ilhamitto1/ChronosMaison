import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
import http from 'http'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const publicDir = path.join(root, 'public', 'assets')

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    const getter = url.startsWith('https') ? https : http
    getter.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close()
        fs.unlinkSync(dest)
        return download(res.headers.location, dest).then(resolve).catch(reject)
      }
      res.pipe(file)
      file.on('finish', () => { file.close(); resolve() })
    }).on('error', (e) => { fs.unlink(dest, () => {}); reject(e) })
  })
}

const watchImages = {
  'royal-black.jpg': 'https://images.unsplash.com/photo-1548171916-e79a380a9a4f?w=900&q=85',
  'royal-black-2.jpg': 'https://images.unsplash.com/photo-1587836374828-4db9b3a0ea7f?w=900&q=85',
  'gold-heritage.jpg': 'https://images.unsplash.com/photo-1622435191076-792261457d2d?w=900&q=85',
  'gold-heritage-2.jpg': 'https://images.unsplash.com/photo-1522312340185-e586b8d993f0?w=900&q=85',
  'silver-moon.jpg': 'https://images.unsplash.com/photo-1614164185125-e7e272bb13b0?w=900&q=85',
  'emerald-classic.jpg': 'https://images.unsplash.com/photo-1617034531393-7449e03e793f?w=900&q=85',
  'executive-chronograph.jpg': 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=900&q=85',
  'rose-pearl.jpg': 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=900&q=85',
  'midnight-steel.jpg': 'https://images.unsplash.com/photo-1508685098649-33c8d0770f65?w=900&q=85',
  'urban-leather.jpg': 'https://images.unsplash.com/photo-1518544889283-42a8d3a49ee5?w=900&q=85',
  'sapphire-automatic.jpg': 'https://images.unsplash.com/photo-1611651139019-22fae3a43acc?w=900&q=85',
  'noble-blue.jpg': 'https://images.unsplash.com/photo-1612815154858-e90403e7f059?w=900&q=85',
  'velvet-gold.jpg': 'https://images.unsplash.com/photo-1523170335258-f5ed11844cfe?w=900&q=85',
  'crystal-line.jpg': 'https://images.unsplash.com/photo-1612817260104-7e189f5828c9?w=900&q=85',
}

const collectionImages = {
  'klassik-maison.jpg': 'https://images.unsplash.com/photo-1611651139019-22fae3a43acc?w=800&q=85',
  'qizili-zeriflik.jpg': 'https://images.unsplash.com/photo-1622435191076-792261457d2d?w=800&q=85',
  'seher-stili.jpg': 'https://images.unsplash.com/photo-1508685098649-33c8d0770f65?w=800&q=85',
  'avtomatik-kolleksiya.jpg': 'https://images.unsplash.com/photo-1612817260104-7e189f5828c9?w=800&q=85',
}

const bannerImages = {
  'new-products.jpg': 'https://images.unsplash.com/photo-1523170335258-f5ed11844cfe?w=1200&q=85',
  'watches.jpg': 'https://images.unsplash.com/photo-1548171916-e79a380a9a4f?w=1200&q=85',
  'jewelry.jpg': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=85',
  'hero.jpg': 'https://images.unsplash.com/photo-1612817260104-7e189f5828c9?w=1920&q=85',
}

const brandLogos = {
  'rolex.png': 'https://avazli.com/uploads/posts/2022-05/1653992608_logo_da_rolex.png',
  'patek-philippe.png': 'https://avazli.com/uploads/posts/2022-05/1653996676_patek_philippe-logo-1110b122d7-seeklogo_com.png',
  'audemars-piguet.png': 'https://avazli.com/uploads/posts/2022-05/1653993106_audemars_piguet_logo.png',
  'omega.png': 'https://avazli.com/uploads/posts/2022-05/1653996621_1280px-omega_logo_svg.png',
  'cartier.png': 'https://avazli.com/uploads/posts/2022-06/1655447508_cartier-logo-to-stick.jpeg',
  'iwc.png': 'https://avazli.com/uploads/posts/2022-05/1653992319_iwc_schaffhausen_logo.png',
  'hublot.png': 'https://avazli.com/uploads/posts/2022-05/1653996152_hublot_logo.png',
  'breitling.png': 'https://avazli.com/uploads/posts/2022-05/1653994929_breitling_logo.png',
  'tag-heuer.png': 'https://avazli.com/uploads/posts/2022-06/1655464395_tag_heuer-logo-75cc415a99-seeklogo_com.png',
  'jaeger-lecoultre.png': 'https://avazli.com/uploads/posts/2022-05/1653996477_jaeger_lecoultre_logo.png',
  'bvlgari.png': 'https://avazli.com/uploads/posts/2022-06/1655447648_bulgari-logo_wine.png',
  'vacheron-constantin.png': 'https://avazli.com/uploads/posts/2022-05/1653994451_vacheron_constantin_logo.png',
  'breguet.png': 'https://avazli.com/uploads/posts/2022-05/1653992715_breguet_logo.png',
  'chopard.png': 'https://avazli.com/uploads/posts/2022-05/1653994881_logo_chopard_svg.png',
  'zenith.png': 'https://avazli.com/uploads/posts/2022-05/1653997152_zenith_s__a__logo_svg.png',
  'montblanc.png': 'https://avazli.com/uploads/posts/2022-05/1653996586_montblanc_logo_svg.png',
}

async function downloadAll(map, dir) {
  fs.mkdirSync(dir, { recursive: true })
  for (const [file, url] of Object.entries(map)) {
    const dest = path.join(dir, file)
    try {
      console.log(`Downloading ${file}...`)
      await download(url, dest)
      console.log(`  OK: ${file}`)
    } catch (e) {
      console.error(`  FAIL: ${file}`, e.message)
    }
  }
}

await downloadAll(watchImages, path.join(publicDir, 'watches'))
await downloadAll(collectionImages, path.join(publicDir, 'collections'))
await downloadAll(bannerImages, path.join(publicDir, 'banners'))
await downloadAll(brandLogos, path.join(publicDir, 'brands'))
console.log('Done!')
