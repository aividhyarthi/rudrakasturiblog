import type { APIRoute } from 'astro';
import { allArticles } from '../../lib/articles';
import { storyArt } from '../../lib/storyart';
export async function getStaticPaths() {
  return (await allArticles()).map((a) => ({ params: { slug: a.slug }, props: { category: a.data.category } }));
}
export const GET: APIRoute = ({ params, props }) => new Response(storyArt(props.category, params.slug!), { headers: { 'Content-Type': 'image/svg+xml' } });
