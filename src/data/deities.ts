// Deities, their days and traditional mantras with meanings (in our own words). Mantras are traditional texts.
export type Mantra = { name: string; sa: string; te?: string; meaning: string; use: string };
export type Deity = {
  id: string; name: string; te: string; about: string; day: string; offerings: string; naivedyam: string; colour: string;
  mantras: Mantra[]; temple?: { slug: string; name: string };
};

export const DEITIES: Deity[] = [
  { id: 'surya', name: 'Surya', te: 'సూర్యుడు', day: 'Sunday', colour: 'red or orange',
    about: 'Surya, the Sun, is the visible deity and the source of light and life. He is worshipped at sunrise with water offered to the rising Sun (arghya), and Sunday is his day. He is linked to health, vitality, confidence and respect for the father.',
    offerings: 'red flowers, a little red sandal paste, and a copper vessel of water for arghya at sunrise', naivedyam: 'jaggery pongal or wheat sweets',
    mantras: [
      { name: 'Surya name mantra', sa: 'Om Suryaya Namah', te: 'ఓం సూర్యాయ నమః', meaning: 'I bow to the Sun.', use: 'A simple mantra to repeat while offering arghya at sunrise.' },
      { name: 'Surya Gayatri', sa: 'Om Bhaskaraya Vidmahe Mahadyutikaraya Dhimahi, Tanno Adityah Prachodayat', meaning: 'We know the maker of the day, we meditate on the one of great radiance. May the Sun inspire our minds.', use: 'Chanted at sunrise, 3 or 11 times.' },
      { name: 'Surya stotra verse', sa: 'Japakusuma Sankasham Kashyapeyam Mahadyutim, Tamorim Sarvapapaghnam Pranatosmi Divakaram', meaning: 'I bow to Divakara, bright as the red japa flower, the great light born to Kashyapa, enemy of darkness and remover of sins.', use: 'The Surya verse of the Navagraha stotra, said on Sundays.' },
    ] },
  { id: 'shiva', name: 'Shiva', te: 'శివుడు', day: 'Monday', colour: 'white',
    about: 'Shiva is worshipped as the lord of yogis, the destroyer of ego and the compassionate protector. Monday is his day, as are Pradosham (the twilight of Trayodashi) and Maha Shivaratri. In Karthika Masam Mondays are especially sacred.',
    offerings: 'bilva leaves, white flowers, vibhuti and water or milk for abhishekam', naivedyam: 'fruits, milk or sweet pongal',
    temple: { slug: 'srisailam-mallikarjuna-temple', name: 'Srisailam' },
    mantras: [
      { name: 'Panchakshari', sa: 'Om Namah Shivaya', te: 'ఓం నమః శివాయ', meaning: 'I bow to Shiva. The five syllables na-mah-shi-va-ya stand for the five elements.', use: 'The most common Shiva mantra. Repeat 108 times on a mala.' },
      { name: 'Maha Mrityunjaya', sa: 'Om Tryambakam Yajamahe Sugandhim Pushtivardhanam, Urvarukamiva Bandhanan Mrityor Mukshiya Mamritat', meaning: 'We worship the three-eyed Lord, fragrant and nourishing to all. May he free us from the bondage of death as a ripe cucumber is freed from its vine, and not from immortality.', use: 'Chanted for health, courage and peace of mind, especially on Mondays.' },
      { name: 'Shiva Gayatri', sa: 'Om Tatpurushaya Vidmahe Mahadevaya Dhimahi, Tanno Rudrah Prachodayat', meaning: 'We know the supreme being, we meditate on the great God. May Rudra inspire us.', use: 'Chanted at dawn or dusk, 3 or 11 times.' },
    ] },
  { id: 'hanuman', name: 'Hanuman', te: 'హనుమంతుడు', day: 'Tuesday and Saturday', colour: 'red or orange',
    about: 'Hanuman, the devoted servant of Rama, stands for strength, courage and selfless service. Tuesday and Saturday are his days, and many people recite the Hanuman Chalisa on them. He is called on for courage and to remove fear.',
    offerings: 'sindoor with oil, red flowers, a betel leaf garland, and a lamp', naivedyam: 'jaggery, bananas or boondi',
    mantras: [
      { name: 'Hanuman name mantra', sa: 'Om Sri Hanumate Namah', te: 'ఓం శ్రీ హనుమతే నమః', meaning: 'I bow to the glorious Hanuman.', use: 'Repeat 11 or 108 times on Tuesdays and Saturdays.' },
      { name: 'Hanuman Gayatri', sa: 'Om Anjaneyaya Vidmahe Vayuputraya Dhimahi, Tanno Hanumat Prachodayat', meaning: 'We know Anjaneya, we meditate on the son of the Wind. May Hanuman inspire us.', use: 'Chanted for strength and fearlessness.' },
      { name: 'Hanuman dhyana verse', sa: 'Manojavam Marutatulyavegam Jitendriyam Buddhimatam Varishtham, Vatatmajam Vanarayutha Mukhyam Sri Ramadutam Sirasa Namami', meaning: 'I bow my head to the messenger of Rama: swift as the mind, fast as the wind, master of his senses, foremost among the wise, son of the Wind and chief of the vanara host.', use: 'A well-known verse of praise, said before the Chalisa or on its own.' },
    ] },
  { id: 'subramanya', name: 'Subramanya (Kartikeya)', te: 'సుబ్రహ్మణ్యేశ్వరుడు', day: 'Tuesday and Shashthi', colour: 'red',
    about: 'Subramanya, also called Kartikeya, Skanda and Murugan, is the commander of the gods and the son of Shiva and Parvati. He is worshipped on Tuesdays and on Shashthi, the sixth tithi, and is especially loved in the Telugu and Tamil country.',
    offerings: 'red flowers, milk, and a lamp', naivedyam: 'panakam, fruits or sweet pongal',
    mantras: [
      { name: 'Subramanya name mantra', sa: 'Om Saravanabhavaya Namah', te: 'ఓం శరవణభవాయ నమః', meaning: 'I bow to the one born in the reed forest (Saravana), another name of Kartikeya.', use: 'Repeat 108 times on Tuesdays and Shashthi.' },
      { name: 'Subramanya Gayatri', sa: 'Om Tatpurushaya Vidmahe Mahasenaya Dhimahi, Tanno Shanmukhah Prachodayat', meaning: 'We know the supreme being, we meditate on the great commander. May Shanmukha, the six-faced, inspire us.', use: 'Chanted for focus and courage.' },
    ] },
  { id: 'ganesha', name: 'Ganesha', te: 'గణపతి', day: 'Wednesday and Chaturthi', colour: 'green or red',
    about: 'Ganesha, the remover of obstacles, is worshipped first before any new beginning. Wednesday and Chaturthi are his days, with Sankashti (Krishna paksha) and Vinayaka (Shukla paksha) Chaturthi observed every month.',
    offerings: 'durva grass, red hibiscus flowers, and a lamp', naivedyam: 'modak, laddu or bananas',
    mantras: [
      { name: 'Ganesha name mantra', sa: 'Om Gam Ganapataye Namah', te: 'ఓం గం గణపతయే నమః', meaning: 'I bow to Ganapati. Gam is his seed sound.', use: 'Repeat 108 times, or 11 times before starting a task.' },
      { name: 'Vakratunda', sa: 'Vakratunda Mahakaya Suryakoti Samaprabha, Nirvighnam Kuru Me Deva Sarvakaryeshu Sarvada', meaning: 'O Lord of the curved trunk and mighty body, bright as a million suns, make all my undertakings free of obstacles, always.', use: 'Said before an exam, journey or new venture.' },
      { name: 'Shuklambaradharam', sa: 'Shuklambaradharam Vishnum Shashivarnam Chaturbhujam, Prasannavadanam Dhyayet Sarvavighnopashantaye', meaning: 'I meditate on the one in white garments, all-pervading, moon-coloured, four-armed and with a gracious face, for the calming of all obstacles.', use: 'The traditional opening verse for any puja.' },
    ] },
  { id: 'vishnu', name: 'Vishnu', te: 'విష్ణువు', day: 'Wednesday, Ekadashi and Thursday', colour: 'yellow',
    about: 'Vishnu is the preserver, worshipped as Narayana, Rama, Krishna and Venkateswara. Ekadashi, the eleventh tithi, is his day, as are Thursdays and Saturdays in many homes. The Vishnu Sahasranama and the Gita are the central texts of his devotion.',
    offerings: 'tulasi leaves, yellow flowers and a lamp', naivedyam: 'panakam, milk or sweet pongal',
    mantras: [
      { name: 'Narayana mantra', sa: 'Om Namo Narayanaya', te: 'ఓం నమో నారాయణాయ', meaning: 'I bow to Narayana, the refuge of all beings.', use: 'Repeat 108 times, especially on Ekadashi.' },
      { name: 'Vasudeva mantra', sa: 'Om Namo Bhagavate Vasudevaya', te: 'ఓం నమో భగవతే వాసుదేవాయ', meaning: 'I bow to Lord Vasudeva, who dwells in all beings.', use: 'The twelve-syllable mantra of Vishnu.' },
      { name: 'Shantakaram', sa: 'Shantakaram Bhujagashayanam Padmanabham Suresham, Vishvadharam Gaganasadrusham Meghavarnam Shubhangam, Lakshmikantam Kamalanayanam Yogibhirdhyanagamyam, Vande Vishnum Bhavabhayaharam Sarvalokaikanatham', meaning: 'I bow to Vishnu: peaceful, resting on the serpent, lotus-navelled, lord of the gods, support of the world, vast as the sky, dark as a cloud, beautiful of form, husband of Lakshmi, lotus-eyed, reached by yogis in meditation, remover of the fear of rebirth, the one lord of all worlds.', use: 'A verse of calm, said at dawn or before sleep.' },
    ] },
  { id: 'venkateswara', name: 'Venkateswara', te: 'వేంకటేశ్వరుడు', day: 'Saturday', colour: 'blue or yellow',
    about: 'Venkateswara, also called Srinivasa and Balaji, is Vishnu as worshipped at Tirumala. Saturday is his day in the Telugu country, and many families fast or visit the temple on Saturdays, especially in the month of Bhadrapada.',
    offerings: 'tulasi leaves, a lamp and flowers', naivedyam: 'sweet pongal, laddu or curd rice',
    temple: { slug: 'tirumala-venkateswara-temple', name: 'Tirumala' },
    mantras: [
      { name: 'Venkatesa name mantra', sa: 'Om Namo Venkatesaya', te: 'ఓం నమో వేంకటేశాయ', meaning: 'I bow to Lord Venkatesa.', use: 'Repeat 108 times on Saturdays.' },
      { name: 'Govinda namavali', sa: 'Srinivasa Govinda, Sri Venkatesa Govinda, Bhaktavatsala Govinda, Bhagavata Priya Govinda', meaning: 'Praise to Govinda as Srinivasa, Lord of Venkata hill, lover of his devotees, and one dear to those who sing of him.', use: 'The refrain sung by pilgrims on the Tirumala hills.' },
      { name: 'Suprabhatam opening', sa: 'Kausalya Supraja Rama Purva Sandhya Pravartate, Uttishtha Narashardula Kartavyam Daivam Ahnikam', meaning: 'O Rama, good son of Kausalya, the eastern dawn is breaking. Rise, tiger among men; the daily duty to the divine awaits.', use: 'The first verse of Venkatesa Suprabhatam, sung at dawn at Tirumala.' },
    ] },
  { id: 'lakshmi', name: 'Lakshmi', te: 'లక్ష్మీదేవి', day: 'Friday', colour: 'white, pink or red',
    about: 'Lakshmi is the goddess of wealth, grace and well-being, the consort of Vishnu. Friday is her day, and Varalakshmi Vratam, Deepavali and Dhanteras are her great festivals. Cleanliness and a lit lamp at dusk are central to her worship.',
    offerings: 'lotus or red flowers, kumkum, turmeric and a lamp', naivedyam: 'payasam, sweet pongal or fruits',
    mantras: [
      { name: 'Lakshmi name mantra', sa: 'Om Shreem Mahalakshmyai Namah', te: 'ఓం శ్రీం మహాలక్ష్మ్యై నమః', meaning: 'I bow to Mahalakshmi. Shreem is her seed sound.', use: 'Repeat 108 times on Fridays.' },
      { name: 'Lakshmi Gayatri', sa: 'Om Mahalakshmyai Cha Vidmahe Vishnupatnyai Cha Dhimahi, Tanno Lakshmih Prachodayat', meaning: 'We know Mahalakshmi, we meditate on the consort of Vishnu. May Lakshmi inspire us.', use: 'Chanted at dusk with a lit lamp.' },
      { name: 'Mahalakshmi Ashtakam', sa: 'Namastestu Mahamaye Shripithe Surapujite, Shankhachakragadahaste Mahalakshmi Namostu Te', meaning: 'Salutations to you, great Maya, seated on the sacred seat, worshipped by the gods, holding the conch, discus and mace. Salutations, Mahalakshmi.', use: 'The opening verse of the Mahalakshmi Ashtakam.' },
    ] },
  { id: 'durga', name: 'Durga', te: 'దుర్గాదేవి', day: 'Friday, Tuesday and Ashtami', colour: 'red',
    about: 'Durga, the Divine Mother, is the protector who removes fear and obstacles. Fridays, Tuesdays and the Ashtami and Navami tithis are hers, and the nine nights of Navaratri are her great festival. In the Telugu states she is worshipped at Kanaka Durga in Vijayawada.',
    offerings: 'red hibiscus, kumkum, a lamp and a red cloth if you wish', naivedyam: 'sweet pongal, jaggery or coconut',
    temple: { slug: 'kanaka-durga-temple-vijayawada', name: 'Kanaka Durga, Vijayawada' },
    mantras: [
      { name: 'Durga name mantra', sa: 'Om Dum Durgayai Namah', te: 'ఓం దుం దుర్గాయై నమః', meaning: 'I bow to Durga. Dum is her seed sound.', use: 'Repeat 108 times on Fridays, Tuesdays and Ashtami.' },
      { name: 'Sarvamangala', sa: 'Sarvamangala Mangalye Shive Sarvartha Sadhike, Sharanye Tryambake Gauri Narayani Namostute', meaning: 'Salutations to Narayani, the auspiciousness in all that is auspicious, Shiva’s consort, who grants all aims, the refuge of all, three-eyed and fair.', use: 'A verse from the Devi Mahatmya, said before beginning any task.' },
      { name: 'Ya Devi', sa: 'Ya Devi Sarvabhuteshu Shakti Rupena Samsthita, Namastasyai Namastasyai Namastasyai Namo Namah', meaning: 'To the Goddess who dwells in all beings as power, salutations, salutations, salutations again and again.', use: 'Chanted during Navaratri and in times of difficulty.' },
    ] },
  { id: 'saraswati', name: 'Saraswati', te: 'సరస్వతీదేవి', day: 'Thursday and Vasant Panchami', colour: 'white',
    about: 'Saraswati is the goddess of knowledge, music and speech. Students pray to her before exams, and children begin their first letters (aksharabhyasam) in her name on Vasant Panchami or Vijayadashami.',
    offerings: 'white flowers, a lamp and books or instruments placed at her feet', naivedyam: 'sweet pongal, milk or white sweets',
    mantras: [
      { name: 'Saraswati name mantra', sa: 'Om Aim Saraswatyai Namah', te: 'ఓం ఐం సరస్వత్యై నమః', meaning: 'I bow to Saraswati. Aim is her seed sound.', use: 'Repeat 108 times before study.' },
      { name: 'Vidyarambha', sa: 'Saraswati Namastubhyam Varade Kamarupini, Vidyarambham Karishyami Siddhir Bhavatu Me Sada', meaning: 'Salutations to Saraswati, giver of boons and taker of any form. I begin my study; may I always succeed.', use: 'Said before starting a lesson, an exam or a new course.' },
    ] },
  { id: 'dakshinamurthy', name: 'Dakshinamurthy and the Guru', te: 'దక్షిణామూర్తి', day: 'Thursday', colour: 'yellow',
    about: 'Dakshinamurthy is Shiva as the first teacher, teaching in silence, and Thursday is the day of the guru. People honour their teachers and the planet Guru (Jupiter) on Thursdays.',
    offerings: 'yellow flowers, a lamp and chana dal', naivedyam: 'chana dal, jaggery or yellow sweets',
    mantras: [
      { name: 'Guru shloka', sa: 'Gurur Brahma Gurur Vishnur Gurur Devo Maheshwarah, Guruh Sakshat Param Brahma Tasmai Shri Gurave Namah', meaning: 'The teacher is Brahma, Vishnu and Maheshwara. The teacher is the supreme reality itself. Salutations to that glorious teacher.', use: 'Said when you begin study, and when you thank a teacher.' },
      { name: 'Dakshinamurthy', sa: 'Om Namah Pranavarthaya Shuddhajnanaika Murtaye, Nirmalaya Prashantaya Dakshinamurtaye Namah', meaning: 'Salutations to Dakshinamurthy, the meaning of Om, the one form of pure knowledge, spotless and peaceful.', use: 'Chanted on Thursdays for clarity of mind.' },
    ] },
  { id: 'shani', name: 'Shani', te: 'శనీశ్వరుడు', day: 'Saturday', colour: 'black or dark blue',
    about: 'Shani (Saturn) is the planet of discipline and consequence. Saturday is his day. People who are going through Sade Sati, or who simply wish to live with more patience, light a sesame oil lamp and recite his mantra on Saturdays.',
    offerings: 'a sesame oil lamp, black sesame, blue or dark flowers', naivedyam: 'sesame rice or sesame sweets',
    mantras: [
      { name: 'Shani name mantra', sa: 'Om Sham Shanaishcharaya Namah', te: 'ఓం శం శనైశ్చరాయ నమః', meaning: 'I bow to Shani, the slow mover. Sham is his seed sound.', use: 'Repeat 108 times on Saturdays.' },
      { name: 'Shani stotra verse', sa: 'Neelanjana Samabhasam Raviputram Yamagrajam, Chhayamartanda Sambhutam Tam Namami Shanaishcharam', meaning: 'I bow to Shani, dark as blue collyrium, son of the Sun, elder brother of Yama, born of Chhaya and Martanda.', use: 'The Shani verse of the Navagraha stotra.' },
    ] },
  { id: 'rama', name: 'Rama', te: 'శ్రీరాముడు', day: 'Navami and Thursday', colour: 'yellow or blue',
    about: 'Rama is the seventh avatar of Vishnu and the ideal of dharma. Rama Navami, the ninth tithi of Chaitra, is his birthday, and the Ramayana is read in many homes. Bhadrachalam is the great Rama temple of the Telugu land.',
    offerings: 'tulasi, flowers and a lamp', naivedyam: 'panakam, vadapappu (soaked moong dal) and fruits',
    temple: { slug: 'bhadrachalam-sita-ramachandraswamy-temple', name: 'Bhadrachalam' },
    mantras: [
      { name: 'Rama name mantra', sa: 'Om Sri Ramaya Namah', te: 'ఓం శ్రీ రామాయ నమః', meaning: 'I bow to the glorious Rama.', use: 'Repeat 108 times.' },
      { name: 'Rama Rama Rameti', sa: 'Sri Rama Rama Rameti Rame Rame Manorame, Sahasranama Tattulyam Rama Nama Varanane', meaning: 'Saying “Rama, Rama”, I rest in Rama, who delights the heart. The name Rama equals a thousand names of the Lord.', use: 'Said at the end of the Vishnu Sahasranama.' },
    ] },
  { id: 'krishna', name: 'Krishna', te: 'శ్రీకృష్ణుడు', day: 'Wednesday and Ashtami', colour: 'yellow or blue',
    about: 'Krishna, the eighth avatar of Vishnu, is the teacher of the Bhagavad Gita. Krishna Janmashtami, on the dark Ashtami of Shravana, is his birthday.',
    offerings: 'tulasi, flowers, butter and a lamp', naivedyam: 'butter, fruits or sweets made of milk',
    mantras: [
      { name: 'Krishna verse', sa: 'Krishnaya Vasudevaya Haraye Paramatmane, Pranata Klesha Nashaya Govindaya Namo Namah', meaning: 'Salutations again and again to Krishna, son of Vasudeva, Hari, the Supreme Self, Govinda, who removes the sorrows of those who bow to him.', use: 'A verse of prayer from the Bhagavata tradition.' },
      { name: 'Maha mantra', sa: 'Hare Krishna Hare Krishna Krishna Krishna Hare Hare, Hare Rama Hare Rama Rama Rama Hare Hare', meaning: 'A call to Hari, Krishna and Rama, repeated as a prayer of devotion.', use: 'Sung in kirtan and repeated on a mala.' },
    ] },
  { id: 'narasimha', name: 'Narasimha', te: 'నరసింహస్వామి', day: 'Saturday and Chaturdashi', colour: 'orange or yellow',
    about: 'Narasimha, the man-lion, is the fourth avatar of Vishnu, who appeared to protect his devotee Prahlada. He is worshipped for protection and courage, and Yadagirigutta is a major Narasimha temple of Telangana.',
    offerings: 'tulasi, red flowers and a lamp', naivedyam: 'panakam or jaggery sweets',
    temple: { slug: 'yadagirigutta-lakshmi-narasimha-temple', name: 'Yadagirigutta' },
    mantras: [
      { name: 'Narasimha verse', sa: 'Ugram Viram Maha Vishnum Jvalantam Sarvatomukham, Nrisimham Bhishanam Bhadram Mrityumrityum Namamyaham', meaning: 'I bow to Narasimha, fierce and heroic, the great Vishnu, blazing and facing every direction, terrible yet gracious, the death of death.', use: 'Chanted for protection and courage, especially on Chaturdashi.' },
    ] },
];

