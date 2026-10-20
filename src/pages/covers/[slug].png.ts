import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { allArticles } from '../../lib/articles';
import { coverSvg } from '../../lib/cover';

export async function getStaticPaths() {
  const all = await allArticles();
  return [
    { params: { slug: 'home' }, props: { category: 'news' } },
    ...all.map((a) => ({ params: { slug: a.slug }, props: { category: a.data.category } })),
  ];
}
export const GET: APIRoute = async ({ params, props }) => {
  const png = await sharp(Buffer.from(coverSvg(params.slug!, props.category))).png({ compressionLevel: 9 }).toBuffer();
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
