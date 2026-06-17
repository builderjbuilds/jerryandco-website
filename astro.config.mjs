// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://www.jerryandcohomeservices.com';

export default defineConfig({
  site: SITE,
  adapter: cloudflare(),
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      serialize(item) {
        // Homepage
        if (item.url === SITE + '/' || item.url === SITE) {
          return { ...item, priority: 1.0, changefreq: 'weekly' };
        }
        // Town pages
        if (
          item.url.includes('/cabinet-refinishing-') &&
          !item.url.includes('/cabinet-refinishing-vs-replacement/')
        ) {
          return { ...item, priority: 0.8 };
        }
        // FAQ and process
        if (item.url.includes('/faq/') || item.url.includes('/our-process/')) {
          return { ...item, priority: 0.9 };
        }
        // Quiz and colors
        if (item.url.includes('/cabinet-quiz/') || item.url.includes('/colors/')) {
          return { ...item, priority: 0.5 };
        }
        // Everything else → 0.7 (default)
        return item;
      },
    }),
  ],
});
