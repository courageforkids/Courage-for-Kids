# Deployment and cutover plan

Nothing in this plan has been done yet. Every step that touches a live account (Cloudflare, Wix, DNS, email) needs Jacob's approval first.

## Current state (October 2026)

- **Domain:** `teamcourageforkids.org` is registered **through Wix** (purchased Jul 29, 2026; auto-renews at $32.80 on Jul 29, 2027).
- **Website:** hosted on Wix (~$25/month plan).
- **Email:** `jacob@teamcourageforkids.org` (~$17/month provider, to be confirmed: likely Google Workspace or Microsoft 365 sold through Wix). **Its MX/TXT DNS records must be preserved exactly** during any change.
- `courageforkids.org@gmail.com` is a separate free Gmail account that forwards to the domain address.

## Phase 1 — Preview (no risk to the live site)

1. Create a free Cloudflare account (use the organization's email).
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → choose `courageforkids/courage-for-kids`.
3. Build settings: framework **Astro**, build command `npm run build`, output directory `dist`. Node version comes from `.node-version` (24).
4. Deploy. You get a free preview URL such as `courage-for-kids.pages.dev`; every pull request also gets its own preview link.
5. Forms (Settings → Variables and Secrets):
   - Create a free [Resend](https://resend.com) account, add the domain `teamcourageforkids.org`, and add the DNS records Resend shows (SPF/DKIM for a sending subdomain; they don't affect receiving mail).
   - Add `RESEND_API_KEY` (secret), `CONTACT_TO=jacob@teamcourageforkids.org`, `CONTACT_FROM=Courage for Kids Website <website@teamcourageforkids.org>`.
   - Optional spam shield: create a Turnstile widget, add `TURNSTILE_SECRET_KEY` as a secret and put the public site key in `src/config/site.ts → turnstileSiteKey`.
6. Fill in `src/config/site.ts` (Zeffy link, PayPal link, EIN, Facebook) and review every page on the preview URL with the team.

## Phase 2 — Point the domain at Cloudflare Pages (cutover)

Do this on a quiet day, with Wix still paid for the current billing period, so rollback is instant.

1. **Record the current DNS.** In Wix → Domains → `teamcourageforkids.org` → Manage DNS records, screenshot or export *every* record (A, CNAME, MX, TXT/SPF, DKIM, DMARC, verification records). This is the rollback snapshot.
2. **Move DNS hosting to Cloudflare (free).** Add the site in Cloudflare → it scans existing records. Compare against the snapshot line by line; add anything missing, especially **MX and email TXT records**.
3. In Wix, change the domain's nameservers to the two Cloudflare nameservers. Propagation takes minutes to a few hours.
4. **Verify email first:** send a test message to and from `jacob@teamcourageforkids.org`. If anything fails, revert the nameservers to Wix's (rollback, below).
5. In Cloudflare Pages → Custom domains, add `teamcourageforkids.org` and `www.teamcourageforkids.org`. Cloudflare creates the records and the HTTPS certificate.
6. Check: the site loads over HTTPS on both hostnames; forms deliver; `/donate` works; old Wix URLs redirect (see `public/_redirects`, and add any real Wix slugs that are missing).
7. After **two weeks** of normal operation, downgrade or cancel the Wix site plan (approval required). Keep the Wix account itself until the domain transfer below is done.

### Rollback

- **Site problem:** in Cloudflare DNS, point the root and `www` records back to the Wix values from the snapshot (or switch nameservers back to Wix). Wix is still live until it's cancelled.
- **Email problem:** restore the MX/TXT records from the snapshot, or switch nameservers back to Wix. Nothing about the mailbox itself changes in this plan.

## Phase 3 — Transfer the domain registration (optional, saves ~$22/year)

Cloudflare Registrar sells `.org` at cost (about $10–11/year) versus $32.80 at Wix. A transfer adds one year to the registration, so nothing is lost.

1. In Wix: Domains → `teamcourageforkids.org` → Advanced → Transfer away → unlock and get the authorization (EPP) code. (Transfers are allowed 60 days after purchase; that passed on Sep 27, 2026.)
2. In Cloudflare: Domain Registration → Transfer Domains → enter the code and pay for one year.
3. Approve the confirmation email. DNS keeps working throughout because it's already on Cloudflare.

## Cost after cutover

| Item | Before | After |
| --- | --- | --- |
| Website (Wix) | ~$25/mo | $0 |
| Domain | $32.80/yr (Wix) | ~$10.50/yr (Cloudflare) |
| Forms, hosting, SSL, CDN | included in Wix | $0 |
