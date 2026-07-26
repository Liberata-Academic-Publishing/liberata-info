-- Info-site intake tables (beta signups + contact messages).
-- Lives in the shared staging Supabase project; RLS is insert-only for
-- anon so site visitors can submit but never read anyone's data.

create table if not exists beta_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  institution text not null,
  institutional_email text not null,
  discipline text not null,
  orcid text not null unique,
  publish_timeframe_months int,
  oa_challenges text check (char_length(oa_challenges) <= 500)
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  affiliation text,
  purpose text,
  message text check (char_length(message) <= 5000)
);

alter table beta_signups enable row level security;
alter table contact_messages enable row level security;

create policy "public can sign up" on beta_signups
  for insert to anon with check (true);

create policy "public can send messages" on contact_messages
  for insert to anon with check (true);

-- No select/update/delete policies on purpose: submissions are write-only
-- from the site; the team reads them via the dashboard (service role).
