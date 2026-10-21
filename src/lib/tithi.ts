// Ekadashi, Sankashti Chaturthi and Pradosham: exact tithi times and the day each is observed.
// Months follow the amanta calendar, as in lunar.ts. Observed-day rules are the common smarta ones; some temples differ.
import * as A from 'astronomy-engine';
import { CITIES, sunTimes, sunSid, todayIST, addDays, ymdKey } from './panchang';
import { elong, phases, istYmd, MONTHS } from './lunar';

const IST = 5.5 * 3600 * 1000, DAY = 86400000, MIN = 60000;
export type TithiKind = 'ekadashi' | 'sankashti' | 'pradosham';
export const ROUTE: Record<TithiKind, string> = { ekadashi: 'ekadashi', sankashti: 'sankashti-chaturthi', pradosham: 'pradosham' };
type Ymd = { y: number; m: number; d: number };
export type Obs = {
  kind: TithiKind; paksha: 'shukla' | 'krishna'; start: Date; end: Date; observed: Ymd; weekday: number; month: number; adhika: boolean;
  slug: string; key: string; name: string; occasion: string; moonrise?: Date; parana?: { from: Date; to: Date } | null; puja?: { from: Date; to: Date };
};

const EK_K = ['Varuthini', 'Apara', 'Yogini', 'Kamika', 'Aja', 'Indira', 'Rama', 'Utpanna', 'Saphala', 'Shattila', 'Vijaya', 'Papamochani'];
const EK_S = ['Kamada', 'Mohini', 'Nirjala', 'Devshayani', 'Shravana Putrada', 'Parivartini', 'Papankusha', 'Prabodhini', 'Mokshada', 'Pausha Putrada', 'Jaya', 'Amalaki'];
const EK_ALT: Record<string, string> = { Devshayani: 'Toli Ekadashi', Prabodhini: 'Utthana Ekadashi', Mokshada: 'Gita Jayanti', 'Pausha Putrada': 'Vaikuntha Ekadashi, Mukkoti Ekadashi' };
const EN = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function crossings(target: number, from: Date, to: Date) {
  const f = (x: number) => ((elong(new Date(x)) - target + 540) % 360) - 180;
  const out: Date[] = [], step = 3 * 3600000;
  let t = from.getTime(), prev = f(t);
  for (t += step; t <= to.getTime(); t += step) {
    const cur = f(t);
    if (prev < 0 && cur >= 0 && cur - prev < 60) {
      let lo = t - step, hi = t;
      for (let i = 0; i < 40; i++) { const mid = (lo + hi) / 2; if (f(mid) < 0) lo = mid; else hi = mid; }
      out.push(new Date(hi));
    }
    prev = cur;
  }
  return out;
}

const hyd = CITIES.hyderabad;
const dayStart = (x: Ymd) => new Date(Date.UTC(x.y, x.m - 1, x.d) - IST);
const sun = (x: Ymd) => sunTimes(dayStart(x), hyd);
const wdOf = (x: Ymd) => new Date(Date.UTC(x.y, x.m - 1, x.d)).getUTCDay();
const within = (t: number, a: Date, b: Date) => a.getTime() <= t && t < b.getTime();

