// Builds the downloadable Panchangam Calendar PDF (A4 landscape): cover, 12 months, key dates.
// Run: npx tsx scripts/make-calendar.mts 2027    (needs Playwright's Chromium; output goes to public/downloads)
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { panchangFor, WEEKDAYS } from '../src/lib/panchang';
import { allTithis } from '../src/lib/tithi';
import { marks, names, VERSES, SHORT_TITHI, monthDays } from '../src/lib/yearcal';
import { allLunations, EN_MONTH_NAMES } from '../src/lib/lunar';

const YEAR = Number(process.argv[2] ?? 2027);
const ROOT = process.cwd();
const url = (p: string) => 'file://' + path.join(ROOT, p);
const key = (y: number, m: number, d: number) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

const HEROES = ['temple-sunrise', 'kurukshetra-dawn', 'krishna-flute', 'shiva-symbols', 'goddess-temple', 'river-ganga', 'hill-sacred', 'om-lotus', 'moon-nakshatra', 'jyotirlinga-dawn', 'vishnu-symbols', 'temple-tirumala'];
const ACCENT = ['#b4530a', '#3d3a8f', '#7a5b00', '#8a3b12', '#a31650', '#0e7c7b', '#7a5b00', '#b4530a', '#3d3a8f', '#8a3b12', '#0e7c7b', '#a31650'];


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
  const fes = [...marks].filter(([k]) => k.startsWith(`${YEAR}-${String(m).padStart(2, '0')}`)).flatMap(([k, v]) => v.filter((x) => x.kind === 'fe').map((x) => `${fmtD(k)} ${x.label}`)).sort((a, b) => Number(a.split(' ')[0]) - Number(b.split(' ')[0]));
  const festList = fes.length ? `<div class="kd fe"><b>Festivals</b><br>${fes.map(esc).join('<br>')}</div>` : '';
  const [ref, skt, eng] = VERSES[m - 1];
  monthPages.push(`<section class="page month" style="--acc:${ACCENT[m - 1]}">
    <aside>
      <div class="brand">Southwala<i>.</i></div>
      <h1>${EN_MONTH_NAMES[m - 1]}</h1><div class="yr">${YEAR}</div>
      <img class="art" src="${url(`public/heroes/${HEROES[m - 1]}.svg`)}" />
      <div class="verse"><small>Bhagavad Gita ${ref}</small><pre>${esc(skt)}</pre><p>${esc(eng)}</p></div>
      <div class="kds">${list('ek', 'Ekadashi')}${list('pr', 'Pradosham')}${list('sk', 'Sankashti')}${list('am', 'Amavasya')}${list('po', 'Pournami')}${festList}</div>
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
.month .art{width:100%;height:30mm;object-fit:cover;border-radius:5px}
.verse{margin-top:6mm}.verse small{font-size:8px;letter-spacing:.14em;text-transform:uppercase;opacity:.85}
.verse pre{font:italic 400 10.5px/1.45 Serif4,serif;white-space:pre-wrap;margin:5px 0}.verse p{font:400 11px/1.45 Serif4,serif;opacity:.95}
.kds{margin-top:auto;font-size:8.4px;line-height:1.5}.kd{margin-top:3px}.kd.fe{margin-top:5px;font-weight:600;line-height:1.45}.kd b{display:inline-block;min-width:54px}
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
.tag.ek{background:#2a5db0}.tag.pr{background:#6b3fa0}.tag.sk{background:#d9792b}.tag.am{background:#222}.tag.po{background:#c9971c}.tag.fe{background:#a31650;white-space:normal;line-height:1.15}.tag.fe{background:#a31650}
.month footer{margin-top:2.5mm;font-size:6.8px;color:#6a6a72;line-height:1.4}
.keys{padding:14mm 16mm;background:#fff}.keys h1{font:700 36px Fraunces,serif;margin:4mm 0 6mm}
.keys .cols{display:grid;grid-template-columns:1.1fr 1.2fr 1.2fr;gap:10mm}.keys h2{font:700 15px Fraunces,serif;margin-bottom:2mm;color:#b4530a}
.keys ul{list-style:none;columns:1;font-size:9.6px;line-height:1.55}.keys li b{display:inline-block;min-width:36px}
.keys .note{margin-top:6mm;font-size:9.5px;line-height:1.6;color:#35353b;max-width:230mm}
`;
const html = `<!doctype html><html><head><meta charset="utf-8"><title>Southwala Panchangam Calendar ${YEAR}</title><style>${css}</style></head><body>${cover}${monthPages.join('')}${keyPage}</body></html>`;
const out = path.join(process.env.CAL_TMP ?? '/tmp', `calendar-${YEAR}.html`);
fs.writeFileSync(out, html);


// ---- phone edition: portrait pages, one month per page, a plain list of days in large type ----
const mobMonths: string[] = [];
for (let m = 1; m <= 12; m++) {
  const rows = monthDays(YEAR, m).map((x) => {
    const tags = x.marks.map((t) => `<span class="tag ${t.kind}">${t.label}</span>`).join('');
    const nm = x.name && x.marks.length ? `<em>${esc(x.name)}</em>` : '';
    return `<div class="r ${x.wd === 0 ? 'sun' : ''} ${x.marks.length ? 'sp' : ''}"><b>${x.d}</b><u>${WEEKDAYS[x.wd].slice(0, 3)}</u><span>${esc(x.tithi)} <i>${x.paksha === 'Shukla' ? 'S' : 'K'}</i><small>${esc(x.nak)}</small>${nm}</span><s>${tags}</s></div>`;
  }).join('');
  const [ref, skt, eng] = VERSES[m - 1];
  mobMonths.push(`<section class="mp" style="--acc:${ACCENT[m - 1]}"><header><div class="brand">Southwala<i>.</i></div><h1>${EN_MONTH_NAMES[m - 1]} ${YEAR}</h1><p class="v"><small>Gita ${ref}</small> ${esc(eng)}</p></header>${rows}<footer>Tithi at sunrise, Hyderabad (IST). S = Shukla, K = Krishna paksha. Confirm vratam days with your priest. southwala.com</footer></section>`);
}
const mcss = `
@font-face{font-family:Fraunces;src:url(${url('node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2')});font-weight:100 900}
@font-face{font-family:Inter;src:url(${url('node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2')});font-weight:100 900}
@page{size:110mm 420mm;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Inter,sans-serif;color:#1a1a1d}
.mp{width:110mm;height:420mm;page-break-after:always;padding:7mm 6mm 4mm;overflow:hidden;background:#fff}
.brand{font:700 15px Fraunces,serif}.brand i{color:#d63a2a;font-style:normal}
header{background:var(--acc);color:#fff;margin:-7mm -6mm 3mm;padding:6mm 6mm 4mm}
header h1{font:700 29px/1.1 Fraunces,serif;margin:3mm 0 2mm}
header .v{font:400 11.5px/1.4 Inter,sans-serif;opacity:.95}header .v small{font-weight:700;letter-spacing:.08em;text-transform:uppercase;font-size:9.5px;margin-right:4px}
.r{display:grid;grid-template-columns:8mm 9mm 1fr auto;align-items:center;gap:1.4mm;padding:1.1mm 1mm;border-bottom:.25mm solid #eee;font-size:13px;line-height:1.2}
.r b{font:700 16px Fraunces,serif;text-align:right}.r u{text-decoration:none;font-size:11px;color:#6a6a72;font-weight:600}
.r.sun b,.r.sun u{color:#c0301f}
.r span{font-weight:600}.r span i{font-style:normal;color:var(--acc);font-weight:700;font-size:11px}
.r small{display:block;font-weight:400;font-size:11px;color:#6a6a72}.r em{display:block;font-style:normal;font-size:10.5px;color:var(--acc);font-weight:600}
.r.sp{background:#fff6e6}
.r s{text-decoration:none;display:flex;flex-direction:column;gap:.6mm;align-items:flex-end}
.tag{font-size:9.5px;font-weight:700;border-radius:1mm;padding:.5mm 1.6mm;color:#fff;text-transform:uppercase;letter-spacing:.03em}
.tag.ek{background:#2a5db0}.tag.pr{background:#6b3fa0}.tag.sk{background:#d9792b}.tag.am{background:#222}.tag.po{background:#c9971c}.tag.fe{background:#a31650;white-space:normal;line-height:1.15}.tag.fe{background:#a31650;text-transform:none;letter-spacing:0}
.mp footer{margin-top:2mm;font-size:9px;color:#6a6a72;line-height:1.35}
`;
const mhtml = `<!doctype html><html><head><meta charset="utf-8"><title>Southwala Panchangam Calendar ${YEAR} (phone edition)</title><style>${mcss}</style></head><body>${mobMonths.join('')}</body></html>`;
const mout = path.join(process.env.CAL_TMP ?? '/tmp', `calendar-${YEAR}-mobile.html`);
fs.writeFileSync(mout, mhtml);

const require = createRequire('/opt/node22/lib/node_modules/');
const { chromium } = require('playwright');
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
const pg = await b.newPage();
await pg.goto('file://' + out);
await pg.evaluate(() => document.fonts.ready);
fs.mkdirSync('public/downloads', { recursive: true });
await pg.pdf({ path: `public/downloads/southwala-panchangam-calendar-${YEAR}.pdf`, width: '297mm', height: '210mm', printBackground: true, margin: { top: '0', right: '0', bottom: '0', left: '0' } });
const pm = await b.newPage();
await pm.goto('file://' + mout);
await pm.evaluate(() => document.fonts.ready);
await pm.pdf({ path: `public/downloads/southwala-panchangam-calendar-${YEAR}-phone.pdf`, width: '110mm', height: '420mm', printBackground: true, margin: { top: '0', right: '0', bottom: '0', left: '0' } });
await b.close();
console.log('done', YEAR);
