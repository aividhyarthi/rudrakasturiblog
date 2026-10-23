import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.enum(['politics', 'movies', 'ott', 'devotional', 'astrology', 'gita', 'spiritual', 'karma', 'gods', 'dharma', 'temple', 'sacred', 'faith', 'questions', 'prayer']),
    hero: z.string().optional(), // name of an illustration in public/heroes
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
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
    series: z.string().optional(), // id of a series in config SERIES
  }),
});

const temples = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    te: z.string().optional(),
    state: z.enum(['ap', 'ts', 'ka', 'tn', 'kl']),
    kind: z.enum(['god', 'goddess', 'both']).default('god'),
    hero: z.string().optional(),
    district: z.string(),
    place: z.string(),
    deity: z.string(),
    summary: z.string(),
    festivals: z.array(z.string()).default([]),
    sources: z.array(z.object({ title: z.string(), url: z.string().url(), publisher: z.string() })).default([]),
    updated: z.coerce.date().default(new Date('2026-10-20')),
  }),
});

export const collections = { articles, temples };
