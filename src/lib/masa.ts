// Which Hindu lunar month (masa) a date belongs to, worked out from the sky the same way as the panchangam.
// Telugu, Kannada, Tamil and Malayalam calendars (amanta): a month starts on the first day whose Hyderabad sunrise
// falls after the new moon that opens it, and is named from the Sun's sidereal sign at that new moon.
// A month with no sankranti inside it is adhika.
import { CITIES, sunTimes, sunSid, addDays, ymdKey, todayIST } from './panchang';
import { phases, MONTHS, MONTHS_TE } from './lunar';

type Ymd = { y: number; m: number; d: number };
const IST = 5.5 * 3600 * 1000, DAY = 86400000;
const hyd = CITIES.hyderabad;
const dayStart = (x: Ymd) => new Date(Date.UTC(x.y, x.m - 1, x.d) - IST);
const sunrise = (x: Ymd) => sunTimes(dayStart(x), hyd).rise.getTime();

let nm: Date[] | null = null, sign: number[] = [];
function moons() {
  if (!nm) {
    nm = phases(0, new Date(Date.UTC(2025, 9, 1)), new Date(Date.UTC(2029, 0, 1)));
    sign = nm.map((d) => Math.floor(sunSid(d) / 30));
  }
  return nm;
}

export type Masa = { idx: number; name: string; te: string; adhika: boolean; start: Ymd; end: Ymd; dayNo: number; total: number; label: string };

export function masaOn(x: Ymd): Masa {
  const m = moons();
  const rise = sunrise(x);
  let k = 0;
  for (let i = 0; i < m.length - 1; i++) if (m[i].getTime() <= rise) k = i;
  const idx = (sign[k] + 1) % 12, adhika = sign[k] === sign[k + 1];
  let start = x; while (sunrise(addDays(start, -1)) >= m[k].getTime()) start = addDays(start, -1);
  let end = x; while (sunrise(addDays(end, 1)) < m[k + 1].getTime()) end = addDays(end, 1);
  const dayNo = Math.round((Date.UTC(x.y, x.m - 1, x.d) - Date.UTC(start.y, start.m - 1, start.d)) / DAY) + 1;
  const total = Math.round((Date.UTC(end.y, end.m - 1, end.d) - Date.UTC(start.y, start.m - 1, start.d)) / DAY) + 1;
  const name = MONTHS[idx];
  return { idx, name, te: MONTHS_TE[idx], adhika, start, end, dayNo, total, label: adhika ? `Adhika ${name}` : name };
}

/** The first day of the next month, if it begins within `days` days from x (otherwise null). */
export function masaStartingSoon(x: Ymd, days = 3): { masa: Masa; inDays: number } | null {
  const here = masaOn(x);
  for (let n = 1; n <= days; n++) {
    const later = masaOn(addDays(x, n));
    if (later.idx !== here.idx || later.adhika !== here.adhika) return { masa: later, inDays: n };
  }
  return null;
}
let windows: Map<number, Masa> | null = null;
/** For each of the twelve months, the one running now (or just ended, within 3 days), otherwise the next. One scan, cached. */
export function allMasaWindows(): Map<number, Masa> {
  if (windows) return windows;
  const t = todayIST(), out = new Map<number, Masa>();
  for (let off = -3; off < 430 && out.size < 12; off += 3) {
    const m = masaOn(addDays(t, off));
    if (!m.adhika && !out.has(m.idx)) out.set(m.idx, m);
  }
  return (windows = out);
}
export const masaWindow = (idx: number): Masa | null => allMasaWindows().get(idx) ?? null;
export { ymdKey };
