export function GET() {
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: https://southwala.com/sitemap-index.xml\nSitemap: https://southwala.com/news-sitemap.xml\n`, { headers: { 'Content-Type': 'text/plain' } });
}
