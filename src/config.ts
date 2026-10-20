// Everything you may want to change lives here.
export const SITE = {
  name: 'Southwala',
  url: 'https://southwala.com',
  tagline: 'The South, with the receipts.',
  description:
    'Politics, movies, OTT and the internet’s favourite drama from Tamil Nadu, Kerala, Karnataka, Andhra and Telangana. Fast, sharp, sourced.',
  email: 'hello@southwala.com',
  twitter: '', // e.g. 'southwala'
  instagram: '',
};

// Paste your AdSense publisher id after approval, e.g. 'ca-pub-1234567890123456'. Empty = no ads script.
export const ADSENSE_CLIENT = '';
// Paste your Google Analytics 4 id, e.g. 'G-XXXXXXXXXX'. Empty = no analytics.
export const GA_ID = '';

// URL helpers: clean, keyword-friendly addresses.
export const REGION_SLUG = { ap: 'andhra-pradesh', ts: 'telangana', ka: 'karnataka', tn: 'tamil-nadu', kl: 'kerala' } as const;
export const CAT_SLUG: Record<string, string> = { politics: 'politics', movies: 'movies', ott: 'tv-ott', trending: 'trending', news: 'news', sports: 'sports' };
export const catHref = (id: string) => `/${CAT_SLUG[id] ?? id}/`;
export const stateHref = (id: string) => (id in REGION_SLUG ? `/${REGION_SLUG[id as keyof typeof REGION_SLUG]}/` : '/news/');

// Sections. `always` sections have built-in content; the rest appear when they have published stories.
export const SECTIONS = [
  { id: 'politics', label: 'Politics', brand: 'Southwala Politics', href: '/politics/', always: false },
  { id: 'religion', label: 'Devotional', brand: 'Southwala Devotional', href: '/religion/', always: true },
  { id: 'astrology', label: 'Astrology', brand: 'Southwala Astrology', href: '/rasi-phalalu/', always: true },
  { id: 'movies', label: 'Cinema', brand: 'Southwala Cinema', href: '/movies/', always: false },
  { id: 'ott', label: 'TV & OTT', brand: 'Southwala OTT', href: '/tv-ott/', always: false },
  { id: 'trending', label: 'Trending', brand: 'Southwala Trending', href: '/trending/', always: false },
  { id: 'news', label: 'News', brand: 'Southwala News', href: '/news/', always: false },
  { id: 'sports', label: 'Sports', brand: 'Southwala Sports', href: '/sports/', always: false },
] as const;

// Sub-navigation shown under the section brand.
export const SUBNAV: Record<string, { label: string; href: string }[]> = {
  religion: [
    { label: 'Panchangam', href: '/panchangam/hyderabad/' },
    { label: 'Rahu Kalam today', href: '/rahu-kalam-today/' },
    { label: 'Temples', href: '/temples/' },
    { label: 'Jyotirlingas', href: '/temples/jyotirlingas/' },
    { label: 'Shakti Peethas', href: '/temples/shakti-peethas/' },
    { label: 'Char Dham', href: '/temples/char-dham/' },
    { label: 'Bhagavad Gita', href: '/bhagavad-gita/' },
  ],
};

export const CATEGORIES = [
  { id: 'politics', label: 'Politics', blurb: 'Who said what, who promised what, who got caught.' },
  { id: 'movies', label: 'Movies', blurb: 'Kollywood, Tollywood, Sandalwood, Mollywood. Box office to buzz.' },
  { id: 'ott', label: 'TV & OTT', blurb: 'What to binge, what to skip, what everyone is arguing about.' },
  { id: 'trending', label: 'Trending', blurb: 'The internet moment of the day, explained.' },
  { id: 'news', label: 'News', blurb: 'Everything else South India woke up to today.' },
  { id: 'sports', label: 'Sports', blurb: 'IPL, football, cricket and local legends.' },
] as const;

export const REGION_LABELS_NOTE = 'Region codes: ap, ts, ka, tn, kl, south';
export const REGIONS = {
  tn: 'Tamil Nadu',
  kl: 'Kerala',
  ka: 'Karnataka',
  ap: 'Andhra Pradesh',
  ts: 'Telangana',
  south: 'South India',
} as const;
