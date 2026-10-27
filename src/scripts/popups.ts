// "Surprise me": a small button on every page that opens a pop-up with a few random reads and the calendar download.
// It also opens once on its own after a visitor has stayed a while, at most once every 12 hours.
const KEY = 'sw_pop_v1';
const HOURS = 6;
const store = {
  get() { try { return Number(localStorage.getItem(KEY) ?? 0); } catch { return 0; } },
  set() { try { localStorage.setItem(KEY, String(Date.now())); } catch { /* private window */ } },
};

type Extra = { day: string; horoscope: { line: string; signs: { id: string; n: string }[] }; god: { name: string; line: string; href: string; mantra: string; meaning: string } };
let extra: Extra | null = null;
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

async function loadExtra() {
  if (extra) return extra;
  try { extra = await (await fetch('/popup.json')).json(); } catch { extra = null; }
  return extra;
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
  const [all, ex] = await Promise.all([load(), loadExtra()]);
  const shown = new Set<string>();
  const el = document.createElement('div');
  el.className = 'swp';
  const horo = ex ? `<section class="swp-sec"><small>1. Horoscope today</small><p>${esc(ex.horoscope.line)}</p><div class="swp-signs">${ex.horoscope.signs.map((s) => `<a href="/rasi-phalalu/${esc(s.id)}/">${esc(s.n)}</a>`).join('')}</div><a class="swp-go" href="/daily-horoscope/">Read today's horoscope</a></section>` : '';
  const god = ex ? `<section class="swp-sec"><small>2. ${esc(ex.day)}: the day's god</small><p><b>${esc(ex.god.name)}.</b> ${esc(ex.god.line)}</p><p class="swp-mantra">${esc(ex.god.mantra)}</p><a class="swp-go" href="${esc(ex.god.href)}">Worship ${esc(ex.day)} the right way</a></section>` : '';
  el.innerHTML = `<div class="swp-back" data-close></div>
  <div class="swp-card" role="dialog" aria-modal="true" aria-labelledby="swp-h">
    <button class="swp-x" data-close aria-label="Close">&times;</button>
    <h2 id="swp-h">Your Southwala today</h2>
    ${horo}${god}
    <section class="swp-sec"><small>3. Worth reading now</small><div class="swp-list"></div><button class="swp-more" type="button">Show me others</button></section>
    <a class="swp-cal" href="/calendar/"><b>Download the Panchangam Calendar 2027 (PDF)</b><span>Every tithi, Ekadashi, Pournami and Amavasya, festivals and a Gita verse for each month. Phone and print editions, free.</span></a>
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
  setTimeout(go, 12000);
  addEventListener('scroll', () => { if (scrollY > 0.35 * (document.body.scrollHeight - innerHeight) && scrollY > 500) go(); }, { passive: true });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
