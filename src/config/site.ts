/**
 * Single source of truth for organization details, links and integrations.
 *
 * Anything marked `CONFIRM` is a value we could not verify during the build.
 * Components hide a field when its value is empty, so the site never shows a
 * placeholder or an unverified claim. Fill a value in here and it appears
 * everywhere it is used.
 */

export const site = {
  name: 'Courage for Kids',
  shortName: 'CFK',
  tagline: 'Their fight. Our mission.',
  description:
    'Courage for Kids is a youth-led nonprofit bringing comfort, encouragement, and moments of joy to children battling cancer and the families walking alongside them.',
  url: 'https://teamcourageforkids.org',
  location: 'Spartanburg, South Carolina',
  email: 'jacob@teamcourageforkids.org',
  founder: 'Jacob Rogers',

  /** CONFIRM: Canva "Our Mission" says 2022; the old draft site said 2024. Left blank until confirmed. */
  foundedYear: '',
  /** CONFIRM: add the EIN to show it on the Donate page and footer. */
  ein: '',
  /** 501(c)(3) status as stated by leadership. */
  is501c3: true,

  social: {
    instagram: 'https://www.instagram.com/teamcourageforkids/',
    instagramHandle: '@teamcourageforkids',
    /** CONFIRM: Facebook page URL. Hidden while empty. */
    facebook: '',
  },

  donate: {
    /**
     * CONFIRM: the public link of the Zeffy donation form (Zeffy dashboard →
     * Campaigns → your donation form → Share). Zeffy charges no platform or
     * card fees, so it is the primary donate button.
     */
    zeffyFormUrl: '',
    /** Optional: Zeffy's embed link for the same form, rendered inline on /donate. */
    zeffyEmbedUrl: '',
    /** CONFIRM: PayPal donate link (PayPal → Pay & Get Paid → Donate button → link). */
    paypalUrl: '',
    /** Optional: Amazon wish list for Courage Box supplies. */
    wishlistUrl: '',
  },

  /** CONFIRM: Mailchimp hosted signup form URL (Audience → Signup forms → Hosted). */
  newsletterUrl: '',

  /** Cloudflare Turnstile site key (public). Leave blank to disable the widget. */
  turnstileSiteKey: '',
};

export const nav = [
  { label: 'About', href: '/about/' },
  { label: 'Programs', href: '/programs/' },
  { label: 'Courage Boxes', href: '/courage-boxes/' },
  { label: 'Get Involved', href: '/get-involved/' },
  { label: 'Stories', href: '/stories/' },
  { label: 'Contact', href: '/contact/' },
] as const;

/** Where every "Donate" button points: Zeffy when set, otherwise the on-site donate page. */
export const donateHref = site.donate.zeffyFormUrl || '/donate/';
