import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const index = path.join(dist, 'index.html')

if (!fs.existsSync(index)) {
  console.error('dist/index.html tapılmadı — əvvəl vite build işə salın')
  process.exit(1)
}

// GitHub Pages və bəzi statik hostlar 404.html ilə SPA-nı bərpa edir
fs.copyFileSync(index, path.join(dist, '404.html'))
console.log('SPA fallback: dist/404.html yaradıldı')
