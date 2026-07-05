-- Saat vəziyyəti: 3 seçim (Yeni, Yeni kimi, Az işlənmiş)
-- Supabase → SQL Editor → Run
--
-- Xəta: products_watch_condition_check violates → bu faylı işə salın

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
      and pg_get_constraintdef(c.oid) ilike '%watch_condition%'
  loop
    execute format('alter table public.products drop constraint %I', r.conname);
  end loop;
end $$;

update public.products
set watch_condition = 'lightly-used'
where watch_condition = 'pre-owned';

alter table public.products
  add constraint products_watch_condition_check
  check (watch_condition is null or watch_condition in ('new', 'like-new', 'lightly-used'));
