// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://techrex.saitejamothukuri.com',
  trailingSlash: 'always',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap({
    serialize(item) {
      const url = item.url;
      if (url === 'https://techrex.saitejamothukuri.com/') {
        item.changefreq = 'weekly';
        item.priority = 1.0;
        item.lastmod = new Date().toISOString();
      } else if (url.includes('/videos')) {
        item.changefreq = 'weekly';
        item.priority = 0.9;
        item.lastmod = new Date().toISOString();
      } else if (url.includes('/resources')) {
        item.changefreq = 'monthly';
        item.priority = 0.8;
        item.lastmod = new Date().toISOString();
      } else if (url.includes('/about')) {
        item.changefreq = 'monthly';
        item.priority = 0.7;
        item.lastmod = new Date().toISOString();
      } else {
        item.changefreq = 'monthly';
        item.priority = 0.5;
        item.lastmod = new Date().toISOString();
      }
      return item;
    }
  })],
  adapter: vercel(),
});
