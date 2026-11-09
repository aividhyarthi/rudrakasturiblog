// Permanent pages for recurring days. Each address (/amavasya/november/, /ekadashi/prabodhini-ekadashi/) always shows the next
// occurrence of that month or that name, so the address never changes and the dates roll forward by themselves.
import { allLunations, type Lunation } from './lunar';
import { allTithis, type Obs, type TithiKind } from './tithi';
import { todayIST, ymdKey, addDays } from './panchang';

export type Kind = 'amavasya' | 'pournami' | TithiKind;
export type Occ = Lunation | Obs;
export type PermaPage = { slug: string; group: Occ[]; primary: Occ };

export const occurrences = (kind: Kind): Occ[] => (kind === 'amavasya' || kind === 'pournami' ? allLunations(kind) : allTithis(kind));

/** One page per slug: the first group (a month's dates, or a single Ekadashi) that is on or after today, else the last one. */
// A page keeps showing a date for a few days after it passes (so a reader arriving the next day still finds it), then moves on.
const GRACE: Record<Kind, number> = { amavasya: 3, pournami: 3, sankashti: 2, pradosham: 1, ekadashi: 1 };
export function permaPages(kind: Kind): PermaPage[] {
  const today = todayIST(), todayKey = ymdKey(today);
  const tk = ymdKey(addDays(today, -GRACE[kind]));
  const groupOf = (o: Occ) => (kind === 'ekadashi' ? `${o.slug}|${o.key}` : `${o.slug}|${o.observed.y}`);
  const groups = new Map<string, Occ[]>();
  for (const o of occurrences(kind)) groups.set(groupOf(o), [...(groups.get(groupOf(o)) ?? []), o]);
  const chosen = new Map<string, Occ[]>();
  for (const g of groups.values()) {
    const slug = g[0].slug, cur = chosen.get(slug);
    const upcoming = g[g.length - 1].key >= tk, curUpcoming = cur ? cur[cur.length - 1].key >= tk : false;
    if (!cur || (!curUpcoming && upcoming) || (curUpcoming && upcoming && g[0].key < cur[0].key) || (!curUpcoming && !upcoming && g[0].key > cur[0].key)) chosen.set(slug, g);
  }
  return [...chosen.entries()].map(([slug, group]) => ({ slug, group, primary: group.find((o) => o.key >= todayKey) ?? group[group.length - 1] })).sort((a, b) => a.primary.key.localeCompare(b.primary.key));
}
/** Is this occurrence the one its permanent page shows? Only those are linked, so no link points at a different year's date. */
export const shownOnPage = (kind: Kind, o: Occ) => permaPages(kind).some((p) => p.group.some((g) => g.key === o.key));
export const pageFor = (kind: Kind, slug: string) => permaPages(kind).find((p) => p.slug === slug);
