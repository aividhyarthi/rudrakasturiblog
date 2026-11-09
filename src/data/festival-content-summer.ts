// Full page text for festivals from Vaishakha to Shravana. No years in this text: dates come from the sky.
import type { FestContent } from './festival-content';

export const FEST_SUMMER: Record<string, FestContent> = {
  'akshaya-tritiya': {
    hero: 'om-lotus', heroAlt: 'A pot of water, a lamp and a few gold-coloured flowers', te: 'అక్షయ తృతీయ',
    names: 'On the third day of the bright fortnight of Vaishakha. Akshaya means "that which never diminishes".',
    dek: 'A day for beginnings, for giving, and for the things you hope will grow.',
    source: 'Customs differ by region and family.',
    lead: ['Jewellers advertise it for weeks. Families in the villages draw a different meaning from it: a day when anything begun, any gift given, is said never to run out. It is the day many people choose to start a new venture, make a donation, or do a first puja in a new home.'],
    blocks: [
      { h: 'What the day is', p: ['Akshaya Tritiya falls on Vaishakha Shukla Tritiya. In tradition it is one of the most auspicious days of the year, and needs no separate muhurtham. It is said to be the day Parashurama was born, and the day the Treta Yuga began. The word Akshaya means "never decaying", so good deeds done on this day are said to bring lasting results.'] },
      { h: 'How to keep it', ol: ['Bathe early and offer a prayer to Vishnu and Lakshmi.', 'Light a lamp and offer fruit, flowers and sweets.', 'Give: water, fans, umbrellas, food, clothes or grain are the traditional gifts, as the day falls in the heat of summer.', 'Begin something new, a project, a savings habit or a study, if you wish.', 'Many people buy gold or silver on this day. This is a custom, not a requirement. Giving is regarded as the greater act.'] },
      { h: 'Where it is kept', ul: ['**Simhachalam,** Visakhapatnam: Chandanotsavam, when the sandalwood covering is removed and the Lord is seen in his original form for a few hours.', '**Badrinath and Kedarnath,** in the Himalayas, open their doors around this time.', '**Across India:** Parashurama Jayanti is kept in many places.'] },
    ],
    faqs: [
      ['Do I have to buy gold?', 'No. It is a popular custom, but tradition values giving and starting good work more.'],
      ['Why is it called Akshaya?', 'Akshaya means "never decaying". Good deeds on this day are said to grow, not shrink.'],
      ['What is Chandanotsavam?', 'The annual festival at Simhachalam when the Lord Narasimha\'s sandalwood covering is removed and the idol is seen in its original form.'],
    ],
    reads: [{ href: '/ashtalakshmi-the-eight-forms-of-lakshmi-and-what-they-mean/', label: 'Ashtalakshmi: the eight forms of Lakshmi' }, { href: '/hills-of-andhra-where-the-gods-live-simhachalam-ahobilam-srisailam/', label: 'Hills of Andhra: Simhachalam, Ahobilam, Srisailam' }],
  },

  'shankara-jayanti': {
    hero: 'books-lamp', heroAlt: 'Palm-leaf manuscripts and a lamp', te: 'శంకర జయంతి',
    names: 'The birth anniversary of Adi Shankaracharya, on Vaishakha Shukla Panchami.',
    dek: 'A boy from Kaladi who walked across India and gave a way of reading the Upanishads.',
    source: 'Details of Shankara\'s life come from later biographies. Dates and stories differ between traditions.',
    lead: ['Shankara is said to have left home as a boy and to have walked from Kerala to Kashi, to the Himalayas and back. By the time he died, still in his thirties, he had written commentaries on the Upanishads, the Gita and the Brahma Sutras, founded four mathas, and changed the way India reads its own scriptures.'],
    blocks: [
      { h: 'Who was Shankara?', p: ['Adi Shankaracharya, born in Kaladi in Kerala, is the great teacher of Advaita Vedanta, the view that the self and Brahman are one. He is also remembered for devotional hymns, among them the Bhaja Govindam, the Soundarya Lahari and the Subramanya Bhujangam.'] },
      { h: 'The story of the golden amla', p: ['A popular story says that as a young student, Shankara begged alms at the door of a poor woman. She had only a single dried amla to give. Moved, he sang the Kanakadhara Stotram to Lakshmi, and the goddess showered golden amlas. The story is told in the tradition, and is not in a single early text.'] },
      { h: 'How to keep the day', ol: ['Bathe early and place a picture of Shankara before a lamp.', 'Read or recite the Bhaja Govindam or the Kanakadhara Stotram.', 'Read a few verses of the Upanishads or the Gita.', 'Visit a Shankara math or a temple, if one is close.', 'Give something, and spend a few quiet minutes on the question "Who am I?"'] },
      { h: 'The four mathas', ul: ['**Sringeri,** Karnataka, in the south', '**Dwaraka,** Gujarat, in the west', '**Puri (Govardhana),** Odisha, in the east', '**Jyotirmath,** Uttarakhand, in the north'] },
    ],
    faqs: [
      ['Who founded the four mathas?', 'Tradition says Shankara did, placing a disciple at each.'],
      ['What is Advaita?', 'The teaching that the individual self and the ultimate reality are one. Our article explains it in plain words.'],
      ['When did Shankara live?', 'Scholars place him in the 8th century. Traditional dates differ.'],
    ],
    reads: [{ href: '/adi-shankaracharya-the-boy-from-kaladi-who-walked-across-india/', label: 'Adi Shankaracharya: the boy from Kaladi' }, { href: '/shankaras-four-mathas-sringeri-dwaraka-jyotirmath-puri/', label: 'Shankara\'s four mathas' }, { href: '/bhaja-govindam-shankaras-song-for-the-confused-mind/', label: 'Bhaja Govindam' }, { href: '/advaita-vedanta-in-plain-words/', label: 'Advaita Vedanta in plain words' }],
  },

  'sita-navami': {
    hero: 'rama-symbols', heroAlt: 'A plough, a lamp and a small clay pot', te: 'సీతా నవమి',
    names: 'Also called Janaki Jayanti. Sita is said to have been found in a furrow by King Janaka.',
    dek: 'The daughter of the earth, remembered on the ninth day of Vaishakha.',
    source: 'The story of Sita\'s birth is told in the Ramayana. Customs differ by region.',
    lead: ['Sita is the only major figure in the Ramayana who is not born in the usual way. A king ploughing a field for a sacrifice found her in the furrow. Her story begins with the earth, and, as many tellings note, it ends with the earth.'],
    blocks: [
      { h: 'What the day is', p: ['Sita Navami falls on Vaishakha Shukla Navami, a month after Rama Navami. It is the day Sita is said to have been found by King Janaka of Mithila. In the North it is Janaki Jayanti, with the biggest festival at Sitamarhi, and in the South many women keep a fast.'] },
      { h: 'How to keep it', ol: ['Bathe early, and keep a fast until the puja is done.', 'Place pictures of Sita and Rama, with Lakshmana and Hanuman if you have them.', 'Offer flowers, fruit, kumkum and turmeric. Women offer bangles and a sari to Sita.', 'Read about Sita in the Ramayana, or recite the Sita Rama stotra.', 'End the fast with the prasad, and give something to a woman who needs it.'] },
    ],
    faqs: [
      ['Why Sita Navami and not Rama Navami?', 'They are separate days, a month apart. Rama Navami celebrates Rama\'s birth. Sita Navami celebrates Sita\'s.'],
      ['Who keeps Sita Navami?', 'Many women do, praying for family wellbeing and the long life of their husbands.'],
    ],
    reads: [{ href: '/anasuya-and-sita-the-gift-of-an-old-sage-couple/', label: 'Anasuya and Sita' }, { href: '/which-god-to-pray-to-for-marriage-katyayani-gauri-and-sita-rama/', label: 'Which god to pray to for marriage' }],
  },

  'narasimha-jayanti': {
    hero: 'vishnu-symbols', heroAlt: 'A pillar, a lamp and a flame at dusk', te: 'నరసింహ జయంతి',
    names: 'The appearance of Narasimha, on the fourteenth day of the bright fortnight of Vaishakha, at dusk.',
    dek: 'The god who came out of a pillar at twilight for a child who believed.',
    source: 'The story is from the Bhagavata Purana and the Vishnu Purana. Customs differ by temple.',
    lead: ['The king had been given a boon that he could not be killed by man or beast, indoors or out, by day or by night, by any weapon. So Vishnu came in a form that was neither man nor beast, at twilight, on a threshold, and killed him with nails. That is the story of Narasimha, and it is told every year on this day.'],
    blocks: [
      { h: 'The story', p: ['Prahlada, the young son of the demon king Hiranyakashipu, was devoted to Vishnu. His father tried to kill him in many ways. At last, when the king struck a pillar and asked, "Where is your Vishnu?", Narasimha, half man and half lion, burst from it. At dusk, in the doorway, he placed the king on his lap and killed him. Prahlada was untouched. Then Narasimha, fierce at first, grew gentle at Prahlada\'s prayer.'] },
      { h: 'How to keep it', ol: ['Keep a fast through the day.', 'In the evening, at the twilight hour, do the puja at home or at a Narasimha temple.', 'Offer panakam, a drink of jaggery, flowers, and tulasi leaves.', 'Recite the Narasimha mantra *Ugram Viram Maha Vishnum*, or the Lakshmi Narasimha Karavalamba Stotram.', 'Break the fast after the evening puja.'] },
      { h: 'Where it is kept', ul: ['**Ahobilam,** Andhra Pradesh: the nine Narasimha shrines.', '**Simhachalam,** Visakhapatnam.', '**Yadagirigutta (Yadadri),** Telangana: the great Lakshmi Narasimha temple.', '**Mangalagiri,** Andhra Pradesh: the Panakala Narasimha temple, famous for its jaggery water offering.'] },
    ],
    faqs: [
      ['Why is the puja at twilight?', 'Because Narasimha appeared at dusk. The twilight hour is called Sandhya, and the puja is done then.'],
      ['Who prays to Narasimha?', 'Many pray to him for courage and protection from fear, and for relief from enemies and troubles.'],
      ['What is panakam?', 'A drink of jaggery and water with a little cardamom and pepper, offered to Narasimha.'],
    ],
    reads: [{ href: '/which-god-to-pray-to-for-fear-and-courage-hanuman-narasimha-durga/', label: 'Which god to pray to for fear and courage' }, { href: '/hills-of-andhra-where-the-gods-live-simhachalam-ahobilam-srisailam/', label: 'Hills of Andhra' }],
  },

  'hanuman-jayanti-telugu': {
    hero: 'hanuman-symbols', heroAlt: 'A garlanded Hanuman with a mace and a lamp', te: 'హనుమాన్ జయంతి',
    names: 'The Telugu tradition: on the tenth day of the dark fortnight of Vaishakha. The day the Hanuman Deeksha ends.',
    dek: 'Forty-one days of discipline end on a single day.',
    source: 'Different regions keep Hanuman Jayanti on different days. This page is for the Telugu tradition.',
    lead: ['In the weeks before this day, you may see men in saffron or red, barefoot, with a garland of beads round their neck, walking quietly through the streets of the Telugu states. They are keeping the Hanuman Deeksha, a period of discipline, often forty-one days. It ends on Hanuman Jayanti, Vaishakha Krishna Dashami, in the Telugu tradition.'],
    blocks: [
      { h: 'How to keep it', ol: ['Rise early, bathe and wear red or saffron.', 'Offer sindoor mixed with oil, red flowers, betel leaf garlands and laddus.', 'Recite the Hanuman Chalisa, and read the Sundara Kanda.', 'Visit a Hanuman temple. Those who have kept the deeksha complete it at the temple with the removal of the mala.', 'Share the prasad and feed the hungry.'] },
      { h: 'Kondagattu and other temples', ul: ['**Kondagattu,** Telangana: a famous Anjaneya temple where many deeksha devotees conclude their vow.', '**Anjaneya temples** across the Telugu states hold abhishekam and processions.'] },
    ],
    faqs: [
      ['Why are there different Hanuman Jayanti dates?', 'Regional traditions disagree about the day of his birth. Our article explains the three main ones.'],
      ['What is Hanuman Deeksha?', 'A discipline of 41 days of simple food, early rising and prayer, ending at the temple on Jayanti.'],
    ],
    reads: [{ href: '/why-hanuman-jayanti-is-on-two-dates/', label: 'Why Hanuman Jayanti is on two dates' }, { href: '/hanuman-chalisa-meaning-first-five-verses/', label: 'Hanuman Chalisa: first five verses' }, { href: '/hanuman-and-shani-why-hanuman-devotees-are-said-to-be-safe/', label: 'Hanuman and Shani' }],
  },

  'shani-jayanti': {
    hero: 'navagraha-symbols', heroAlt: 'A black cloth, sesame and an oil lamp before a Shani idol', te: 'శని జయంతి',
    names: 'Also Shani Amavasya. The birthday of Shani, on Jyeshtha Amavasya.',
    dek: 'Sesame oil, black sesame and a day to meet the planet of consequence with respect.',
    source: 'Customs differ by region. Astrological ideas are traditional beliefs, not facts of science.',
    lead: ['Shani is a god many people are afraid of. He is slow, serious and fair, and he is said to reward honest work and punish carelessness. Shani Jayanti is the day he is honoured, with sesame oil, black sesame and small acts of service.'],
    blocks: [
      { h: 'What the day is', p: ['Shani Jayanti falls on Jyeshtha Amavasya. It is the traditional birthday of Shani, the son of Surya and Chhaya. When it falls on a Saturday it is especially notable.'] },
      { h: 'How to keep it', ol: ['Bathe early, and wear dark blue or black if you wish.', 'Go to a Shani temple, or light a lamp of sesame oil before a Shani idol.', 'Offer black sesame, a blue flower and a bit of oil.', 'Chant *Om Sham Shanaishcharaya Namah*, or the Shani stotra.', 'Give: black sesame, oil, black blankets, shoes or food to the poor and to those who work for you.', 'Pray to Hanuman too, as many do on Saturdays.'] },
      { h: 'Where to go', ul: ['**Thirunallar,** near Karaikal, Tamil Nadu: the famous Shani shrine within the Darbaranyeswarar temple.', '**Mandapalli,** East Godavari, Andhra Pradesh.', '**Shani Shingnapur,** Maharashtra.'] },
    ],
    faqs: [
      ['Should I be afraid of Shani?', 'Most teachers say no. Shani is described as strict but fair. If you are honest and hardworking, there is little to fear.'],
      ['What helps in Sade Sati?', 'Traditional practices include Hanuman worship, simple charity and discipline. Steady effort matters more than any ritual.'],
      ['Is Shani Jayanti the same as Shani Amavasya?', 'They fall on the same day. Many calendars give both names.'],
    ],
    reads: [{ href: '/hanuman-and-shani-why-hanuman-devotees-are-said-to-be-safe/', label: 'Hanuman and Shani' }, { href: '/saturday-venkateswara-shani-hanuman-how-to-worship/', label: 'Saturday: Venkateswara, Shani, Hanuman' }, { href: '/sade-sati-2026-which-rashis-are-affected/', label: 'Sade Sati: which rashis are affected' }, { href: '/ravana-imprisoned-the-navagrahas-meghanada-birth-and-shani-s-twelfth-house/', label: 'Ravana chained the nine planets' }],
  },

  'rath-yatra': {
    hero: 'temple-sunrise', heroAlt: 'A great chariot with a painted canopy and ropes in a crowded street', te: 'జగన్నాథ రథయాత్ర',
    names: 'The chariot festival of Lord Jagannath at Puri, on the second day of the bright fortnight of Ashadha.',
    dek: 'The god who comes out of his temple, so that everyone can see him.',
    source: 'Customs differ by region and temple.',
    lead: ['Once a year, the Lord of the Universe leaves his temple and rides in a chariot down the main street of Puri, to the house of his aunt, so that anyone who could not enter the temple can see him. The huge wooden chariots are pulled by thousands of devotees, hand over hand, on thick ropes.'],
    blocks: [
      { h: 'What the day is', p: ['The Rath Yatra falls on Ashadha Shukla Dwitiya. At Puri, three chariots carry Jagannath, his brother Balabhadra and his sister Subhadra from the Jagannath temple to the Gundicha temple, about three kilometres away. They stay there for nine days, and return in the Bahuda Yatra.'] },
      { h: 'The three chariots', ul: ['**Nandighosa:** the chariot of Jagannath', '**Taladhwaja:** the chariot of Balabhadra', '**Darpadalana:** the chariot of Subhadra'] },
      { h: 'How to keep it at home', ol: ['Place a picture of Jagannath, Balabhadra and Subhadra on a clean cloth.', 'Offer fruit and a sweet, and light a lamp.', 'Recite the Jagannath Ashtakam, or sing a bhajan.', 'If your town has a Rath Yatra, such as the ISKCON one in many cities, join the procession and pull the rope.', 'Share the prasad. Many offer rice and dal, in the style of the Puri temple\'s mahaprasad.'] },
    ],
    faqs: [
      ['Why does Jagannath go to his aunt\'s house?', 'The Gundicha temple is considered the home of Jagannath\'s aunt. The journey is his annual holiday.'],
      ['Who can pull the chariot?', 'Anyone, in the tradition. The ropes are open to all who come.'],
      ['What is the Bahuda Yatra?', 'The return journey, nine days later.'],
    ],
    reads: [{ href: '/krishna-the-cowherd-the-king-and-the-teacher/', label: 'Krishna: the cowherd, the king and the teacher' }],
  },

  'karka-sankranti': {
    hero: 'surya-symbols', heroAlt: 'The Sun low over a river with a small boat', te: 'కర్కాటక సంక్రాంతి',
    names: 'The Sun enters Karka (Cancer) and Dakshinayana begins. In Tamil Nadu it opens the Aadi month.',
    dek: 'The Sun turns south, and the quieter half of the year begins.',
    source: 'Karka Sankranti is a solar festival, so its date is fixed by the Sun\'s entry into Karka.',
    lead: ['Six months ago the Sun turned north, and the festival of Sankranti followed. Today it turns south. The old calendar treats these two halves of the year differently: the northward half for beginnings, the southward half for reflection, devotion and ancestors.'],
    blocks: [
      { h: 'What the day is', p: ['On this day the Sun enters Karka, the sign of Cancer, and Dakshinayana begins, the Sun\'s southward journey, which lasts about six months. In Tamil Nadu it opens the Aadi month, a month of goddess worship. In Kerala it opens the Karkidakam month, a month for reading the Ramayana.'] },
      { h: 'How to keep it', ol: ['Take a bath at dawn, if possible in a river or tank.', 'Offer water to the Sun at sunrise.', 'Offer tarpanam to ancestors, as your family does it. This is considered suitable on this day.', 'Give food, clothes or sesame to those in need.'] },
    ],
    faqs: [
      ['What is Dakshinayana?', 'The six months when the Sun appears to move south. It is followed by Uttarayana, which begins at Makara Sankranti.'],
      ['Why is Dakshinayana called less auspicious?', 'In traditional thinking, Uttarayana is for new beginnings and Dakshinayana for devotion and reflection. It is a matter of emphasis, and many important festivals fall in it.'],
    ],
    reads: [{ href: '/surya-arghya-how-to-offer-water-to-the-sun-at-sunrise/', label: 'Surya arghya' }],
  },

  'guru-purnima': {
    hero: 'books-lamp', heroAlt: 'A lamp and flowers placed at the feet of a teacher\'s seat', te: 'గురు పౌర్ణమి',
    names: 'Also called Vyasa Purnima. The full moon of Ashadha, the day to honour teachers.',
    dek: 'A day to say thank you to the one person who changed how you see things.',
    source: 'Customs differ by tradition.',
    lead: ['Think of one person who taught you something that you still use. It might be a school teacher, a grandmother, a coach, or a stranger on a train. On Guru Purnima, tradition asks you to bow to that person, in whatever way you can.'],
    blocks: [
      { h: 'What the day is', p: ['Guru Purnima falls on Ashadha Pournami. It is dedicated to Veda Vyasa, who is remembered as the compiler of the Vedas and the author of the Mahabharata, and to all teachers. The word guru means "the one who removes darkness".'] },
      { h: 'How to keep it', ol: ['Bathe early and place a picture of your guru, or of Vyasa or Dattatreya, before a lamp.', 'Offer flowers, fruit and, if you can, a gift to your own teacher. If your teacher is far away, call or write.', 'Read a verse of the Gita, the Upanishads or the Guru Gita.', 'Spend a few minutes in silence thinking about what you have learned and who taught you.', 'Give a gift to a teacher, a book to a student, or food to a hungry person.'] },
      { h: 'How it is kept in different places', ul: ['**Shirdi** and **Sai Baba** temples hold major festivals.', '**Sringeri** and other mathas hold Vyasa Puja.', '**Buddhist traditions** remember the Buddha\'s first sermon around this full moon.', '**Telugu and Tamil homes** honour parents, teachers and spiritual teachers.'] },
    ],
    faqs: [
      ['Who is Vyasa?', 'The sage tradition credits with compiling the Vedas and writing the Mahabharata and the Puranas. Many call him Veda Vyasa.'],
      ['Do I need a guru?', 'Many traditions say yes, and many say your first teacher is whoever teaches you. Our article on finding a guru looks at the question honestly.'],
      ['Can I celebrate if I have no spiritual teacher?', 'Yes. Honour any teacher, parent or mentor.'],
    ],
    reads: [{ href: '/searching-for-a-guru-how-to-find-one-and-how-to-know-a-real-one/', label: 'Searching for a guru' }, { href: '/thursday-is-for-the-guru-how-to-worship-on-guruvaram/', label: 'Thursday is for the guru' }, { href: '/dattatreya-and-the-24-gurus-what-the-avadhuta-learned/', label: 'Dattatreya and the 24 gurus' }, { href: '/guru-brihaspati-jupiter-in-the-navagrahas-the-teacher-planet/', label: 'Guru in the Navagrahas' }],
  },

  'nag-panchami': {
    hero: 'vel-murugan', heroAlt: 'A stone snake with milk, flowers and a lamp', te: 'నాగ పంచమి',
    names: 'Also called Nagula Panchami in the Telugu states. The festival of the snake, on the fifth day of the bright fortnight of Shravana.',
    dek: 'Milk, flowers and a day of respect for the snake.',
    source: 'Customs differ by region. A note on wildlife is included below.',
    lead: ['Snakes frighten almost everyone, and yet the tradition has made them part of the divine household. Shiva wears one, Vishnu rests on one, and Subramanya is closely linked with them. On Nag Panchami people honour the snake, and pray for the family\'s safety.'],
    blocks: [
      { h: 'What the day is', p: ['Nag Panchami falls on Shravana Shukla Panchami. In the Telugu states it is called Nagula Panchami and sits alongside Nagula Chavithi, which comes in Karthika. In many places snakes are worshipped at anthills and naga stones, and children are told the story of Astika, who saved the Nagas from a sacrifice.'] },
      { h: 'How to keep it', ol: ['Bathe early. Many families keep a fast until the puja.', 'Draw a snake in rangoli, or use a naga stone, an anthill, or a picture.', 'Offer turmeric, kumkum, flowers, a lamp and milk.', 'Recite the naga mantra, or the Subramanya name mantra.', 'Many families avoid digging, ploughing or using a knife on this day, out of respect for the earth\'s creatures.'] },
      { h: 'A word for the snakes', p: ['Snakes do not drink milk, and pouring milk on them can harm them. Many families now offer milk at a naga stone in the temple. Never disturb or catch a snake for the festival.'] },
    ],
    faqs: [
      ['Is Nag Panchami the same as Nagula Chavithi?', 'No. Nag Panchami is in Shravana and Nagula Chavithi in Karthika. Both honour snakes.'],
      ['Who was Astika?', 'The boy who is said to have stopped King Janamejaya\'s snake sacrifice. Our article tells his story.'],
    ],
    reads: [{ href: '/astika-and-the-snake-sacrifice-how-a-boy-saved-the-nagas/', label: 'Astika and the snake sacrifice' }, { href: '/kukke-subramanya-temple-sarpa-dosha-and-the-snake-worship-of-the-south/', label: 'Kukke Subramanya' }],
  },

  'varalakshmi-vratam': {
    hero: 'devi-symbols', heroAlt: 'A decorated kalasha with a coconut, mango leaves and a sari', te: 'వరలక్ష్మీ వ్రతం',
    names: 'Observed on the Friday just before Shravana Pournami. The boon-giving form of Lakshmi.',
    dek: 'A kalasha, a thread with nine knots and the women of the family at the same table.',
    source: 'Customs differ by family and community.',
    lead: ['In many Telugu, Tamil and Kannada homes, one Friday in the monsoon is the busiest day of the year. A kalasha is decorated with a sari and jewellery, to look like the goddess herself. Women, in their best silks, gather around it, and the house smells of flowers, sweets and incense.'],
    blocks: [
      { h: 'What the day is', p: ['Varalakshmi Vratam is kept on the Friday before Shravana Pournami. Varalakshmi is the form of Lakshmi who grants boons (vara). Married women keep the vratam for the prosperity and wellbeing of their families, and many invite neighbours and friends to take part.'] },
      { h: 'How to keep it', ol: ['Clean the home and the puja area, and draw a rangoli.', 'Set up a kalasha with water, rice, a coconut, mango leaves, and decorate it with a sari, flowers and jewellery.', 'Do the puja with lamps, incense and the Lakshmi Ashtottara or Ashtalakshmi stotra.', 'Tie a sacred thread (toranam) with nine knots and nine flowers on the wrist, as the family custom is.', 'Offer a variety of sweets and savouries, and fruit.', 'Give tambulam, with betel leaf, coconut, turmeric and a blouse piece, to women who visit.', 'Close the puja with an aarti, and share the prasad.'] },
      { h: 'What to keep ready', ul: ['A brass kalasha, a coconut and mango leaves', 'A sari or cloth, and some jewellery to decorate the kalasha', 'Flowers, turmeric, kumkum, rice and betel leaves', 'Sweets, fruit and the festival food', 'A thread with nine knots, and a small lamp'] },
    ],
    faqs: [
      ['Why Friday?', 'Friday is Lakshmi\'s day in the tradition. The vratam is held on the Friday closest to Shravana Pournami.'],
      ['Who can keep the vratam?', 'Married women traditionally, but many families keep it together, and many unmarried women and men join the worship.'],
      ['Is it a fast?', 'Many keep a fast until the puja is done. Please keep it according to your health.'],
    ],
    reads: [{ href: '/friday-lakshmi-worship-mantras-and-how-to-do-it/', label: 'Friday Lakshmi worship' }, { href: '/mahalakshmi-ashtakam-meaning-and-how-to-use-it/', label: 'Mahalakshmi Ashtakam' }, { href: '/ashtalakshmi-the-eight-forms-of-lakshmi-and-what-they-mean/', label: 'Ashtalakshmi' }],
  },

  'raksha-bandhan': {
    hero: 'om-lotus', heroAlt: 'A rakhi, a lamp and sweets on a plate', te: 'శ్రావణ పౌర్ణమి',
    names: 'Shravana Pournami is Raksha Bandhan, Jandhyala Pournami and Hayagriva Jayanti, all on one day.',
    dek: 'A thread on a brother\'s wrist, a new sacred thread and a god of learning, on one day.',
    source: 'Customs differ widely by region and community.',
    lead: ['One full moon carries four traditions. Sisters tie rakhis to their brothers. Brahmins renew their sacred thread. Students pray to Hayagriva, the god of learning. And on the coast of Maharashtra, fishermen throw coconuts into the sea.'],
    blocks: [
      { h: 'What the day is', p: ['Shravana Pournami is the full moon of the month of Shravana. It is a day with more than one name, depending on who you ask.'] },
      { h: 'The four traditions', ul: ['**Raksha Bandhan:** a sister ties a rakhi on her brother\'s wrist, he promises to look after her, and gifts and sweets are exchanged.', '**Jandhyala Pournami / Upakarma:** the sacred thread (yajnopavita) is renewed. In Tamil Nadu this is Avani Avittam.', '**Hayagriva Jayanti:** the birth of Hayagriva, the horse-headed form of Vishnu, who is worshipped for learning and wisdom.', '**Narali Purnima** in Maharashtra: coconuts are offered to the sea.'] },
      { h: 'How to keep Raksha Bandhan', ol: ['Bathe and prepare a plate with a rakhi, a lamp, kumkum, rice and a sweet.', 'The sister applies a tilak and ties the rakhi on the brother\'s right wrist.', 'She does a small aarti and offers a sweet.', 'The brother gives a gift and a promise of support.', 'If you are far apart, post the rakhi or send it by a relative.'] },
    ],
    faqs: [
      ['Does Raksha Bandhan need a brother by birth?', 'No. Many tie rakhi to cousins, friends and neighbours who are like brothers.'],
      ['What is Upakarma?', 'The annual renewal of the sacred thread by those who wear it, with a vow to study the Vedas.'],
      ['Who is Hayagriva?', 'A form of Vishnu with the head of a horse, worshipped for learning. Students pray to him on this day.'],
    ],
    reads: [{ href: '/which-god-to-pray-to-for-exams-and-learning-saraswati-hayagriva/', label: 'Which god to pray to for exams and learning' }],
  },

  'raghavendra-aradhana': {
    hero: 'temple-sunrise', heroAlt: 'A river bank with a small shrine and lamps at dawn', te: 'రాఘవేంద్ర ఆరాధన',
    names: 'The three-day aradhana of Sri Raghavendra Swamy at Mantralayam, in Shravana.',
    dek: 'The saint of Mantralayam, a river and a promise to those who come.',
    source: 'Details of Raghavendra Swamy\'s life are from the Madhva tradition. Dates and customs follow the Mantralayam math.',
    lead: ['At Mantralayam, on the banks of the Tungabhadra, a saint is said to be still present in his brindavana. Raghavendra Swamy entered the brindavana, a living burial, in the 17th century, and devotees believe he answers those who come in faith.'],
    blocks: [
      { h: 'Who was Raghavendra Swamy?', p: ['Raghavendra Swami (1595–1671) was a Madhva saint, scholar and writer of commentaries. He is believed to be an incarnation of Prahlada. His samadhi at Mantralayam in Andhra Pradesh draws lakhs of devotees. The Raghavendra Stotram is by Appanacharya, one of his disciples.'] },
      { h: 'The Aradhana', p: ['The Aradhana is kept in Shravana over three days: Poorvaradhana, Madhyaradhana and Uttararadhana. The Mantralayam math holds special pujas, a chariot procession and feeding of thousands.'] },
      { h: 'How to keep it at home', ol: ['Place a picture of Raghavendra Swamy before a lamp.', 'Offer flowers, fruit and tulasi.', 'Recite the Raghavendra Stotram or the *Sri Raghavendraya Namah* mantra.', 'Many devotees take a vow of 7 or 11 pradakshinas, or a visit on a Thursday.', 'Share food with the poor.'] },
    ],
    faqs: [
      ['Where is Mantralayam?', 'On the banks of the Tungabhadra in Kurnool district, Andhra Pradesh.'],
      ['When are Thursdays important?', 'Many devotees go to Raghavendra temples on Thursdays, the guru\'s day.'],
    ],
    reads: [{ href: '/tungabhadra-hampi-and-the-river-of-the-vijayanagara-kings/', label: 'The Tungabhadra, Hampi and the Vijayanagara kings' }, { href: '/thursday-is-for-the-guru-how-to-worship-on-guruvaram/', label: 'Thursday is for the guru' }],
  },

  'janmashtami': {
    hero: 'krishna-flute', heroAlt: 'A flute, a peacock feather and a cradle with small footprints', te: 'కృష్ణాష్టమి',
    names: 'Also Sri Krishna Jayanti. The birth of Krishna at midnight on the eighth day of the dark fortnight of Shravana.',
    dek: 'A midnight birth, tiny footprints on the floor and a pot of butter just out of reach.',
    source: 'The story is from the Bhagavata Purana and the Mahabharata tradition. Customs differ by region.',
    lead: ['The house is dark and quiet. A small cradle is ready, with a tiny Krishna in it. As the clock nears midnight, the family gathers and sings. At the stroke of twelve, a conch is blown, the cradle is rocked, and everyone breaks into joy. The baby has been born.'],
    blocks: [
      { h: 'The story', p: ['Krishna was born in a prison in Mathura to Devaki and Vasudeva, at midnight, in the Rohini nakshatra. Devaki\'s brother Kamsa had imprisoned them, because it had been foretold that her eighth child would kill him. As the child was born, the guards fell asleep and the doors opened. Vasudeva carried the baby across the Yamuna to Gokul, and left him with Yashoda and Nanda.'] },
      { h: 'How to keep it', ol: ['Many keep a fast until midnight. If you cannot, a light meal of fruit and milk is fine.', 'Clean the home and set up a small cradle or a picture of baby Krishna. In many homes children draw tiny footprints leading from the door to the shrine.', 'In the evening, sing Krishna bhajans or read from the Bhagavata.', 'At midnight, do the abhishekam of baby Krishna, offer butter, sweets and tulasi, and rock the cradle.', 'Break the fast with the prasad.'] },
      { h: 'How the day is kept in different places', ul: ['**Maharashtra and Gujarat:** Dahi Handi, when young men form human pyramids to break a pot of curd hung high above the street.', '**Tamil Nadu:** Gokulashtami, with kolam footprints and special sweets such as murukku and seedai.', '**Telugu states:** Krishnashtami, with Krishna dressing-up competitions among children.', '**Udupi,** Karnataka: the Krishna Matha holds a major festival, with the Vittal Pindi.', '**Mathura, Vrindavan and Dwarka:** the biggest celebrations.'] },
    ],
    faqs: [
      ['Why is Krishna born at midnight?', 'Because the Bhagavata says he was born at midnight, in the dark, as a sign of light in a dark time.'],
      ['What is Dahi Handi?', 'A Maharashtra tradition recalling the child Krishna stealing butter. Teams form a human pyramid to break a pot hung high.'],
      ['Why little footprints at the door?', 'They are a way of welcoming baby Krishna into the home.'],
    ],
    reads: [{ href: '/krishna-janmashtami-how-to-celebrate-at-home/', label: 'Krishna Janmashtami: how to celebrate at home' }, { href: '/krishna-the-cowherd-the-king-and-the-teacher/', label: 'Krishna: the cowherd, the king and the teacher' }, { href: '/radha-and-krishna-what-radha-means-in-the-tradition/', label: 'Radha and Krishna' }],
  },
};
