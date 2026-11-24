// Drip-release: on each run, publish enough not-yet-released articles from RELEASE_QUEUE (flip draft:false,
// clear reviewNote, stamp the current time as each one's date) to bring today's release count up to
// DAILY_LIMIT, then stop. Runs on a schedule (see .github/workflows/publish-drip.yml) so a batch of
// reviewed drafts goes live gradually through the day rather than all at once.
//
// The workflow is scheduled every 10 minutes through the release window so releases land spread through
// the morning on a normal day. But GitHub does not actually grant anywhere near that many firings for a
// schedule this frequent - in practice this workflow was observed firing only ~once a day, not ~24 times,
// so a version of this script that released just one article per run and relied on later firings to catch
// up left most of the queue stuck (confirmed: 8 released over 5 days against a 25-article backlog). This
// version instead releases however many articles are needed to reach DAILY_LIMIT in whichever runs do
// fire, so one firing a day is enough to keep pace; extra firings on a day GitHub behaves just find nothing
// left to do and exit cleanly.
import fs from 'node:fs';

const DAILY_LIMIT = 10;

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

let releasedThisRun = 0;
for (const slug of RELEASE_QUEUE) {
  if (releasedToday >= DAILY_LIMIT) break;
  const file = `${dir}/${slug}.md`;
  if (!fs.existsSync(file)) continue;
  const t = fs.readFileSync(file, 'utf8');
  if (!/^draft:\s*true$/m.test(t)) continue; // already released (or never was a draft): move to the next one
  const next = t
    .replace(/^date:\s*"[^"]*"$/m, `date: "${istNowIso()}"`)
    .replace(/^draft:\s*true$/m, 'draft: false')
    .replace(/^reviewNote:\s*.*$/m, 'reviewNote: ""');
  fs.writeFileSync(file, next);
  releasedToday++;
  releasedThisRun++;
  console.log(`Released: ${slug} (${releasedToday}/${DAILY_LIMIT} today)`);
}
if (releasedThisRun === 0) {
  console.log('Nothing due: no draft left in the release queue.');
} else {
  console.log(`Released ${releasedThisRun} article(s) this run to catch up to today's quota.`);
}
