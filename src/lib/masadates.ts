// The key dates of a Hindu month, worked out from the sky: festivals, Ekadashis, Pournami, Amavasya and the month's weekday vratas.
import { allFestivals } from './festivals';
import { allTithis } from './tithi';
import { allLunations, EN_MONTH_NAMES } from './lunar';
import { ymdKey, addDays, WEEKDAYS } from './panchang';
import { MASA_PAGES, type MasaPage } from '../data/masa-pages';
import type { Masa } from './masa';

type Ymd = { y: number; m: number; d: number };
export type DateRow = { key: string; label: string; href: string; date: string };
export const pageForIdx = (idx: number): MasaPage | undefined => MASA_PAGES.find((p) => p.idx === idx);
const wdOf = (x: Ymd) => new Date(Date.UTC(x.y, x.m - 1, x.d)).getUTCDay();

export function masaDateRows(m: Masa, fromKey?: string): DateRow[] {
  const page = pageForIdx(m.idx);
  const from = fromKey && fromKey > ymdKey(m.start) ? fromKey : ymdKey(m.start), to = ymdKey(m.end);
  const row = (key: string, label: string, href: string): DateRow => { const [y, mo, d] = key.split('-').map(Number); return { key, label, href, date: `${WEEKDAYS[wdOf({ y, m: mo, d })].slice(0, 3)}, ${d} ${EN_MONTH_NAMES[mo - 1]}` }; };
  const inRange = (k: string) => k >= from && k <= to;
  const startKey = ymdKey(m.start);
  const rows: DateRow[] = [];
  const seen = new Set<string>();
  for (const f of allFestivals()) {
    if (!(f.month === m.idx || f.solar) || !inRange(f.key) || seen.has(f.id + f.key)) continue;
    seen.add(f.id + f.key);
    rows.push(row(f.key, f.key === startKey && page ? `${f.name} (${page.name} begins)` : f.name, `/festivals/${f.slug}/`));
  }
  if (page && startKey >= from && !rows.some((r) => r.key === startKey)) rows.push(row(startKey, `${page.name} begins`, `/masam/${page.slug}/`));
  for (const o of allTithis('ekadashi')) if (inRange(o.key)) rows.push(row(o.key, o.name, `/ekadashi/${o.slug}/`));
  for (const kind of ['pournami', 'amavasya'] as const) for (const l of allLunations(kind)) if (inRange(l.key) && !rows.some((r) => r.key === l.key && /Pournami|Purnima|Amavasya/.test(r.label))) rows.push(row(l.key, l.occasion ?? (kind === 'pournami' ? 'Pournami' : 'Amavasya'), `/${kind}/${l.slug}/`));
  for (const v of page?.weekdayVrats ?? []) for (let x: Ymd = m.start; ymdKey(x) <= to; x = addDays(x, 1)) if (ymdKey(x) >= from && wdOf(x) === v.day) rows.push(row(ymdKey(x), v.label, v.href));
  return rows.sort((a, b) => a.key.localeCompare(b.key) || a.label.localeCompare(b.label));
}
