// The full text of every published article as Markdown, for language models and answer engines.
import { allArticles } from '../lib/articles';
import { articleMarkdown } from '../lib/markdown-export';
import { SITE } from '../config';

export async function GET() {
  const all = (await allArticles()).sort((x, y) => y.data.date.getTime() - x.data.date.getTime());
  const out = [
    `# ${SITE.name}: full text of published articles`,
    '',
    `Articles included: ${all.length}. Each entry is the same Markdown served at the article's own .md address.`,
    '',
    ...all.flatMap((a) => [articleMarkdown(a), '', '---', '']),
  ].join('\n');
  return new Response(out, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
