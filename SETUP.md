# Southwala: your 5 setup steps (no coding needed)

The site, the design and the auto-newsroom are built. These steps switch them on.

## 1. Get your Claude API key (the "writer")
1. Go to console.anthropic.com, sign in, add a few dollars of credit.
2. Create an API key and copy it. Cost is roughly a few rupees per story.

## 2. Give the key to GitHub
GitHub repo > Settings > Secrets and variables > Actions > **New repository secret**
- Name: `ANTHROPIC_API_KEY`  Value: the key you copied.

Then Actions tab > **Newsroom (auto-write stories)** > **Run workflow**. Stories appear in
`src/content/articles/`. After that it runs by itself every 3 hours.

## 3. Put the site online (Cloudflare Pages, free)
1. dash.cloudflare.com > Workers & Pages > Create > Pages > Connect to Git > pick this repo, branch `main`.
2. Build command: `npm run build`   Output folder: `dist`
3. Custom domains > add `southwala.com` and follow the DNS steps it shows.
Every time the newsroom saves a story, the site rebuilds and updates itself.

## 4. Politics stories wait for you (on purpose)
Politics stories are saved as drafts, and the live site hides them. To approve one:
GitHub > Actions > **Approve a draft** > Run workflow > type the file name (without .md).
To preview all drafts on your computer: `npm run preview-drafts`.
Once you trust the output, set the repo variable `POLITICS_REVIEW` to `off` (Settings > Variables).

## 5. Ads, traffic and Google
- **Google Search Console**: add southwala.com, submit `https://southwala.com/sitemap-index.xml`.
- **Google Analytics 4**: put your `G-...` id in `src/config.ts` (GA_ID).
- **AdSense**: apply when the site has about 30-40 good stories and a few weeks of age. Then put your
  `ca-pub-...` id in `src/config.ts` (ADSENSE_CLIENT) and your line in `public/ads.txt`.
- **Google Discover**: needs fresh, original stories with large images, a visible About page and
  author info. All built in. Replace the generated art with real photos you own or license
  whenever you can: add `image: "/images/file.jpg"` to the story header.

## Change the voice or topics
- Voice, headline style, safety rules: `newsroom/editor-guide.md`
- Which news to watch: `newsroom/sources.json`
- Test without spending money: `npm run newsroom-test`
