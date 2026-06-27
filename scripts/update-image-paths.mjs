import fs from 'fs'

const file = 'src/data/products.ts'
let content = fs.readFileSync(file, 'utf8')
content = content.replace(/\/assets\/watches\/([a-z0-9-]+)\.jpg/g, '/assets/watches/$1.png')
content = content.replace(/\/assets\/collections\/([a-z0-9-]+)\.jpg/g, '/assets/collections/$1.png')
fs.writeFileSync(file, content)
console.log('Updated products.ts image paths to .png')