function build(kind: TithiKind, from: Ymd, to: Ymd): Obs[] {
  const f = new Date(Date.UTC(from.y, from.m - 1, from.d) - 40 * DAY), t = new Date(Date.UTC(to.y, to.m - 1, to.d) + 40 * DAY);
  const nm = phases(0, new Date(f.getTime() - 40 * DAY), new Date(t.getTime() + 40 * DAY));
  const sign = nm.map((d) => Math.floor(sunSid(d) / 30));
  const monthAt = (x: Date) => { let k = 0; for (let i = 0; i < nm.length - 1; i++) if (nm[i] <= x) k = i; return { idx: (sign[k] + 1) % 12, adhika: sign[k] === sign[k + 1] }; };
  const spec = { ekadashi: [[120, 132, 'shukla'], [300, 312, 'krishna']], sankashti: [[216, 228, 'krishna']], pradosham: [[144, 156, 'shukla'], [324, 336, 'krishna']] }[kind] as [number, number, 'shukla' | 'krishna'][];
  const out: Obs[] = [];
  for (const [a, b, paksha] of spec) {
    const starts = crossings(a, f, t), ends = crossings(b, f, new Date(t.getTime() + 3 * DAY));
    for (const s of starts) {
      const e = ends.find((x) => x > s); if (!e) continue;
      const sd = istYmd(s), ed = istYmd(e);
      const m = monthAt(s);
      let observed = ed, moonrise: Date | undefined, parana: Obs['parana'] = null, puja: Obs['puja'];
      if (kind === 'ekadashi') {
        for (let x = sd; ; x = addDays(x, 1)) { if (within(sun(x).rise.getTime(), s, e)) { observed = x; break; } if (ymdKey(x) === ymdKey(ed)) break; }
        const dEnd = crossings(b + 12, e, new Date(e.getTime() + 2 * DAY))[0];
        if (dEnd) {
          const rise = sun(addDays(observed, 1)).rise;
          const hariEnd = new Date(e.getTime() + (dEnd.getTime() - e.getTime()) / 4);
          const from2 = new Date(Math.max(rise.getTime(), hariEnd.getTime()));
          if (from2 < dEnd) parana = { from: from2, to: new Date(Math.min(dEnd.getTime(), Math.max(from2.getTime() + 30 * MIN, rise.getTime() + 3 * 3600000))) };
        }
      } else if (kind === 'sankashti') {
        const obsr = new A.Observer(hyd.lat, hyd.lon, 0);
        const r = A.SearchRiseSet('Moon', obsr, +1, s, 1.5);
        if (r && within(r.date.getTime(), s, e)) { moonrise = r.date; observed = istYmd(r.date); }
        else { const r2 = A.SearchRiseSet('Moon', obsr, +1, e, 1.5); if (r2) moonrise = r2.date; observed = ed; }
      } else {
        let best = -1;
        for (let x = sd; ; x = addDays(x, 1)) {
          const ss = sun(x).set.getTime(), w0 = ss - 90 * MIN, w1 = ss + 90 * MIN;
          const ov = Math.min(e.getTime(), w1) - Math.max(s.getTime(), w0);
          if (within(ss, s, e) && ov > best) { best = ov; observed = x; }
          if (ymdKey(x) === ymdKey(ed)) break;
        }
        const ss = sun(observed).set.getTime(); puja = { from: new Date(ss - 90 * MIN), to: new Date(ss + 90 * MIN) };
      }
      const wd = wdOf(observed);
      let name: string, occasion: string;
      if (kind === 'ekadashi') {
        const base = m.adhika ? (paksha === 'shukla' ? 'Padmini' : 'Parama') : (paksha === 'shukla' ? EK_S : EK_K)[m.idx];
        name = `${base} Ekadashi`;
        occasion = `${m.adhika ? 'Adhika ' : ''}${MONTHS[m.idx]} ${paksha === 'shukla' ? 'Shukla' : 'Krishna'} Ekadashi${EK_ALT[base] ? ` (${EK_ALT[base]})` : ''}`;
      } else if (kind === 'sankashti') {
        name = wd === 2 ? 'Angaraki Sankashti Chaturthi' : 'Sankashti Chaturthi';
        occasion = `${m.adhika ? 'Adhika ' : ''}${MONTHS[m.idx]} Krishna Chaturthi${wd === 2 ? ', Angaraki (Tuesday)' : ''}`;
      } else {
        const wn = wd === 1 ? 'Soma ' : wd === 2 ? 'Bhauma ' : wd === 6 ? 'Shani ' : '';
        name = `${wn}Pradosham`;
        occasion = `${m.adhika ? 'Adhika ' : ''}${MONTHS[m.idx]} ${paksha === 'shukla' ? 'Shukla' : 'Krishna'} Trayodashi${wn ? ` (${wd === 1 ? 'Monday' : wd === 2 ? 'Tuesday' : 'Saturday'})` : ''}`;
      }
      out.push({ kind, paksha, start: s, end: e, observed, weekday: wd, month: m.idx, adhika: m.adhika, slug: '', key: ymdKey(observed), name, occasion, moonrise, parana, puja });
    }
  }
  const lo = ymdKey(from), hi = ymdKey(to);
  const sel = out.filter((o) => o.key >= lo && o.key <= hi).sort((p, q) => p.key.localeCompare(q.key));
  const grp = (o: Obs) => `${EN[o.observed.m - 1]}-${o.observed.y}`;
  const size = new Map<string, number>(); for (const o of sel) size.set(grp(o), (size.get(grp(o)) ?? 0) + 1);
  for (const o of sel) {
    const day = `${EN[o.observed.m - 1]}-${o.observed.d}-${o.observed.y}`;
    o.slug = kind === 'ekadashi' ? `${slugify(o.name)}-${grp(o)}${size.get(grp(o))! > 2 ? `-${o.observed.d}` : ''}` : kind === 'sankashti' ? (size.get(grp(o))! > 1 ? day : grp(o)) : day;
  }
  return sel;
}

const cache: Partial<Record<TithiKind, Obs[]>> = {};
export function allTithis(kind: TithiKind) {
  if (!cache[kind]) { const t = todayIST(); cache[kind] = build(kind, { y: 2026, m: 1, d: 1 }, addDays({ y: t.y, m: t.m, d: t.d }, 400)); }
  return cache[kind]!;
}
