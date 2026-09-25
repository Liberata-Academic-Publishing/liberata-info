// Emails the team whenever a visitor submits the site's contact form.
//
// Triggered by a Postgres trigger on contact_messages (see the migration in
// supabase/migrations), NOT by the browser — the Resend API key must never
// reach the client bundle, and the row is written before this runs, so a
// Resend outage loses the notification but never the message itself.
//
// Required secrets (supabase secrets set ...):
//   RESEND_API_KEY        Resend API key
//   CONTACT_FROM_EMAIL    verified Resend sender, e.g. "Liberata <noreply@liberata.info>"
//   CONTACT_WEBHOOK_SECRET  shared with the trigger so the endpoint isn't open to the world
// Optional:
//   CONTACT_TO_EMAILS     comma-separated; defaults to the two team inboxes

const DEFAULT_RECIPIENTS = ["liberata@duke.edu", "academia.liberata@gmail.com"];

type ContactRecord = {
  id?: string;
  created_at?: string;
  name?: string;
  email?: string;
  affiliation?: string | null;
  purpose?: string | null;
  message?: string | null;
};

// The message is visitor-supplied and goes into an HTML email — escape it, or
// a submission containing markup renders as live HTML in the team's inbox.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string | null | undefined): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:4px 12px 4px 0;color:#6b7280;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>
    <td style="padding:4px 0;color:#111827">${escapeHtml(value)}</td>
  </tr>`;
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const expectedSecret = Deno.env.get("CONTACT_WEBHOOK_SECRET");
  if (!expectedSecret || req.headers.get("x-webhook-secret") !== expectedSecret) {
    return new Response("Unauthorized", { status: 401 });
  }

  const apiKey = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("CONTACT_FROM_EMAIL");
  if (!apiKey || !from) {
    console.error("Missing RESEND_API_KEY or CONTACT_FROM_EMAIL");
    return new Response("Server not configured", { status: 500 });
  }

  const to = (Deno.env.get("CONTACT_TO_EMAILS") ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  const recipients = to.length ? to : DEFAULT_RECIPIENTS;

  let record: ContactRecord;
  try {
    const payload = await req.json();
    record = payload.record ?? payload;
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const name = record.name?.trim() || "(no name)";
  // The subject is a mail header: strip CR/LF so a crafted name can't attempt
  // header injection, and cap the length so long input doesn't wreck the
  // inbox list view.
  const subjectName = name.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").slice(0, 80);
  const email = record.email?.trim() || "";
  const message = record.message?.trim() || "(no message)";

  const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;font-size:15px;line-height:1.5">
    <p style="margin:0 0 16px;color:#111827">New contact form submission from <strong>${escapeHtml(name)}</strong>.</p>
    <table style="border-collapse:collapse;margin-bottom:16px">
      ${row("Name", record.name)}
      ${row("Email", record.email)}
      ${row("Affiliation", record.affiliation)}
      ${row("Purpose", record.purpose)}
      ${row("Submitted", record.created_at)}
    </table>
    <div style="white-space:pre-wrap;padding:12px 16px;background:#f9fafb;border-left:3px solid #d1d5db;color:#111827">${escapeHtml(message)}</div>
  </div>`;

  const text = [
    `New contact form submission from ${name}.`,
    "",
    `Name: ${record.name ?? ""}`,
    `Email: ${record.email ?? ""}`,
    record.affiliation ? `Affiliation: ${record.affiliation}` : "",
    record.purpose ? `Purpose: ${record.purpose}` : "",
    record.created_at ? `Submitted: ${record.created_at}` : "",
    "",
    message,
  ].filter(Boolean).join("\n");

  const body: Record<string, unknown> = {
    from,
    to: recipients,
    subject: `Liberata contact form — ${subjectName}`,
    html,
    text,
  };
  // So hitting reply in the inbox goes to the visitor, not to the no-reply sender
  if (email) body.reply_to = email;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("Resend rejected the send", res.status, detail);
    return new Response(`Resend error: ${res.status}`, { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
