// Rashi phalalu from real planetary transits (Vedic gochara rules, Lahiri sidereal, Moon sign = rashi).
// Entertainment only. Everything here is deterministic: same date, same text.
import * as A from 'astronomy-engine';
import { ayanamsa, moonSid, sunSid, NAKSHATRAS, TITHIS, istParts, type CityId } from './panchang';

export const RASHIS = [
  { id: 'mesha', en: 'Aries', skt: 'Mesha', te: 'మేషం', sym: '♈︎', lord: 'Mars' },
  { id: 'vrishabha', en: 'Taurus', skt: 'Vrishabha', te: 'వృషభం', sym: '♉︎', lord: 'Venus' },
  { id: 'mithuna', en: 'Gemini', skt: 'Mithuna', te: 'మిథునం', sym: '♊︎', lord: 'Mercury' },
  { id: 'karkataka', en: 'Cancer', skt: 'Karkataka', te: 'కర్కాటకం', sym: '♋︎', lord: 'Moon' },
  { id: 'simha', en: 'Leo', skt: 'Simha', te: 'సింహం', sym: '♌︎', lord: 'Sun' },
  { id: 'kanya', en: 'Virgo', skt: 'Kanya', te: 'కన్య', sym: '♍︎', lord: 'Mercury' },
  { id: 'tula', en: 'Libra', skt: 'Tula', te: 'తుల', sym: '♎︎', lord: 'Venus' },
  { id: 'vrischika', en: 'Scorpio', skt: 'Vrischika', te: 'వృశ్చికం', sym: '♏︎', lord: 'Mars' },
  { id: 'dhanu', en: 'Sagittarius', skt: 'Dhanu', te: 'ధనుస్సు', sym: '♐︎', lord: 'Jupiter' },
  { id: 'makara', en: 'Capricorn', skt: 'Makara', te: 'మకరం', sym: '♑︎', lord: 'Saturn' },
  { id: 'kumbha', en: 'Aquarius', skt: 'Kumbha', te: 'కుంభం', sym: '♒︎', lord: 'Saturn' },
  { id: 'meena', en: 'Pisces', skt: 'Meena', te: 'మీనం', sym: '♓︎', lord: 'Jupiter' },
] as const;

type Planet = 'Sun' | 'Moon' | 'Mars' | 'Mercury' | 'Jupiter' | 'Venus' | 'Saturn' | 'Rahu' | 'Ketu';
const FAV: Record<Planet, number[]> = {
  Sun: [3, 6, 10, 11], Moon: [1, 3, 6, 7, 10, 11], Mars: [3, 6, 11], Mercury: [2, 4, 6, 8, 10, 11],
  Jupiter: [2, 5, 7, 9, 11], Venus: [1, 2, 3, 4, 5, 8, 9, 11, 12], Saturn: [3, 6, 11], Rahu: [3, 6, 10, 11], Ketu: [3, 6, 11],
};
const BENEFIC: Planet[] = ['Jupiter', 'Venus', 'Mercury', 'Moon'];

const norm = (x: number) => ((x % 360) + 360) % 360;
const BODY: Record<string, A.Body> = { Mars: A.Body.Mars, Mercury: A.Body.Mercury, Jupiter: A.Body.Jupiter, Venus: A.Body.Venus, Saturn: A.Body.Saturn };

/** Sidereal sign index (0..11) of each planet at an instant. */
const SIGN_CACHE = new Map<number, Record<Planet, number>>();
export function signs(d: Date): Record<Planet, number> {
  const hit = SIGN_CACHE.get(d.getTime());
  if (hit) return hit;
  const r = computeSigns(d);
  SIGN_CACHE.set(d.getTime(), r);
  return r;
}
function computeSigns(d: Date): Record<Planet, number> {
  const ay = ayanamsa(d);
  const g = (b: A.Body) => Math.floor(norm(A.Ecliptic(A.GeoVector(b, d, true)).elon - ay) / 30);
  const T = (d.getTime() - Date.UTC(2000, 0, 1, 12)) / (36525 * 86400000);
  const rahuTrop = norm(125.04452 - 1934.136261 * T); // mean node
  const rahu = Math.floor(norm(rahuTrop - ay) / 30);
  return {
    Sun: Math.floor(sunSid(d) / 30), Moon: Math.floor(moonSid(d) / 30),
    Mars: g(BODY.Mars), Mercury: g(BODY.Mercury), Jupiter: g(BODY.Jupiter), Venus: g(BODY.Venus), Saturn: g(BODY.Saturn),
    Rahu: rahu, Ketu: (rahu + 6) % 12,
  };
}
const house = (planetSign: number, rashi: number) => ((planetSign - rashi + 12) % 12) + 1;

