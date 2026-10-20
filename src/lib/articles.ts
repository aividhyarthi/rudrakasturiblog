import { getCollection, type CollectionEntry } from 'astro:content';
import { CATEGORIES } from '../config';

export type Article = CollectionEntry<'articles'>;

// Drafts are hidden from the live site. `npm run preview-drafts` shows them to you.
export async function allArticles(): Promise<Article[]> {
  const showDrafts = process.env.SHOW_DRAFTS === '1';
  const all = await getCollection('articles', ({ data }) => showDrafts || !data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const categoryLabel = (id: string) => CATEGORIES.find((c) => c.id === id)?.label ?? id;

export function fmtDate(d: Date) {
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });
}

import bylines from '../../newsroom/bylines.json';
import { REGIONS } from '../config';
export const authorSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const TEAM = Object.entries(bylines as Record<string, { name: string; category: string; voice: string }[]>).flatMap(([state, people]) =>
  people.map((p) => ({ ...p, state, slug: authorSlug(p.name), desk: `${REGIONS[state as keyof typeof REGIONS]} ${categoryLabel(p.category)} desk` }))
);
export const findAuthor = (name: string) => TEAM.find((p) => p.name === name);
