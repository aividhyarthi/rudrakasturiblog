import { getCollection, type CollectionEntry } from 'astro:content';
import { CATEGORIES, NEWS_ENABLED, NEWS_CATS } from '../config';

export type Article = CollectionEntry<'articles'>;

// Drafts are hidden from the live site. `npm run preview-drafts` shows them to you.
// News categories stay out of lists while NEWS_ENABLED is false. Pass { includeHidden: true } to build their pages anyway.
export async function allArticles(opts: { includeHidden?: boolean } = {}): Promise<Article[]> {
  const showDrafts = process.env.SHOW_DRAFTS === '1';
  const all = await getCollection('articles', ({ data }) => (showDrafts || !data.draft) && data.date.getTime() <= (process.env.SW_NOW ? new Date(process.env.SW_NOW).getTime() : Date.now()) && (opts.includeHidden || NEWS_ENABLED || !NEWS_CATS.includes(data.category)));
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

/** How many published stories each section and state has. Empty sections are hidden from the site. */
let _counts: Promise<{ cat: Record<string, number>; region: Record<string, number> }> | null = null;
export function sectionCounts() {
  _counts ??= allArticles().then((all) => {
    const cat: Record<string, number> = {}, region: Record<string, number> = {};
    for (const a of all) { cat[a.data.category] = (cat[a.data.category] ?? 0) + 1; region[a.data.region] = (region[a.data.region] ?? 0) + 1; }
    return { cat, region };
  });
  return _counts;
}

import { contributorFor } from '../data/authors';
/** Name shown in bylines: the contributor for the category, else the desk named in the article. */
export const byline = (d: { category: string; author: string }) => contributorFor(d.category)?.name ?? d.author;
