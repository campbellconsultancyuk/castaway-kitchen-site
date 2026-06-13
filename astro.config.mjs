import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://castawaykitchen.co.uk',
  integrations: [sitemap()],
});