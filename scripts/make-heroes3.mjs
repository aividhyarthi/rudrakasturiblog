// More section illustrations (vector, 1600x900). Run: node scripts/make-heroes3.mjs
import fs from 'node:fs';
import { W, H, svg, rnd, flame, diya, marigold, garland, gopuram, stars, hills, lotus, hibiscus } from './lib/art.mjs';
const out = {};
const grad = (id, a, b, c) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>`;
const halo = (id, c) => `<radialGradient id="${id}"><stop offset="0" stop-color="${c}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;

// Dravidian gopuram at dusk with a temple tank
{
  const defs = grad('sky', '#2b2a6b', '#c9657a', '#f7b267') + halo('h', '#ffe0a3');
  const pal = { a: '#d9a05b', b: '#c98a4d', dark: '#5d3017', trim: '#f4cf6a', win: '#6b3a1e', door: '#3f1d0a' };
  let b = `<rect width="${W}" height="${H}" fill="url(#sky)"/>${stars(70, 21, 300)}<circle cx="800" cy="470" r="360" fill="url(#h)"/>`;
  b += hills(640, '#6b3a5e', 4, 40);
  b += gopuram(800, 740, 560, 9, 56, pal) + gopuram(300, 740, 230, 5, 46, pal) + gopuram(1300, 740, 230, 5, 46, pal);
  b += `<rect y="730" width="${W}" height="170" fill="#2a1626"/><ellipse cx="800" cy="820" rx="620" ry="62" fill="#3b5d8f"/><ellipse cx="800" cy="816" rx="580" ry="46" fill="#6e93c4" opacity=".7"/>`;
  for (let i = 0; i < 7; i++) b += diya(200 + i * 200, 868, 0.9);
  out['gopuram-tn'] = svg(defs, b);
}
// River from the mountains at dawn
{
  const defs = grad('sky', '#fdebc8', '#f9c58a', '#f2994a') + halo('h', '#fff3c4');
  let b = `<rect width="${W}" height="${H}" fill="url(#sky)"/><circle cx="800" cy="360" r="300" fill="url(#h)"/><circle cx="800" cy="360" r="95" fill="#ffd36b"/>`;
  b += hills(470, '#8f7aa8', 6, 180) + hills(540, '#6b5a8a', 9, 120);
  b += `<path d="M740 540 C700 600 900 640 820 700 C740 760 980 800 880 900 H1180 C1100 800 960 760 1020 700 C1100 630 860 600 900 540Z" fill="#5fa8d3"/><path d="M780 560 C760 610 880 640 840 700" stroke="#d9f0fb" stroke-width="6" fill="none" opacity=".7"/>`;
  b += `<rect y="860" width="${W}" height="40" fill="#3d6f93"/>`;
  for (let i = 0; i < 6; i++) b += diya(900 + i * 110 + (i % 2) * 20, 860 + (i % 3) * 10, 0.7);
  b += marigold(700, 840, 20, '#f59e0b', '#fde68a') + marigold(520, 870, 16, '#f59e0b', '#fde68a');
  out['river-ganga'] = svg(defs, b);
}
// Sacred hill with a shrine on top and a flight of steps
{
  const defs = grad('sky', '#ffe9c7', '#f6b26b', '#e8744f') + halo('h', '#fff0c2');
  let b = `<rect width="${W}" height="${H}" fill="url(#sky)"/><circle cx="1150" cy="330" r="260" fill="url(#h)"/><circle cx="1150" cy="330" r="80" fill="#ffd36b"/>`;
  b += hills(600, '#b9623f', 12, 80);
  b += `<path d="M300 900 C420 520 560 300 800 190 C1040 300 1180 520 1300 900Z" fill="#7a3a22"/><path d="M420 900 C520 600 640 400 800 300 C960 400 1080 600 1180 900Z" fill="#9a4a2b"/>`;
  b += gopuram(800, 215, 150, 5, 26, { a: '#f2c35b', b: '#e0a93a', dark: '#6b3a1e', trim: '#fff1b8', win: '#7a3f1b', door: '#4b240f' });
  b += `<path d="M800 240 C770 400 840 560 790 900" stroke="#f4cf8a" stroke-width="22" fill="none" opacity=".9"/>`;
  for (let i = 0; i < 12; i++) b += `<rect x="${770 + (i % 2) * 8 - i * 1}" y="${280 + i * 50}" width="${40 + i * 2}" height="6" fill="#fff1b8" opacity=".8"/>`;
  b += `<rect y="860" width="${W}" height="40" fill="#4a1d1a"/>`;
  out['hill-sacred'] = svg(defs, b);
}
// Vel and peacock feathers (Murugan)
{
  const defs = grad('sky', '#1e2a5e', '#3b4a9b', '#f2a65a') + halo('h', '#ffe8b0');
  let b = `<rect width="${W}" height="${H}" fill="url(#sky)"/>${stars(90, 33, 400)}<circle cx="800" cy="450" r="330" fill="url(#h)"/>`;
  b += hills(640, '#2a2f6b', 5, 110) + hills(720, '#1b1f4d', 7, 70);
  b += `<rect x="792" y="260" width="16" height="520" fill="#c8861f"/><path d="M800 120 C740 190 740 280 800 360 C860 280 860 190 800 120Z" fill="#f4cf6a"/><path d="M800 150 C770 200 770 260 800 310 C830 260 830 200 800 150Z" fill="#fff1b8"/><rect x="760" y="360" width="80" height="14" rx="6" fill="#e0a93a"/>`;
  const feather = (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M0 0 C-10 -140 -10 -260 0 -330" stroke="#1b6b4a" stroke-width="5" fill="none"/><ellipse cx="0" cy="-260" rx="70" ry="110" fill="#2aa27a"/><ellipse cx="0" cy="-270" rx="44" ry="70" fill="#1c6fb5"/><ellipse cx="0" cy="-278" rx="22" ry="36" fill="#0e3d7a"/><circle cx="0" cy="-284" r="9" fill="#f4cf6a"/></g>`;
  b += feather(450, 800, -22) + feather(1150, 800, 22) + feather(300, 830, -38) + feather(1300, 830, 38);
  b += `<rect y="800" width="${W}" height="100" fill="#14163a"/>` + diya(640, 840, 1.1) + diya(960, 840, 1.1);
  out['vel-murugan'] = svg(defs, b);
}
// Night of the goddess: dark red sky, trident, lamps (Kali, Bhairava, Varahi, Kamakhya)
{
  const defs = grad('sky', '#12040a', '#4a0d1c', '#a3212f') + halo('h', '#ff6a4d');
  let b = `<rect width="${W}" height="${H}" fill="url(#sky)"/>${stars(60, 41, 360, '#ffd9c2')}<circle cx="800" cy="400" r="320" fill="url(#h)" opacity=".55"/><circle cx="800" cy="400" r="150" fill="#e63946" opacity=".85"/><circle cx="800" cy="400" r="150" fill="none" stroke="#ffb4a2" stroke-width="3"/>`;
  b += hills(660, '#2a0710', 8, 100);
  b += `<rect x="792" y="300" width="16" height="520" fill="#d9a441"/><path d="M800 230 L780 300 L800 280 L820 300Z" fill="#f4cf6a"/><path d="M730 330 C730 270 760 250 780 300 M870 330 C870 270 840 250 820 300" stroke="#f4cf6a" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M730 330 C735 370 800 380 800 330 C800 380 865 370 870 330" stroke="#f4cf6a" stroke-width="14" fill="none" stroke-linecap="round"/>`;
  b += `<rect y="800" width="${W}" height="100" fill="#14050a"/>`;
  for (let i = 0; i < 9; i++) b += diya(200 + i * 150, 850, 0.95);
  b += hibiscus(480, 780, 1.1) + hibiscus(1120, 780, 1.1);
  out['shakti-night'] = svg(defs, b);
}
// Ganesha symbols: modak, durva, hibiscus, lamp
{
  const defs = grad('sky', '#fff1d6', '#ffd699', '#f2a35a') + halo('h', '#fff6d0');
  let b = `<rect width="${W}" height="${H}" fill="url(#sky)"/><circle cx="800" cy="420" r="360" fill="url(#h)"/>`;
  b += `<ellipse cx="800" cy="760" rx="560" ry="80" fill="#a85a1f"/><ellipse cx="800" cy="745" rx="520" ry="62" fill="#c9792e"/>`;
  const modak = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -110 C-18 -90 -70 -50 -70 0 C-70 40 -30 60 0 60 C30 60 70 40 70 0 C70 -50 18 -90 0 -110Z" fill="#f7e3b0"/><path d="M0 -110 C-6 -80 -10 -30 -4 60 M0 -110 C6 -80 10 -30 4 60 M0 -110 C-30 -70 -50 -20 -48 40 M0 -110 C30 -70 50 -20 48 40" stroke="#d2b06a" stroke-width="3" fill="none"/><circle cx="0" cy="-112" r="9" fill="#f4cf6a"/></g>`;
  b += modak(800, 560, 2.4) + modak(520, 680, 1.4) + modak(1080, 680, 1.4);
  b += hibiscus(330, 640, 1.5) + hibiscus(1270, 640, 1.5) + diya(180, 720, 1.4) + diya(1420, 720, 1.4);
  for (let i = 0; i < 7; i++) b += `<path d="M${600 + i * 60} 740 C${590 + i * 60} 700 ${610 + i * 60} 660 ${600 + i * 60} 640" stroke="#2f8f4e" stroke-width="5" fill="none"/>`;
  out['ganesha-symbols'] = svg(defs, b);
}
// Krishna: flute, peacock feather, butter pot
{
  const defs = grad('sky', '#14305e', '#2f5da8', '#f5b971') + halo('h', '#cfe3ff');
  let b = `<rect width="${W}" height="${H}" fill="url(#sky)"/>${stars(60, 52, 340)}<circle cx="1180" cy="280" r="150" fill="url(#h)"/><circle cx="1180" cy="280" r="60" fill="#fff6d9"/>`;
  b += hills(640, '#1f3f7a', 15, 90) + hills(720, '#142c5a', 3, 60);
  b += `<g transform="translate(560 640) rotate(-28)"><rect x="-300" y="-14" width="600" height="28" rx="14" fill="#d9a441"/><rect x="-300" y="-14" width="600" height="8" rx="4" fill="#f4cf6a"/>` + [-180, -110, -40, 30, 100].map((x) => `<circle cx="${x}" cy="2" r="7" fill="#7a4a12"/>`).join('') + `</g>`;
  const f = `<g transform="translate(1000 760) rotate(14)"><path d="M0 0 C-14 -150 -14 -290 0 -380" stroke="#1b6b4a" stroke-width="6" fill="none"/><ellipse cx="0" cy="-300" rx="84" ry="130" fill="#2aa27a"/><ellipse cx="0" cy="-310" rx="54" ry="84" fill="#1c6fb5"/><ellipse cx="0" cy="-320" rx="26" ry="42" fill="#0e3d7a"/><circle cx="0" cy="-326" r="10" fill="#f4cf6a"/></g>`;
  b += f;
  b += `<g transform="translate(300 790)"><path d="M-70 -20 C-70 -100 70 -100 70 -20 C70 40 -70 40 -70 -20Z" fill="#b8742a"/><rect x="-34" y="-120" width="68" height="50" fill="#b8742a"/><ellipse cx="0" cy="-124" rx="46" ry="12" fill="#f7e3b0"/><path d="M-70 -30 H70" stroke="#f4cf6a" stroke-width="6"/></g>`;
  b += `<rect y="820" width="${W}" height="80" fill="#10224a"/>`;
  out['krishna-flute'] = svg(defs, b);
}
// Advaita: lotus, concentric light, no figures
{
  const defs = grad('sky', '#0f1b3d', '#2c3e82', '#7d8fd6') + halo('h', '#ffffff');
  let b = `<rect width="${W}" height="${H}" fill="url(#sky)"/>${stars(110, 61, 520)}<circle cx="800" cy="430" r="360" fill="url(#h)" opacity=".35"/>`;
  for (const [r, o] of [[120, 0.9], [200, 0.5], [290, 0.35], [390, 0.22], [500, 0.14]]) b += `<circle cx="800" cy="430" r="${r}" fill="none" stroke="#dfe6ff" stroke-width="2.5" opacity="${o}"/>`;
  b += `<circle cx="800" cy="430" r="70" fill="#fff6d0"/><circle cx="800" cy="430" r="40" fill="#ffd36b"/>`;
  b += `<rect y="780" width="${W}" height="120" fill="#0a1230"/>` + lotus(800, 850, 2.2, '#ffd1e3', '#f48fb1');
  out['om-lotus'] = svg(defs, b);
}
// Sailing ship at dawn off a temple coast
{
  const defs = grad('sky', '#f6d9b0', '#f3a56b', '#d9644a') + halo('h', '#fff0c2');
  let b = `<rect width="${W}" height="${H}" fill="url(#sky)"/><circle cx="1180" cy="480" r="300" fill="url(#h)"/><circle cx="1180" cy="480" r="90" fill="#ffe08a"/>`;
  b += `<path d="M0 560 C200 520 320 600 520 560 S900 520 1100 560 S1450 600 1600 560 V900 H0Z" fill="#3a6a9a"/><path d="M0 640 C250 600 400 680 650 640 S1100 600 1350 650 S1520 650 1600 640 V900 H0Z" fill="#2a5382"/><path d="M0 740 C300 710 500 780 800 740 S1300 720 1600 760 V900 H0Z" fill="#1d3f6b"/>`;
  b += `<g transform="translate(560 560)"><path d="M-200 0 L200 0 L150 60 L-150 60Z" fill="#4a2a14"/><rect x="-6" y="-300" width="12" height="300" fill="#3a200f"/><path d="M-4 -290 C-150 -250 -170 -100 -120 -30 L-4 -30Z" fill="#f4ead2"/><path d="M4 -250 C130 -220 150 -100 110 -30 L4 -30Z" fill="#efe1c2"/><path d="M0 -300 L70 -280 L0 -262Z" fill="#c1272d"/></g>`;
  b += gopuram(1400, 560, 160, 4, 30, { a: '#d9a05b', b: '#c98a4d', dark: '#5d3017', trim: '#f4cf6a', win: '#6b3a1e', door: '#3f1d0a' });
  out['ship-sunrise'] = svg(defs, b);
}
// Old books and a lamp
{
  const defs = grad('bg', '#2a1a10', '#4a2e1a', '#6b4326') + halo('h', '#ffcf7a');
  let b = `<rect width="${W}" height="${H}" fill="url(#bg)"/><circle cx="1050" cy="430" r="380" fill="url(#h)" opacity=".7"/>`;
  b += `<rect y="700" width="${W}" height="200" fill="#2a170c"/><rect y="696" width="${W}" height="12" fill="#8a5a2b"/>`;
  const book = (x, y, w, h, c) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${c}"/><rect x="${x}" y="${y + 14}" width="${w}" height="8" fill="#e3c27a" opacity=".8"/><rect x="${x}" y="${y + h - 22}" width="${w}" height="8" fill="#e3c27a" opacity=".8"/>`;
  b += book(300, 600, 420, 96, '#7a2e2e') + book(330, 510, 380, 90, '#2e5a7a') + book(310, 430, 400, 80, '#4a6b2e') + book(350, 360, 330, 70, '#6b4a8a');
  b += `<path d="M760 700 L1000 700 L1000 640 C900 600 860 640 760 640Z" fill="#f4ead2"/><path d="M1000 700 L1240 700 L1240 640 C1140 600 1100 640 1000 640Z" fill="#efe1c2"/><path d="M1000 640 V700" stroke="#b79b62" stroke-width="3"/>`;
  b += diya(1090, 640, 2.2);
  out['books-lamp'] = svg(defs, b);
}
fs.mkdirSync('public/heroes', { recursive: true });
for (const [k, v] of Object.entries(out)) fs.writeFileSync(`public/heroes/${k}.svg`, v);
console.log('wrote', Object.keys(out).join(', '));
