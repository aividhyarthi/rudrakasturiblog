// Approve a draft: node scripts/publish.mjs <article-name>
import fs from 'node:fs';
const slug = process.argv[2]?.replace(/\.md$/, '');
if (!slug) { console.error('Give the article name, e.g. npm run publish-draft -- my-story'); process.exit(1); }
const file = `src/content/articles/${slug}.md`;
if (!fs.existsSync(file)) { console.error('Not found:', file); process.exit(1); }
let t = fs.readFileSync(file, 'utf8');
t = t.replace(/^draft: true$/m, 'draft: false').replace(/^reviewNote: .*$/m, 'reviewNote: ""');
fs.writeFileSync(file, t);
console.log('Published:', slug);
