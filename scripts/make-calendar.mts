// Builds the downloadable Panchangam Calendar PDF (A4 landscape): cover, 12 months, key dates.
// Run: npx tsx scripts/make-calendar.mts 2027    (needs Playwright's Chromium; output goes to public/downloads)
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { panchangFor, WEEKDAYS } from '../src/lib/panchang';
import { allTithis } from '../src/lib/tithi';
import { allLunations, EN_MONTH_NAMES } from '../src/lib/lunar';

const YEAR = Number(process.argv[2] ?? 2027);
const ROOT = process.cwd();
const url = (p: string) => 'file://' + path.join(ROOT, p);
const key = (y: number, m: number, d: number) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

// ---- special days ----
type Mark = { kind: string; label: string };
const marks = new Map<string, Mark[]>();
const add = (k: string, m: Mark) => marks.set(k, [...(marks.get(k) ?? []), m]);
for (const o of allTithis('ekadashi')) add(o.key, { kind: 'ek', label: 'Ekadashi' });
for (const o of allTithis('pradosham')) add(o.key, { kind: 'pr', label: 'Pradosham' });
for (const o of allTithis('sankashti')) add(o.key, { kind: 'sk', label: 'Sankashti' });
for (const l of allLunations('amavasya')) add(l.key, { kind: 'am', label: 'Amavasya' });
for (const l of allLunations('pournami')) add(l.key, { kind: 'po', label: 'Pournami' });
const names = new Map<string, string>();
for (const o of allTithis('ekadashi')) names.set(o.key, o.name);
for (const l of allLunations('pournami')) if (l.occasion) names.set(l.key, l.occasion);
for (const l of allLunations('amavasya')) if (l.occasion) names.set(l.key, l.occasion);

// ---- a verse for each month ----
const VERSES = [
  ['2.47', 'karmaṇy evādhikāras te mā phaleṣu kadācana\nmā karma-phala-hetur bhūr mā te saṅgo \'stv akarmaṇi', 'Your right is to the action alone, never to its fruits. Do not make the fruit your motive, and do not cling to inaction.'],
  ['6.5', 'uddhared ātmanātmānaṁ nātmānam avasādayet\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ', 'Lift yourself by yourself. Do not let yourself sink. The self is its own friend and its own enemy.'],
  ['2.14', 'mātrā-sparśās tu kaunteya śītoṣṇa-sukha-duḥkha-dāḥ\nāgamāpāyino \'nityās tāṁs titikṣasva bhārata', 'Heat and cold, pleasure and pain come and go. They do not stay. Learn to bear them.'],
  ['4.7', 'yadā yadā hi dharmasya glānir bhavati bhārata\nabhyutthānam adharmasya tadātmānaṁ sṛjāmy aham', 'Whenever dharma fades and adharma rises, then I send myself forth.'],
  ['6.35', 'asaṁśayaṁ mahā-bāho mano durnigrahaṁ calam\nabhyāsena tu kaunteya vairāgyeṇa ca gṛhyate', 'The mind is restless and hard to hold. But it can be held by practice and by letting go.'],
  ['9.22', 'ananyāś cintayanto māṁ ye janāḥ paryupāsate\nteṣāṁ nityābhiyuktānāṁ yogakṣemaṁ vahāmy aham', 'To those who think of me alone and worship me steadily, I bring what they lack and keep what they have.'],
  ['12.13', 'adveṣṭā sarva-bhūtānāṁ maitraḥ karuṇa eva ca\nnirmamo nirahaṅkāraḥ sama-duḥkha-sukhaḥ kṣamī', 'Free from hatred toward all beings, friendly and compassionate, without possessiveness or ego, even in pain and pleasure, patient.'],
  ['2.22', 'vāsāṁsi jīrṇāni yathā vihāya navāni gṛhṇāti naro \'parāṇi\ntathā śarīrāṇi vihāya jīrṇāny anyāni saṁyāti navāni dehī', 'As one puts on new clothes and sets aside the worn ones, so the embodied self takes new bodies.'],
  ['9.26', 'patraṁ puṣpaṁ phalaṁ toyaṁ yo me bhaktyā prayacchati\ntad ahaṁ bhakty-upahṛtam aśnāmi prayatātmanaḥ', 'A leaf, a flower, a fruit, water: whoever offers it with devotion, I accept it.'],
  ['18.66', 'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja\nahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ', 'Let go of every burden and come to me for refuge. I will free you. Do not grieve.'],
  ['3.35', 'śreyān sva-dharmo viguṇaḥ para-dharmāt sv-anuṣṭhitāt\nsva-dharme nidhanaṁ śreyaḥ para-dharmo bhayāvahaḥ', 'Better your own path, even imperfectly walked, than another\'s path well walked.'],
  ['18.78', 'yatra yogeśvaraḥ kṛṣṇo yatra pārtho dhanur-dharaḥ\ntatra śrīr vijayo bhūtir dhruvā nītir matir mama', 'Where there is Krishna, the lord of yoga, and Arjuna with his bow, there are fortune, victory and steady wisdom.'],
];
const HEROES = ['temple-sunrise', 'kurukshetra-dawn', 'krishna-flute', 'shiva-symbols', 'goddess-temple', 'river-ganga', 'hill-sacred', 'om-lotus', 'moon-nakshatra', 'jyotirlinga-dawn', 'vishnu-symbols', 'temple-tirumala'];
const ACCENT = ['#b4530a', '#3d3a8f', '#7a5b00', '#8a3b12', '#a31650', '#0e7c7b', '#7a5b00', '#b4530a', '#3d3a8f', '#8a3b12', '#0e7c7b', '#a31650'];

