import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { cardPng } from '../../lib/card';
import { allArticles, categoryLabel } from '../../lib/articles';
import { RASHIS } from '../../lib/astro';
import { CHAPTERS } from '../../data/gita';
import { allTithis, ROUTE, type TithiKind } from '../../lib/tithi';
import { allLunations, EN_MONTH_NAMES } from '../../lib/lunar';
import { WEEKDAYS } from '../../lib/panchang';
import { allFestivals } from '../../lib/festivals';

type Item = { kicker: string; title: string };
async function items(): Promise<Record<string, Item>> {
  const out: Record<string, Item> = {
    home: { kicker: 'Be South. Sanatan. Sacred.', title: 'Panchangam, rasi phalalu, temples, the Gita and the stories behind our faith' },
    panchangam: { kicker: 'Religion', title: "Today's Panchangam: Rahu Kalam, tithi, nakshatra and good timings" },
    'rahu-kalam': { kicker: 'Panchangam', title: 'Rahu Kalam today: timings for Hyderabad, Vijayawada, Chennai and more' },
    'rasi-phalalu': { kicker: 'Rasi Phalalu', title: "Today's rasi phalalu for every rashi: daily, weekly, monthly" },
    temples: { kicker: 'Religion', title: 'Temples of India: Jyotirlingas, Shakti Peethas, Char Dham and more' },
    festivals: { kicker: 'Devotional', title: 'Hindu festivals: dates of Deepavali, Karthika Pournami, Sankranti, Shivaratri and more' },
    gita: { kicker: 'Bhagavad Gita', title: 'The Bhagavad Gita: all 18 chapters, explained simply' },
  };
  for (const a of await allArticles({ includeHidden: true })) out[a.slug] = { kicker: categoryLabel(a.data.category), title: a.data.title };
  const pretty = (o: { observed: { y: number; m: number; d: number }; weekday: number }) => `${WEEKDAYS[o.weekday]}, ${o.observed.d} ${EN_MONTH_NAMES[o.observed.m - 1]} ${o.observed.y}`;
  for (const k of ['ekadashi', 'sankashti', 'pradosham'] as TithiKind[]) for (const o of allTithis(k)) out[`tl-${k}-${o.slug}`] = { kicker: o.occasion ?? k, title: `${o.name}: ${pretty(o)}. Date and timings` };
  for (const k of ['amavasya', 'pournami'] as const) for (const o of allLunations(k)) out[`tl-${k}-${o.slug}`] = { kicker: o.occasion ?? k, title: `${o.occasion ?? (k === 'amavasya' ? 'Amavasya' : 'Pournami')}: ${pretty(o)}. Date and timings` };
  for (const f of allFestivals()) out[`fest-${f.slug}`] = { kicker: 'Festival', title: `${f.name} ${f.ymd.y}: ${WEEKDAYS[f.weekday]}, ${f.ymd.d} ${EN_MONTH_NAMES[f.ymd.m - 1]}` };
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
