# Southwala: founder notes (kept by Claude, read at the start of every session)

## Mission
The South with the receipts: data-led politics, past incidents and what people are saying, written for Gen Z, across AP, Telangana, Karnataka, Tamil Nadu and Kerala. Plus cinema, OTT, sport and trending moments.

## Decisions made
- 2026-10-20: Cover all five states in English, with a distinct tone per state (newsroom/states.json). Telugu edition later, at about 30-40 stories.
- Bylines: 75 AI-assisted desk bylines, 15 per state, different names per section (newsroom/bylines.json). Always disclosed as AI-assisted on the story, /team/ and About. No fake photos, bios or claimed field reporting: that would mislead readers and breach Google/AdSense rules.
- Sources: Google News searches for all five states plus the founder's Telugu publisher sitemaps (Eenadu, Andhra Jyothy, Samayam, TV9, News18, Telugu Post, NTV, Sakshi, Great Andhra). Need equivalent Kannada/Tamil/Malayalam sitemaps from the founder.
- Party symmetry: every party gets the same template, tone and scepticism. Claims and records are judged, never parties or voters.
- Politics stories stay as drafts until the founder approves them (setting `POLITICS_REVIEW`).
- Hosting: Railway, deploying from this repo. Stories are auto-saved by the GitHub newsroom every 3 hours.

## Founder owns (only they can do)
Railway/Cloudflare/DNS accounts, API key, AdSense and Search Console applications, final call on politics drafts, being the public owner of the site.

## Claude owns
Editorial voice and guide, newsroom code, site design and SEO, data-story formats, weekly priorities, drafting everything the founder needs to click.

## Next priorities
1. Deploy to Railway, add `ANTHROPIC_API_KEY`, run the first newsroom batch, review the first 10 stories together.
2. Founder shares Kannada, Tamil and Malayalam publisher sitemaps (Telugu ones added).
3. Build the Promise Tracker (one page per government) and the shareable receipt card image.
4. Add public-record data sources (ECI results, MyNeta/ADR, PRS, state budgets) as story inputs.
5. After 30-40 stories: apply for AdSense, launch Telugu politics edition.

## Weekly rhythm
Founder says what they saw and want. Claude returns what the data says, what to fix, what to build next. Update this file every session.

## Open questions
- Which exact news feeds does the founder want?
- Founder's public name/byline on the site (editor-in-chief), for trust and AdSense.

## Update 2026-10-20: new sections and the affidavit data problem
- Design: plain white background, black text, no photos. Our own line drawings only (src/components/Art.astro).
- Sections live: Politics (news), Religion (panchangam for 7 cities, computed from astronomy and checked against published values; temple guides), Astrology (rashi phalalu from real planetary transits, Vedic gochara rules, entertainment only).
- Panchangam v1 shows tithi, nakshatra, yoga, karana, sunrise/sunset/moonrise/moonset, Rahu Kalam, Yamagandam, Gulika, Abhijit and Brahma Muhurtham. NOT yet: Varjyam, Amrit Kalam, Durmuhurtam (our reference tables were not reliable enough to publish), masa and samvatsara names, festival calendar.
- Neta profiles: BLOCKED on data rights. MyNeta/ADR terms: free for non-commercial use with citation; commercial reuse and any automated scraping need ADR's written consent. Do not scrape. Paths: (1) ask ADR for written permission (draft in DATA-PERMISSIONS.md); (2) build from primary public records (ECI affidavits and results) and Wikipedia (CC BY-SA) for names, parties and constituencies. Founder to choose.
