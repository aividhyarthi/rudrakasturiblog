// Article illustrations: a base drawing from public/heroes with a small, seeded colour shift so each story looks its own,
// and a cropper that makes the 16:9, 4:3 and 1:1 versions Google asks for.
import { readFileSync, existsSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';
import { storyArt } from './storyart';

const hash = (s: string) => { let h = 2166136261; for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0; return h; };

export function articleSvg(a: { slug: string; data: { category: string; hero?: string } }): string {
  const file = a.data.hero ? `public/heroes/${a.data.hero}.svg` : '';
  if (!file || !existsSync(file)) return storyArt(a.data.category, a.slug);
  const raw = readFileSync(file, 'utf8');
  const deg = (hash(a.slug) % 41) - 20; // -20..+20 degrees
  const m = raw.match(/^(<svg[^>]*>)([\s\S]*)<\/svg>\s*$/);
  if (!m) return raw;
  return `${m[1]}<defs><filter id="shift"><feColorMatrix type="hueRotate" values="${deg}"/></filter></defs><g filter="url(#shift)">${m[2]}</g></svg>`;
}

export const SIZES = { '16x9': [1600, 900], '4x3': [1200, 900], '1x1': [1200, 1200] } as const;
export type SizeKey = keyof typeof SIZES;

/** Re-frame a 1600x900 drawing to another aspect ratio by filling the frame and trimming the edges. */
export function cropped(svg: string, w: number, h: number): string {
  const m = svg.match(/^<svg[^>]*>([\s\S]*)<\/svg>\s*$/);
  const inner = m ? m[1] : svg;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><svg x="0" y="0" width="${w}" height="${h}" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" overflow="hidden">${inner}</svg></svg>`;
}

export function articlePng(a: { slug: string; data: { category: string; hero?: string } }, size: SizeKey): Uint8Array {
  const [w, h] = SIZES[size];
  const svg = size === '16x9' ? articleSvg(a) : cropped(articleSvg(a), w, h);
  return new Resvg(svg, { fitTo: { mode: 'width', value: w } }).render().asPng();
}