const SHORT_TITHI: Record<string, string> = { Prathama: 'Padyami', Dvitiya: 'Vidiya', Tritiya: 'Tadiya', Chaturthi: 'Chavithi', Panchami: 'Panchami', Shashthi: 'Shashthi', Saptami: 'Saptami', Ashtami: 'Ashtami', Navami: 'Navami', Dashami: 'Dashami', Ekadashi: 'Ekadashi', Dvadashi: 'Dvadashi', Trayodashi: 'Trayodashi', Chaturdashi: 'Chaturdashi', Pournami: 'Pournami', Amavasya: 'Amavasya' };

const fmtD = (k: string) => { const [, m, d] = k.split('-').map(Number); return `${d} ${EN_MONTH_NAMES[m - 1].slice(0, 3)}`; };
const dim = (y: number, m: number) => new Date(Date.UTC(y, m, 0)).getUTCDate();
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const monthPages: string[] = [];
for (let m = 1; m <= 12; m++) {
  const first = new Date(Date.UTC(YEAR, m - 1, 1)).getUTCDay();
  const days = dim(YEAR, m);
  const cells: string[] = [];
  for (let i = 0; i < first; i++) cells.push('<div class="cell empty"></div>');
  for (let d = 1; d <= days; d++) {
    const k = key(YEAR, m, d);
    const p = panchangFor({ y: YEAR, m, d }, 'hyderabad');
    const t = p.tithi[0], nk = p.nakshatra[0];
    const wd = (first + d - 1) % 7;
    const mk = marks.get(k) ?? [];
    const tithiName = SHORT_TITHI[t.name] ?? t.name;
    const tags = mk.map((x) => `<span class="tag ${x.kind}">${x.label}</span>`).join('');
    cells.push(`<div class="cell ${wd === 0 ? 'sun' : ''} ${mk.length ? 'special' : ''}"><b class="n">${d}</b><span class="t">${esc(tithiName)} <i>${t.paksha === 'Shukla' ? 'S' : 'K'}</i></span><span class="k">${esc(nk.name)}</span>${tags}</div>`);
  }
  const keyDates = (kind: string) => [...marks].filter(([k, v]) => k.startsWith(`${YEAR}-${String(m).padStart(2, '0')}`) && v.some((x) => x.kind === kind)).map(([k]) => k).sort();
  const list = (kind: string, title: string) => { const ks = keyDates(kind); return ks.length ? `<div class="kd"><b>${title}</b> ${ks.map((k) => `${fmtD(k)}${kind === 'ek' && names.get(k) ? ` (${names.get(k)!.replace(' Ekadashi', '')})` : ''}`).join(', ')}</div>` : ''; };
  const [ref, skt, eng] = VERSES[m - 1];
  monthPages.push(`<section class="page month" style="--acc:${ACCENT[m - 1]}">
    <aside>
      <div class="brand">Southwala<i>.</i></div>
      <h1>${EN_MONTH_NAMES[m - 1]}</h1><div class="yr">${YEAR}</div>
      <img class="art" src="${url(`public/heroes/${HEROES[m - 1]}.svg`)}" />
      <div class="verse"><small>Bhagavad Gita ${ref}</small><pre>${esc(skt)}</pre><p>${esc(eng)}</p></div>
      <div class="kds">${list('ek', 'Ekadashi')}${list('pr', 'Pradosham')}${list('sk', 'Sankashti')}${list('am', 'Amavasya')}${list('po', 'Pournami')}</div>
    </aside>
    <main>
      <div class="dow">${WEEKDAYS.map((w) => `<span class="${w === 'Sunday' ? 'sun' : ''}">${w.slice(0, 3)}</span>`).join('')}</div>
      <div class="grid">${cells.join('')}</div>
      <footer>Tithi and nakshatra at sunrise, Hyderabad, Indian Standard Time. S = Shukla paksha, K = Krishna paksha. Dates of vratams follow common smarta rules, so confirm with your temple or family priest. southwala.com</footer>
    </main>
  </section>`);
}

