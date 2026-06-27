import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const brandsDir = path.join(__dirname, '..', 'public', 'assets', 'brands')
const base = 'https://avazli.com/uploads/posts'

const brandLogos = {
  'rolex.png': `${base}/2022-05/1653992608_logo_da_rolex.png`,
  'patek-philippe.png': `${base}/2022-05/1653996676_patek_philippe-logo-1110b122d7-seeklogo_com.png`,
  'audemars-piguet.png': `${base}/2022-05/1653993106_audemars_piguet_logo.png`,
  'omega.png': `${base}/2022-05/1653996621_1280px-omega_logo_svg.png`,
  'cartier.png': `${base}/2022-06/1655447508_cartier-logo-to-stick.jpeg`,
  'iwc.png': `${base}/2022-05/1653992319_iwc_schaffhausen_logo.png`,
  'hublot.png': `${base}/2022-05/1653996152_hublot_logo.png`,
  'breitling.png': `${base}/2022-05/1653994929_breitling_logo.png`,
  'tag-heuer.png': `${base}/2022-06/1655464395_tag_heuer-logo-75cc415a99-seeklogo_com.png`,
  'jaeger-lecoultre.png': `${base}/2022-05/1653996477_jaeger_lecoultre_logo.png`,
  'bvlgari.png': `${base}/2022-06/1655447648_bulgari-logo_wine.png`,
  'vacheron-constantin.png': `${base}/2022-05/1653994451_vacheron_constantin_logo.png`,
  'breguet.png': `${base}/2022-05/1653992715_breguet_logo.png`,
  'chopard.png': `${base}/2022-05/1653994881_logo_chopard_svg.png`,
  'zenith.png': `${base}/2022-05/1653997152_zenith_s__a__logo_svg.png`,
  'montblanc.png': `${base}/2022-05/1653996586_montblanc_logo_svg.png`,
  'bovet.png': `${base}/2022-05/1653992966_bovet_logo.png`,
  'ulysse-nardin.png': `${base}/2022-05/1653993702_ulysse_nardin_logo.png`,
  'perrelet.png': `${base}/2022-05/1653993741_logo_de_perrelet.png`,
  'roger-dubuis.png': `${base}/2022-05/1653993860_roger-dubuis_logo_black_surface-magazine_160px.png`,
  'romain-jerome.png': `${base}/2022-05/1653993960_romain-jerome.png`,
  'tiffany-co.png': `${base}/2022-05/1653994169_tiffany_logo_svg.png`,
  'urwerk.png': `${base}/2022-05/1653994603_urwerk-e1486131499621-768x262.png`,
  'van-cleef-arpels.png': `${base}/2022-05/1653994664_van-cleef-arpels-logo.png`,
  'corum.png': `${base}/2022-05/1653994909_corum_suisse-logo-19f8e661c1-seeklogo_com.png`,
  'de-witt.png': `${base}/2022-05/1653994914_dewitt.png`,
  'de-grisogono.png': `${base}/2022-05/1653995848_de-grisogono-vector-1231.png`,
  'franck-muller.png': `${base}/2022-05/1653995895_franck_muller_geneve-logo-882f3ca2aa-seeklogo_com.png`,
  'girard-perregaux.png': `${base}/2022-05/1653995913_gp_logo_ponts_noir.png`,
  'glashutte-original.png': `${base}/2022-05/1653995919_glashutter_uhrenbetrieb_logo_svg.png`,
  'graham.png': `${base}/2022-05/1653996024_graham_logo_pos_new.png`,
  'harry-winston.png': `${base}/2022-05/1653996146_harry-winston-logo.png`,
  'jacob-co.png': `${base}/2022-05/1653996428_jacob__and__co-logo-6031852f3a-seeklogo_com.png`,
  'jaquet-droz.png': `${base}/2022-05/1653996483_1588916247-jaquet_droz_swiss_watchmaker_since_1738_logo_black.png`,
  'chanel.png': `${base}/2022-06/1655447145_chanel.png`,
  'u-boat.png': `${base}/2022-06/1655447742_u-boat.png`,
  'blancpain.png': `${base}/2022-06/1655464491_blancpain-logo.png`,
  'richard-mille.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Richard_Mille_logo.svg/320px-Richard_Mille_logo.svg.png',
  'hermes.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Herm%C3%A8s_Logo.svg/320px-Herm%C3%A8s_Logo.svg.png',
  'maurice-lacroix.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Maurice_Lacroix_logo.svg/320px-Maurice_Lacroix_logo.svg.png',
  'louis-moinet.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Louis_Moinet_logo.svg/320px-Louis_Moinet_logo.svg.png',
  'carl-f-bucherer.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Carl_F._Bucherer_logo.svg/320px-Carl_F._Bucherer_logo.svg.png',
  'messika.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Messika_Paris_logo.svg/320px-Messika_Paris_logo.svg.png',
}

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

fs.mkdirSync(brandsDir, { recursive: true })

let ok = 0
let fail = 0

for (const [file, url] of Object.entries(brandLogos)) {
  const dest = path.join(brandsDir, file)
  try {
    process.stdout.write(`Downloading ${file}... `)
    await download(url, dest)
    const size = fs.statSync(dest).size
    if (size < 500) throw new Error('file too small')
    console.log('OK')
    ok++
  } catch (e) {
    console.log(`FAIL (${e.message})`)
    fail++
  }
}

console.log(`\nDone: ${ok} ok, ${fail} failed`)
