// The full guide on each main page (/amavasya/, /pournami/, /ekadashi/, /sankashti-chaturthi/, /pradosham/). The month pages carry the dates and what is
// special that month; the story, steps and customs live here once. No years in this text.
export type Section = { h: string; p?: string[]; ul?: string[]; ol?: string[] };
export type Guide = { sections: Section[]; faqs: [string, string][]; reads: { href: string; label: string }[] };

export const GUIDE: Record<string, Guide> = {
  amavasya: {
    sections: [
      { h: 'What Amavasya is', p: [
        'Amavasya is the new moon day, the last tithi of the dark fortnight (Krishna paksha), when the Sun and Moon stand in line and no moon is seen in the sky. In the amanta calendar used in the Telugu, Kannada, Tamil and Malayalam regions it closes the lunar month. In the purnimanta calendar of the North it falls in the middle of the month.',
        'Tradition keeps this day for the ancestors (pitrus). Many families offer water with black sesame (tarpanam), a simple meal, a lamp and charity in their memory. Many teachers add that the new moon is not unlucky in itself. It is a day for turning inward, for prayer and silence rather than celebration.',
      ] },
      { h: 'The story behind the offering of food and water', p: [
        'A popular story, told in many versions, concerns Karna, the great giver of the Mahabharata. After the war his soul reached heaven, but every piece of food he touched turned to gold. When he asked why, he was told that he had given gold in charity all his life but never food to his ancestors. He was allowed to return to earth for a fortnight to put this right, and that fortnight is remembered as Pitru Paksha.',
        'It is a story of the tradition, not a text, and it is told to make one point: remembering the ones who came before is part of giving.',
      ] },
      { h: 'How to keep Amavasya at home', p: ['Follow your family\'s custom first. This is a simple, common outline.'], ol: [
        'Bathe early, in a river if you can, or at home with a few drops of Ganga water or a little sesame in the water.',
        'Offer water to the rising Sun from a copper or brass lota.',
        'At your home shrine, take a sankalp: say your name and your purpose, whether it is remembering the ancestors, a fast or a prayer for the family.',
        'Offer tarpanam. Water mixed with black sesame, with a ring of kusha grass on the finger, is offered to each ancestor by name. Your priest or elders will tell you the exact method of your lineage.',
        'Set aside food for the ancestors. Families who perform shraddha offer pinda (rice balls with sesame and ghee). Many keep a portion of the day\'s simple meal for crows, and another for a cow and a dog, before the family eats.',
        'Worship at the altar: water or milk to a Shivalinga, a ghee lamp and a familiar mantra such as Om Namah Shivaya.',
        'Give: food, clothes or grain to someone in need, or to a temple kitchen, in the name of a departed parent or grandparent.',
        'If you fast, break it in the evening with simple vegetarian food. Children, the elderly, pregnant women and anyone unwell should eat normally and keep the day through prayer and charity.',
      ] },
      { h: 'What to keep ready (samagri)', ul: ['A copper or brass lota and clean water', 'Black sesame (til) and kusha grass, if you have it', 'Cooked rice, a little ghee, sesame and fruit', 'A ghee or sesame oil lamp, wicks and incense', 'Flowers, akshat (unbroken rice), and bilva leaves for Shiva', 'Grain, clothes or food for charity'] },
      { h: 'Special Amavasyas', ul: [
        '**Somavati Amavasya:** an Amavasya that falls on a Monday, Shiva\'s day. See our [Somavati Amavasya guide](/somavati-amavasya/).',
        '**Shani Amavasya:** an Amavasya on a Saturday, when many worship Shani with sesame oil and black sesame.',
        '**Mahalaya Amavasya:** the last day of Pitru Paksha, the great day for all ancestors.',
        '**Deepavali Amavasya:** the new moon of Ashwayuja, the night of Lakshmi Puja.',
        '**Mauni Amavasya** (Magha in the North, Pushya in the amanta calendar): a day of silence, a holy bath and charity.',
      ] },
      { h: 'How the day is kept in different places', ul: [
        '**Tamil Nadu:** Aadi Amavasai, Thai Amavasai and Mahalaya Amavasai are the main days for tarpanam. Families bathe at rivers and the seashore, with large crowds at Rameswaram.',
        '**Kerala:** Karkidaka Vavu, when families offer Bali tarpanam for the ancestors on river banks and at sea shores.',
        '**Telugu states:** families offer tarpanam and food, and many visit a Shiva temple. Mahalaya Amavasya is also the day Bathukamma begins in Telangana.',
        '**Maharashtra:** Pola on Shravana Amavasya, when bulls are decorated and honoured.',
        '**Bengal:** Mahalaya, the invocation of Durga, and Kali Puja on the Deepavali night.',
      ] },
      { h: 'What many families avoid on Amavasya', ul: ['Starting a new business, a wedding, a house-warming or other auspicious work', 'Cutting hair, shaving or cutting nails', 'Non-vegetarian food', 'Lending or borrowing money', 'Buying gold, a new vehicle or new clothes', 'Quarrels and harsh words at home'] },
    ],
    faqs: [
      ['Why is Amavasya observed?', 'Tradition holds that on the new moon the ancestors draw closest to the living and accept offerings of water and sesame. Of the many occasions the Dharmashastras list in a year for shraddha, the twelve monthly new moons are among the most important.'],
      ['Can we do puja at home on Amavasya?', 'Yes. Most families keep it at home with a bath, a lamp, tarpanam as their custom is, a prayer to Shiva or the family deity, and charity. A visit to a temple or a river bank is a bonus, not a requirement.'],
      ['Which prayers and mantras are recited on Amavasya?', 'Many chant Om Namah Shivaya, read the Vishnu Sahasranama or the Hanuman Chalisa, and offer a simple prayer to the ancestors such as Om Pitru Devatabhyo Namah. Follow your family\'s practice.'],
      ['Is Amavasya auspicious or inauspicious?', 'Traditionally it is a day for ancestors and inner reflection, not for celebrations or new beginnings. It is considered powerful for charity, prayer and remembering the departed.'],
      ['What is the difference between tarpanam and shraddha?', 'Shraddha is the fuller rite, built around the offering of pinda. Tarpanam is the simpler offering of water with black sesame. Amavasya is the monthly day set aside for both.'],
      ['Can women and daughters offer tarpanam?', 'Customs differ. In many families the eldest son or a male relative on the father\'s side does it. Many modern families include daughters. Please follow your own family and priest.'],
      ['Should we fast on Amavasya?', 'Only if it suits your health. A fast until the evening puja is common. A light vegetarian meal is also accepted.'],
      ['Can we cut hair or nails on Amavasya?', 'Many families avoid it. It is a custom, not a rule of faith.'],
      ['How is a Monday or Saturday Amavasya different?', 'A Monday Amavasya is Somavati Amavasya, special for Shiva. A Saturday Amavasya is Shani Amavasya, when Shani is worshipped with sesame oil and black sesame.'],
      ['Is it the same day for everyone?', 'The tithi begins and ends at the same moment across India, but calendars choose the day by rule. Most take the day when it is present in the afternoon. Some temples and families take the sunrise tithi. Keep to your own family\'s rule.'],
    ],
    reads: [{ href: '/how-to-honour-ancestors-pitru-mantras-and-family-peace/', label: 'How to honour ancestors' }, { href: '/monday-shiva-worship-panchakshari-and-pournami/', label: 'Monday Shiva worship' }, { href: '/somavati-amavasya/', label: 'Somavati Amavasya' }],
  },

  pournami: {
    sections: [
      { h: 'What Pournami is', p: ['Pournami is the full moon day, the last tithi of the bright fortnight (Shukla paksha), when the Moon is opposite the Sun and shines in full. It falls once a lunar month, and each Pournami has its own place in the calendar: Guru Purnima, Sharad Purnima, Karthika Pournami and more.', 'It is a day for light, for worship and for giving. Many families keep a fast, light a lamp, worship Vishnu or Shiva, and in the Telugu states perform the Satyanarayana Vratam.'] },
      { h: 'Satyanarayana Vratam on Pournami', p: ['The most common observance of a Pournami in Telugu homes is the Satyanarayana Vratam, a simple puja of Vishnu as Satyanarayana, with the katha read aloud and a prasad of sweet semolina and bananas. Families do it on Pournami, and also on festival days, house-warmings and other happy days.'] },
      { h: 'How to keep Pournami at home', ol: [
        'Bathe early, and keep a light fast if you wish.',
        'Light a lamp at the home shrine and worship Vishnu, Shiva or your family deity.',
        'Perform the Satyanarayana Vratam if it is your family\'s custom, or read the Vishnu Sahasranama.',
        'At dusk, when the full moon rises, offer a small prayer and a little water to the Moon.',
        'Give something: food, clothes or grain to someone in need.',
        'Break the fast with the prasad and a simple vegetarian meal.',
      ] },
      { h: 'The Pournami of each lunar month', ul: [
        '**Chaitra:** the first full moon of the year, soon after Ugadi.', '**Vaishakha:** Buddha Purnima, remembering the Buddha\'s birth, enlightenment and passing.', '**Jyeshtha:** Jyeshtha Pournami, the month of mangoes.', '**Ashadha:** Guru Purnima, the day to honour teachers.', '**Shravana:** Raksha Bandhan and Jandhyala Pournami, the renewal of the sacred thread.', '**Bhadrapada:** the day before Pitru Paksha, with Uma Maheshwara Vratam.', '**Ashwayuja:** Sharad Purnima, the brightest moon of the year.', '**Kartika:** Karthika Pournami, among the holiest days of the year.', '**Margashira:** Dattatreya Jayanti.', '**Pushya:** a day of river baths and charity.', '**Magha:** Magha Pournami, the high point of holy baths.', '**Phalguna:** Holi and Holika Dahan, and Kama Dahanam in the Telugu states.',
      ] },
      { h: 'What many families avoid', ul: ['Starting a quarrel or speaking harshly', 'Eating non-vegetarian food, if you are keeping the fast', 'Cutting hair or nails on the day of the vratam'] },
    ],
    faqs: [
      ['Which Pournami is most important?', 'Many consider Karthika Pournami, Guru Purnima, Sharad Purnima, Buddha Purnima and Magha Pournami the most significant.'],
      ['What is the difference between Pournami and Purnima?', 'None. Pournami is the Telugu and Tamil form, Purnima the Sanskrit and North Indian form.'],
      ['Do I have to fast on Pournami?', 'Many do, but it is a personal choice. Please look after your health.'],
      ['Is the date the same everywhere?', 'The tithi is the same across India. Calendars choose the day by rule. The date shown here is the day when the tithi is present at sunrise.'],
      ['What is the difference between Amavasya and Pournami?', 'Amavasya is the new moon, with no Moon visible. Pournami is the full moon. They are about two weeks apart.'],
    ],
    reads: [{ href: '/monday-shiva-worship-panchakshari-and-pournami/', label: 'Monday Shiva worship and Pournami' }, { href: '/satyanarayana-vratam-how-to-do-it-at-home/', label: 'Satyanarayana Vratam at home' }],
  },

  ekadashi: {
    sections: [
      { h: 'What Ekadashi is', p: ['Ekadashi is the eleventh tithi of each fortnight, so it comes twice a month, once in the bright half (Shukla paksha) and once in the dark half (Krishna paksha). It is dedicated to Vishnu. Many families fast on this day and break the fast the next morning, which is called parana. There are 24 Ekadashis in a year, each with its own name and story, and 26 in a year with an adhika month.'] },
      { h: 'The story of Ekadashi', p: ['The Puranas say that the demon Mura attacked Vishnu while he rested. A goddess emerged from Vishnu\'s body and destroyed the demon. Pleased, Vishnu named her Ekadashi and granted that anyone who kept a fast on her day would be freed from sin. That story is read on Utpanna Ekadashi, the first Ekadashi of the cycle.'] },
      { h: 'How to keep Ekadashi', ol: [
        'Wake early, bathe and light a lamp at the home shrine. Worship Vishnu with tulasi leaves, flowers and incense.',
        'Keep the fast as your family does: no grains and pulses, or only fruit and milk. A simple meal without grains is also accepted.',
        'Read or listen to the Vishnu Sahasranama or the Bhagavad Gita. Many spend the day in japa and bhajans.',
        'Stay away from anger, gossip and sleep in the day. Many keep a vigil at night.',
        'Break the fast on the Dwadashi morning, after sunrise and within the parana time given for the day.',
        'Give something: food or a gift to someone in need.',
      ] },
      { h: 'What to eat and what to avoid', ul: ['Usual: fruit, milk, curd, nuts, sabudana (tapioca), potatoes and other root vegetables, and rock salt.', 'Avoided by those who fast: rice, wheat, pulses and beans. Many also avoid onion, garlic and non-vegetarian food.', 'People who are unwell, elderly, pregnant, diabetic, or children should not fast strictly. They can pray and eat lightly.'] },
      { h: 'The rule for parana', p: ['Parana, breaking the fast, is done on the Dwadashi morning. It is not done during the first quarter of Dwadashi (Hari Vasara), and it must be done before Dwadashi ends. Each Ekadashi page gives the parana time for Hyderabad.'] },
      { h: 'Where it is kept', ul: ['**Tirumala and Srirangam:** Vaikuntha Ekadashi (Pausha Putrada), when the Vaikuntha Dwaram, the northern gate, is opened.', '**Pandharpur,** Maharashtra: Ashadhi Ekadashi, the great pilgrimage of the Wari.', '**Across the South:** Vishnu temples hold special pujas and Harinama sankirtan.'] },
    ],
    faqs: [
      ['What is parana?', 'The act of breaking the Ekadashi fast, done on the Dwadashi morning, after sunrise and within the time given for the day. It is not done during the first quarter of Dwadashi (Hari Vasara).'],
      ['Why do some calendars give two dates for Ekadashi?', 'Smarta families keep the day on which Ekadashi is present at sunrise. Many Vaishnava traditions may keep the next day. The dates here follow the first rule, so confirm with your own tradition or temple.'],
      ['How many Ekadashis are there in a year?', 'There are 24, two in every lunar month. A year with an adhika month has 26.'],
      ['Can I drink water on Ekadashi?', 'Yes, on all Ekadashis except Nirjala Ekadashi, which is the strictest. Even then it is not meant for the unwell, the elderly, children or pregnant women.'],
      ['Which Ekadashi is the most important?', 'Many say Vaikuntha (Mukkoti) Ekadashi in the South, Nirjala Ekadashi, Devshayani, Prabodhini and Mokshada, which is also Gita Jayanti.'],
    ],
    reads: [{ href: '/ekadashi-fasting-rules-in-plain-words/', label: 'Ekadashi fasting rules in plain words' }, { href: '/ambarisha-and-durvasa-the-ekadashi-story-of-humility/', label: 'Ambarisha and Durvasa: the Ekadashi story of humility' }],
  },

  sankashti: {
    sections: [
      { h: 'What Sankashti Chaturthi is', p: ['Sankashti Chaturthi is the fourth tithi of the dark fortnight (Krishna paksha), observed every month in honour of Ganesha. Sankashti means relief from difficulty. Devotees fast through the day and break the fast after sighting the moon at night, then worship Ganesha. When it falls on a Tuesday it is called Angaraki Sankashti Chaturthi, and is considered especially meritorious.'] },
      { h: 'How to keep Sankashti Chaturthi', ol: [
        'Bathe early and keep a fast through the day, with fruit and milk if you need it.',
        'In the evening, set up a Ganesha idol or picture, and worship with durva grass, red flowers, modak and a lamp.',
        'Recite the Ganapati Atharvashirsha, the Sankashtanashana Stotram or a simple mantra such as *Om Gam Ganapataye Namah*.',
        'When the moon rises, offer water to it, and then take the Ganesha prasad.',
        'Break the fast with a light vegetarian meal.',
      ] },
      { h: 'What to keep ready', ul: ['A Ganesha idol or picture', '21 blades of durva grass and red flowers', 'Modak, coconut, fruit and sweets', 'A lamp, incense, camphor, kumkum and turmeric', 'A small vessel of water to offer to the Moon'] },
      { h: 'Why the Moon', p: ['A popular story says that Ganesha once cursed the Moon for laughing at him, and later relented. The Moon is therefore offered respect on this night. Whatever one makes of the story, the practical rhythm is a day of restraint ending with a calm look at the sky.'] },
      { h: 'A simple way to plan the day', ul: ['**Morning.** Bathe, light a lamp before Ganesha and take a quiet intention, such as "I will keep this fast with devotion today". Begin your fast in the way that suits your health.', '**Through the day.** Keep your mind light. A few rounds of *Om Gam Ganapataye Namah* help the hours pass gently.', '**Evening.** Clean the puja area and prepare the offerings before moonrise.', '**After moonrise.** Complete the puja, offer water to the Moon, and break the fast with prasad and a simple meal.', '**Before bed.** Thank Ganesha, put the lamp out safely and rest.'] },
      { h: 'Sankashti and Karwa Chauth', p: ['In the month before Deepavali, the Sankashti Chaturthi falls on the same day as Karwa Chauth in the North Indian calendar, because the two calendars name the months differently.'] },
      { h: 'Why moonrise matters', p: ['The fast is broken after the moon is seen, so the date is chosen by the day on which the Chaturthi tithi is present when the Moon rises that evening. This can differ from the day the tithi begins. Moonrise is a few minutes earlier or later in other cities, so check your own city before you break the fast.'] },
    ],
    faqs: [
      ['What is Sankashti Chaturthi also called?', 'It is also spelled Sankatahara Chaturthi and Sankashtahara Chaturthi, and in the north it is called Ganesh Chauth or Sakat Chauth. All refer to the Krishna paksha Chaturthi kept for Ganesha.'],
      ['Why is the date based on moonrise?', 'The fast is broken after moonrise, so the day is chosen on which the Chaturthi tithi is present when the moon rises. This can differ from the day the tithi begins.'],
      ['What is Angaraki Sankashti Chaturthi?', 'When Sankashti falls on a Tuesday (Angaraki) it is considered especially meritorious for Ganesha worship.'],
      ['Does the moonrise time change by city?', 'Yes. The time shown is for Hyderabad. Moonrise is a few minutes earlier or later elsewhere.'],
      ['Is Sankashti the same as Vinayaka Chaturthi?', 'No. Vinayaka Chaturthi is on the fourth day of the bright fortnight, and the big festival is in Bhadrapada. Sankashti is the fourth day of the dark fortnight, every month.'],
    ],
    reads: [{ href: '/ganapati-atharvashirsha-the-upanishad-of-ganesha/', label: 'Ganapati Atharvashirsha' }, { href: '/why-ganesha-is-worshipped-first/', label: 'Why Ganesha is worshipped first' }, { href: '/which-god-to-pray-to-for-obstacles-and-new-beginnings-ganesha/', label: 'Which god to pray to for obstacles and new beginnings' }],
  },

  pradosham: {
    sections: [
      { h: 'What Pradosham is', p: ['Pradosham falls on the thirteenth tithi (Trayodashi) of each fortnight, twice a month. The special time is the twilight around sunset, roughly an hour and a half before and after it. This is when Shiva is said to be most pleased with worship.'] },
      { h: 'The story of Pradosham', p: ['The Puranas say that during the churning of the ocean, a deadly poison called halahala rose up and threatened the world. Shiva drank it to save everyone, and Parvati held his throat so that it stayed there, turning it blue. This happened at twilight on a Trayodashi, and the gods are said to have worshipped him then. That is why Pradosham is observed at dusk.'] },
      { h: 'How to keep Pradosham', ol: [
        'Bathe in the evening, and keep a light fast through the day if you wish.',
        'Go to a Shiva temple before sunset, or set up a lingam at home.',
        'Offer water, milk, curd, honey and ghee in turn, then bilva leaves and flowers.',
        'Worship Nandi, Shiva\'s bull, and offer a little rice and jaggery.',
        'Chant *Om Namah Shivaya* or the Maha Mrityunjaya mantra, and light a lamp.',
        'Attend the Pradosham abhishekam and aarti in the temple if you can, then break the fast with the prasad.',
      ] },
      { h: 'Special Pradoshams', ul: ['**Soma Pradosham:** on a Monday, Shiva\'s day.', '**Bhauma Pradosham:** on a Tuesday.', '**Shani Pradosham:** on a Saturday, when many also worship Shani.', 'Each is considered especially auspicious.'] },
      { h: 'Where it is kept', ul: ['Shiva temples across the Telugu states and Tamil Nadu hold Pradosham abhishekam every fortnight.', 'Many Tamil temples, such as those at Chidambaram, Arunachala and Rameswaram, draw large evening crowds.'] },
    ],
    faqs: [
      ['What time is the Pradosham puja?', 'About an hour and a half before sunset to an hour and a half after it. Each page shows the window for Hyderabad.'],
      ['Why is the date based on sunset?', 'Because the worship is done at twilight, the day is chosen on which the Trayodashi tithi is present at sunset.'],
      ['What is Shani Pradosham?', 'A Pradosham that falls on a Saturday. It is considered especially auspicious for those troubled by Shani.'],
      ['Do I need to fast?', 'Many keep a light fast through the day. If you are unwell, a light meal is fine.'],
    ],
    reads: [{ href: '/monday-shiva-worship-panchakshari-and-pournami/', label: 'Monday Shiva worship' }, { href: '/om-namah-shivaya-meaning-of-the-panchakshari-mantra/', label: 'Om Namah Shivaya: meaning' }, { href: '/shiva-lingam-what-it-means-and-how-to-worship-it/', label: 'The Shiva lingam' }],
  },
};
