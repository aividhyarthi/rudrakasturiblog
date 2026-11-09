import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeUnpublishedLinks from './scripts/rehype-unpublished-links.mjs';

// One clock for the whole build. A build takes minutes, and stories go live on the hour: if each page read the clock
// separately, the home page could lead with a story whose own page and image were never built (a 404 and a blank image).
if (process.argv.includes('build') && !process.env.SW_NOW) process.env.SW_NOW = new Date().toISOString();

export default defineConfig({
  site: 'https://www.southwala.com',
  output: 'static',
  build: { inlineStylesheets: 'always' },
  integrations: [sitemap()],
  markdown: { rehypePlugins: [rehypeUnpublishedLinks] },
});
