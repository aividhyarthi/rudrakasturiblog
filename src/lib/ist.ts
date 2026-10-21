/** ISO timestamp with the +05:30 India offset, e.g. 2026-10-21T00:00:00+05:30. */
export function istIso(d: Date): string {
  const t = new Date(d.getTime() + 330 * 60000).toISOString().slice(0, 19);
  return `${t}+05:30`;
}

/** Markdown article body as plain text, for the schema articleBody field. */
export function plainBody(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^\s*\|?\s*:?-{2,}.*$/gm, ' ')
    .replace(/[|>#*_`~]/g, ' ')
    .replace(/^\s*[-+]\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}
