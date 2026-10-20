import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.enum(['politics', 'movies', 'ott', 'trending', 'news', 'sports']),
    region: z.enum(['tn', 'kl', 'ka', 'ap', 'ts', 'south']).default('south'),
    format: z.string().optional(), // e.g. "Receipts", "60-Second Explainer"
    tldr: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    author: z.string().default('Southwala Desk'),
    tags: z.array(z.string()).default([]),
    sources: z
      .array(z.object({ title: z.string(), url: z.string().url(), publisher: z.string() }))
      .default([]),
    draft: z.boolean().default(false),
    reviewNote: z.string().optional(), // why a human should look before publishing
  }),
});

export const collections = { articles };
