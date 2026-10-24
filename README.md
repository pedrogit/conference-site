# DevSummit Conference Site

A React + Vite conference landing page for:
- attendee registration
- speaker/workshop proposals
- deployable frontend

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Optional Supabase setup

1. Create a Supabase project
2. Add your values to a `.env` file:

```env
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-key
```

3. Create tables:

```sql
create table registrations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  company text,
  ticket text not null,
  created_at timestamp with time zone default now()
);

create table proposals (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  title text not null,
  type text not null,
  summary text not null,
  experience text not null,
  created_at timestamp with time zone default now()
);
```

If Supabase is not configured, the app saves data in localStorage instead.

## Deploy to Vercel

1. Push to GitHub
2. Import project into Vercel
3. Set framework to Vite
4. Add env vars if using Supabase
5. Deploy