const hash = (s: string) => { let h = 2166136261; for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0; return h; };
const pick = <T,>(arr: T[], key: string) => arr[hash(key) % arr.length];
const ordinal = (n: number) => ['', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'][n];

export type Span = 'daily' | 'weekly' | 'monthly';
const WEIGHT: Record<Span, Record<Planet, number>> = {
  daily: { Moon: 4, Sun: 1, Mars: 1, Mercury: 1, Venus: 1, Jupiter: 1, Saturn: 1, Rahu: 1, Ketu: 0.5 },
  weekly: { Moon: 2, Sun: 1.5, Mars: 1.5, Mercury: 1.5, Venus: 1.5, Jupiter: 1.5, Saturn: 1.5, Rahu: 1, Ketu: 0.5 },
  monthly: { Moon: 0.5, Sun: 2, Mars: 2, Mercury: 1.5, Venus: 1.5, Jupiter: 2.5, Saturn: 2.5, Rahu: 1.5, Ketu: 1 },
};

/** Sample instants (noon IST) across the span. */
function samples(start: { y: number; m: number; d: number }, span: Span): Date[] {
  const n = span === 'daily' ? 1 : span === 'weekly' ? 7 : 30;
  return Array.from({ length: n }, (_, i) => new Date(Date.UTC(start.y, start.m - 1, start.d + i, 6, 30)));
}

const BANDS = ['challenging', 'mixed', 'good', 'excellent'] as const;
type Band = (typeof BANDS)[number];

const TEXT = {
  career: {
    challenging: ['Work may feel slow and heavy. Stick to routine tasks and avoid big decisions or arguments with seniors.', 'Expect friction at work. Double-check emails and deadlines, and let others speak first in meetings.', 'Progress at work needs patience. Small, steady effort beats a bold move right now.'],
    mixed: ['A balanced stretch at work. Finish pending tasks first, and keep new commitments modest.', 'Work runs on its own pace. Clear the backlog and keep communication simple.', 'Neither a push nor a pause at work. Use the time to organise and plan.'],
    good: ['Work moves smoothly. Good time to share ideas, close a pending file or ask for what you need.', 'Your effort gets noticed. Colleagues are cooperative, so lead the conversation.', 'A productive period for work. Take initiative on something you have been postponing.'],
    excellent: ['Strong support at work. Pitch, negotiate or launch: your timing is on your side.', 'Recognition is likely. Put your best work forward and say yes to visible tasks.', 'A standout period for career moves. Back your judgement and act early.'],
  },
  money: {
    challenging: ['Spend carefully. Delay big purchases, avoid lending, and read the fine print twice.', 'Money needs discipline. Track small expenses and avoid impulse buys.', 'Cash flow may feel tight. Postpone risky investments and keep a buffer.'],
    mixed: ['Finances stay steady. Pay dues, review a budget, and avoid chasing quick gains.', 'A neutral period for money. Save a little more than usual.', 'Income and expenses balance out. Good time to compare options before committing.'],
    good: ['Money matters look supportive. A pending payment or small gain may come through.', 'A good time to sort finances, clear a loan instalment or plan a purchase.', 'Financial sense is sharp. Make considered choices and enjoy a modest reward.'],
    excellent: ['A strong period for money. Gains, bonuses or helpful deals are favoured, so stay sensible and avoid overreach.', 'Financial luck is with you. Good time to plan savings or a long-term purchase.', 'Cash flow improves. Back well-researched decisions, not tips.'],
  },
  relationships: {
    challenging: ['Tempers can run short at home. Pause before replying and avoid old arguments.', 'Misunderstandings are likely. Listen first, and say less when upset.', 'Give people space today. Small comments can be taken the wrong way.'],
    mixed: ['Relationships are steady. A simple message or shared meal does more than a big gesture.', 'Ordinary days with family and friends. Show interest in small things.', 'Neither warm nor cold. Keep plans flexible and kind.'],
    good: ['Warm energy with loved ones. Good for a family plan, a catch-up or healing a small rift.', 'People respond well to you. Say the kind thing you have been holding back.', 'Harmony at home and with friends. A good day to reconnect.'],
    excellent: ['Excellent for bonds and new connections. Celebrate, propose or reconcile.', 'Affection flows easily. Spend time with those who matter.', 'A lovely period for relationships. Make plans together.'],
  },
  health: {
    challenging: ['Energy may dip. Sleep on time, eat light and avoid skipping meals. See a doctor for anything persistent.', 'Stress can show up in the body. Walk, hydrate, and take breaks from screens.', 'Go easy on yourself. Avoid heavy food, late nights and risky travel.'],
    mixed: ['Health is stable. Keep your routine and add a short walk.', 'Average energy. Stretch, drink water and keep meals regular.', 'Nothing alarming. Small habits matter more than big efforts.'],
    good: ['Energy is good. A fine day to restart a workout or healthier eating.', 'You feel lighter. Use it to catch up on sleep or exercise.', 'Vitality is up. Keep it going with regular meals and rest.'],
    excellent: ['Strong energy. Good time to begin a fitness habit or finish a tough task.', 'You feel resilient. Channel it into movement and good food.', 'Vitality is high. Use it wisely and keep a steady routine.'],
  },
} as const;

const WEEKDAY_COLOR = ['Red', 'White', 'Red', 'Green', 'Yellow', 'White', 'Blue'];

export type Reading = {
  span: Span; start: string; rating: number; band: Band; summary: string;
  domains: { key: string; label: string; band: Band; text: string }[];
  factors: string[]; lucky: { color: string; number: number };
};

const bandOf = (x: number): Band => (x < -0.3 ? 'challenging' : x < 0.1 ? 'mixed' : x < 0.5 ? 'good' : 'excellent');
const stars = (x: number) => Math.max(1, Math.min(5, Math.round(3 + x * 2.2)));

export function reading(rashi: number, startYmd: { y: number; m: number; d: number }, span: Span): Reading {
  const ds = samples(startYmd, span);
  const W = WEIGHT[span];
  const dayKey = `${startYmd.y}-${startYmd.m}-${startYmd.d}`;
  let total = 0, wsum = 0;
  const dom = { career: 0, money: 0, relationships: 0, health: 0 };
  const rec: Record<Planet, number[]> = { Sun: [], Moon: [], Mars: [], Mercury: [], Jupiter: [], Venus: [], Saturn: [], Rahu: [], Ketu: [] };
  for (const d of ds) {
    const sg = signs(d);
    (Object.keys(sg) as Planet[]).forEach((p) => {
      const h = house(sg[p], rashi);
      rec[p].push(h);
      const s = FAV[p].includes(h) ? 1 : -1;
      total += W[p] * s; wsum += W[p];
      const w = W[p] / ds.length;
      const val = (BENEFIC.includes(p) ? 1 : FAV[p].includes(h) ? 0.6 : -1) * w;
      if (h === 10 || h === 6) dom.career += val * 1.5;
      if (h === 2 || h === 11) dom.money += val * 1.5;
      if (h === 7 || h === 5) dom.relationships += val * 1.5;
      if (h === 1 || h === 6 || h === 8) dom.health += (BENEFIC.includes(p) ? 1 : -0.8) * w * 1.2;
    });
  }
  const overall = total / wsum; // -1..1
  const base = overall;
  const band = bandOf(base);
  const clamp = (v: number) => Math.max(-1, Math.min(1, base * 0.7 + v * 0.8));
  const domains = (['career', 'money', 'relationships', 'health'] as const).map((k) => {
    const b = bandOf(clamp(dom[k]));
    return { key: k, label: { career: 'Career', money: 'Money', relationships: 'Relationships', health: 'Health' }[k], band: b, text: pick([...TEXT[k][b]], `${k}|${rashi}|${span}|${dayKey}`) };
  });
  // Factors: the facts the reading rests on (first sample for daily, midpoint for longer spans).
  const mid = ds[Math.floor(ds.length / 2)];
  const sg = signs(mid);
  const factors: string[] = [];
  const nm = (i: number) => RASHIS[i].en;
  const line = (p: Planet) => `${p} in ${nm(sg[p])} (your ${ordinal(house(sg[p], rashi))} house)`;
  if (span === 'daily') factors.push(line('Moon'), line('Sun'));
  else factors.push(line('Sun'), line('Mars'), line('Mercury'), line('Venus'));
  factors.push(line('Jupiter'), line('Saturn'));
  const openers: Record<Band, string[]> = {
    challenging: ['A slower, more careful stretch.', 'Patience is the theme.', 'Keep expectations modest and your cool intact.'],
    mixed: ['A steady, in-between stretch.', 'Neither a push nor a pause.', 'Balance is the theme.'],
    good: ['A supportive stretch.', 'Things lean in your favour.', 'A good time to act on plans.'],
    excellent: ['A standout stretch.', 'Momentum is with you.', 'A strong, confident period.'],
  };
  const wd = new Date(Date.UTC(startYmd.y, startYmd.m - 1, startYmd.d)).getUTCDay();
  const best = [...domains].sort((a, b) => BANDS.indexOf(b.band) - BANDS.indexOf(a.band))[0];
  const summary = `${pick(openers[band], `o|${rashi}|${span}|${dayKey}`)} Strongest area: ${best.label}.`;
  return {
    span, start: dayKey, rating: stars(base), band, summary, domains, factors,
    lucky: { color: WEEKDAY_COLOR[wd], number: (hash(`${rashi}|${dayKey}|${span}`) % 9) + 1 },
  };
}

// ---------- Overall for the day (panchang based) ----------
const TITHI_NATURE: Record<number, [string, string]> = {
  1: ['Nanda', 'Joyful and festive. Good for celebrations and starting cheerful plans.'],
  2: ['Bhadra', 'Steady and healthy. Good for routine work, health matters and household tasks.'],
  3: ['Jaya', 'Favours effort and competition. Good for decisions that need confidence.'],
  4: ['Rikta', 'Considered empty. Traditionally avoided for starting new ventures; good for finishing old work.'],
  5: ['Purna', 'Full and auspicious. Good for completing tasks and auspicious beginnings.'],
};
const NAK_NATURE: Record<number, string> = {};
const setNak = (names: string[], note: string) => names.forEach((n) => (NAK_NATURE[NAKSHATRAS.indexOf(n)] = note));
setNak(['Rohini', 'Uttara Phalguni', 'Uttara Ashadha', 'Uttara Bhadrapada'], 'A fixed nakshatra. Traditionally good for foundations, planting and long-term commitments.');
setNak(['Punarvasu', 'Swati', 'Shravana', 'Dhanishta', 'Shatabhisha'], 'A moving nakshatra. Traditionally good for travel, vehicles and change of place.');
setNak(['Bharani', 'Magha', 'Purva Phalguni', 'Purva Ashadha', 'Purva Bhadrapada'], 'A fierce nakshatra. Traditionally best for bold or technical work, not for gentle beginnings.');
setNak(['Mrigashira', 'Chitra', 'Anuradha', 'Revati'], 'A soft nakshatra. Traditionally good for arts, friendships, learning and relationships.');
setNak(['Ashwini', 'Pushya', 'Hasta'], 'A swift nakshatra. Traditionally good for trade, medicine, learning and quick tasks.');
setNak(['Krittika', 'Vishakha'], 'A mixed nakshatra. Good for focused work; take care with sensitive talks.');
setNak(['Ardra', 'Ashlesha', 'Jyeshtha', 'Mula'], 'A sharp nakshatra. Traditionally avoided for auspicious starts; good for clearing and ending things.');

export function dayOverall(p: { tithi: { index: number; name: string; paksha?: string }[]; nakshatra: { index: number; name: string }[]; moonSign: number; weekday: number }) {
  const t = p.tithi[0], n = p.nakshatra[0];
  const idx15 = (t.index % 15) + 1;
  const nature = TITHI_NATURE[((idx15 - 1) % 5) + 1];
  const wdNote = ['Sunday is ruled by the Sun: a day for health, vitality and authority.', 'Monday is ruled by the Moon: a day for family, calm and emotions.', 'Tuesday is ruled by Mars: a day for energy and courage; watch tempers.', 'Wednesday is ruled by Mercury: a day for communication, trade and learning.', 'Thursday is ruled by Jupiter: a day for teachers, wisdom and good beginnings.', 'Friday is ruled by Venus: a day for comfort, love and the arts.', 'Saturday is ruled by Saturn: a day for discipline, patience and hard work.'][p.weekday];
  return {
    headline: `${t.paksha} ${t.name}, ${n.name} nakshatra, Moon in ${RASHIS[p.moonSign].en}`,
    points: [
      `Tithi: ${t.paksha} ${t.name} is a ${nature[0]} tithi. ${nature[1]}`,
      `Nakshatra: ${n.name}. ${NAK_NATURE[n.index] ?? ''}`,
      wdNote,
      `With the Moon in ${RASHIS[p.moonSign].en}, signs for whom the Moon is in the 1st, 3rd, 6th, 7th, 10th or 11th house have the easiest day: ${[1, 3, 6, 7, 10, 11].map((h) => RASHIS[(p.moonSign - h + 1 + 12) % 12].en).join(', ')}.`,
    ],
  };
}
