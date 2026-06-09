// @ts-check
import { defineConfig } from 'astro/config';

/**
 * Helitec — Astro Configuration
 * Target: Cloudflare Pages (static deployment)
 *
 * Build command : npm run build
 * Output dir    : dist
 * Node version  : >=18 (set NODE_VERSION=20 in Cloudflare dashboard)
 */
export default defineConfig({
  site: 'https://www.helitec.com',

  // Pure static site — no SSR adapter needed for Cloudflare Pages
  output: 'static',

  build: {
    // Keep assets under /assets/ (matches our public/assets/ convention)
    assets: 'assets',
    // Inline small stylesheets (<4 KB) for faster first paint
    inlineStylesheets: 'auto',
  },
});
