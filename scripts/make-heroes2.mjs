// Rashi illustrations (12) and individual temple scenes. Run: node scripts/make-heroes2.mjs
import fs from 'node:fs';
import { W, H, svg, rnd, flame, diya, garland, gopuram, stars, hills, lotus, hibiscus } from './lib/art.mjs';
const glyphs = JSON.parse(fs.readFileSync('src/data/zodiac-glyphs.json', 'utf8'));
const out = {};

// ---------- rashis ----------
const ELEMENT = {
  fire: { bg1: '#4a0d14', bg2: '#a1301a', acc: '#ffb347', ring: '#ffd98a', glow: '#ff7a3d' },
  earth: { bg1: '#0c2a1a', bg2: '#256b3e', acc: '#e8c77a', ring: '#f1dc9a', glow: '#7ed39a' },
  air: { bg1: '#10153f', bg2: '#3446a6', acc: '#b9d2ff', ring: '#dbe8ff', glow: '#8fb1ff' },
  water: { bg1: '#052630', bg2: '#13707f', acc: '#9eeae4', ring: '#c9f5f1', glow: '#58d6d0' },
};
const SIGNS = [
  ['mesha', 'fire', '#ff5d3d'], ['vrishabha', 'earth', '#f4a8c8'], ['mithuna', 'air', '#7bd88f'], ['karkataka', 'water', '#e8ecf5'],
  ['simha', 'fire', '#ffd043'], ['kanya', 'earth', '#7bd88f'], ['tula', 'air', '#f4a8c8'], ['vrischika', 'water', '#ff5d3d'],
  ['dhanu', 'fire', '#f6d36a'], ['makara', 'earth', '#8aa0d8'], ['kumbha', 'air', '#8aa0d8'], ['meena', 'water', '#f6d36a'],
];
SIGNS.forEach(([id, el, planet], si) => {
  const E = ELEMENT[el]; const r = rnd(100 + si * 7);
  const defs = `<radialGradient id="bg" cx=".5" cy=".5" r=".8"><stop offset="0" stop-color="${E.bg2}"/><stop offset="1" stop-color="${E.bg1}"/></radialGradient><radialGradient id="glow"><stop offset="0" stop-color="${E.glow}" stop-opacity=".55"/><stop offset="1" stop-color="${E.glow}" stop-opacity="0"/></radialGradient><radialGradient id="disk" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="${E.bg2}"/><stop offset="1" stop-color="${E.bg1}"/></radialGradient>`;
  let b = `<rect width="${W}" height="${H}" fill="url(#bg)"/>${stars(110, 200 + si, H, E.ring)}<circle cx="800" cy="450" r="340" fill="url(#glow)"/><g transform="translate(800 450) scale(0.68)">`;
  b += `<circle r="410" fill="none" stroke="${E.acc}" stroke-width="3"/><circle r="396" fill="none" stroke="${E.acc}" stroke-width="1.5" opacity=".6"/>`;
  for (let i = 0; i < 72; i++) b += `<line x1="0" y1="-396" x2="0" y2="${i % 6 === 0 ? -372 : -384}" stroke="${E.acc}" stroke-width="${i % 6 === 0 ? 3 : 1.5}" transform="rotate(${i * 5})"/>`;
  for (let i = 0; i < 24; i++) b += `<path d="M0 -300 C-26 -330 -26 -366 0 -386 C26 -366 26 -330 0 -300Z" fill="${E.acc}" opacity="${i % 2 ? 0.35 : 0.6}" transform="rotate(${i * 15})"/>`;
  b += `<circle r="288" fill="none" stroke="${E.acc}" stroke-width="2"/>`;
  for (let i = 0; i < 12; i++) b += `<circle cx="0" cy="-262" r="${i === si ? 13 : 7}" fill="${i === si ? E.ring : E.acc}" transform="rotate(${i * 30})"/>`;
  b += `<circle r="236" fill="url(#disk)" stroke="${E.ring}" stroke-width="5"/><circle r="214" fill="none" stroke="${E.acc}" stroke-width="2" opacity=".7"/>`;
  b += `<g transform="translate(-134 -134) scale(1.34)"><path d="${glyphs[id]}" fill="none" stroke="${E.glow}" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" opacity=".35"/><path d="${glyphs[id]}" fill="none" stroke="${E.ring}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></g></g>`;
  // constellation + ruling planet
  const pts = Array.from({ length: 6 }, (_, i) => [1180 + r() * 300, 200 + i * 38 + r() * 40]);
  b += `<polyline points="${pts.map((p) => p.map((v) => v.toFixed(0)).join(',')).join(' ')}" fill="none" stroke="${E.ring}" stroke-width="2" opacity=".6"/>` + pts.map((p) => `<circle cx="${p[0].toFixed(0)}" cy="${p[1].toFixed(0)}" r="7" fill="${E.ring}"/>`).join('');
  b += `<circle cx="260" cy="610" r="40" fill="${planet}"/><circle cx="260" cy="610" r="40" fill="none" stroke="${E.ring}" stroke-width="3"/><ellipse cx="260" cy="610" rx="74" ry="12" fill="none" stroke="${E.ring}" stroke-width="3" opacity=".7"/>`;
  out[`rashi-${id}`] = svg(defs, b);
});

