// Everyone is welcome: search engines, and the crawlers behind AI assistants and AI search. Nothing is blocked.
const SEARCH = ['Googlebot', 'Googlebot-Image', 'Googlebot-News', 'Bingbot', 'DuckDuckBot', 'Applebot', 'YandexBot', 'Baiduspider', 'Slurp'];
const AI = [
  'Google-Extended', 'GoogleOther', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User', 'Applebot-Extended', 'Meta-ExternalAgent', 'FacebookBot', 'Amazonbot', 'CCBot', 'cohere-ai',
  'DuckAssistBot', 'MistralAI-User', 'YouBot', 'Diffbot', 'Bytespider',
];
export function GET() {
  const body = [
    '# Everyone is welcome: search engines, AI assistants and AI search.',
    'User-agent: *',
    'Allow: /',
    '',
    '# Search engines',
    ...SEARCH.map((b) => `User-agent: ${b}`),
    'Allow: /',
    '',
    '# AI assistants, AI search and AI training crawlers',
    ...AI.map((b) => `User-agent: ${b}`),
    'Allow: /',
    '',
    '# For language models: a map of the site and the full text of every article',
    '# https://www.southwala.com/llms.txt',
    '# https://www.southwala.com/llms-full.txt',
    '',
    'Sitemap: https://www.southwala.com/sitemap-index.xml',
    'Sitemap: https://www.southwala.com/news-sitemap.xml',
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
