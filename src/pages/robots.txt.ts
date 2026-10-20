export function GET() {
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: https://southwala.com/sitemap-index.xml\n`, { headers: { 'Content-Type': 'text/plain' } });
}
