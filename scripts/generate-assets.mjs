import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const watches = [
  { file: 'royal-black', dial: '#1a1a1a', case: '#2a2a2a', bezel: '#b8956a', hands: '#d4b896', indices: '#d4b896', strap: 'leather', strapColor: '#3d2e1f' },
  { file: 'royal-black-2', dial: '#1a1a1a', case: '#333', bezel: '#c8bfb0', hands: '#faf7f2', indices: '#d4b896', strap: 'leather', strapColor: '#4a3728' },
  { file: 'gold-heritage', dial: '#f5efe6', case: '#c9a96e', bezel: '#b8956a', hands: '#6b5b4e', indices: '#8b7355', strap: 'leather', strapColor: '#5c4033' },
  { file: 'gold-heritage-2', dial: '#ede4d4', case: '#d4b896', bezel: '#b8956a', hands: '#6b5b4e', indices: '#6b5b4e', strap: 'leather', strapColor: '#6b5344' },
  { file: 'silver-moon', dial: '#e8e4df', case: '#c0c0c0', bezel: '#a8a8a8', hands: '#6b5b4e', indices: '#8b8b8b', strap: 'metal', strapColor: '#b8b8b8' },
  { file: 'emerald-classic', dial: '#2d5a4a', case: '#a8a8a8', bezel: '#b8956a', hands: '#d4b896', indices: '#d4b896', strap: 'leather', strapColor: '#3d4a3d' },
  { file: 'executive-chronograph', dial: '#f0ebe3', case: '#c9a96e', bezel: '#b8956a', hands: '#1a1a1a', indices: '#6b5b4e', strap: 'leather', strapColor: '#2c2416', accent: '#8b7355' },
  { file: 'rose-pearl', dial: '#faf0eb', case: '#c9a0a0', bezel: '#d4b896', hands: '#8b6b6b', indices: '#a08080', strap: 'leather', strapColor: '#d4c4b8' },
  { file: 'midnight-steel', dial: '#4a4a52', case: '#8a8a92', bezel: '#6b6b72', hands: '#e8e4df', indices: '#c0c0c8', strap: 'metal', strapColor: '#909098' },
  { file: 'urban-leather', dial: '#faf7f2', case: '#a8a098', bezel: '#c8bfb0', hands: '#6b5b4e', indices: '#8b7355', strap: 'leather', strapColor: '#c8b8a0' },
  { file: 'sapphire-automatic', dial: '#1e3a5f', case: '#a0a8b0', bezel: '#b8956a', hands: '#d4b896', indices: '#d4b896', strap: 'leather', strapColor: '#2c3e50' },
  { file: 'noble-blue', dial: '#1a3050', case: '#a8a098', bezel: '#b8956a', hands: '#d4b896', indices: '#d4b896', strap: 'leather', strapColor: '#1a2838' },
  { file: 'velvet-gold', dial: '#f5efe6', case: '#c9a96e', bezel: '#d4b896', hands: '#6b5b4e', indices: '#8b7355', strap: 'metal', strapColor: '#c9a96e' },
  { file: 'crystal-line', dial: '#fdfcfa', case: '#c0c0c0', bezel: '#d4b896', hands: '#6b5b4e', indices: '#8b7355', strap: 'metal', strapColor: '#d0d0d0' },
]

