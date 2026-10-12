-- Victoria Harry Interiors — Supabase schema (free tier Postgres)
-- Run this once in Supabase: Project → SQL Editor → New Query → paste → Run.

create table if not exists consultation_requests (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  whatsapp text,
  project_type text,
  location text,
  budget_range text,
  message text not null,
  status text default 'new',
  created_at timestamptz not null default now()
);

-- Row Level Security: keep this table closed to the public API/anon key.
-- The backend uses the SERVICE ROLE key (server-side only, bypasses RLS), so
-- enabling RLS here just guarantees no one can read/write this table directly
-- from the browser using the public anon key.
alter table consultation_requests enable row level security;