export const NAVAGRAHA: { graha: string; te: string; day: string; sa: string; meaning: string }[] = [
  { graha: 'Surya', te: 'సూర్యుడు', day: 'Sunday', sa: 'Japakusuma Sankasham Kashyapeyam Mahadyutim, Tamorim Sarvapapaghnam Pranatosmi Divakaram', meaning: 'I bow to Divakara, bright as the red japa flower, son of Kashyapa, enemy of darkness and remover of sins.' },
  { graha: 'Chandra', te: 'చంద్రుడు', day: 'Monday', sa: 'Dadhi Shankha Tusharabham Kshiroarnava Sambhavam, Namami Shashinam Somam Shambhor Mukuta Bhushanam', meaning: 'I bow to Soma, the Moon, white as curd, conch and snow, born of the milk ocean, the jewel on Shiva’s crown.' },
  { graha: 'Mangala', te: 'కుజుడు', day: 'Tuesday', sa: 'Dharani Garbha Sambhutam Vidyut Kanti Samaprabham, Kumaram Shakti Hastam Cha Mangalam Pranamamyaham', meaning: 'I bow to Mangala, born of the Earth, shining like lightning, the youthful one who holds the spear.' },
  { graha: 'Budha', te: 'బుధుడు', day: 'Wednesday', sa: 'Priyangu Kalika Shyamam Rupenapratimam Budham, Saumyam Saumya Gunopetam Tam Budham Pranamamyaham', meaning: 'I bow to Budha, dark like the priyangu bud, of unmatched beauty, gentle and rich in gentle qualities.' },
  { graha: 'Guru', te: 'గురుడు', day: 'Thursday', sa: 'Devanam Cha Rishinam Cha Gurum Kanchana Sannibham, Buddhimantam Trilokesham Tam Namami Brihaspatim', meaning: 'I bow to Brihaspati, teacher of the gods and sages, golden in colour, wise and lord of the three worlds.' },
  { graha: 'Shukra', te: 'శుక్రుడు', day: 'Friday', sa: 'Himakunda Mrinalabham Daityanam Paramam Gurum, Sarvashastra Pravaktaram Bhargavam Pranamamyaham', meaning: 'I bow to Bhargava, white as snow, jasmine and lotus stem, supreme teacher of the daityas and expounder of all shastras.' },
  { graha: 'Shani', te: 'శని', day: 'Saturday', sa: 'Neelanjana Samabhasam Raviputram Yamagrajam, Chhayamartanda Sambhutam Tam Namami Shanaishcharam', meaning: 'I bow to Shani, dark as blue collyrium, son of the Sun, elder brother of Yama, born of Chhaya and Martanda.' },
  { graha: 'Rahu', te: 'రాహువు', day: 'Rahu Kalam', sa: 'Ardhakayam Mahaviryam Chandraditya Vimardanam, Simhika Garbha Sambhutam Tam Rahum Pranamamyaham', meaning: 'I bow to Rahu, half-bodied and mighty, who eclipses the Moon and Sun, born of Simhika.' },
  { graha: 'Ketu', te: 'కేతువు', day: 'Tuesday or Saturday', sa: 'Palasha Pushpa Sankasham Taraka Graha Mastakam, Raudram Raudratmakam Ghoram Tam Ketum Pranamamyaham', meaning: 'I bow to Ketu, red as the palasha flower, head of the star-planets, fierce and terrible.' },
];

