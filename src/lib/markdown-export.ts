// Plain Markdown versions of the articles, for answer engines and other machine readers.
// Each published article is also served at /<slug>.md, built from the same source as its HTML page.
import type { Article } from './articles';
import { byline, categoryLabel } from './articles';
import { SERIES, SITE } from '../config';
import { istIso } from './ist';

const q = (v: unknown) => JSON.stringify(v ?? null);
/** Links inside the body are written as /slug/; a machine reader needs the full address. */
const absolute = (md: string) => md.replace(/\]\((\/[^)\s]*)\)/g, `](${SITE.url}$1)`);

export function articleMarkdown(a: Article): string {
  const d = a.data;
  const url = `${SITE.url}/${a.slug}/`;
  const series = d.series ? SERIES.find((s) => s.id === d.series)?.label : undefined;
  const head = [
    '---',
    `title: ${q(d.title)}`,
    `canonical_url: ${q(url)}`,
    `markdown_url: ${q(`${SITE.url}/${a.slug}.md`)}`,
    `site: ${q(SITE.name)}`,
    `date_published: ${q(istIso(d.date))}`,
    `date_modified: ${q(istIso(d.updated ?? d.date))}`,
    `language: "en-IN"`,
    `description: ${q(d.description)}`,
    `section: ${q(categoryLabel(d.category))}`,
    `series: ${q(series ?? null)}`,
    `tags: ${q(d.tags ?? [])}`,
    `author: ${q(byline(d))}`,
    `summary: ${q(d.tldr ?? null)}`,
    '---',
    '',
    `# ${d.title}`,
    '',
    ...(d.tldr ? [`> ${d.tldr}`, ''] : []),
    absolute((a.body ?? '').trim()),
  ];
  const faq = d.faq?.length ? ['', '## Frequently asked questions', '', ...d.faq.flatMap((f) => [`### ${f.q}`, '', f.a, ''])] : [];
  const sources = d.sources?.length ? ['', '## Sources', '', ...d.sources.map((s) => `- [${s.title}](${s.url}), ${s.publisher}`)] : [];
  return [...head, ...faq, ...sources, '', `Canonical page: ${url}`, ''].join('\n');
}

/**
 * llms-full.txt keeps growing as articles are added, and a single multi-megabyte file is too large for
 * some AI tools to fetch reliably. Split it into pages, each capped around MAX_PAGE_BYTES, without
 * cutting an article in half (one oversized article still gets its own page).
 */
const MAX_PAGE_BYTES = 250_000;

export function paginateArticles(all: Article[], maxBytes = MAX_PAGE_BYTES): Article[][] {
  const pages: Article[][] = [];
  let page: Article[] = [];
  let bytes = 0;
  for (const a of all) {
    const size = articleMarkdown(a).length;
    if (page.length && bytes + size > maxBytes) {
      pages.push(page);
      page = [];
      bytes = 0;
    }
    page.push(a);
    bytes += size;
  }
  if (page.length) pages.push(page);
  return pages;
}
