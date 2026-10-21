// Illustrated portraits for the contributors: public/authors/<id>.svg + .png (512) and <id>-card.jpg (1200x630, with name).
import fs from 'node:fs';
import { Resvg } from '@resvg/resvg-js';
import jpeg from 'jpeg-js';

const FONTS = ['DejaVuSerif-Bold.ttf', 'DejaVuSans-Bold.ttf'].map((f) => `node_modules/dejavu-fonts-ttf/ttf/${f}`);
const P = [
  { id: 'raghunatha-sharma', name: 'Raghunatha Sharma', role: 'Devotional contributor', bg: ['#f6a23a', '#c4541b'], skin: '#c68a5c', hair: 'kudumi', hairC: '#1d1410', beard: null, tilak: 'namam', cloth: '#e8741c', shawl: '#fff4dc', motif: 'lamp', mala: false },
  { id: 'siva-pantulu', name: 'Siva Pantulu', role: 'Astrology contributor', bg: ['#3b3d8f', '#14143a'], skin: '#b97d52', hair: 'short', hairC: '#9a9a9a', beard: null, tilak: 'vibhuti', cloth: '#f3ead2', shawl: '#ffffff', motif: 'wheel', mala: true },
  { id: 'partha-sarathi-acharya', name: 'Partha Sarathi Acharya', role: 'Bhagavad Gita contributor', bg: ['#3a8fd0', '#173a73'], skin: '#c4885a', hair: 'shikha', hairC: '#201813', beard: null, tilak: 'namam', cloth: '#f7f0dc', shawl: '#f2b632', motif: 'chakra', mala: false },
  { id: 'sri-guru-brahma-sastry', name: 'Sri Guru Brahma Sastry', role: 'Yoga and spiritual contributor', bg: ['#3fae8c', '#14574a'], skin: '#b9794c', hair: 'bun', hairC: '#f1f1ee', beard: 'long', tilak: 'vibhuti', cloth: '#ef8a1e', shawl: '#ef8a1e', motif: 'lotus', mala: true },
  { id: 'ranganatha-dikshitar', name: 'Ranganatha Dikshitar', role: 'Temples contributor', bg: ['#b8352b', '#561412'], skin: '#bb7f55', hair: 'kudumi', hairC: '#17110d', beard: null, tilak: 'vibhuti', cloth: '#ffffff', shawl: '#f4ecd6', motif: 'gopuram', mala: true },
  { id: 'vidyaranya-murthy', name: 'Vidyaranya Murthy', role: 'Dharma contributor', bg: ['#8a56c6', '#341a5c'], skin: '#b57a50', hair: 'bald', hairC: '#eeeeee', beard: 'short', tilak: 'vibhuti', cloth: '#f08a22', shawl: '#f08a22', motif: 'trishul', mala: true },
  { id: 'lalitha-devi', name: 'Lalitha Devi', role: 'Prayer and faith-questions contributor', bg: ['#e0507a', '#7a1f45'], skin: '#c68a62', hair: 'braid', hairC: '#140e0c', beard: null, tilak: 'bindi', cloth: '#c6212f', shawl: '#f2b632', motif: 'bell', mala: false },
];

