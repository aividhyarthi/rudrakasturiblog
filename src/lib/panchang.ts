// Panchangam computed from astronomy (astronomy-engine), Lahiri ayanamsa, Drik-style (true sunrise/sunset).
import * as A from 'astronomy-engine';

export const CITIES = {
  hyderabad: { name: 'Hyderabad', state: 'Telangana', lat: 17.385, lon: 78.4867 },
  visakhapatnam: { name: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.6868, lon: 83.2185 },
  vijayawada: { name: 'Vijayawada', state: 'Andhra Pradesh', lat: 16.5062, lon: 80.648 },
  tirupati: { name: 'Tirupati', state: 'Andhra Pradesh', lat: 13.6288, lon: 79.4192 },
  bengaluru: { name: 'Bengaluru', state: 'Karnataka', lat: 12.9716, lon: 77.5946 },
  chennai: { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lon: 80.2707 },
  kochi: { name: 'Kochi', state: 'Kerala', lat: 9.9312, lon: 76.2673 },
} as const;
export type CityId = keyof typeof CITIES;

const IST = 5.5 * 3600 * 1000;
const STEP = 360 / 27;
const norm = (x: number) => ((x % 360) + 360) % 360;

export const TITHIS = ['Prathama', 'Dvitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dvadashi', 'Trayodashi', 'Chaturdashi'];
export const TITHIS_TE = ['పాడ్యమి', 'విదియ', 'తదియ', 'చవితి', 'పంచమి', 'షష్ఠి', 'సప్తమి', 'అష్టమి', 'నవమి', 'దశమి', 'ఏకాదశి', 'ద్వాదశి', 'త్రయోదశి', 'చతుర్దశి'];
export const NAKSHATRAS = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'];
export const NAKSHATRAS_TE = ['అశ్విని', 'భరణి', 'కృత్తిక', 'రోహిణి', 'మృగశిర', 'ఆరుద్ర', 'పునర్వసు', 'పుష్యమి', 'ఆశ్లేష', 'మఖ', 'పుబ్బ', 'ఉత్తర', 'హస్త', 'చిత్త', 'స్వాతి', 'విశాఖ', 'అనూరాధ', 'జ్యేష్ఠ', 'మూల', 'పూర్వాషాఢ', 'ఉత్తరాషాఢ', 'శ్రవణం', 'ధనిష్ఠ', 'శతభిష', 'పూర్వాభాద్ర', 'ఉత్తరాభాద్ర', 'రేవతి'];
export const YOGAS = ['Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarma', 'Dhriti', 'Shula', 'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyana', 'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti'];
const KARANA_MOVABLE = ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti'];
export const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const WEEKDAYS_TE = ['ఆదివారం', 'సోమవారం', 'మంగళవారం', 'బుధవారం', 'గురువారం', 'శుక్రవారం', 'శనివారం'];

// Lahiri (Chitrapaksha) ayanamsa, accurate to about 0.01 degrees for this century.
export function ayanamsa(d: Date) {
  const years = (d.getTime() - Date.UTC(2000, 0, 1, 12)) / (365.2425 * 86400000);
  return 23.8530 + years * 0.013969;
}
export const sunTrop = (d: Date) => A.SunPosition(d).elon;
export const moonTrop = (d: Date) => A.EclipticGeoMoon(d).lon;
export const sunSid = (d: Date) => norm(sunTrop(d) - ayanamsa(d));
export const moonSid = (d: Date) => norm(moonTrop(d) - ayanamsa(d));

const angles = {
  tithi: (d: Date) => norm(moonTrop(d) - sunTrop(d)) / 12, // 0..30
  karana: (d: Date) => norm(moonTrop(d) - sunTrop(d)) / 6, // 0..60
  nakshatra: (d: Date) => moonSid(d) / STEP, // 0..27
  yoga: (d: Date) => norm(moonSid(d) + sunSid(d)) / STEP, // 0..27
};

// Next moment after `from` when floor(angle) changes. Moon/sun move slowly, so 10-minute steps then bisection.
function nextChange(f: (d: Date) => number, from: Date): Date {
  const base = Math.floor(f(from));
  let lo = from.getTime();
  let hi = lo;
  for (let i = 0; i < 400; i++) {
    hi = lo + 10 * 60000;
    if (Math.floor(f(new Date(hi))) !== base) break;
    lo = hi;
  }
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    if (Math.floor(f(new Date(mid))) === base) lo = mid;
    else hi = mid;
  }
  return new Date(hi);
}

export const istParts = (d: Date) => new Date(d.getTime() + IST);
export function fmtTime(d: Date, refDay?: Date) {
  const t = istParts(d);
  let h = t.getUTCHours();
  const m = String(t.getUTCMinutes()).padStart(2, '0');
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  let s = `${h}:${m} ${ap}`;
  if (refDay) {
    const dd = Math.round((Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()) - Date.UTC(refDay.getUTCFullYear(), refDay.getUTCMonth(), refDay.getUTCDate())) / 86400000);
    if (dd > 0) s += ` (next day)`;
  }
  return s;
}

