// Shared drawing helpers for the Southwala illustrations.
export const W = 1600, H = 900;
export const svg = (defs, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><defs>${defs}</defs>${body}</svg>`;
export const rnd = (seed) => { let a = seed; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };

export const flame = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-26" r="34" fill="#ffd36b" opacity=".28"/><path d="M0 -58C14 -36 20 -24 20 -12C20 -2 11 6 0 6C-11 6 -20 -2 -20 -12C-20 -24 -12 -36 0 -58Z" fill="#ff9d2e"/><path d="M0 -38C7 -26 10 -20 10 -12C10 -6 6 -2 0 -2C-6 -2 -10 -6 -10 -12C-10 -20 -6 -26 0 -38Z" fill="#ffe27a"/></g>`;
export const diya = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${flame(0, -8)}<path d="M-34 0H34C32 20 18 30 0 30C-18 30 -32 20 -34 0Z" fill="#b8741a"/><path d="M-34 0H34" stroke="#f5c55b" stroke-width="5"/><ellipse cx="0" cy="0" rx="34" ry="7" fill="#d99a2b"/></g>`;
export const marigold = (cx, cy, r, c1, c2) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c1}"/><circle cx="${cx}" cy="${cy}" r="${r * 0.62}" fill="${c2}"/>`;
export function garland(x0, y0, x1, y1, sag, n, seed) {
  const r = rnd(seed); let o = '';
  for (let i = 0; i <= n; i++) { const t = i / n; const x = x0 + (x1 - x0) * t; const y = y0 + (y1 - y0) * t + Math.sin(Math.PI * t) * sag; o += marigold(x, y, 17 + r() * 4, i % 2 ? '#f59e0b' : '#ea580c', i % 2 ? '#fbbf24' : '#f59e0b'); }
  return o;
}
export function gopuram(cx, base, w0, tiers, tierH, pal) {
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
export const stars = (n, seed, y1, color = '#fff') => { const r = rnd(seed); let o = ''; for (let i = 0; i < n; i++) o += `<circle cx="${(r() * W).toFixed(0)}" cy="${(r() * y1).toFixed(0)}" r="${(0.8 + r() * 2.2).toFixed(1)}" fill="${color}" opacity="${(0.4 + r() * 0.6).toFixed(2)}"/>`; return o; };
export const hills = (y, color, seed, amp = 70) => { const r = rnd(seed); let d = `M0 ${H} L0 ${y}`; for (let x = 0; x <= W; x += 100) d += ` L${x} ${(y - r() * amp).toFixed(0)}`; return `<path d="${d} L${W} ${H} Z" fill="${color}"/>`; };
export const lotus = (cx, cy, s, c1, c2) => { let o = `<g transform="translate(${cx} ${cy}) scale(${s})">`; for (const a of [-70, -38, 0, 38, 70]) o += `<path d="M0 0 C-34 -40 -30 -110 0 -150 C30 -110 34 -40 0 0Z" fill="${Math.abs(a) > 40 ? c2 : c1}" transform="rotate(${a})"/>`; return o + `<ellipse cx="0" cy="4" rx="90" ry="12" fill="#2f7d5b" opacity=".6"/></g>`; };
export const hibiscus = (cx, cy, s) => { let o = `<g transform="translate(${cx} ${cy}) scale(${s})">`; for (let i = 0; i < 5; i++) o += `<ellipse cx="0" cy="-30" rx="22" ry="36" fill="#dc2626" transform="rotate(${i * 72})"/>`; return o + `<circle r="9" fill="#fde68a"/></g>`; };

