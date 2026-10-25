// A small list of everything published, used by the "Surprise me" pop-up to offer random reads.
import { allArticles, categoryLabel } from '../lib/articles';
import { SERIES } from '../config';

export async function GET() {
  const all = await allArticles();
  const items = all.map((a) => ({ t: a.data.title, u: `/${a.slug}/`, k: a.data.series ? (SERIES.find((s) => s.id === a.data.series)?.label ?? categoryLabel(a.data.category)) : categoryLabel(a.data.category), g: a.data.series ?? a.data.category }));
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' } });
}
