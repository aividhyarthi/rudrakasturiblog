// Run after `astro build`. A release goes live only if every story that is due has its page and image, and every link
// and image on the home page points at something that exists. Stops the "lead story is a 404 / blank image" problem.
import fs from 'node:fs';
import path from 'node:path';

const now = process.env.SW_NOW ? Date.parse(process.env.SW_NOW) : Date.now();
const dir = 'src/content/articles';
const problems = [];
const exists = (u) => { const p = path.join('dist', decodeURI(u.split(/[?#]/)[0])); return fs.existsSync(p) && (fs.statSync(p).isFile() || fs.existsSync(path.join(p, 'index.html'))); };

let due = 0;
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md'))) {
  const t = fs.readFileSync(path.join(dir, f), 'utf8');
  const m = t.match(/^date:\s*"?([^"\n]+)"?/m);
  if (!m || /^draft:\s*true/m.test(t)) continue;
  const when = Date.parse(m[1]);
  const slug = f.replace(/\.md$/, '');
  if (Math.floor((when + 330 * 60000) / 86400000) * 86400000 - 330 * 60000 > now + 10 * 60 * 1000) continue; // not due: its day has not started
  due++;
  for (const u of [`/${slug}/`, `/img/${slug}/16x9.jpg`, `/art/${slug}.svg`]) if (!exists(u)) problems.push(`due story is missing ${u}`);
}

const home = fs.readFileSync('dist/index.html', 'utf8');
for (const u of new Set([...home.matchAll(/(?:href|src)="(\/[^"#?]+)"/g)].map((x) => x[1]))) if (!exists(u)) problems.push(`home page points at missing ${u}`);

console.log(`${due} due stories checked.`);
if (problems.length) { console.error('RELEASE BLOCKED:\n  ' + problems.slice(0, 40).join('\n  ')); process.exit(1); }
console.log('Release check passed.');
