// "Keep exploring" on the home page: a fresh random set of stories every time a visitor taps the button, with no rebuild needed.
type Item = { t: string; u: string; k: string; g: string };
const box = document.querySelector<HTMLElement>('[data-explore]');
const btn = document.querySelector<HTMLButtonElement>('[data-shuffle]');
let items: Item[] | null = null;
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));

async function load() {
  if (items) return items;
  try { items = await (await fetch('/topics.json')).json(); } catch { items = []; }
  return items!;
}
async function shuffle() {
  if (!box) return;
  const all = [...(await load())];
  for (let i = all.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [all[i], all[j]] = [all[j], all[i]]; }
  const seen = new Set<string>(), out: Item[] = [];
  for (const i of all) if (!seen.has(i.g)) { seen.add(i.g); out.push(i); if (out.length === 6) break; }
  if (out.length) box.innerHTML = out.map((i) => `<a href="${esc(i.u)}"><small>${esc(i.k)}</small><span>${esc(i.t)}</span></a>`).join('');
}
btn?.addEventListener('click', shuffle);
// Visitors who come back get a different set straight away.
if (box && sessionStorage.getItem('sw_home_seen')) shuffle();
try { sessionStorage.setItem('sw_home_seen', '1'); } catch { /* private window */ }
