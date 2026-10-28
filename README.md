# Courage for Kids — website

The website for [Courage for Kids](https://teamcourageforkids.org), a youth-led 501(c)(3) supporting children battling pediatric cancer and their families. *Their fight. Our mission.*

Built to replace the Wix site with a fast, accessible, zero-subscription stack:

| Piece | Choice | Monthly cost |
| --- | --- | --- |
| Site | [Astro](https://astro.build) static site (HTML/CSS, almost no JavaScript) | $0 |
| Hosting | Cloudflare Pages (free plan: unlimited bandwidth, 500 builds/month) | $0 |
| Forms | Cloudflare Pages Function → [Resend](https://resend.com) (free: 3,000 emails/month) | $0 |
| Spam protection | Honeypot + optional Cloudflare Turnstile | $0 |
| Donations | Zeffy (0% platform fees) with PayPal as a second option | $0 |

## Quick start

Requires Node.js 22.23.4 or newer (see `.node-version`).

```bash
npm install
npm run dev        # http://localhost:4321
npm test           # type check + build + unit tests + end-to-end/accessibility tests
npm run build      # production build in dist/
```

`npm run test:e2e` needs Chromium via Playwright (pre-installed in CI images; locally run `npx playwright install chromium` once).

## Where things live

```
src/config/site.ts      Organization details, links, donation URLs  ← edit this first
src/config/content.ts   Mission, programs, team, impact numbers
src/content/stories/    Stories and updates (Markdown)
src/content/events/     Events (Markdown, one file per event)
src/components/         Reusable UI (Button, ProgramCard, InquiryForm, …)
src/pages/              One file per page
src/styles/global.css   Design tokens (colors, type scale, spacing)
functions/api/contact.js  Form handler (Cloudflare Pages Function)
public/                 Static files, security headers (_headers), old-URL redirects (_redirects)
tests/                  Unit tests (form handler) and end-to-end tests (every page)
docs/                   Audit, deployment, content and brand guides
legacy/                 The previous hand-written draft page, kept for reference
```

## Common edits

- **Add the Zeffy donation link:** set `donate.zeffyFormUrl` in `src/config/site.ts`. Every Donate button switches to it.
- **Add an event:** copy `src/content/events/_example-event.md`, fill it in, set `draft: false`.
- **Post a story:** add a Markdown file to `src/content/stories/`. Read [docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md) first; family stories need written permission.
- **Show impact numbers:** add verified figures to `impactStats` in `src/config/content.ts`.

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for going live and [docs/AUDIT.md](docs/AUDIT.md) for open decisions.
