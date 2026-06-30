import { readFileSync, existsSync } from 'fs'
import { createClient } from '@supabase/supabase-js'

function loadEnv() {
  if (!existsSync('.env')) {
    console.error('.env tapılmadı. VITE_SUPABASE_URL və VITE_SUPABASE_ANON_KEY lazımdır.')
    process.exit(1)
  }
  return Object.fromEntries(
    readFileSync('.env', 'utf8')
      .split(/\r?\n/)
      .filter((line) => line && !line.startsWith('#'))
      .map((line) => {
        const index = line.indexOf('=')
        return [line.slice(0, index).trim(), line.slice(index + 1).trim()]
      }),
  )
}

const email = process.env.AUTH_TEST_EMAIL?.trim()
const password = process.env.AUTH_TEST_PASSWORD

if (!email || !password) {
  console.error(
    'İstifadə:\n  AUTH_TEST_EMAIL=idosdiyev@mail.ru AUTH_TEST_PASSWORD=şifrəniz node scripts/seed-products.mjs',
  )
  process.exit(1)
}

const env = loadEnv()
const url = env.VITE_SUPABASE_URL?.trim()
const key = env.VITE_SUPABASE_ANON_KEY?.trim()

if (!url || !key) {
  console.error('VITE_SUPABASE_URL və VITE_SUPABASE_ANON_KEY .env-də olmalıdır.')
  process.exit(1)
}

const catalog = JSON.parse(readFileSync('src/data/catalog-seed.json', 'utf8'))
const supabase = createClient(url, key)

console.log('Admin kimi daxil olunur...')
const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
  email,
  password,
})

if (authError) {
  console.error('Giriş xətası:', authError.message)
  process.exit(1)
}

console.log('Giriş uğurlu:', authData.user?.email)

const { data: existing, error: listError } = await supabase
  .from('products')
  .select('id, title, brand_id')

if (listError) {
  console.error('Mövcud məhsullar oxunmadı:', listError.message)
  process.exit(1)
}

const existingTitles = new Set((existing ?? []).map((row) => row.title.trim().toLowerCase()))
let inserted = 0
let skipped = 0
let failed = 0

for (const item of catalog) {
  if (existingTitles.has(item.title.trim().toLowerCase())) {
    console.log(`⏭  Artıq var: ${item.title}`)
    skipped += 1
    continue
  }

  const { error } = await supabase.from('products').insert({
    title: item.title,
    category: item.category,
    price: item.price,
    description: item.description,
    image_url: item.image_url,
    brand: item.brand,
    brand_id: item.brand_id,
  })

  if (error) {
    console.error(`✗  Xəta (${item.title}):`, error.message)
    failed += 1
    continue
  }

  console.log(`✓  Əlavə olundu: ${item.title}`)
  inserted += 1
}

console.log('\n=== Nəticə ===')
console.log({ cəmi: catalog.length, əlavə: inserted, artıq_var: skipped, xəta: failed })
console.log('\nAdmin paneldə /admin/dashboard — bütün məhsulları görə, redaktə və silə bilərsiniz.')

await supabase.auth.signOut()
