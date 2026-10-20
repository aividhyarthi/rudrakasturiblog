// The Southwala newsroom: finds fresh stories across the five southern states, assigns a state
// desk byline and tone, asks Claude to write the story (newsroom/editor-guide.md), saves it.
import fs from 'node:fs';
import path from 'node:path';
import { fetchFeed, classify, pageSummary } from './lib/feeds.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const CFG = JSON.parse(read('newsroom/sources.json'));
const GUIDE = read('newsroom/editor-guide.md');
const STATES = JSON.parse(read('newsroom/states.json'));
const FACTS = read('newsroom/facts.md');
const BYLINES = JSON.parse(read('newsroom/bylines.json'));
const SEEN_FILE = path.join(ROOT, 'newsroom/seen.json');
const OUT_DIR = path.join(ROOT, 'src/content/articles');

const DRY = process.env.DRY_RUN === '1';
const API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5';
const MAX = Number(process.env.MAX_ARTICLES || CFG.maxArticlesPerRun || 6);
// Politics always waits for a human unless you set POLITICS_REVIEW=off.
const POLITICS_REVIEW = (process.env.POLITICS_REVIEW || 'on') !== 'off';

const seen = fs.existsSync(SEEN_FILE) ? JSON.parse(fs.readFileSync(SEEN_FILE, 'utf8')) : { titles: [], links: [] };
seen.links ??= [];

const norm = (s) => s.toLowerCase().replace(/ - [^-]+$/, '').replace(/[^a-z0-9ऀ-෿ ]/g, ' ').split(/\s+/).filter((w) => w.length > 2);
const jaccard = (a, b) => {
  const A = new Set(a), B = new Set(b);
  const i = [...A].filter((x) => B.has(x)).length;
  return i / (A.size + B.size - i || 1);
};
const hash = (s) => { let h = 2166136261; for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0; return h; };

function cluster(items) {
  const clusters = [];
  for (const it of items) {
    const t = norm(it.title);
    const hit = clusters.find((c) => jaccard(c.tokens, t) > 0.4);
    if (hit) hit.items.push(it);
    else clusters.push({ tokens: t, items: [it], category: it.category, region: it.region });
  }
  return clusters;
}

// Same story always gets the same writer; different stories in a section rotate across the desk.
function pickByline(c, key) {
  const state = c.region === 'south' ? Object.keys(BYLINES)[hash(key) % 5] : c.region;
  const desk = BYLINES[state];
  const pool = desk.filter((p) => p.category === c.category);
  const list = pool.length ? pool : desk;
  return { state, person: list[hash(key) % list.length] };
}

