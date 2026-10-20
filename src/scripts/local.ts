// Personalises panchangam timings to the visitor's place. Static HTML ships with Hyderabad; this swaps in the
// visitor's own sunrise-based timings. Location comes from the visitor's IP (approximate), or from the browser
// if they press "Use my exact location". Nothing is sent to our servers and nothing is stored but a small
// note in this browser.
type Loc = { lat: number; lon: number; name: string; src: 'ip' | 'gps'; ts: number };
const KEY = 'sw_loc_v1';
const els = () => Array.from(document.querySelectorAll<HTMLElement>('[data-local]'));

const read = (): Loc | null => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || 'null') as Loc | null;
    if (!v) return null;
    if (v.src === 'ip' && Date.now() - v.ts > 24 * 3600 * 1000) return null;
    return v;
  } catch { return null; }
};
const write = (l: Loc) => { try { localStorage.setItem(KEY, JSON.stringify(l)); } catch {} };
const clear = () => { try { localStorage.removeItem(KEY); } catch {} };

async function getJson(url: string) {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), 4000);
  try { const r = await fetch(url, { signal: c.signal }); return await r.json(); } finally { clearTimeout(t); }
}
async function ipLocation(): Promise<Loc | null> {
  try {
    const g = await getJson('https://get.geojs.io/v1/ip/geo.json');
    if (g && g.country_code === 'IN' && g.latitude) return { lat: +g.latitude, lon: +g.longitude, name: g.city || g.region || 'your area', src: 'ip', ts: Date.now() };
    if (g && g.country_code) return null; // outside India: IST timings would be wrong, keep default
  } catch {}
  try {
    const g = await getJson('https://ipwho.is/');
    if (g && g.success && g.country_code === 'IN') return { lat: +g.latitude, lon: +g.longitude, name: g.city || g.region || 'your area', src: 'ip', ts: Date.now() };
  } catch {}
  return null;
}

async function render(loc: Loc | null) {
  const nodes = els();
  if (!nodes.length) return;
  const P = await import('../lib/panchang');
  const place = loc ?? { ...P.CITIES.hyderabad, name: 'Hyderabad' };
  const ymd = P.todayIST();
  const p = P.panchangFor(ymd, { lat: place.lat, lon: place.lon });
  const ref = new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d));
  const t = (d: Date) => P.fmtTime(d, ref);
  const range = (r: { start: Date; end: Date }) => `${t(r.start)} to ${t(r.end)}`;
  const v: Record<string, string> = {
    name: place.name, sunrise: t(p.sunrise), sunset: t(p.sunset),
    rahu: range(p.rahu), yama: range(p.yama), gulika: range(p.gulika), abhijit: range(p.abhijit), brahma: range(p.brahma),
    tithi: `${p.tithi[0].paksha} ${p.tithi[0].name}`, nakshatra: p.nakshatra[0].name,
  };
  nodes.forEach((n) => { const k = n.dataset.local!; if (v[k] != null) n.textContent = v[k]; });
  const note = loc ? (loc.src === 'gps' ? 'your exact location' : `your approximate location (${loc.name}), from your IP address`) : 'Hyderabad (default)';
  document.querySelectorAll<HTMLElement>('[data-local-note]').forEach((n) => { n.textContent = `Timings shown for ${note}.`; });
  document.querySelectorAll<HTMLElement>('[data-local-reset]').forEach((n) => { n.hidden = !loc; });
  document.documentElement.dataset.localReady = '1';
}

async function boot() {
  if (!els().length) return;
  let loc = read();
  if (!loc) { loc = await ipLocation(); if (loc) write(loc); }
  if (loc) await render(loc);
  else document.querySelectorAll<HTMLElement>('[data-local-note]').forEach((n) => { n.textContent = 'Timings shown for Hyderabad (default).'; });
}

document.addEventListener('click', (e) => {
  const b = (e.target as HTMLElement).closest<HTMLElement>('[data-local-gps],[data-local-reset]');
  if (!b) return;
  e.preventDefault();
  if (b.hasAttribute('data-local-reset')) { clear(); location.reload(); return; }
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const P = await import('../lib/panchang');
    let best = 'hyderabad', bd = 1e9;
    for (const [id, c] of Object.entries(P.CITIES)) { const d = (c.lat - pos.coords.latitude) ** 2 + (c.lon - pos.coords.longitude) ** 2; if (d < bd) { bd = d; best = id; } }
    const l: Loc = { lat: pos.coords.latitude, lon: pos.coords.longitude, name: `near ${(P.CITIES as any)[best].name}`, src: 'gps', ts: Date.now() };
    write(l); render(l);
  }, () => { b.textContent = 'Location permission was denied'; }, { timeout: 8000 });
});

const go = () => ('requestIdleCallback' in window ? (window as any).requestIdleCallback(boot, { timeout: 2500 }) : setTimeout(boot, 800));
if (document.readyState === 'complete') go(); else window.addEventListener('load', go);
