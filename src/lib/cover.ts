// Text-free, bold cover art generated per article (no fonts needed, so it builds anywhere).
// Real photos can be set per article with `image:` in the article header.
const PALETTES = [
  ['#ff3d81', '#7a2cff', '#c6ff3d'],
  ['#00d4ff', '#2340f5', '#ff3d81'],
  ['#ffb800', '#ff3d81', '#1a1033'],
  ['#c6ff3d', '#00a870', '#0d0d12'],
  ['#ff6a3d', '#c4004f', '#ffe14a'],
  ['#7a2cff', '#00d4ff', '#c6ff3d'],
];

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
  const [a, b, c] = PALETTES[seed % PALETTES.length];
  const W = 1200, H = 675;
  let shapes = '';
  for (let i = 0; i < 7; i++) {
    const x = r() * W, y = r() * H, s = 80 + r() * 260;
    const fill = [a, b, c][i % 3];
    const op = (0.25 + r() * 0.55).toFixed(2);
    shapes +=
      i % 3 === 0
        ? `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${s.toFixed(0)}" fill="${fill}" opacity="${op}"/>`
        : i % 3 === 1
          ? `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${s.toFixed(0)}" height="${(s * 0.5).toFixed(0)}" rx="40" fill="${fill}" opacity="${op}" transform="rotate(${(r() * 60 - 30).toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})"/>`
          : `<polygon points="${x.toFixed(0)},${(y - s / 2).toFixed(0)} ${(x + s / 2).toFixed(0)},${(y + s / 2).toFixed(0)} ${(x - s / 2).toFixed(0)},${(y + s / 2).toFixed(0)}" fill="${fill}" opacity="${op}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0d0d12"/><stop offset="1" stop-color="#1a1033"/></linearGradient></defs>
<rect width="${W}" height="${H}" fill="url(#g)"/>${shapes}
<rect x="0" y="${H - 14}" width="${W}" height="14" fill="${a}"/></svg>`;
}