// ---------- temples ----------
const sky = (id, stops) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
const halo = (id, c) => `<radialGradient id="${id}"><stop offset="0" stop-color="${c}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;
const tree = (x, y, s, c = '#0f2f1d') => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-6" y="-40" width="12" height="46" fill="#2a1a10"/><circle cx="0" cy="-70" r="40" fill="${c}"/><circle cx="-30" cy="-50" r="30" fill="${c}"/><circle cx="30" cy="-52" r="30" fill="${c}"/></g>`;
const birds = (x, y) => [0, 1, 2, 3].map((i) => `<path d="M${x + i * 46} ${y + (i % 2) * 18} q10 -12 20 0 q10 -12 20 0" fill="none" stroke="#3b2418" stroke-width="3" stroke-linecap="round"/>`).join('');

// Tirumala: seven hills, golden vimana, winding steps
{
  const defs = sky('s', [[0, '#ffd9b3'], [0.5, '#f7a77c'], [1, '#ec7a5d']]) + halo('h', '#fff1c9');
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/><circle cx="800" cy="400" r="360" fill="url(#h)"/><circle cx="800" cy="400" r="86" fill="#ffe08a"/>`;
  const peaks = [[0, 560], [230, 470], [430, 400], [640, 330], [850, 300], [1060, 350], [1260, 430], [1440, 500], [1600, 570]];
  const layer = (dy, col, op = 1) => { let d = `M0 ${H} L0 ${peaks[0][1] + dy}`; peaks.forEach(([x, y]) => (d += ` L${x} ${y + dy}`)); return `<path d="${d} L${W} ${H}Z" fill="${col}" opacity="${op}"/>`; };
  b += layer(60, '#9b4a5a', 0.85) + layer(120, '#6b3a5e') + layer(200, '#3b2a55');
  // vimana on the central hill
  b += `<g transform="translate(850 300)"><path d="M-46 0 L-34 -34 H34 L46 0Z" fill="#e0a43a"/><path d="M-34 -34 L-24 -66 H24 L34 -34Z" fill="#f0bd4d"/><path d="M-24 -66 L-14 -92 H14 L24 -66Z" fill="#e0a43a"/><path d="M-14 -92 Q0 -128 14 -92Z" fill="#f0bd4d"/><rect x="-2" y="-146" width="4" height="30" fill="#e0a43a"/><circle cx="0" cy="-150" r="6" fill="#ffe08a"/></g>`;
  // zigzag steps up the hill
  b += `<path d="M300 880 L520 800 L430 740 L660 690 L600 640 L790 600 L740 560 L850 520" fill="none" stroke="#f3d79a" stroke-width="10" stroke-linecap="round" opacity=".85"/>`;
  b += `<rect y="800" width="${W}" height="100" fill="#2a1a3a"/>` + tree(90, 830, 1.6, '#1a3f2a') + tree(1500, 840, 1.8, '#1a3f2a') + tree(1350, 850, 1.1, '#1a3f2a') + tree(260, 850, 1.0, '#1a3f2a') + birds(1000, 170);
  b += garland(0, 36, 520, 36, 60, 18, 3) + garland(1080, 36, 1600, 36, 60, 18, 4);
  out['temple-tirumala'] = svg(defs, b);
}
// Srisailam: forest hills, Krishna river, hilltop temple
{
  const defs = sky('s', [[0, '#cfe9d2'], [0.6, '#8cc79d'], [1, '#3f8f6a']]) + halo('h', '#f9ffe0');
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/><circle cx="1180" cy="260" r="260" fill="url(#h)"/><circle cx="1180" cy="260" r="64" fill="#fffbe0"/>`;
  b += hills(470, '#3f8f6a', 61, 110) + hills(560, '#2c7455', 62, 90) + hills(650, '#1d5a42', 63, 70);
  // temple compound on ridge
  b += `<g transform="translate(560 520)"><rect x="-260" y="-22" width="520" height="62" fill="#c9b68c"/><rect x="-260" y="-30" width="520" height="10" fill="#8a7448"/>`;
  for (const x of [-230, 230]) b += `<path d="M${x - 34} -30 L${x - 22} -80 H${x + 22} L${x + 34} -30Z" fill="#b99a64"/><path d="M${x - 22} -80 L${x - 12} -112 H${x + 12} L${x + 22} -80Z" fill="#d1b27a"/><circle cx="${x}" cy="-118" r="6" fill="#f2c35b"/>`;
  b += `<path d="M-90 -30 L-70 -110 H70 L90 -30Z" fill="#d1b27a"/><path d="M-70 -110 L-50 -170 H50 L70 -110Z" fill="#c9a96a"/><path d="M-50 -170 L-30 -214 H30 L50 -170Z" fill="#d1b27a"/><path d="M-30 -214 Q0 -262 30 -214Z" fill="#c9a96a"/><circle cx="0" cy="-268" r="7" fill="#f2c35b"/>${flame(-110, 20, 0.7)}${flame(110, 20, 0.7)}</g>`;
  b += `<path d="M0 760 C300 700 520 790 820 740 S1300 690 1600 750 V900 H0Z" fill="#2b7fb5"/><path d="M0 820 C300 780 540 850 840 810 S1300 770 1600 820 V900 H0Z" fill="#1f6a9c"/><path d="M200 800 C400 790 600 810 800 798" stroke="#bfe6ff" stroke-width="4" opacity=".6" fill="none"/>`;
  b += tree(120, 790, 1.5, '#12402d') + tree(1480, 800, 1.7, '#12402d') + tree(1330, 800, 1.1, '#12402d');
  b += `<path d="M0 330 C300 300 600 360 900 320" stroke="#fff" stroke-width="26" opacity=".18" fill="none"/><path d="M700 420 C1000 390 1300 440 1600 400" stroke="#fff" stroke-width="22" opacity=".15" fill="none"/>` + birds(260, 190);
  out['temple-srisailam'] = svg(defs, b);
}
// Bhadrachalam: Godavari, ghat steps, riverside temple, boat
{
  const defs = sky('s', [[0, '#ffe6b0'], [0.55, '#f9b66c'], [1, '#e5764a']]) + halo('h', '#fff0bf');
  const pal = { a: '#d9a35a', b: '#c58a3f', dark: '#6b3a1e', trim: '#f6d27a', win: '#8a4a1a', door: '#4b240f' };
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/><circle cx="1200" cy="470" r="300" fill="url(#h)"/><circle cx="1200" cy="470" r="90" fill="#ffd36b"/>`;
  b += hills(560, '#b9633e', 71, 70);
  b += gopuram(420, 700, 360, 6, 56, pal) + `<rect x="120" y="684" width="640" height="26" fill="#8a5a2a"/>`;
  for (let i = 0; i < 6; i++) b += `<rect x="${200 + i * 36}" y="${710 + i * 22}" width="${480 - i * 72}" height="22" fill="${i % 2 ? '#d7b98a' : '#c9a572'}"/>`;
  b += `<path d="M0 800 C250 780 450 820 800 800 S1300 780 1600 800 V900 H0Z" fill="#c0693c"/>`;
  b += `<path d="M0 820 H1600 V900 H0Z" fill="#b95a32"/><path d="M300 840 H1500 M500 868 H1400" stroke="#ffe0a8" stroke-width="5" opacity=".6"/><rect x="1000" y="470" width="300" height="10" fill="#ffd36b" opacity=".35"/>`;
  b += `<g transform="translate(1180 820)"><path d="M-110 0 Q0 52 110 0 L90 -20 H-90Z" fill="#3b2418"/><rect x="-2" y="-170" width="4" height="150" fill="#3b2418"/><path d="M2 -168 Q84 -110 2 -36Z" fill="#fff1d6"/></g>` + birds(1000, 210);
  out['temple-bhadrachalam'] = svg(defs, b);
}
// Yadadri: rocky hill, long staircase, hilltop temple, flag
{
  const defs = sky('s', [[0, '#bfe0f6'], [0.55, '#f6d6a8'], [1, '#f0a36a']]) + halo('h', '#fff5cf');
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/><circle cx="1330" cy="330" r="240" fill="url(#h)"/><circle cx="1330" cy="330" r="62" fill="#ffe38a"/>`;
  b += hills(640, '#c98557', 81, 60);
  b += `<path d="M180 900 C260 700 380 560 520 470 C620 410 700 300 800 240 C900 300 980 410 1080 470 C1220 560 1340 700 1420 900Z" fill="#8a5a3d"/><path d="M420 900 C500 720 620 600 720 520 C760 460 780 380 800 340 C830 400 860 470 900 520 C980 600 1100 720 1180 900Z" fill="#a46c48"/>`;
  b += `<path d="M640 900 L930 840 L700 780 L900 730 L740 680 L880 640 L780 600 L850 560 L800 520" fill="none" stroke="#f1dcaa" stroke-width="12" stroke-linecap="round"/>`;
  b += `<g transform="translate(800 240)"><rect x="-120" y="-10" width="240" height="26" fill="#d9c294"/><path d="M-70 -10 L-56 -64 H56 L70 -10Z" fill="#cdb078"/><path d="M-56 -64 L-40 -112 H40 L56 -64Z" fill="#d9c294"/><path d="M-40 -112 L-26 -150 H26 L40 -112Z" fill="#cdb078"/><path d="M-26 -150 Q0 -196 26 -150Z" fill="#d9c294"/><circle cx="0" cy="-200" r="7" fill="#f2c35b"/><rect x="150" y="-170" width="6" height="186" fill="#6b3a1e"/><path d="M156 -168 H228 L208 -146 L228 -124 H156Z" fill="#dc2626"/></g>`;
  b += `<rect y="860" width="${W}" height="40" fill="#5b3a22"/>` + tree(120, 850, 1.4, '#2d5a2f') + tree(1480, 850, 1.6, '#2d5a2f') + birds(420, 200);
  out['temple-yadadri'] = svg(defs, b);
}
// Kanaka Durga: hill temple, Krishna river, arched barrage
{
  const defs = sky('s', [[0, '#ffd3d3'], [0.55, '#f7a98b'], [1, '#e86e55']]) + halo('h', '#fff0c2');
  const pal = { a: '#b91c1c', b: '#991b1b', dark: '#450a0a', trim: '#f4c542', win: '#fde68a', door: '#2d0606' };
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/><circle cx="400" cy="380" r="360" fill="url(#h)"/>`;
  b += hills(560, '#c85a45', 91, 60);
  b += `<path d="M120 700 C200 560 330 480 420 430 C520 480 640 560 740 700Z" fill="#6b3a2a"/><path d="M200 700 C260 600 340 540 420 500 C500 540 580 600 640 700Z" fill="#855039"/>`;
  b += gopuram(420, 470, 210, 5, 40, pal) + `<rect x="560" y="300" width="5" height="130" fill="#3b2418"/><path d="M565 300 H640 L622 320 L640 340 H565Z" fill="#dc2626"/>`;
  b += `<rect y="700" width="${W}" height="200" fill="#2b86b5"/><rect y="700" width="${W}" height="12" fill="#1d6590"/>`;
  b += `<g><rect x="760" y="640" width="840" height="30" fill="#7a2f22"/>`;
  for (let i = 0; i < 9; i++) b += `<path d="M${790 + i * 92} 670 V700 H${850 + i * 92} V670 A30 30 0 0 0 ${790 + i * 92} 670Z" fill="#4a1d1a"/>`;
  b += `<rect x="760" y="634" width="840" height="8" fill="#f4c542"/></g>`;
  b += `<path d="M0 760 H1600 M0 800 H1600 M0 840 H1600" stroke="#d6f0ff" stroke-width="3" opacity=".35"/>` + `<g transform="translate(420 780)"><ellipse cx="0" cy="40" rx="260" ry="16" fill="#ffe3a8" opacity=".35"/></g>`;
  b += garland(900, 60, 1560, 60, 70, 20, 6) + hibiscus(1480, 250, 1.1) + hibiscus(1380, 190, 0.8);
  out['temple-kanakadurga'] = svg(defs, b);
}
// Vemulawada: Shiva temple with stepped tank and reflection
{
  const defs = sky('s', [[0, '#d6e8f7'], [0.6, '#f3dcc0'], [1, '#f1b98a']]) + halo('h', '#fff3cf');
  const pal = { a: '#c7b08a', b: '#b79c70', dark: '#6b5a3a', trim: '#f2d27a', win: '#7a6440', door: '#3b2e1a' };
  let b = `<rect width="${W}" height="${H}" fill="url(#s)"/><circle cx="800" cy="420" r="320" fill="url(#h)"/>`;
  b += hills(520, '#9fb6a8', 101, 60);
  b += gopuram(800, 600, 420, 6, 54, pal) + gopuram(330, 600, 170, 3, 44, pal) + gopuram(1270, 600, 170, 3, 44, pal);
  b += tree(120, 600, 2.2, '#3e6b4a') + tree(1480, 600, 2.4, '#3e6b4a');
  b += `<rect y="600" width="${W}" height="300" fill="#a99572"/>`;
  b += `<path d="M300 900 L440 690 H1160 L1300 900Z" fill="#6aa7c9"/>`;
  for (let i = 0; i < 4; i++) b += `<path d="M${300 + i * 28} 900 L${440 + i * 18} ${690 + i * 12} H${1160 - i * 18} L${1300 - i * 28} 900Z" fill="none" stroke="${i % 2 ? '#cbb78d' : '#e6d5ac'}" stroke-width="10"/>`;
  b += `<g opacity=".3" transform="translate(0 1380) scale(1 -1)">${gopuram(800, 600, 420, 6, 54, pal)}</g>`.replace('translate(0 1380)', 'translate(0 1200)');
  b += `<path d="M520 740 H1080 M600 780 H1000" stroke="#ffffff" stroke-width="5" opacity=".5"/>`;
  b += diya(160, 850, 1.3) + diya(1440, 850, 1.3) + diya(320, 870, 1) + diya(1280, 870, 1);
  out['temple-vemulawada'] = svg(defs, b);
}
for (const [k, v] of Object.entries(out)) fs.writeFileSync(`public/heroes/${k}.svg`, v);
console.log('wrote', Object.keys(out).length, 'illustrations');

// ---------- deity symbol illustrations ----------
{
  const o2 = {};
  const gold = '#f2c35b', gold2 = '#ffe08a';
  // Vishnu: conch, chakra, gada, lotus on deep blue
  {
    const defs = `<radialGradient id="bg" cx=".5" cy=".45" r=".8"><stop offset="0" stop-color="#2447a6"/><stop offset="1" stop-color="#0a1440"/></radialGradient><radialGradient id="g"><stop offset="0" stop-color="${gold2}" stop-opacity=".6"/><stop offset="1" stop-color="${gold2}" stop-opacity="0"/></radialGradient>`;
    let b = `<rect width="${W}" height="${H}" fill="url(#bg)"/>${stars(120, 301, H, '#cfe0ff')}<circle cx="800" cy="450" r="420" fill="url(#g)"/>`;
    b += `<g transform="translate(800 450)"><circle r="300" fill="none" stroke="${gold}" stroke-width="5"/><circle r="270" fill="none" stroke="${gold}" stroke-width="2" opacity=".6"/>`;
    for (let i = 0; i < 16; i++) b += `<path d="M-22 -300 L0 -356 L22 -300Z" fill="${gold}" transform="rotate(${i * 22.5})"/>`;
    b += `<circle r="210" fill="#0f1d57" stroke="${gold2}" stroke-width="4"/>`;
    // lotus at centre
    b += lotus(0, 110, 1.2, '#fbcfe8', '#f472b6') + `</g>`;
    // gada (mace) on the left: ball head with bands, spike, tapered handle with rings
    b += `<g transform="translate(300 470) rotate(-12)"><path d="M-16 20 H16 L9 300 H-9Z" fill="${gold}"/><rect x="-22" y="120" width="44" height="14" rx="6" fill="${gold2}"/><rect x="-20" y="190" width="40" height="12" rx="6" fill="${gold2}"/><circle cx="0" cy="300" r="22" fill="${gold2}"/><circle cx="0" cy="-60" r="96" fill="${gold}" stroke="${gold2}" stroke-width="6"/><path d="M-90 -90 Q0 -60 90 -90 M-96 -60 H96 M-90 -30 Q0 0 90 -30" stroke="#b8861f" stroke-width="7" fill="none"/><path d="M-22 -150 L0 -230 L22 -150Z" fill="${gold2}"/><circle cx="0" cy="-60" r="26" fill="#0f1d57" stroke="${gold2}" stroke-width="5"/></g>`;
    // shankha (conch) on the right: tapering spiral shell with a flared mouth
    b += `<g transform="translate(1280 470) rotate(8)"><path d="M0 -190 C34 -140 92 -96 108 -30 C122 30 104 104 58 142 C34 162 -2 168 -30 160 C-84 146 -122 98 -118 36 C-114 -26 -70 -82 -30 -122 C-14 -140 -4 -160 0 -190Z" fill="#fff4de" stroke="${gold}" stroke-width="6"/><path d="M-26 -118 C6 -96 48 -104 70 -72 M-70 -62 C-14 -30 58 -42 94 -8 M-104 4 C-36 38 50 26 108 56 M-96 70 C-40 100 36 92 90 112" stroke="#e0b96a" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M-14 160 C20 196 84 188 108 140 C118 118 112 100 104 92 C80 128 30 150 -14 160Z" fill="#f4b8a0" stroke="${gold}" stroke-width="5"/><path d="M6 -176 C16 -160 10 -140 -4 -136" stroke="#e0b96a" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="0" cy="-196" r="7" fill="${gold2}"/></g>`;
    o2['vishnu-symbols'] = svg(defs, b);
  }
  // Shiva: trishul, damaru, crescent, Ganga, on deep indigo
  {
    const defs = `<radialGradient id="bg" cx=".5" cy=".4" r=".85"><stop offset="0" stop-color="#3b2a7a"/><stop offset="1" stop-color="#0b0824"/></radialGradient><radialGradient id="g"><stop offset="0" stop-color="#cdb8ff" stop-opacity=".55"/><stop offset="1" stop-color="#cdb8ff" stop-opacity="0"/></radialGradient>`;
    let b = `<rect width="${W}" height="${H}" fill="url(#bg)"/>${stars(140, 311, H, '#e5dcff')}<circle cx="800" cy="430" r="420" fill="url(#g)"/>`;
    b += `<g transform="translate(800 470)"><rect x="-9" y="-250" width="18" height="520" rx="8" fill="${gold}"/><path d="M0 -330 L-18 -250 H18Z" fill="${gold2}"/><path d="M-130 -250 C-130 -330 -90 -380 -70 -300 C-60 -260 -40 -230 0 -230 C40 -230 60 -260 70 -300 C90 -380 130 -330 130 -250" fill="none" stroke="${gold}" stroke-width="16" stroke-linecap="round"/><path d="M-130 -250 L-146 -300 M130 -250 L146 -300" stroke="${gold2}" stroke-width="12" stroke-linecap="round"/><circle cx="0" cy="-200" r="16" fill="${gold2}"/><path d="M-24 -170 H24 M-30 -140 H30" stroke="${gold2}" stroke-width="10" stroke-linecap="round"/></g>`;
    b += `<g transform="translate(330 520)"><path d="M-80 -90 L0 0 L-80 90Z" fill="#c8861f"/><path d="M80 -90 L0 0 L80 90Z" fill="#e8a93a"/><path d="M-110 -110 H110 M-110 110 H110" stroke="${gold}" stroke-width="10" stroke-linecap="round"/><path d="M-70 0 C-160 -60 -190 40 -150 120" stroke="${gold2}" stroke-width="6" fill="none"/><circle cx="-150" cy="124" r="14" fill="${gold2}"/></g>`;
    b += `<g transform="translate(1260 300)"><path d="M70 -150A170 170 0 1 0 70 150A130 130 0 1 1 70 -150Z" fill="#f4f1ff"/></g>`;
    b += `<path d="M1000 640 C1100 600 1200 700 1300 660 S1480 620 1600 680" stroke="#7fc8ff" stroke-width="22" fill="none" opacity=".7"/><path d="M980 700 C1080 660 1180 760 1280 720 S1460 680 1600 740" stroke="#bfe6ff" stroke-width="12" fill="none" opacity=".6"/>`;
    o2['shiva-symbols'] = svg(defs, b);
  }
  // Devi: lotus, purna kumbha, lamp, red and gold
  {
    const defs = `<radialGradient id="bg" cx=".5" cy=".45" r=".85"><stop offset="0" stop-color="#d9363e"/><stop offset="1" stop-color="#5a0a14"/></radialGradient><radialGradient id="g"><stop offset="0" stop-color="${gold2}" stop-opacity=".6"/><stop offset="1" stop-color="${gold2}" stop-opacity="0"/></radialGradient>`;
    let b = `<rect width="${W}" height="${H}" fill="url(#bg)"/><circle cx="800" cy="440" r="440" fill="url(#g)"/>`;
    b += `<g transform="translate(800 440)"><circle r="320" fill="none" stroke="${gold}" stroke-width="5"/>`;
    for (let i = 0; i < 24; i++) b += `<circle cx="0" cy="-336" r="${i % 2 ? 6 : 10}" fill="${gold}" transform="rotate(${i * 15})"/>`;
    b += `</g>` + lotus(800, 640, 2.2, '#fbcfe8', '#f472b6') + `<ellipse cx="800" cy="650" rx="330" ry="40" fill="#8a1f2a" opacity=".5"/>`;
    // purna kumbha at left
    b += `<g transform="translate(300 640)"><path d="M-70 -20 C-70 -130 70 -130 70 -20 C70 40 -70 40 -70 -20Z" fill="#c8861f" stroke="${gold2}" stroke-width="5"/><rect x="-34" y="-150" width="68" height="36" fill="#c8861f" stroke="${gold2}" stroke-width="4"/><ellipse cx="0" cy="-168" rx="52" ry="14" fill="#2f7d3a"/>`;
    for (const [x, r] of [[-60, -30], [-30, -12], [0, 0], [30, 12], [60, 30]]) b += `<path d="M0 -168 C${x - 20} -230 ${x + 20} -270 ${x} -300 C${x + 30} -260 ${x + 30} -210 0 -168Z" fill="#3aa65c" transform="rotate(${r} 0 -168)"/>`;
    b += `<circle cx="0" cy="-205" r="34" fill="#8a5a2a"/><circle cx="-8" cy="-215" r="5" fill="#5b3a1a"/><circle cx="10" cy="-212" r="5" fill="#5b3a1a"/></g>`;
    // brass lamp at right
    b += `<g transform="translate(1300 640)"><rect x="-8" y="-330" width="16" height="330" fill="#c8861f"/><ellipse cx="0" cy="-334" rx="50" ry="12" fill="#e8a93a"/><path d="M-60 0H60L44 -34H-44Z" fill="#c8861f"/><circle cx="0" cy="-160" r="24" fill="#e8a93a"/><circle cx="0" cy="-240" r="18" fill="#e8a93a"/>${flame(0, -340, 1.4)}</g>`;
    b += hibiscus(110, 110, 1.4) + hibiscus(1490, 110, 1.4) + garland(250, 50, 1350, 50, 80, 28, 11);
    o2['devi-symbols'] = svg(defs, b);
  }
  for (const [k, v] of Object.entries(o2)) fs.writeFileSync(`public/heroes/${k}.svg`, v);
  console.log('wrote deity symbols');
}
