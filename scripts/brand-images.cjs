// Regenerates public/og-image.png and public/apple-touch-icon.png from scripts/brand-images.html.
// Run: node scripts/brand-images.cjs   (uses the system Playwright/Chromium)
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  await page.goto('file://' + path.join(__dirname, 'brand-images.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.locator('#og').screenshot({ path: path.join(__dirname, '../public/og-image.png') });
  await page.locator('#icon').screenshot({ path: path.join(__dirname, '../public/apple-touch-icon.png') });
  await browser.close();
})();
