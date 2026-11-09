// Somavati Amavasya: an Amavasya (new moon) that falls on a Monday. Worked out from the same sky as the panchangam.
// Primary rule: the tithi is running at Hyderabad sunrise on a Monday. Secondary rule: it is present in the Monday afternoon
// (aparahna), which many calendars also count. Both are flagged so the page can explain the day honestly.
import { CITIES, sunTimes, todayIST, addDays, ymdKey } from './panchang';
import { lunations, istYmd } from './lunar';

const IST = 5.5 * 3600 * 1000;
type Ymd = { y: number; m: number; d: number };
export type Somavati = { key: string; ymd: Ymd; start: Date; end: Date; month: number; adhika: boolean; basis: 'sunrise' | 'afternoon'; sunrise: Date };
const hyd = CITIES.hyderabad;
const wd = (x: Ymd) => new Date(Date.UTC(x.y, x.m - 1, x.d)).getUTCDay();

let cache: Somavati[] | null = null;
export function allSomavati(): Somavati[] {
  if (cache) return cache;
  const t = todayIST();
  const list = lunations('amavasya', addDays(t, -400), addDays(t, 800));
  const out: Somavati[] = [];
  for (const l of list) {
    for (let x = istYmd(new Date(l.start.getTime() - 24 * 3600000)); ymdKey(x) <= ymdKey(istYmd(l.end)); x = addDays(x, 1)) {
      if (wd(x) !== 1) continue;
      const st = sunTimes(new Date(Date.UTC(x.y, x.m - 1, x.d) - IST), hyd);
      const len = st.set.getTime() - st.rise.getTime();
      const atRise = l.start.getTime() <= st.rise.getTime() && st.rise.getTime() < l.end.getTime();
      const atNoon = l.start.getTime() <= st.rise.getTime() + 0.6 * len && st.rise.getTime() + 0.6 * len < l.end.getTime();
      if (atRise || atNoon) out.push({ key: ymdKey(x), ymd: x, start: l.start, end: l.end, month: l.month, adhika: l.adhika, basis: atRise ? 'sunrise' : 'afternoon', sunrise: st.rise });
    }
  }
  cache = out.sort((a, b) => a.key.localeCompare(b.key)).filter((v, i, a) => i === 0 || a[i - 1].key !== v.key);
  return cache;
}
/** The next Somavati Amavasya on or after the given day (default today, IST). */
export const nextSomavati = (from: Ymd = todayIST()) => allSomavati().find((s) => s.key >= ymdKey(from)) ?? null;
/** Is this Amavasya (by its tithi window) a Somavati one? Used to link from the ordinary Amavasya pages. */
export const somavatiForTithi = (start: Date, end: Date) => allSomavati().find((s) => s.start.getTime() === start.getTime() && s.end.getTime() === end.getTime()) ?? null;
