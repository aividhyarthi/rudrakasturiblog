// Rashi phalalu from real planetary transits (Vedic gochara rules, Lahiri sidereal, Moon sign = rashi).
// Entertainment only. Everything here is deterministic: same date, same text.
import * as A from 'astronomy-engine';
import { ayanamsa, moonSid, sunSid, moonTrop, sunTrop, NAKSHATRAS, TITHIS, istParts, type CityId } from './panchang';

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
  daily?: { moon: string; nak: string; weekday: string; tara: string; nakName: string; moonHouse: number };
};


// ---------- Day-specific detail (changes every day: weekday, tithi and the Moon's nakshatra) ----------
const NAK_THEME = [
  'Ashwini favours quick starts and healing work.', 'Bharani asks you to carry responsibility and finish what you begin.', 'Krittika sharpens focus: cut away what you do not need.',
  'Rohini favours growth, beauty and steady building.', 'Mrigashira favours curiosity, learning and the search for answers.', 'Ardra stirs strong feelings that clear the air, so be gentle with words.',
  'Punarvasu favours a fresh start after a setback.', 'Pushya is among the most supportive stars for giving, nourishing and learning.', 'Ashlesha asks for caution with secrets and clever talk.',
  'Magha brings respect for elders and ancestors.', 'Purva Phalguni favours rest, enjoyment and creative leisure.', 'Uttara Phalguni favours agreements, friendship and support.',
  'Hasta favours skilled handwork, trade and getting things done.', 'Chitra favours design, craft and making things look right.', 'Swati favours independence, trade and flexibility.',
  'Vishakha favours goals and determination, but avoid rivalry.', 'Anuradha favours friendship, teamwork and devotion.', 'Jyeshtha brings pressure and seniority: lead with humility.',
  'Mula digs to the roots: good for research and letting go.', 'Purva Ashadha favours conviction and renewal.', 'Uttara Ashadha favours lasting success through steady effort.',
  'Shravana favours listening, learning and good counsel.', 'Dhanishta favours rhythm, group effort and building resources.', 'Shatabhisha favours healing, research and quiet work.',
  'Purva Bhadrapada brings intensity: channel it into discipline.', 'Uttara Bhadrapada favours patience, depth and compassion.', 'Revati favours safe journeys, kindness and finishing things well.',
];
const NAK_CLASS = ['active','intense','mixed','steady','steady','intense','active','active','intense','intense','intense','steady','active','steady','active','mixed','steady','intense','intense','intense','steady','active','active','mixed','intense','steady','steady'] as const;
const HOUSE_THEME = [
  '', 'The Moon is in your own sign, so feelings and instincts run strong. Trust your gut, but do not reply in haste.',
  'The Moon is in your 2nd house of money and speech. Watch what you say and what you spend.',
  'The Moon is in your 3rd house: good for talking, short trips and acting with courage.',
  'The Moon is in your 4th house of home and peace. Family and property matters come forward and the mind wants comfort.',
  'The Moon is in your 5th house: study, creativity and children are favoured.',
  'The Moon is in your 6th house: good for clearing debts, facing competition and fixing health routines.',
  'The Moon is in your 7th house of partnerships: good for meetings, spouses and joint decisions.',
  'The Moon is in your 8th house. Be careful with temper and money, and avoid starting anything large.',
  'The Moon is in your 9th house of luck and learning: favourable for teachers, blessings and travel.',
  'The Moon is in your 10th house of career: your work is in focus and visible to others.',
  'The Moon is in your 11th house of gains: friends and income are supportive.',
  'The Moon is in your 12th house: expenses, rest and quiet reflection. Keep plans light.',
];
const WD_THEME = [
  'Sunday: begin with a minute facing the sun, and look after your health and the elders at home.',
  'Monday is Shiva’s day: keep the mind calm and be kind to your mother and the women of the family.',
  'Tuesday belongs to Hanuman and Subramanya: put energy into effort, not into arguments.',
  'Wednesday favours writing, trade and study. Finish paperwork and messages that are pending.',
  'Thursday favours teachers, learning and good advice. Listen to someone older today.',
  'Friday favours family, comfort and the arts. Keep the home bright and orderly.',
  'Saturday rewards discipline. Do the long-pending, dull task today.',
];
const TAIL: Record<string, Record<string, string[]>> = {
  career: {
    steady: ['Slow, careful work counts for more than speed today.', 'Detail and follow-through will be noticed.', 'Finish what is half done before taking on anything new.', 'Consistency will earn more respect than a big gesture.'],
    active: ['Move quickly on one thing you have been delaying.', 'Quick replies and quick decisions pay off today.', 'Take the first step on a plan while the energy is with you.', 'A short, direct conversation can unblock a stalled task.'],
    intense: ['Keep a cool head with colleagues; pressure is higher than usual.', 'Focus on one hard task rather than several easy ones.', 'Do not take sharp words at work personally today.', 'Keep your tone even when deadlines press.'],
    mixed: ['Keep your plans flexible, as priorities may shift by evening.', 'Handle the important call before noon.', 'Write down your top three tasks and stop at three.', 'Leave room in the schedule for one surprise.'],
  },
  money: {
    steady: ['A good day to save, repay or record expenses.', 'Stable choices beat clever ones with money today.', 'Review your bills and subscriptions today.', 'Put a small fixed amount aside before you spend.'],
    active: ['Small, fast transactions go well, but skip big commitments.', 'Check payments twice before sending.', 'Act on a small bargain you have already researched.', 'Avoid signing anything you have not read in full.'],
    intense: ['Avoid impulse spending when you feel pressed.', 'Do not lend or borrow in a hurry today.', 'Delay any large purchase until tomorrow.', 'Keep receipts and records tidy today.'],
    mixed: ['Compare two options before you decide anything.', 'Keep a little extra in hand until evening.', 'Ask the price twice and sleep on any big choice.', 'Small savings add up more than you expect today.'],
  },
  relationships: {
    steady: ['Spend unhurried time with family and listen more than you speak.', 'A calm meal together does more than a big gesture.', 'Ask an elder about their day and listen fully.', 'Small acts of help at home will be remembered.'],
    active: ['A quick call or message will lift someone’s day.', 'Make the plan today rather than leaving it vague.', 'Reach out to a friend you have not spoken to lately.', 'A spontaneous visit or call will be welcomed.'],
    intense: ['Say less when you are upset and revisit the topic tomorrow.', 'Old topics can flare up, so let them pass.', 'Take a walk before answering a hurtful message.', 'Apologise first if you can; it costs little today.'],
    mixed: ['Be flexible about timing and keep your tone light.', 'Do not read too much into a short reply.', 'Check in rather than assume how someone feels.', 'Keep plans loose and good humour close.'],
  },
  health: {
    steady: ['Regular meals and an early night help you most.', 'A gentle walk or stretching suits the day.', 'Warm food and enough water will keep you steady.', 'Ten quiet minutes before bed will help you sleep.'],
    active: ['Channel the energy into a brisk walk or exercise.', 'Drink water and avoid skipping meals while busy.', 'Move your body for at least twenty minutes today.', 'Stretch your back and shoulders between tasks.'],
    intense: ['Go easy on spicy food and screens late at night.', 'Take short breaks to settle a restless mind.', 'Slow breathing for a few minutes will calm the day.', 'Avoid heavy meals late at night.'],
    mixed: ['Keep your routine steady and do not overdo anything.', 'Listen to your body’s first signal of tiredness.', 'Sit up straight and take a break from the screen every hour.', 'Light, regular food suits you better than a feast.'],
  },
};
const LUCKY_COLORS = ['Red', 'White', 'Green', 'Yellow', 'Blue', 'Orange', 'Pink', 'Cream', 'Maroon', 'Saffron'];
const FRIENDS: Record<string, string[]> = {
  Sun: ['Moon', 'Mars', 'Jupiter'], Moon: ['Sun', 'Mercury'], Mars: ['Sun', 'Moon', 'Jupiter'], Mercury: ['Sun', 'Venus'],
  Jupiter: ['Sun', 'Moon', 'Mars'], Venus: ['Mercury', 'Saturn'], Saturn: ['Mercury', 'Venus'],
};
const ENEMIES: Record<string, string[]> = {
  Sun: ['Venus', 'Saturn'], Moon: [], Mars: ['Mercury'], Mercury: ['Moon'], Jupiter: ['Mercury', 'Venus'], Venus: ['Sun', 'Moon'], Saturn: ['Sun', 'Moon', 'Mars'],
};
const WD_LORD = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
const TARA = ['Janma', 'Sampat', 'Vipat', 'Kshema', 'Pratyak', 'Sadhana', 'Naidhana', 'Mitra', 'Parama Mitra'];
const TARA_GOOD = [0, 1, 0, 1, 0, 1, 0, 1, 1];

