// llms.txt: a short map of the site for answer engines and language models (https://llmstxt.org).
import { allArticles, categoryLabel, seriesCounts } from '../lib/articles';
import { CATEGORIES, SERIES, SITE } from '../config';
import { GODS, godMatches } from '../data/gods';
import { allFestivals } from '../lib/festivals';
import { todayIST, ymdKey } from '../lib/panchang';

export async function GET() {
  const all = (await allArticles()).sort((x, y) => y.data.date.getTime() - x.data.date.getTime());
  const sc = await seriesCounts();
  const U = SITE.url;
  const gods = GODS.map((g) => ({ g, n: all.filter((a) => godMatches(g, a)).length })).filter((x) => x.n >= 3);
  const cats = CATEGORIES.map((c) => ({ c, n: all.filter((a) => a.data.category === c.id).length })).filter((x) => x.n > 0);
  const today = ymdKey(todayIST());
  const fests = allFestivals().filter((f) => f.key >= today).slice(0, 12);
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    `Website: ${U}/`,
    'Languages: English, with Telugu, Tamil, Kannada, Malayalam and Sanskrit terms',
    'Region: South India (Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Kerala)',
    'Time zone: Indian Standard Time (IST). Panchangam times are calculated for each city from sunrise, using the Lahiri ayanamsa.',
    `Contact: ${SITE.email}`,
    '',
    'Each article is also available as plain Markdown at the same address with .md added (for example ' + `${U}/${all[0]?.slug ?? 'article'}.md). The full text of every published article is in ${U}/llms-full.txt.`,
    '',
    '## Daily pages (updated every day)',
    '',
    `- [Today's panchangam](${U}/panchangam/): tithi, nakshatra, Rahu Kalam, Amrit Kalam, Varjyam and good timings for Hyderabad, Visakhapatnam, Vijayawada, Tirupati, Bengaluru, Chennai and Kochi`,
    `- [Rahu Kalam today](${U}/rahu-kalam-today/): timings for every southern city`,
    `- [Horoscope today](${U}/rasi-phalalu/): rasi phalalu for all 12 rashis`,
    `- [Horoscope tomorrow](${U}/horoscope-tomorrow/)`,
    `- [Daily horoscope articles](${U}/daily-horoscope/) and [daily panchangam articles](${U}/daily-panchangam/)`,
    '',
    '## Dates and calendars',
    '',
    `- [Hindu festivals, month by month](${U}/festivals/)`,
    `- [Ekadashi dates](${U}/ekadashi/), [Pradosham dates](${U}/pradosham/), [Sankashti Chaturthi dates](${U}/sankashti-chaturthi/)`,
    `- [Amavasya dates](${U}/amavasya/) and [Pournami dates](${U}/pournami/)`,
    `- [Panchangam calendar 2027 (free PDF)](${U}/calendar/)`,
    ...fests.map((f) => `- [${f.name} ${f.ymd.y}](${U}/festivals/${f.slug}/): ${f.key}`),
    '',
    '## Gods and goddesses',
    '',
    ...gods.map(({ g, n }) => `- [${g.name}](${U}/gods/${g.id}/): ${g.line} (${n} articles)`),
    '',
    '## Series',
    '',
    ...SERIES.filter((s) => sc[s.id]).map((s) => `- [${s.label}](${U}/series/${s.id}/): ${s.blurb} (${sc[s.id]} articles)`),
    '',
    '## Topics',
    '',
    ...cats.map(({ c, n }) => `- [${c.label}](${U}/${c.id}/): ${c.blurb} (${n} articles)`),
    '',
    '## About and editorial policy',
    '',
    `- [About ${SITE.name}](${U}/about/)`,
    `- [Contributors and editorial desk](${U}/team/)`,
    `- [Editorial policy](${U}/editorial-policy/)`,
    `- [Right of reply](${U}/right-of-reply/)`,
    `- [Contact](${U}/contact/)`,
    '',
    '## Optional',
    '',
    `- [RSS feed](${U}/rss.xml)`,
    `- [Sitemap](${U}/sitemap-index.xml)`,
    `- [Full text of all articles](${U}/llms-full.txt)`,
    '',
    '## Articles, newest first',
    '',
    ...all.map((a) => `- [${a.data.title}](${U}/${a.slug}/) | [Markdown](${U}/${a.slug}.md) | ${categoryLabel(a.data.category)} | ${a.data.date.toISOString().slice(0, 10)}`),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
