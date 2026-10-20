// One-off exploration: print what the public affidavit-summary pages look like.
const UA = 'Mozilla/5.0 (compatible; SouthwalaBot/1.0; +https://southwala.com)';
const urls = [
  'https://www.myneta.info/robots.txt',
  'https://www.myneta.info/AndhraPradesh2024/index.php?action=show_winners&sort=default',
  'https://www.myneta.info/Telangana2023/index.php?action=show_winners&sort=default',
  'https://www.myneta.info/LokSabha2024/index.php?action=show_winners&sort=default',
];
for (const u of urls) {
  try {
    const r = await fetch(u, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30000) });
    const t = await r.text();
    console.log('\n=====', u, r.status, t.length, 'bytes');
    if (u.endsWith('robots.txt')) { console.log(t.slice(0, 1500)); continue; }
    const m = t.match(/<table[^>]*>[\s\S]*?<\/table>/gi) || [];
    console.log('tables:', m.length);
    const big = m.sort((a, b) => b.length - a.length)[0] || '';
    console.log('--- biggest table, first 3500 chars:\n' + big.slice(0, 3500));
    const rows = (big.match(/<tr[\s\S]*?<\/tr>/gi) || []).length;
    console.log('rows in biggest table:', rows);
    const foot = t.match(/(licen[cs]e|copyright|reproduc|terms of use|creative commons)[^<]{0,200}/gi) || [];
    console.log('legal-ish text:', foot.slice(0, 6));
    console.log('candidate links sample:', (t.match(/candidate\.php\?candidate_id=\d+/g) || []).slice(0, 3));
  } catch (e) { console.log('\n=====', u, 'ERROR', String(e)); }
}
