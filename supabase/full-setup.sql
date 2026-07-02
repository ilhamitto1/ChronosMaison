-- ═══════════════════════════════════════════════════════════════
-- ChronosMaison — TAM Supabase quraşdırması
-- Admin email: chronosmaison776@gmail.com
--
-- Supabase → SQL Editor → bütün faylı yapışdır → Run
--
-- Yeni layihə: bir dəfə işə salmaq kifayətdir.
-- Köhnə quraşdırma varsa: yenə də işə salın — aşağıdakı ALTER
-- blokları çatışmayan saat sütunlarını əlavə edir, policy-lər yenilənir.
-- ═══════════════════════════════════════════════════════════════

-- ─── Extensions ───
create extension if not exists "pgcrypto";

-- ─── updated_at funksiyası ───
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ═══════════════════════════════════════════════════════════════
-- MƏHSULLAR (products)
-- ═══════════════════════════════════════════════════════════════

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null
    check (category in ('watches', 'bags', 'jewelry')),
  price numeric(12, 2) not null check (price >= 0),
  description text not null default '',
  image_url text not null,
  brand text,
  brand_id text,
  -- Saat xüsusiyyətləri (admin panel + məhsul səhifəsi cədvəli)
  case_size_mm integer
    check (case_size_mm is null or case_size_mm > 0),
  watch_reference text,
  watch_collection text,
  watch_case_material text,
  watch_strap_material text,
  watch_dial_color text,
  watch_movement_type text,
  watch_set text,
  watch_condition text
    check (watch_condition is null or watch_condition in ('new', 'pre-owned')),
  has_certificate boolean,
  watch_year integer
    check (watch_year is null or (watch_year >= 1900 and watch_year <= 2100)),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Köhnə products cədvəlinə saat sütunları (CREATE TABLE artıq işləyibsə)
alter table public.products
  add column if not exists case_size_mm integer
    check (case_size_mm is null or case_size_mm > 0),
  add column if not exists watch_reference text,
  add column if not exists watch_collection text,
  add column if not exists watch_case_material text,
  add column if not exists watch_strap_material text,
  add column if not exists watch_dial_color text,
  add column if not exists watch_movement_type text,
  add column if not exists watch_set text,
  add column if not exists watch_condition text
    check (watch_condition is null or watch_condition in ('new', 'pre-owned')),
  add column if not exists has_certificate boolean,
  add column if not exists watch_year integer
    check (watch_year is null or (watch_year >= 1900 and watch_year <= 2100));

create index if not exists products_category_idx on public.products (category);
create index if not exists products_created_at_idx on public.products (created_at desc);
create index if not exists products_brand_id_idx on public.products (brand_id);

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

alter table public.products enable row level security;

drop policy if exists "Public read products" on public.products;
create policy "Public read products"
on public.products
for select
to anon, authenticated
using (true);

drop policy if exists "Admin insert products" on public.products;
create policy "Admin insert products"
on public.products
for insert
to authenticated
with check (auth.jwt() ->> 'email' = 'chronosmaison776@gmail.com');

drop policy if exists "Admin update products" on public.products;
create policy "Admin update products"
on public.products
for update
to authenticated
using (auth.jwt() ->> 'email' = 'chronosmaison776@gmail.com')
with check (auth.jwt() ->> 'email' = 'chronosmaison776@gmail.com');

drop policy if exists "Admin delete products" on public.products;
create policy "Admin delete products"
on public.products
for delete
to authenticated
using (auth.jwt() ->> 'email' = 'chronosmaison776@gmail.com');

-- Məhsul şəkilləri bucket (JPG, PNG, WEBP, AVIF, HEIC)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/heic', 'image/heif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read product images" on storage.objects;
create policy "Public read product images"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'product-images');

drop policy if exists "Admin upload product images" on storage.objects;
create policy "Admin upload product images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'product-images'
  and auth.jwt() ->> 'email' = 'chronosmaison776@gmail.com'
);

drop policy if exists "Admin update product images" on storage.objects;
create policy "Admin update product images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'product-images'
  and auth.jwt() ->> 'email' = 'chronosmaison776@gmail.com'
)
with check (
  bucket_id = 'product-images'
  and auth.jwt() ->> 'email' = 'chronosmaison776@gmail.com'
);

drop policy if exists "Admin delete product images" on storage.objects;
create policy "Admin delete product images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'product-images'
  and auth.jwt() ->> 'email' = 'chronosmaison776@gmail.com'
);

-- ═══════════════════════════════════════════════════════════════
-- BRENDLƏR (brands)
-- ═══════════════════════════════════════════════════════════════

create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  logo_url text not null,
  category text not null
    check (category in ('watches', 'bags', 'jewelry', 'both')),
  show_on_homepage boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists brands_slug_idx on public.brands (slug);
create index if not exists brands_homepage_idx on public.brands (show_on_homepage, sort_order);

drop trigger if exists brands_set_updated_at on public.brands;
create trigger brands_set_updated_at
before update on public.brands
for each row execute function public.set_updated_at();

alter table public.brands enable row level security;

drop policy if exists "Public read brands" on public.brands;
create policy "Public read brands"
on public.brands
for select
to anon, authenticated
using (true);

drop policy if exists "Admin insert brands" on public.brands;
create policy "Admin insert brands"
on public.brands
for insert
to authenticated
with check (auth.jwt() ->> 'email' = 'chronosmaison776@gmail.com');

drop policy if exists "Admin update brands" on public.brands;
create policy "Admin update brands"
on public.brands
for update
to authenticated
using (auth.jwt() ->> 'email' = 'chronosmaison776@gmail.com')
with check (auth.jwt() ->> 'email' = 'chronosmaison776@gmail.com');

drop policy if exists "Admin delete brands" on public.brands;
create policy "Admin delete brands"
on public.brands
for delete
to authenticated
using (auth.jwt() ->> 'email' = 'chronosmaison776@gmail.com');

-- Brend loqoları bucket
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'brand-logos',
  'brand-logos',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml', 'image/heic', 'image/heif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read brand logos" on storage.objects;
create policy "Public read brand logos"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'brand-logos');

drop policy if exists "Admin upload brand logos" on storage.objects;
create policy "Admin upload brand logos"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'brand-logos'
  and auth.jwt() ->> 'email' = 'chronosmaison776@gmail.com'
);

drop policy if exists "Admin update brand logos" on storage.objects;
create policy "Admin update brand logos"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'brand-logos'
  and auth.jwt() ->> 'email' = 'chronosmaison776@gmail.com'
)
with check (
  bucket_id = 'brand-logos'
  and auth.jwt() ->> 'email' = 'chronosmaison776@gmail.com'
);

drop policy if exists "Admin delete brand logos" on storage.objects;
create policy "Admin delete brand logos"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'brand-logos'
  and auth.jwt() ->> 'email' = 'chronosmaison776@gmail.com'
);
