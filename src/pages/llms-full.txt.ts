// The full text of every published article as Markdown, for language models and answer engines.
// This file keeps growing, so it is paginated: this is page 1. Later pages are at /llms-full/2.txt, /llms-full/3.txt, etc.
import { allArticles } from '../lib/articles';
import { articleMarkdown, paginateArticles } from '../lib/markdown-export';
import { SITE } from '../config';

export async function GET() {
  const all = (await allArticles()).sort((x, y) => y.data.date.getTime() - x.data.date.getTime());
  const pages = paginateArticles(all);
  const totalPages = pages.length;
  const out = [
    `# ${SITE.name}: full text of published articles (page 1 of ${totalPages})`,
    '',
    `Articles included: ${all.length}, across ${totalPages} pages. Each entry is the same Markdown served at the article's own .md address.`,
    ...(totalPages > 1 ? [`Next page: ${SITE.url}/llms-full/2.txt`] : []),
    '',
    ...(pages[0] ?? []).flatMap((a) => [articleMarkdown(a), '', '---', '']),
  ].join('\n');
  return new Response(out, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
