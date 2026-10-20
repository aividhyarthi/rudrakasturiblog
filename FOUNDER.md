# Southwala: founder notes (kept by Claude, read at the start of every session)

## Mission
Andhra Pradesh and Telangana politics with the receipts: data, past incidents and what people are saying, written for Gen Z. Plus Tollywood, Telugu OTT and trending moments.

## Decisions made
- 2026-10-20: Focus on AP + Telangana only. English first (with Telugu words). Telugu politics edition at about 30-40 English stories.
- Party symmetry: every party gets the same template, tone and scepticism. Claims and records are judged, never parties or voters.
- Politics stories stay as drafts until the founder approves them (setting `POLITICS_REVIEW`).
- Hosting: Railway, deploying from this repo. Stories are auto-saved by the GitHub newsroom every 3 hours.

## Founder owns (only they can do)
Railway/Cloudflare/DNS accounts, API key, AdSense and Search Console applications, final call on politics drafts, being the public owner of the site.

## Claude owns
Editorial voice and guide, newsroom code, site design and SEO, data-story formats, weekly priorities, drafting everything the founder needs to click.

## Next priorities
1. Deploy to Railway, add `ANTHROPIC_API_KEY`, run the first newsroom batch, review the first 10 stories together.
2. Founder shares preferred news XML/RSS feeds; add them to `newsroom/sources.json`.
3. Build the Promise Tracker (one page per government) and the shareable receipt card image.
4. Add public-record data sources (ECI results, MyNeta/ADR, PRS, state budgets) as story inputs.
5. After 30-40 stories: apply for AdSense, launch Telugu politics edition.

## Weekly rhythm
Founder says what they saw and want. Claude returns what the data says, what to fix, what to build next. Update this file every session.

## Open questions
- Which exact news feeds does the founder want?
- Founder's public name/byline on the site (editor-in-chief), for trust and AdSense.
