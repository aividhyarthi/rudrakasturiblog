import type { APIRoute } from 'astro';
import { allArticles } from '../../lib/articles';
import { articleSvg } from '../../lib/heroart';
export async function getStaticPaths() {
  return (await allArticles({ includeHidden: true })).map((a) => ({ params: { slug: a.slug }, props: { a } }));
}
export const GET: APIRoute = ({ props }) => new Response(articleSvg((props as any).a), { headers: { 'Content-Type': 'image/svg+xml' } });
