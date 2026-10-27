// Year calendar data shared by the /calendar/ page and the PDF builder: tithi, nakshatra and the vratam days for each date.
import { panchangFor } from './panchang';
import { allTithis } from './tithi';
import { allLunations } from './lunar';

// ---- special days ----
type Mark = { kind: string; label: string };
export const marks = new Map<string, Mark[]>();
const add = (k: string, m: Mark) => marks.set(k, [...(marks.get(k) ?? []), m]);
for (const o of allTithis('ekadashi')) add(o.key, { kind: 'ek', label: 'Ekadashi' });
for (const o of allTithis('pradosham')) add(o.key, { kind: 'pr', label: 'Pradosham' });
for (const o of allTithis('sankashti')) add(o.key, { kind: 'sk', label: 'Sankashti' });
for (const l of allLunations('amavasya')) add(l.key, { kind: 'am', label: 'Amavasya' });
for (const l of allLunations('pournami')) add(l.key, { kind: 'po', label: 'Pournami' });
export const names = new Map<string, string>();
for (const o of allTithis('ekadashi')) names.set(o.key, o.name);
for (const l of allLunations('pournami')) if (l.occasion) names.set(l.key, l.occasion);
for (const l of allLunations('amavasya')) if (l.occasion) names.set(l.key, l.occasion);

// ---- a verse for each month ----
export const VERSES = [
  ['2.47', 'karmaṇy evādhikāras te mā phaleṣu kadācana\nmā karma-phala-hetur bhūr mā te saṅgo \'stv akarmaṇi', 'Your right is to the action alone, never to its fruits. Do not make the fruit your motive, and do not cling to inaction.'],
  ['6.5', 'uddhared ātmanātmānaṁ nātmānam avasādayet\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ', 'Lift yourself by yourself. Do not let yourself sink. The self is its own friend and its own enemy.'],
  ['2.14', 'mātrā-sparśās tu kaunteya śītoṣṇa-sukha-duḥkha-dāḥ\nāgamāpāyino \'nityās tāṁs titikṣasva bhārata', 'Heat and cold, pleasure and pain come and go. They do not stay. Learn to bear them.'],
  ['4.7', 'yadā yadā hi dharmasya glānir bhavati bhārata\nabhyutthānam adharmasya tadātmānaṁ sṛjāmy aham', 'Whenever dharma fades and adharma rises, then I send myself forth.'],
  ['6.35', 'asaṁśayaṁ mahā-bāho mano durnigrahaṁ calam\nabhyāsena tu kaunteya vairāgyeṇa ca gṛhyate', 'The mind is restless and hard to hold. But it can be held by practice and by letting go.'],
  ['9.22', 'ananyāś cintayanto māṁ ye janāḥ paryupāsate\nteṣāṁ nityābhiyuktānāṁ yogakṣemaṁ vahāmy aham', 'To those who think of me alone and worship me steadily, I bring what they lack and keep what they have.'],
  ['12.13', 'adveṣṭā sarva-bhūtānāṁ maitraḥ karuṇa eva ca\nnirmamo nirahaṅkāraḥ sama-duḥkha-sukhaḥ kṣamī', 'Free from hatred toward all beings, friendly and compassionate, without possessiveness or ego, even in pain and pleasure, patient.'],
  ['2.22', 'vāsāṁsi jīrṇāni yathā vihāya navāni gṛhṇāti naro \'parāṇi\ntathā śarīrāṇi vihāya jīrṇāny anyāni saṁyāti navāni dehī', 'As one puts on new clothes and sets aside the worn ones, so the embodied self takes new bodies.'],
  ['9.26', 'patraṁ puṣpaṁ phalaṁ toyaṁ yo me bhaktyā prayacchati\ntad ahaṁ bhakty-upahṛtam aśnāmi prayatātmanaḥ', 'A leaf, a flower, a fruit, water: whoever offers it with devotion, I accept it.'],
  ['18.66', 'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja\nahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ', 'Let go of every burden and come to me for refuge. I will free you. Do not grieve.'],
  ['3.35', 'śreyān sva-dharmo viguṇaḥ para-dharmāt sv-anuṣṭhitāt\nsva-dharme nidhanaṁ śreyaḥ para-dharmo bhayāvahaḥ', 'Better your own path, even imperfectly walked, than another\'s path well walked.'],
  ['18.78', 'yatra yogeśvaraḥ kṛṣṇo yatra pārtho dhanur-dharaḥ\ntatra śrīr vijayo bhūtir dhruvā nītir matir mama', 'Where there is Krishna, the lord of yoga, and Arjuna with his bow, there are fortune, victory and steady wisdom.'],
];

const key = (y: number, m: number, d: number) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
export const SHORT_TITHI: Record<string, string> = { Prathama: 'Padyami', Dvitiya: 'Vidiya', Tritiya: 'Tadiya', Chaturthi: 'Chavithi', Panchami: 'Panchami', Shashthi: 'Shashthi', Saptami: 'Saptami', Ashtami: 'Ashtami', Navami: 'Navami', Dashami: 'Dashami', Ekadashi: 'Ekadashi', Dvadashi: 'Dvadashi', Trayodashi: 'Trayodashi', Chaturdashi: 'Chaturdashi', Pournami: 'Pournami', Purnima: 'Pournami', Amavasya: 'Amavasya' };

export type CalDay = { key: string; d: number; wd: number; tithi: string; paksha: string; nak: string; marks: { kind: string; label: string }[]; name?: string };
export function monthDays(year: number, m: number): CalDay[] {
  const n = new Date(Date.UTC(year, m, 0)).getUTCDate();
  const out: CalDay[] = [];
  for (let d = 1; d <= n; d++) {
    const k = key(year, m, d);
    const p = panchangFor({ y: year, m, d }, 'hyderabad');
    const t = p.tithi[0], nk = p.nakshatra[0];
    out.push({ key: k, d, wd: new Date(Date.UTC(year, m - 1, d)).getUTCDay(), tithi: SHORT_TITHI[t.name] ?? t.name, paksha: t.paksha ?? '', nak: nk.name, marks: marks.get(k) ?? [], name: names.get(k) });
  }
  return out;
}