const motif = (m) => ({
  lamp: '<g transform="translate(70 300)" fill="#ffd36b"><path d="M0 30 Q30 60 60 30 Z"/><path d="M30 -2 Q40 14 30 26 Q20 14 30 -2Z" fill="#fff3b0"/></g>',
  wheel: '<g transform="translate(76 296)" stroke="#ffd36b" stroke-width="3" fill="none" opacity=".9"><circle r="34"/><circle r="20"/>' + [0,1,2,3,4,5].map((i) => `<line x1="0" y1="-34" x2="0" y2="34" transform="rotate(${i*30})"/>`).join('') + '</g>',
  chakra: '<g transform="translate(76 296)" stroke="#ffe08a" stroke-width="3" fill="none"><circle r="32"/><circle r="8" fill="#ffe08a"/>' + [0,1,2,3,4,5,6,7].map((i) => `<line x1="0" y1="-30" x2="0" y2="30" transform="rotate(${i*22.5})"/>`).join('') + '</g>',
  lotus: '<g transform="translate(76 322)" fill="#ffd1e6" stroke="#fff" stroke-width="1.5">' + [-50,-25,0,25,50].map((r) => `<path d="M0 0 Q-12 -26 0 -46 Q12 -26 0 0Z" transform="rotate(${r})"/>`).join('') + '</g>',
  gopuram: '<g transform="translate(46 262)" fill="#ffcf66" opacity=".95"><rect y="44" width="60" height="12"/><rect x="6" y="30" width="48" height="14"/><rect x="12" y="18" width="36" height="12"/><rect x="18" y="8" width="24" height="10"/><rect x="25" y="-2" width="10" height="10"/></g>',
  trishul: '<g transform="translate(76 290)" stroke="#ffe08a" stroke-width="4" fill="none" stroke-linecap="round"><line x1="0" y1="-26" x2="0" y2="46"/><path d="M-18 -22 Q-18 0 0 0 Q18 0 18 -22"/><line x1="-18" y1="-22" x2="-18" y2="-34"/><line x1="18" y1="-22" x2="18" y2="-34"/><line x1="0" y1="-26" x2="0" y2="-42"/></g>',
  bell: '<g transform="translate(76 296)" fill="#ffd36b"><path d="M-26 20 Q-24 -24 0 -26 Q24 -24 26 20 Z"/><rect x="-30" y="20" width="60" height="6" rx="3"/><circle cy="34" r="6"/></g>',
}[m]);

function avatar(p) {
  const hairBack = p.hair === 'braid' ? `<path d="M236 190 Q290 280 262 372" stroke="${p.hairC}" stroke-width="22" fill="none" stroke-linecap="round"/>` : '';
  const hairTop = { kudumi: `<path d="M148 150 Q150 96 200 94 Q250 96 252 150 Q230 118 200 118 Q170 118 148 150Z" fill="${p.hairC}"/><circle cx="200" cy="90" r="13" fill="${p.hairC}"/>`,
    short: `<path d="M146 156 Q146 98 200 96 Q254 98 254 156 Q232 126 200 126 Q168 126 146 156Z" fill="${p.hairC}"/>`,
    shikha: `<path d="M150 150 Q154 118 200 116 Q246 118 250 150 Q226 130 200 130 Q174 130 150 150Z" fill="${p.hairC}" opacity=".9"/><path d="M198 108 Q206 92 212 80 Q204 98 196 108Z" fill="${p.hairC}"/>`,
    bun: `<path d="M146 158 Q146 100 200 98 Q254 100 254 158 Q232 124 200 124 Q168 124 146 158Z" fill="${p.hairC}"/><circle cx="200" cy="84" r="20" fill="${p.hairC}"/>`,
    bald: `<path d="M150 150 Q154 128 200 126 Q246 128 250 150 Q228 136 200 136 Q172 136 150 150Z" fill="${p.hairC}" opacity=".35"/>`,
    braid: `<path d="M144 170 Q142 96 200 94 Q258 96 256 170 Q236 120 200 120 Q164 120 144 170Z" fill="${p.hairC}"/><g fill="#fff"><circle cx="232" cy="112" r="5"/><circle cx="246" cy="122" r="5"/><circle cx="252" cy="136" r="5"/></g>` }[p.hair];
  const beard = p.beard === 'long' ? `<path d="M154 196 Q160 292 200 316 Q240 292 246 196 Q226 236 200 236 Q174 236 154 196Z" fill="${p.hairC}"/>` : p.beard === 'short' ? `<path d="M156 200 Q166 262 200 270 Q234 262 244 200 Q226 232 200 232 Q174 232 156 200Z" fill="${p.hairC}" opacity=".95"/>` : '';
  const tilak = { namam: '<path d="M190 128 L190 160 M210 128 L210 160 M190 160 Q200 168 210 160" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M200 130 L200 158" stroke="#d62a1f" stroke-width="5" stroke-linecap="round"/>',
    vibhuti: '<g stroke="#f4f1ea" stroke-width="4.5" stroke-linecap="round"><line x1="176" y1="134" x2="224" y2="134"/><line x1="174" y1="143" x2="226" y2="143"/><line x1="176" y1="152" x2="224" y2="152"/></g><circle cx="200" cy="148" r="5" fill="#d62a1f"/>',
    bindi: '<circle cx="200" cy="146" r="6.5" fill="#d62a1f"/>' }[p.tilak];
  const mala = p.mala ? '<g fill="#6b3d1e">' + Array.from({ length: 11 }, (_, i) => { const t = (i / 10) * Math.PI; return `<circle cx="${200 - 58 * Math.cos(t)}" cy="${296 + 40 * Math.sin(t)}" r="6"/>`; }).join('') + '</g>' : '';
  const sari = p.id === 'lalitha-devi';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.bg[0]}"/><stop offset="1" stop-color="${p.bg[1]}"/></linearGradient><clipPath id="c"><circle cx="200" cy="200" r="200"/></clipPath></defs>
