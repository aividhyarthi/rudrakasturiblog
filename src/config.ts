// Everything you may want to change lives here.
export const SITE = {
  name: 'Southwala',
  url: 'https://southwala.com',
  tagline: 'Panchangam, rasi phalalu, temples and the Gita.',
  description:
    'Daily panchangam by your location, Rahu Kalam, rasi phalalu, Amavasya and Pournami dates, temple guides and the Bhagavad Gita, for Telugu, Kannada, Tamil and Malayalam homes.',
  email: 'hello@southwala.com',
  twitter: '', // e.g. 'southwala'
  instagram: '',
};

// AdSense publisher id. Empty = no ads script.
export const GSC_VERIFICATION = 'Rhuille4vEfUa02m0sblM7KPAXxHnfp5gmT_aWH9aLs';
export const ADSENSE_CLIENT = 'ca-pub-2121262893172079';
// Paste your Google Analytics 4 id, e.g. 'G-XXXXXXXXXX'. Empty = no analytics.
export const GA_ID = '';

// URL helpers: clean, keyword-friendly addresses.
export const REGION_SLUG = { ap: 'andhra-pradesh', ts: 'telangana', ka: 'karnataka', tn: 'tamil-nadu', kl: 'kerala' } as const;
export const CAT_SLUG: Record<string, string> = { politics: 'politics', movies: 'movies', ott: 'tv-ott' };
export const catHref = (id: string) => `/${CAT_SLUG[id] ?? id}/`;
export const stateHref = (id: string) => (id in REGION_SLUG ? `/${REGION_SLUG[id as keyof typeof REGION_SLUG]}/` : '/');

// News sections (politics, cinema, OTT) are paused while the site builds devotional authority. Existing stories stay live at their URLs.
export const NEWS_ENABLED = false;

// Sections. Each has its own accent colour. `always` sections have built-in content; others appear when they have stories.
export const SECTIONS = [
  { id: 'politics', label: 'Politics', brand: 'Southwala Politics', href: '/politics/', always: false, accent: '#1f3a5f', tag: 'Receipts, records and what the numbers say' },
  { id: 'religion', label: 'Devotional', brand: 'Southwala Devotional', href: '/religion/', always: true, accent: '#b4530a', tag: 'Panchangam, temples and the Bhagavad Gita' },
  { id: 'astrology', label: 'Astrology', brand: 'Southwala Astrology', href: '/rasi-phalalu/', always: true, accent: '#3d3a8f', tag: 'Rasi phalalu from the real sky' },
  { id: 'temples', label: 'Temples', brand: 'Southwala Temples', href: '/temples/', always: true, accent: '#8a3b12', tag: 'Guides to the temples every pilgrim asks about' },
  { id: 'gita', label: 'Bhagavad Gita', brand: 'Southwala Gita', href: '/bhagavad-gita/', always: true, accent: '#7a5b00', tag: 'All 18 chapters, in plain words' },
  { id: 'movies', label: 'Cinema', brand: 'Southwala Cinema', href: '/movies/', always: false, accent: '#a31650', tag: 'Box office, releases and the buzz' },
  { id: 'ott', label: 'OTT', brand: 'Southwala OTT', href: '/tv-ott/', always: false, accent: '#0e7c7b', tag: 'What to watch, where' },
] as const;

// Sub-navigation shown under the section brand.
export const SUBNAV: Record<string, { label: string; href: string }[]> = {
  religion: [
    { label: 'Panchangam', href: '/panchangam/hyderabad/' },
    { label: 'Rahu Kalam today', href: '/rahu-kalam-today/' },
    { label: 'Amavasya', href: '/amavasya/' },
    { label: 'Pournami', href: '/pournami/' },
    { label: 'Temples', href: '/temples/' },
    { label: 'Jyotirlingas', href: '/temples/jyotirlingas/' },
    { label: 'Shakti Peethas', href: '/temples/shakti-peethas/' },
    { label: 'Char Dham', href: '/temples/char-dham/' },
    { label: 'Bhagavad Gita', href: '/bhagavad-gita/' },
  ],
  astrology: [
    { label: 'Today', href: '/rasi-phalalu/' },
    { label: 'Tomorrow', href: '/horoscope-tomorrow/' },
    { label: 'Weekly', href: '/rasi-phalalu/mesha/weekly/' },
    { label: 'Monthly', href: '/rasi-phalalu/mesha/monthly/' },
  ],
};

export const CATEGORIES = [
  { id: 'politics', label: 'Politics', blurb: 'Who said what, who promised what, who got caught.' },
  { id: 'temples', label: 'Temples', brand: 'Southwala Temples', href: '/temples/', always: true, accent: '#8a3b12', tag: 'Guides to the temples every pilgrim asks about' },
  { id: 'gita', label: 'Bhagavad Gita', brand: 'Southwala Gita', href: '/bhagavad-gita/', always: true, accent: '#7a5b00', tag: 'All 18 chapters, in plain words' },
  { id: 'movies', label: 'Cinema', blurb: 'Kollywood, Tollywood, Sandalwood, Mollywood. Box office to buzz.' },
  { id: 'ott', label: 'OTT', blurb: 'What to binge, what to skip, what everyone is arguing about.' },
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
