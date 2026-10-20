// Reads Google News RSS and publisher sitemaps (including news sitemaps and sitemap indexes).
import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({ ignoreAttributes: false });
const arr = (x) => (x == null ? [] : [].concat(x));
export const strip = (h = '') => String(h).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; SouthwalaBot/1.0)' };

async function getXml(url) {
  const res = await fetch(url, { headers: UA, signal: AbortSignal.timeout(25000) });
  if (!res.ok) throw new Error(`${res.status}`);
  return parser.parse(await res.text());
}

export function parseRss(xml, f) {
  return arr(xml?.rss?.channel?.item).map((it) => ({
    title: strip(it.title), link: it.link,
    publisher: strip(it.source?.['#text'] ?? it.source ?? ''),
    snippet: strip(it.description), date: new Date(it.pubDate),
    category: f.category, region: f.region, lang: 'en',
  }));
}

export function parseSitemap(xml, f) {
  return arr(xml?.urlset?.url).map((u) => {
    const n = u['news:news'] ?? {};
    const title = strip(n['news:title'] ?? u['image:image']?.['image:title'] ?? '');
    const date = new Date(n['news:publication_date'] ?? u.lastmod ?? 0);
    return { title, link: u.loc, publisher: f.outlet || '', snippet: '', date, category: f.category, region: f.region, lang: 'te' };
  }).filter((i) => i.title && i.link);
}

export async function fetchFeed(f) {
  try {
    if (f.sitemap) {
      let xml = await getXml(f.sitemap);
      if (xml?.sitemapindex) {
        // An index lists many sitemaps; read the freshest two.
        const kids = arr(xml.sitemapindex.sitemap).sort((a, b) => String(b.lastmod).localeCompare(String(a.lastmod))).slice(0, 2);
        const all = [];
        for (const k of kids) { try { all.push(...parseSitemap(await getXml(k.loc), f)); } catch {} }
        return all;
      }
      return parseSitemap(xml, f);
    }
    const url = f.url || `https://news.google.com/rss/search?q=${encodeURIComponent(f.query + ' when:1d')}&hl=en-IN&gl=IN&ceid=IN:en`;
    return parseRss(await getXml(url), f);
  } catch (e) {
    console.warn('feed failed:', f.outlet || f.query || f.sitemap || f.url, String(e));
    return [];
  }
}

// Page summary for sitemap items (they carry only a headline).
export async function pageSummary(url) {
  try {
    const res = await fetch(url, { headers: UA, signal: AbortSignal.timeout(15000) });
    if (!res.ok) return '';
    const html = (await res.text()).slice(0, 400000);
    const pick = (re) => html.match(re)?.[1] ?? '';
    const d = pick(/<meta[^>]+(?:property="og:description"|name="description")[^>]+content="([^"]*)"/i) || pick(/<meta[^>]+content="([^"]*)"[^>]+(?:property="og:description"|name="description")/i);
    const paras = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => strip(m[1])).filter((t) => t.length > 60).slice(0, 5).join(' ');
    return strip(`${d} ${paras}`).slice(0, 1500);
  } catch { return ''; }
}

// Classify Telugu/English stories by simple keywords so we can pick a state and a section.
const RX = {
  politics: /రాజకీయ|చంద్రబాబు|జగన్|పవన్|కేటీఆర్|కేసీఆర్|రేవంత్|ప్రభుత్వ|సీఎం|మంత్రి|ఎమ్మెల్యే|ఎంపీ|టీడీపీ|వైసీపీ|బీఆర్ఎస్|కాంగ్రెస్|బీజేపీ|జనసేన|అసెంబ్లీ|ఎన్నిక|politic|minister|assembly|election|chief minister/i,
  movies: /సినిమా|మూవీ|హీరో|హీరోయిన్|టాలీవుడ్|బాక్సాఫీస్|ట్రైలర్|దర్శకుడు|movie|film|tollywood|box office/i,
  ott: /ఓటీటీ|వెబ్ సిరీస్|నెట్‌ఫ్లిక్స్|అమెజాన్ ప్రైమ్|హాట్‌స్టార్|ott|netflix|web series/i,
  sports: /క్రికెట్|ఐపీఎల్|మ్యాచ్|క్రీడ|cricket|ipl|match|football/i,
};
const RX_TS = /తెలంగాణ|హైదరాబాద్|కేసీఆర్|కేటీఆర్|రేవంత్|బీఆర్ఎస్|telangana|hyderabad|revanth|ktr|kcr|brs/i;
const RX_AP = /ఆంధ్ర|ఏపీ|అమరావతి|చంద్రబాబు|జగన్|పవన్|లోకేశ్|విశాఖ|విజయవాడ|తిరుపతి|టీడీపీ|వైసీపీ|జనసేన|andhra|amaravati|naidu|jagan|pawan|visakhapatnam|vijayawada|tdp|ysrcp/i;

export function classify(item) {
  const text = `${item.title} ${item.link}`;
  let category = item.category;
  if (category === 'auto') {
    category = ['ott', 'movies', 'sports', 'politics'].find((c) => RX[c].test(text)) || 'news';
  }
  let region = item.region;
  if (region === 'auto') {
    const ts = RX_TS.test(text), ap = RX_AP.test(text);
    region = ts && !ap ? 'ts' : ap && !ts ? 'ap' : null;
    if (!region) {
      // Not clear from the headline: split evenly so neither state is favoured.
      let h = 0; for (const ch of item.link) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
      region = h % 2 ? 'ts' : 'ap';
    }
  }
  return { ...item, category, region };
}
