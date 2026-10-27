/**
 * Cloudflare Pages Function: POST /api/enquiry
 *
 * Receives the enquiry form (src/components/EnquiryForm.astro) and forwards it
 * as JSON to a webhook (Make.com) set in the Cloudflare Pages dashboard:
 *
 *   Settings → Environment variables → ENQUIRY_WEBHOOK_URL
 *
 * The Make scenario then emails Scott and logs the lead to a Google Sheet.
 * On success the visitor lands on /thanks/. On failure they go back to the
 * page they came from with ?enquiry=error so the form can show the email fallback.
 */

const REQUIRED = ['name', 'email', 'event_type'];
const MAX_LEN = 4000;

function back(request, status) {
  const ref = request.headers.get('referer');
  let url;
  try {
    url = new URL(ref || '/contact/', request.url);
    if (url.origin !== new URL(request.url).origin) url = new URL('/contact/', request.url);
  } catch {
    url = new URL('/contact/', request.url);
  }
  url.searchParams.set('enquiry', status);
  url.hash = 'enquire';
  return Response.redirect(url.toString(), 303);
}

export async function onRequestPost({ request, env }) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return back(request, 'error');
  }

  // Honeypot: real people never see this field. Bots fill it in.
  if ((form.get('company_website') || '').toString().trim() !== '') {
    return Response.redirect(new URL('/thanks/', request.url).toString(), 303);
  }

  const data = {};
  for (const [key, value] of form.entries()) {
    if (key === 'company_website') continue;
    data[key] = value.toString().slice(0, MAX_LEN).trim();
  }

  const missing = REQUIRED.filter((k) => !data[k]);
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '');
  if (missing.length || !emailOk) return back(request, 'invalid');

  if (!env.ENQUIRY_WEBHOOK_URL) return back(request, 'error');

  const payload = {
    ...data,
    submitted_at: new Date().toISOString(),
    page: request.headers.get('referer') || '',
    country: request.cf?.country || '',
  };

  try {
    const res = await fetch(env.ENQUIRY_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return back(request, 'error');
  } catch {
    return back(request, 'error');
  }

  return Response.redirect(new URL('/thanks/', request.url).toString(), 303);
}

export function onRequest() {
  return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });
}
