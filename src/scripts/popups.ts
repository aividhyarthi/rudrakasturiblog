// "Surprise me": a small button on every page that opens a pop-up with a few random reads and the calendar download.
// It also opens once on its own after a visitor has stayed a while, at most once every 12 hours.
const KEY = 'sw_pop_v1';
const HOURS = 12;
const store = {
  get() { try { return Number(localStorage.getItem(KEY) ?? 0); } catch { return 0; } },
  set() { try { localStorage.setItem(KEY, String(Date.now())); } catch { /* private window */ } },
};

type Item = { t: string; u: string; k: string; g: string };
let items: Item[] | null = null;
let modal: HTMLElement | null = null;
let lastFocus: Element | null = null;

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
const here = () => location.pathname;

async function load() {
  if (items) return items;
  try { items = await (await fetch('/topics.json')).json(); } catch { items = []; }
  return items!;
}

/** Up to n picks, each from a different series or topic, never the page you are on. */
function pick(all: Item[], n: number, avoid: Set<string>) {
  const pool = all.filter((i) => i.u !== here() && !avoid.has(i.u));
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  const seen = new Set<string>(), out: Item[] = [];
  for (const i of pool) { if (!seen.has(i.g)) { seen.add(i.g); out.push(i); if (out.length === n) break; } }
  return out;
}

function close() {
  if (!modal) return;
  modal.remove(); modal = null;
  document.removeEventListener('keydown', onKey);
  (lastFocus as HTMLElement | null)?.focus?.();
}
function onKey(e: KeyboardEvent) { if (e.key === 'Escape') close(); }

async function open() {
  if (modal) return;
  lastFocus = document.activeElement;
  store.set();
  const all = await load();
  const shown = new Set<string>();
  const el = document.createElement('div');
  el.className = 'swp';
  el.innerHTML = `<div class="swp-back" data-close></div>
  <div class="swp-card" role="dialog" aria-modal="true" aria-labelledby="swp-h">
    <button class="swp-x" data-close aria-label="Close">&times;</button>
    <h2 id="swp-h">What would you like to read?</h2>
    <p class="swp-sub">Pick one. Each is a short read.</p>
    <div class="swp-list"></div>
    <button class="swp-more" type="button">Show me others</button>
    <a class="swp-cal" href="/calendar/"><b>Free 2027 Panchangam Calendar</b><span>Every tithi, Ekadashi, Pournami and Amavasya, with a Gita verse for each month. Download the PDF.</span></a>
  </div>`;
  const list = el.querySelector('.swp-list')!;
  const render = () => {
    const picks = pick(all, 3, shown);
    if (picks.length < 3) shown.clear();
    const use = picks.length ? picks : pick(all, 3, new Set());
    use.forEach((p) => shown.add(p.u));
    list.innerHTML = use.map((p) => `<a class="swp-item" href="${esc(p.u)}"><small>${esc(p.k)}</small><span>${esc(p.t)}</span></a>`).join('') || '<p class="swp-sub">Come back tomorrow for new stories.</p>';
  };
  render();
  el.querySelector('.swp-more')!.addEventListener('click', render);
  el.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('[data-close]')) close(); });
  document.body.appendChild(el);
  modal = el;
  document.addEventListener('keydown', onKey);
  (el.querySelector('.swp-item') as HTMLElement | null)?.focus();
}

function init() {
  if (document.querySelector('.swp-btn')) return;
  const b = document.createElement('button');
  b.className = 'swp-btn'; b.type = 'button'; b.textContent = 'Surprise me';
  b.setAttribute('aria-label', 'Show me something to read');
  b.addEventListener('click', open);
  document.body.appendChild(b);
  if (here().startsWith('/calendar')) return;
  // Open by itself once in a while: after a pause on the page, and only if it has been a while since the last time.
  if (Date.now() - store.get() < HOURS * 3600 * 1000) return;
  let done = false;
  const go = () => { if (!done && !modal) { done = true; open(); } };
  setTimeout(go, 30000);
  addEventListener('scroll', () => { if (scrollY > 0.55 * (document.body.scrollHeight - innerHeight) && scrollY > 600) go(); }, { passive: true });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
