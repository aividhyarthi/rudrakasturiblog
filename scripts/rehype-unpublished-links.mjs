// Articles are scheduled in advance. A link from today's article to one that goes live next week would be a dead link,
// so until the target is published, the link text is kept and the link itself is dropped.
import fs from 'node:fs';
import path from 'node:path';

const dir = 'src/content/articles';
const now = process.env.SW_NOW ? new Date(process.env.SW_NOW).getTime() : Date.now();
const hidden = new Set();
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.md')) continue;
  const t = fs.readFileSync(path.join(dir, f), 'utf8');
  const date = t.match(/^date:\s*"?([^"\n]+)"?/m);
  const draft = /^draft:\s*true/m.test(t);
  if (draft || (date && new Date(date[1]).getTime() > now)) hidden.add(f.replace(/\.md$/, ''));
}

function walk(node) {
  if (!node.children) return;
  const out = [];
  for (const child of node.children) {
    walk(child);
    const href = child.type === 'element' && child.tagName === 'a' ? child.properties?.href : null;
    const slug = typeof href === 'string' ? href.replace(/^\/|\/$/g, '') : null;
    if (slug && !slug.includes('/') && hidden.has(slug)) out.push(...child.children);
    else out.push(child);
  }
  node.children = out;
}

export default function rehypeUnpublishedLinks() {
  return (tree) => walk(tree);
}
