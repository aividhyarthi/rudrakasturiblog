// Daily rotation for the home page: the same day always gives the same picks, and every daily rebuild shows a fresh mix.
import { todayIST } from './panchang';

export const dayNumber = () => { const t = todayIST(); return Math.floor(Date.UTC(t.y, t.m - 1, t.d) / 86400000); };

/** Changes four times a day (7, 11, 15 and 19 hrs IST), when a new story goes live and the site is rebuilt. */
export const slotNumber = () => {
  const h = new Date(Date.now() + 330 * 60000).getUTCHours();
  return dayNumber() * 4 + (h < 11 ? 0 : h < 15 ? 1 : h < 19 ? 2 : 3);
};

const rng = (seed: number) => { let s = seed >>> 0; return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; };

export function shuffle<T>(arr: T[], seed: number): T[] {
  const r = rng(seed), a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

type A = { slug: string; data: { category: string; series?: string } };
/** Up to n articles, each from a different series or category, so one topic cannot fill the page. */
export function diversePick<T extends A>(arts: T[], n: number, seed: number): T[] {
  const groups = new Map<string, T[]>();
  for (const a of arts) { const k = a.data.series ?? a.data.category; (groups.get(k) ?? groups.set(k, []).get(k)!).push(a); }
  const order = shuffle([...groups.keys()], seed);
  const lists = new Map(order.map((k, i) => [k, shuffle(groups.get(k)!, seed + i + 1)]));
  const out: T[] = [];
  for (let round = 0; out.length < n; round++) {
    let added = false;
    for (const k of order) { const l = lists.get(k)!; if (l[round] && out.length < n) { out.push(l[round]); added = true; } }
    if (!added) break;
  }
  return out;
}
