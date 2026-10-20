// Plain-language guidance for Amavasya and Pournami pages. Traditions differ by region and family.
export const MONTH_NOTE = {
  pournami: [
    'Chaitra is the first month of the lunar year, which opens with Ugadi. This Pournami comes about two weeks into the new year.',
    'Vaishakha Pournami is Buddha Purnima, when the birth, enlightenment and passing of Gautama Buddha are remembered. Many Hindus bathe in rivers and give water, fans and food in the heat of the season.',
    'In parts of western India, married women observe Vat Purnima on Jyeshtha Pournami, tying a thread round a banyan tree for the wellbeing of their families.',
    'Ashadha Pournami is Guru Purnima, the day to honour teachers and Veda Vyasa, who is remembered as the compiler of the Vedas and the Mahabharata.',
    'Shravana Pournami is Raksha Bandhan, when sisters tie a rakhi on their brothers. In the Telugu states it is also Jandhyala Pournami, when the sacred thread is renewed (upakarma).',
    'Bhadrapada Pournami comes just before Pitru Paksha, the fortnight of remembering ancestors, which begins the next day. Uma Maheshwara vratam is also observed on this day.',
    'Ashwayuja Pournami is Sharad Purnima, when the moon is traditionally said to be at its fullest and brightest. Families worship Lakshmi and keep sweet payasam in the moonlight.',
    'Kartika Pournami is among the most sacred full moons of the year. Lamps are lit in homes, rivers and temples through Karthika masam, a month dear to Shiva and Vishnu devotees.',
    'Margashira Pournami is Dattatreya Jayanti. Margashira is also the month Krishna names in the Bhagavad Gita (10.35) as his own among the months.',
    'Pushya Pournami is a day of river baths and charity. It is also remembered as Shakambari Jayanti, when the goddess Shakambari is worshipped.',
    'Magha is the month of holy baths in rivers, and Magha Pournami is considered its high point, with pilgrims gathering at river ghats and sangamams.',
    'Phalguna Pournami is the festival of Holi and Holika Dahan in the north. In the Telugu states the day is remembered as Kama Dahanam.',
  ],
  amavasya: [
    'Chaitra Amavasya is the last new moon of the lunar year. Ugadi, the new year, begins on the next day.',
    'Vaishakha Amavasya is observed in the usual way: remembering ancestors, giving in charity and lighting the evening lamp.',
    'Jyeshtha Amavasya is observed in the usual way: remembering ancestors, giving in charity and lighting the evening lamp.',
    'Ashadha Amavasya is observed in the usual way: remembering ancestors, giving in charity and lighting the evening lamp.',
    'Shravana Amavasya is observed in the usual way: remembering ancestors, giving in charity and lighting the evening lamp.',
    'Bhadrapada Amavasya is Mahalaya Amavasya (Sarva Pitru Amavasya), the last day of Pitru Paksha. Families offer tarpanam and food for all ancestors, including those whose date of death is not known.',
    'Ashwayuja Amavasya is Deepavali in most of India. Homes are lit with lamps and Lakshmi is worshipped in the evening.',
    'Kartika Amavasya falls in Karthika masam, a month when lamps are lit daily at homes and temples.',
    'Margashira Amavasya is observed in the usual way: remembering ancestors, giving in charity and lighting the evening lamp.',
    'Pushya Amavasya is called Mauni Amavasya in the north Indian calendar, a day of silence, a holy bath and charity.',
    'Maha Shivaratri falls on the Chaturdashi just before this Amavasya. Bathing and charity on Magha Amavasya are considered meritorious.',
    'Phalguna Amavasya is the last new moon before the spring festivals. It is observed in the usual way: remembering ancestors, charity and the evening lamp.',
  ],
} as const;

export const WEEKDAY_NOTE: Record<string, string> = {
  amavasya1: 'It falls on a Monday, which makes it Somavati Amavasya. Traditionally it is a special day for worshipping Shiva, and some women circle a peepal tree and observe a fast for the wellbeing of their family.',
  amavasya6: 'It falls on a Saturday, which makes it Shani Amavasya. Devotees traditionally worship Shani with sesame oil and black sesame, and visit Shani temples.',
};

export const COPY = {
  amavasya: {
    title: 'Amavasya', te: 'అమావాస్య', plural: 'Amavasya dates',
    what: 'Amavasya is the new moon day, the last tithi of the dark fortnight (Krishna paksha), when the Moon is in line with the Sun and cannot be seen. In the Hindu calendar it is the day to remember ancestors, to give in charity and to light a lamp at dusk.',
    do: [
      'Offer tarpanam (water with sesame) and food in memory of ancestors, as your family tradition prescribes.',
      'Give food, clothes or sesame to those in need. Feeding cows, crows and the hungry is traditional.',
      'Light a lamp at the entrance and at the home shrine in the evening.',
      'Visit a temple, or recite a stotra such as the Vishnu Sahasranama or Hanuman Chalisa.',
    ],
    avoid: [
      'Many families avoid starting new ventures, weddings or house-warming on Amavasya.',
      'Many avoid shaving, cutting hair and nails on this day.',
      'Some avoid long journeys, especially after dark.',
    ],
    faq: [
      ['Why can the date of Amavasya differ between calendars?', 'The tithi can begin on one day and end on the next. Calendars pick the day by rule, and for Amavasya most use the day on which the tithi is present in the afternoon (aparahna), when ancestor rites are done. Some temples and families follow a different rule.'],
      ['Is Amavasya auspicious or inauspicious?', 'Traditionally it is a day for ancestors and inner reflection, not for celebrations or new beginnings. It is considered powerful for charity, prayer and remembering the departed.'],
      ['What is the difference between Amavasya and Pournami?', 'Amavasya is the new moon (no Moon visible) and Pournami is the full moon. They are about two weeks apart.'],
    ],
  },
  pournami: {
    title: 'Pournami', te: 'పౌర్ణమి', plural: 'Pournami dates',
    what: 'Pournami (Purnima) is the full moon day, the last tithi of the bright fortnight (Shukla paksha). It is considered auspicious for worship, fasting, charity and vratams such as Satyanarayana puja.',
    do: [
      'Perform Satyanarayana vratam or visit a Vishnu or Lakshmi temple.',
      'Observe a fast until moonrise if your family does, and offer arghya to the Moon.',
      'Give in charity and feed the needy.',
      'Light lamps at home and the shrine in the evening, and take a holy bath if you can reach a river.',
    ],
    avoid: [
      'Fasting is voluntary. People with health conditions, children, elders and pregnant women should not fast.',
      'Many families avoid non-vegetarian food and alcohol on Pournami.',
    ],
    faq: [
      ['Why can the date of Pournami differ between calendars?', 'The tithi can begin on one day and end on the next. We take the day on which Pournami is present at local sunrise. Some temples and families go by the evening or moonrise, so a vratam can fall a day apart. Check with your temple or priest.'],
      ['Which Pournami is most important?', 'Many consider Kartika Pournami, Guru Purnima (Ashadha), Sharad Purnima (Ashwayuja), Buddha Purnima (Vaishakha) and Magha Pournami the most significant.'],
      ['What time does Pournami end?', 'The exact start and end times of the tithi are on each page below, in Indian Standard Time. The tithi times are the same everywhere in India.'],
    ],
  },
} as const;
