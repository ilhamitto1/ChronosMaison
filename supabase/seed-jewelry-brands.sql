-- ChronosMaison — yeni zinət brendləri (Pasquale Bruni, Roberto Coin, Graff)
-- Supabase → SQL Editor → Run
-- Mövcud brendlərə toxunmur; yalnız çatışmayan slug-ları əlavə edir.

insert into public.brands (slug, name, logo_url, category, show_on_homepage, sort_order)
values
  ('pasquale-bruni', 'Pasquale Bruni', '/assets/brands/pasquale-bruni.svg', 'jewelry', true, 45),
  ('roberto-coin', 'Roberto Coin', '/assets/brands/roberto-coin.svg', 'jewelry', true, 46),
  ('graff', 'Graff', '/assets/brands/graff.svg', 'jewelry', true, 47)
on conflict (slug) do nothing;
