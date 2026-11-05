-- Gives the early access form (#39) its own columns for the new questions.
-- Apply only to the info-site project, fkoqpbnywedlexlumryt, in one transaction.
-- Adds three nullable columns to beta_signups; no existing rows are rewritten.
-- Roll back with:
--   alter table beta_signups
--     drop column if exists interest,
--     drop column if exists interest_other,
--     drop column if exists heard_about;
--
-- Until these columns exist the form saves the same answers as labeled lines
-- in oa_challenges (PGRST204 fallback in BetaSignupPage.tsx), so applying this
-- needs no code change. Rows saved before it stay in that fallback format.
--
-- The length caps leave headroom over the form's own limits (select option,
-- 200 and 120 characters), like oa_challenges' 1000 over its 500: anon can
-- insert here directly, so free text needs a ceiling in the database too.
-- The existing anon INSERT grant and "public can sign up" policy are
-- table-level and cover the new columns.

set local lock_timeout = '5s';
set local statement_timeout = '15s';

alter table beta_signups
  add column if not exists interest text
    check (char_length(interest) <= 100),
  add column if not exists interest_other text
    check (char_length(interest_other) <= 1000),
  add column if not exists heard_about text
    check (char_length(heard_about) <= 1000);

-- so the REST API sees the new columns right away
notify pgrst, 'reload schema';
