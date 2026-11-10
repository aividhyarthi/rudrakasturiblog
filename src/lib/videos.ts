// DevLok by Southwala: the YouTube channel's videos, shown as pages on the site. The list lives in src/data/videos.json.
import raw from '../data/videos.json';
import { GODS } from '../data/gods';

export type Video = { id: string; title: string; en: string; slug: string; dur: string; date?: string };
export const VIDEOS = raw as Video[];
export const CHANNEL_URL = 'https://www.youtube.com/@DevLokChannel';
export const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const videoTitle = (v: Video) => v.en || v.title;
export const teluguTitle = (v: Video) => (v.en && v.title !== v.en ? v.title.replace(/[A-Za-z][A-Za-z'’.\-?()]*/g, ' ').replace(/\s+/g, ' ').replace(/[\s|"”-]+$/, '').trim() : '');

// Which god a video belongs to. The first match wins, so the specific forms come before the general ones.
const DEITY: [RegExp, string][] = [
  [/narasimha|నరసింహ|నృసింహ/, 'narasimha'],
  [/ayyappa|అయ్యప్ప|sabarimala|శబరిమల|pallikattu|పల్లికట్టు/, 'ayyappa'],
  [/tripura|త్రిపుర|kamakhya|కామాఖ్య|chamunde|చాముండే/, 'durga'],
  [/rameswar|rameshwar|రామేశ్వర|nandikeshwara|nandikeswara|నందికేశ్వర|ardhanari|అర్ధనారీ|baidyanath|vaidyanath/, 'shiva'],
  [/subramanya|subrahmanya|subbarayudu|సుబ్రహ్మణ్య|సుబ్బరాయ|shanmukha|షణ్ముఖ|murugan|kartikeya|skanda/, 'murugan'],
  [/raghavendra|రాఘవేంద్ర/, 'raghavendra'],
  [/vittala|vitthala|విఠల/, 'vitthala'],
  [/padmavati|పద్మావతి/, 'venkateswara'],
  [/padmanabha|పద్మనాభ|ekadashi|ఏకాదశి|vishu/, 'vishnu'],
  [/bhairava|భైరవ|rudra|shiva|శివ|mrityunjay|మృత్యుంజయ|arunachala|అరుణాచల|veerabhadra|వీరభద్ర|dakshinamurthy|దక్షిణామూర్తి|srisailam|mallikarjuna|శ్రీశైల|bhimeshwara|భీమేశ్వర|agora|అగోరా|kailash/, 'shiva'],
  [/hanuman|హనుమ|anjaneya|ఆంజనేయ/, 'hanuman'],
  [/venkatesw|వేంకటేశ్వర|వెంకటేశ్వర|govinda|గోవింద|balaji|tirumala|తిరుమల/, 'venkateswara'],
  [/krishna|కృష్ణ|damodar|దామోదర|gopala|గోపాల/, 'krishna'],
  [/rama|రామ|raghava|రాఘవ/, 'rama'],
  [/vishnu|విష్ణు|narayana|నారాయణ|tulasi|తులసి/, 'vishnu'],
  [/shashti|షష్ఠి/, 'murugan'],
  [/ganesh|గణేశ|గణపతి|vinayaka|వినాయక/, 'ganesha'],
  [/datta|దత్త/, 'dattatreya'],
  [/sai ?baba|సాయి|shirdi|షిరిడి/, 'sai-baba'],
  [/surya|సూర్య|aditya|ఆదిత్య|chakshu|చాక్షుష/, 'surya'],
  [/shani|శని/, 'shani'],
  [/brihaspati|బృహస్పతి|shukra|శుక్ర|navagraha|నవగ్రహ|budha|chandra|rahu|ketu/, 'navagrahas'],
  [/kali(?! yuga)\b|kalika|కాళి|కాళీ|కాళికా|bhadrakali/, 'kali'],
  [/kamakshi|కామాక్షి/, 'kamakshi'],
  [/meenakshi|మీనాక్షి/, 'meenakshi'],
  [/annapurna|అన్నపూర్ణ/, 'annapurna'],
  [/saraswati|సరస్వతి|saraswathi/, 'saraswati'],
  [/lakshmi|లక్ష్మీ|kamala|కమలా|vasavi|వాసవి/, 'lakshmi'],
  [/durga|దుర్గ|devi|దేవి|amma|అమ్మ|matangi|మాతంగీ|bagalamukhi|బగళాముఖీ|katyayani|కాత్యాయనీ|bala |బాలా|lalita|లలితా|sattemma|సత్తెమ్మ|manasa|మనసా|santoshi|సంతోషి|anagha|అనఘా|goda|గోదా|ambha?|అంబా|mata\b|మాత\b|bhavani|భవాని|ananda lahari|ఆనంద లహరి|nagaraja|నాగరాజ|nagula|నాగుల/, 'durga'],
];
export const deityOf = (v: Video): string | null => {
  const t = `${v.en} ${v.title}`.toLowerCase();
  return DEITY.find(([re]) => re.test(t))?.[1] ?? null;
};
export const godName = (id: string) => GODS.find((g) => g.id === id)?.name ?? '';

export type Kind = { id: string; label: string; about: string };
const KINDS: [RegExp, Kind][] = [
  [/horoscope|rashi|రాశి|జ్యోతిష్య/, { id: 'horoscope', label: 'Horoscope', about: 'This is a yearly rashi phalalu video: what the planets suggest for one moon sign. Treat it as guidance for reflection and entertainment, not as a prediction, and see our own rashi pages for your daily and monthly reading.' }],
  [/ashtottara|astottara|ashtothram|namavali|namavalih|నామావళి|సహస్ర|sahasra/, { id: 'namavali', label: '108 names', about: 'An ashtottara shatanamavali is a list of 108 names of a deity. Each name is spoken with "namah" (I bow), and in a puja a flower or a pinch of kumkum is offered at every name. You can chant along, or simply listen as you light the lamp.' }],
  [/kavacham|kavacha|కవచం|panjara|పంజర/, { id: 'kavacham', label: 'Kavacham', about: 'A kavacham (or panjara) is a protective hymn, "armour of words", asking the deity to guard each part of the body and the household. It is usually recited in the morning, before leaving home.' }],
  [/ashtakam|ashtaka|అష్టకం|అష్టక/, { id: 'ashtakam', label: 'Ashtakam', about: 'An ashtakam is a hymn of eight verses. Short and easy to learn, it is one of the most common forms of daily prayer.' }],
  [/chalisa|చాలీసా/, { id: 'chalisa', label: 'Chalisa', about: 'A chalisa is a hymn of forty verses in praise of one deity. It is traditionally recited on the deity\'s special day of the week.' }],
  [/aarti|arati|ఆరతి|harathi|హారతి/, { id: 'aarti', label: 'Aarti', about: 'An aarti is the song sung while a lamp is waved before the deity at the close of a puja.' }],
  [/suprabhatam|సుప్రభాత/, { id: 'suprabhatam', label: 'Suprabhatam', about: 'A suprabhatam is the "good morning" hymn that wakes the deity at dawn, sung in temples before the first worship of the day.' }],
  [/bhajan|bajana|భజన|song|ragada|రగడ/, { id: 'bhajan', label: 'Bhajan', about: 'A bhajan is a devotional song, usually simple and repeated, sung by a group or alone in praise of a deity. It is the easiest prayer to join: sing along or just listen.' }],
  [/stotram|stotra|stava|స్తోత్ర|స్తవ|stuti|స్తుతి|namalu|నామాలు|mangalam|mangalastakam|మంగళం|dandakam|దండకం|lahari|లహరి/, { id: 'stotram', label: 'Stotram', about: 'A stotram is a hymn of praise in verse. It is chanted or listened to as part of daily prayer, and each tradition has its favourites for each deity and each day.' }],
  [/mantra|మంత్ర|namah shivaya|shivaya/, { id: 'mantra', label: 'Mantra', about: 'A mantra is a short sacred sound or phrase repeated with attention. Many people chant it 108 times with a mala, or play it in the background while they sit quietly.' }],
];
export const kindOf = (v: Video): Kind => {
  const t = `${v.en} ${v.title}`.toLowerCase();
  return KINDS.find(([re]) => re.test(t))?.[1] ?? { id: 'story', label: 'Story', about: 'A short explainer in Telugu from the DevLok channel, on a story, a custom or a temple tradition.' };
};
export const secs = (dur: string) => dur.split(':').reverse().reduce((s, p, i) => s + Number(p) * 60 ** i, 0);
