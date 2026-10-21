// Amavasya (new moon tithi) and Pournami (full moon tithi): exact begin/end times and the day each is observed.
// Month names follow the amanta (Telugu, Kannada, Tamil, Malayalam) calendar: the month is named from the Sun's
// sidereal sign at the new moon that opens it. A month with no sankranti is adhika.
import * as A from 'astronomy-engine';
import { CITIES, sunTimes, sunTrop, moonTrop, sunSid, todayIST, addDays, ymdKey, WEEKDAYS } from './panchang';

const IST = 5.5 * 3600 * 1000;
const DAY = 86400000;
const norm = (x: number) => ((x % 360) + 360) % 360;
export const elong = (d: Date) => norm(moonTrop(d) - sunTrop(d));
export const MONTHS = ['Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha', 'Shravana', 'Bhadrapada', 'Ashwayuja', 'Kartika', 'Margashira', 'Pushya', 'Magha', 'Phalguna'];
export const MONTHS_TE = ['చైత్రం', 'వైశాఖం', 'జ్యేష్ఠం', 'ఆషాఢం', 'శ్రావణం', 'భాద్రపదం', 'ఆశ్వయుజం', 'కార్తీకం', 'మార్గశిరం', 'పుష్యం', 'మాఘం', 'ఫాల్గుణం'];
const EN_MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
export const EN_MONTH_NAMES = EN_MONTHS.map((m) => m[0].toUpperCase() + m.slice(1));

/** Exact instant when elongation equals target (degrees), refined around a seed. */
function refine(seed: Date, target: number) {
  const f = (t: number) => ((elong(new Date(t)) - target + 540) % 360) - 180;
  let lo = seed.getTime() - 6 * 3600000, hi = seed.getTime() + 6 * 3600000;
  for (let i = 0; i < 40; i++) { const mid = (lo + hi) / 2; if (f(mid) < 0) lo = mid; else hi = mid; }
  return new Date((lo + hi) / 2);
}
export function phases(target: 0 | 180, from: Date, to: Date) {
  const out: Date[] = [];
  let t = from;
  while (t < to) {
    const r = A.SearchMoonPhase(target, t, 40);
    if (!r) break;
    out.push(refine(r.date, target));
    t = new Date(r.date.getTime() + 2 * DAY);
  }
  return out;
}
function bisectCross(end: Date, thr: number) {
  let lo = end.getTime() - 40 * 3600000, hi = end.getTime() - 1000;
  for (let i = 0; i < 40; i++) { const mid = (lo + hi) / 2; if (elong(new Date(mid)) >= thr && elong(new Date(mid)) < 359.9999) hi = mid; else lo = mid; }
  return new Date(hi);
}
export const istYmd = (d: Date) => { const t = new Date(d.getTime() + IST); return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() }; };

export type Lunation = {
  kind: 'amavasya' | 'pournami'; start: Date; end: Date; observed: { y: number; m: number; d: number }; weekday: number;
  month: number; adhika: boolean; slug: string; key: string; occasion?: string;
};

const POURNAMI_OCC = ['Chaitra Pournami', 'Buddha Purnima (Vaishakha Pournami)', 'Jyeshtha Pournami', 'Guru Purnima (Ashadha Pournami)', 'Shravana Pournami (Raksha Bandhan, Jandhyala Pournami)', 'Bhadrapada Pournami', 'Sharad Purnima (Ashwayuja Pournami)', 'Kartika Pournami (Kartika Deepam, Dev Deepawali)', 'Margashira Pournami (Dattatreya Jayanti)', 'Pushya Pournami', 'Magha Pournami', 'Phalguna Pournami (Holi, Kama Dahanam)'];
const AMAVASYA_OCC: Record<number, string> = { 0: 'Chaitra Amavasya, the day before Ugadi', 5: 'Mahalaya Amavasya (Sarva Pitru Amavasya)', 6: 'Deepavali Amavasya', 10: 'Magha Amavasya, just after Maha Shivaratri' };

