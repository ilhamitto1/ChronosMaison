-- ChronosMaison — brands table + storage
-- Admin email: chronosmaison776@gmail.com
-- QEYD: Məhsul policy-lərinə toxunmur. Yalnız brendlər üçün əlavə edin.

-- updated_at funksiyası (məhsullar üçün artıq varsa, təhlükəsiz yenilənir)
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

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

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'brand-logos',
  'brand-logos',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml']
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
