import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeUnpublishedLinks from './scripts/rehype-unpublished-links.mjs';
import rehypeWrapTables from './scripts/rehype-wrap-tables.mjs';
import fs from 'node:fs';

// lastmod for the sitemap: an article's own last-changed date, and today's build date for the pages that change every day.
const articleDates = new Map();
for (const f of fs.readdirSync('src/content/articles')) {
  if (!f.endsWith('.md')) continue;
  const t = fs.readFileSync(`src/content/articles/${f}`, 'utf8');
  const d = t.match(/^updated:\s*"?([^"\n]+)"?/m) ?? t.match(/^date:\s*"?([^"\n]+)"?/m);
  if (d) articleDates.set(f.replace(/\.md$/, ''), new Date(d[1]).toISOString());
}
const DAILY = /^\/($|rasi-phalalu|horoscope-tomorrow|daily-horoscope|daily-panchangam|panchangam|rahu-kalam-today|festivals|amavasya|pournami|ekadashi|sankashti-chaturthi|pradosham|calendar|gods|series|topics)/;


// One clock for the whole build. A build takes minutes, and stories go live on the hour: if each page read the clock
// separately, the home page could lead with a story whose own page and image were never built (a 404 and a blank image).
if (process.argv.includes('build') && !process.env.SW_NOW) process.env.SW_NOW = new Date().toISOString();

export default defineConfig({
  site: 'https://www.southwala.com',
  output: 'static',
  build: { inlineStylesheets: 'always' },
  integrations: [sitemap({
    serialize(item) {
      const path = new URL(item.url).pathname;
      const slug = path.replace(/^\/|\/$/g, '');
      const own = articleDates.get(slug);
      if (own) item.lastmod = own;
      else if (DAILY.test(path)) item.lastmod = new Date(process.env.SW_NOW ?? Date.now()).toISOString();
      return item;
    },
  })],
  markdown: { rehypePlugins: [rehypeUnpublishedLinks, rehypeWrapTables] },
});