type Seg = { name: string; te?: string; endsAt: Date; paksha?: string; index: number };

function sequence(kind: 'tithi' | 'nakshatra' | 'yoga' | 'karana', from: Date, until: Date): Seg[] {
  const out: Seg[] = [];
  let t = from;
  for (let i = 0; i < 6; i++) {
    const idx = Math.floor(angles[kind](t));
    const end = nextChange(angles[kind], t);
    out.push({ ...describe(kind, idx), endsAt: end, index: idx });
    if (end >= until) break;
    t = new Date(end.getTime() + 1000);
  }
  return out;
}

function describe(kind: string, idx: number): { name: string; te?: string; paksha?: string } {
  if (kind === 'tithi') {
    const paksha = idx < 15 ? 'Shukla' : 'Krishna';
    const n = idx % 15;
    if (idx === 14) return { name: 'Purnima', te: 'పౌర్ణమి', paksha };
    if (idx === 29) return { name: 'Amavasya', te: 'అమావాస్య', paksha };
    return { name: TITHIS[n], te: TITHIS_TE[n], paksha };
  }
  if (kind === 'nakshatra') return { name: NAKSHATRAS[idx % 27], te: NAKSHATRAS_TE[idx % 27] };
  if (kind === 'yoga') return { name: YOGAS[idx % 27] };
  // karana: 0..59
  if (idx === 0) return { name: 'Kimstughna' };
  if (idx >= 57) return { name: ['Shakuni', 'Chatushpada', 'Naga'][idx - 57] };
  return { name: KARANA_MOVABLE[(idx - 1) % 7] };
}

export function sunTimes(date: Date, c: { lat: number; lon: number }) {
  const obs = new A.Observer(c.lat, c.lon, 0);
  // `date` is a UTC instant at 00:00 IST of the local day minus 1h to be safe
  const rise = A.SearchRiseSet('Sun', obs, +1, date, 1)!.date;
  const set = A.SearchRiseSet('Sun', obs, -1, rise, 1)!.date;
  const mrise = A.SearchRiseSet('Moon', obs, +1, date, 1)?.date ?? null;
  const mset = A.SearchRiseSet('Moon', obs, -1, date, 1)?.date ?? null;
  return { rise: rise as Date, set: set as Date, mrise: mrise as Date | null, mset: mset as Date | null };
}

const RAHU = [8, 2, 7, 5, 6, 4, 3]; // Sun..Sat, 1-indexed eighth of the day
const YAMA = [5, 4, 3, 2, 1, 7, 6];
const GULIKA = [7, 6, 5, 4, 3, 2, 1];

export type Day = ReturnType<typeof panchangFor>;

/** ymd = local IST calendar date */
export function panchangFor(ymd: { y: number; m: number; d: number }, cityId: CityId) {
  const city = CITIES[cityId];
  const dayStartUtc = new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d) - IST); // 00:00 IST
  const wd = new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d)).getUTCDay();
  const st = sunTimes(dayStartUtc, city);
  const len = st.set.getTime() - st.rise.getTime();
  const part = (n: number) => ({ start: new Date(st.rise.getTime() + ((n - 1) * len) / 8), end: new Date(st.rise.getTime() + (n * len) / 8) });
  const muh = len / 15;
  const dayEnd = new Date(dayStartUtc.getTime() + 24 * 3600 * 1000);
  // Panchang elements are quoted for sunrise; list everything running through the civil day.
  const from = new Date(st.rise.getTime());
  const seq = (k: 'tithi' | 'nakshatra' | 'yoga' | 'karana') => sequence(k, from, dayEnd);
  return {
    ymd, city: cityId, weekday: wd,
    sunrise: st.rise, sunset: st.set, moonrise: st.mrise, moonset: st.mset,
    tithi: seq('tithi'), nakshatra: seq('nakshatra'), yoga: seq('yoga'), karana: seq('karana'),
    rahu: part(RAHU[wd]), yama: part(YAMA[wd]), gulika: part(GULIKA[wd]),
    abhijit: { start: new Date(st.rise.getTime() + 7 * muh), end: new Date(st.rise.getTime() + 8 * muh) },
    brahma: { start: new Date(st.rise.getTime() - 96 * 60000), end: new Date(st.rise.getTime() - 48 * 60000) },
    moonSign: Math.floor(moonSid(new Date(st.rise.getTime() + len / 2)) / 30),
  };
}

export const todayIST = () => {
  const t = istParts(new Date());
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
};
export const addDays = (ymd: { y: number; m: number; d: number }, n: number) => {
  const t = new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d + n));
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
};
export const ymdKey = (x: { y: number; m: number; d: number }) => `${x.y}-${String(x.m).padStart(2, '0')}-${String(x.d).padStart(2, '0')}`;
export const parseKey = (s: string) => { const [y, m, d] = s.split('-').map(Number); return { y, m, d }; };
