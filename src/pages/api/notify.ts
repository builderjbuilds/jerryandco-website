// Netlify serverless function — triggered by Formspark webhook on form submission.
// Sends two emails via Resend:
//   1. Lead confirmation → client (name/email from form)
//   2. Internal notification → jerry@jerryandcohomeservices.com
//
// To wire up: In Formspark dashboard → Webhooks → add POST to
//   https://www.jerryandcohomeservices.com/api/notify
// with Header: Authorization: Bearer {FORMSPARK_WEBHOOK_SECRET}
export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const RESEND_KEY    = import.meta.env.RESEND_API_KEY;
const WEBHOOK_SECRET = import.meta.env.FORMSPARK_WEBHOOK_SECRET ?? '';
const FROM_DOMAIN   = 'jerry@jerryandcohomeservices.com';
const NOTIFY_TO     = 'jerry@jerryandcohomeservices.com';
const SITE_URL      = 'https://www.jerryandcohomeservices.com';

export const POST: APIRoute = async ({ request }) => {
  // Webhook secret guard
  if (WEBHOOK_SECRET) {
    const auth = request.headers.get('authorization') ?? '';
    if (auth !== `Bearer ${WEBHOOK_SECRET}`) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
  }

  if (!RESEND_KEY) {
    console.error('[notify] RESEND_API_KEY not set — skipping email');
    return new Response(JSON.stringify({ ok: true, skipped: 'no resend key' }), { status: 200 });
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const { name, email, phone, town, project_type, property_type, timeline, building_notes } = body;
  const resend = new Resend(RESEND_KEY);

  // ── Email 1: Lead confirmation (to the client) ────────────────────────────
  const confirmHtml = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width"/></head>
<body style="margin:0;padding:0;background:#F7F3EA;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F3EA;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #DDD8CC;border-radius:4px;overflow:hidden;">
        <!-- Header -->
        <tr><td style="background:#1B3D2F;padding:32px 40px;">
          <p style="margin:0;font-family:Georgia,serif;font-size:22px;color:#F7F3EA;letter-spacing:0.04em;">Jerry &amp; Co.</p>
          <p style="margin:4px 0 0;font-size:11px;color:#C8A055;letter-spacing:0.2em;text-transform:uppercase;">Home Improvement</p>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:40px;">
          <h1 style="margin:0 0 16px;font-size:24px;color:#1B3D2F;font-family:Georgia,serif;letter-spacing:-0.02em;">We got your estimate request.</h1>
          <p style="margin:0 0 20px;font-size:15px;color:#5A5A50;line-height:1.7;">Hi ${name || 'there'} — Jeremiah here. Thanks for reaching out. Here's what happens next:</p>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr>
              <td width="36" valign="top" style="padding-top:2px;font-size:18px;color:#C8A055;font-family:Georgia,serif;">1.</td>
              <td style="font-size:14px;color:#5A5A50;line-height:1.65;padding-bottom:12px;"><strong style="color:#1B3D2F;">I'll review your info</strong> — within 5 minutes of receiving your request, I read every submission personally.</td>
            </tr>
            <tr>
              <td valign="top" style="padding-top:2px;font-size:18px;color:#C8A055;font-family:Georgia,serif;">2.</td>
              <td style="font-size:14px;color:#5A5A50;line-height:1.65;padding-bottom:12px;"><strong style="color:#1B3D2F;">I'll reach out within 24 hours</strong> — either by phone or text to schedule your free video walkthrough.</td>
            </tr>
            <tr>
              <td valign="top" style="padding-top:2px;font-size:18px;color:#C8A055;font-family:Georgia,serif;">3.</td>
              <td style="font-size:14px;color:#5A5A50;line-height:1.65;"><strong style="color:#1B3D2F;">You'll get a same-day written quote</strong> — after the walkthrough, I'll send a detailed estimate by end of day.</td>
            </tr>
          </table>

          <p style="margin:0 0 24px;font-size:14px;color:#5A5A50;line-height:1.7;">Need to reach me before then? Call or text me directly: <a href="tel:+13476026801" style="color:#8A6A33;text-decoration:none;font-weight:600;">(347) 602-6801</a></p>

          <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
            <tr><td style="background:#1B3D2F;border-radius:3px;">
              <a href="${SITE_URL}/our-process/" style="display:inline-block;padding:14px 24px;font-size:14px;font-weight:600;color:#F7F3EA;text-decoration:none;letter-spacing:0.02em;">See how the process works →</a>
            </td></tr>
          </table>

          <p style="margin:0;font-size:13px;color:#A0998A;">— Jeremiah Ugbine, Owner<br/>Jerry &amp; Co. Home Improvement LLC · MA HIC #208336<br/><a href="${SITE_URL}" style="color:#8A6A33;text-decoration:none;">${SITE_URL}</a></p>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#F7F3EA;border-top:1px solid #DDD8CC;padding:20px 40px;">
          <p style="margin:0;font-size:11px;color:#B0A898;line-height:1.6;">You're receiving this because you submitted an estimate request at jerryandcohomeservices.com. This is a transactional message, not marketing.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  // ── Email 2: Internal notification (to Jeremiah) ──────────────────────────
  const notifyHtml = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:20px;background:#F7F3EA;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#1B3D2F;border-radius:4px;overflow:hidden;">
    <tr><td style="padding:24px 28px;border-bottom:1px solid rgba(247,243,234,0.1);">
      <p style="margin:0;font-size:11px;color:#C8A055;letter-spacing:0.16em;text-transform:uppercase;">New Lead · Jerry &amp; Co.</p>
      <h1 style="margin:6px 0 0;font-size:22px;color:#F7F3EA;font-family:Georgia,serif;">${name || '(no name)'}</h1>
    </td></tr>
    <tr><td style="padding:24px 28px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${[
          ['Phone',          phone        || '—'],
          ['Email',          email        || '—'],
          ['Town',           town         || '—'],
          ['Project',        project_type || '—'],
          ['Property type',  property_type || '—'],
          ['Timeline',       timeline     || '—'],
          ['Building notes', building_notes || '—'],
        ].map(([label, value]) => `
        <tr>
          <td width="130" style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:rgba(247,243,234,0.4);padding-bottom:14px;vertical-align:top;">${label}</td>
          <td style="font-size:14px;color:#F7F3EA;padding-bottom:14px;line-height:1.5;">${value}</td>
        </tr>`).join('')}
      </table>
    </td></tr>
    <tr><td style="padding:16px 28px;border-top:1px solid rgba(247,243,234,0.1);">
      <a href="tel:+1${(phone||'').replace(/\D/g,'')}" style="display:inline-block;background:#C8A055;color:#1B3D2F;padding:10px 20px;border-radius:2px;font-size:13px;font-weight:700;text-decoration:none;margin-right:8px;">Call back</a>
      ${email ? `<a href="mailto:${email}" style="display:inline-block;background:rgba(247,243,234,0.1);color:#F7F3EA;padding:10px 20px;border-radius:2px;font-size:13px;font-weight:600;text-decoration:none;">Email</a>` : ''}
    </td></tr>
  </table>
</body>
</html>`;

  const results = await Promise.allSettled([
    // Confirmation to lead
    email
      ? resend.emails.send({
          from: `Jeremiah @ Jerry & Co. <${FROM_DOMAIN}>`,
          to:   email,
          subject: 'We got your estimate request — here\'s what happens next',
          html:  confirmHtml,
        })
      : Promise.resolve({ skipped: 'no email address' }),

    // Internal notification to Jeremiah
    resend.emails.send({
      from:    `Site Notifications <${FROM_DOMAIN}>`,
      to:      NOTIFY_TO,
      subject: `New estimate request — ${name || 'unknown'} · ${town || 'no town'}`,
      html:    notifyHtml,
    }),
  ]);

  const errors = results.filter(r => r.status === 'rejected').map(r => (r as PromiseRejectedResult).reason?.message);
  if (errors.length) {
    console.error('[notify] Resend errors:', errors);
  }

  return new Response(JSON.stringify({ ok: true, errors: errors.length ? errors : undefined }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
