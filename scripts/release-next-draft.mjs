// Drip-release: on each run, publish the next not-yet-released article in RELEASE_QUEUE (flip draft:false,
// clear reviewNote, stamp the current time as its date) and stop, unless today's quota (DAILY_LIMIT) is
// already met. Runs on a schedule (see .github/workflows/publish-drip.yml) so a batch of reviewed drafts
// goes live one at a time through the day instead of all at once.
//
// The workflow fires every 10 minutes through the release window, well more often than DAILY_LIMIT needs,
// on purpose: GitHub's scheduled triggers are not perfectly punctual and can occasionally skip a tick under
// load, so the extra firings are redundancy, not extra releases. The daily cap below (by counting how many
// queued articles already carry today's date) is what actually controls the pace, not the cron frequency -
// so a skipped tick just means a later one in the same window picks up the slack; nothing is lost or late.
// Harmless to run again once the queue is empty, or once today's quota is met: it just does nothing.
import fs from 'node:fs';

const DAILY_LIMIT = 8;

const RELEASE_QUEUE = [
  // Kartika-month festival guides, most time-sensitive first (Bhishma Panchak starts today; the Nov 23-24 ones have a few days' buffer).
  'bhishma-panchak-2026-five-days-of-kartika',
  'kansa-vadh-2026-krishna-mathura-story',
  'kartika-snan-meaning-dawn-bath-traditions',
  'guru-nanak-jayanti-2026-date-life-and-teachings',
  'manikarnika-snan-2026-kashi-kartik-chaturdashi',
  'vaikuntha-chaturdashi-2026-shiva-vishnu-worship',
  'karthigai-deepam-2026-tiruvannamalai-maha-deepam-guide',
  'srisailam-jwala-thoranam-2026-kartika-purnima',
  // Evergreen scripture/temple stories.
  'draksharamam-the-lingam-that-rises-through-two-floors',
  'dhruva-the-boy-whose-devotion-brought-vishnu-before-him',
  'gandi-anjaneya-the-image-lord-rama-left-on-the-rock',
  'gajendra-the-elephant-whose-prayer-brought-vishnu-to-his-rescue',
  'chitraketu-the-king-whose-words-changed-his-destiny',
  'sikkal-singaravelavar-the-vel-and-the-sweat-before-battle',
  'jada-bharata-the-king-who-could-not-escape-attachment',
  'tara-the-queen-who-warned-vali-before-his-final-battle',
  'svayamprabha-the-woman-who-guided-hanumans-search-party',
  'vikarna-the-kaurava-who-spoke-for-draupadi',
  'sarama-the-woman-in-lanka-who-helped-sita-keep-hope',
  'rantideva-the-king-who-saw-god-in-every-visitor',
  'khatvanga-the-king-who-turned-to-god-with-time-running-out',
  'mandavya-maharishi-why-a-sage-questioned-yama-about-karma',
  'sulabha-the-woman-who-taught-king-janaka-about-true-wisdom',
  'vritrasura-the-asura-who-became-a-devotee-of-vishnu',
];

const dir = 'src/content/articles';
const istDate = (ms) => { const d = new Date(ms + 330 * 60000); return d.toISOString().slice(0, 10); }; // IST = UTC+5:30
const today = istDate(Date.now());
const istNowIso = () => {
  const d = new Date(Date.now() + 330 * 60000);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}T${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}+05:30`;
};

let releasedToday = 0;
for (const slug of RELEASE_QUEUE) {
  const file = `${dir}/${slug}.md`;
  if (!fs.existsSync(file)) continue;
  const t = fs.readFileSync(file, 'utf8');
  if (/^draft:\s*true$/m.test(t)) continue; // not released yet; today's count only cares about already-released ones
  const m = t.match(/^date:\s*"([^"]*)"$/m);
  if (m && istDate(Date.parse(m[1])) === today) releasedToday++;
}
if (releasedToday >= DAILY_LIMIT) {
  console.log(`Today's quota already met (${releasedToday}/${DAILY_LIMIT} released on ${today}). Nothing to do.`);
  process.exit(0);
}

for (const slug of RELEASE_QUEUE) {
  const file = `${dir}/${slug}.md`;
  if (!fs.existsSync(file)) continue;
  const t = fs.readFileSync(file, 'utf8');
  if (!/^draft:\s*true$/m.test(t)) continue; // already released (or never was a draft): move to the next one
  const next = t
    .replace(/^date:\s*"[^"]*"$/m, `date: "${istNowIso()}"`)
    .replace(/^draft:\s*true$/m, 'draft: false')
    .replace(/^reviewNote:\s*.*$/m, 'reviewNote: ""');
  fs.writeFileSync(file, next);
  console.log(`Released: ${slug} (${releasedToday + 1}/${DAILY_LIMIT} today)`);
  process.exit(0);
}
console.log('Nothing due: no draft left in the release queue.');
