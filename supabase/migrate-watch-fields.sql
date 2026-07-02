-- Saat məhsulları üçün əlavə sahələr (köhnə quraşdırma üçün)
-- Supabase → SQL Editor → Run
-- QEYD: Tam yeniləmə üçün supabase/full-setup.sql də işə salına bilər.

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
