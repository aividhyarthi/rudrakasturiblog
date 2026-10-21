// Article illustrations: a base drawing from public/heroes with a small, seeded colour shift so each story looks its own,
// plus the JPEG versions Google and WhatsApp need (16:9, 4:3, 1:1 for schema, and a 1200x630 share card with the title).
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import jpeg from 'jpeg-js';
import { storyArt } from './storyart';

const hash = (s: string) => { let h = 2166136261; for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0; return h; };
const FONT_DIR = path.resolve('node_modules/dejavu-fonts-ttf/ttf');
const FONTS = ['DejaVuSerif-Bold.ttf', 'DejaVuSans-Bold.ttf'].map((f) => path.join(FONT_DIR, f));
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

type A = { slug: string; data: { category: string; hero?: string; title?: string } };

export function articleSvg(a: A): string {
  const file = a.data.hero ? `public/heroes/${a.data.hero}.svg` : '';
  if (!file || !existsSync(file)) return storyArt(a.data.category, a.slug);
  const raw = readFileSync(file, 'utf8');
  const deg = (hash(a.slug) % 41) - 20; // -20..+20 degrees
  const m = raw.match(/^(<svg[^>]*>)([\s\S]*)<\/svg>\s*$/);
  if (!m) return raw;
  return `${m[1]}<defs><filter id="shift" filterUnits="userSpaceOnUse" x="0" y="0" width="1600" height="900"><feColorMatrix type="hueRotate" values="${deg}"/></filter></defs><g filter="url(#shift)">${m[2]}</g></svg>`;
}

export const SIZES = { '16x9': [1600, 900], '4x3': [1200, 900], '1x1': [1200, 1200] } as const;
export type SizeKey = keyof typeof SIZES;

const inner = (svg: string) => (svg.match(/^<svg[^>]*>([\s\S]*)<\/svg>\s*$/) ?? [, svg])[1] as string;

/** Re-frame a 1600x900 drawing to another aspect ratio by filling the frame and trimming the edges. */
function frame(svg: string, w: number, h: number): string {
  return `<svg x="0" y="0" width="${w}" height="${h}" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" overflow="hidden">${inner(svg)}</svg>`;
}

function toJpeg(svg: string, w: number, quality = 82): Uint8Array {
  const r = new Resvg(svg, { fitTo: { mode: 'width', value: w }, font: { fontFiles: FONTS, loadSystemFonts: false, defaultFontFamily: 'DejaVu Serif' } }).render();
  return jpeg.encode({ data: r.pixels, width: r.width, height: r.height }, quality).data;
}

export function articleJpg(a: A, size: SizeKey): Uint8Array {
  const [w, h] = SIZES[size];
  const wrapper = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${frame(articleSvg(a), w, h)}</svg>`;
  return toJpeg(wrapper, w);
}

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

/** 1200x630 share card for WhatsApp, Facebook and X: the illustration with the headline on a dark band. */
export function shareJpg(a: A, kicker: string): Uint8Array {
  const title = a.data.title ?? '';
  const size = title.length > 70 ? 46 : title.length > 48 ? 54 : 62;
  const lines = wrap(title, Math.floor(1080 / (size * 0.62)), 3);
  const lh = Math.round(size * 1.18);
  const bandH = 56 + lines.length * lh + 40;
  const y0 = 630 - bandH;
  const text = lines.map((l, i) => `<text x="60" y="${y0 + 44 + size + i * lh - 14}" font-family="DejaVu Serif" font-weight="700" font-size="${size}" fill="#fff">${esc(l)}</text>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">${frame(articleSvg(a), 1200, 630)}
<rect x="0" y="${y0}" width="1200" height="${bandH}" fill="#0d0b12" opacity=".86"/>
<text x="60" y="${y0 + 36}" font-family="DejaVu Sans" font-weight="700" font-size="20" letter-spacing="3" fill="#ffb347">${esc(kicker.toUpperCase())}</text>
${text}
<text x="1140" y="600" text-anchor="end" font-family="DejaVu Serif" font-weight="700" font-size="30" fill="#fff">Southwala<tspan fill="#ff4d3d">.</tspan></text></svg>`;
  return toJpeg(svg, 1200, 84);
}
