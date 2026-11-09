// The full guide for each Hindu month's permanent page (/masam/karthika/). Dates, Mondays, Ekadashis and festivals are worked out from the sky,
// so this text has no years in it. Add a month here (and in MASA_TEXT) and its page and banner appear automatically.
export type MasaPage = {
  slug: string; idx: number; name: string; te: string; dek: string; hero: string;
  lead: string[]; sections: { h: string; p?: string[]; ul?: string[]; ol?: string[] }[];
  faqs: [string, string][]; reads: { href: string; label: string }[];
  // for the banner on every page while the month runs (Karthika has its own richer banner text in masa.ts)
  every?: string; facts?: string[]; before?: string;
  weekdayVrats?: { day: number; label: string; href: string }[]; // e.g. Monday: Karthika Somavaram
};
import { MASA_MORE } from './masa-pages-more';
const KARTHIKA: MasaPage[] = [
  {
    slug: 'karthika', idx: 7, weekdayVrats: [{ day: 1, label: 'Karthika Somavaram', href: '/karthika-somavaram-the-monday-fast-and-the-worship-of-shiva/' }], name: 'Karthika Masam', te: 'కార్తీక మాసం', hero: 'shiva-symbols',
    dek: 'The month of lamps, dear to Shiva and Vishnu: the deepam, the Mondays and the full moon.',
    lead: [
      'Before sunrise, in the lanes of a Telugu town, small lamps are already burning on doorsteps and at the tulasi. Women are bathing in the cold, children are sleepy, and somewhere a radio is playing a Shiva stotra. This is Karthika Masam, and for the whole month the town is a little quieter and a little brighter than usual.',
      'It is the month many families wait for all year. Here is when it begins and ends, what each Monday and each special day is for, and how to keep the month in a way that suits your home.',
    ],
    sections: [
      { h: 'Why Karthika is special', p: [
        'Karthika is the month of the deepam, the small lamp lit at dawn and at dusk at the tulasi, at the temple, on a river bank and at the doorstep. It is dear to both Shiva and Vishnu. The Mondays, called Karthika Somavaram, belong to Shiva, the Ekadashis and the Tulasi Vivaha to Vishnu, and the full moon, Karthika Pournami, is among the holiest days of the year.',
        'The dates here follow the amanta calendar used in Andhra Pradesh, Telangana, Karnataka and much of the South, where the month begins the day after the Deepavali new moon. In the purnimanta calendar of North India, the month named Kartik begins earlier, after Sharad Purnima, so the same festivals appear under different month names.',
      ] },
      { h: 'What families usually observe', ul: [
        '**A bath at dawn.** Many people bathe before sunrise through the month, in a river where possible, and some do it only on Mondays.',
        '**Lighting lamps.** A lamp is lit at dawn and at dusk before the home shrine and the tulasi plant. Many families also light a lamp on an amla (usirika) fruit or leaf, or float a lamp in a river or pond. Some raise a lamp on a pole, called akasa deepam, above the house.',
        '**Karthika Somavaram fast.** Mondays are special for Shiva. Many keep a fast until the evening, visit a Shiva temple, and break the fast after lighting a lamp. Fasting is a personal choice. Children, elders, pregnant women and anyone with a health condition should not fast, and a fruit-and-milk fast is perfectly acceptable.',
        '**Reading the Karthika Puranam.** The text is traditionally read one chapter a day across the thirty days of the month.',
        '**Vana bhojanam.** On a Sunday or another day of the month, communities share a meal under an amla tree, a custom especially popular in the Telugu states.',
        '**Simple food.** Many keep a vegetarian diet through the month, and some take only one meal a day.',
      ] },
      { h: 'Karthika Somavaram: the Mondays', p: ['Monday is Shiva\'s day, and in this month it carries special weight. Many families keep the Monday fast, offer water, milk and bilva leaves to the Shiva lingam, and light a lamp at dusk. Our guide to Karthika Somavaram explains the day.'] },
      { h: 'Karthika Pournami: the high point', p: ['The full moon of the month is the great day. Lamps are lit in great numbers at temples and by rivers, and the day is also known as Dev Deepawali and Tripura Purnima. Many Telugu families light 365 wicks, one for each day of the year. The Kartika Deepam at Tiruvannamalai falls close to this date.'] },
      { h: 'Tulasi Vivaha and Prabodhini Ekadashi', p: ['Prabodhini Ekadashi is the day Vishnu is said to wake from his four-month sleep. The ceremonial wedding of the tulasi plant to Vishnu, Tulasi Vivaha, is held from around this day until Karthika Pournami.'] },
      { h: 'The month of lamps and Krishna', p: ['Karthika is also called Damodara masa in the Vaishnava tradition, remembering the child Krishna who was tied to a mortar by his mother Yashoda with a rope, and so is called Damodara. Lamps offered to Krishna in this month are called Damodara deepam.'] },
      { h: 'Temples that draw crowds', ul: ['**Srisailam** and **Vemulawada** see their biggest crowds of the year on Karthika Mondays and Pournami, so plan travel and darshan well ahead.', '**Pancharama Kshetralu,** the five ancient Shiva temples of coastal Andhra Pradesh, are traditionally visited in this month.', '**Arunachala,** Tamil Nadu: the great Deepam on the hill and the circuit of the hill by pilgrims.'] },
      { h: 'How to keep the month at home', ol: [
        'Clean the home and the puja area on the first day, and put a lamp at the tulasi.',
        'Light a lamp at dawn and at dusk every day, even a small one.',
        'Keep the Monday fast if it suits you, and visit a Shiva temple.',
        'Read a little of the Karthika Puranam or a stotra each day.',
        'Join a Vana bhojanam, and give food or oil for lamps to a temple.',
        'On Karthika Pournami, light as many lamps as you can, and keep the evening for prayer.',
      ] },
    ],
    faqs: [
      ['When does Karthika Masam begin and end?', 'In the amanta calendar it begins on the day after the Deepavali new moon, with the sunrise of Kartika Shukla Pratipada, and ends on Kartika Amavasya. The exact dates for this year are at the top of this page.'],
      ['Is Karthika Masam the same everywhere?', 'No. In the South and West the month begins after the Deepavali new moon. In North India, where months run from full moon to full moon, the month called Kartik begins earlier, after Sharad Purnima.'],
      ['Do I have to fast on all Mondays?', 'No. Fasting is a personal choice. Many keep only some Mondays or a light fast. A lamp and a prayer are enough.'],
      ['Can I light lamps in an apartment?', 'Yes. A lamp at the home shrine and a small one at the balcony or at the tulasi pot, kept on a plate away from curtains, is a full observance.'],
      ['Do I need to eat vegetarian food for the whole month?', 'Many families do, especially on Mondays and Pournami. It is a custom, and each family follows its own.'],
      ['What is Akasa Deepam?', 'A lamp raised on a pole high above the house or the temple, offered to the sky in the month of Karthika.'],
    ],
    reads: [
      { href: '/why-karthika-masam-what-the-month-means-and-who-to-worship/', label: 'Why Karthika Masam matters' },
      { href: '/karthika-somavaram-the-monday-fast-and-the-worship-of-shiva/', label: 'Karthika Somavaram: the Monday fast' },
      { href: '/karthika-deepam-why-we-light-lamps-and-how-to-do-it-well/', label: 'Karthika deepam: how to light the lamp well' },
      { href: '/karthika-damodara-krishna-the-rope-and-the-month-of-lamps/', label: 'Damodara Krishna: the rope and the month of lamps' },
      { href: '/tripura-pournami-the-story-of-the-three-cities-and-dev-deepawali/', label: 'Tripura Pournami: the story of the three cities' },
      { href: '/series/karthika/', label: 'All Karthika stories' },
    ],
  },
];
export const MASA_PAGES: MasaPage[] = [...KARTHIKA, ...MASA_MORE].sort((a, b) => a.idx - b.idx);
