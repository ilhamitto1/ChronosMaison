-- ChronosMaison — Digər (other) məhsul kateqoriyası
-- Supabase → SQL Editor → Run
-- Mövcud məhsullara toxunmur; yalnız category check constraint yenilənir.

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
      and pg_get_constraintdef(c.oid) ilike '%category%'
  loop
    execute format('alter table public.products drop constraint %I', r.conname);
  end loop;
end $$;

alter table public.products
  add constraint products_category_check
  check (category in ('watches', 'bags', 'jewelry', 'other'));

notify pgrst, 'reload schema';
