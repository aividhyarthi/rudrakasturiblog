import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeUnpublishedLinks from './scripts/rehype-unpublished-links.mjs';

export default defineConfig({
  site: 'https://www.southwala.com',
  output: 'static',
  integrations: [sitemap()],
  markdown: { rehypePlugins: [rehypeUnpublishedLinks] },
});
