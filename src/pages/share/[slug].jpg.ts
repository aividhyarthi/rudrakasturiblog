import type { APIRoute } from 'astro';
import { allArticles, categoryLabel } from '../../lib/articles';
import { shareJpg } from '../../lib/heroart';
export async function getStaticPaths() {
  return (await allArticles({ includeHidden: true })).map((a) => ({ params: { slug: a.slug }, props: { a } }));
}
export const GET: APIRoute = ({ props }) => {
  const a = (props as any).a;
  return new Response(shareJpg({ slug: a.slug, data: { category: a.data.category, hero: a.data.hero, title: a.data.title } }, categoryLabel(a.data.category)), { headers: { 'Content-Type': 'image/jpeg' } });
};
