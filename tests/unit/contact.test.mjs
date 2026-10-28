import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validate, buildEmail, onRequestPost, onRequest } from '../../functions/api/contact.js';

const good = { type: 'contact', name: '  Sam   Lee ', email: 'Sam@Example.org', message: 'Hello!' };

test('validate accepts a good submission and normalizes fields', () => {
  const r = validate(good);
  assert.equal(r.ok, true);
  assert.equal(r.data.name, 'Sam Lee');
  assert.equal(r.data.email, 'sam@example.org');
});

test('validate rejects missing name, bad email and empty message', () => {
  const r = validate({ type: 'contact', name: '', email: 'nope', message: ' ' });
  assert.equal(r.ok, false);
  assert.deepEqual(r.errors.sort(), ['email', 'message', 'name']);
});

test('partner inquiries require an organization', () => {
  const r = validate({ ...good, type: 'partner' });
  assert.equal(r.ok, false);
  assert.deepEqual(r.errors, ['organization']);
});

test('unknown form types fall back to contact; long input is truncated', () => {
  const r = validate({ ...good, type: 'admin', message: 'x'.repeat(9000) });
  assert.equal(r.data.type, 'contact');
  assert.equal(r.data.message.length, 5000);
});

test('buildEmail strips newlines from the subject and lists interests', () => {
  const { data } = validate({ ...good, type: 'volunteer', name: 'Eve\r\nBcc: x@y.z', interests: ['Events & fundraisers'] });
  const email = buildEmail(data);
  assert.ok(!/[\r\n]/.test(email.subject));
  assert.match(email.text, /Interested in: Events & fundraisers/);
  assert.doesNotMatch(email.text, /Phone:/);
});

const post = (fields, headers = { accept: 'application/json' }) => {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) [].concat(v).forEach((x) => fd.append(k, x));
  return new Request('https://example.org/api/contact', { method: 'POST', body: fd, headers });
};

test('honeypot submissions are silently accepted and not sent', async () => {
  const res = await onRequestPost({ request: post({ ...good, website: 'spam.com' }), env: {} });
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
});

test('invalid submissions return 422 with field names', async () => {
  const res = await onRequestPost({ request: post({ ...good, email: 'bad' }), env: {} });
  assert.equal(res.status, 422);
  assert.deepEqual((await res.json()).fields, ['email']);
});

test('returns 503 when email delivery is not configured', async () => {
  const res = await onRequestPost({ request: post(good), env: {} });
  assert.equal(res.status, 503);
});

test('sends through Resend with reply-to set to the visitor', async (t) => {
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url, init) => {
    calls.push({ url, body: JSON.parse(init.body) });
    return new Response('{}', { status: 200 });
  });
  const env = { RESEND_API_KEY: 'k', CONTACT_TO: 'a@x.org, b@x.org', CONTACT_FROM: 'Site <w@x.org>' };
  const res = await onRequestPost({ request: post(good), env });
  assert.equal(res.status, 200);
  assert.equal(calls[0].url, 'https://api.resend.com/emails');
  assert.deepEqual(calls[0].body.to, ['a@x.org', 'b@x.org']);
  assert.equal(calls[0].body.reply_to, 'sam@example.org');
});

test('Turnstile failure blocks the send', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify({ success: false })));
  const env = { TURNSTILE_SECRET_KEY: 's', RESEND_API_KEY: 'k', CONTACT_TO: 'a@x.org', CONTACT_FROM: 'w@x.org' };
  const res = await onRequestPost({ request: post({ ...good, 'cf-turnstile-response': 't' }), env });
  assert.equal(res.status, 403);
});

test('non-JS form posts get a 303 redirect to the thank-you page', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response('{}'));
  const env = { RESEND_API_KEY: 'k', CONTACT_TO: 'a@x.org', CONTACT_FROM: 'w@x.org' };
  const res = await onRequestPost({ request: post(good, {}), env });
  assert.equal(res.status, 303);
  assert.equal(res.headers.get('location'), '/thank-you/');
});

test('other methods get 405', () => {
  assert.equal(onRequest().status, 405);
});
