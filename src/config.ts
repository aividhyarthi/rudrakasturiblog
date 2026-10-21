// Everything you may want to change lives here.
export const SITE = {
  name: 'Southwala',
  url: 'https://www.southwala.com',
  tagline: 'Be South. Sanatan. Sacred.',
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
export const CAT_SLUG: Record<string, string> = { politics: 'politics', movies: 'movies', ott: 'tv-ott', devotional: 'devotional', spiritual: 'yoga-spiritual', gita: 'gita-teachings', karma: 'karma-stories', gods: 'gods-and-goddesses', dharma: 'advaita-and-dharma', temple: 'temple-stories', sacred: 'sacred-rivers-and-hills', faith: 'faith-stories', questions: 'faith-questions', prayer: 'prayer-and-mantras', astrology: 'horoscope' };
export const catHref = (id: string) => `/${CAT_SLUG[id] ?? id}/`;
export const stateHref = (id: string) => (id in REGION_SLUG ? `/${REGION_SLUG[id as keyof typeof REGION_SLUG]}/` : '/');

// News sections (politics, cinema, OTT) are paused while the site builds devotional authority. Existing stories stay live at their URLs.
export const NEWS_ENABLED = false;

// Sections. Each has its own accent colour. `always` sections have built-in content; others appear when they have stories.
export const SECTIONS = [
  { id: 'politics', label: 'Politics', brand: 'Southwala Politics', href: '/politics/', always: false, accent: '#1f3a5f', tag: 'Receipts, records and what the numbers say' },
  { id: 'religion', label: 'Devotional', brand: 'Southwala Devotional', href: '/religion/', always: true, accent: '#b4530a', tag: 'Panchangam, temples and the Bhagavad Gita' },
  { id: 'astrology', label: 'Astrology', brand: 'Southwala Astrology', href: '/rasi-phalalu/', always: true, accent: '#3d3a8f', tag: 'Daily, weekly and monthly rasi phalalu' },
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
    { label: 'Ekadashi', href: '/ekadashi/' },
    { label: 'Sankashti', href: '/sankashti-chaturthi/' },
    { label: 'Pradosham', href: '/pradosham/' },
    { label: 'Daily panchangam', href: '/daily-panchangam/' },
    { label: 'Mantras', href: '/mantras/' },
    { label: 'Temples', href: '/temples/' },
    { label: 'Jyotirlingas', href: '/temples/jyotirlingas/' },
    { label: 'Shakti Peethas', href: '/temples/shakti-peethas/' },
    { label: 'Char Dham', href: '/temples/char-dham/' },
    { label: 'Bhagavad Gita', href: '/bhagavad-gita/' },
  ],
  astrology: [
    { label: 'Today', href: '/rasi-phalalu/' },
    { label: 'Tomorrow', href: '/horoscope-tomorrow/' },
    { label: 'Daily article', href: '/daily-horoscope/' },
    { label: 'Weekly', href: '/rasi-phalalu/mesha/weekly/' },
    { label: 'Monthly', href: '/rasi-phalalu/mesha/monthly/' },
  ],
};

// Which menu section each article category belongs to, and which rail it uses.
export const CAT_SECTION: Record<string, string> = { politics: 'politics', movies: 'movies', ott: 'ott', devotional: 'religion', spiritual: 'religion', gita: 'gita', karma: 'religion', gods: 'religion', dharma: 'religion', temple: 'temples', sacred: 'religion', faith: 'religion', questions: 'religion', prayer: 'religion', astrology: 'astrology' };
export const CAT_RAIL: Record<string, string> = { politics: 'politics', movies: 'movies', ott: 'ott', devotional: 'religion', spiritual: 'religion', gita: 'religion', karma: 'religion', gods: 'religion', dharma: 'religion', temple: 'religion', sacred: 'religion', faith: 'religion', questions: 'religion', prayer: 'religion', astrology: 'astrology' };
export const NEWS_CATS = ['politics', 'movies', 'ott'];

export const CATEGORIES = [
  { id: 'devotional', label: 'Devotional', blurb: 'Festivals, panchangam, vratams and the traditions behind them.' },
  { id: 'astrology', label: 'Astrology', blurb: 'Rashis, planets and how to read your horoscope.' },
  { id: 'gita', label: 'Bhagavad Gita', blurb: 'What the Gita says about work, anger, fear and peace of mind.' },
  { id: 'prayer', label: 'Prayer & Mantras', blurb: 'Which god to pray to for which need, and the mantras to focus on.' },
  { id: 'questions', label: 'Faith Questions', blurb: 'The questions people feel but rarely ask out loud about prayer, the body, the mind and karma.' },
  { id: 'gods', label: 'Gods & Goddesses', blurb: 'Shiva, Krishna, Ganesha, Murugan, Kali, Balaji and more: who they are and why people pray to them.' },
  { id: 'dharma', label: 'Advaita & Dharma', blurb: 'Advaita, Adi Shankaracharya, the Upanishads and what Sanatana Dharma means.' },
  { id: 'temple', label: 'Temple Stories', blurb: 'The great temples of Tamil Nadu and the South, and the stories behind them.' },
  { id: 'sacred', label: 'Rivers & Hills', blurb: 'The rivers and hills that people worship as living gods.' },
  { id: 'faith', label: 'Faith Stories', blurb: 'Westerners who came to India as sceptics, scholars or soldiers and left changed.' },
  { id: 'karma', label: 'Karma Stories', blurb: 'Even the gods did not escape karma. Stories from the epics and what they teach.' },
  { id: 'spiritual', label: 'Yoga & Spiritual', blurb: 'Yoga, pranayama and simple practices for daily life.' },
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
