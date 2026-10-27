// Festival dates, calculated from the Sun and Moon the same way as the panchangam. Dates follow the Hyderabad sunrise and the
// common smarta rule for each festival; some temples and traditions differ by a day, so pages say to confirm with your priest.
import { CITIES, sunTimes, sunSid, todayIST, addDays, ymdKey, WEEKDAYS } from './panchang';
import { elong, phases, istYmd } from './lunar';
import { FESTIVALS, SANKRANTIS, type FestRule } from '../data/festivals';

const IST = 5.5 * 3600 * 1000, DAY = 86400000;
type Ymd = { y: number; m: number; d: number };
export type Fest = {
  id: string; name: string; alt?: string; god: string; about: string; how: string; link?: string;
  key: string; ymd: Ymd; weekday: number; slug: string; start?: Date; end?: Date; solar?: boolean; month?: number; tithi?: number;
};

const hyd = CITIES.hyderabad;
const dayStart = (x: Ymd) => new Date(Date.UTC(x.y, x.m - 1, x.d) - IST);
const sunOf = (x: Ymd) => sunTimes(dayStart(x), hyd);
const wdOf = (x: Ymd) => new Date(Date.UTC(x.y, x.m - 1, x.d)).getUTCDay();

/** First moment after `from` when the elongation reaches `deg`. */
function elongAt(deg: number, from: Date, to: Date) {
  const f = (t: number) => ((elong(new Date(t)) - deg + 540) % 360) - 180;
  let t = from.getTime(), prev = f(t);
  for (t += 3 * 3600000; t <= to.getTime() + 3 * 3600000; t += 3 * 3600000) {
    const cur = f(t);
    if (prev < 0 && cur >= 0 && cur - prev < 60) {
      let lo = t - 3 * 3600000, hi = t;
      for (let i = 0; i < 40; i++) { const mid = (lo + hi) / 2; if (f(mid) < 0) lo = mid; else hi = mid; }
      return new Date(hi);
    }
    prev = cur;
  }
  return null;
}

function instantOf(at: FestRule['at'], x: Ymd) {
  const s = sunOf(x);
  if (at === 'sunrise') return s.rise.getTime();
  if (at === 'midday') return (s.rise.getTime() + s.set.getTime()) / 2;
  if (at === 'aparahna') return s.rise.getTime() + 0.7 * (s.set.getTime() - s.rise.getTime());
  if (at === 'sunset') return s.set.getTime();
  const next = sunOf(addDays(x, 1));
  return (s.set.getTime() + next.rise.getTime()) / 2;
}

let cache: Fest[] | null = null;
export function allFestivals(): Fest[] {
  if (cache) return cache;
  const t0 = todayIST();
  const from = new Date(Date.UTC(2026, 0, 1) - 60 * DAY), to = new Date(Date.UTC(t0.y, t0.m - 1, t0.d) + 400 * DAY);
  const nm = phases(0, new Date(from.getTime() - 40 * DAY), new Date(to.getTime() + 70 * DAY));
  const sign = nm.map((d) => Math.floor(sunSid(d) / 30));
  const out: Fest[] = [];
  const lo = ymdKey({ y: 2026, m: 1, d: 1 }), hi = ymdKey(addDays(t0, 400));
  for (let i = 0; i < nm.length - 1; i++) {
    const idx = (sign[i] + 1) % 12, adhika = sign[i] === sign[i + 1];
    if (adhika) continue;
    for (const r of FESTIVALS.filter((x) => x.m === idx)) {
      const startDeg = ((r.t - 1) * 12) % 360, endDeg = (r.t * 12) % 360;
      const start = r.t === 1 ? nm[i] : elongAt(startDeg, nm[i], nm[i + 1]);
      if (!start) continue;
      const end = r.t === 30 ? nm[i + 1] : (elongAt(endDeg, start, new Date(start.getTime() + 2 * DAY)) ?? new Date(start.getTime() + DAY));
      let pick: Ymd | null = null;
      for (let x = istYmd(start), n = 0; n < 4; x = addDays(x, 1), n++) {
        const t = instantOf(r.at, x);
        if (t >= start.getTime() && t < end.getTime()) { pick = x; break; }
      }
      pick ??= istYmd(start);
      const key = ymdKey(pick);
      if (key < lo || key > hi) continue;
      out.push({ ...r, key, ymd: pick, weekday: wdOf(pick), slug: `${r.id}-${pick.y}`, start, end, month: idx, tithi: r.t });
    }
  }
  // Varalakshmi Vratam: the Friday on or just before Shravana Pournami
  for (const p of out.filter((f) => f.id === 'raksha-bandhan')) {
    let x = p.ymd; while (wdOf(x) !== 5) x = addDays(x, -1);
    out.push({ id: 'varalakshmi-vratam', name: 'Varalakshmi Vratam', god: 'Lakshmi', about: 'Married women worship Varalakshmi, the boon-giving form of Lakshmi, on the Friday before Shravana Pournami. It is widely observed in Andhra Pradesh, Telangana, Karnataka and Tamil Nadu.', how: 'A kalasha with a coconut and a silk cloth, the Varalakshmi puja with a yellow thread tied on the wrist, and a feast for family and neighbours.', key: ymdKey(x), ymd: x, weekday: 5, slug: `varalakshmi-vratam-${x.y}`, month: 4 });
  }
  // Holi is the day after Holika Dahan
  for (const h of out.filter((f) => f.id === 'holika-dahan')) {
    const x = addDays(h.ymd, 1);
    out.push({ id: 'holi', name: 'Holi', alt: 'Vasanthotsavam, Dolotsavam', god: 'Krishna', about: 'The festival of colours, on the day after Holika Dahan, the beginning of spring.', how: 'Colours, sweets and visits to family and friends.', key: ymdKey(x), ymd: x, weekday: wdOf(x), slug: `holi-${x.y}`, month: 11 });
  }
  // Solar festivals
  for (const s of SANKRANTIS) {
    const f = (t: number) => ((sunSid(new Date(t)) - s.lon + 540) % 360) - 180;
    for (let t = from.getTime(), prev = f(t); t <= to.getTime(); t += 6 * 3600000) {
      const cur = f(t);
      if (prev < 0 && cur >= 0 && cur - prev < 30) {
        let a = t - 6 * 3600000, b = t;
        for (let k = 0; k < 40; k++) { const mid = (a + b) / 2; if (f(mid) < 0) a = mid; else b = mid; }
        // when the Sun enters after sunset, many calendars keep the festival the next day
        let day = istYmd(new Date(b));
        if (b > sunOf(day).set.getTime()) day = addDays(day, 1);
        const key = ymdKey(day);
        if (key >= lo && key <= hi) out.push({ id: s.id, name: s.name, alt: s.alt, god: s.god, about: s.about, how: s.how, key, ymd: day, weekday: wdOf(day), slug: `${s.id}-${day.y}`, start: new Date(b), solar: true });
      }
      prev = cur;
    }
  }
  cache = out.sort((p, q) => p.key.localeCompare(q.key));
  return cache;
}

export const festivalsByKey = () => { const m = new Map<string, Fest[]>(); for (const f of allFestivals()) m.set(f.key, [...(m.get(f.key) ?? []), f]); return m; };
export const upcomingFestivals = (from: Ymd, n: number) => allFestivals().filter((f) => f.key >= ymdKey(from)).slice(0, n);
export const festivalName = (f: Fest) => f.name;
export { WEEKDAYS };