async function writeStory(c, who) {
  const cards = Object.entries(STATES).map(([k, s]) => `- ${k} (${s.label}): parties to treat symmetrically: ${s.parties}. Tone: ${s.tone}`).join('\n');
  const material = [];
  for (const [n, i] of c.items.slice(0, 6).entries()) {
    let body = i.snippet;
    if (i.lang === 'te' && n < 3) body = await pageSummary(i.link);
    material.push(`${n + 1}. [${i.publisher || 'unknown outlet'}${i.lang === 'te' ? ', Telugu-language source' : ''}] ${i.title}\n   ${body.slice(0, 1200)}\n   ${i.link}`);
  }
  const st = STATES[who.state];
  const user = [
    `Byline: ${who.person.name}, ${st.label} ${c.category} desk. Voice: ${who.person.voice}. Write in this voice.`,
    `Section: ${c.category}. State focus: ${st.label} (${c.region}).`,
    `State tone cards (apply the one for this story's state):\n${cards}`,
    `Today: ${new Date().toISOString().slice(0, 10)}`,
    FACTS,
    `Some sources are in Telugu: understand them, then write natural English. Transliterate names consistently and never paste Telugu text unless translated.`,
    `SOURCE MATERIAL (several outlets covering the same story):\n${material.join('\n')}`,
    'Write the Southwala story now. JSON only.',
  ].join('\n\n');
  // The writer checks facts with web search. If web search is not enabled on the account, fall back to plain mode
  // (the guide then makes it skip stories it cannot confirm from the material supplied).
  const call = (tools) => fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: MODEL, max_tokens: 4000, system: GUIDE, messages: [{ role: 'user', content: user }], ...(tools ? { tools } : {}) }),
    signal: AbortSignal.timeout(240000),
  });
  let res = await call([{ type: 'web_search_20250305', name: 'web_search', max_uses: 5 }]);
  if (res.status === 400 && /web.?search/i.test(await res.clone().text())) { console.warn('web search unavailable, writing without it'); res = await call(null); }
  if (!res.ok) throw new Error(`Claude API ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const text = data.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
  return JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
}

const q = (s) => JSON.stringify(String(s)); // JSON strings are valid YAML

function toMarkdown(c, a, who) {
  const draft = a.risk === 'high' || (POLITICS_REVIEW && c.category === 'politics');
  const sources = c.items.filter((i) => i.publisher && i.link).slice(0, 5);
  const fm = [
    '---',
    `title: ${q(a.title)}`,
    `description: ${q(a.description)}`,
    `date: ${new Date().toISOString()}`,
    `category: ${c.category}`,
    `region: ${c.region}`,
    `author: ${q(who.person.name)}`,
    `format: ${q(a.format || '60-Second Explainer')}`,
    `tldr: ${q(a.tldr)}`,
    `imageAlt: ${q(a.imageAlt || a.title)}`,
    `tags: ${JSON.stringify(a.tags || [])}`,
    'sources:',
    ...sources.map((s) => `  - { title: ${q(s.title)}, url: ${q(s.link)}, publisher: ${q(s.publisher)} }`),
    `draft: ${draft}`,
    `reviewNote: ${q(a.reviewNote || '')}`,
    '---', '', a.body.trim(), '',
  ];
  return { draft, text: fm.join('\n') };
}

async function main() {
  const raw = (await Promise.all(CFG.feeds.map(fetchFeed))).flat();
  const cutoff = Date.now() - CFG.maxAgeHours * 3600 * 1000;
  const fresh = raw.filter((i) => i.title && i.date.getTime() > cutoff && !seen.links.includes(i.link)).map(classify).filter((i) => ['politics', 'movies', 'ott'].includes(i.category));
  const seenTok = seen.titles.map(norm);
  const clusters = cluster(fresh)
    .filter((c) => !seenTok.some((t) => jaccard(t, c.tokens) > 0.4))
    .map((c) => {
      const first = c.items[0];
      const outlets = new Set(c.items.map((i) => i.publisher)).size;
      return { ...c, category: first.category, region: first.region, score: outlets * 10 + c.items.length };
    })
    .sort((a, b) => b.score - a.score);

  // Spread picks across sections and states so the front page is varied.
  const picks = [], cat = {}, reg = {};
  for (const c of clusters) {
    if ((cat[c.category] ?? 0) >= CFG.maxPerCategory || (reg[c.region] ?? 0) >= CFG.maxPerRegion) continue;
    cat[c.category] = (cat[c.category] ?? 0) + 1;
    reg[c.region] = (reg[c.region] ?? 0) + 1;
    picks.push(c);
    if (picks.length >= MAX) break;
  }
  console.log(`${raw.length} items, ${fresh.length} fresh, ${clusters.length} new stories, writing ${picks.length}`);

  if (process.env.DUMP) fs.writeFileSync(process.env.DUMP, JSON.stringify(picks.map((c) => ({ category: c.category, region: c.region, byline: pickByline(c, c.items[0].link).person, items: c.items.slice(0, 6).map(({ title, link, publisher, snippet, date }) => ({ title, link, publisher, snippet, date })) })), null, 1));
  if (DRY || !API_KEY) {
    for (const c of picks) {
      const w = pickByline(c, c.items[0].link);
      console.log(`- [${c.category}/${c.region}] by ${w.person.name} (${c.items.length} reports) ${c.items[0].title}`);
    }
    if (!DRY) console.log('\nNo ANTHROPIC_API_KEY set, so nothing was written.');
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  let written = 0, failed = 0, lastError = '';
  for (const c of picks) {
    try {
      const who = pickByline(c, c.items[0].link);
      const a = await writeStory(c, who);
      c.items.forEach((i) => seen.links.push(i.link));
      seen.titles.push(c.items[0].title);
      if (a.skip) { console.log('skipped:', a.reason); continue; }
      const slug = String(a.slug || a.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70);
      const file = path.join(OUT_DIR, `${slug}.md`);
      if (fs.existsSync(file)) continue;
      const { draft, text } = toMarkdown(c, a, who);
      fs.writeFileSync(file, text);
      written++;
      console.log(`${draft ? 'DRAFT ' : 'LIVE  '} ${c.region}/${c.category} ${slug} (${who.person.name})`);
    } catch (e) {
      failed++;
      lastError = String(e);
      console.warn('story failed:', c.items[0].title, lastError);
    }
  }
  seen.titles = seen.titles.slice(-800);
  seen.links = seen.links.slice(-3000);
  fs.writeFileSync(SEEN_FILE, JSON.stringify(seen, null, 1));
  console.log(`Done: ${written} written, ${failed} failed.`);
  // Make the run show red when nothing could be written, so problems are never hidden behind a green tick.
  if (failed > 0 && written === 0) { console.error(`::error::No stories written. Last error: ${lastError}`); process.exit(1); }
}
main();
