import { allArticles } from '../lib/articles';
import { articleMarkdown } from '../lib/markdown-export';

export async function getStaticPaths() {
  return (await allArticles()).map((a) => ({ params: { slug: a.slug }, props: { a } }));
}

export function GET({ props }: { props: { a: Awaited<ReturnType<typeof allArticles>>[number] } }) {
  return new Response(articleMarkdown(props.a), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
