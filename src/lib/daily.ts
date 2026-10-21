// Everything the daily panchangam and horoscope articles need for one date, worked out from the sky and the calendar.
import { panchangFor, fmtTime, todayIST, addDays, ymdKey, parseKey, WEEKDAYS, NAKSHATRAS, CITIES, type CityId } from './panchang';
import { RASHIS, dayOverall } from './astro';
import { DEITIES, WEEKDAY_DEITY, TITHI_DEITY, NAKSHATRA_DEITY, deity, type Mantra } from '../data/deities';
import { EN_MONTH_NAMES } from './lunar';

export type Ymd = { y: number; m: number; d: number };
export const DAILY_START: Ymd = { y: 2026, m: 10, d: 20 };

/** Every date that has a daily article: from the launch day to two days ahead of today. */
export function dailyDates(): Ymd[] {
  const end = addDays(todayIST(), 2);
  const out: Ymd[] = [];
  for (let x = DAILY_START; ymdKey(x) <= ymdKey(end); x = addDays(x, 1)) out.push(x);
  return out;
}
export const niceDate = (x: Ymd) => `${x.d} ${EN_MONTH_NAMES[x.m - 1]} ${x.y}`;
export const weekdayOf = (x: Ymd) => new Date(Date.UTC(x.y, x.m - 1, x.d)).getUTCDay();
const hash = (s: string) => { let h = 2166136261; for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0; return h; };

const NAK_BLURB: Record<string, string> = {};

export function dayFacts(x: Ymd, city: CityId = 'hyderabad') {
  const p = panchangFor(x, city);
  const ref = new Date(Date.UTC(x.y, x.m - 1, x.d));
  const t = (d: Date) => fmtTime(d, ref);
  const range = (r: { start: Date; end: Date }) => `${t(r.start)} to ${t(r.end)}`;
  const tithi = p.tithi[0], nak = p.nakshatra[0];
  const tithiNo = (tithi.index % 15) + 1; // 1..15
  const sunsetTithi = p.tithi.find((s) => s.endsAt.getTime() > p.sunset.getTime()) ?? tithi;
  const wd = p.weekday;
  const dk = ymdKey(x);
  const main = deity(WEEKDAY_DEITY[wd].main), alt = deity(WEEKDAY_DEITY[wd].alt);
  const tdId = TITHI_DEITY[tithiNo];
  const tithiDeity = tdId && tdId !== main.id ? deity(tdId) : null;
  const mantra: Mantra = main.mantras[hash(`m|${dk}`) % main.mantras.length];
  const altMantra: Mantra = alt.mantras[hash(`a|${dk}`) % alt.mantras.length];
  const special: string[] = [];
  const krishna = tithi.index >= 15;
  if (tithiNo === 11 && tithi.index !== 29) special.push('Ekadashi. A day of fasting and worship of Vishnu. Grains and pulses are avoided, and the fast is broken the next morning after sunrise (see our <a href="/ekadashi-fasting-rules-in-plain-words/">Ekadashi guide</a>).');
  if (tithiNo === 4) special.push(krishna ? 'Sankashti Chaturthi. Devotees of Ganesha fast until moonrise and offer prayers to him in the evening.' : 'Vinayaka Chaturthi (Shukla Chaturthi). A day to worship Ganesha, the remover of obstacles.');
  if (sunsetTithi.index % 15 === 12 && sunsetTithi.index !== 29) special.push('Pradosham. The twilight window around sunset on Trayodashi is considered the best time to worship Shiva, with abhishekam and a lamp.');
  if (tithi.index === 28) special.push('Masa Shivaratri. The Krishna Chaturdashi of every month is observed as a Shivaratri, with Shiva worship at night.');
  if (tithiNo === 8) special.push(krishna ? 'Krishna Ashtami (Kalashtami). Observed for Kalabhairava and, in the month of Shravana, as Krishna Janmashtami.' : 'Shukla Ashtami. A day associated with Durga worship.');
  if (tithiNo === 6) special.push('Shashthi. A day for Subramanya (Kartikeya), especially loved in the Telugu and Tamil country.');
  if (tithi.index === 29 || p.tithi.some((s) => s.index === 29)) special.push('Amavasya, the new moon, is the day to remember ancestors. See the <a href="/amavasya/">Amavasya dates and timings</a>.');
  if (tithi.index === 14 || p.tithi.some((s) => s.index === 14)) special.push('Pournami, the full moon. A day for Satyanarayana vratam and charity. See the <a href="/pournami/">Pournami dates and timings</a>.');
  const moonSign = RASHIS[p.moonSign];
  const overall = dayOverall({ tithi: p.tithi, nakshatra: p.nakshatra, moonSign: p.moonSign, weekday: wd });
  return { x, key: dk, p, t, range, tithi, nak, tithiNo, krishna, wd, main, alt, tithiDeity, mantra, altMantra, special, moonSign, overall, nakDeity: NAKSHATRA_DEITY[nak.index], sunsetTithi };
}
export type DayFacts = ReturnType<typeof dayFacts>;

export function otherCities(x: Ymd) {
  return (Object.keys(CITIES) as CityId[]).map((id) => { const f = panchangFor(x, id); const ref = new Date(Date.UTC(x.y, x.m - 1, x.d)); return { id, name: CITIES[id].name, sunrise: fmtTime(f.sunrise, ref), rahu: `${fmtTime(f.rahu.start, ref)} to ${fmtTime(f.rahu.end, ref)}` }; });
}
export { parseKey, ymdKey, WEEKDAYS, NAKSHATRAS, RASHIS, DEITIES };
