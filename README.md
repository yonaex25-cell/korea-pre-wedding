# Dasoni

Korea Wedding Photography Concierge.

Dasoni is a premium Next.js platform that connects couples with curated Korean wedding photography studios in Seoul, Jeju, and Busan.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style components
- Supabase Database, Auth, and Storage
- OpenAI API recommendations
- Vercel-ready deployment

## Quick Start

1. Install dependencies

   npm install

2. Create an environment file

   cp .env.local.example .env.local

3. Run the app

   npm run dev

4. Open http://localhost:3000

The app includes curated demo content before Supabase is configured. Supabase-backed reservations, admin CRUD, image uploads, auth, and OpenAI recommendations activate when environment variables are set.

## Supabase Setup

1. Create a Supabase project.
2. Run supabase/schema.sql in the SQL editor.
3. Optionally run supabase/seed.sql for starter content.
4. Create an admin user in Supabase Auth.
5. Add environment variables from .env.local.example.

## Admin

- Login: /admin/login
- Dashboard: /admin/dashboard
- Studios: /admin/studios
- Reservations: /admin/reservations
- Reviews: /admin/reviews
- FAQs: /admin/faqs

The Admin navigation button is only visible when the logged-in user's email is yonaex25@gmail.com.

## Contact

- Email: yonaex25@gmail.com
- LINE: ngyn9813
- Instagram: https://www.instagram.com/dasoni_korea_wd

## Deployment

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Add the environment variables in Vercel Project Settings.
4. Deploy.