// ---- key dates page ----
const eks = allTithis('ekadashi').filter((o) => o.observed.y === YEAR).map((o) => `<li><b>${fmtD(o.key)}</b> ${o.name.replace(' Ekadashi', '')}</li>`).join('');
const pours = allLunations('pournami').filter((l) => l.observed.y === YEAR).map((l) => `<li><b>${fmtD(l.key)}</b> ${esc(l.occasion ?? 'Pournami')}</li>`).join('');
const amas = allLunations('amavasya').filter((l) => l.observed.y === YEAR).map((l) => `<li><b>${fmtD(l.key)}</b> ${esc(l.occasion ?? 'Amavasya')}</li>`).join('');
const keyPage = `<section class="page keys"><div class="brand">Southwala<i>.</i></div><h1>Key dates ${YEAR}</h1>
  <div class="cols"><div><h2>Ekadashi</h2><ul>${eks}</ul></div><div><h2>Pournami</h2><ul>${pours}</ul></div><div><h2>Amavasya</h2><ul>${amas}</ul></div></div>
  <p class="note">Calculated from the positions of the Sun and Moon (Lahiri ayanamsa) for Hyderabad. Tithi times are the same across India; the day on which a vratam is kept can differ between traditions. For a rite or a vow, confirm the day with your priest or temple. Fresh daily panchangam, Rahu Kalam, horoscopes and stories at <b>southwala.com</b>. Write to us: hello@southwala.com</p></section>`;

const cover = `<section class="page cover">
  <img class="coverart" src="${url('public/heroes/temple-sunrise.svg')}" />
  <div class="cv"><div class="brand big">Southwala<i>.</i></div><div class="tag">Be South. Sanatan. Sacred.</div>
  <h1>Panchangam Calendar ${YEAR}</h1><p>Tithi, nakshatra, Ekadashi, Pradosham, Sankashti, Amavasya and Pournami for every day, with a verse from the Bhagavad Gita for each month.</p><div class="url">southwala.com</div></div>
</section>`;

