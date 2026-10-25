// Decides whether the site needs a rebuild: a story has just come due, or a new India day has started
// (daily panchangam and horoscope pages). Prints due=true or due=false for the workflow.
import fs from 'node:fs';
import path from 'node:path';

const dir = 'src/content/articles';
const stampFile = 'src/data/build-stamp.txt';
const now = Date.now();
const last = fs.existsSync(stampFile) ? Date.parse(fs.readFileSync(stampFile, 'utf8').trim()) : 0;
const istDay = (t) => Math.floor((t + 330 * 60000) / 86400000);

let due = istDay(now) > istDay(last);
let why = due ? 'new India day' : '';
if (!due) {
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.md')) continue;
    const m = fs.readFileSync(path.join(dir, f), 'utf8').match(/^date:\s*"?([^"\n]+)"?/m);
    if (!m) continue;
    const t = Date.parse(m[1]);
    if (t > last && t <= now) { due = true; why = `${f} came due`; break; }
  }
}
console.log(`${why || 'nothing due'}`);
console.log(`due=${due}`);
