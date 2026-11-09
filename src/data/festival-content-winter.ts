// Full page text for festivals from Pushya to Chaitra. No years in this text: dates come from the sky.
import type { FestContent } from './festival-content';

export const FEST_WINTER: Record<string, FestContent> = {
  'makara-sankranti': {
    hero: 'surya-symbols', heroAlt: 'A rising Sun over a harvest field with a pot of rice boiling over', te: 'మకర సంక్రాంతి',
    names: 'Also called Pongal in Tamil Nadu and Uttarayana Punyakalam. The Sun enters Makara (Capricorn) and begins his northward journey.',
    dek: 'Three days of harvest, kites, rangoli and a pot that is meant to boil over.',
    source: 'Makara Sankranti is a solar festival. Its date is fixed by the Sun\'s entry into Makara, not by the Moon. Customs differ widely by region.',
    lead: [
      'Before dawn in a Telugu village, a bonfire of old wooden things and broken furniture burns in the street. Children dance around it. By afternoon the doorsteps are covered with huge rangoli, and a pot of rice and milk bubbles on a fire in the yard until it rises and spills over. Everyone shouts "Pongalo Pongal!", or in Telugu homes, the cheer of the harvest.',
      'That is Sankranti: the Sun turns north, the harvest comes in, and families thank the land, the cattle and the Sun. It is the biggest festival of the year in the Telugu states, and it is one of the few Hindu festivals with a fixed date in the solar calendar.',
    ],
    blocks: [
      { h: 'Why the Sun matters on this day', p: ['On this day the Sun enters Makara, the sign of Capricorn, and the six months of Uttarayana begin, the Sun\'s northward journey. Tradition treats these months as auspicious. In the Mahabharata, Bhishma lay on his bed of arrows waiting for Uttarayana to leave his body. Sankranti is therefore a day to thank the Sun and to begin things afresh.'] },
      { h: 'The three days', ul: [
        '**Bhogi** (the day before): a bonfire of old, unwanted things, and a clean-out of the house. In the Telugu states, children are blessed with Bhogi pallu, a mix of fruit, coins and sugarcane pieces.',
        '**Sankranti** (the day itself): a bath at dawn, Surya arghya, new clothes, sweets, rangoli and prayers for the ancestors.',
        '**Kanuma** (the day after): the day to honour cattle, who work the fields. They are bathed, decorated and fed. Many families visit relatives.',
      ] },
      { h: 'How to keep Sankranti', ol: [
        'Draw a large rangoli (muggulu) at the door with rice flour, and decorate it with flowers and, in the Telugu country, small mounds of cow dung called gobbemmalu.',
        'Bathe at dawn, and offer water to the rising Sun.',
        'Cook the festival food: Pongal (rice and milk, with jaggery) in Tamil homes, and ariselu, sakinalu, chakralu and sweets of sesame and jaggery in the Telugu states.',
        'Offer the food to the Sun, and then share it with family and neighbours.',
        'Give: til, jaggery, grain or clothes to those who have less. Giving til and jaggery is traditional on this day.',
        'Remember the ancestors with tarpanam, as your family does.',
      ] },
      { h: 'How the day is kept in different places', ul: [
        '**Andhra Pradesh and Telangana:** a three-day festival with rangoli contests, Haridasus singing at the door, and decorated bulls and cows.',
        '**Tamil Nadu:** Thai Pongal, with Bhogi, Surya Pongal, Mattu Pongal for cattle and Kaanum Pongal for visiting family.',
        '**Karnataka:** Suggi, with the Ellu-Bella exchange of sesame and jaggery, and the phrase "eat this sweet and speak sweetly".',
        '**Kerala:** the Makara Vilakku and the Makara Jyothi are seen at Sabarimala on this day.',
        '**Gujarat and Rajasthan:** Uttarayan, with kite flying. **Punjab:** Lohri is the evening before.',
      ] },
    ],
    faqs: [
      ['Why does Sankranti fall on the same date most years?', 'Because it follows the Sun, not the Moon. It falls on 14 or 15 January, depending on the exact moment the Sun enters Makara.'],
      ['What is Bhogi?', 'The first day, when old things are burned and the house is cleaned out. It marks leaving the old behind.'],
      ['Why does the Pongal pot overflow?', 'The overflow is a sign of abundance. It is greeted with a shout, and it is believed to bring plenty through the coming year.'],
      ['What is Uttarayana Punyakalam?', 'The auspicious period when the Sun is moving north. It begins at Makara Sankranti and lasts about six months.'],
    ],
    reads: [{ href: '/bhishma-on-the-bed-of-arrows-what-karma-did-he-carry/', label: 'Bhishma on the bed of arrows' }, { href: '/surya-arghya-how-to-offer-water-to-the-sun-at-sunrise/', label: 'Surya arghya: how to offer water to the Sun' }, { href: '/surya-the-sun-in-the-navagrahas-what-he-rules-and-how-to-worship-him/', label: 'Surya in the Navagrahas' }],
  },

  'ram-mandir-pratishtha': {
    hero: 'rama-symbols', heroAlt: 'A bow, an arrow and a lamp before a small shrine', te: 'ప్రతిష్ఠా ద్వాదశి',
    names: 'Also called Kurma Dwadashi. The anniversary of the Pran Pratishtha of Ram Lalla at Ayodhya, kept by the lunar date.',
    dek: 'The day Ram Lalla was installed in the temple at Ayodhya, remembered on the lunar date.',
    source: 'The Pran Pratishtha took place on 22 January 2024, which was Pausha Shukla Dwadashi. The Shri Ram Janmabhoomi Teerth Kshetra keeps the anniversary by the lunar date.',
    lead: ['For many families the consecration of the Ram temple in Ayodhya was a day they will remember. Temples across the country held bhajans, and many homes lit lamps. The temple trust has chosen to mark its anniversary each year on the lunar date, Pausha Shukla Dwadashi, and this page tells you when that falls.'],
    blocks: [
      { h: 'What the day is', p: ['Pratishtha Dwadashi marks the anniversary of the Pran Pratishtha, the ritual of invoking life into the idol of Ram Lalla at the new Ram Mandir in Ayodhya. It is kept on Pausha Shukla Dwadashi. The same tithi is also called Kurma Dwadashi, because of the Kurma avatar of Vishnu in some traditions.'] },
      { h: 'How people keep it', ul: ['Special pujas and Ramayana recitation at Ayodhya.', 'Ram bhajans and kirtans in temples and homes.', 'Reading a chapter of the Sundara Kanda or the Ramayana.', 'Lighting a lamp before a picture of Rama, Sita, Lakshmana and Hanuman.'] },
      { h: 'A simple way to mark it at home', ol: ['Light a lamp before your picture of Rama.', 'Offer a flower and a little fruit.', 'Read a few verses of the Ramayana, or sing a bhajan together.', 'Share prasad with neighbours.'] },
    ],
    faqs: [
      ['When was the Pran Pratishtha?', 'It took place on 22 January 2024, which was Pausha Shukla Dwadashi.'],
      ['Is the anniversary kept by the English date or the lunar date?', 'The temple trust keeps it by the lunar date, so the English date changes each year.'],
      ['Is this a traditional festival?', 'It is a new observance. The tithi, Kurma Dwadashi, is older.'],
    ],
    reads: [{ href: '/sundara-kanda-why-people-read-it-in-hard-times-and-how/', label: 'Sundara Kanda: why people read it' }, { href: '/why-rama-is-called-maryada-purushottam/', label: 'Why Rama is called Maryada Purushottam' }],
  },

  'vasant-panchami': {
    hero: 'books-lamp', heroAlt: 'Books, a pen and a lamp placed before a yellow cloth', te: 'వసంత పంచమి',
    names: 'Also called Sri Panchami and Saraswati Puja. The day for the first letters.',
    dek: 'Yellow clothes, books at the Goddess\'s feet and a child\'s first letters.',
    source: 'Customs differ by region and family.',
    lead: ['A three-year-old sits on her father\'s lap in front of a small plate of rice. His finger holds hers, and together they write the first letters of the alphabet in the grains. That is Aksharabhyasam, and Vasant Panchami is the day most families choose for it.'],
    blocks: [
      { h: 'What the day is', p: ['Vasant Panchami falls on Magha Shukla Panchami, the fifth day of the bright fortnight, when spring begins. It is the day of Saraswati, the goddess of knowledge and the arts. Students, teachers, musicians and writers worship her, and children are introduced to their first letters.'] },
      { h: 'How to keep it', ol: ['Bathe early and wear yellow or white. Yellow is the colour of spring and mustard flowers.', 'Place a picture of Saraswati on a clean cloth, and put your books, pens, instruments and tools in front of her.', 'Offer white or yellow flowers, sweet rice or kesari, and fruit.', 'Light a lamp, and recite the Saraswati stotra or *Ya Kundendu Tusharahara Dhavala*.', 'Many families keep the day light and begin something new: a first page, a first lesson, a first song.', 'If you have a small child, begin the first letters.'] },
      { h: 'Where it is kept', ul: ['**Basar, Telangana:** the Saraswati temple on the Godavari, where thousands of children begin their first letters.', '**Across the South:** schools and colleges hold Saraswati Puja.', '**North and East India:** Saraswati Puja, with kite flying in some places and yellow clothes everywhere.'] },
    ],
    faqs: [
      ['What is Aksharabhyasam?', 'The ceremony of writing a child\'s first letters, usually done at the age of two to five. Vasant Panchami is considered one of the best days for it.'],
      ['Why yellow?', 'Yellow is the colour of the mustard fields and of spring. It is also a colour dear to Saraswati.'],
      ['Can anyone begin learning on this day?', 'Yes. Children, adults, musicians and students all begin something new, a first lesson, a new instrument or a new book, on Vasant Panchami.'],
    ],
    reads: [{ href: '/saraswati-and-the-first-letter-aksharabhyasam-at-home/', label: 'Aksharabhyasam at home' }, { href: '/basar-saraswati-temple-where-telangana-children-write-their-first-letters/', label: 'Basar Saraswati temple' }, { href: '/which-god-to-pray-to-for-exams-and-learning-saraswati-hayagriva/', label: 'Which god to pray to for exams' }],
  },

  'ratha-saptami': {
    hero: 'surya-symbols', heroAlt: 'A chariot of seven horses carrying the Sun', te: 'రథ సప్తమి',
    names: 'Also called Surya Jayanti. The birthday of the Sun.',
    dek: 'Seven horses, arka leaves on the head and a dawn offering of water.',
    source: 'Customs differ by region and family.',
    lead: ['It is still dark. A family stands in the courtyard in wet clothes, each with a few leaves of the arka plant on their head and shoulders. As the Sun clears the horizon, they offer water to him in small brass pots. Some cook sweet rice in an open pot, on a fire of cow-dung cakes, and let the Sun see it.'],
    blocks: [
      { h: 'What the day is', p: ['Ratha Saptami falls on Magha Shukla Saptami. It is the day the Sun god, Surya, is said to have been born, and the day his chariot, drawn by seven horses, begins to turn north. It marks the start of spring in the old calendar, and is dear to Surya devotees.'] },
      { h: 'How to keep it', ol: ['Rise before sunrise. Bathe with arka (calotropis) leaves placed on the head and shoulders, which is a Telugu custom.', 'Draw a chariot with seven horses in rangoli in the yard.', 'Cook sweet rice (payasam) in an open pot, in the sunlight, in a clay pot if you can.', 'Offer water to the Sun at sunrise, facing east, from a copper pot.', 'Recite the Aditya Hridayam or the Surya mantra, and offer the payasam.'] },
      { h: 'Where it is kept', ul: ['**Arasavalli,** Srikakulam, Andhra Pradesh: the ancient Surya temple, where the rays fall on the idol on certain days.', '**Tirumala:** Ratha Saptami is celebrated with the Lord on seven different vahanas in one day.', '**Konark and Modhera:** the great Sun temples of the east and west.'] },
    ],
    faqs: [
      ['Why arka leaves?', 'The arka plant is dear to the Sun in tradition, and bathing with its leaves is believed to bring health. It is a Telugu custom.'],
      ['What is Aditya Hridayam?', 'A hymn to the Sun that the sage Agastya is said to have taught Rama before his battle with Ravana.'],
      ['Is Ratha Saptami the same as Surya Jayanti?', 'Yes, it is called Surya Jayanti in many places.'],
    ],
    reads: [{ href: '/surya-arghya-how-to-offer-water-to-the-sun-at-sunrise/', label: 'Surya arghya: how to offer water to the Sun' }, { href: '/aditya-hridayam-sunday-surya-worship-and-meaning/', label: 'Aditya Hridayam' }, { href: '/surya-namaskar-12-steps-with-mantras/', label: 'Surya Namaskar in 12 steps' }, { href: '/surya-the-sun-in-the-navagrahas-what-he-rules-and-how-to-worship-him/', label: 'Surya in the Navagrahas' }],
  },

  'bhishma-ashtami': {
    hero: 'kurukshetra-dawn', heroAlt: 'A battlefield at dawn with a single bed of arrows', te: 'భీష్మాష్టమి',
    names: 'The day Bhishma left his body, remembered on the eighth day of the bright fortnight of Magha.',
    dek: 'A day for water and sesame in the name of the grandsire.',
    source: 'The story is from the Mahabharata. Customs differ by family.',
    lead: ['In the Mahabharata, the old warrior Bhishma lay on a bed of arrows for fifty-eight days after the war, because he had the boon of choosing his own death. He waited for the Sun to turn north. On the eighth day of the bright fortnight of Magha, he left his body.'],
    blocks: [
      { h: 'The story', p: ['Bhishma, the grandsire of the Kuru family, was struck by arrows from Arjuna on the tenth day of the war. He did not die, because he had the boon of Ichcha Mrityu, death at will. He lay on a bed of arrows, and in those days he taught Yudhishthira about dharma, duty and kingship. The great Vishnu Sahasranama is traditionally said to have come from him in this period. When Uttarayana began, he gave up his body.'] },
      { h: 'How to keep it', ol: ['Bathe early. Many families, even if their own father is living, offer tarpanam to Bhishma on this day, as a tribute to a man who gave up marriage and a throne.', 'Offer water mixed with sesame, from a copper pot, facing south, as in other tarpanam.', 'Read or listen to the Vishnu Sahasranama.', 'Give food or clothes to those who need it.'] },
      { h: 'Why Bhishma is honoured', p: ['Bhishma is remembered for his vow of celibacy and his loyalty to the Kuru throne, and also for the questions the tradition asks about him: was his loyalty always right? Our article on his bed of arrows looks at that.'] },
    ],
    faqs: [
      ['Who can offer tarpanam to Bhishma?', 'In tradition, all householders, whether or not their father is alive, may offer water and sesame to Bhishma on this day.'],
      ['Why is the Vishnu Sahasranama read?', 'Because the Mahabharata says Bhishma taught it to Yudhishthira while he lay on the bed of arrows.'],
      ['Is Bhishma Ashtami an auspicious day?', 'It is a day for remembering and for charity. It is not usually kept as a festival with feasting.'],
    ],
    reads: [{ href: '/bhishma-on-the-bed-of-arrows-what-karma-did-he-carry/', label: 'Bhishma on the bed of arrows: what karma did he carry?' }, { href: '/how-to-honour-ancestors-pitru-mantras-and-family-peace/', label: 'How to honour ancestors' }],
  },

  'maha-shivaratri': {
    hero: 'shiva-symbols', heroAlt: 'A Shiva lingam with bilva leaves, a lamp and water at night', te: 'మహా శివరాత్రి',
    names: 'The great night of Shiva, kept on the Chaturdashi of the dark fortnight of Magha.',
    dek: 'A night awake, water and bilva leaves for the lingam, and five letters repeated until morning.',
    source: 'The stories of the night come from the Puranas. Customs differ by temple, tradition and family.',
    lead: ['It is eleven at night, and the temple is full. The lingam has been bathed in milk and the priests have started the second round of abhishekam. Hundreds of people are standing, sitting, singing, and repeating one mantra: *Om Namah Shivaya*. Most of them have not eaten all day. Most will stay until sunrise.', 'That is Maha Shivaratri, the night when many devotees stay awake in the worship of Shiva. It is not a festival of feasting. It is a night of fasting, silence and attention.'],
    blocks: [
      { h: 'Why this night', p: ['Every month has a Shivaratri on the Chaturdashi of the dark fortnight. The one in Magha is the great one, Maha Shivaratri. The Puranas tell several stories about it: that Shiva danced his cosmic dance on this night, that he married Parvati, or that he appeared as an endless column of fire to settle a dispute between Brahma and Vishnu. All agree that it is a night for Shiva.'] },
      { h: 'How to keep it', ol: ['Take a bath in the morning, and a vow (sankalp) to keep the fast and stay awake.', 'Fast through the day. Many take only water or fruit, and some are fully dry. If you are unwell, elderly or pregnant, a light fast is acceptable.', 'In the evening, bathe again and go to a Shiva temple, or set up the lingam at home.', 'Offer water, milk, curd, honey and ghee in turn. Offer bilva leaves, three-leaved, never torn. Light a lamp.', 'The night is traditionally divided into four prahars, with a puja at each. Many temples hold four abhishekams.', 'Chant *Om Namah Shivaya* all night, or read the Rudram, the Shiva Sahasranama or the Shiva Purana.', 'In the morning, after sunrise, break the fast with a simple meal, and give food to someone.'] },
      { h: 'What to keep ready', ul: ['A lingam or Shiva picture', 'Water, milk, curd, honey and ghee', 'Bilva leaves, flowers, white if possible', 'Lamp, incense, camphor and vibhuti', 'Fruit for breaking the fast'] },
      { h: 'Where it is kept', ul: ['**Srisailam** and **Srikalahasti,** Andhra Pradesh, two of the largest festivals of the night in the Telugu states.', '**Kotappakonda,** Andhra Pradesh, and **Vemulawada** and **Keesaragutta,** Telangana, known for their crowds.', '**Chidambaram, Arunachala and Rameswaram,** Tamil Nadu.', '**Varanasi, Ujjain and the Jyotirlingas** across the country.'] },
    ],
    faqs: [
      ['Is staying awake compulsory?', 'It is the heart of the observance for those who can. If you cannot, remember Shiva before sleeping and keep the fast in your own way.'],
      ['Why bilva leaves?', 'The three-leaved bilva is dear to Shiva in tradition. The leaves should be whole and clean, placed with the smooth side down.'],
      ['What is the Rudram?', 'The great Vedic hymn to Shiva, in two parts, Namakam and Chamakam. Our article explains it in plain words.'],
      ['What is the difference between Shivaratri and Maha Shivaratri?', 'Shivaratri comes every month, on the Chaturdashi of the dark fortnight. Maha Shivaratri is the one in Magha and is the most important.'],
    ],
    reads: [{ href: '/maha-shivaratri-how-to-keep-the-fast-and-the-night-vigil/', label: 'Maha Shivaratri: how to keep the fast and the night vigil' }, { href: '/rudram-and-namakam-what-the-great-hymn-to-shiva-says/', label: 'Rudram and Namakam' }, { href: '/om-namah-shivaya-meaning-of-the-panchakshari-mantra/', label: 'Om Namah Shivaya: meaning' }, { href: '/shiva-lingam-what-it-means-and-how-to-worship-it/', label: 'The Shiva lingam' }],
  },

  'holika-dahan': {
    hero: 'om-lotus', heroAlt: 'A pyre at dusk with a small child and a flame', te: 'హోళికా దహనం',
    names: 'Also called Kama Dahanam in the Telugu states. The bonfire on the evening of Phalguna Pournami.',
    dek: 'A bonfire at dusk, a child saved by his faith and a god of desire turned to ash.',
    source: 'The Prahlada story is in the Puranas. The Kama Dahanam story is in the Shiva Purana tradition. Customs differ by region.',
    lead: ['At dusk, the street gathers round a stack of dry wood and cow-dung cakes. A priest says a few words. The fire is lit, and people walk round it, throwing in grain and coconut. The next morning, the same street will be full of colour. This is the night in between.'],
    blocks: [
      { h: 'The story of Holika', p: ['The demon king Hiranyakashipu could not bear that his young son Prahlada worshipped Vishnu. He tried many ways to kill him. His sister Holika, who had a boon that fire could not harm her, sat in a fire with the boy on her lap. By the story, Prahlada\'s faith saved him and Holika burned. The bonfire recalls this.'] },
      { h: 'Kama Dahanam in the Telugu states', p: ['In the Telugu country the same night is remembered as Kama Dahanam, when Shiva, in deep meditation, opened his third eye and burned Kamadeva, the god of desire, to ashes. Kamadeva was later restored without a body, as Ananga. In some villages a figure of Kama is burned in the fire.'] },
      { h: 'How to keep it', ol: ['Choose a clean open spot. Stack the wood and dry cow-dung cakes, with a small figure or branch at the centre.', 'After sunset, when Pournami is on, offer a lamp, flowers, grain and coconut.', 'Light the fire and walk round it three times, with a prayer for the end of ego and bad habits.', 'Take a little of the ash home, if it is your custom, and apply it as a mark.', 'Share sweets with neighbours.'] },
      { h: 'A note on safety and the environment', p: ['Use only dry wood and dry cakes, never plastic or tyres. Keep children and clothing away from the flames, and have water ready. Many neighbourhoods now share a single community fire to save wood.'] },
    ],
    faqs: [
      ['When is Holika Dahan lit?', 'In the evening, after sunset, on the day the Pournami tithi is present. We give the date. For the exact time, please check with your priest, because some calendars avoid a part of the evening called Bhadra.'],
      ['What is Kama Dahanam?', 'The Telugu name for the night. It remembers Shiva burning Kamadeva.'],
      ['Why do we burn a fire on this night?', 'To recall the victory of faith over cruelty, and to burn away ego and bad habits.'],
    ],
    reads: [{ href: '/shiva-lingam-what-it-means-and-how-to-worship-it/', label: 'The Shiva lingam' }],
  },

  'holi': {
    hero: 'krishna-flute', heroAlt: 'A flute with scattered colour and flowers', te: 'హోలీ',
    names: 'Also called Vasanthotsavam and Dolotsavam. The festival of colours, the day after Holika Dahan.',
    dek: 'Colour, water, sweets and a day when everyone forgives everyone.',
    source: 'Customs differ widely by region.',
    lead: ['One morning every spring, a street that has been polite all year turns into a battlefield of pink and green. Grandmothers are splashed, children laugh, and someone in a white shirt regrets their choices. That is Holi.'],
    blocks: [
      { h: 'What the day is', p: ['Holi falls on the day after Holika Dahan, the beginning of spring. Many people connect the colours with the play of Krishna and Radha in Vrindavan. In the Telugu and Tamil country it is also called Vasanthotsavam or Dolotsavam, the swing festival of spring.'] },
      { h: 'How to keep it', ol: ['Wear old clothes, and put coconut oil on your skin and hair first, so the colour washes off.', 'Use natural colours made from flowers, turmeric or other plants, not chemical dyes.', 'Start with a prayer and a small tilak of colour on the feet of an elder.', 'Play with friends and family, with water and colour. Ask before colouring anyone.', 'Share sweets, such as gujiya, and thandai.', 'Visit relatives and neighbours in the afternoon, and forgive old quarrels.'] },
      { h: 'Play safe', ul: ['Protect eyes, ears and skin, and avoid colouring anyone who does not want it.', 'Choose natural colours, and avoid drinks or snacks that may be unsafe for your health.', 'Keep pets away from colour.'] },
    ],
    faqs: [
      ['Why do we play with colours?', 'Many people connect it with Krishna playing with Radha and the gopis in Vrindavan, and with the joy of spring.'],
      ['What is Dolotsavam?', 'The swing festival. Images of Krishna are placed in a swing and rocked, with songs and colour.'],
      ['What if I do not like to play?', 'Greet people, share sweets, and join in for a short time. Nobody should be forced.'],
    ],
    reads: [{ href: '/radha-and-krishna-what-radha-means-in-the-tradition/', label: 'Radha and Krishna' }],
  },

  'ugadi': {
    hero: 'temple-sunrise', heroAlt: 'Mango leaves on a doorway and a bowl of six-taste pachadi at sunrise', te: 'ఉగాది',
    names: 'The New Year of the Telugu and Kannada calendars, called Gudi Padwa in Maharashtra.',
    dek: 'Six tastes in one bowl, mango leaves at the door and a new year beginning.',
    source: 'Customs differ by region and family.',
    lead: ['The first thing you eat on Ugadi is not breakfast. It is a spoonful of something sweet, sour, bitter, salty, tangy and hot all at once. Ugadi pachadi is the Telugu way to start the year: it is meant to remind you that the year will bring every taste, and that you take each as it comes.'],
    blocks: [
      { h: 'What the day is', p: ['Ugadi falls on Chaitra Shukla Pratipada, the first day of the bright fortnight of Chaitra. It is the New Year for Telugu and Kannada families, and Gudi Padwa in Maharashtra. Each year in the sixty-year cycle has its own name, which is read out with the new year\'s predictions in the panchanga sravanam.'] },
      { h: 'The six tastes of Ugadi pachadi', ul: ['**Neem flowers (bitter):** sadness and hardship', '**Jaggery (sweet):** joy and happiness', '**Raw mango (tangy):** surprise and new things', '**Tamarind (sour):** disgust and challenge', '**Salt:** fear and fortitude', '**Chilli or pepper (hot):** anger'] },
      { h: 'How to keep Ugadi', ol: ['Clean the house and tie fresh mango leaves across the door.', 'Take an oil bath before dawn, and wear new clothes.', 'Make the Ugadi pachadi, offer it to the gods, and eat it first.', 'Visit a temple, or do a puja at home.', 'Listen to the Panchanga Sravanam, the reading of the new year\'s almanac, often at the temple or the community hall.', 'Cook the festival meal, with bobbatlu or holige, and share it with family.'] },
      { h: 'How the day is kept in different places', ul: ['**Telugu states:** Ugadi pachadi, panchanga sravanam and kavi sammelanam, poets\' gatherings.', '**Karnataka:** Bevu-Bella, a mix of neem and jaggery, to remind us of the bitter and the sweet.', '**Maharashtra:** Gudi Padwa, with a gudi, a decorated stick with a cloth, a pot and neem leaves raised outside.'] },
    ],
    faqs: [
      ['What does Ugadi mean?', 'It comes from Yuga and Adi, meaning the beginning of an age or of the year.'],
      ['Why six tastes?', 'They stand for the six feelings of life, and the meal is a reminder to meet all of them with equanimity.'],
      ['Is Ugadi the same as Gudi Padwa?', 'They fall on the same day, but they are the Telugu and Kannada and the Marathi names of the New Year.'],
    ],
    reads: [{ href: '/days-of-the-week-in-telugu-tamil-kannada-malayalam-and-their-gods/', label: 'Days of the week and their gods' }],
  },

  'mesha-sankranti': {
    hero: 'surya-symbols', heroAlt: 'A tray with golden flowers, fruit, rice and a mirror, arranged for Vishu', te: 'మేష సంక్రాంతి',
    names: 'Also Tamil Puthandu, Vishu in Kerala and Baisakhi in Punjab. The Sun enters Mesha (Aries).',
    dek: 'A new year in four languages, all on the same day.',
    source: 'Mesha Sankranti is a solar festival, so its date is fixed by the Sun\'s entry into Mesha. Customs differ by region.',
    lead: ['In Kerala, a child is woken early and led to the prayer room with eyes shut. Inside, a tray has been arranged the night before: golden konna flowers, rice, fruit, a mirror, a coin and a lamp. When she opens her eyes, the first thing she sees is this. That is Vishukkani, "the first sight of the year", and the family believes it sets the tone for the year ahead.'],
    blocks: [
      { h: 'What the day is', p: ['When the Sun enters Mesha, the first sign of the zodiac, it is New Year in many calendars. The date is almost always 14 April. It is called Puthandu in Tamil Nadu, Vishu in Kerala, Pohela Boishakh in Bengal, Bihu in Assam and Baisakhi in Punjab.'] },
      { h: 'How the day is kept', ul: ['**Tamil Nadu:** Puthandu. Kolam at the door, a mango pachadi of sweet, sour and bitter, and a temple visit. The new almanac is read.', '**Kerala:** Vishu. Vishukkani at dawn, Vishu kaineettam (gifts of money to the young), fireworks and a feast called sadya.', '**Punjab:** Baisakhi, the harvest festival, and for Sikhs the day of the founding of the Khalsa.', '**Bengal:** Pohela Boishakh, with new account books and a feast.', '**Assam:** Rongali Bihu.'] },
      { h: 'A simple way to keep it', ol: ['Arrange a Vishukkani tray the night before: rice, fruit, a mirror, a coin, flowers and a lamp.', 'Wake to see it first, if you wish.', 'Make a mango pachadi and a simple festival meal.', 'Give a small gift to the youngest in the home.', 'Visit a temple and pray for the new year.'] },
    ],
    faqs: [
      ['Why is the date fixed?', 'Because it follows the Sun, not the Moon. It almost always falls on 14 April.'],
      ['Is this the same as Ugadi?', 'No. Ugadi follows the lunar calendar and falls in March or April on a date that changes. Mesha Sankranti follows the Sun.'],
      ['What is Vishukkani?', 'The first sight of the Vishu morning: a tray of auspicious things arranged for the family to see first.'],
    ],
    reads: [],
  },

  'rama-navami': {
    hero: 'rama-symbols', heroAlt: 'A bow, a lamp and a bowl of panakam before a shrine of Rama', te: 'శ్రీరామ నవమి',
    names: 'The birth of Sri Rama, said to have been at midday on the ninth day of the bright fortnight of Chaitra.',
    dek: 'A cool drink, a divine wedding and a story every home knows.',
    source: 'The story is from the Valmiki Ramayana. Customs differ by region and temple.',
    lead: ['At Bhadrachalam, on the banks of the Godavari, the wedding of Sita and Rama is celebrated every year on this day, in front of thousands. The bride and groom are the temple\'s idols, and the pilgrims are the guests. Somewhere in the crowd, a child asks why the deity is being married when he was only born today. The answer is that for Rama\'s devotees, every part of his story is a festival.'],
    blocks: [
      { h: 'What the day is', p: ['Rama Navami falls on Chaitra Shukla Navami. By tradition, Rama was born at midday to King Dasharatha and Queen Kausalya in Ayodhya. In many places the day also marks the wedding of Rama and Sita, so that the same day holds both a birth and a Kalyanam.'] },
      { h: 'How to keep it', ol: ['Bathe early, fast until midday, and set up a picture of Rama, Sita, Lakshmana and Hanuman.', 'Offer flowers, tulasi, and fruit. In the Telugu states, offer **panakam**, a drink of jaggery and pepper, and **vadapappu**, soaked moong dal.', 'Recite the Rama Raksha Stotram, read a chapter of the Ramayana or the Sundara Kanda, or sing bhajans.', 'At midday, do a short aarti to mark the birth.', 'Many homes and temples hold a Sita Rama Kalyanam in the afternoon.', 'Share the prasad with everyone.'] },
      { h: 'Where it is kept', ul: ['**Bhadrachalam,** Telangana: the great Sri Rama Navami Kalyanam on the Godavari.', '**Ayodhya,** Uttar Pradesh: the birthplace, with the largest celebration in the North.', '**Rameswaram, Vontimitta and Bhadrachalam** in the South hold major festivals.'] },
    ],
    faqs: [
      ['Why is panakam offered?', 'It is a cooling drink of jaggery and pepper, and it marks the heat of Chaitra. It is a Telugu and Tamil custom.'],
      ['Why is Rama\'s wedding celebrated on his birthday?', 'In many temples, especially in the Telugu states, the Kalyanam is celebrated on Rama Navami itself.'],
      ['Should I fast?', 'Many devotees fast until midday. If you are unwell, a light meal is fine.'],
    ],
    reads: [{ href: '/bhadrachalam-sri-rama-navami-kalyanam-and-the-story-of-ramadasu/', label: 'Bhadrachalam: Rama Navami and the story of Ramadasu' }, { href: '/why-rama-is-called-maryada-purushottam/', label: 'Why Rama is called Maryada Purushottam' }, { href: '/sundara-kanda-why-people-read-it-in-hard-times-and-how/', label: 'Sundara Kanda' }, { href: '/rameswaram-ramanathaswamy-temple-where-rama-prayed-to-shiva/', label: 'Rameswaram' }],
  },

  'hanuman-jayanti-chaitra': {
    hero: 'hanuman-symbols', heroAlt: 'A Hanuman figure with a mace and a garland of red flowers', te: 'హనుమాన్ జయంతి',
    names: 'As kept in North India and Maharashtra, on Chaitra Pournami. Other regions keep it on other days.',
    dek: 'Sindoor, red flowers and the Chalisa, one of the three Hanuman Jayantis.',
    source: 'Different regions keep Hanuman Jayanti on different days. None is in the Valmiki Ramayana as a dated feast.',
    lead: ['Hanuman Jayanti is kept on more than one day. Many North Indian and Maharashtra families keep it on Chaitra Pournami. Telugu families keep it on Vaishakha Krishna Dashami, and Tamil families in the month of Margazhi with the Moola star. This page is for the Chaitra Pournami day.'],
    blocks: [
      { h: 'How to keep it', ol: ['Rise early, bathe and wear red or saffron.', 'Offer sindoor mixed with oil, red flowers and a garland of vada or laddus.', 'Recite the Hanuman Chalisa, or read the Sundara Kanda.', 'Light a lamp of sesame or ghee.', 'Visit a Hanuman temple, and share the prasad.'] },
      { h: 'Why three dates?', p: ['Different regional traditions place Hanuman\'s birth on different days, according to the local almanacs and the stories handed down. None is wrong. Our article explains each.'] },
    ],
    faqs: [
      ['Which Hanuman Jayanti is the right one?', 'All are kept sincerely. Follow your own region and family.'],
      ['Why sindoor?', 'A story says Hanuman once saw Sita apply sindoor to her hair for Rama\'s long life, and he covered his whole body with it.'],
    ],
    reads: [{ href: '/why-hanuman-jayanti-is-on-two-dates/', label: 'Why Hanuman Jayanti is on two dates' }, { href: '/hanuman-chalisa-meaning-first-five-verses/', label: 'Hanuman Chalisa: first five verses' }, { href: '/hanuman-birth-strength-and-devotion-the-stories/', label: 'Hanuman: birth, strength and devotion' }],
  },
};
