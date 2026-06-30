create extension if not exists pgcrypto;

create table if not exists public.studios (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  region text not null check (region in ('Seoul', 'Jeju', 'Busan')),
  styles text[] not null default '{}',
  budget text not null check (budget in ('Premium', 'Luxury', 'Signature')),
  price_from_jpy integer not null check (price_from_jpy > 0),
  duration_hours integer not null check (duration_hours > 0),
  summary text not null,
  description text not null,
  hero_image text not null,
  included_services text[] not null default '{}',
  featured boolean not null default false,
  rating numeric(2, 1) not null default 4.8,
  review_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.studio_images (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid not null references public.studios(id) on delete cascade,
  image_url text not null,
  alt text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid references public.studios(id) on delete set null,
  name text not null,
  email text not null,
  line_id text not null,
  preferred_date date not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid references public.studios(id) on delete set null,
  customer_name text not null,
  location text not null,
  rating integer not null check (rating between 1 and 5),
  body text not null,
  image_url text,
  is_published boolean not null default true,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid references public.studios(id) on delete cascade,
  category text not null default 'general' check (category in ('general', 'studio', 'reservation', 'travel')),
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists studios_region_idx on public.studios(region);
create index if not exists studios_featured_idx on public.studios(featured);
create index if not exists studio_images_studio_id_idx on public.studio_images(studio_id);
create index if not exists reservations_created_at_idx on public.reservations(created_at desc);
create index if not exists reviews_published_idx on public.reviews(is_published, published_at desc);
create index if not exists faqs_published_idx on public.faqs(is_published, sort_order);

alter table public.studios enable row level security;
alter table public.studio_images enable row level security;
alter table public.reservations enable row level security;
alter table public.reviews enable row level security;
alter table public.faqs enable row level security;

drop policy if exists "Public can read studios" on public.studios;
create policy "Public can read studios" on public.studios for select using (true);

drop policy if exists "Public can read studio images" on public.studio_images;
create policy "Public can read studio images" on public.studio_images for select using (true);

drop policy if exists "Public can create reservations" on public.reservations;
create policy "Public can create reservations" on public.reservations for insert with check (true);

drop policy if exists "Public can read published reviews" on public.reviews;
create policy "Public can read published reviews" on public.reviews for select using (is_published = true);

drop policy if exists "Public can read published faqs" on public.faqs;
create policy "Public can read published faqs" on public.faqs for select using (is_published = true);

insert into public.studios (
  id, slug, name, region, styles, budget, price_from_jpy, duration_hours, summary, description, hero_image,
  included_services, featured, rating, review_count
) values
(
  '7b9a3a3c-0c85-4d11-82d7-1de9151032fb',
  'maison-de-lumiere-seoul',
  'Maison de Lumiere Seoul',
  'Seoul',
  array['Classic', 'Editorial', 'Modern'],
  'Luxury',
  328000,
  6,
  'Architectural Seoul studio with couture gowns, cinematic lighting, and concierge translation.',
  'Maison de Lumiere Seoul creates polished editorial portraits with refined studio sets, elegant gown styling, and a private Japanese-speaking coordinator from consultation through image selection.',
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85',
  array['Two premium gowns and one tuxedo', 'Hair and makeup with pre-shoot consultation', 'Japanese-speaking coordinator', '20 retouched high-resolution images', 'Private car transfer within central Seoul'],
  true,
  4.9,
  126
),
(
  'be2d6f77-902d-4b48-b6a5-0aeacff40b31',
  'jeju-atelier-veil',
  'Jeju Atelier Veil',
  'Jeju',
  array['Natural', 'Editorial'],
  'Signature',
  468000,
  8,
  'A destination atelier for ocean cliffs, botanical gardens, and soft natural imagery.',
  'Jeju Atelier Veil specializes in relaxed destination sessions that pair island scenery with understated luxury. Their team handles weather planning, vehicle routing, and bilingual communication.',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85',
  array['One gown, one casual dress, and one tuxedo', 'Outdoor location permits', 'Weather backup planning', '35 retouched high-resolution images', 'Full-day private van'],
  true,
  4.8,
  98
),
(
  '26c7a3b7-3bc1-4554-a265-78c26f52ed40',
  'busan-golden-hour',
  'Busan Golden Hour',
  'Busan',
  array['Natural', 'Modern'],
  'Premium',
  248000,
  5,
  'Elegant coastal portraits around Haeundae, Gwangan Bridge, and warm studio interiors.',
  'Busan Golden Hour is ideal for couples who want relaxed city-and-sea images with efficient planning, transparent packages, and a crisp modern finish.',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=85',
  array['One gown and one tuxedo', 'Studio plus one outdoor location', 'Korean and Japanese itinerary guide', '15 retouched high-resolution images', 'Digital delivery within five weeks'],
  true,
  4.7,
  73
)
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  region = excluded.region,
  styles = excluded.styles,
  budget = excluded.budget,
  price_from_jpy = excluded.price_from_jpy,
  duration_hours = excluded.duration_hours,
  summary = excluded.summary,
  description = excluded.description,
  hero_image = excluded.hero_image,
  included_services = excluded.included_services,
  featured = excluded.featured,
  rating = excluded.rating,
  review_count = excluded.review_count,
  updated_at = now();

insert into public.studio_images (id, studio_id, image_url, alt, sort_order) values
('b4cfe7f5-2a14-4580-8f0b-52fd986e9291', '7b9a3a3c-0c85-4d11-82d7-1de9151032fb', 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85', 'Seoul editorial wedding portrait', 1),
('9501740f-bde7-4ea0-8fb5-a63a7149dc8c', '7b9a3a3c-0c85-4d11-82d7-1de9151032fb', 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=85', 'Elegant wedding studio detail', 2),
('31dd8c2c-c5f1-4df4-8019-f16c8027e51a', 'be2d6f77-902d-4b48-b6a5-0aeacff40b31', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85', 'Jeju ocean pre-wedding scenery', 1),
('a372614f-169a-4bc5-95c6-0d59f4a08647', 'be2d6f77-902d-4b48-b6a5-0aeacff40b31', 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=85', 'Soft destination wedding couple', 2),
('f6d8c8d9-a791-40cb-a5b0-fcc6007ff324', '26c7a3b7-3bc1-4554-a265-78c26f52ed40', 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85', 'Busan modern wedding portrait', 1)
on conflict (id) do update set image_url = excluded.image_url, alt = excluded.alt, sort_order = excluded.sort_order;

insert into public.reviews (id, studio_id, customer_name, location, rating, body, published_at) values
('f9c2e8ec-ae17-4c75-a501-2584e228c4a6', '7b9a3a3c-0c85-4d11-82d7-1de9151032fb', 'Ami & Ren', 'Tokyo', 5, 'The coordinator understood exactly what Japanese couples worry about. Dress fitting, translation, and image selection were calm and beautifully organized.', '2026-02-14'),
('e3a2c38e-39b9-42a0-9ebb-09426885b285', 'be2d6f77-902d-4b48-b6a5-0aeacff40b31', 'Mika & Sho', 'Osaka', 5, 'Jeju felt like a honeymoon and a photoshoot in one. The team moved quickly when the wind changed and the final photos were graceful.', '2026-03-22'),
('f49c56d7-2730-4d25-8544-9ae64d23222f', '26c7a3b7-3bc1-4554-a265-78c26f52ed40', 'Yui & Haruto', 'Fukuoka', 5, 'Busan was easy from Japan, and the package had no confusing surprises. We loved the clean modern color grading.', '2026-04-09')
on conflict (id) do update set body = excluded.body, rating = excluded.rating, published_at = excluded.published_at;

insert into public.faqs (id, category, question, answer, sort_order) values
('ad6ea321-ef3c-4f53-ad34-c5a53bc63d14', 'general', 'Can Japanese customers reserve without speaking Korean?', 'Yes. Korea Pre Wedding coordinates in Japanese and English, and partner studios provide translated planning notes before the shoot.', 1),
('09bf4c2b-7416-4d02-a6fb-08540ba33994', 'reservation', 'How early should we reserve a studio?', 'For Seoul studios, reserve 8 to 12 weeks ahead. For Jeju and peak cherry blossom or autumn dates, 12 to 20 weeks is recommended.', 2),
('8fd7583e-ae22-44c9-82c7-50a006f573b1', 'travel', 'Do packages include flights and hotels?', 'Photo packages do not include flights or hotels. The concierge team can share recommended districts and shooting-day transport guidance.', 3),
('b774eae5-7054-4e1e-9595-04ab028a61ed', 'general', 'Can we request a specific style before booking?', 'Yes. Use the AI recommendation questionnaire or contact form to share your preferred mood, budget, and season.', 4)
on conflict (id) do update set question = excluded.question, answer = excluded.answer, sort_order = excluded.sort_order;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('studio-images', 'studio-images', true, 10485760, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = true;

drop policy if exists "Public can read studio image objects" on storage.objects;
create policy "Public can read studio image objects"
on storage.objects for select
using (bucket_id = 'studio-images');