/** All Amavasyas or Pournamis whose observed day lies between `from` and `to` (IST dates). */
export function lunations(kind: 'amavasya' | 'pournami', from: { y: number; m: number; d: number }, to: { y: number; m: number; d: number }): Lunation[] {
  const f = new Date(Date.UTC(from.y, from.m - 1, from.d) - 75 * DAY), t = new Date(Date.UTC(to.y, to.m - 1, to.d) + 75 * DAY);
  const nm = phases(0, f, t);
  const sign = nm.map((d) => Math.floor(sunSid(d) / 30));
  const monthOf = (k: number) => ({ idx: (sign[k] + 1) % 12, adhika: sign[k] === sign[k + 1] });
  const hyd = CITIES.hyderabad;
  const out: Lunation[] = [];
  const consider = (start: Date, end: Date, month: number, adhika: boolean) => {
    const sd = istYmd(start), ed = istYmd(end);
    let observed = ed;
    for (let x = sd; ; x = addDays(x, 1)) {
      const st = sunTimes(new Date(Date.UTC(x.y, x.m - 1, x.d) - IST), hyd);
      const len = st.set.getTime() - st.rise.getTime();
      const probe = kind === 'pournami' ? st.rise.getTime() : st.rise.getTime() + 0.6 * len; // sunrise (udaya) tithi for Pournami, aparahna for Amavasya
      if (start.getTime() <= probe && end.getTime() > probe) { observed = x; break; }
      if (ymdKey(x) === ymdKey(ed)) break;
    }
    const wd = new Date(Date.UTC(observed.y, observed.m - 1, observed.d)).getUTCDay();
    let occasion = kind === 'pournami' ? POURNAMI_OCC[month] : AMAVASYA_OCC[month];
    if (kind === 'amavasya' && !occasion) occasion = `${MONTHS[month]} Amavasya`;
    if (kind === 'amavasya' && wd === 1) occasion = `Somavati Amavasya (Monday), ${occasion}`;
    if (kind === 'amavasya' && wd === 6) occasion = `Shani Amavasya (Saturday), ${occasion}`;
    if (adhika) occasion = `Adhika ${MONTHS[month]} ${kind === 'pournami' ? 'Pournami' : 'Amavasya'}`;
    out.push({ kind, start, end, observed, weekday: wd, month, adhika, slug: '', key: ymdKey(observed), occasion });
  };
  if (kind === 'amavasya') {
    for (let k = 1; k < nm.length; k++) { const m = monthOf(k - 1); consider(bisectCross(nm[k], 348), nm[k], m.idx, m.adhika); }
  } else {
    const fm = phases(180, f, t);
    for (const e of fm) {
      let k = -1; for (let i = 0; i < nm.length; i++) if (nm[i] < e) k = i;
      if (k < 0 || k >= nm.length - 1) continue;
      const m = monthOf(k); consider(bisectCross(e, 168), e, m.idx, m.adhika);
    }
  }
  const lo = ymdKey(from), hi = ymdKey(to);
  const sel = out.filter((l) => l.key >= lo && l.key <= hi).sort((a, b) => a.key.localeCompare(b.key));
  const group = (l: Lunation) => `${EN_MONTHS[l.observed.m - 1]}-${l.observed.y}`;
  const size = new Map<string, number>();
  for (const l of sel) size.set(group(l), (size.get(group(l)) ?? 0) + 1);
  for (const l of sel) l.slug = size.get(group(l))! > 1 ? `${EN_MONTHS[l.observed.m - 1]}-${l.observed.d}-${l.observed.y}` : group(l);
  return sel;
}

/** Stable window used by every page: from 1 January 2026 to 13 months after today. */
export function allLunations(kind: 'amavasya' | 'pournami') {
  const t = todayIST();
  return lunations(kind, { y: 2026, m: 1, d: 1 }, addDays({ y: t.y, m: t.m, d: t.d }, 400));
}
export { WEEKDAYS };
