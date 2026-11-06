// Page headings for the horoscope and panchangam pages: the same words are used as the page title and as the H1, and they say
// what is in the page (the day, the date, which rashis do well, the tithi, the nakshatra and Rahu Kalam), as the home page does.
import { RASHIS, reading } from './astro';
import { WEEKDAYS, panchangFor, fmtTime, type CityId } from './panchang';

type Ymd = { y: number; m: number; d: number };
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "Sat 7 Nov 2026" */
export const shortDate = (x: Ymd) => `${WEEKDAYS[new Date(Date.UTC(x.y, x.m - 1, x.d)).getUTCDay()].slice(0, 3)} ${x.d} ${MON[x.m - 1]} ${x.y}`;

/** "Good for Simha and Kanya, Go Slowly Mesha" for a day, a week or a month */
export function rashiLine(x: Ymd, span: 'daily' | 'weekly' | 'monthly' = 'daily') {
  const rank = RASHIS.map((r, i) => ({ r, s: reading(i, x, span).rating })).sort((a, b) => b.s - a.s);
  return `Good for ${rank[0].r.skt} and ${rank[1].r.skt}, Go Slowly ${rank[RASHIS.length - 1].r.skt}`;
}

/** "Krishna Chaturdashi, Swati, Rahu Kalam 9:00 AM to 10:30 AM" */
export function panchLine(x: Ymd, city: CityId = 'hyderabad') {
  const p = panchangFor(x, city);
  const ref = new Date(Date.UTC(x.y, x.m - 1, x.d));
  const t = p.tithi[0];
  return `${t.paksha} ${t.name}, ${p.nakshatra[0].name}, Rahu Kalam ${fmtTime(p.rahu.start, ref)} to ${fmtTime(p.rahu.end, ref)}`;
}
