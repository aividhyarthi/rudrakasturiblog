// What the home page features on each weekday: the day's gods, the article about them, and a line that says why.
export const WEEKDAY_FEATURE: { name: string; gods: string; line: string; lead: string; more: string[] }[] = [
  { name: 'Sunday', gods: 'Surya', line: 'Sunday belongs to the Sun. Start the day with the Aditya Hridayam.', lead: 'aditya-hridayam-sunday-surya-worship-and-meaning', more: [] },
  { name: 'Monday', gods: 'Shiva', line: 'Monday is Shiva\'s day: the Panchakshari, a lamp and a simple fast.', lead: 'monday-shiva-worship-panchakshari-and-pournami', more: [] },
  { name: 'Tuesday', gods: 'Hanuman and Subramanya', line: 'Tuesday is for Hanuman and Subramanya: courage and a steady mind.', lead: 'hanuman-chalisa-meaning-first-five-verses', more: ['murugan-kartikeya-subramanya-one-god-many-names'] },
  { name: 'Wednesday', gods: 'Vishnu and Ganesha', line: 'Wednesday is for Vishnu and Ganesha: a clean start to any work.', lead: 'why-ganesha-is-worshipped-first', more: [] },
  { name: 'Thursday', gods: 'Dakshinamurthy, Dattatreya, Sai Baba and Raghavendra', line: 'Thursday is Guruvaram, the day to honour your teachers.', lead: 'thursday-is-for-the-guru-how-to-worship-on-guruvaram', more: [] },
  { name: 'Friday', gods: 'Lakshmi and Durga', line: 'Friday is for Lakshmi and Durga: prosperity and protection for the home.', lead: 'friday-lakshmi-worship-mantras-and-how-to-do-it', more: [] },
  { name: 'Saturday', gods: 'Venkateswara and Shani', line: 'Saturday is Balaji\'s day, and the day of Shani and Hanuman.', lead: 'saturday-venkateswara-shani-hanuman-how-to-worship', more: ['balaji-venkateswara-of-tirumala-seven-hills-one-lord'] },
];

/**
 * Each weekday has its god, and every week the home page features a different form of that god (a different goddess on each Friday, and so on).
 * `kw` are words looked for in article slugs; a god with no published article yet is skipped, so the rota never shows an empty week.
 */
