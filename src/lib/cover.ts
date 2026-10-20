// Text-free, bold cover art generated per article (no fonts needed, so it builds anywhere).
// Real photos can be set per article with `image:` in the article header.
// Bright, category-coloured covers: [background, shape1, shape2]
const BY_CAT: Record<string, string[]> = {
  politics: ['#c62828', '#ffb74d', '#ffffff'],
  movies: ['#6a1b9a', '#ff80ab', '#ffd54f'],
  ott: ['#00796b', '#80cbc4', '#fff176'],
  trending: ['#f9a825', '#ef5350', '#ffffff'],
  news: ['#0b3d91', '#64b5f6', '#ffffff'],
  sports: ['#2e7d32', '#aed581', '#ffffff'],
};
function hash(s: string) {
  let h = 2166136261;
  for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
  return h;
}
function rng(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function coverSvg(slug: string, category: string): string {
  const seed = hash(slug);
  const r = rng(seed);
  const [bg, b, c] = BY_CAT[category] ?? BY_CAT.news;
  const a = bg;
  const W = 1200, H = 675;
  let shapes = '';
  for (let i = 0; i < 7; i++) {
    const x = r() * W, y = r() * H, s = 80 + r() * 260;
    const fill = [b, c, '#000000'][i % 3];
    const op = (i % 3 === 2 ? 0.12 : 0.35 + r() * 0.4).toFixed(2);
    shapes +=
      i % 3 === 0
        ? `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${s.toFixed(0)}" fill="${fill}" opacity="${op}"/>`
        : i % 3 === 1
          ? `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${s.toFixed(0)}" height="${(s * 0.5).toFixed(0)}" rx="40" fill="${fill}" opacity="${op}" transform="rotate(${(r() * 60 - 30).toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})"/>`
          : `<polygon points="${x.toFixed(0)},${(y - s / 2).toFixed(0)} ${(x + s / 2).toFixed(0)},${(y + s / 2).toFixed(0)} ${(x - s / 2).toFixed(0)},${(y + s / 2).toFixed(0)}" fill="${fill}" opacity="${op}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="${bg}"/>${shapes}</svg>`;
}
