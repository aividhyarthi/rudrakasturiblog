// Tiny text formatter for page text kept in data files: **bold**, *italic* and [text](/link/). A link to an article that is not published yet becomes plain text.
// Permanent pages (festivals, Amavasya and so on) are always linked. Only single-segment article addresses are checked against the published list.
const PERMANENT = new Set(['somavati-amavasya', 'sade-sati', 'amavasya', 'pournami', 'ekadashi', 'pradosham', 'sankashti-chaturthi', 'festivals', 'panchangam', 'rasi-phalalu', 'calendar', 'mantras', 'temples', 'karma-stories', 'series']);
export const linkExists = (href: string, published: Set<string>) => !/^\/[a-z0-9-]+\/$/.test(href) || PERMANENT.has(href.replace(/\//g, '')) || published.has(href.replace(/\//g, ''));
export const fmt = (s: string, published: Set<string>) =>
  s.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/(?<![*\w])\*([^*]+?)\*(?![*\w])/g, '<i>$1</i>')
    .replace(/\[([^\]]+)\]\((\/[^)]+)\)/g, (_m, txt, href) => (linkExists(href, published) ? `<a href="${href}" style="text-decoration:underline">${txt}</a>` : txt));
