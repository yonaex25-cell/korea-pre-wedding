-- Dasoni Supabase schema
-- Run this file in the Supabase SQL editor.

create extension if not exists "pgcrypto";

create table if not exists public.studios (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  region text not null check (region in ('Seoul', 'Jeju', 'Busan')),
  city text not null,
  styles text[] not null default '{}',
  budget_min integer not null default 0,
  budget_max integer not null default 0,
  price_from integer not null default 0,
  currency text not null default 'JPY',
  description text not null,
  long_description text not null,
  cover_image_url text not null,
  included_services text[] not null default '{}',
  destinations text[] not null default '{}',
  featured boolean not null default false,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.studio_images (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid not null references public.studios(id) on delete cascade,
  url text not null,
  alt_text text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid references public.studios(id) on delete set null,
  studio_slug text,
  name text not null,
  email text not null,
  line_id text not null,
  preferred_date date not null,
  message text not null default '',
  status text not null default 'new' check (status in ('new', 'contacted', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid references public.studios(id) on delete cascade,
  customer_name text not null,
  country text not null default 'Japan',
  rating integer not null check (rating between 1 and 5),
  content text not null,
  image_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid references public.studios(id) on delete cascade,
  category text not null default 'general',
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists studios_set_updated_at on public.studios;
create trigger studios_set_updated_at before update on public.studios
for each row execute function public.set_updated_at();

drop trigger if exists reservations_set_updated_at on public.reservations;
create trigger reservations_set_updated_at before update on public.reservations
for each row execute function public.set_updated_at();

drop trigger if exists reviews_set_updated_at on public.reviews;
create trigger reviews_set_updated_at before update on public.reviews
for each row execute function public.set_updated_at();

drop trigger if exists faqs_set_updated_at on public.faqs;
create trigger faqs_set_updated_at before update on public.faqs
for each row execute function public.set_updated_at();

alter table public.studios enable row level security;
alter table public.studio_images enable row level security;
alter table public.reservations enable row level security;
alter table public.reviews enable row level security;
alter table public.faqs enable row level security;

drop policy if exists "Public can read published studios" on public.studios;
create policy "Public can read published studios" on public.studios
for select using (is_published = true);

drop policy if exists "Authenticated users manage studios" on public.studios;
create policy "Authenticated users manage studios" on public.studios
for all to authenticated using (true) with check (true);

drop policy if exists "Public can read studio images" on public.studio_images;
create policy "Public can read studio images" on public.studio_images
for select using (true);

drop policy if exists "Authenticated users manage studio images" on public.studio_images;
create policy "Authenticated users manage studio images" on public.studio_images
for all to authenticated using (true) with check (true);

drop policy if exists "Public can create reservations" on public.reservations;
create policy "Public can create reservations" on public.reservations
for insert to anon, authenticated with check (true);

drop policy if exists "Authenticated users manage reservations" on public.reservations;
create policy "Authenticated users manage reservations" on public.reservations
for all to authenticated using (true) with check (true);

drop policy if exists "Public can read published reviews" on public.reviews;
create policy "Public can read published reviews" on public.reviews
for select using (is_published = true);

drop policy if exists "Authenticated users manage reviews" on public.reviews;
create policy "Authenticated users manage reviews" on public.reviews
for all to authenticated using (true) with check (true);

drop policy if exists "Public can read published faqs" on public.faqs;
create policy "Public can read published faqs" on public.faqs
for select using (is_published = true);

drop policy if exists "Authenticated users manage faqs" on public.faqs;
create policy "Authenticated users manage faqs" on public.faqs
for all to authenticated using (true) with check (true);

insert into storage.buckets (id, name, public)
values ('studio-images', 'studio-images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can read studio image objects" on storage.objects;
create policy "Public can read studio image objects" on storage.objects
for select using (bucket_id = 'studio-images');

drop policy if exists "Authenticated users upload studio image objects" on storage.objects;
create policy "Authenticated users upload studio image objects" on storage.objects
for insert to authenticated with check (bucket_id = 'studio-images');

drop policy if exists "Authenticated users update studio image objects" on storage.objects;
create policy "Authenticated users update studio image objects" on storage.objects
for update to authenticated using (bucket_id = 'studio-images') with check (bucket_id = 'studio-images');

drop policy if exists "Authenticated users delete studio image objects" on storage.objects;
create policy "Authenticated users delete studio image objects" on storage.objects
for delete to authenticated using (bucket_id = 'studio-images');

create index if not exists studios_region_idx on public.studios(region);
create index if not exists studios_styles_idx on public.studios using gin(styles);
create index if not exists reservations_status_idx on public.reservations(status);
create index if not exists faqs_studio_idx on public.faqs(studio_id, sort_order);
