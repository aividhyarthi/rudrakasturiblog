// Tiny text formatter for page text kept in data files: **bold**, *italic* and [text](/link/). A link to an article that is not published yet becomes plain text.
export const fmt = (s: string, published: Set<string>) =>
  s.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/(?<![*\w])\*([^*]+?)\*(?![*\w])/g, '<i>$1</i>')
    .replace(/\[([^\]]+)\]\((\/[^)]+)\)/g, (_m, txt, href) => (!/^\/[a-z0-9-]+\/$/.test(href) || published.has(href.replace(/\//g, '')) || /^\/(somavati-amavasya|festivals|amavasya|pournami|ekadashi|pradosham|sankashti-chaturthi)\//.test(href) ? `<a href="${href}" style="text-decoration:underline">${txt}</a>` : txt));
