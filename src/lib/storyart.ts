// Editorial scenes for story pages and cards. Vector, unique per story (seeded), no photos, no faces.
const W = 1200, H = 675;
function hashStr(s: string) { let h = 2166136261; for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0; return h; }
function rng(seed: number) { let a = seed; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const wrap = (defs: string, body: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice"><defs>${defs}</defs>${body}</svg>`;
const lin = (id: string, stops: [number, string][], vertical = true) => `<linearGradient id="${id}" x1="0" y1="0" x2="${vertical ? 0 : 1}" y2="${vertical ? 1 : 0}">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
const rad = (id: string, c: string, o = 1) => `<radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="${o}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;
const cloud = (x: number, y: number, s: number, c = '#fff', o = 0.55) => `<g opacity="${o}" transform="translate(${x} ${y}) scale(${s})"><rect x="-70" y="-10" width="140" height="26" rx="13" fill="${c}"/><rect x="-40" y="-30" width="80" height="34" rx="17" fill="${c}"/></g>`;
const person = (x: number, y: number, s: number, c: string) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}"><circle cx="0" cy="-46" r="12"/><path d="M-18 0 V-24 C-18 -36 18 -36 18 -24 V0Z"/></g>`;

const POL = [
  { sky: [[0, '#26406b'], [0.55, '#e29a8a'], [1, '#f6d3a5']], sun: '#fff0c4', stone: '#efe7d6', shade: '#d3c8b0', ground: '#4b5b6e', accent: '#c8341f' },
  { sky: [[0, '#1b4b52'], [0.55, '#8fc3b4'], [1, '#f1e3b4']], sun: '#fff7d6', stone: '#f1ebdc', shade: '#d6cdb7', ground: '#3d5a58', accent: '#1f3a5f' },
  { sky: [[0, '#3b2a5a'], [0.55, '#d98aa0'], [1, '#f7c98e']], sun: '#ffe9b0', stone: '#efe4d2', shade: '#d1c3ab', ground: '#52405f', accent: '#a31650' },
  { sky: [[0, '#2c3e50'], [0.55, '#9db4c8'], [1, '#f2dcc0']], sun: '#fff3d0', stone: '#f0e9db', shade: '#d4cab5', ground: '#40505e', accent: '#c8341f' },
];
function politics(seed: number) {
  const r = rng(seed); const P = POL[seed % POL.length];
  const sx = 180 + r() * 840;
  let b = `<rect width="${W}" height="${H}" fill="url(#sky)"/><circle cx="${sx}" cy="250" r="190" fill="url(#halo)"/><circle cx="${sx}" cy="250" r="46" fill="${P.sun}"/>`;
  for (let i = 0; i < 4; i++) b += cloud(100 + r() * 1000, 70 + r() * 160, 0.8 + r() * 0.9);
  // distant skyline
  let d = `M0 ${H} L0 420`; for (let x = 0; x <= W; x += 60) d += ` L${x} ${(380 + r() * 50).toFixed(0)}`; b += `<path d="${d} L${W} ${H}Z" fill="${P.shade}" opacity=".55"/>`;
  // assembly building
  const cx = 600;
  b += `<rect x="150" y="560" width="900" height="26" fill="${P.shade}"/><rect x="190" y="534" width="820" height="28" fill="${P.stone}"/><rect x="230" y="508" width="740" height="28" fill="${P.shade}"/>`;
  b += `<rect x="260" y="330" width="680" height="180" fill="${P.stone}"/><path d="M240 330 L600 250 L960 330Z" fill="${P.shade}"/><path d="M280 330 L600 262 L920 330Z" fill="${P.stone}"/>`;
  for (let i = 0; i < 9; i++) b += `<rect x="${290 + i * 70}" y="340" width="26" height="168" rx="3" fill="${P.shade}"/><rect x="${284 + i * 70}" y="334" width="38" height="12" fill="${P.stone}"/>`;
  b += `<rect x="540" y="430" width="120" height="78" rx="8" fill="${P.ground}" opacity=".85"/>`;
  b += `<path d="M520 262 C520 190 680 190 680 262Z" fill="${P.shade}"/><path d="M530 262 C530 200 670 200 670 262Z" fill="${P.stone}"/><rect x="594" y="150" width="12" height="46" fill="${P.shade}"/><circle cx="600" cy="142" r="9" fill="${P.accent}"/>`;
  for (const x of [330, 870]) b += `<path d="M${x - 46} 330 C${x - 46} 280 ${x + 46} 280 ${x + 46} 330Z" fill="${P.stone}"/><rect x="${x - 3}" y="262" width="6" height="26" fill="${P.shade}"/><circle cx="${x}" cy="258" r="6" fill="${P.accent}"/>`;
  b += `<rect y="586" width="${W}" height="${H - 586}" fill="${P.ground}"/>`;
  const n = 14 + Math.floor(r() * 8);
  for (let i = 0; i < n; i++) b += person(60 + (i / n) * 1080 + r() * 30, 650 + r() * 12, 0.9 + r() * 0.7, i % 5 === 0 ? P.accent : '#1b2330');
  return wrap(lin('sky', P.sky as any) + rad('halo', P.sun, 0.7), b);
}

const MOV = [
  { bg: [[0, '#1a0b2e'], [1, '#4a1450']], screen: [[0, '#ffb35c'], [1, '#e1306c']], beam: '#ffd9a0', seat: '#2a0f38', seat2: '#3e1850' },
  { bg: [[0, '#0b1d3a'], [1, '#2a2a6a']], screen: [[0, '#7bdff2'], [1, '#b2f7ef']], beam: '#bfe9ff', seat: '#101a38', seat2: '#1c2a58' },
  { bg: [[0, '#2b0d12'], [1, '#6a1b2e']], screen: [[0, '#ffd166'], [1, '#ef476f']], beam: '#ffe3b0', seat: '#2a0c14', seat2: '#451522' },
  { bg: [[0, '#0f2a24'], [1, '#1f5a4c']], screen: [[0, '#f9d976'], [1, '#f39f86']], beam: '#fff0c4', seat: '#0c1f1a', seat2: '#17443a' },
];
function movies(seed: number) {
  const r = rng(seed); const P = MOV[seed % MOV.length];
  let b = `<rect width="${W}" height="${H}" fill="url(#bg)"/>`;
  // film strip border
  for (let i = 0; i < 30; i++) b += `<rect x="${12 + i * 40}" y="14" width="22" height="16" rx="3" fill="#ffffff" opacity=".16"/><rect x="${12 + i * 40}" y="${H - 30}" width="22" height="16" rx="3" fill="#ffffff" opacity=".16"/>`;
  // beam
  b += `<path d="M600 640 L300 120 L900 120Z" fill="${P.beam}" opacity=".12"/>`;
  // screen with scene
  b += `<rect x="250" y="80" width="700" height="350" rx="10" fill="#0a0a12"/><rect x="262" y="92" width="676" height="326" rx="6" fill="url(#scr)"/>`;
  const sx = 340 + r() * 520;
  b += `<circle cx="${sx}" cy="${190 + r() * 40}" r="${46 + r() * 20}" fill="#fff" opacity=".85"/>`;
  let d = `M262 418 L262 320`; for (let x = 262; x <= 938; x += 56) d += ` L${x} ${(300 + r() * 70).toFixed(0)}`; b += `<path d="${d} L938 418Z" fill="#1a0b2e" opacity=".55"/>`;
  b += `<path d="M262 418 L262 360 C400 330 520 380 640 350 C760 320 860 370 938 345 V418Z" fill="#000" opacity=".35"/>`;
  // seats, three rows
  for (let row = 0; row < 3; row++) {
    const y = 470 + row * 62; const n = 12 - row; const gap = 1100 / n;
    for (let i = 0; i < n; i++) { const x = 50 + gap * i + gap / 2 + (r() - 0.5) * 4; b += `<g><rect x="${x - 34}" y="${y}" width="68" height="64" rx="16" fill="${row % 2 ? P.seat2 : P.seat}"/><rect x="${x - 34}" y="${y + 44}" width="68" height="22" rx="8" fill="${P.seat}"/></g>`; if (r() > 0.55) b += `<circle cx="${x}" cy="${y - 6}" r="13" fill="#0a0a12"/><path d="M${x - 17} ${y + 12} V${y + 4} C${x - 17} ${y - 8} ${x + 17} ${y - 8} ${x + 17} ${y + 4} V${y + 12}Z" fill="#0a0a12"/>`; }
  }
  return wrap(lin('bg', P.bg as any) + lin('scr', P.screen as any), b);
}

const OTT = [
  { bg: [[0, '#06242a'], [1, '#0f5a63']], tv: [[0, '#2dd4bf'], [1, '#0ea5e9']], acc: '#ffd166', floor: '#04181c' },
  { bg: [[0, '#1b1038'], [1, '#41207a']], tv: [[0, '#f472b6'], [1, '#8b5cf6']], acc: '#7bdff2', floor: '#120a26' },
  { bg: [[0, '#101a2e'], [1, '#1f3d6b']], tv: [[0, '#fbbf24'], [1, '#f97316']], acc: '#a7f3d0', floor: '#0a1222' },
  { bg: [[0, '#2a0e18'], [1, '#6b1d33']], tv: [[0, '#fb7185'], [1, '#f59e0b']], acc: '#fde68a', floor: '#1a0810' },
];
function ott(seed: number) {
  const r = rng(seed); const P = OTT[seed % OTT.length];
  let b = `<rect width="${W}" height="${H}" fill="url(#bg)"/><circle cx="600" cy="300" r="360" fill="url(#glow)"/>`;
  for (let i = 0; i < 40; i++) b += `<circle cx="${(r() * W).toFixed(0)}" cy="${(r() * 420).toFixed(0)}" r="${(0.8 + r() * 2).toFixed(1)}" fill="#fff" opacity="${(0.15 + r() * 0.4).toFixed(2)}"/>`;
  b += `<rect y="560" width="${W}" height="115" fill="${P.floor}"/>`;
  // TV
  b += `<rect x="330" y="120" width="540" height="316" rx="16" fill="#0b0b10"/><rect x="344" y="134" width="512" height="288" rx="8" fill="url(#tv)"/><circle cx="600" cy="278" r="62" fill="#fff" opacity=".92"/><path d="M584 244 L634 278 L584 312Z" fill="#111"/>`;
  b += `<path d="M540 436 H660 L680 470 H520Z" fill="#17171f"/><rect x="470" y="470" width="260" height="16" rx="8" fill="#17171f"/>`;
  // progress bar on TV
  b += `<rect x="372" y="396" width="456" height="8" rx="4" fill="#fff" opacity=".35"/><rect x="372" y="396" width="${150 + Math.floor(r() * 220)}" height="8" rx="4" fill="#fff"/>`;
  // laptop
  b += `<g transform="translate(90 330)"><path d="M0 0 H250 V160 H0Z" fill="#0b0b10"/><rect x="12" y="12" width="226" height="136" rx="4" fill="#161622"/>`;
  for (let i = 0; i < 6; i++) b += `<rect x="${22 + (i % 3) * 70}" y="${24 + Math.floor(i / 3) * 58}" width="62" height="48" rx="5" fill="${i % 2 ? P.acc : '#7c8cff'}" opacity="${0.5 + r() * 0.5}"/>`;
  b += `<path d="M-30 170 H280 L262 188 H-12Z" fill="#17171f"/></g>`;
  // phone
  b += `<g transform="translate(930 290)"><rect width="150" height="250" rx="26" fill="#0b0b10"/><rect x="10" y="14" width="130" height="222" rx="18" fill="#161622"/>`;
  for (let i = 0; i < 3; i++) b += `<rect x="20" y="${28 + i * 66}" width="110" height="54" rx="8" fill="${[P.acc, '#7c8cff', '#f472b6'][i]}" opacity="${0.55 + r() * 0.4}"/><path d="M${64} ${44 + i * 66} l24 11 l-24 11z" fill="#111"/>`;
  b += `</g>`;
  // floating tiles
  for (let i = 0; i < 5; i++) b += `<rect x="${60 + r() * 1000}" y="${60 + r() * 220}" width="${50 + r() * 40}" height="${34 + r() * 26}" rx="8" fill="${P.acc}" opacity="${0.12 + r() * 0.2}" transform="rotate(${(r() * 30 - 15).toFixed(0)})"/>`;
  return wrap(lin('bg', P.bg as any) + lin('tv', P.tv as any) + rad('glow', '#ffffff', 0.12), b);
}

export function storyArt(category: string, slug: string): string {
  const seed = hashStr(slug);
  return category === 'movies' ? movies(seed) : category === 'ott' ? ott(seed) : politics(seed);
}
