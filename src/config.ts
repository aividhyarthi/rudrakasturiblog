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
export const CAT_SLUG: Record<string, string> = { politics: 'politics', movies: 'movies', ott: 'tv-ott' };
export const catHref = (id: string) => `/${CAT_SLUG[id] ?? id}/`;
export const stateHref = (id: string) => (id in REGION_SLUG ? `/${REGION_SLUG[id as keyof typeof REGION_SLUG]}/` : '/');

// Sections. Each has its own accent colour. `always` sections have built-in content; others appear when they have stories.
export const SECTIONS = [
  { id: 'politics', label: 'Politics', brand: 'Southwala Politics', href: '/politics/', always: false, accent: '#1f3a5f', tag: 'Receipts, records and what the numbers say' },
  { id: 'religion', label: 'Devotional', brand: 'Southwala Devotional', href: '/religion/', always: true, accent: '#b4530a', tag: 'Panchangam, temples and the Bhagavad Gita' },
  { id: 'astrology', label: 'Astrology', brand: 'Southwala Astrology', href: '/rasi-phalalu/', always: true, accent: '#3d3a8f', tag: 'Rasi phalalu from the real sky' },
  { id: 'movies', label: 'Cinema', brand: 'Southwala Cinema', href: '/movies/', always: false, accent: '#a31650', tag: 'Box office, releases and the buzz' },
  { id: 'ott', label: 'OTT', brand: 'Southwala OTT', href: '/tv-ott/', always: false, accent: '#0e7c7b', tag: 'What to watch, where' },
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