const css = `
@font-face{font-family:Fraunces;src:url(${url('node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2')});font-weight:100 900}
@font-face{font-family:Inter;src:url(${url('node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2')});font-weight:100 900}
@font-face{font-family:Serif4;src:url(${url('node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-normal.woff2')});font-weight:200 900}
@page{size:297mm 210mm;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Inter,sans-serif;color:#1a1a1d;background:#fff}
.page{width:297mm;height:210mm;page-break-after:always;position:relative;overflow:hidden}
.brand{font:700 20px Fraunces,serif;letter-spacing:-.01em}.brand i{color:#d63a2a;font-style:normal}
.cover{background:#fdf1df;display:grid;grid-template-columns:1.05fr 1fr}
.coverart{width:100%;height:210mm;object-fit:cover}
.cv{padding:26mm 20mm;display:flex;flex-direction:column;justify-content:center}
.brand.big{font-size:54px}.cv .tag{letter-spacing:.2em;text-transform:uppercase;font-size:11px;color:#6a6a72;margin:6px 0 30mm}
.cv h1{font:700 44px/1.05 Fraunces,serif;margin-bottom:10mm}.cv p{font:400 15px/1.6 Serif4,serif;color:#35353b;max-width:90mm}.cv .url{margin-top:16mm;font-weight:600;color:#b4530a}
.month{display:grid;grid-template-columns:86mm 1fr}
.month aside{background:var(--acc);color:#fff;padding:11mm 9mm;display:flex;flex-direction:column}
.month aside .brand{font-size:16px;opacity:.95}
.month aside h1{font:700 40px/1 Fraunces,serif;margin-top:6mm}.month aside .yr{font:300 22px Fraunces,serif;opacity:.85;margin-bottom:5mm}
.month .art{width:100%;height:38mm;object-fit:cover;border-radius:5px}
.verse{margin-top:6mm}.verse small{font-size:8px;letter-spacing:.14em;text-transform:uppercase;opacity:.85}
.verse pre{font:italic 400 10.5px/1.45 Serif4,serif;white-space:pre-wrap;margin:5px 0}.verse p{font:400 11px/1.45 Serif4,serif;opacity:.95}
.kds{margin-top:auto;font-size:8.4px;line-height:1.5}.kd{margin-top:3px}.kd b{display:inline-block;min-width:54px}
.month main{padding:9mm 10mm 6mm 8mm;display:flex;flex-direction:column}
.dow{display:grid;grid-template-columns:repeat(7,1fr);gap:1.4mm;margin-bottom:1.4mm}
.dow span{font-size:8.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#6a6a72;padding:0 2px}.dow .sun{color:#c0301f}
.grid{display:grid;grid-template-columns:repeat(7,1fr);grid-auto-rows:1fr;gap:1.4mm;flex:1}
.cell{border:.3mm solid #e6e6e9;border-radius:2mm;padding:1.4mm 1.6mm;display:flex;flex-direction:column;min-height:0;overflow:hidden}
.cell.empty{border:0}
.cell .n{font:700 15px/1 Fraunces,serif}.cell.sun .n{color:#c0301f}
.cell .t{font-size:7.6px;font-weight:600;color:#35353b;margin-top:1.2mm;line-height:1.15}.cell .t i{font-style:normal;color:var(--acc);font-weight:700}
.cell .k{font-size:6.8px;color:#6a6a72;margin-top:.5mm}
.cell.special{background:#fff8ec;border-color:var(--acc)}
.tag{margin-top:.8mm;font-size:6.3px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;border-radius:1mm;padding:.35mm 1.2mm;color:#fff;align-self:flex-start}
.tag.ek{background:#2a5db0}.tag.pr{background:#6b3fa0}.tag.sk{background:#d9792b}.tag.am{background:#222}.tag.po{background:#c9971c}
.month footer{margin-top:2.5mm;font-size:6.8px;color:#6a6a72;line-height:1.4}
.keys{padding:14mm 16mm;background:#fff}.keys h1{font:700 36px Fraunces,serif;margin:4mm 0 6mm}
.keys .cols{display:grid;grid-template-columns:1.1fr 1.2fr 1.2fr;gap:10mm}.keys h2{font:700 15px Fraunces,serif;margin-bottom:2mm;color:#b4530a}
.keys ul{list-style:none;columns:1;font-size:9.6px;line-height:1.55}.keys li b{display:inline-block;min-width:36px}
.keys .note{margin-top:6mm;font-size:9.5px;line-height:1.6;color:#35353b;max-width:230mm}
`;
const html = `<!doctype html><html><head><meta charset="utf-8"><title>Southwala Panchangam Calendar ${YEAR}</title><style>${css}</style></head><body>${cover}${monthPages.join('')}${keyPage}</body></html>`;
const out = path.join(process.env.CAL_TMP ?? '/tmp', `calendar-${YEAR}.html`);
fs.writeFileSync(out, html);

const require = createRequire('/opt/node22/lib/node_modules/');
const { chromium } = require('playwright');
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
const pg = await b.newPage();
await pg.goto('file://' + out);
await pg.evaluate(() => document.fonts.ready);
fs.mkdirSync('public/downloads', { recursive: true });
await pg.pdf({ path: `public/downloads/southwala-panchangam-calendar-${YEAR}.pdf`, width: '297mm', height: '210mm', printBackground: true, margin: { top: '0', right: '0', bottom: '0', left: '0' } });
await b.close();
console.log('done', YEAR);
