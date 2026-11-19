// Pages 2+ of llms-full.txt (page 1 lives at /llms-full.txt). See src/lib/markdown-export.ts for how pages are split.
import { allArticles } from '../../lib/articles';
import { articleMarkdown, paginateArticles } from '../../lib/markdown-export';
import { SITE } from '../../config';

export async function getStaticPaths() {
  const all = (await allArticles()).sort((x, y) => y.data.date.getTime() - x.data.date.getTime());
  const pages = paginateArticles(all);
  return pages.slice(1).map((articles, i) => ({ params: { page: String(i + 2) }, props: { articles, pageNum: i + 2, totalPages: pages.length } }));
}

export function GET({ props }: { props: { articles: Awaited<ReturnType<typeof allArticles>>; pageNum: number; totalPages: number } }) {
  const { articles, pageNum, totalPages } = props;
  const out = [
    `# ${SITE.name}: full text of published articles (page ${pageNum} of ${totalPages})`,
    '',
    `Previous page: ${SITE.url}/${pageNum === 2 ? 'llms-full.txt' : `llms-full/${pageNum - 1}.txt`}`,
    ...(pageNum < totalPages ? [`Next page: ${SITE.url}/llms-full/${pageNum + 1}.txt`] : []),
    '',
    ...articles.flatMap((a) => [articleMarkdown(a), '', '---', '']),
  ].join('\n');
  return new Response(out, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
