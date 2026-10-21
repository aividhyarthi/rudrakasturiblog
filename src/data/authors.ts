// Contributors write under pen names. Every article is reviewed by the Southwala Editorial Desk.
export type Contributor = { id: string; name: string; role: string; beat: string; bio: string };

export const EDITORIAL_DESK = 'Southwala Editorial Desk';

export const AUTHORS: Contributor[] = [
  { id: 'raghunatha-sharma', name: 'Raghunatha Sharma', role: 'Devotional contributor', beat: 'Festivals, vratams, panchangam, the gods and goddesses',
    bio: 'Writes about the festival calendar, how to keep a vratam, and the gods and goddesses of the South, in plain words for families who want to do it right.' },
  { id: 'siva-pantulu', name: 'Siva Pantulu', role: 'Astrology contributor', beat: 'Rasi phalalu, nakshatras, planets and the daily horoscope',
    bio: 'Writes the daily, weekly and monthly rasi phalalu and explains the rashis, nakshatras and planets without fear or hype.' },
  { id: 'partha-sarathi-acharya', name: 'Partha Sarathi Acharya', role: 'Bhagavad Gita contributor', beat: 'The Gita, karma and the stories of the epics',
    bio: 'Writes on the Bhagavad Gita and the karma stories of the Ramayana and Mahabharata, and on what Krishna’s advice means for an ordinary working day.' },
  { id: 'sri-guru-brahma-sastry', name: 'Sri Guru Brahma Sastry', role: 'Yoga and spiritual contributor', beat: 'Yoga, pranayama, meditation and daily practice',
    bio: 'Writes on yoga, breathing and meditation for the problems of modern life: the back, the breath, sleep and a busy mind. Gentle, practical and never medical advice.' },
  { id: 'ranganatha-dikshitar', name: 'Ranganatha Dikshitar', role: 'Temples contributor', beat: 'Temple histories, pilgrimages, sacred rivers and hills',
    bio: 'Writes temple guides and the stories behind them, from the great Chola temples to the hills and rivers where the gods are said to live.' },
  { id: 'vidyaranya-murthy', name: 'Vidyaranya Murthy', role: 'Dharma contributor', beat: 'Advaita, Adi Shankaracharya, the Upanishads and faith stories',
    bio: 'Writes on Advaita Vedanta, Adi Shankaracharya, the Upanishads and the questions of seekers, in the manner of a teacher speaking to a student.' },
  { id: 'lalitha-devi', name: 'Lalitha Devi', role: 'Prayer and faith-questions contributor', beat: 'Prayer, mantras, and the questions people hesitate to ask',
    bio: 'Writes on mantras, which god to pray to for which trouble, and the quiet questions about faith that people rarely ask out loud.' },
];

export const CAT_AUTHOR: Record<string, string> = {
  devotional: 'raghunatha-sharma', gods: 'raghunatha-sharma',
  astrology: 'siva-pantulu',
  gita: 'partha-sarathi-acharya', karma: 'partha-sarathi-acharya',
  spiritual: 'sri-guru-brahma-sastry',
  temple: 'ranganatha-dikshitar', sacred: 'ranganatha-dikshitar',
  dharma: 'vidyaranya-murthy', faith: 'vidyaranya-murthy',
  prayer: 'lalitha-devi', questions: 'lalitha-devi',
};

export const authorById = (id: string) => AUTHORS.find((a) => a.id === id);
/** The contributor for an article's category, or undefined for desk-bylined news. */
export const contributorFor = (category: string) => authorById(CAT_AUTHOR[category] ?? '');
export const contributorsForCategory = (category: string) => { const a = contributorFor(category); return a ? [a] : []; };
