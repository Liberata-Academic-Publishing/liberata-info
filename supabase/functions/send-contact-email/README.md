# send-contact-email

Emails the team when someone submits the site's contact form.

```
browser ──insert──▶ contact_messages ──trigger──▶ this function ──▶ Resend ──▶ inboxes
```

The site is a static SPA on GitHub Pages, so there is no server to hold a
Resend key — anything in the front end ships in the JS bundle. The browser's
insert is unchanged; the trigger fires afterwards. The row is committed before
the email is attempted, so a Resend outage costs a notification, never a
submission.

## One-time setup

All three commands below are run by someone with access to the info-site
Supabase project (`fkoqpbnywedlexlumryt`). **Do not commit any of these values.**

1. Set the function secrets:

   ```sh
   supabase link --project-ref fkoqpbnywedlexlumryt
   supabase secrets set RESEND_API_KEY='...' \
                        CONTACT_FROM_EMAIL='Liberata <noreply@liberata.info>' \
                        CONTACT_WEBHOOK_SECRET="$(openssl rand -hex 32)"
   ```

   `CONTACT_FROM_EMAIL` must be on a domain verified in Resend, or sends are
   rejected. Recipients default to liberata@duke.edu and
   academia.liberata@gmail.com; override with `CONTACT_TO_EMAILS` (comma
   separated) if that changes.

2. Store the same webhook secret in Vault so the trigger can send it. Use the
   value generated above:

   ```sql
   select vault.create_secret('<same value as CONTACT_WEBHOOK_SECRET>', 'contact_webhook_secret');
   ```

3. Deploy the function and the trigger:

   ```sh
   supabase functions deploy send-contact-email
   supabase db push
   ```

## Checking it works

Submit the form on the site, or insert a row directly:

```sql
insert into contact_messages (name, email, message)
values ('Test', 'you@example.com', 'testing the notification');
```

Then `supabase functions logs send-contact-email`. A 401 means the Vault
secret and `CONTACT_WEBHOOK_SECRET` disagree; a 502 means Resend rejected the
send and the log line carries its reason (most often an unverified `from`
domain).

## Notes

- The endpoint is guarded by the `x-webhook-secret` header, so knowing the URL
  is not enough to invoke it.
- Visitor input is HTML-escaped before going into the email body, and the
  subject is stripped of CR/LF, so a crafted submission cannot inject markup
  into the team's inbox or into a mail header.
- `reply_to` is the visitor's address, so replying from the inbox reaches them
  rather than the no-reply sender.
