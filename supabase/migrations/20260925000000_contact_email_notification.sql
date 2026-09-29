-- Emails the team when a contact_messages row is inserted.
--
-- The site is a static SPA, so there is no server to hold a Resend key. The
-- browser's insert stays exactly as it was; this trigger fires afterwards and
-- calls the send-contact-email Edge Function, which holds the key as a
-- Supabase secret. The message is committed before the email is attempted,
-- so a Resend outage costs a notification, never a submission.

create extension if not exists pg_net with schema extensions;

-- The shared secret is read from Vault rather than written into this file, so
-- the function endpoint can't be invoked by anyone who finds its URL. Create it
-- once (see the function README):
--   select vault.create_secret('<random-value>', 'contact_webhook_secret');

create or replace function public.notify_contact_message()
returns trigger
language plpgsql
security definer
set search_path = public, extensions, vault
as $$
declare
  webhook_secret text;
begin
  select decrypted_secret into webhook_secret
  from vault.decrypted_secrets
  where name = 'contact_webhook_secret';

  if webhook_secret is null then
    -- Never block the insert: the submission matters more than the email.
    raise warning 'contact_webhook_secret missing from vault; skipping notification';
    return new;
  end if;

  perform net.http_post(
    url := 'https://fkoqpbnywedlexlumryt.supabase.co/functions/v1/send-contact-email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', webhook_secret
    ),
    body := jsonb_build_object('record', to_jsonb(new))
  );

  return new;
end;
$$;

drop trigger if exists on_contact_message_created on public.contact_messages;

create trigger on_contact_message_created
after insert on public.contact_messages
for each row execute function public.notify_contact_message();
