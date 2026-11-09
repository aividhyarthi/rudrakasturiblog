# One release a day

**All of a day's stories go live together, once a day, at midnight India time (00:00 IST).** A story's date decides the
day it goes live; the hour in its date no longer matters. The home page then rotates through the day by itself.

## How a day works
- **00:02 IST: the release.** It brings in anything waiting on the `next` branch, builds the whole site, checks that every
  due story has its page and image and that every link on the home page works, and goes live only if the check passes.
  If not, nothing changes and the run shows RELEASE BLOCKED with the reason.
- **Backups at 01:02, 02:02, 03:02, 04:02 and 05:02 IST.** GitHub often runs scheduled jobs late or skips them. A backup
  does nothing if today's release already happened, so the worst case is a release at about 5 AM instead of midnight.
- **The home page rotates in the browser, with no rebuild.** The lead story changes four times a day (00:00, 06:00, 12:00
  and 18:00 IST) through four candidates picked at the release. A new visitor at any hour sees the right one.
  Crawlers and visitors without JavaScript see the first candidate.
- **Work in progress** goes to the `next` branch. It goes live at the next release.
- **Emergency:** GitHub, Actions tab, "Release (stories, rebuild and held changes go live together)", Run workflow,
  force = `true`. Or push straight to `claude/beautiful-newton-lnqky5` (Railway deploys any push at once, so only for emergencies).

## Why this cannot 404 any more
A story's page and every link to it come from the same build, so a link never points at a page that does not exist.
Because nothing needs to happen at a particular hour of the day, GitHub being late no longer breaks anything: stories
simply appear when the release runs.

## Changing the time
The release hour lives in one place, `scripts/slots.mjs` (`SLOT_HOURS_IST = [0]`), and the matching `cron` lines in
`.github/workflows/daily-rebuild.yml` (cron is in UTC: 00:02 IST is `32 18`).

## Creating the `next` branch (once)
GitHub, branch menu, type `next`, "Create branch from claude/beautiful-newton-lnqky5". From then on, merge work in
progress into `next`, not into the live branch.
