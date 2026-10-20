import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { cardPng } from '../../lib/card';
import { allArticles, categoryLabel } from '../../lib/articles';
import { RASHIS } from '../../lib/astro';
import { CHAPTERS } from '../../data/gita';

type Item = { kicker: string; title: string };
async function items(): Promise<Record<string, Item>> {
  const out: Record<string, Item> = {
    home: { kicker: 'South India, with the receipts', title: 'Politics, panchangam, rasi phalalu, temples and the stories behind the headlines' },
    panchangam: { kicker: 'Religion', title: "Today's Panchangam: Rahu Kalam, tithi, nakshatra and good timings" },
    'rahu-kalam': { kicker: 'Panchangam', title: 'Rahu Kalam today: timings for Hyderabad, Vijayawada, Chennai and more' },
    'rasi-phalalu': { kicker: 'Rasi Phalalu', title: "Today's rasi phalalu for every rashi: daily, weekly, monthly" },
    temples: { kicker: 'Religion', title: 'Temples of India: Jyotirlingas, Shakti Peethas, Char Dham and more' },
    gita: { kicker: 'Bhagavad Gita', title: 'The Bhagavad Gita: all 18 chapters, explained simply' },
  };
  for (const a of await allArticles()) out[a.slug] = { kicker: categoryLabel(a.data.category), title: a.data.title };
  for (const t of await getCollection('temples')) out[`t-${t.slug}`] = { kicker: 'Temples', title: t.data.name };
  RASHIS.forEach((r) => (out[`r-${r.id}`] = { kicker: 'Rasi Phalalu', title: `${r.skt} Rasi (${r.en}) Phalalu: today, this week, this month` }));
  CHAPTERS.forEach((c) => (out[`g-${c.n}`] = { kicker: 'Bhagavad Gita', title: `Bhagavad Gita Chapter ${c.n}: ${c.en}` }));
  return out;
}
export async function getStaticPaths() {
  const all = await items();
  return Object.entries(all).map(([slug, item]) => ({ params: { slug }, props: { item } }));
}
export const GET: APIRoute = ({ props }) => new Response(cardPng(props.item.kicker, props.item.title), { headers: { 'Content-Type': 'image/png' } });
