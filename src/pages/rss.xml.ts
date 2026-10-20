import rss from '@astrojs/rss';
import { SITE } from '../config';
import { allArticles } from '../lib/articles';
export async function GET() {
  const all = (await allArticles()).slice(0, 50);
  return rss({
    title: SITE.name, description: SITE.description, site: SITE.url,
    items: all.map((a) => ({ title: a.data.title, description: a.data.description, pubDate: a.data.date, link: `/${a.slug}/` })),
  });
}
