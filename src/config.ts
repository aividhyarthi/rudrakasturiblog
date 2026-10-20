// Everything you may want to change lives here.
export const SITE = {
  name: 'Southwala',
  url: 'https://southwala.com',
  tagline: 'South India, minus the boring parts.',
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

export const CATEGORIES = [
  { id: 'politics', label: 'Politics', blurb: 'Who said what, who promised what, who got caught.' },
  { id: 'movies', label: 'Movies', blurb: 'Kollywood, Tollywood, Sandalwood, Mollywood. Box office to buzz.' },
  { id: 'ott', label: 'TV & OTT', blurb: 'What to binge, what to skip, what everyone is arguing about.' },
  { id: 'trending', label: 'Trending', blurb: 'The internet moment of the day, explained.' },
  { id: 'news', label: 'News', blurb: 'Everything else South India woke up to today.' },
  { id: 'sports', label: 'Sports', blurb: 'IPL, football, cricket and local legends.' },
] as const;

export const REGIONS = {
  tn: 'Tamil Nadu',
  kl: 'Kerala',
  ka: 'Karnataka',
  ap: 'Andhra Pradesh',
  ts: 'Telangana',
  south: 'South India',
} as const;