/** Deity worshipped on each weekday (0 = Sunday). `alt` is an additional deity of the day. */
export const WEEKDAY_DEITY: { main: string; alt: string }[] = [
  { main: 'surya', alt: 'rama' }, { main: 'shiva', alt: 'durga' }, { main: 'hanuman', alt: 'subramanya' }, { main: 'vishnu', alt: 'ganesha' },
  { main: 'dakshinamurthy', alt: 'saraswati' }, { main: 'lakshmi', alt: 'durga' }, { main: 'venkateswara', alt: 'shani' },
];
/** Deity linked with a tithi, counted 1..15 in each fortnight. */
export const TITHI_DEITY: Record<number, string> = { 4: 'ganesha', 6: 'subramanya', 7: 'surya', 8: 'durga', 9: 'durga', 11: 'vishnu', 12: 'vishnu', 13: 'shiva', 14: 'shiva' };
/** Presiding deity of each nakshatra, in order from Ashwini. */
export const NAKSHATRA_DEITY = ['the Ashwini Kumaras', 'Yama', 'Agni', 'Brahma (Prajapati)', 'Soma', 'Rudra', 'Aditi', 'Brihaspati', 'the Nagas', 'the Pitris (ancestors)', 'Bhaga', 'Aryaman', 'Savitar', 'Vishwakarma', 'Vayu', 'Indra and Agni', 'Mitra', 'Indra', 'Nirriti', 'the Waters (Apas)', 'the Vishvedevas', 'Vishnu', 'the Vasus', 'Varuna', 'Aja Ekapada', 'Ahirbudhnya', 'Pushan'];

export const deity = (id: string) => DEITIES.find((d) => d.id === id)!;
