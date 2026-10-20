// Draws the section illustrations (vector, 1600x900). Run: node scripts/make-heroes.mjs
import fs from 'node:fs';
const W = 1600, H = 900;
const svg = (defs, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><defs>${defs}</defs>${body}</svg>`;
const rnd = (seed) => { let a = seed; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };

const flame = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-26" r="34" fill="#ffd36b" opacity=".28"/><path d="M0 -58C14 -36 20 -24 20 -12C20 -2 11 6 0 6C-11 6 -20 -2 -20 -12C-20 -24 -12 -36 0 -58Z" fill="#ff9d2e"/><path d="M0 -38C7 -26 10 -20 10 -12C10 -6 6 -2 0 -2C-6 -2 -10 -6 -10 -12C-10 -20 -6 -26 0 -38Z" fill="#ffe27a"/></g>`;
const diya = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${flame(0, -8)}<path d="M-34 0H34C32 20 18 30 0 30C-18 30 -32 20 -34 0Z" fill="#b8741a"/><path d="M-34 0H34" stroke="#f5c55b" stroke-width="5"/><ellipse cx="0" cy="0" rx="34" ry="7" fill="#d99a2b"/></g>`;
const marigold = (cx, cy, r, c1, c2) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c1}"/><circle cx="${cx}" cy="${cy}" r="${r * 0.62}" fill="${c2}"/>`;
function garland(x0, y0, x1, y1, sag, n, seed) {
  const r = rnd(seed); let o = '';
  for (let i = 0; i <= n; i++) { const t = i / n; const x = x0 + (x1 - x0) * t; const y = y0 + (y1 - y0) * t + Math.sin(Math.PI * t) * sag; o += marigold(x, y, 17 + r() * 4, i % 2 ? '#f59e0b' : '#ea580c', i % 2 ? '#fbbf24' : '#f59e0b'); }
  return o;
}
function gopuram(cx, base, w0, tiers, tierH, pal) {
  let o = ''; let y = base; let w = w0;
  o += `<rect x="${cx - w0 / 2 - 10}" y="${base - 18}" width="${w0 + 20}" height="18" fill="${pal.dark}"/>`;
  for (let i = 0; i < tiers; i++) {
    const nw = w * 0.86;
    o += `<path d="M${cx - w / 2} ${y} L${cx - nw / 2} ${y - tierH} L${cx + nw / 2} ${y - tierH} L${cx + w / 2} ${y} Z" fill="${i % 2 ? pal.a : pal.b}"/>`;
    o += `<rect x="${cx - nw / 2 - 4}" y="${y - tierH - 6}" width="${nw + 8}" height="9" fill="${pal.trim}"/>`;
    const k = Math.max(2, Math.round(nw / 70));
    for (let j = 0; j < k; j++) { const wx = cx - nw / 2 + (nw / (k + 1)) * (j + 1); o += `<rect x="${wx - 9}" y="${y - tierH + 12}" width="18" height="${tierH - 28}" rx="9" fill="${pal.win}"/>`; }
    y -= tierH + 4; w = nw * 0.94;
  }
  o += `<path d="M${cx - w / 2} ${y} Q${cx} ${y - 70} ${cx + w / 2} ${y} Z" fill="${pal.b}"/>`;
  for (const dx of [-26, 0, 26]) o += `<g><path d="M${cx + dx - 8} ${y - 40}h16l-3 -22h-10z" fill="${pal.trim}"/><circle cx="${cx + dx}" cy="${y - 66}" r="6" fill="${pal.trim}"/></g>`;
  const dw = w0 * 0.2; o += `<path d="M${cx - dw / 2} ${base - 18} V${base - 110} Q${cx} ${base - 150} ${cx + dw / 2} ${base - 110} V${base - 18} Z" fill="${pal.door}"/>`;
  return o;
}
const stars = (n, seed, y1, color = '#fff') => { const r = rnd(seed); let o = ''; for (let i = 0; i < n; i++) o += `<circle cx="${(r() * W).toFixed(0)}" cy="${(r() * y1).toFixed(0)}" r="${(0.8 + r() * 2.2).toFixed(1)}" fill="${color}" opacity="${(0.4 + r() * 0.6).toFixed(2)}"/>`; return o; };
const hills = (y, color, seed, amp = 70) => { const r = rnd(seed); let d = `M0 ${H} L0 ${y}`; for (let x = 0; x <= W; x += 100) d += ` L${x} ${(y - r() * amp).toFixed(0)}`; return `<path d="${d} L${W} ${H} Z" fill="${color}"/>`; };
const lotus = (cx, cy, s, c1, c2) => { let o = `<g transform="translate(${cx} ${cy}) scale(${s})">`; for (const a of [-70, -38, 0, 38, 70]) o += `<path d="M0 0 C-34 -40 -30 -110 0 -150 C30 -110 34 -40 0 0Z" fill="${Math.abs(a) > 40 ? c2 : c1}" transform="rotate(${a})"/>`; return o + `<ellipse cx="0" cy="4" rx="90" ry="12" fill="#2f7d5b" opacity=".6"/></g>`; };
const hibiscus = (cx, cy, s) => { let o = `<g transform="translate(${cx} ${cy}) scale(${s})">`; for (let i = 0; i < 5; i++) o += `<ellipse cx="0" cy="-30" rx="22" ry="36" fill="#dc2626" transform="rotate(${i * 72})"/>`; return o + `<circle r="9" fill="#fde68a"/></g>`; };

const out = {};

// 1. Temple at sunrise
{
  const defs = `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fde8c8"/><stop offset=".55" stop-color="#f9b872"/><stop offset="1" stop-color="#f08a4b"/></linearGradient><radialGradient id="halo"><stop offset="0" stop-color="#fff3c4"/><stop offset="1" stop-color="#fff3c4" stop-opacity="0"/></radialGradient>`;
  const pal = { a: '#c98a4d', b: '#b97639', dark: '#6b3a1e', trim: '#f2c35b', win: '#7a3f1b', door: '#4b240f' };
  let b = `<rect width="${W}" height="${H}" fill="url(#sky)"/><circle cx="1180" cy="560" r="330" fill="url(#halo)"/><circle cx="1180" cy="560" r="120" fill="#ffd36b"/>`;
  b += hills(600, '#c46a3b', 3, 90) + hills(660, '#9a4a2b', 8, 70);
  b += gopuram(500, 760, 520, 7, 62, pal) + gopuram(180, 760, 220, 4, 52, pal) + gopuram(830, 760, 220, 4, 52, pal);
  b += `<rect y="740" width="${W}" height="160" fill="#4a1d1a"/><rect y="740" width="${W}" height="10" fill="#f2c35b"/>`;
  b += garland(0, 40, 520, 40, 70, 20, 1) + garland(1080, 40, 1600, 40, 70, 20, 2);
  for (let i = 0; i < 9; i++) b += diya(150 + i * 165, 835, 1.15);
  out['temple-sunrise'] = svg(defs, b);
}
// 2. Shiva lingam
{
  const defs = `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e1b4b"/><stop offset=".5" stop-color="#5b3f8f"/><stop offset="1" stop-color="#f4b183"/></linearGradient><radialGradient id="glow"><stop offset="0" stop-color="#ffe6a8"/><stop offset="1" stop-color="#ffe6a8" stop-opacity="0"/></radialGradient>`;
  let b = `<rect width="${W}" height="${H}" fill="url(#sky)"/>${stars(120, 5, 380)}<circle cx="800" cy="470" r="300" fill="url(#glow)"/><circle cx="800" cy="470" r="70" fill="#ffe6a8"/>`;
  b += hills(520, '#3b3a7a', 11, 140) + hills(600, '#2c2b63', 14, 100);
  b += `<path d="M0 700 C300 660 500 740 800 700 S1300 650 1600 700 V900 H0Z" fill="#35588f"/><path d="M0 760 C300 730 500 790 800 760 S1300 720 1600 760 V900 H0Z" fill="#274a7d"/>`;
  b += `<ellipse cx="800" cy="820" rx="420" ry="70" fill="#1c1a3a"/><ellipse cx="800" cy="800" rx="360" ry="56" fill="#3a3a52"/><ellipse cx="800" cy="788" rx="300" ry="44" fill="#4b4b66"/>`;
  b += `<path d="M740 770 V470 C740 400 860 400 860 470 V770 Z" fill="#0d0d14"/><ellipse cx="800" cy="772" rx="140" ry="26" fill="#1b1b28"/><path d="M770 470 C770 430 830 430 830 470" stroke="#8a8aa8" stroke-width="4" fill="none" opacity=".6"/>`;
  for (const [x, y, r] of [[560, 780, -20], [640, 800, 10], [960, 800, -10], [1040, 780, 24]]) b += `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M0 0C-26 -30 -26 -70 0 -90C26 -70 26 -30 0 0Z" fill="#2f8f4e"/><path d="M0 0C-60 -10 -80 -44 -70 -70C-30 -62 -6 -34 0 0Z" fill="#3aa65c"/><path d="M0 0C60 -10 80 -44 70 -70C30 -62 6 -34 0 0Z" fill="#3aa65c"/></g>`;
  b += `<g transform="translate(300 780)"><path d="M-60 -10C-60 -80 60 -80 60 -10C60 40 -60 40 -60 -10Z" fill="#c8861f"/><rect x="-26" y="-110" width="52" height="40" fill="#c8861f"/><ellipse cx="0" cy="-112" rx="38" ry="10" fill="#e8a93a"/><path d="M-60 -30H60" stroke="#f5c55b" stroke-width="6"/></g>`;
  b += diya(1300, 800, 1.6);
  out['jyotirlinga-dawn'] = svg(defs, b);
}
// 3. Goddess temple
{
  const defs = `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbd5d5"/><stop offset=".6" stop-color="#f7a98b"/><stop offset="1" stop-color="#ef7f5b"/></linearGradient><radialGradient id="halo"><stop offset="0" stop-color="#fff0c2"/><stop offset="1" stop-color="#fff0c2" stop-opacity="0"/></radialGradient>`;
  const pal = { a: '#b91c1c', b: '#991b1b', dark: '#450a0a', trim: '#f4c542', win: '#fde68a', door: '#2d0606' };
  let b = `<rect width="${W}" height="${H}" fill="url(#sky)"/><circle cx="800" cy="420" r="380" fill="url(#halo)"/>`;
  b += hills(640, '#d9674a', 20, 60);
  b += gopuram(800, 760, 520, 8, 58, pal) + gopuram(330, 760, 200, 4, 50, pal) + gopuram(1270, 760, 200, 4, 50, pal);
  b += `<rect y="740" width="${W}" height="160" fill="#7a1f1f"/><ellipse cx="800" cy="840" rx="540" ry="60" fill="#3d7f9b"/><ellipse cx="800" cy="835" rx="500" ry="46" fill="#5ba3c0" opacity=".8"/>`;
  b += lotus(800, 850, 1.7, '#f9a8d4', '#ec4899') + lotus(520, 850, 1, '#fbcfe8', '#f472b6') + lotus(1080, 850, 1, '#fbcfe8', '#f472b6');
  b += `<g transform="translate(140 820)"><rect x="-8" y="-420" width="16" height="420" fill="#c8861f"/><ellipse cx="0" cy="-424" rx="34" ry="9" fill="#e8a93a"/><path d="M-40 0H40L28 -30H-28Z" fill="#c8861f"/><circle cx="0" cy="-200" r="22" fill="#e8a93a"/><circle cx="0" cy="-300" r="16" fill="#e8a93a"/>${flame(0, -430, 1.2)}</g>`;
  b += hibiscus(60, 90, 1.3) + hibiscus(1540, 90, 1.3) + hibiscus(1480, 820, 1.1) + garland(300, 60, 1300, 60, 90, 28, 7);
  out['goddess-temple'] = svg(defs, b);
}
// 4. Kurukshetra dawn (chariot wheel, conch, bow)
{
  const defs = `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e3a8a"/><stop offset=".5" stop-color="#f59e0b"/><stop offset="1" stop-color="#fde68a"/></linearGradient><radialGradient id="halo"><stop offset="0" stop-color="#fff7d6"/><stop offset="1" stop-color="#fff7d6" stop-opacity="0"/></radialGradient>`;
  let b = `<rect width="${W}" height="${H}" fill="url(#sky)"/><circle cx="800" cy="560" r="420" fill="url(#halo)"/><circle cx="800" cy="560" r="170" fill="#fff1b8"/>`;
  b += `<path d="M0 640 C400 600 800 660 1200 620 S1500 640 1600 630 V900 H0Z" fill="#b45309"/><path d="M0 720 C500 690 1000 740 1600 700 V900 H0Z" fill="#7c3a0a"/>`;
  b += `<g transform="translate(800 690)"><circle r="250" fill="none" stroke="#2a1405" stroke-width="26"/><circle r="214" fill="none" stroke="#2a1405" stroke-width="8"/>`;
  for (let i = 0; i < 12; i++) b += `<rect x="-8" y="-214" width="16" height="190" fill="#2a1405" transform="rotate(${i * 30})"/>`;
  b += `<circle r="52" fill="#2a1405"/><circle r="24" fill="#f4c542"/></g>`;
  b += `<path d="M0 740 H1600 V900 H0Z" fill="#2a1405"/>`;
  b += `<g transform="translate(300 805)"><path d="M-130 0 L-10 -26 L-10 -100 L-130 -74Z" fill="#f4e4c1" stroke="#7c3a0a" stroke-width="5"/><path d="M130 0 L10 -26 L10 -100 L130 -74Z" fill="#f9edd0" stroke="#7c3a0a" stroke-width="5"/><path d="M-110 -30L-30 -48M-110 -50L-30 -68M110 -30L30 -48M110 -50L30 -68" stroke="#9a6a2a" stroke-width="5" stroke-linecap="round"/><path d="M0 -26V-100" stroke="#7c3a0a" stroke-width="6"/></g>${diya(520, 800, 1.3)}`;
  b += `<g transform="translate(1340 800)"><path d="M0 0C80 -180 80 -320 0 -440" stroke="#2a1405" stroke-width="12" fill="none"/><path d="M0 -440L0 0" stroke="#f4c542" stroke-width="2" fill="none"/></g>`;
  b += `<g transform="translate(1180 700)"><rect x="0" y="-300" width="8" height="300" fill="#2a1405"/><path d="M8 -300H110L90 -270L110 -240H8Z" fill="#dc2626"/></g>`;
  out['kurukshetra-dawn'] = svg(defs, b);
}
// 5. Panchangam
{
  const defs = `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3dd"/><stop offset="1" stop-color="#fbd9a5"/></linearGradient>`;
  let b = `<rect width="${W}" height="${H}" fill="url(#sky)"/>${stars(40, 9, 350, '#c2762b')}`;
  b += `<g transform="translate(330 330)"><circle r="130" fill="#f59e0b"/><circle r="100" fill="#fbbf24"/>`;
  for (let i = 0; i < 16; i++) b += `<path d="M-10 -150L0 -230L10 -150Z" fill="#f59e0b" transform="rotate(${i * 22.5})"/>`;
  b += `</g><g transform="translate(1270 320)"><path d="M70 -150A170 170 0 1 0 70 150A130 130 0 1 1 70 -150Z" fill="#e5e7eb"/><path d="M70 -150A170 170 0 1 0 70 150A130 130 0 1 1 70 -150Z" fill="none" stroke="#9ca3af" stroke-width="3"/></g>`;
  b += `<g transform="translate(800 380)">`;
  for (let i = 0; i < 5; i++) b += `<path d="M0 0C-44 -50 -40 -140 0 -190C40 -140 44 -50 0 0Z" fill="${i % 2 ? '#c2410c' : '#9a3412'}" stroke="#fde68a" stroke-width="6" transform="rotate(${i * 72})"/>`;
  b += `<circle r="38" fill="#fde68a"/><circle r="18" fill="#c2410c"/></g>`;
  b += `<rect x="260" y="680" width="1080" height="120" rx="20" fill="#d6b88a"/><rect x="260" y="680" width="1080" height="120" rx="20" fill="none" stroke="#8a6a3a" stroke-width="5"/>`;
  for (let i = 0; i < 5; i++) b += `<path d="M${310 + i * 210} 705H${430 + i * 210}M${310 + i * 210} 740H${430 + i * 210}M${310 + i * 210} 775H${400 + i * 210}" stroke="#7a5a2a" stroke-width="7" stroke-linecap="round"/>`;
  b += diya(160, 820, 1.4) + diya(1440, 820, 1.4);
  out['panchangam'] = svg(defs, b);
}
// 6. Zodiac wheel
{
  const defs = `<radialGradient id="sky" cx=".5" cy=".5" r=".75"><stop offset="0" stop-color="#2a2f6b"/><stop offset="1" stop-color="#0a0d2b"/></radialGradient><radialGradient id="sun"><stop offset="0" stop-color="#fff2b8"/><stop offset="1" stop-color="#f5b83d"/></radialGradient>`;
  let b = `<rect width="${W}" height="${H}" fill="url(#sky)"/>${stars(220, 13, H)}<g transform="translate(800 450)">`;
  b += `<circle r="400" fill="none" stroke="#f5c55b" stroke-width="4"/><circle r="330" fill="none" stroke="#f5c55b" stroke-width="2"/><circle r="170" fill="none" stroke="#f5c55b" stroke-width="3"/>`;
  const r = rnd(21);
  for (let i = 0; i < 12; i++) {
    const a = (i * 30 - 90) * Math.PI / 180; const a2 = (i * 30 - 75) * Math.PI / 180;
    b += `<line x1="${(170 * Math.cos(a - 0.26)).toFixed(1)}" y1="${(170 * Math.sin(a - 0.26)).toFixed(1)}" x2="${(400 * Math.cos(a - 0.26)).toFixed(1)}" y2="${(400 * Math.sin(a - 0.26)).toFixed(1)}" stroke="#f5c55b" stroke-width="2" opacity=".8"/>`;
    // small constellation per sector
    const pts = Array.from({ length: 5 }, () => [250 + r() * 100, (i * 30 - 90 + r() * 22 - 11)]).map(([rad, deg]) => [rad * Math.cos(deg * Math.PI / 180), rad * Math.sin(deg * Math.PI / 180)]);
    b += `<polyline points="${pts.map((p) => p.map((v) => v.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#9fb1ff" stroke-width="2" opacity=".7"/>` + pts.map((p) => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="6" fill="#fff6c9"/>`).join('');
    b += `<circle cx="${(365 * Math.cos(a2)).toFixed(1)}" cy="${(365 * Math.sin(a2)).toFixed(1)}" r="10" fill="#f5c55b"/>`;
  }
  b += `<circle r="96" fill="url(#sun)"/><g stroke="#f5b83d" stroke-width="6" stroke-linecap="round">${Array.from({ length: 16 }, (_, i) => `<line x1="0" y1="-112" x2="0" y2="-142" transform="rotate(${i * 22.5})"/>`).join('')}</g></g>`;
  b += `<g transform="translate(1260 190)"><path d="M40 -60A64 64 0 1 0 40 60A48 48 0 1 1 40 -60Z" fill="#f1f1f1"/></g>`;
  out['zodiac-wheel'] = svg(defs, b);
}
// 7. Moon and nakshatra path
{
  const defs = `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f0a2e"/><stop offset=".7" stop-color="#3a2a7a"/><stop offset="1" stop-color="#7a5fb0"/></linearGradient><radialGradient id="halo"><stop offset="0" stop-color="#fffbe0" stop-opacity=".9"/><stop offset="1" stop-color="#fffbe0" stop-opacity="0"/></radialGradient>`;
  let b = `<rect width="${W}" height="${H}" fill="url(#sky)"/>${stars(160, 31, 560)}<circle cx="1050" cy="270" r="260" fill="url(#halo)"/><circle cx="1050" cy="270" r="110" fill="#fffbe6"/><circle cx="1015" cy="240" r="22" fill="#eadfb8" opacity=".6"/><circle cx="1085" cy="300" r="30" fill="#eadfb8" opacity=".5"/>`;
  const r = rnd(41);
  for (let i = 0; i < 27; i++) { const t = i / 26; const x = 120 + t * 1360; const y = 560 - Math.sin(Math.PI * t) * 330; const s = 5 + r() * 7; b += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(s * 2.6).toFixed(0)}" fill="#ffe9a8" opacity=".18"/><circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${s.toFixed(1)}" fill="#fff4c4"/>`; }
  b += hills(740, '#2b2160', 51, 110) + hills(800, '#1a1442', 52, 60);
  const pal = { a: '#4a3f86', b: '#3b3170', dark: '#1a1442', trim: '#ffd36b', win: '#ffd36b', door: '#0e0a2a' };
  b += gopuram(420, 800, 200, 4, 44, pal) + `<rect y="800" width="${W}" height="100" fill="#0e0a2a"/>`;
  b += `<path d="M0 300 C200 270 400 330 600 300" stroke="#ffffff" stroke-width="30" opacity=".05" fill="none"/>`;
  out['moon-nakshatra'] = svg(defs, b);
}
for (const [k, v] of Object.entries(out)) fs.writeFileSync(`public/heroes/${k}.svg`, v);
console.log('wrote', Object.keys(out).join(', '));
