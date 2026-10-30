// What the pop-up shows besides the random reads: today's horoscope, the day's god, and the calendar download.
// Built with the site, so it changes whenever the home page does.
import { allArticles } from '../lib/articles';
import { RASHIS, reading } from '../lib/astro';
import { todayIST, WEEKDAYS } from '../lib/panchang';
import { dayFacts } from '../lib/daily';
import { WEEKDAY_FEATURE, WEEKDAY_ROTA } from '../data/weekday';
import { dayNumber } from '../lib/rotate';

export async function GET() {
  const ymd = todayIST();
  const f = dayFacts(ymd);
  const wk = WEEKDAY_FEATURE[f.wd];
  const arts = await allArticles();
  const slugs = new Set(arts.map((a) => a.slug));
  const week = Math.floor(dayNumber() / 7), rota = WEEKDAY_ROTA[f.wd];
  let pick = rota[0], lead: string | undefined;
  for (let i = 0; i < rota.length && !lead; i++) { const g = rota[(week + i) % rota.length]; const hit = arts.find((a) => g.kw.some((k) => a.slug.includes(k))); if (hit) { pick = g; lead = hit.slug; } }
  const rank = RASHIS.map((r, i) => ({ r, s: reading(i, ymd, 'daily').rating })).sort((x, y) => y.s - x.s);
  const body = {
    day: WEEKDAYS[f.wd],
    horoscope: {
      line: `${WEEKDAYS[f.wd]}: Moon in ${f.moonSign.skt}. A good day for ${rank[0].r.skt} and ${rank[1].r.skt}; go slowly if you are ${rank[11].r.skt}.`,
      signs: RASHIS.map((r) => ({ id: r.id, n: r.skt })),
    },
    god: {
      name: `${wk.name}: ${pick.god}`,
      line: pick.line,
      href: lead ? `/${lead}/` : `/mantras/${f.main.id}/`,
      mantra: `${f.mantra.name}: ${f.mantra.sa}`,
      meaning: f.mantra.meaning,
    },
  };
  return new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' } });
}
