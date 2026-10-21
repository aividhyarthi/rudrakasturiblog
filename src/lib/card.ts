// Headline cards (1200x675) for social sharing and Google Discover: white, black type, our wordmark.
// Fonts are bundled (DejaVu) so the card renders the same on every machine.
import fs from 'node:fs';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';

const FONT_DIR = path.resolve('node_modules/dejavu-fonts-ttf/ttf');
const FONTS = ['DejaVuSerif-Bold.ttf', 'DejaVuSans-Bold.ttf'].map((f) => path.join(FONT_DIR, f));

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function wrap(text: string, perLine: number, maxLines: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > perLine && cur) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) { lines.length = maxLines; lines[maxLines - 1] = lines[maxLines - 1].replace(/[ ,.;:]+\S*$/, '') + '…'; }
  return lines;
}

export function cardSvg(kicker: string, title: string): string {
  const len = title.length;
  const size = len > 110 ? 46 : len > 80 ? 54 : len > 50 ? 62 : 72;
  const perLine = Math.floor(1020 / (size * 0.64));
  const lines = wrap(title, perLine, 5);
  const lh = Math.round(size * 1.22);
  const startY = 190 + (5 - lines.length) * 6;
  const text = lines.map((l, i) => `<text x="90" y="${startY + i * lh}" font-family="DejaVu Serif" font-weight="700" font-size="${size}" fill="#000">${esc(l)}</text>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
<rect width="1200" height="675" fill="#fff"/>
<rect x="16" y="16" width="1168" height="643" fill="none" stroke="#000" stroke-width="3"/>
<rect x="16" y="16" width="1168" height="10" fill="#000"/>
<text x="90" y="110" font-family="DejaVu Sans" font-weight="700" font-size="26" letter-spacing="5" fill="#000">${esc(kicker.toUpperCase())}</text>
<rect x="90" y="128" width="64" height="5" fill="#000"/>
${text}
<line x1="90" y1="582" x2="1110" y2="582" stroke="#000" stroke-width="2"/>
<text x="90" y="632" font-family="DejaVu Serif" font-weight="700" font-size="40" fill="#000">Southwala</text>
<text x="1110" y="630" text-anchor="end" font-family="DejaVu Sans" font-weight="700" font-size="22" letter-spacing="2" fill="#000">southwala.com</text>
</svg>`;
}

export function cardPng(kicker: string, title: string): Buffer {
  const r = new Resvg(cardSvg(kicker, title), { fitTo: { mode: 'width', value: 1200 }, font: { fontFiles: FONTS, loadSystemFonts: false, defaultFontFamily: 'DejaVu Serif' } });
  return r.render().asPng();
}

export function logoPng(): Buffer {
  // The same mark as the favicon: a serif S with a red dot, on white, 512x512.
  const fav = fs.readFileSync('public/favicon.svg', 'utf8').replace('<rect width="64" height="64" rx="14" fill="#fff"/>', '<rect width="64" height="64" fill="#fff"/>');
  return new Resvg(fav, { fitTo: { mode: 'width', value: 512 } }).render().asPng();
}
