// Saturn's sidereal sign over time, for the permanent Sade Sati page. Everything is worked out from the sky, so the page stays correct as Saturn moves.
import { signs, RASHIS } from './astro';
import { todayIST, addDays, ymdKey, istParts } from './panchang';

type Ymd = { y: number; m: number; d: number };
const DAY = 86400000;
const at = (t: number) => signs(new Date(t)).Saturn;
const ymdOf = (t: number): Ymd => { const x = istParts(new Date(t)); return { y: x.getUTCFullYear(), m: x.getUTCMonth() + 1, d: x.getUTCDate() }; };

export type Ingress = { sign: number; from: Ymd; to?: Ymd; fromAt: Date; toAt?: Date };
/** Saturn's stays in each sign, from about 4 years back to 8 years ahead, with the exact moment of each change (IST day). */
export function saturnStays(): Ingress[] {
  const t0 = todayIST();
  const start0 = Date.UTC(t0.y, t0.m - 1, t0.d) - 1500 * DAY, end = Date.UTC(t0.y, t0.m - 1, t0.d) + 3000 * DAY;
  const out: Ingress[] = [];
  let cur = at(start0), from = start0;
  for (let t = start0; t < end; t += 4 * DAY) {
    const s = at(t + 4 * DAY);
    if (s !== cur) {
      let lo = t, hi = t + 4 * DAY; // bisect to the minute
      for (let i = 0; i < 24; i++) { const mid = (lo + hi) / 2; if (at(mid) === cur) lo = mid; else hi = mid; }
      out.push({ sign: cur, from: ymdOf(from), to: ymdOf(hi), fromAt: new Date(from), toAt: new Date(hi) });
      cur = s; from = hi;
    }
  }
  out.push({ sign: cur, from: ymdOf(from), fromAt: new Date(from) });
  return out;
}
export const RASHI_NAME = (i: number) => RASHIS[(i + 12) % 12];
export { addDays, ymdKey };
