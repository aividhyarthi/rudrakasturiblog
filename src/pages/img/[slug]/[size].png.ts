import type { APIRoute } from 'astro';
import { allArticles } from '../../../lib/articles';
import { SIZES, articlePng, type SizeKey } from '../../../lib/heroart';
export async function getStaticPaths() {
  const all = await allArticles({ includeHidden: true });
  return all.flatMap((a) => (Object.keys(SIZES) as SizeKey[]).map((size) => ({ params: { slug: a.slug, size }, props: { a } })));
}
export const GET: APIRoute = ({ props, params }) => new Response(articlePng((props as any).a, params.size as SizeKey), { headers: { 'Content-Type': 'image/png' } });
