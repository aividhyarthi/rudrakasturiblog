// One-off exploration (second pass): table stats, terms of use, robots.
const UA = 'Mozilla/5.0 (compatible; SouthwalaBot/1.0; +https://southwala.com)';
const get = async (u) => { const r = await fetch(u, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30000) }); return { s: r.status, t: await r.text() }; };
const text = (h) => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

const rob = await get('https://www.myneta.info/robots.txt');
console.log('ROBOTS', rob.s, '\n' + rob.t.slice(0, 900));

const home = await get('https://www.myneta.info/AndhraPradesh2024/');
const terms = [...home.t.matchAll(/<a[^>]+href=["']?([^"' >]+)["']?[^>]*>\s*Terms of Use/gi)].map((m) => m[1]);
console.log('TERMS LINKS', terms);
for (const l of terms.slice(0, 1)) {
  const u = new URL(l, 'https://www.myneta.info/AndhraPradesh2024/').href;
  const tt = await get(u);
  console.log('TERMS', u, tt.s, '\n' + text(tt.t).slice(0, 3500));
}

for (const u of [
  'https://www.myneta.info/AndhraPradesh2024/index.php?action=show_winners&sort=default',
  'https://www.myneta.info/Telangana2023/index.php?action=show_winners&sort=default',
]) {
  const { s, t } = await get(u);
  console.log('\n=====', u, s);
  const tables = t.match(/<table[\s\S]*?<\/table>/gi) || [];
  tables.forEach((tb, i) => {
    const ids = new Set([...tb.matchAll(/candidate_id=(\d+)/g)].map((m) => m[1]));
    console.log(`table ${i}: len=${tb.length} rows=${(tb.match(/<tr/gi) || []).length} uniqueCandidates=${ids.size}`);
  });
  const all = new Set([...t.matchAll(/candidate_id=(\d+)/g)].map((m) => m[1]));
  console.log('unique candidate ids on page:', all.size);
  console.log('page text mentions:', text(t).match(/.{0,80}(winner|Showing|Page|analy[sz]ed|constituencies).{0,100}/gi)?.slice(0, 8));
  console.log('pagination links:', [...t.matchAll(/href=["']?([^"' >]*(?:page|start|offset)=[^"' >]*)/gi)].map((m) => m[1]).slice(0, 5));
}