<g clip-path="url(#c)"><rect width="400" height="400" fill="url(#g)"/><circle cx="200" cy="170" r="128" fill="#fff" opacity=".13"/>${motif(p.motif)}
${hairBack}
<path d="M40 420 Q48 290 130 272 L270 272 Q352 290 360 420Z" fill="${p.cloth}"/>
${sari ? `<path d="M150 272 Q210 330 300 300 L330 420 L250 420Z" fill="${p.shawl}" opacity=".95"/>` : `<path d="M130 272 L270 420 L330 420 Q318 300 270 272Z" fill="${p.shawl}" opacity=".95"/>`}
<rect x="178" y="236" width="44" height="46" fill="${p.skin}"/>
<ellipse cx="200" cy="170" rx="54" ry="68" fill="${p.skin}"/>
<ellipse cx="146" cy="176" rx="8" ry="14" fill="${p.skin}"/><ellipse cx="254" cy="176" rx="8" ry="14" fill="${p.skin}"/>
${beard}${hairTop}
<g fill="#1b1210"><ellipse cx="180" cy="170" rx="5" ry="3.4"/><ellipse cx="220" cy="170" rx="5" ry="3.4"/></g>
<path d="M170 160 Q180 154 190 160 M210 160 Q220 154 230 160" stroke="#1b1210" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M200 174 L196 196 Q200 199 204 196" stroke="#00000033" stroke-width="3" fill="none"/>
<path d="M184 214 Q200 224 216 214" stroke="#6b2a22" stroke-width="4" fill="none" stroke-linecap="round"/>
${tilak}${mala}</g></svg>`;
}

const render = (svg, w, extra = {}) => new Resvg(svg, { fitTo: { mode: 'width', value: w }, font: { fontFiles: FONTS, loadSystemFonts: false, defaultFontFamily: 'DejaVu Serif' }, ...extra }).render();
const esc = (s) => s.replace(/&/g, '&amp;');
fs.mkdirSync('public/authors', { recursive: true });
for (const p of P) {
  const svg = avatar(p);
  fs.writeFileSync(`public/authors/${p.id}.svg`, svg);
  fs.writeFileSync(`public/authors/${p.id}.png`, render(svg, 512).asPng());
  const inner = svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
  const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="${p.bg[1]}"/><rect width="1200" height="630" fill="url(#bgc)"/><defs><linearGradient id="bgc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.bg[0]}" stop-opacity=".55"/><stop offset="1" stop-color="${p.bg[1]}" stop-opacity="0"/></linearGradient></defs>
<g transform="translate(60 115) scale(1)">${inner}</g>
<text x="500" y="250" font-family="DejaVu Sans" font-weight="700" font-size="22" letter-spacing="3" fill="#ffb347">${esc(p.role.toUpperCase())}</text>
<text x="500" y="330" font-family="DejaVu Serif" font-weight="700" font-size="${p.name.length > 20 ? 44 : 54}" fill="#fff">${esc(p.name)}</text>
<text x="500" y="390" font-family="DejaVu Sans" font-weight="700" font-size="26" fill="#fff" opacity=".85">Writes for Southwala</text>
<text x="1140" y="600" text-anchor="end" font-family="DejaVu Serif" font-weight="700" font-size="30" fill="#fff">Southwala<tspan fill="#ff4d3d">.</tspan></text></svg>`;
  const r = render(card, 1200);
  fs.writeFileSync(`public/authors/${p.id}-card.jpg`, jpeg.encode({ data: r.pixels, width: r.width, height: r.height }, 85).data);
}
console.log('done', P.length);
