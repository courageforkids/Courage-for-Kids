# Technical and operational audit — October 28, 2026

## 1. Tools and access available

| System | Access | Notes |
| --- | --- | --- |
| GitHub `courageforkids/courage-for-kids` | Read/write | Had a single hand-written `index.html` draft (now in `legacy/`). |
| Gmail | Read, label, draft (no sending without approval) | Connected account is **courageforkids.org@gmail.com**, not `jacob@teamcourageforkids.org`. The domain mailbox is a separate account I can't see. |
| Canva | Read, create, edit, export | One Brand Kit, ~75 designs (Instagram carousels, flyers, holiday series, Well-O-Ween 2026). |
| Live site teamcourageforkids.org | **Blocked** | This cloud session's network policy doesn't allow the domain (or the Wayback Machine). Add `teamcourageforkids.org` under Allowed domains in the environment's network settings to let me crawl the Wix site. |
| Cloudflare, Wix, Zeffy, PayPal, Mailchimp | None | Dashboard access needed for deployment; nothing was changed. |

## 2. Existing website (Wix)

Could not be crawled directly (see above). What the inbox shows:

- Domain registered **through Wix** on Jul 29, 2026; auto-renews at **$32.80** on Jul 29, 2027.
- Wix plan ~$25/month (per leadership).
- Because the Wix pages couldn't be read, `public/_redirects` maps common Wix-style slugs. **Before launch, list the real Wix page URLs** (Wix → Pages) and add any that are missing.

The new site covers every feature the brief listed: navigation, donations, contact/volunteer/partner forms, programs, Courage Boxes, impact stories, events, privacy policy, SEO, and accessibility.

## 3. Donations and payments (from email)

- **Zeffy**: account active; a "Courage for Kids 5K" ticketed event exists. Zeffy charges no platform or card fees, so it's the primary Donate button. Its public form link wasn't in email: add it to `src/config/site.ts`.
- **PayPal**: confirmed charity (Sep 2, 2026), reduced 1.99% + $0.49 rate, eligible for PayPal Giving Fund.
- **Mailchimp**: "The Courage Connection" newsletter (Issue 1, Spring 2026).
- **GroupRaise**: past restaurant fundraisers.

## 4. Brand (from Canva)

- Cream paper backgrounds, CFK navy, gold-ribbon yellow, italic editorial serif headlines, clean sans body, hand-drawn line icons.
- Existing logo: heart with a figure and a flowing cape. Existing mascot: a young superhero kid with a yellow cape.
- The website uses Fraunces (display) and Plus Jakarta Sans (text), self-hosted. See [BRAND.md](BRAND.md).

## 5. Facts that need confirmation before publishing

Hidden on the site until confirmed; set them in `src/config/site.ts` / `content.ts`.

| Item | Why it's blank |
| --- | --- |
| Founding year | Canva "Our Mission" says **2022**; the old draft said **2024**. |
| Impact numbers | The old draft listed 48 families, 48 boxes, $2,300+ raised in 2025. Unverified, so not shown. |
| Team | The old draft listed different names (Daniel, Davis, Colin, Cooper). The site uses the current leadership list, first names only. |
| Zeffy / PayPal donation links, Mailchimp signup URL | Not found in email. (EIN 39-3833022 and the Facebook page were found and added.) |
| Hospital and corporate partners | Correspondence exists, but no partner is named on the site without written approval. |
| Product-donation policy ("new, unused items only") and the parent/guardian note on the volunteer form | Sensible defaults I added; confirm they match how you operate. |

## 6. Other findings

- **Unlisted subscription:** Onepage GmbH, **$19.90/month** ("Projects: Essential", since Jul 29, 2026). This hosts a second website, `courage-for-kids.onepage.me`. The new site replaces it too.
- **Claude for Nonprofits application declined** by Goodstack on Oct 27, 2026. Google Workspace for Nonprofits and other discounts use the same Goodstack verification, so fixing this unblocks several savings (see [EXPENSES.md](EXPENSES.md)).
- Security: the Gmail account received a Google "Security alert" and a GitHub device-verification email on Oct 28. Worth a glance to confirm both were you.
