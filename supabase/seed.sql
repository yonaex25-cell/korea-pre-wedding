insert into public.studios (slug, name, region, city, styles, budget_min, budget_max, price_from, currency, description, long_description, cover_image_url, included_services, destinations, featured, is_published)
values
('maison-de-luna-seoul', 'Maison de Luna Seoul', 'Seoul', 'Gangnam', array['Classic','Editorial'], 280000, 620000, 320000, 'JPY', 'A refined Gangnam studio for elegant Korean wedding portraits with editorial lighting and graceful direction.', 'Maison de Luna Seoul combines polished studio sets, premium dress styling, detailed hair and makeup, and calm posing guidance. It is a strong match for couples who want timeless Korean wedding photography with concierge support before and during the shoot.', 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85', array['Two dresses','One tuxedo','Hair and makeup','Concierge coordination','20 retouched images'], array['Gangnam','Seongsu','Bukchon'], true, true),
('atelier-haneul-jeju', 'Atelier Haneul Jeju', 'Jeju', 'Aewol', array['Natural','Resort'], 360000, 780000, 420000, 'JPY', 'A Jeju outdoor photography team for bright coastal, garden, and resort-inspired wedding sessions.', 'Atelier Haneul Jeju focuses on sea light, open landscapes, soft garden scenes, and relaxed movement. The team helps plan routes, timing, transport, styling, and weather alternatives for destination wedding photography in Jeju.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85', array['Two dresses','Hair and makeup','Location vehicle','Bouquet styling','25 retouched images'], array['Aewol Coast','Seopjikoji','Camellia Hill'], true, true),
('busan-lumiere-studio', 'Busan Lumiere Studio', 'Busan', 'Haeundae', array['Cinematic','Modern'], 260000, 560000, 300000, 'JPY', 'A cinematic Busan studio combining ocean horizons, city lights, and modern couple portraits.', 'Busan Lumiere Studio is ideal for couples who want a mix of beach, bridge, skyline, and night-view photography. The schedule is designed for shorter trips while keeping the images polished and dramatic.', 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=85', array['One dress','One tuxedo','Hair and makeup','Night-view session','18 retouched images'], array['Haeundae','Gwangalli','Dongbaek Island'], true, true)
on conflict (slug) do update set
  name = excluded.name,
  region = excluded.region,
  city = excluded.city,
  styles = excluded.styles,
  budget_min = excluded.budget_min,
  budget_max = excluded.budget_max,
  price_from = excluded.price_from,
  description = excluded.description,
  long_description = excluded.long_description,
  cover_image_url = excluded.cover_image_url,
  included_services = excluded.included_services,
  destinations = excluded.destinations,
  featured = excluded.featured,
  is_published = excluded.is_published;

insert into public.studio_images (studio_id, url, alt_text, sort_order)
select id, cover_image_url, name || ' gallery image', 0 from public.studios
on conflict do nothing;

insert into public.reviews (studio_id, customer_name, country, rating, content, image_url, is_published)
select id, 'Mika & Ren', 'Japan', 5, 'Dasoni helped us compare styles clearly, and the Seoul studio felt calm from the first consultation to the final gallery.', 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=800&q=80', true
from public.studios where slug = 'maison-de-luna-seoul'
on conflict do nothing;

insert into public.faqs (studio_id, category, question, answer, sort_order, is_published)
select id, 'booking', 'How early should we book a Korean wedding photography studio?', 'For spring and autumn, three to four months ahead is ideal. For quieter seasons, two months is usually workable, and you can start with a consultation before flights are finalized.', 1, true
from public.studios where slug = 'maison-de-luna-seoul'
on conflict do nothing;
