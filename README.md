# Korea Pre Wedding

Premium Next.js platform connecting Japanese customers with Korean wedding studios in Seoul, Jeju, and Busan.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style local components
- Supabase Database, Auth, and Storage
- OpenAI API for AI studio recommendations
- Vercel-ready deployment

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

The public catalog runs immediately with curated seed data. Supabase-backed reservations, admin CRUD, and image uploads activate after `.env.local` is configured.

## Environment

Copy `.env.local.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_STORAGE_BUCKET=studio-images
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4o-mini
ADMIN_EMAILS=owner@example.com,planner@example.com
```

`OPENAI_API_KEY` is optional for local testing. Without it, the recommendation API uses deterministic matching from the studio catalog.

## Supabase Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Enable email/password Auth in Supabase.
4. Create admin users in Supabase Auth.
5. Add their email addresses to `ADMIN_EMAILS`.
6. Add the Supabase variables to Vercel and locally.

The SQL creates:

- `studios`
- `studio_images`
- `reservations`
- `reviews`
- `faqs`
- public `studio-images` storage bucket
- Row Level Security policies for public reads and reservation inserts

Admin routes use `SUPABASE_SERVICE_ROLE_KEY` on the server and require a logged-in Supabase user whose email is listed in `ADMIN_EMAILS`.

## Pages

- `/` Home
- `/studios` Studio list with search and filters
- `/studios/[slug]` Studio detail
- `/ai-recommendation` AI recommendation questionnaire
- `/reservation` Reservation form
- `/faq` FAQ
- `/reviews` Reviews
- `/contact` Contact
- `/admin` Admin dashboard

## API Routes

- `POST /api/reservations`
- `POST /api/recommendations`
- `GET|POST /api/admin/studios`
- `PATCH|DELETE /api/admin/studios/[id]`
- `GET /api/admin/reservations`
- `GET|POST /api/admin/reviews`
- `DELETE /api/admin/reviews/[id]`
- `GET|POST /api/admin/faqs`
- `DELETE /api/admin/faqs/[id]`
- `POST /api/admin/upload`

## Folder Structure

```text
app/
  api/
  admin/
  ai-recommendation/
  contact/
  faq/
  reservation/
  reviews/
  studios/
components/
  admin/
  forms/
  layout/
  sections/
  studios/
  ui/
lib/
  supabase/
supabase/
  schema.sql
```

## Production Notes

- Add all environment variables in Vercel Project Settings.
- Run `npm run build` before deployment.
- Keep `SUPABASE_SERVICE_ROLE_KEY` server-only.
- Use Supabase Storage for uploaded studio images.
- Update the public contact channels in `components/layout/footer.tsx` and `app/contact/page.tsx` if your operating team uses a different inbox or LINE account.