/** Day-specific adjustment from the Moon's phase, nakshatra and the weekday lord. Range roughly -0.45..0.45. */
function dayMicro(rashi: number, d: Date) {
  const tithi = Math.floor((((moonTrop(d) - sunTrop(d)) % 360) + 360) % 360 / 12);
  const nak = Math.floor(moonSid(d) / (360 / 27));
  const wd = new Date(d.getTime() + 5.5 * 3600000).getUTCDay();
  const mid = Math.floor(rashi * 2.25 + 1);
  const cat = (((nak - mid) % 27) + 27) % 27 % 9;
  const cls = NAK_CLASS[nak];
  const lord = RASHIS[rashi].lord, wl = WD_LORD[wd];
  const fr = lord === wl || FRIENDS[wl].includes(lord) ? 1 : ENEMIES[wl].includes(lord) ? -1 : 0;
  let m = 0;
  m += tithi < 15 ? 0.08 : -0.08;
  if ([3, 8, 13, 18, 23, 28].includes(tithi)) m -= 0.08; // Rikta tithis
  m += TARA_GOOD[cat] ? 0.12 : cat === 0 ? 0 : -0.15;
  m += 0.12 * fr;
  m += cls === 'intense' ? -0.06 : cls === 'mixed' ? 0 : 0.04;
  return { m, tithi, nak, wd, cat, cls };
}

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
  let microSum = 0;
  let lastMicro: ReturnType<typeof dayMicro> | null = null;
  for (const d of ds) { lastMicro = dayMicro(rashi, d); microSum += lastMicro.m; }
  const micro = microSum / ds.length;
  const base = overall * (span === 'daily' ? 0.6 : 0.85) + micro * (span === 'daily' ? 1 : 0.5);
  const cls0 = span === 'daily' && lastMicro ? lastMicro.cls : 'mixed';
  const bias: Record<string, number> = span === 'daily'
    ? { career: cls0 === 'active' ? 0.15 : cls0 === 'intense' ? -0.05 : 0, money: cls0 === 'steady' ? 0.12 : cls0 === 'intense' ? -0.08 : 0, relationships: cls0 === 'steady' || cls0 === 'mixed' ? 0.1 : -0.06, health: cls0 === 'intense' ? -0.12 : 0.05 }
    : { career: 0, money: 0, relationships: 0, health: 0 };
  const band = bandOf(base);
  const clamp = (v: number) => Math.max(-1, Math.min(1, base * 0.7 + v * 0.8));
  const domains = (['career', 'money', 'relationships', 'health'] as const).map((k) => {
    const b = bandOf(clamp(dom[k] + bias[k]));
    return { key: k, label: { career: 'Career', money: 'Money', relationships: 'Relationships', health: 'Health' }[k], band: b, text: pick([...TEXT[k][b]], `${k}|${rashi}|${span}|${dayKey}`) + (span === 'daily' ? ' ' + pick(TAIL[k][cls0], `t|${k}|${rashi}|${dayKey}`) : '') };
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
  let daily: Reading['daily'];
  if (span === 'daily' && lastMicro) {
    const msg = sg.Moon;
    daily = {
      moon: HOUSE_THEME[house(msg, rashi)], nak: NAK_THEME[lastMicro.nak], weekday: WD_THEME[lastMicro.wd],
      tara: `${TARA[lastMicro.cat]} tara`, nakName: NAKSHATRAS[lastMicro.nak], moonHouse: house(msg, rashi),
    };
    factors.push(`the Moon in ${NAKSHATRAS[lastMicro.nak]} nakshatra (${TARA[lastMicro.cat]} tara from your rashi's central star)`);
    factors.push(`${WD_LORD[lastMicro.wd]}'s day (weekday lord)`);
  }
  return {
    span, start: dayKey, rating: stars(base), band, summary, domains, factors, daily,
    lucky: { color: LUCKY_COLORS[hash(`c|${rashi}|${dayKey}|${span}`) % LUCKY_COLORS.length], number: (hash(`${rashi}|${dayKey}|${span}`) % 9) + 1 },
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
