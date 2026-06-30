-- Yalnız RLS policy-ləri yeniləyir (cədvəl artıq varsa bunu işlədin)
-- Admin: idosdiyev@mail.ru

drop policy if exists "Admin insert products" on public.products;
create policy "Admin insert products"
on public.products
for insert
to authenticated
with check (auth.jwt() ->> 'email' = 'idosdiyev@mail.ru');

drop policy if exists "Admin update products" on public.products;
create policy "Admin update products"
on public.products
for update
to authenticated
using (auth.jwt() ->> 'email' = 'idosdiyev@mail.ru')
with check (auth.jwt() ->> 'email' = 'idosdiyev@mail.ru');

drop policy if exists "Admin delete products" on public.products;
create policy "Admin delete products"
on public.products
for delete
to authenticated
using (auth.jwt() ->> 'email' = 'idosdiyev@mail.ru');

drop policy if exists "Admin upload product images" on storage.objects;
create policy "Admin upload product images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'product-images'
  and auth.jwt() ->> 'email' = 'idosdiyev@mail.ru'
);

drop policy if exists "Admin update product images" on storage.objects;
create policy "Admin update product images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'product-images'
  and auth.jwt() ->> 'email' = 'idosdiyev@mail.ru'
)
with check (
  bucket_id = 'product-images'
  and auth.jwt() ->> 'email' = 'idosdiyev@mail.ru'
);

drop policy if exists "Admin delete product images" on storage.objects;
create policy "Admin delete product images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'product-images'
  and auth.jwt() ->> 'email' = 'idosdiyev@mail.ru'
);
