// Full page text for festivals from Bhadrapada to Ashwayuja. No years in this text: dates come from the sky.
import type { FestContent } from './festival-content';

export const FEST_AUTUMN: Record<string, FestContent> = {
  'vinayaka-chaturthi': {
    hero: 'ganesha-symbols', heroAlt: 'A clay Ganesha with modaks, durva grass and a lamp', te: 'వినాయక చవితి',
    names: 'Also called Ganesh Chaturthi. The birthday of Ganesha, on the fourth day of the bright fortnight of Bhadrapada.',
    dek: 'A clay god at home, twenty-one leaves, modaks, and a goodbye in water.',
    source: 'Customs differ by region and family.',
    lead: ['A small boy carries a clay idol home, held in both hands like a bird. His mother has already made the rangoli and cleaned the puja room. For the next few days, there will be a new member of the household, a round-bellied one, who eats a lot of sweets and asks for nothing else.'],
    blocks: [
      { h: 'What the day is', p: ['Vinayaka Chaturthi falls on Bhadrapada Shukla Chaturthi. It is the day Ganesha, the remover of obstacles, is said to have been born to Shiva and Parvati. Clay idols are installed in homes and public pandals, worshipped for one, three, five, seven, nine or eleven days, and then immersed in water.'] },
      { h: 'How to keep it', ol: ['Choose a clay (mud) idol. It dissolves in water without harm to the environment.', 'Bathe early and set up the idol on a clean platform with a cloth and a rangoli.', 'Do the pranapratishtha, the invocation of life, and the sixteen upacharas of the puja.', 'Offer **21 durva blades** and **21 types of leaves (patri)**, flowers, modaks and fruit.', 'Recite the Ganapati Atharvashirsha or the Vinayaka stotra, and do an aarti.', 'Share the prasad, and light a lamp every morning and evening while the idol is at home.', 'On the day of immersion, say goodbye with a prayer and immerse the idol in water, ideally a bucket or tank at home.'] },
      { h: 'What to keep ready', ul: ['A clay Ganesha idol', '21 durva blades and a variety of leaves and flowers', 'Modak, laddu, coconut and fruit', 'Turmeric, kumkum, rice, incense, camphor and a lamp', 'A clean platform with a cloth and a rangoli'] },
      { h: 'Where it is celebrated', ul: ['**Hyderabad:** the Khairatabad Ganesh, with one of the tallest idols, and the Hussain Sagar immersions.', '**Maharashtra:** Lalbaug and the public Ganeshotsav begun by Lokmanya Tilak.', '**Tamil Nadu and Karnataka:** Pillaiyar Chaturthi, with kozhukattai, and Ganesha Habba.', '**Kanipakam,** Andhra Pradesh, a famous Ganesha temple.'] },
    ],
    faqs: [
      ['Why a clay idol?', 'It is traditional, and it dissolves in water without chemicals. Plaster and paint harm lakes and rivers.'],
      ['Why 21?', 'Twenty-one durva blades and 21 types of leaves are the traditional offering. Many families also offer 21 modaks.'],
      ['What is a modak?', 'A sweet dumpling of rice flour with a coconut and jaggery filling, believed to be Ganesha\'s favourite.'],
      ['How long should the idol stay?', 'It can stay for one and a half, three, five, seven, nine or eleven days, according to the family\'s custom.'],
    ],
    reads: [{ href: '/ganesh-chaturthi-puja-at-home-step-by-step/', label: 'Ganesh Chaturthi puja at home, step by step' }, { href: '/why-ganesha-has-an-elephant-head-the-puranic-stories/', label: 'Why Ganesha has an elephant head' }, { href: '/why-ganesha-is-worshipped-first/', label: 'Why Ganesha is worshipped first' }, { href: '/ganapati-atharvashirsha-the-upanishad-of-ganesha/', label: 'Ganapati Atharvashirsha' }, { href: '/kanipakam-vinayaka-the-temple-where-people-take-oaths/', label: 'Kanipakam Vinayaka' }],
  },

  'anant-chaturdashi': {
    hero: 'vishnu-symbols', heroAlt: 'A thread with fourteen knots beside a lamp and a small idol', te: 'అనంత చతుర్దశి',
    names: 'Also called Ganesh Visarjan. The fourteenth day of the bright fortnight of Bhadrapada.',
    dek: 'A thread of fourteen knots and the last, loudest goodbye to Ganesha.',
    source: 'Customs differ by region and family.',
    lead: ['For many Ganeshotsav pandals, this is the last day. The idol is taken out in a long procession with drums, singing and dancing, to be immersed. For many families, it is also a day of a quieter ritual: a yellow thread with fourteen knots tied on the wrist, in the name of Vishnu as Ananta.'],
    blocks: [
      { h: 'What the day is', p: ['Ananta Chaturdashi falls on Bhadrapada Shukla Chaturdashi. It is a day of Vishnu as Ananta, the endless one, and in many places, the last day of Ganeshotsav, when idols are immersed.'] },
      { h: 'Ananta Vratam', ol: ['Take a bath and place a picture of Vishnu as Ananta, resting on the coils of Shesha.', 'Prepare a thread with fourteen knots, dyed with turmeric.', 'Do the puja and tie the thread on the right wrist (for men) or left wrist (for women).', 'Read the Ananta Vrata Katha.', 'Many families keep it for fourteen years, according to the vow.'] },
      { h: 'Ganesh Visarjan', ul: ['Immerse the idol with a prayer, asking Ganesha to return next year.', 'Prefer a home tank or bucket, or designated immersion tanks, over lakes and rivers.', '**Hyderabad:** the Hussain Sagar immersion procession is among the biggest in the country.'] },
    ],
    faqs: [
      ['Why fourteen knots?', 'Fourteen stands for the fourteen worlds in the tradition.'],
      ['Is Ganesh Visarjan only on this day?', 'No. Idols may be immersed on the first, third, fifth, seventh, ninth or eleventh day. Ananta Chaturdashi, the eleventh day, is the last.'],
    ],
    reads: [{ href: '/ganesh-chaturthi-puja-at-home-step-by-step/', label: 'Ganesh Chaturthi puja at home' }],
  },

  'pitru-paksha': {
    hero: 'om-lotus', heroAlt: 'Water, sesame and kusha grass in a copper vessel', te: 'పితృ పక్షం',
    names: 'Also called Mahalaya Paksham. The fortnight of the ancestors, from Bhadrapada Pournami to the new moon.',
    dek: 'Fifteen days to remember the ones who came before you.',
    source: 'Customs differ by family and region. For the rites, please follow your own priest or elders.',
    lead: ['For fifteen days every year, families set a place for people who are not at the table. They offer water, sesame and a meal in the name of those who have died: a father, a grandmother, an uncle, a teacher. This fortnight is Pitru Paksha.'],
    blocks: [
      { h: 'What the fortnight is', p: ['Pitru Paksha is the dark fortnight of Bhadrapada, from the day after Pournami to the new moon (Mahalaya Amavasya). Each day is linked to a death tithi. A family performs the shraddha for a parent or ancestor on the tithi of their death. If the tithi is unknown, the last day, Sarva Pitru Amavasya, is kept for all.'] },
      { h: 'How families keep it', ol: ['Find the tithi of your ancestor\'s death, and plan the shraddha for that day in the fortnight.', 'Bathe, and, with a ring of kusha grass on the finger, offer water mixed with black sesame (tarpanam).', 'Make a simple meal of the dishes your ancestor loved, and offer it. Many families set aside a portion for crows, a cow and a dog.', 'Feed a Brahmin, a priest or those in need.', 'Give: food, clothes or grain, in the ancestor\'s name.'] },
      { h: 'What many avoid in this fortnight', ul: ['Starting new ventures or celebrations', 'Buying gold, a vehicle or new clothes', 'Cutting hair or nails on the shraddha day', 'Non-vegetarian food during the shraddha'] },
    ],
    faqs: [
      ['What if I do not know the tithi?', 'Offer on Sarva Pitru Amavasya, the last day, which is for all ancestors.'],
      ['Is Pitru Paksha inauspicious?', 'It is a period of remembrance, not of celebration. Many avoid new beginnings, but it is not a time of fear.'],
      ['Who performs the shraddha?', 'Tradition says the eldest son or a male relative. Many modern families, including daughters, perform it. Please follow your family\'s custom.'],
    ],
    reads: [{ href: '/how-to-honour-ancestors-pitru-mantras-and-family-peace/', label: 'How to honour ancestors' }],
  },

  'mahalaya-amavasya': {
    hero: 'om-lotus', heroAlt: 'A lamp, water, sesame and a plate of rice offered at dawn', te: 'మహాలయ అమావాస్య',
    names: 'Also Sarva Pitru Amavasya. The last day of Pitru Paksha and the day for all ancestors.',
    dek: 'The day for every ancestor, known or unknown, and, in Bengal, the first call to Durga.',
    source: 'Customs differ by family and region. For the rites, please follow your own priest or elders.',
    lead: ['Among all the new moons of the year, this is the one that is kept for everyone. On Mahalaya Amavasya, families offer water and food to all ancestors, including those whose date of death is not known.'],
    blocks: [
      { h: 'What the day is', p: ['Mahalaya Amavasya is the last day of Pitru Paksha, on the Amavasya of Bhadrapada. It is the great day for tarpanam. If a family missed the tithi of an ancestor\'s death, this is the day they can offer to them.'] },
      { h: 'How to keep it', ol: ['Bathe early, and offer water with black sesame to the ancestors, as your family does it.', 'Make a simple meal, offer it, and set aside some for crows, a cow and a dog.', 'Feed someone in need, and give grain, clothes or a gift in the ancestors\' name.', 'Light a lamp at the entrance in the evening.'] },
      { h: 'Mahalaya in Bengal', p: ['In Bengal, Mahalaya is the day the invocation of Durga begins. Before dawn, families listen to the Chandi recital, and a new idol is given its eyes. It opens the festival of Durga Puja.'] },
      { h: 'In the Telugu states', p: ['In Telangana, Mahalaya Amavasya is the day the festival of flowers, Bathukamma, begins.'] },
    ],
    faqs: [
      ['Why is it called Sarva Pitru Amavasya?', 'Because it is for all ancestors, known and unknown.'],
      ['Can women offer tarpanam?', 'In many families, yes. Customs differ. Please follow your own.'],
    ],
    reads: [{ href: '/how-to-honour-ancestors-pitru-mantras-and-family-peace/', label: 'How to honour ancestors' }, { href: '/navadurga-the-nine-forms-of-the-goddess-and-their-days/', label: 'Navadurga' }],
  },

  'navaratri-begins': {
    hero: 'devi-symbols', heroAlt: 'A kalasha with mango leaves, nine lamps and red flowers', te: 'దసరా నవరాత్రులు',
    names: 'Also called Dasara Navaratrulu. Nine nights of the Goddess, from Ashwayuja Shukla Pratipada.',
    dek: 'Nine nights, nine forms of the Goddess and a house full of dolls.',
    source: 'Customs differ by region and family.',
    lead: ['For nine nights, the city changes. Temples glow with lights. In Tamil homes, tiers of dolls are arranged on steps, and visitors are invited to see them. In Telangana, women arrange heaps of flowers in towers and dance around them. In Mysuru, the Dasara procession is days away. They are all the same festival.'],
    blocks: [
      { h: 'What it is', p: ['Navaratri begins on Ashwayuja Shukla Pratipada and lasts nine nights, ending with Vijayadashami on the tenth day. It is dedicated to the Goddess in her many forms: Durga, Lakshmi and Saraswati, commonly worshipped in three groups of three nights, and the nine forms of Navadurga.'] },
      { h: 'The Navadurga', ul: ['Day 1: Shailaputri', 'Day 2: Brahmacharini', 'Day 3: Chandraghanta', 'Day 4: Kushmanda', 'Day 5: Skandamata', 'Day 6: Katyayani', 'Day 7: Kalaratri', 'Day 8: Mahagauri', 'Day 9: Siddhidatri'] },
      { h: 'How to keep it', ol: ['On the first day, set up a kalasha with water, a coconut and mango leaves, and sow a few grains in a tray (a custom in some homes).', 'Light a lamp that burns through the nine days if you can.', 'Do a simple puja each day, with flowers, kumkum and a recitation of the Lalita Sahasranama, the Durga Saptashati or a stotra.', 'Many fast, or eat a simple vegetarian diet, for the nine days.', 'On the eighth and ninth days, kanya puja is done in some homes, with young girls honoured as the Goddess.', 'On the tenth day, Vijayadashami, the festival ends.'] },
      { h: 'How the nine nights are kept in different places', ul: ['**Telangana and Andhra Pradesh:** Bathukamma, the festival of flowers, and Dasara Navaratrulu at Vijayawada\'s Kanaka Durga temple.', '**Tamil Nadu and Karnataka:** Golu (Kolu) dolls arranged on steps, and the Mysuru Dasara.', '**Bengal:** Durga Puja.', '**Gujarat:** Garba and Dandiya every night.', '**Kerala:** Saraswati Puja on the last days, with books placed before the Goddess.'] },
    ],
    faqs: [
      ['What is Golu?', 'A display of dolls on steps, kept in Tamil and Karnataka homes for Navaratri, with stories told through the figures.'],
      ['What is Bathukamma?', 'A festival of flowers in Telangana in which women arrange flowers in a tall conical stack and dance around it.'],
      ['Should I fast for all nine days?', 'Many do, but a lighter fast or a vegetarian diet is fine. Please look after your health.'],
    ],
    reads: [{ href: '/navadurga-the-nine-forms-of-the-goddess-and-their-days/', label: 'Navadurga: the nine forms of the Goddess' }, { href: '/durga-saptashati-what-it-is-and-how-to-read-it/', label: 'Durga Saptashati' }, { href: '/kanaka-durga-of-vijayawada-the-goddess-on-the-hill-of-indra/', label: 'Kanaka Durga of Vijayawada' }, { href: '/chamundeshwari-of-mysuru-the-goddess-who-gave-the-city-its-name/', label: 'Chamundeshwari of Mysuru' }],
  },

  'durgashtami': {
    hero: 'devi-symbols', heroAlt: 'A lion, a trident and red hibiscus flowers', te: 'దుర్గాష్టమి',
    names: 'Also called Maha Ashtami. The eighth day of Navaratri, the great day of Durga.',
    dek: 'Weapons, flowers and the day the Goddess meets the buffalo demon.',
    source: 'Customs differ by region and family.',
    lead: ['By the eighth day, a Navaratri house is tired and happy. The Goddess has been worshipped for seven days and tonight, tradition says, she fights her great battle.'],
    blocks: [
      { h: 'What the day is', p: ['Durgashtami is the eighth day of Navaratri. It is said to be the day Durga fought the buffalo demon Mahishasura, in the Devi Mahatmya. In Bengal it is the central day of Durga Puja, and in Telangana it is Saddula Bathukamma, the great day of the flower festival.'] },
      { h: 'How to keep it', ol: ['Bathe early, wear red or new clothes, and decorate the shrine with red flowers.', 'Do a long puja to Durga, with the Durga Saptashati or the Lalita Sahasranama.', 'Perform Kanya Puja, honouring young girls as the Goddess, offering them food, a gift and a tilak.', 'In the evening, light lamps and sing devotional songs.', 'Many keep a fast, and break it after the evening puja.'] },
      { h: 'In different places', ul: ['**Bengal:** Sandhi Puja at the junction of Ashtami and Navami, with 108 lamps.', '**Telangana:** Saddula Bathukamma, with the largest flower stacks and the immersion in lakes.', '**Mysuru and Vijayawada:** large temple festivals.'] },
    ],
    faqs: [
      ['What is Kanya Puja?', 'Worship of young girls as forms of the Goddess, on Ashtami or Navami. They are fed, honoured and given gifts.'],
      ['What is Sandhi Puja?', 'A special puja at the moment when Ashtami ends and Navami begins, held in Bengal.'],
    ],
    reads: [{ href: '/durga-saptashati-what-it-is-and-how-to-read-it/', label: 'Durga Saptashati' }, { href: '/navadurga-the-nine-forms-of-the-goddess-and-their-days/', label: 'Navadurga' }],
  },

  'maha-navami': {
    hero: 'devi-symbols', heroAlt: 'Books, tools and tiny vehicles decorated with flowers and sandal', te: 'మహా నవమి',
    names: 'Also called Ayudha Puja. The ninth day of Navaratri, when the tools of life are worshipped.',
    dek: 'Pens, machines, vehicles and books, all worshipped for one day.',
    source: 'Customs differ by region and family.',
    lead: ['On this day, the tools of a person\'s work are cleaned, decorated and worshipped. A student\'s books, a driver\'s lorry, an accountant\'s ledger, a carpenter\'s saw. They are all given a tilak, flowers and a small offering, and for a day they rest.'],
    blocks: [
      { h: 'What the day is', p: ['Maha Navami is the ninth day of Navaratri. It is the day of Siddhidatri, the ninth form of Durga, and of Ayudha Puja in the South, when weapons and tools are worshipped as symbols of skill and livelihood.'] },
      { h: 'How to keep it', ol: ['Clean your tools, books, vehicles or machines.', 'Decorate them with sandalwood paste, turmeric, kumkum and flowers.', 'Do a short puja with a lamp and incense, and offer fruit and sweets.', 'Let the tools rest for the day, and do not use them for work if possible.', 'In many homes, books are placed before the Goddess Saraswati, and students do not study. The next day, Vijayadashami, is when learning begins again.'] },
    ],
    faqs: [
      ['Why worship tools?', 'It is a way of thanking the things that give us a living, and of remembering that skill is a gift.'],
      ['What is Saraswati Puja on Navami?', 'In Tamil Nadu, Karnataka and Kerala, books are placed before Saraswati on this day, and the next day begins study again.'],
    ],
    reads: [{ href: '/navadurga-the-nine-forms-of-the-goddess-and-their-days/', label: 'Navadurga' }, { href: '/saraswati-and-the-first-letter-aksharabhyasam-at-home/', label: 'Aksharabhyasam at home' }],
  },

  'vijayadashami': {
    hero: 'rama-symbols', heroAlt: 'A bow and arrow before a tall burning effigy, and a shami tree at dusk', te: 'విజయదశమి',
    names: 'Also called Dasara. The tenth day, ending Navaratri, when good wins.',
    dek: 'A day of beginnings: new books, new work and the first letters.',
    source: 'Customs differ by region and family.',
    lead: ['At the end of nine nights, a day arrives that is meant for starting. Children write their first letters in rice. Musicians begin a new raga. Farmers begin sowing. Families bring out their finest clothes and visit each other.'],
    blocks: [
      { h: 'What the day is', p: ['Vijayadashami falls on the tenth day of the bright fortnight of Ashwayuja. It marks the victory of Durga over Mahishasura, and, in the North, of Rama over Ravana. It is considered one of the most auspicious days of the year, needing no separate muhurtham.'] },
      { h: 'Why it is a day of beginnings', ul: ['**Rama and Ravana:** in North India, giant effigies of Ravana are burned at dusk.', '**Durga and Mahishasura:** the Goddess\'s victory, remembered in the South and East.', '**The Pandavas and the shami tree:** the Mahabharata says they hid their weapons in a shami tree during their exile, and took them back on this day. In the Telugu states people worship the shami (jammi) tree, and exchange its leaves as a sign of goodwill.'] },
      { h: 'How to keep it', ol: ['Bathe early and wear new clothes.', 'Do a simple puja to Durga, Saraswati and the tools of your work.', 'Begin something new: a first lesson, a new book, a new instrument, a new venture.', 'In the Telugu states, visit a shami (jammi) tree in the evening, say a prayer and exchange leaves. Seeing a pala pitta (Indian roller bird) is considered auspicious.', 'In Kerala, begin a child\'s first letters (Vidyarambham).', 'Share sweets and visit elders.'] },
      { h: 'Where it is kept', ul: ['**Mysuru,** Karnataka: the grand Dasara procession, Jamboo Savari, with a decorated elephant.', '**Kullu,** Himachal Pradesh and **Delhi:** Ravana effigies.', '**Vijayawada and Bhadrachalam:** major temple festivals.', '**Kolkata:** Durga idols are immersed (Bijoya Dashami).'] },
    ],
    faqs: [
      ['Why is it called Vijayadashami?', 'Vijaya means victory, and Dashami means the tenth. It is the tenth day of victory.'],
      ['What is Vidyarambham?', 'The beginning of a child\'s learning, with first letters written in rice or sand. It is done in Kerala and many other places on Vijayadashami.'],
      ['Why shami leaves?', 'Because of the Pandavas story. The leaves are called "gold", and are exchanged as a wish for prosperity.'],
    ],
    reads: [{ href: '/saraswati-and-the-first-letter-aksharabhyasam-at-home/', label: 'Aksharabhyasam at home' }, { href: '/navadurga-the-nine-forms-of-the-goddess-and-their-days/', label: 'Navadurga' }, { href: '/why-rama-is-called-maryada-purushottam/', label: 'Why Rama is called Maryada Purushottam' }],
  },

  'sharad-purnima': {
    hero: 'moon-nakshatra', heroAlt: 'A full moon over a bowl of milk and rice', te: 'శరద్ పూర్ణిమ',
    names: 'Also called Kojagara Pournami and Ashwayuja Pournami. The brightest full moon of the year.',
    dek: 'Sweet rice in the moonlight, and the night Lakshmi is said to walk the earth.',
    source: 'Customs differ by region and family.',
    lead: ['On this night, many families leave a bowl of sweet milk and rice out under the full moon. In the morning, they eat it. The moon, tradition says, is at its fullest and coolest, and its light is believed to carry something healing.'],
    blocks: [
      { h: 'What the day is', p: ['Sharad Purnima falls on Ashwayuja Pournami, at the end of the monsoon. It is called Kojagara in Bengal and Odisha, from "Ko jagarti?", "who is awake?", the question Lakshmi is said to ask as she walks the earth that night. It is also the night of Krishna\'s Raas Leela, in the Bhagavata tradition.'] },
      { h: 'The moonlit night and the daytime vratam', p: ['The night of Sharad Purnima is the night when the full moon rises on the day the Pournami tithi covers moonrise. Daytime Pournami vratams, such as the Satyanarayana puja, are usually kept on the day when Pournami is present at sunrise. When the tithi spans two days these can be different days. Some temples and families follow one rule and some the other, so check with yours. Our Pournami page for the month gives the tithi start and end.'] },
      { h: 'How to keep it', ol: ['Bathe, and keep a light fast through the day, if you can.', 'In the evening, worship Lakshmi, with a lamp, flowers and sweets.', 'Make kheer (rice cooked in milk with sugar and cardamom).', 'Place the kheer in a clean vessel in the moonlight for some hours.', 'Offer a portion to Lakshmi, and eat the rest as prasad.', 'Stay awake in the evening if you can, singing or listening to devotional songs.'] },
    ],
    faqs: [
      ['What else is Sharad Purnima known as?', 'Raas Purnima in the Vaishnava tradition, the night of Krishna\'s Raas with the gopis. Many calendars also keep the birth anniversary of the sage Valmiki, author of the Ramayana, on this Purnima. In parts of Odisha and Karnataka, unmarried girls worship the Moon on this day as Kumara Purnima.'],
      ['How should the kheer be kept in the moonlight?', 'Keep the vessel covered with a thin cloth against insects, and eat it the next morning as prasad.'],
      ['Why kheer in the moonlight?', 'It is a custom linked to the belief that the Moon\'s light on this night carries healing and nourishment.'],
      ['What is Kojagara?', 'The name in the East, from Lakshmi\'s question "Who is awake?". Those who stay awake and worship her are said to be blessed.'],
    ],
    reads: [{ href: '/festivals/sharad-purnima/', label: 'Sharad Purnima: timings and Kojagari Lakshmi Puja' }, { href: '/friday-lakshmi-worship-mantras-and-how-to-do-it/', label: 'Friday Lakshmi worship' }],
  },

  'dhanteras': {
    days: { title: 'Deepavali day by day', what: { 'dhanteras': 'Lakshmi, Kubera and Dhanvantari. Buy something small and new, and light a lamp for Yama at dusk.', 'naraka-chaturdashi': 'The oil bath before sunrise, new clothes and lamps.', 'deepavali': 'Lakshmi Puja on the evening of the new moon, and rows of lamps.', 'govardhan-puja': 'Govardhan Puja, Annakut and Bali Padyami. Karthika Masam begins.', 'bhai-dooj': 'Sisters apply a tilak to their brothers and feed them.' } },
    hero: 'om-lotus', heroAlt: 'A brass pot, a small lamp and new utensils', te: 'ధన త్రయోదశి',
    names: 'Also called Dhanatrayodashi. The first day of Deepavali, on the thirteenth day of the dark fortnight of Ashwayuja.',
    dek: 'A new utensil, a lamp for Yama and the birthday of Dhanvantari.',
    source: 'Customs differ by region and family.',
    lead: ['Shops stay open late on this day, and metal utensils and gold jewellery sell fast. The idea, as the tradition has it, is simple: the festival of lights begins with welcoming prosperity into the house, in a small, practical way.'],
    blocks: [
      { h: 'What the day is', p: ['Dhanteras falls on Ashwayuja Krishna Trayodashi, two days before Deepavali. It is the day Dhanvantari, the physician of the gods, is said to have emerged from the churning of the ocean with a pot of nectar. It is also a day for Lakshmi and Kubera, the god of wealth.'] },
      { h: 'How to keep it', ol: ['Clean the house, and draw a rangoli at the door.', 'Buy something small and new: a metal utensil, a coin, or a broom. Gold and silver are traditional, but a small, useful item is just as auspicious.', 'In the evening, light a lamp and do a puja to Lakshmi, Kubera and Dhanvantari.', 'At dusk, light a lamp facing south at the doorstep for Yama (Yama Deepam), to ward off untimely death.', 'Many keep the lamp lit through the night.'] },
    ],
    faqs: [
      ['What is Yama Deepam?', 'A lamp lit at dusk on this day, facing south, in memory of a story of a prince saved from death by his wife. Our article tells it.'],
      ['Do I have to buy gold?', 'No. Anything small and new is enough.'],
      ['Who is Dhanvantari?', 'The physician of the gods, worshipped for health. Many doctors and Ayurveda practitioners honour him on this day.'],
    ],
    reads: [{ href: '/yama-deepam-the-prince-who-was-to-die-on-the-fourth-night/', label: 'Yama Deepam: the prince who was to die on the fourth night' }, { href: '/which-god-to-pray-to-for-health-and-recovery-dhanvantari-and-shiva/', label: 'Which god to pray to for health' }, { href: '/festivals/deepavali/', label: 'Deepavali, day by day' }],
  },

  'naraka-chaturdashi': {
    days: { title: 'Deepavali day by day', what: { 'dhanteras': 'Lakshmi, Kubera and Dhanvantari. Buy something small and new, and light a lamp for Yama at dusk.', 'naraka-chaturdashi': 'The oil bath before sunrise, new clothes and lamps.', 'deepavali': 'Lakshmi Puja on the evening of the new moon, and rows of lamps.', 'govardhan-puja': 'Govardhan Puja, Annakut and Bali Padyami. Karthika Masam begins.', 'bhai-dooj': 'Sisters apply a tilak to their brothers and feed them.' } },
    hero: 'krishna-flute', heroAlt: 'Lamps at dawn, a brass pot of oil and a bar of soap', te: 'నరక చతుర్దశి',
    names: 'Also called Choti Diwali. The day before Deepavali, with an oil bath before dawn.',
    dek: 'An oil bath at four in the morning, and a story of a demon who asked for a festival.',
    source: 'The story of Narakasura is from the Puranas. Customs differ by region and family.',
    lead: ['In many Tamil and Telugu homes, someone gets up at four in the morning. A lamp is lit, and each person gets a dab of oil on the head, and is told to bathe. It is the Abhyanga Snanam, the sacred oil bath of Naraka Chaturdashi, and it is the Deepavali morning for many South Indian families.'],
    blocks: [
      { h: 'The story', p: ['The demon Narakasura had terrorised the world. Krishna, with his wife Satyabhama, fought and killed him on this day. As he died, Narakasura asked for one boon: that his death be celebrated with lights. That is the origin of the festival, in the tradition.'] },
      { h: 'How to keep it', ol: ['Rise before sunrise. Apply sesame oil to the body, and bathe with a paste or a bar of soap.', 'Light a lamp, and put on new clothes.', 'Do a short puja to Krishna and Lakshmi.', 'Share sweets and visit family.', 'Light lamps at dusk. In the Telugu states and Tamil Nadu this is often the main Deepavali morning.'] },
    ],
    faqs: [
      ['Why an oil bath?', 'It is said to remove the dirt of the old year and prepare for Lakshmi\'s visit. It is also considered good for health.'],
      ['Why is it called Choti Diwali?', 'In the North it is the "little Diwali", the day before the main Lakshmi Puja.'],
    ],
    reads: [{ href: '/naraka-chaturdashi-satyabhama-and-the-oil-bath-before-dawn/', label: 'Naraka Chaturdashi: Satyabhama and the oil bath before dawn' }, { href: '/festivals/deepavali/', label: 'Deepavali, day by day' }],
  },

  'deepavali': {
    days: { title: 'Deepavali day by day', what: { 'dhanteras': 'Lakshmi, Kubera and Dhanvantari. Buy something small and new, and light a lamp for Yama at dusk.', 'naraka-chaturdashi': 'The oil bath before sunrise, new clothes and lamps.', 'deepavali': 'Lakshmi Puja on the evening of the new moon, and rows of lamps.', 'govardhan-puja': 'Govardhan Puja, Annakut and Bali Padyami. Karthika Masam begins.', 'bhai-dooj': 'Sisters apply a tilak to their brothers and feed them.' } },
    hero: 'om-lotus', heroAlt: 'A row of oil lamps, a rangoli and a brass Lakshmi', te: 'దీపావళి',
    names: 'Also called Diwali and Lakshmi Puja. The festival of lights, on the new moon of Ashwayuja.',
    dek: 'A row of lamps, a clean house and Lakshmi welcomed in.',
    source: 'Customs differ by region and family.',
    lead: ['By the time the evening comes, the house is clean, the doorstep is wet with rangoli, and a hundred small lamps are lit along the walls. The family sits together, and someone rings a bell. Lakshmi is invited in.'],
    blocks: [
      { h: 'What the day is', p: ['Deepavali is the new moon of Ashwayuja, the darkest night of the month. In most of India the Lakshmi Puja is done in the evening. It marks Rama\'s return to Ayodhya in the North, Krishna\'s victory over Narakasura in the South, and the victory of light over dark everywhere.'] },
      { h: 'How to keep it', ol: ['Clean the home and decorate the doorstep with rangoli and flowers.', 'Take an oil bath in the morning, and put on new clothes.', 'In the evening, set up the Lakshmi puja, with a picture or idol, a kalasha, flowers, fruit and sweets.', 'Light rows of lamps at the door, windows and balcony.', 'Do the puja, with the Lakshmi Ashtakam or the Ashtalakshmi stotra, and an aarti.', 'Share sweets, visit family and give gifts.', 'Use fireworks with care, and give a thought to children, pets and the elderly.'] },
      { h: 'How it is kept in different places', ul: ['**Telugu states and Karnataka:** Lakshmi Puja and lamps in the evening, with new accounts begun in many shops.', '**Tamil Nadu:** Deepavali morning begins with an oil bath before dawn, and Deepavali Marundhu, a herbal medicine, is taken.', '**North India:** Lakshmi-Ganesh Puja, with rows of diyas and Rama\'s return.', '**Bengal:** Kali Puja on the same night.', '**Jain and Sikh traditions:** Deepavali also marks Mahavira\'s nirvana and Bandi Chhor Divas.'] },
    ],
    faqs: [
      ['Which day is the main Deepavali?', 'For most families it is the evening of Amavasya, the day of Lakshmi Puja. Many South Indian homes also give great importance to the early morning of Naraka Chaturdashi, with the oil bath and new clothes. Some calendars differ by a day, so confirm with your local panchangam or temple.'],
      ['Is Deepavali on the Amavasya?', 'Yes, it falls on the new moon of Ashwayuja. If the tithi spans two days, the evening of the day when Amavasya is present at dusk is chosen.'],
      ['Why do we light lamps?', 'To welcome Lakshmi and to mark the victory of light over dark.'],
      ['What is Bandi Chhor Divas?', 'The Sikh festival remembering the release of Guru Hargobind and 52 kings, kept on the same day.'],
    ],
    reads: [{ href: '/festivals/deepavali/', label: 'Deepavali, day by day' }, { href: '/hidden-stories-of-deepavali-what-we-know-and-what-is-folk/', label: 'Hidden stories of Deepavali' }, { href: '/bandi-chhor-divas-the-guru-who-would-not-leave-without-52-kings/', label: 'Bandi Chhor Divas' }, { href: '/mahalakshmi-ashtakam-meaning-and-how-to-use-it/', label: 'Mahalakshmi Ashtakam' }],
  },
};
