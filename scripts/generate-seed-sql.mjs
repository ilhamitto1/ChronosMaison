import { readFileSync, writeFileSync } from 'fs'

function sqlEscape(value) {
  return String(value).replace(/'/g, "''")
}

const catalog = JSON.parse(readFileSync('src/data/catalog-seed.json', 'utf8'))

const values = catalog
  .map(
    (item) => `(
  '${sqlEscape(item.title)}',
  '${item.category}',
  ${item.price},
  '${sqlEscape(item.description)}',
  '${sqlEscape(item.image_url)}',
  '${sqlEscape(item.brand)}',
  '${sqlEscape(item.brand_id)}'
)`,
  )
  .join(',\n')

const sql = `-- ChronosMaison — sayt kataloqunun Supabase-ə köçürülməsi
-- Supabase SQL Editor-də işlədin (18 məhsul: 11 saat, 6 çanta, 2 zinət)
-- Artıq mövcud olan başlıqlar təkrar əlavə edilmir.

insert into public.products (title, category, price, description, image_url, brand, brand_id)
select v.title, v.category, v.price, v.description, v.image_url, v.brand, v.brand_id
from (
  values
${values}
) as v(title, category, price, description, image_url, brand, brand_id)
where not exists (
  select 1 from public.products p
  where lower(trim(p.title)) = lower(trim(v.title))
);
`

writeFileSync('supabase/seed-catalog.sql', sql, 'utf8')
console.log(`Yazıldı: supabase/seed-catalog.sql (${catalog.length} məhsul)`)
