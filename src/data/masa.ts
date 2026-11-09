// What each Hindu month means for readers, shown as a banner while the month runs (and a few days before it begins).
// Add an entry here and the banner appears for that month automatically. Months with no entry show only a small label.
export type MasaText = {
  show: string; te: string; tagline: string; why: string[]; doToday: Record<number, string>; every: string;
  facts: string[]; links: { href: string; label: string }[]; before: string;
};
export const MASA_TEXT: Record<string, MasaText> = {
  Kartika: {
    show: 'Karthika Masam', te: 'కార్తీక మాసం',
    tagline: 'The month of lamps, dear to Shiva and Vishnu',
    why: [
      'Karthika is the month many families wait for all year. It is the month of the deepam, the small lamp lit at dawn and at dusk at the tulasi, at the temple, on a river bank and at the doorstep.',
      'It is dear to both Shiva and Vishnu. The Mondays (Karthika Somavaram) belong to Shiva, the Ekadashi and the Tulasi Vivaha to Vishnu, and the full moon, Karthika Pournami, is among the holiest days of the year.',
    ],
    every: 'Every day: a bath before sunrise if you can, a lamp at the tulasi or in front of the god at dawn, another at dusk, and a simple, light meal. Many keep it vegetarian for the month.',
    doToday: {
      0: 'Sunday: a good day to clean the pooja space and get your lamps and oil ready for the week.',
      1: 'Karthika Somavaram. Monday in this month is Shiva\'s own day. Many fast until the evening, offer water or milk and bilva leaves to Shiva, and light a lamp at dusk.',
      2: 'Tuesday: light your dawn and dusk lamps, and remember Subramanya, whose Skanda Shashti falls in this month.',
      3: 'Wednesday: light your dawn and dusk lamps, and read a few verses of the Vishnu Sahasranama or the Gita.',
      4: 'Thursday: a day for the guru. Light the lamps and, if you can, offer something to a teacher or an elder.',
      5: 'Friday: lamps at dawn and dusk, and a visit to a Lakshmi or Devi temple if you can.',
      6: 'Saturday: lamps at dawn and dusk. Many also visit Venkateswara or Hanuman today.',
    },
    facts: [
      'Lamps are lit at dawn and at dusk through the month, most of all at the tulasi.',
      'Karthika Somavaram: the four Mondays are fasting and Shiva-worship days.',
      'Vanabhojanam: families eat together under an amla (usiri) tree, a custom of the Telugu states.',
      'Tulasi Vivaha, the ceremonial wedding of Tulasi and Vishnu, is held around Dwadashi.',
      'Karthika Pournami: a thousand lamps, a dawn dip in a river or tank, and Shiva abhishekam.',
    ],
    links: [
      { href: '/karthika-masam-2026-dates-deepam-and-fasting/', label: 'Dates, deepam and fasting' },
      { href: '/why-karthika-masam-what-the-month-means-and-who-to-worship/', label: 'What the month means' },
      { href: '/karthika-somavaram-the-monday-fast-and-the-worship-of-shiva/', label: 'Karthika Somavaram' },
      { href: '/karthika-deepam-why-we-light-lamps-and-how-to-do-it-well/', label: 'How to light the deepam' },
      { href: '/series/karthika/', label: 'All Karthika stories' },
    ],
    before: 'Tonight is Amavasya, the new moon that closes Ashwayuja. Karthika Masam begins with the sunrise tomorrow. Tonight, clean the pooja space, wash your lamps, and get oil, wicks and flowers ready, so that the first dawn lamp can be lit tomorrow.',
  },
};
