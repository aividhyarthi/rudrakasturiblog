// Page headings for the horoscope and panchangam pages: the same words are used as the page title and as the H1, and they say
// what is in the page (the day, the date, which rashis do well, the tithi, the nakshatra and Rahu Kalam), as the home page does.
import { RASHIS, reading, signs } from './astro';
import { WEEKDAYS, panchangFor, fmtTime, type CityId } from './panchang';

type Ymd = { y: number; m: number; d: number };
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "Sat 7 Nov 2026" */
export const shortDate = (x: Ymd) => `${WEEKDAYS[new Date(Date.UTC(x.y, x.m - 1, x.d)).getUTCDay()].slice(0, 3)} ${x.d} ${MON[x.m - 1]} ${x.y}`;

/** The rashis ranked for a day, best first. Same order as the "Best day for" box in the article, so title and page agree. */
function dayRank(x: Ymd) {
  return RASHIS.map((r, i) => ({ r, s: reading(i, x, 'daily').rating })).sort((a, b) => b.s - a.s || a.r.id.localeCompare(b.r.id));
}

/** "Moon in Vrishabha (Rohini), Favourable for Vrishabha and Dhanu, Meena Take Care": how an astrologer would read the day. */
export function dayLine(x: Ymd) {
  const p = panchangFor(x, 'hyderabad');
  const rank = dayRank(x);
  return `Moon in ${RASHIS[p.moonSign].skt} (${p.nakshatra[0].name}), Favourable for ${rank[0].r.skt} and ${rank[1].r.skt}, ${rank[RASHIS.length - 1].r.skt} Take Care`;
}

const ORD = ['', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
const houseOf = (planetSign: number, rashi: number) => ORD[((planetSign - rashi + 12) % 12) + 1];
const PHRASE: Record<'daily' | 'weekly' | 'monthly', Record<string, string>> = {
  daily: { challenging: 'Go Slowly', mixed: 'A Balanced Day', good: 'A Supportive Day', excellent: 'A Very Favourable Day' },
  weekly: { challenging: 'A Week to Go Slowly', mixed: 'A Balanced Week', good: 'A Supportive Week', excellent: 'A Very Favourable Week' },
  monthly: { challenging: 'A Month to Go Slowly', mixed: 'A Balanced Month', good: 'A Supportive Month', excellent: 'A Very Favourable Month' },
};
const BAND_ORDER = ['challenging', 'mixed', 'good', 'excellent'];

/** One rashi's reading in an astrologer's words: the verdict, plus what drives it (the Moon for a day, the strongest area for a week, Saturn and Jupiter for a month). */
export function rashiReadingLine(i: number, x: Ymd, span: 'daily' | 'weekly' | 'monthly') {
  const d = reading(i, x, span);
  const verdict = PHRASE[span][d.band];
  if (span === 'daily') return `${verdict}, Moon in Your ${ORD[d.daily!.moonHouse]} House`;
  if (span === 'weekly') {
    const best = [...d.domains].sort((a, b) => BAND_ORDER.indexOf(b.band) - BAND_ORDER.indexOf(a.band))[0];
    return `${verdict}, Strongest in ${best.label}`;
  }
  const mid = signs(new Date(Date.UTC(x.y, x.m - 1, x.d + 15, 6, 30)));
  return `Saturn in Your ${houseOf(mid.Saturn, i)} House, Jupiter in Your ${houseOf(mid.Jupiter, i)}, ${verdict}`;
}

/** "Krishna Chaturdashi Tithi, Swati Nakshatra, Rahu Kalam 9:00 AM to 10:30 AM" */
export function panchLine(x: Ymd, city: CityId = 'hyderabad') {
  const p = panchangFor(x, city);
  const ref = new Date(Date.UTC(x.y, x.m - 1, x.d));
  const t = p.tithi[0];
  return `${t.paksha} ${t.name} Tithi, ${p.nakshatra[0].name} Nakshatra, Rahu Kalam ${fmtTime(p.rahu.start, ref)} to ${fmtTime(p.rahu.end, ref)}`;
}
