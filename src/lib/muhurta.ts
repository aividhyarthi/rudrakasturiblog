// Plain-language guidance from the classical nakshatra classes, the tithi and the weekday. Traditional rules of thumb, not a substitute for a priest's muhurtham.
export type Verdict = 'good' | 'fine' | 'avoid';
const CLASS: Record<string, string> = {};
const set = (c: string, names: string[]) => names.forEach((n) => (CLASS[n] = c));
set('kshipra', ['Ashwini', 'Pushya', 'Hasta']);
set('chara', ['Punarvasu', 'Swati', 'Shravana', 'Dhanishta', 'Shatabhisha']);
set('sthira', ['Rohini', 'Uttara Phalguni', 'Uttara Ashadha', 'Uttara Bhadrapada']);
set('mridu', ['Mrigashira', 'Chitra', 'Anuradha', 'Revati']);
set('mishra', ['Krittika', 'Vishakha']);
set('ugra', ['Bharani', 'Magha', 'Purva Phalguni', 'Purva Ashadha', 'Purva Bhadrapada']);
set('tikshna', ['Ardra', 'Ashlesha', 'Jyeshtha', 'Mula']);

const DISHA = ['West', 'East', 'North', 'North', 'South', 'West', 'East']; // Sunday..Saturday: directions to avoid (Dishashool)
const RIKTA = ['Chaturthi', 'Navami', 'Chaturdashi', 'Amavasya'];

export function guidance(nak: string, tithi: string, weekday: number) {
  const c = CLASS[nak] ?? 'mishra';
  const rikta = RIKTA.includes(tithi);
  const down = (v: Verdict): Verdict => (rikta && v === 'good' ? 'fine' : v);
  const travel: Verdict = ['chara', 'kshipra', 'mridu'].includes(c) ? down('good') : c === 'ugra' || c === 'tikshna' ? 'avoid' : 'fine';
  const job: Verdict = ['kshipra', 'sthira', 'mridu'].includes(c) ? down('good') : c === 'ugra' || c === 'tikshna' ? 'avoid' : 'fine';
  const home: Verdict = c === 'sthira' ? down('good') : c === 'tikshna' || c === 'ugra' ? 'avoid' : 'fine';
  const why: Record<string, string> = {
    kshipra: 'a quick, light nakshatra, good for beginnings', chara: 'a moving nakshatra, good for journeys',
    sthira: 'a steady, fixed nakshatra, good for lasting things', mridu: 'a gentle nakshatra, good for friendly, soft starts',
    mishra: 'a mixed nakshatra, fine for routine work', ugra: 'a fierce nakshatra, better kept for routine work than new starts', tikshna: 'a sharp nakshatra, traditionally avoided for new starts',
  };
  return {
    note: `${nak} is ${why[c]}.${rikta ? ` ${tithi} is a tithi many families avoid for new starts.` : ''}`,
    rows: [
      { what: 'Travel', v: travel, text: `${travel === 'good' ? 'A good day to set out.' : travel === 'avoid' ? 'Better to postpone long journeys if you can.' : 'Fine for ordinary travel.'} Traditionally avoid facing ${DISHA[weekday]} when you leave (Dishashool); you can leave in another direction or after a short pause.` },
      { what: 'Joining a new job', v: job, text: job === 'good' ? 'Favourable. Choose Abhijit or the Amrit Kalam below, and avoid Rahu Kalam.' : job === 'avoid' ? 'Many would pick another day if the date is flexible.' : 'Fine. Pick Abhijit and avoid Rahu Kalam.' },
      { what: 'Starting a business or signing', v: job, text: job === 'good' ? 'Favourable for a first step.' : job === 'avoid' ? 'Better to wait for a gentler day if you can.' : 'Fine with the usual care.' },
      { what: 'Griha pravesham, buying a vehicle or property', v: home, text: home === 'good' ? 'Favourable. A steady day for lasting things.' : home === 'avoid' ? 'Choose another day if possible.' : 'Fine for small purchases. For big ones, ask your priest.' },
    ],
  };
}
