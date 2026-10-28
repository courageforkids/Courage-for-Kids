// End-to-end checks against the built site in dist/.
// Run `npm run build` first. Uses the system Playwright install.
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = fileURLToPath(new URL('../../', import.meta.url));
const dist = join(root, 'dist');
const axeSource = await readFile(join(root, 'node_modules/axe-core/axe.min.js'), 'utf8');

const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };

async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  for (const candidate of [clean, join(clean, 'index.html'), `${clean}.html`]) {
    const file = join(dist, candidate);
    try {
      if ((await stat(file)).isFile()) return file;
    } catch {}
  }
  return null;
}

const server = createServer(async (req, res) => {
  const file = await resolveFile(req.url);
  if (!file) {
    res.writeHead(404, { 'content-type': 'text/html' });
    return res.end(await readFile(join(dist, '404.html')));
  }
  res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' });
  res.end(await readFile(file));
});
await new Promise((r) => server.listen(0, r));
const base = `http://localhost:${server.address().port}`;

const sitemap = await readFile(join(dist, 'sitemap-0.xml'), 'utf8');
const pages = [...sitemap.matchAll(/<loc>https:\/\/teamcourageforkids\.org([^<]*)<\/loc>/g)].map((m) => m[1]);

const failures = [];
const fail = (page, msg) => failures.push(`${page}: ${msg}`);
let checks = 0;

const browser = await chromium.launch();
const linkTargets = new Set();

for (const path of pages) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  const res = await page.goto(base + path, { waitUntil: 'networkidle' });

  checks++; if (res.status() !== 200) fail(path, `status ${res.status()}`);
  checks++; if ((await page.locator('h1').count()) !== 1) fail(path, 'expected exactly one <h1>');
  checks++; if (!(await page.title())) fail(path, 'missing <title>');
  checks++; if (!(await page.locator('meta[name="description"]').getAttribute('content'))) fail(path, 'missing meta description');
  checks++; if (errors.length) fail(path, `console errors: ${errors.join(' | ')}`);

  for (const href of await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')))) {
    if (href.startsWith('/') || href.startsWith('#')) linkTargets.add(href.startsWith('#') ? path + href : href);
  }

  // Accessibility (WCAG 2.1 A/AA)
  // Settle animations so contrast is measured on final colors, not mid-fade.
  await page.addStyleTag({ content: '*,*::before,*::after{transition:none!important;animation:none!important}' });
  await page.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible')));
  await page.addScriptTag({ content: axeSource });
  const axe = await page.evaluate(async () => {
    const r = await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] });
    return r.violations.map((v) => `${v.impact} ${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(', ')}`);
  });
  checks++; if (axe.length) fail(path, `axe: ${axe.join(' || ')}`);
  await page.close();

  // Mobile: no horizontal scroll
  const mobile = await browser.newPage({ viewport: { width: 375, height: 800 } });
  await mobile.goto(base + path, { waitUntil: 'networkidle' });
  const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  checks++; if (overflow > 0) fail(path, `horizontal overflow of ${overflow}px at 375px`);
  await mobile.close();
}

// Every internal link and in-page anchor resolves
const page = await browser.newPage();
for (const target of linkTargets) {
  const [pathPart, hash] = target.split('#');
  checks++;
  if (!(await resolveFile(pathPart || '/'))) { fail('links', `broken link ${target}`); continue; }
  if (hash) {
    await page.goto(base + (pathPart || '/'));
    if ((await page.locator(`[id="${hash}"]`).count()) === 0) fail('links', `missing anchor ${target}`);
  }
}

// Mobile menu opens, exposes links, and closes with Escape
{
  const m = await browser.newPage({ viewport: { width: 375, height: 800 } });
  await m.goto(base + '/');
  const toggle = m.locator('[data-menu-toggle]');
  checks++; if (await m.locator('#site-nav a[href="/about/"]').isVisible()) fail('menu', 'nav should be collapsed on mobile');
  await toggle.click();
  checks++; if (!(await m.locator('#site-nav a[href="/about/"]').isVisible())) fail('menu', 'nav did not open');
  checks++; if ((await toggle.getAttribute('aria-expanded')) !== 'true') fail('menu', 'aria-expanded not updated');
  await m.keyboard.press('Escape');
  checks++; if ((await toggle.getAttribute('aria-expanded')) !== 'false') fail('menu', 'Escape did not close menu');
  await m.close();
}

// Forms: client validation, success and failure states (API mocked)
{
  const f = await browser.newPage();
  await f.goto(base + '/contact/');
  await f.click('#contact-form button[type="submit"]');
  checks++; if (!(await f.locator('#contact-form [data-status].is-error').isVisible())) fail('form', 'empty submit should show an error');

  await f.route('**/api/contact', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }));
  await f.fill('#contact-form-name', 'Test Person');
  await f.fill('#contact-form-email', 'test@example.org');
  await f.fill('#contact-form-message', 'Hello from the test suite');
  await f.click('#contact-form button[type="submit"]');
  await f.waitForSelector('#contact-form [data-status].is-success');
  checks++;

  await f.unroute('**/api/contact');
  await f.route('**/api/contact', (route) => route.fulfill({ status: 503, contentType: 'application/json', body: '{"ok":false,"error":"not_configured"}' }));
  await f.fill('#contact-form-name', 'Test Person');
  await f.fill('#contact-form-email', 'test@example.org');
  await f.fill('#contact-form-message', 'Hello again');
  await f.click('#contact-form button[type="submit"]');
  await f.waitForSelector('#contact-form [data-status].is-error a[href^="mailto:"]');
  checks++;
  await f.close();
}

// Unknown URLs serve the 404 page
{
  const p = await browser.newPage();
  const r = await p.goto(base + '/this-does-not-exist/');
  checks++; if (r.status() !== 404 || !(await p.locator('h1').textContent()).includes('flew')) fail('404', 'custom 404 not served');
  await p.close();
}

await browser.close();
server.close();

console.log(`Pages: ${pages.length}  Links: ${linkTargets.size}  Checks: ${checks}`);
if (failures.length) {
  console.error(`\n${failures.length} failure(s):\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log('All end-to-end checks passed.');