function generateWatchSvg(config) {
  const { dial, case: caseColor, bezel, hands, indices, strap, strapColor, accent } = config

  const leatherStrap = `
    <path d="M175 310 Q170 360 168 400 L168 480 Q170 500 200 500 L300 500 Q330 500 332 480 L332 400 Q330 360 325 310 Z" fill="${strapColor}" opacity="0.9"/>
    <path d="M175 120 Q170 70 168 30 L168 10 Q170 0 200 0 L300 0 Q330 0 332 10 L332 30 Q330 70 325 120 Z" fill="${strapColor}" opacity="0.9"/>
    <line x1="185" y1="350" x2="315" y2="350" stroke="${accent || '#000'}" stroke-width="0.5" opacity="0.15"/>
    <line x1="185" y1="380" x2="315" y2="380" stroke="${accent || '#000'}" stroke-width="0.5" opacity="0.15"/>
    <line x1="185" y1="60" x2="315" y2="60" stroke="${accent || '#000'}" stroke-width="0.5" opacity="0.15"/>
  `

  const metalStrap = `
    <path d="M178 310 L178 500 Q200 505 250 505 Q300 505 322 500 L322 310 Z" fill="${strapColor}"/>
    <path d="M178 120 L178 10 Q200 0 250 0 Q300 0 322 10 L322 120 Z" fill="${strapColor}"/>
    ${[340, 370, 400, 430, 460].map(y => `<line x1="190" y1="${y}" x2="310" y2="${y}" stroke="#fff" stroke-width="0.8" opacity="0.2"/>`).join('')}
    ${[60, 90].map(y => `<line x1="190" y1="${y}" x2="310" y2="${y}" stroke="#fff" stroke-width="0.8" opacity="0.2"/>`).join('')}
  `

  const chronoSubdials = accent ? `
    <circle cx="205" cy="215" r="22" fill="none" stroke="${accent}" stroke-width="1" opacity="0.4"/>
    <circle cx="295" cy="215" r="22" fill="none" stroke="${accent}" stroke-width="1" opacity="0.4"/>
    <circle cx="250" cy="270" r="22" fill="none" stroke="${accent}" stroke-width="1" opacity="0.4"/>
  ` : ''

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 520" width="500" height="520">
  <defs>
    <radialGradient id="bg" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#fdfcfa"/>
      <stop offset="100%" stop-color="#f0ebe3"/>
    </radialGradient>
    <radialGradient id="dialGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${dial}" stop-opacity="1"/>
      <stop offset="100%" stop-color="${dial}" stop-opacity="0.85"/>
    </radialGradient>
    <linearGradient id="caseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${caseColor}" stop-opacity="1"/>
      <stop offset="50%" stop-color="${caseColor}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${caseColor}" stop-opacity="0.7"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#6b5b4e" flood-opacity="0.12"/>
    </filter>
  </defs>
  <rect width="500" height="520" fill="url(#bg)"/>
  ${strap === 'leather' ? leatherStrap : metalStrap}
  <g filter="url(#shadow)">
    <circle cx="250" cy="215" r="108" fill="url(#caseGrad)" stroke="${bezel}" stroke-width="4"/>
    <circle cx="250" cy="215" r="98" fill="url(#dialGrad)" stroke="${bezel}" stroke-width="1" opacity="0.5"/>
    ${chronoSubdials}
    ${[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => {
      const rad = (deg - 90) * Math.PI / 180
      const isMajor = deg % 90 === 0
      const inner = isMajor ? 82 : 88
      const outer = 94
      const x1 = 250 + inner * Math.cos(rad)
      const y1 = 215 + inner * Math.sin(rad)
      const x2 = 250 + outer * Math.cos(rad)
      const y2 = 215 + outer * Math.sin(rad)
      if (isMajor) return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${indices}" stroke-width="2.5" stroke-linecap="round"/>`
      return `<circle cx="${250 + 90 * Math.cos(rad)}" cy="${215 + 90 * Math.sin(rad)}" r="1.5" fill="${indices}" opacity="0.6"/>`
    }).join('')}
    <line x1="250" y1="215" x2="250" y2="155" stroke="${hands}" stroke-width="3" stroke-linecap="round"/>
    <line x1="250" y1="215" x2="290" y2="195" stroke="${hands}" stroke-width="2" stroke-linecap="round"/>
    <line x1="250" y1="215" x2="255" y2="175" stroke="${accent || hands}" stroke-width="1.5" stroke-linecap="round" opacity="0.8"/>
    <circle cx="250" cy="215" r="5" fill="${bezel}"/>
    <circle cx="250" cy="215" r="2" fill="${hands}"/>
    <text x="250" y="295" text-anchor="middle" font-family="Georgia, serif" font-size="9" fill="${indices}" opacity="0.7" letter-spacing="3">CHRONOS</text>
    <circle cx="250" cy="215" r="108" fill="none" stroke="white" stroke-width="1" opacity="0.15"/>
  </g>
</svg>`
}

function generateCollectionSvg(name, color1, color2) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}"/>
      <stop offset="100%" stop-color="${color2}"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#g)"/>
  <circle cx="300" cy="200" r="80" fill="none" stroke="#b8956a" stroke-width="2" opacity="0.4"/>
  <circle cx="300" cy="200" r="65" fill="#fdfcfa" opacity="0.3"/>
  <text x="300" y="330" text-anchor="middle" font-family="Georgia, serif" font-size="18" fill="#6b5b4e" letter-spacing="4" opacity="0.6">${name}</text>
</svg>`
}

const watchesDir = path.join(root, 'public', 'assets', 'watches')
const collectionsDir = path.join(root, 'public', 'assets', 'collections')
fs.mkdirSync(watchesDir, { recursive: true })
fs.mkdirSync(collectionsDir, { recursive: true })

watches.forEach((w) => {
  fs.writeFileSync(path.join(watchesDir, `${w.file}.svg`), generateWatchSvg(w))
  console.log(`Created ${w.file}.svg`)
})

const collectionConfigs = [
  { file: 'klassik-maison', name: 'KLASSIK', c1: '#f5efe6', c2: '#e8dfd0' },
  { file: 'qizili-zeriflik', name: 'QIZIL', c1: '#f0e6d4', c2: '#d4c4a8' },
  { file: 'seher-stili', name: 'ŞƏHƏR', c1: '#ece8e2', c2: '#d8d0c4' },
  { file: 'avtomatik-kolleksiya', name: 'AVTOMATIK', c1: '#f2ebe3', c2: '#e0d5c8' },
]

collectionConfigs.forEach((c) => {
  fs.writeFileSync(path.join(collectionsDir, `${c.file}.svg`), generateCollectionSvg(c.name, c.c1, c.c2))
})

// Hero background
const heroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <radialGradient id="hg" cx="60%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#fdfcfa"/>
      <stop offset="50%" stop-color="#f5efe6"/>
      <stop offset="100%" stop-color="#e8dfd0"/>
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#d4b896" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#d4b896" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#hg)"/>
  <ellipse cx="1200" cy="400" rx="500" ry="400" fill="url(#glow)"/>
  <ellipse cx="400" cy="700" rx="300" ry="250" fill="url(#glow)" opacity="0.5"/>
</svg>`

fs.writeFileSync(path.join(root, 'public', 'assets', 'hero-bg.svg'), heroSvg)

// Favicon
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="4" fill="#faf7f2"/>
  <circle cx="16" cy="16" r="10" fill="none" stroke="#b8956a" stroke-width="1.5"/>
  <line x1="16" y1="16" x2="16" y2="10" stroke="#6b5b4e" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="16" y1="16" x2="20" y2="14" stroke="#6b5b4e" stroke-width="0.8" stroke-linecap="round"/>
</svg>`
fs.writeFileSync(path.join(root, 'public', 'favicon.svg'), favicon)

console.log('All assets generated!')
