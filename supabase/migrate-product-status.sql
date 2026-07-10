-- Məhsul statusu: Satıldı, Endirim, Qiymət sorğusu
-- Supabase → SQL Editor → Run
--
-- QEYD: Ən yaxşısı supabase/full-setup.sql-i tam işə salmaqdır.
-- Bu fayl yalnız status sütunlarını əlavə edir (kiçik yeniləmə).

alter table public.products
  add column if not exists is_sold boolean,
  add column if not exists price_on_request boolean,
  add column if not exists original_price numeric(12, 2);

update public.products set is_sold = false where is_sold is null;
update public.products set price_on_request = false where price_on_request is null;

alter table public.products
  alter column is_sold set default false,
  alter column price_on_request set default false;

alter table public.products
  alter column is_sold set not null,
  alter column price_on_request set not null;

do $$
declare
  r record;
begin
  for r in
    select c.conname
    from pg_constraint c
    join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public'
      and t.relname = 'products'
      and c.contype = 'c'
      and pg_get_constraintdef(c.oid) ilike '%original_price%'
  loop
    execute format('alter table public.products drop constraint %I', r.conname);
  end loop;
end $$;

alter table public.products
  drop constraint if exists products_original_price_check;

alter table public.products
  add constraint products_original_price_check
  check (original_price is null or original_price >= 0);

create index if not exists products_is_sold_idx on public.products (is_sold);

comment on column public.products.is_sold is 'Satıldı nişanı — məhsul satılıb';
comment on column public.products.price_on_request is 'Qiymət göstərilmir — WhatsApp sorğusu';
comment on column public.products.original_price is 'Köhnə qiymət (endirim faizini hesablamaq üçün)';

-- PostgREST schema cache yenilənsin (Supabase)
notify pgrst, 'reload schema';
