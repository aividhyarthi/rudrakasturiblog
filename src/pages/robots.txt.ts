export function GET() {
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: https://www.southwala.com/sitemap-index.xml\nSitemap: https://www.southwala.com/news-sitemap.xml\n`, { headers: { 'Content-Type': 'text/plain' } });
}
