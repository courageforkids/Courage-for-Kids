// Renders every <section class="art"> in templates.html to brand/social/out/<id>.png.
// Run from the repo root after `npm run build` (the hero art is copied from dist):
//   node brand/social/render.cjs
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../..');
let html = fs.readFileSync(path.join(__dirname, 'templates.html'), 'utf8');
const built = fs.readFileSync(path.join(root, 'dist/index.html'), 'utf8');
const hero = built.match(/<svg class="hero-art[^>]*>[\s\S]*?<\/svg>/)[0]
  .replace(/var\(--font-body\)/g, 'J').replace(/var\(--font-display\)/g, 'F');
const markInner = fs.readFileSync(path.join(root, 'public/favicon.svg'), 'utf8').match(/<svg[^>]*>([\s\S]*)<\/svg>/)[1];
html = html.replace(/HEROART/g, hero).replace(/MARK/g,
  `<span style="display:grid;place-items:center;width:66px;height:66px;border-radius:50%;background:#FBF6EC"><svg width="48" height="48" viewBox="0 0 64 64">${markInner}</svg></span>`);
const tmp = path.join(__dirname, '.rendered.html');
fs.writeFileSync(tmp, html);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 2000 } });
  await page.goto('file://' + tmp);
  await page.evaluate(() => document.fonts.ready);
  for (const id of await page.$$eval('section.art', (s) => s.map((x) => x.id))) {
    await page.locator('#' + id).screenshot({ path: path.join(__dirname, 'out', id + '.png') });
    console.log('rendered', id);
  }
  await browser.close();
  fs.unlinkSync(tmp);
})();