export type RotaGod = { god: string; kw: string[]; line: string };
export const WEEKDAY_ROTA: RotaGod[][] = [
  /* Sunday */ [
    { god: 'Surya', kw: ['surya', 'aditya'], line: 'Sunday belongs to the Sun.' },
    { god: 'Rama', kw: ['rama-', 'ramayana', 'sita'], line: 'Sunday is also a day many families read about Rama.' },
    { god: 'Bhairava', kw: ['bhairava'], line: 'Kalabhairava is worshipped on Sundays by many.' },
    { god: 'Shankara', kw: ['shankara', 'advaita', 'upanishad'], line: 'A quiet Sunday for the teachings.' },
  ],
  /* Monday */ [
    { god: 'Shiva', kw: ['monday-shiva', 'who-is-shiva', 'shiva-lingam'], line: 'Monday is Shiva\'s day.' },
    { god: 'Nataraja', kw: ['nataraja', 'chidambaram'], line: 'Monday: Shiva as the Lord of the Dance.' },
    { god: 'Om Namah Shivaya', kw: ['om-namah-shivaya', 'panchakshari', 'rudram'], line: 'Monday: the five-letter prayer.' },
    { god: 'Dakshinamurthy', kw: ['dakshinamurthy'], line: 'Monday: Shiva as the silent teacher.' },
    { god: 'Mrityunjaya', kw: ['mrityunjaya'], line: 'Monday: the mantra for fear and illness.' },
    { god: 'Jyotirlingas', kw: ['jyotirlinga', 'srisailam', 'kedarnath', 'kashi'], line: 'Monday: the twelve great Shiva shrines.' },
    { god: 'Kalabhairava', kw: ['kalabhairava'], line: 'Monday: the guardian of time.' },
  ],
  /* Tuesday */ [
    { god: 'Hanuman', kw: ['hanuman-chalisa', 'hanuman-birth', 'hanuman-and'], line: 'Tuesday is for Hanuman.' },
    { god: 'Murugan', kw: ['murugan', 'kanda-shasti', 'arupadai', 'subramanya'], line: 'Tuesday is for Murugan.' },
    { god: 'Mangala', kw: ['mangala'], line: 'Tuesday belongs to Mars.' },
    { god: 'Narasimha', kw: ['narasimha'], line: 'Tuesday: the lord who protects.' },
    { god: 'Sundara Kanda', kw: ['sundara-kanda', 'jambavan'], line: 'Tuesday: Hanuman\'s great journey.' },
  ],
  /* Wednesday */ [
    { god: 'Ganesha', kw: ['ganesha', 'ganesh', 'ganapati', 'sankashti'], line: 'Wednesday is for Ganesha and Vishnu.' },
    { god: 'Vishnu', kw: ['vishnu', 'dashavatara', 'sahasranama', 'satyanarayana'], line: 'Wednesday: Vishnu in his many forms.' },
    { god: 'Vitthala', kw: ['vitthala', 'pandharpur'], line: 'Wednesday: the god who waits on a brick.' },
    { god: 'Krishna', kw: ['krishna', 'janmashtami', 'radha'], line: 'Wednesday: Krishna.' },
    { god: 'Budha', kw: ['budha'], line: 'Wednesday belongs to Mercury.' },
  ],
  /* Thursday */ [
    { god: 'Dakshinamurthy', kw: ['dakshinamurthy', 'thursday-is-for'], line: 'Thursday is Guruvaram, the day for teachers.' },
    { god: 'Sai Baba', kw: ['sai-baba', 'shirdi'], line: 'Thursday is Sai Baba\'s day.' },
    { god: 'Raghavendra', kw: ['raghavendra', 'mantralayam'], line: 'Thursday: Raghavendra Swami.' },
    { god: 'Dattatreya', kw: ['dattatreya'], line: 'Thursday: the guru of the gurus.' },
    { god: 'Guru', kw: ['guru-brihaspati', 'searching-for-a-guru'], line: 'Thursday belongs to Jupiter.' },
    { god: 'Shankaracharya', kw: ['shankaracharya', 'shankara'], line: 'Thursday: the great teacher of Advaita.' },
  ],
  /* Friday */ [
    { god: 'Lakshmi', kw: ['lakshmi', 'deepavali'], line: 'Friday is for Lakshmi.' },
    { god: 'Durga', kw: ['kanaka-durga', 'durga', 'navadurga'], line: 'Friday is also for Durga.' },
    { god: 'Saraswati', kw: ['saraswati', 'aksharabhyasam', 'basar'], line: 'Friday: the goddess of learning.' },
    { god: 'Annapurna', kw: ['annapurna'], line: 'Friday: the goddess who feeds the world.' },
    { god: 'Kamakshi', kw: ['kamakshi', 'kanchipuram'], line: 'Friday: Kamakshi of Kanchipuram.' },
    { god: 'Meenakshi', kw: ['meenakshi'], line: 'Friday: Meenakshi of Madurai.' },
    { god: 'Kali', kw: ['kali', 'dakshineswar', 'kamakhya'], line: 'Friday: the Mother in her fierce form.' },
    { god: 'Varahi', kw: ['varahi'], line: 'Friday: the goddess of the night.' },
    { god: 'Mahankali and Bonalu', kw: ['mahankali', 'bonalu', 'gangamma', 'renuka', 'yellamma'], line: 'Friday: the village mothers.' },
    { god: 'Chamundeshwari', kw: ['chamundeshwari', 'kodungallur', 'vaishno'], line: 'Friday: the goddess of the hill.' },
    { god: 'Shukra', kw: ['shukra'], line: 'Friday belongs to Venus.' },
  ],
  /* Saturday */ [
    { god: 'Venkateswara', kw: ['balaji', 'venkateswara', 'tirupati', 'tirumala'], line: 'Saturday is Balaji\'s day.' },
    { god: 'Shani', kw: ['shani', 'sade-sati'], line: 'Saturday is Shani\'s day.' },
    { god: 'Hanuman', kw: ['hanuman'], line: 'Saturday is also Hanuman\'s.' },
    { god: 'Ayyappa', kw: ['ayyappa', 'sabarimala'], line: 'Saturday: the lord of Sabarimala.' },
    { god: 'Narasimha', kw: ['narasimha', 'ahobilam', 'simhachalam'], line: 'Saturday: the lord of the hills.' },
  ],
];
