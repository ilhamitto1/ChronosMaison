-- Köhnə AZN qiymətlərini USD-yə çevir (1 USD ≈ 1.70 AZN)
-- Supabase SQL Editor-də bir dəfə işlədin, sonra admin paneldə $ görünəcək.

UPDATE public.products
SET price = ROUND(price / 1.70, 0)
WHERE price >= 1000;
