/**
 * POST /api/contact — Cloudflare Pages Function for the contact, volunteer and
 * partner forms.
 *
 * Environment (Cloudflare Pages → Settings → Variables and Secrets):
 *   RESEND_API_KEY        secret; Resend free tier (3,000 emails/month)
 *   CONTACT_TO            inbox that receives submissions
 *   CONTACT_FROM          verified sender, e.g. "CFK Website <website@teamcourageforkids.org>"
 *   TURNSTILE_SECRET_KEY  optional secret; enables Cloudflare Turnstile spam checks
 *
 * Responds with JSON when the request asks for it (the inline JS form) and
 * with a 303 redirect otherwise (plain HTML form posts without JavaScript).
 */

export const FORM_TYPES = ['contact', 'volunteer', 'partner'];

const LIMITS = { name: 120, email: 200, phone: 40, organization: 160, topic: 80, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Collapse whitespace and trim; strips control characters that could break headers. */
const clean = (value, max) =>
  String(value ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, max);

/**
 * Normalizes and validates submitted fields.
 * @param {Record<string, string | string[]>} raw
 * @returns {{ ok: true, data: Record<string, any> } | { ok: false, errors: string[] }}
 */
export function validate(raw) {
  const type = FORM_TYPES.includes(String(raw.type)) ? String(raw.type) : 'contact';
  const interests = (Array.isArray(raw.interests) ? raw.interests : raw.interests ? [raw.interests] : [])
    .map((i) => clean(i, 80))
    .filter(Boolean)
    .slice(0, 10);

  const data = {
    type,
    name: clean(raw.name, LIMITS.name).replace(/\s+/g, ' '),
    email: clean(raw.email, LIMITS.email).toLowerCase(),
    phone: clean(raw.phone, LIMITS.phone),
    organization: clean(raw.organization, LIMITS.organization),
    topic: clean(raw.topic, LIMITS.topic),
    message: clean(raw.message, LIMITS.message),
    interests,
  };

  const errors = [];
  if (!data.name) errors.push('name');
  if (!EMAIL_RE.test(data.email)) errors.push('email');
  if (!data.message) errors.push('message');
  if (type === 'partner' && !data.organization) errors.push('organization');

  return errors.length ? { ok: false, errors } : { ok: true, data };
}

/** Builds the notification email. Plain text only, so user input is never rendered as HTML. */
export function buildEmail(data) {
  const label = { contact: 'Contact', volunteer: 'Volunteer sign-up', partner: 'Partnership inquiry' }[data.type];
  const subject = `[CFK website] ${label}: ${data.name}${data.organization ? ` (${data.organization})` : ''}`.replace(/[\r\n]+/g, ' ');
  const lines = [
    `${label} from the Courage for Kids website`,
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.organization ? `Organization: ${data.organization}` : null,
    data.topic ? `Topic: ${data.topic}` : null,
    data.interests.length > 0 ? `Interested in: ${data.interests.join(', ')}` : null,
    '',
    'Message:',
    data.message,
    '',
    '— Reply to this email to respond directly.',
  ];
  return { subject, text: lines.filter((l) => l !== null).join('\n') };
}

async function readBody(request) {
  const type = request.headers.get('content-type') || '';
  if (type.includes('application/json')) return await request.json();
  const form = await request.formData();
  /** @type {Record<string, string | string[]>} */
  const out = {};
  for (const [key, value] of form.entries()) {
    if (typeof value !== 'string') continue;
    if (key in out) out[key] = [].concat(out[key], value);
    else out[key] = value;
  }
  return out;
}

async function verifyTurnstile(secret, token, ip) {
  if (!token) return false;
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', String(token));
  if (ip) body.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  const json = await res.json().catch(() => ({}));
  return Boolean(json.success);
}

function respond(request, status, payload) {
  const wantsJson = (request.headers.get('accept') || '').includes('application/json');
  if (wantsJson) {
    return new Response(JSON.stringify(payload), {
      status,
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
    });
  }
  const target = payload.ok ? '/thank-you/' : '/contact/?error=1';
  return new Response(null, { status: 303, headers: { location: target } });
}

/** @param {{ request: Request, env: Record<string, string> }} context */
export async function onRequestPost({ request, env }) {
  let raw;
  try {
    raw = await readBody(request);
  } catch {
    return respond(request, 400, { ok: false, error: 'bad_request' });
  }

  // Honeypot: bots fill hidden fields. Pretend success so they move on.
  if (raw.website) return respond(request, 200, { ok: true });

  const result = validate(raw);
  if (!result.ok) return respond(request, 422, { ok: false, error: 'invalid', fields: result.errors });

  if (env.TURNSTILE_SECRET_KEY) {
    const passed = await verifyTurnstile(
      env.TURNSTILE_SECRET_KEY,
      raw['cf-turnstile-response'],
      request.headers.get('CF-Connecting-IP'),
    );
    if (!passed) return respond(request, 403, { ok: false, error: 'verification_failed' });
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    return respond(request, 503, { ok: false, error: 'not_configured' });
  }

  const { subject, text } = buildEmail(result.data);
  const send = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: env.CONTACT_TO.split(',').map((s) => s.trim()).filter(Boolean),
      reply_to: result.data.email,
      subject,
      text,
    }),
  });

  if (!send.ok) return respond(request, 502, { ok: false, error: 'send_failed' });
  return respond(request, 200, { ok: true });
}

export function onRequest() {
  return new Response('Method not allowed', { status: 405, headers: { allow: 'POST' } });
}
