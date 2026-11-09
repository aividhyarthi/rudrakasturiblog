// Run after `astro build`. A release goes live only if every story that is due has its page and image, and every link
// and image on the home page points at something that exists. Stops the "lead story is a 404 / blank image" problem.
import fs from 'node:fs';
import path from 'node:path';
import { SLOT_HOURS_IST } from './slots.mjs';

const now = process.env.SW_NOW ? Date.parse(process.env.SW_NOW) : Date.now();
const dir = 'src/content/articles';
const problems = [];
const exists = (u) => { const p = path.join('dist', decodeURI(u.split(/[?#]/)[0])); return fs.existsSync(p) && (fs.statSync(p).isFile() || fs.existsSync(path.join(p, 'index.html'))); };

let due = 0;
const offSlot = [];
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md'))) {
  const t = fs.readFileSync(path.join(dir, f), 'utf8');
  const m = t.match(/^date:\s*"?([^"\n]+)"?/m);
  if (!m || /^draft:\s*true/m.test(t)) continue;
  const when = Date.parse(m[1]);
  const slug = f.replace(/\.md$/, '');
  if (when > now) {
    const h = new Date(when + 330 * 60000);
    if (h.getUTCMinutes() !== 0 || !SLOT_HOURS_IST.includes(h.getUTCHours())) offSlot.push(`${slug} (${m[1]})`);
    continue;
  }
  due++;
  for (const u of [`/${slug}/`, `/img/${slug}/16x9.jpg`, `/art/${slug}.svg`]) if (!exists(u)) problems.push(`due story is missing ${u}`);
}

const home = fs.readFileSync('dist/index.html', 'utf8');
for (const u of new Set([...home.matchAll(/(?:href|src)="(\/[^"#?]+)"/g)].map((x) => x[1]))) if (!exists(u)) problems.push(`home page points at missing ${u}`);

console.log(`${due} due stories checked.`);
if (offSlot.length) console.log(`Note: ${offSlot.length} scheduled stories are not on a release slot (${SLOT_HOURS_IST.join(', ')} IST), so they will wait for the next slot after their time:\n  ${offSlot.slice(0, 15).join('\n  ')}`);
if (problems.length) { console.error('RELEASE BLOCKED:\n  ' + problems.slice(0, 40).join('\n  ')); process.exit(1); }
console.log('Release check passed.');
