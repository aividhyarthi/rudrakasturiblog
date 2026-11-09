// The full text of a festival page: story, puja steps, samagri, regional customs and questions. Dates and timings are never written here:
// the page works them out from the sky every day, so this text has no years in it and never goes stale.
export type Block = { h: string; p?: string[]; ul?: string[]; ol?: string[]; note?: string };
export type FestContent = {
  hero?: string; heroAlt?: string; te?: string; names: string; dek: string; source?: string;
  lead: string[]; blocks: Block[]; faqs: [string, string][]; reads: { href: string; label: string }[]; karthika?: boolean;
};

export const FEST_CONTENT: Record<string, FestContent> = {
  'govardhan-puja': {
    hero: 'krishna-flute', heroAlt: 'A flute, a lamp and a small hill of food offered at dawn', te: 'గోవర్ధన పూజ',
    names: 'Also called Annakut and Bali Padyami. In the Telugu states it is the first day of Karthika Masam.',
    dek: 'The morning after Deepavali: a hill of food for Krishna, a king remembered, and the month of lamps begins.',
    source: 'The story of Govardhan is told in the Bhagavata Purana (canto 10). The Bali story is in canto 8. Customs differ by region and family, so please follow your own elders.',
    lead: [
      'The lamps from Deepavali night are still on the steps. The house smells of oil and sweets, and everyone is tired and happy. Then, early the next morning, something new begins: a small hill of rice and flowers on a plate, a lamp beside it, and a family walking around it, slowly, with folded hands.',
      'That is Govardhan Puja. It is kept on the first day after the Deepavali new moon, and it carries three things at once: a hill that Krishna lifted, a king who gave everything he had, and in the Telugu states the first morning of Karthika Masam. Here is what each means, and how to keep the day at home.',
    ],
    blocks: [
      { h: 'Three things happen on this one day', ul: [
        '**Govardhan Puja and Annakut:** a thank-you to the hill, the cows and the land that feed us. Temples offer a mountain of food (annakut) to Krishna.',
        '**Bali Padyami:** the day many homes remember King Bali, who gave Vamana three steps of land.',
        '**Karthika Masam begins** in the Telugu calendar. The first deepam of the month of lamps is lit today.',
        'In Gujarat the same day is the start of the new year (Bestu Varas), and in Maharashtra it is Bali Pratipada, also called Padwa.',
      ] },
      { h: 'The story of Govardhan', p: [
        'The people of Vraj, a community of cowherds, used to worship Indra every year so that he would send rain. Young Krishna asked his foster father Nanda why they did it. The answer was simple: Indra sends rain, rain grows grass, and grass feeds the cows.',
        'Krishna said that the hill of Govardhana, with its grass and its streams, was what fed their cattle every day, and that they should honour the hill and the cows instead. The villagers agreed. Indra was furious and sent a storm that lasted for days.',
        'Krishna lifted the hill on the little finger of his left hand, like an umbrella, and the whole village sheltered under it with their cows. For seven days and nights the storm raged. Then Indra understood who the boy was, and gave up. Krishna set the hill down gently.',
        'Many readers take it as a story about pride and humility. Others hear a quieter message: be grateful for what really feeds you. Both readings point the same way.',
      ], note: 'Read the full story: [Govardhan, the hill Krishna lifted](/govardhan-the-hill-krishna-lifted-and-the-annakut/).' },
      { h: 'The story of Bali Padyami', p: [
        'Bali was a generous asura king who had conquered the three worlds. Vishnu came to him as Vamana, a small Brahmin boy, and asked for only as much land as he could cover in three steps. Bali kept his word even when his teacher warned him. One step covered the earth, the second covered the heavens, and for the third Bali offered his own head.',
        'The Bhagavata says he was sent to the beautiful realm of Sutala, and given a boon. A tradition, not the Bhagavata itself, says he is allowed to return once a year to see his people. Many families remember him on this day.',
      ], note: 'Read the full story: [Bali Padyami, the king who returns once a year](/bali-padyami-the-king-who-returns-once-a-year/).' },
      { h: 'How to keep Govardhan Puja at home', p: ['Follow your family\'s custom first. This is a simple, common way.'], ol: [
        'Bathe and put on clean clothes. The morning, after sunrise, is the usual time, and it falls inside the tithi.',
        'Make a small hill on a clean plate or a clean patch of ground. Use cooked rice, or clean earth or cow dung if that is your family\'s custom.',
        'Decorate it with flowers, a few tulasi leaves and a lamp.',
        'Offer fruit, sweets and the food you have cooked today. Many families make a variety of vegetarian dishes for this, which is the idea of annakut.',
        'If you have a cow or can visit a goshala, offer her fodder and flowers. The day honours cattle too.',
        'Walk around the little hill slowly, once or three times, with folded hands.',
        'Share the food with family and neighbours, and with someone who has little.',
      ] },
      { h: 'What to keep ready (samagri)', ul: [
        'Cooked rice and a few varied vegetarian dishes and sweets',
        'Fruit, flowers and tulasi leaves',
        'A clean plate or a patch of clean ground for the little hill',
        'A ghee or oil lamp, incense and a match',
        'Kumkum, turmeric and rice (akshat)',
        'Fodder or greens for cows, if you can reach one',
      ] },
      { h: 'How to keep Bali Padyami', p: ['Practices vary. Here are ones you may know.'], ul: [
        'Draw a rangoli or a small figure of Bali at the door, sometimes in rice flour or cow dung. Some draw three steps to recall Vamana\'s strides.',
        'Light a lamp in the evening. In some places the figure is worshipped.',
        'In Karnataka many homes do Balindra Pooja.',
        'In Maharashtra a wife often puts a tilak on her husband and receives a gift, and many traders begin a new year of accounts.',
        'If your family does none of these, lighting one lamp and telling the story to a child is a complete observance.',
      ] },
      { h: 'How the day is kept in different places', ul: [
        '**Govardhan, near Mathura:** pilgrims walk the hill\'s parikrama, about 21 km, barefoot and singing. On the way are Manasi Ganga and Radha Kund.',
        '**Vaishnava temples:** an annakut of dozens or hundreds of dishes is arranged in front of the deity and shared as prasad.',
        '**Gujarat:** the start of the new year. Families visit temples and greet each other.',
        '**Maharashtra:** Bali Pratipada or Padwa, with the tilak and gift custom between husband and wife.',
        '**Karnataka:** Bali Padyami, with Balindra Pooja in many homes.',
        '**Telugu states:** the first day of Karthika Masam, with the first morning and evening lamps of the month.',
        'In Kerala King Mahabali is remembered at Onam, which falls on a different date in the month of Chingam.',
      ] },
      { h: 'If you plan the Govardhan parikrama', p: ['These are practical notes, not rules.'], ul: [
        'Walk in the early morning or evening. Midday heat on bare stone is hard.',
        'Carry water and a cap, and go slowly. It takes five or six hours.',
        'Take your leaves, flowers and wrappers back with you.',
        'If you cannot walk the whole path, walk a part. Devotion is not measured in kilometres.',
      ] },
    ],
    faqs: [
      ['Is Govardhan Puja the same as Bali Padyami?', 'They fall on the same day, the first tithi after the Deepavali new moon, but they remember different stories. Govardhan Puja remembers Krishna and the hill. Bali Padyami remembers King Bali and Vamana.'],
      ['Why is Govardhan Puja the day after Deepavali?', 'It is kept on Kartika Shukla Pratipada, the first day of the bright fortnight after the Deepavali new moon. Many calendars also call it the fourth day of the Deepavali festival.'],
      ['What is Annakut?', 'Annakut means a mountain of food. Temples arrange dozens or hundreds of dishes in front of Krishna, as the offered hill, and then share them with devotees as prasad.'],
      ['Does Karthika Masam begin on Govardhan Puja?', 'In the Telugu and other amanta calendars, yes. The month begins with the sunrise of this Pratipada, and the first lamp of Karthika is lit on this day.'],
      ['Do I need a cow-dung hill for the puja?', 'No. Many families make the hill from cooked rice or clean earth. Follow your own family custom.'],
      ['What if I cannot go to Govardhan?', 'You do not have to. The puja at home with a small hill of food, a lamp and a walk around it is a full observance.'],
    ],
    reads: [
      { href: '/govardhan-the-hill-krishna-lifted-and-the-annakut/', label: 'Govardhan: the hill Krishna lifted and the annakut' },
      { href: '/bali-padyami-the-king-who-returns-once-a-year/', label: 'Bali Padyami: the king who returns once a year' },
      { href: '/dyuta-pratipada-when-shiva-and-parvati-played-dice/', label: 'Dyuta Pratipada: when Shiva and Parvati played dice' },
      { href: '/why-karthika-masam-what-the-month-means-and-who-to-worship/', label: 'Why Karthika Masam matters' },
      { href: '/karthika-deepam-why-we-light-lamps-and-how-to-do-it-well/', label: 'Karthika deepam: how to light the lamp well' },
    ],
    karthika: true,
  },
};
