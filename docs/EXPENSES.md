# Software expense plan

Prices researched October 2026. Third-party figures are marked; confirm on the vendor's page before acting. **Nothing has been cancelled, changed, or purchased.**

## Today

| Service | Cost | Notes |
| --- | --- | --- |
| Wix website | $25/mo | |
| Professional email (`jacob@teamcourageforkids.org`) | $17/mo | Provider to confirm (likely Google Workspace or Microsoft 365 via Wix). |
| ChatGPT Plus | $20/mo | |
| Claude Pro | $20/mo | |
| **Onepage GmbH "Projects: Essential"** | **$19.90/mo** | Not on the list you gave me; hosts the second site `courage-for-kids.onepage.me`. |
| Domain via Wix | $32.80/yr | |
| **Total** | **≈ $102/mo + $33/yr ≈ $1,256/yr** | |

## Recommended

| Change | New cost | Saves / yr | Risk | Rollback |
| --- | --- | --- | --- | --- |
| Website → Cloudflare Pages (this repo) | $0 | $300 | Low | Keep Wix paid until two weeks after launch; DNS revert is instant. See [DEPLOYMENT.md](DEPLOYMENT.md). |
| Email → **Google Workspace for Nonprofits** | $0 (up to 2,000 users) | $204 | Medium | Run old and new mailboxes in parallel; MX records changed only after migration is verified. |
| Drop **one** AI subscription (keep Claude) | $20 | $240 | Low | Re-subscribe any time. |
| Onepage: cancel after launch | $0 | $239 | Low | Re-subscribe. The new website replaces the Onepage site. |
| Domain → Cloudflare Registrar | ≈ $10–11/yr *(third-party price)* | ≈ $22 | Low | Transfer adds a year; no downtime when DNS is already on Cloudflare. |
| **Canva for Nonprofits** | $0 for up to 50 members | Protects against paying for Pro/Teams | None | Apply once verified. |
| **New total** | **≈ $20/mo + $11/yr ≈ $251/yr** | **≈ $1,000/yr** | | |

## Step 1, which unblocks most of the savings: fix nonprofit verification

Goodstack declined Courage for Kids for Claude for Nonprofits on Oct 27. Google for Nonprofits uses Goodstack too, so the same issue will block Workspace. Common causes for a new 501(c)(3):

- The IRS determination letter is recent, and the public IRS lists (Pub 78 / EO BMF) haven't caught up. Fix: upload the determination letter on Goodstack's appeal form.
- Name or EIN mismatch between the application and the IRS record (e.g. "Courage for Kids" vs. "Team Courage for Kids Inc").
- Registering with a Gmail address instead of an address on the organization's domain.

**Needed from you:** the IRS determination letter (the EIN, 39-3833022, is already on file), so I can prepare the appeal and the Google for Nonprofits application text.

## AI tools

- Claude's nonprofit pricing (≈ $8/user/mo, *third-party figure*) applies to **Team/Enterprise only**, not individual Pro. Team has a seat minimum; for one person, Pro at $20 is simplest.
- OpenAI offers nonprofit pricing on ChatGPT **Business** (≈ $8–10/user/mo, *third-party figure*), again not individual Plus.
- Recommendation: keep one tool (Claude, which is already connected to email, Canva, and this repository) and cancel ChatGPT Plus after you confirm nothing depends on it. If the leadership team wants shared AI access later, Claude Team at nonprofit pricing for 2–3 seats costs less than two individual plans.

## Email migration outline (Google Workspace for Nonprofits)

1. Get verified (Step 1), then apply at google.com/nonprofits and activate Workspace for Nonprofits on `teamcourageforkids.org`.
2. If the current mailbox is Google Workspace **billed through Wix**, move billing to Google directly (Wix → Google Workspace → transfer), then switch the edition to Nonprofits. No mailbox migration is needed.
3. If it's another provider: create the new mailboxes, use Google's Data Migration tool to copy mail, then change MX records during a quiet hour. Keep the old provider active for 30 days as the rollback path.
4. Give each director an address (`julia@`, `isaac@`, …) at no cost, which makes sponsorship outreach more credible than personal accounts. Get parent consent for minors.

## Other free resources worth applying for

- **Google Ad Grants:** up to $10,000/month in Google Search ads for eligible nonprofits (needs the Google for Nonprofits account and the new website live).
- **Canva for Nonprofits:** free Pro features for one team.
- **Zeffy:** already in use; free donation forms, events, raffles and donor CRM.
- **Mailchimp:** free plan up to 500 contacts; nonprofit discount on paid plans.

Sources: [Google for Nonprofits](https://www.google.com/nonprofits/about/program-overview), [Workspace for Nonprofits pricing](https://support.google.com/nonprofits/answer/10477677), [Claude for Nonprofits](https://support.claude.com/en/articles/12893767-getting-started-with-claude-for-nonprofits), [OpenAI for Nonprofits](https://openai.com/index/introducing-openai-for-nonprofits), [Canva for Nonprofits](https://www.canva.com/help/canva-for-nonprofits/), [Cloudflare .org pricing (third-party)](https://domainoffer.net/tld/org/cloudflare), [Resend free tier (third-party)](https://automationatlas.io/answers/resend-free-tier-explained-2026/).
