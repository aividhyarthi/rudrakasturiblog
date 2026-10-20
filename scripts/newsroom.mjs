// The Southwala newsroom: finds fresh South India stories, asks Claude to write them
// in the house voice (newsroom/editor-guide.md), and saves them as articles.
import fs from 'node:fs';
import path from 'node:path';
import { XMLParser } from 'fast-xml-parser';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const CFG = JSON.parse(fs.readFileSync(path.join(ROOT, 'newsroom/sources.json'), 'utf8'));
const GUIDE = fs.readFileSync(path.join(ROOT, 'newsroom/editor-guide.md'), 'utf8');
const SEEN_FILE = path.join(ROOT, 'newsroom/seen.json');
const OUT_DIR = path.join(ROOT, 'src/content/articles');

const DRY = process.env.DRY_RUN === '1';
const API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5';
const MAX = Number(process.env.MAX_ARTICLES || CFG.maxArticlesPerRun || 4);
// Politics always waits for a human unless you turn this off in the GitHub settings.
const POLITICS_REVIEW = (process.env.POLITICS_REVIEW || 'on') !== 'off';

const seen = fs.existsSync(SEEN_FILE) ? JSON.parse(fs.readFileSync(SEEN_FILE, 'utf8')) : { titles: [] };
const parser = new XMLParser({ ignoreAttributes: false });

const norm = (s) => s.toLowerCase().replace(/ - [^-]+$/, '').replace(/[^a-z0-9ऀ-෿ ]/g, ' ').split(/\s+/).filter((w) => w.length > 2);
const jaccard = (a, b) => {
  const A = new Set(a), B = new Set(b);
  const i = [...A].filter((x) => B.has(x)).length;
  return i / (A.size + B.size - i || 1);
};
const strip = (h = '') => String(h).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

async function fetchFeed(f) {
  const url = f.url || `https://news.google.com/rss/search?q=${encodeURIComponent(f.query + ' when:1d')}&hl=en-IN&gl=IN&ceid=IN:en`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 SouthwalaBot' }, signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(res.status);
    const xml = parser.parse(await res.text());
    const items = [].concat(xml?.rss?.channel?.item ?? []);
    return items.map((it) => ({
      title: strip(it.title),
      link: it.link,
      publisher: strip(it.source?.['#text'] ?? it.source ?? ''),
      snippet: strip(it.description),
      date: new Date(it.pubDate),
      category: f.category,
      region: f.region,
    }));
  } catch (e) {
    console.warn('feed failed:', f.query || f.url, String(e));
    return [];
  }
}

function cluster(items) {
  const clusters = [];
  for (const it of items) {
    const t = norm(it.title);
    const hit = clusters.find((c) => jaccard(c.tokens, t) > 0.45);
    if (hit) hit.items.push(it);
    else clusters.push({ tokens: t, items: [it], category: it.category, region: it.region });
  }
  return clusters;
}

async function writeStory(c) {
  const material = c.items.slice(0, 6).map((i, n) => `${n + 1}. [${i.publisher || 'unknown outlet'}] ${i.title}\n   ${i.snippet.slice(0, 400)}\n   ${i.link}`).join('\n');
  const user = `Category: ${c.category}\nRegion: ${c.region}\nToday: ${new Date().toISOString().slice(0, 10)}\n\nSOURCE MATERIAL (several outlets covering the same story):\n${material}\n\nWrite the Southwala story now. JSON only.`;
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: MODEL, max_tokens: 2500, system: GUIDE, messages: [{ role: 'user', content: user }] }),
    signal: AbortSignal.timeout(120000),
  });
  if (!res.ok) throw new Error(`Claude API ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const text = data.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
  const json = text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1);
  return JSON.parse(json);
}

const q = (s) => JSON.stringify(String(s)); // JSON strings are valid YAML

function toMarkdown(c, a) {
  const draft = a.risk === 'high' || (POLITICS_REVIEW && c.category === 'politics');
  const sources = c.items.slice(0, 5).filter((i) => i.publisher && i.link);
  const fm = [
    '---',
    `title: ${q(a.title)}`,
    `description: ${q(a.description)}`,
    `date: ${new Date().toISOString()}`,
    `category: ${c.category}`,
    `region: ${c.region}`,
    `format: ${q(a.format || '60-Second Explainer')}`,
    `tldr: ${q(a.tldr)}`,
    `imageAlt: ${q(a.imageAlt || a.title)}`,
    `tags: ${JSON.stringify(a.tags || [])}`,
    'sources:',
    ...sources.map((s) => `  - { title: ${q(s.title)}, url: ${q(s.link)}, publisher: ${q(s.publisher)} }`),
    `draft: ${draft}`,
    `reviewNote: ${q(a.reviewNote || '')}`,
    '---',
    '',
    a.body.trim(),
    '',
  ];
  return { draft, text: fm.join('\n') };
}

async function main() {
  const all = (await Promise.all(CFG.feeds.map(fetchFeed))).flat();
  const cutoff = Date.now() - CFG.maxAgeHours * 3600 * 1000;
  const fresh = all.filter((i) => i.title && i.date.getTime() > cutoff);
  const seenTok = seen.titles.map(norm);
  const clusters = cluster(fresh)
    .filter((c) => !seenTok.some((t) => jaccard(t, c.tokens) > 0.45))
    .map((c) => ({ ...c, score: new Set(c.items.map((i) => i.publisher)).size * 10 + c.items.length }))
    .sort((a, b) => b.score - a.score);

  // Spread the picks across categories so the front page is not all one topic.
  const picks = [], used = {};
  for (const c of clusters) {
    if ((used[c.category] ?? 0) >= 2) continue;
    used[c.category] = (used[c.category] ?? 0) + 1;
    picks.push(c);
    if (picks.length >= MAX) break;
  }
  console.log(`${all.length} items, ${fresh.length} fresh, ${clusters.length} new stories, writing ${picks.length}`);

  if (DRY || !API_KEY) {
    for (const c of picks) console.log(`- [${c.category}/${c.region}] (${c.items.length} reports) ${c.items[0].title}`);
    if (!DRY) console.log('\nNo ANTHROPIC_API_KEY set, so nothing was written.');
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const c of picks) {
    try {
      const a = await writeStory(c);
      if (a.skip) { console.log('skipped:', a.reason); seen.titles.push(c.items[0].title); continue; }
      const slug = String(a.slug || a.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70);
      const file = path.join(OUT_DIR, `${slug}.md`);
      if (fs.existsSync(file)) continue;
      const { draft, text } = toMarkdown(c, a);
      fs.writeFileSync(file, text);
      seen.titles.push(c.items[0].title);
      console.log(`${draft ? 'DRAFT ' : 'LIVE  '} ${slug}`);
    } catch (e) {
      console.warn('story failed:', c.items[0].title, String(e));
    }
  }
  seen.titles = seen.titles.slice(-600);
  fs.writeFileSync(SEEN_FILE, JSON.stringify(seen, null, 1));
}
main();
