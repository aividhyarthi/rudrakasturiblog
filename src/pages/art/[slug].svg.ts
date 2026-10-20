import type { APIRoute } from 'astro';
import { readFileSync, existsSync } from 'node:fs';
import { allArticles } from '../../lib/articles';
import { storyArt } from '../../lib/storyart';
export async function getStaticPaths() {
  return (await allArticles({ includeHidden: true })).map((a) => ({ params: { slug: a.slug }, props: { category: a.data.category, hero: a.data.hero } }));
}
export const GET: APIRoute = ({ params, props }) => new Response(props.hero && existsSync(`public/heroes/${props.hero}.svg`) ? readFileSync(`public/heroes/${props.hero}.svg`, 'utf8') : storyArt(props.category, params.slug!), { headers: { 'Content-Type': 'image/svg+xml' } });
