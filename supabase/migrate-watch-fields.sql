-- Saat məhsulları üçün əlavə sahələr (köhnə quraşdırma üçün)
-- Supabase → SQL Editor → Run
--
-- QEYD: Ən yaxşısı supabase/full-setup.sql-i tam işə salmaqdır.
-- Bu fayl yalnız saat sütunlarını əlavə edir.

alter table public.products
  add column if not exists case_size_mm integer,
  add column if not exists watch_reference text,
  add column if not exists watch_collection text,
  add column if not exists watch_case_material text,
  add column if not exists watch_strap_material text,
  add column if not exists watch_dial_color text,
  add column if not exists watch_movement_type text,
  add column if not exists watch_set text,
  add column if not exists watch_condition text,
  add column if not exists has_certificate boolean,
  add column if not exists watch_year integer;

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
      and (
        pg_get_constraintdef(c.oid) ilike '%case_size_mm%'
        or pg_get_constraintdef(c.oid) ilike '%watch_year%'
        or pg_get_constraintdef(c.oid) ilike '%watch_condition%'
      )
  loop
    execute format('alter table public.products drop constraint %I', r.conname);
  end loop;
end $$;

update public.products
set watch_condition = 'lightly-used'
where watch_condition = 'pre-owned';

alter table public.products
  add constraint products_case_size_mm_check
  check (case_size_mm is null or case_size_mm > 0);

alter table public.products
  add constraint products_watch_condition_check
  check (watch_condition is null or watch_condition in ('new', 'like-new', 'lightly-used'));

alter table public.products
  add constraint products_watch_year_check
  check (watch_year is null or (watch_year >= 1900 and watch_year <= 2100));

notify pgrst, 'reload schema';
