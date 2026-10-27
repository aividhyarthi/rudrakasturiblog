// What the pop-up shows besides the random reads: today's horoscope, the day's god, and the calendar download.
// Built with the site, so it changes whenever the home page does.
import { allArticles } from '../lib/articles';
import { RASHIS, reading } from '../lib/astro';
import { todayIST, WEEKDAYS } from '../lib/panchang';
import { dayFacts } from '../lib/daily';
import { WEEKDAY_FEATURE } from '../data/weekday';

export async function GET() {
  const ymd = todayIST();
  const f = dayFacts(ymd);
  const wk = WEEKDAY_FEATURE[f.wd];
  const slugs = new Set((await allArticles()).map((a) => a.slug));
  const rank = RASHIS.map((r, i) => ({ r, s: reading(i, ymd, 'daily').rating })).sort((x, y) => y.s - x.s);
  const body = {
    day: WEEKDAYS[f.wd],
    horoscope: {
      line: `${WEEKDAYS[f.wd]}: Moon in ${f.moonSign.skt}. A good day for ${rank[0].r.skt} and ${rank[1].r.skt}; go slowly if you are ${rank[11].r.skt}.`,
      signs: RASHIS.map((r) => ({ id: r.id, n: r.skt })),
    },
    god: {
      name: wk.gods,
      line: wk.line,
      href: slugs.has(wk.lead) ? `/${wk.lead}/` : `/mantras/${f.main.id}/`,
      mantra: `${f.mantra.name}: ${f.mantra.sa}`,
      meaning: f.mantra.meaning,
    },
  };
  return new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' } });
}
