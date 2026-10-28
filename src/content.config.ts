import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * Stories: impact stories, updates and notes. Patient stories must only be
 * published with written family permission (see docs/CONTENT-GUIDE.md).
 */
const stories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stories' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Courage for Kids'),
    tag: z.enum(['From the founder', 'Courage Boxes', 'Community', 'Family story', 'News']).default('News'),
    /** Required true for any story about a child or family. */
    familyConsent: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

/** Events: add one Markdown file per event; past events drop off the list automatically. */
const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    location: z.string(),
    summary: z.string(),
    registerUrl: z.url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { stories, events };
