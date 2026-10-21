// Plain-language guidance for Ekadashi, Sankashti Chaturthi and Pradosham pages. Traditions differ by region and family.
import type { TithiKind } from '../lib/tithi';

export const EK_NOTE: Record<string, string> = {
  Papankusha: 'Papankusha Ekadashi falls in Ashwayuja, just after Vijayadashami. The name means the goad (ankusha) that restrains sin (papa). Devotees fast and worship Padmanabha, a form of Vishnu.',
  Prabodhini: 'Prabodhini (Utthana) Ekadashi is the day Vishnu is said to wake from the four-month rest that began on Devshayani Ekadashi. It falls in Karthika masam, and Tulasi Vivaha ceremonies begin from around this day.',
  Devshayani: 'Devshayani (Toli) Ekadashi is when Vishnu is said to begin his four-month rest, the period of Chaturmasya. In the Telugu states it is called Toli Ekadashi.',
  Nirjala: 'Nirjala Ekadashi is the strictest of all: no food and not even water. Tradition links it to Bhima, who could not fast on every Ekadashi and kept only this one. It is not meant for the unwell, the elderly, children or pregnant women, who can keep a lighter fast or simply pray.',
  Mokshada: 'Mokshada Ekadashi is celebrated as Gita Jayanti, the day on which Krishna is remembered to have spoken the Bhagavad Gita to Arjuna. Many read the Gita on this day.',
  'Pausha Putrada': 'This is Vaikuntha Ekadashi, also called Mukkoti Ekadashi, one of the most important Ekadashis in the South. Vishnu temples such as Tirumala and Srirangam open the special Vaikuntha Dwaram (the northern gate) for devotees, and many keep an all-night vigil.',
  Amalaki: 'On Amalaki Ekadashi the amla (gooseberry) tree is worshipped along with Vishnu. It falls shortly before Holi.',
  Shattila: 'On Shattila Ekadashi sesame (til) is used in six ways, in bathing, offering, charity, food and more, which is where the name comes from.',
  Parivartini: 'Parivartini Ekadashi is when Vishnu is said to turn on his other side during his four-month rest. It falls in Bhadrapada.',
  Utpanna: 'Utpanna Ekadashi is the day the goddess Ekadashi is said to have emerged from Vishnu. It is regarded as the origin of the Ekadashi fast, and many people who want to begin the practice start here.',
};

export const COPY: Record<TithiKind, { title: string; te: string; what: string; do: string[]; avoid: string[]; faq: [string, string][] }> = {
  ekadashi: {
    title: 'Ekadashi', te: 'ఏకాదశి',
    what: 'Ekadashi is the eleventh tithi of each fortnight, so it comes twice a month, once in the bright half (Shukla paksha) and once in the dark half (Krishna paksha). It is dedicated to Vishnu, and many families fast on this day and break the fast the next morning, which is called parana.',
    do: ['Wake early, bathe and light a lamp at the home shrine, then worship Vishnu with tulasi leaves.', 'Keep a fast in the way your family does: no grains and pulses, or only fruit and milk. A simple meal without grains is also accepted.', 'Read or listen to the Vishnu Sahasranama or the Bhagavad Gita.', 'Break the fast the next day within the parana time given below.'],
    avoid: ['Grains, rice and pulses are avoided by those who fast, and many also avoid onion, garlic and non-vegetarian food.', 'Daytime sleep is traditionally avoided.', 'Fasting is a personal choice. People who are unwell, elderly, pregnant, diabetic or children should not fast, and can pray and eat lightly instead.'],
    faq: [
      ['What is parana?', 'Parana is the act of breaking the Ekadashi fast, done on the Dwadashi morning, after sunrise and within the time given for the day. It is not done during the first quarter of Dwadashi (Hari Vasara).'],
      ['Why do some calendars give two dates for Ekadashi?', 'Smarta families keep the day on which Ekadashi is present at sunrise. Many Vaishnava traditions may keep the next day. The dates here follow the first rule, so confirm with your own tradition or temple.'],
      ['How many Ekadashis are there in a year?', 'There are 24, two in every lunar month. A year with an adhika month has 26.'],
    ],
  },
  sankashti: {
    title: 'Sankashti Chaturthi', te: 'సంకష్టహర చతుర్థి',
    what: 'Sankashti Chaturthi is the fourth tithi of the dark fortnight (Krishna paksha), observed every month in honour of Ganesha. Sankashti means relief from difficulty. Devotees fast through the day and break the fast after sighting the moon at night, then worship Ganesha.',
    do: ['Keep a fast through the day, with fruit and milk if you need it, and break it after moonrise.', 'Worship Ganesha in the evening with durva grass, modak and red flowers.', 'Recite the Ganesha Atharvashirsha or the Sankashtanashana Stotram.', 'See the moon, offer water to it and then take the evening meal.'],
    avoid: ['Fasting is voluntary. Those who are unwell, elderly, pregnant or children can pray and eat lightly.', 'Many avoid onion, garlic and non-vegetarian food on this day.'],
    faq: [
      ['Why is the date based on moonrise?', 'The fast is broken after moonrise, so the day is chosen on which the Chaturthi tithi is present when the moon rises that evening. This can differ from the day the tithi begins.'],
      ['What is Angaraki Sankashti Chaturthi?', 'When Sankashti falls on a Tuesday (Angaraki) it is considered especially meritorious for Ganesha worship.'],
      ['Does the moonrise time change by city?', 'Yes. The time shown is for Hyderabad. Moonrise is a few minutes earlier or later elsewhere, so check your city before breaking the fast.'],
    ],
  },
  pradosham: {
    title: 'Pradosham', te: 'ప్రదోషం',
    what: 'Pradosham is observed on the thirteenth tithi (Trayodashi) of each fortnight, twice a month, in the evening twilight around sunset. It is dedicated to Shiva, and devotees visit a Shiva temple during the pradosha period for the abhishekam and a lamp.',
    do: ['Bathe, keep a light fast during the day if you can, and go to a Shiva temple in the evening.', 'Offer bilva leaves, water or milk to the Shivalinga, and see the Nandi abhishekam at temples that perform it.', 'Recite the Shiva Panchakshari mantra, the Rudram or the Shiva Stotras.', 'Light a lamp at home at sunset.'],
    avoid: ['Fasting is voluntary. Those who are unwell, elderly, pregnant or children can pray and eat lightly.', 'Many avoid non-vegetarian food on this day.'],
    faq: [
      ['What time is Pradosham puja?', 'The pradosha period is the twilight around sunset. We show a window of one and a half hours before and after sunset for Hyderabad. Temples usually hold the puja around that time.'],
      ['Why does the date sometimes differ?', 'The date is the day on which Trayodashi is present at sunset. A tithi can start in the afternoon of one day and end the next, so check with your temple.'],
      ['What are Soma and Shani Pradosham?', 'When Pradosham falls on a Monday (Soma) or a Saturday (Shani), many devotees consider it especially meritorious.'],
    ],
  },
};

export const WEEKDAY_NOTE: Record<string, string> = {
  pradosham1: 'It falls on a Monday, which makes it Soma Pradosham, a day many devotees keep for Shiva with extra devotion.',
  pradosham2: 'It falls on a Tuesday, called Bhauma Pradosham, which tradition links with relief from debts and worries.',
  pradosham6: 'It falls on a Saturday, which makes it Shani Pradosham. Many devotees combine it with prayers for relief from the difficulties of Saturn.',
  sankashti2: 'It falls on a Tuesday, which makes it Angaraki Sankashti Chaturthi, considered especially meritorious for Ganesha worship.',
};
