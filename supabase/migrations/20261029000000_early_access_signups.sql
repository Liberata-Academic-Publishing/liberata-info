-- Early-access sign-ups collected at the 2026 Charleston Conference (QR-code
-- pages /early-access/scriptura and /early-access/mensura). Kept separate from
-- beta_signups and contact_messages so each list stays clean, and so these do
-- not trigger the contact-message email notification.
-- Apply only to the info-site project, fkoqpbnywedlexlumryt.
-- Roll back with: drop table early_access_signups;

create table if not exists early_access_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  product text not null check (product in ('scriptura', 'mensura')),
  name text not null check (char_length(name) <= 200),
  affiliation text not null check (char_length(affiliation) <= 300),
  email text not null check (char_length(email) <= 320)
);

alter table early_access_signups enable row level security;

create policy "public can sign up for early access" on early_access_signups
  for insert to anon with check (true);

-- No select/update/delete policies on purpose: submissions are write-only
-- from the site; the team reads them via the dashboard (service role).
