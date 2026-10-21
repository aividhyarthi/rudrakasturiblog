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

## Update 2026-10-20 (later): URLs, search and Discover
- Clean keyword URLs: /panchangam/<city>/ (today) and /panchangam/<city>/<date>/, /rahu-kalam-today/, /rasi-phalalu/<sign>/ (+ /weekly/, /monthly/), /temples/ (+ lists: jyotirlingas, char-dham, pancharama-kshetralu, pancha-bhoota-sthalams, shakti-peethas, god-temples, goddess-temples), /bhagavad-gita/chapter-N/, /politics/, /movies/, /tv-ott/, /trending/, /news/, /sports/, /andhra-pradesh/ etc. Old addresses redirect (nginx).
- Every page has a 1200x675 headline card (white, black type) for social sharing and Discover, NewsArticle/Breadcrumb/FAQ/ItemList schema, canonical URLs, sitemap-index.xml and news-sitemap.xml, max-image-preview:large.
- Gita: chapter guides in our own words only. The only ready-made Gita dataset found is Prabhupada's (BBT, copyrighted): not used. Verse-by-verse text would need a public-domain translation (e.g. Telang 1882) plus the Sanskrit original; ask founder before adding.
- Politician profiles: on hold (ADR terms). Founder says no ads at the moment, but monetisation is planned, so the hold stands.
- Still to do for search: real photos (licensed or own) beat text cards on Discover; get Search Console + Bing Webmaster set up; Telugu edition later.

## Update 2026-10-20 (design v3)
- Look: white background, black text, black nav bar, one red accent for labels. News-portal layout: today bar (panchangam snapshot), lead story, top stories, latest, section panels.
- Each section shows its own brand under the logo: Southwala Politics, Southwala Devotional, Southwala Astrology, Southwala Cinema, Southwala OTT (and Trending/News/Sports when they have stories). Sections with no published stories (Trending, News, Sports) and states with none (Karnataka) are hidden automatically and appear when the newsroom publishes into them.
- Pictures: our own line drawings on soft tints for story thumbnails; headline cards (1200x675) for sharing. Real licensed photos still the upgrade path for Discover.

## Update 2026-10-20 (images)
- Section illustrations are drawn by us as vectors (scripts/make-heroes.mjs -> public/heroes/*.svg): temple-sunrise, jyotirlinga-dawn, goddess-temple, kurukshetra-dawn, panchangam, zodiac-wheel, moon-nakshatra.
- Founder can override any of them with their own picture: drop a file named like the illustration into public/images/heroes/ (see README.txt there). The site prefers the founder's file automatically.
- Images are drawn by us in code (scripts/make-heroes.mjs and make-heroes2.mjs): 12 rashi pictures, 6 individual temple scenes, Shiva/Vishnu/Devi symbol art, section scenes. No third-party image tools.

## Update 2026-10-20 (design v4: editorial redesign)
- Sections now: Politics, Devotional, Astrology, Cinema, OTT. News, Sports and Trending were removed on purpose (also removed from the newsroom: it only writes politics, cinema and OTT).
- Design system (src/styles/global.css): white page, near-black type, one accent colour per section (Politics navy, Devotional saffron, Astrology indigo, Cinema magenta, OTT teal). Self-hosted fonts: Fraunces (headlines), Source Serif 4 (reading), Inter (interface), Noto Serif/Sans Telugu (Telugu text renders properly).
- Every story gets its own vector scene (assembly hall, cinema hall, OTT screens) from src/lib/storyart.ts, served at /art/<slug>.svg. No stock photos, no faces.
- Panchangam page: dashboard with a day timeline (good and avoid periods), cards for the five limbs, Telugu names.
- Home page shows each story once (lead, latest, card row, then section columns for what is left).

## Devotional pivot (October 2026)
- Site is devotional, astrology, temples, Gita and spiritual only for about three months. News stays live at its URLs but is not linked (`NEWS_ENABLED = false` in `src/config.ts`). Newsroom schedule paused.
- Articles are scheduled by the `date` in each file. A story with a future date is not built until that date; the 00:05 IST daily rebuild publishes it. Links to not-yet-published stories are dropped automatically (`scripts/rehype-unpublished-links.mjs`).
- Test a future day: `SW_NOW=2026-11-06 npx astro build`.
- Series: gods, dharma (Advaita and Shankara), temple (Tamil Nadu), sacred (rivers and hills), faith (Westerners and Hindu tradition), karma, plus devotional, astrology, gita, spiritual.
- Daily generated pages: `/daily-horoscope/<date>/`, `/daily-panchangam/<date>/`, Amavasya and Pournami pages, mantras section.
- Discover: images are 1600x900, 1200x900 and 1200x1200 PNGs per article (`/img/<slug>/`), `max-image-preview:large` on every page, Article and FAQPage schema.
- Copy rule: no AI mentions anywhere on the site. Desk bylines only.
