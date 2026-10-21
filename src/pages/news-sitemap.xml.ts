// Google News sitemap: articles from the last 2 days (Google only reads the newest).
import { allArticles } from '../lib/articles';
import { SITE } from '../config';
import { istIso } from '../lib/ist';
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export async function GET() {
  const cutoff = Date.now() - 48 * 3600 * 1000;
  const items = (await allArticles()).filter((a) => !a.data.draft && a.data.date.getTime() > cutoff);
  const body = items.map((a) => `<url><loc>${SITE.url}/${a.slug}/</loc><news:news><news:publication><news:name>${SITE.name}</news:name><news:language>en</news:language></news:publication><news:publication_date>${istIso(a.data.date)}</news:publication_date><news:title>${esc(a.data.title)}</news:title></news:news></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">${body}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
}
