# One release clock

Stories go live, the site rebuilds and held changes ship at the same four moments every day:
**7:00, 11:00, 15:00 and 19:00 India time.** The list lives in one place: `scripts/slots.mjs`.

## How a day works
- **Stories** are dated on a slot (07:00, 11:00, 15:00 or 19:00). A story dated between slots waits for the next slot.
- **Releases** run a few minutes after each slot (7:02, 11:02, 15:02, 19:02). A release:
  1. brings in anything waiting on the `next` branch,
  2. builds the whole site,
  3. checks that every due story has its page and image and that every link on the home page works,
  4. goes live only if the check passes. If not, nothing changes and the run shows RELEASE BLOCKED with the reason.
- **Work in progress** goes to the `next` branch. It does not go live until the next slot.
- **Emergency:** GitHub, Actions tab, "Release (stories, rebuild and held changes go live together)", Run workflow, set force to `true`. Or push straight to `claude/beautiful-newton-lnqky5` (Railway deploys any push at once, so only do that for an emergency).

## One-time setup: the outside timer (about 10 minutes)
GitHub's own timer runs hours late, so an outside timer starts each release.

1. GitHub, your profile picture, Settings, Developer settings, Personal access tokens, **Fine-grained tokens**, Generate new token.
   - Repository access: only `aividhyarthi/rudrakasturiblog`.
   - Permissions: **Actions: Read and write**. Nothing else.
   - Copy the token. Keep it private. Never paste it into a chat or a file in the repo.
2. Make a free account at cron-job.org and create **four** cron jobs, one per slot:

   | Title | Time (Asia/Kolkata) |
   |---|---|
   | Release 7am | 07:02 every day |
   | Release 11am | 11:02 every day |
   | Release 3pm | 15:02 every day |
   | Release 7pm | 19:02 every day |

   For each job set:
   - URL: `https://api.github.com/repos/aividhyarthi/rudrakasturiblog/actions/workflows/daily-rebuild.yml/dispatches`
   - Request method: **POST**
   - Request body: `{"ref":"claude/beautiful-newton-lnqky5","inputs":{"force":"false"}}`
   - Headers:
     - `Authorization: Bearer YOUR_TOKEN`
     - `Accept: application/vnd.github+json`
     - `X-GitHub-Api-Version: 2022-11-28`
     - `Content-Type: application/json`
3. Press "Test run" on one job. GitHub answers 204, and a new run appears in the Actions tab.

Tokens expire. Put a reminder in your calendar a few days before yours does.

## Creating the `next` branch
Once: GitHub, branch menu, type `next`, "Create branch from claude/beautiful-newton-lnqky5". From then on, merge work in progress into `next`, not into the live branch.
