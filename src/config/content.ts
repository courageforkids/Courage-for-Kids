import type { IconName } from '../components/icon-names';

/**
 * Structured page content that several pages share. Every statement here comes
 * from Courage for Kids' own materials (Canva "Our Mission" document, the
 * Courage Boxes carousel, and the Spring 2026 newsletter). Do not add numbers,
 * partners or stories that leadership has not confirmed.
 */

export const mission = {
  why: 'Courage for Kids exists to bring hope and support to children battling cancer and their families.',
  what: 'We provide meaningful, tangible support that brings comfort, encouragement, and moments of joy during an incredibly difficult time. We focus on making sure children and their families feel seen, supported, and never alone, with support that only youth can provide.',
  how: 'We turn the generosity and involvement of our community into direct support for families. As a youth-led organization, we bring together students and supporters who believe that young people can create meaningful change for children facing cancer.',
};

export type Program = {
  slug: string;
  title: string;
  icon: IconName;
  summary: string;
  body: string;
  href?: string;
};

export const programs: Program[] = [
  {
    slug: 'courage-boxes',
    title: 'Courage Boxes',
    icon: 'box',
    summary: 'Thoughtful comfort packages for children facing cancer, filled with activities, comforts, and encouragement.',
    body: 'Each Courage Box is put together by our team to offer reassurance during difficult days: a familiar comfort, something fun to do, and a reminder that a whole community is cheering them on.',
    href: '/courage-boxes/',
  },
  {
    slug: 'parent-boxes',
    title: 'Parent Boxes',
    icon: 'heart',
    summary: 'Care for the parents and caregivers who stand beside their child through every appointment.',
    body: 'Caregivers carry so much during treatment. Parent Boxes are our way of making sure the adults walking alongside a child feel cared for too.',
  },
  {
    slug: 'family-support',
    title: 'Family Support',
    icon: 'hands',
    summary: 'Encouragement and practical support so families feel seen and never alone.',
    body: 'Cancer changes more than a schedule. We look for tangible ways to ease the weight families carry, from encouragement to connecting them with community support.',
  },
  {
    slug: 'hospital-partnerships',
    title: 'Hospital Partnerships',
    icon: 'hospital',
    summary: 'Working with care teams to get comfort into the hands of the children who need it.',
    body: 'We coordinate with hospital and child-life teams so that what we deliver is appropriate, welcome, and reaches children where they are.',
  },
  {
    slug: 'community-events',
    title: 'Community Events & Fundraising',
    icon: 'star',
    summary: 'Fundraisers and events that turn community generosity into direct support.',
    body: 'From fun runs to community festivals, our events bring people together and raise the resources behind every Courage Box.',
  },
  {
    slug: 'awareness',
    title: 'Awareness & Advocacy',
    icon: 'megaphone',
    summary: 'Helping our community understand childhood cancer and how to show up for families.',
    body: 'Through social media campaigns and in-person outreach we share accurate, compassionate information about childhood cancer, and practical ways to help.',
  },
];

/** Educational context from the Courage Boxes carousel (source: Association of Child Life Professionals). */
export const whyComfort = [
  {
    title: 'Cancer changes more than a schedule.',
    body: 'Appointments and hospital stays can interrupt school, friendships, play, and everyday routines.',
  },
  {
    title: 'Play is part of coping.',
    body: 'Age-appropriate play and creative activities can help children manage stressful healthcare experiences.',
  },
  {
    title: 'Comfort looks different for everyone.',
    body: 'A familiar blanket, a fun activity, or a thoughtful gesture can offer moments of connection and reassurance.',
  },
];

export const comfortSource = {
  label: 'Association of Child Life Professionals',
  url: 'https://www.childlife.org/',
};

/** Leadership team. First names only: several team members are students. */
export const team = [
  { name: 'Jacob Rogers', role: 'Founder' },
  { name: 'Julia', role: 'Fundraising Director' },
  { name: 'Isaac', role: 'Volunteer Coordinator' },
  { name: 'Reese', role: 'Patient Interaction Coordinator' },
  { name: 'David', role: 'Director of Logistics & Outreach' },
  { name: 'Arleigh', role: 'Director of Media' },
  { name: 'Owen', role: 'Creative Engagement Coordinator' },
];

/**
 * Impact numbers. Empty on purpose: the old draft listed figures that have not
 * been confirmed. Add verified numbers (with the date they were counted) and the
 * stats band appears on the home page automatically.
 */
export const impactStats: { value: string; label: string }[] = [];

export const founderNote = {
  quote:
    'When I first founded Courage for Kids, I did so with a simple belief: no child facing cancer should ever feel alone.',
  name: 'Jacob Rogers',
  role: 'Founder',
};

export const waysToHelp = [
  {
    title: 'Give',
    icon: 'heart' as const,
    body: 'Fund Courage Boxes, Parent Boxes, and family support for children in treatment and the people caring for them.',
    cta: 'Donate',
    href: '/donate/',
  },
  {
    title: 'Volunteer',
    icon: 'hands' as const,
    body: 'Pack boxes, help at events, design, write, or spread the word. Students are especially welcome.',
    cta: 'Sign up',
    href: '/get-involved/#volunteer',
  },
  {
    title: 'Partner',
    icon: 'star' as const,
    body: 'Businesses, schools, and hospitals can sponsor, donate products, or host a fundraiser with us.',
    cta: 'Partner with us',
    href: '/get-involved/#partner',
  },
];
