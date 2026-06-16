// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Helitec — Astro Configuration
 * Target  : Cloudflare Pages (static deployment)
 *
 * Build command  : npm run build
 * Output dir     : dist/
 * Node version   : >=18  (set NODE_VERSION=20 in Cloudflare Pages dashboard)
 *
 * ⚠️  ACCIÓN REQUERIDA: confirmar el dominio de producción correcto.
 *     Opciones: https://www.helitec.com  |  https://www.helitec.com.ve
 *     Impacta en: URL canónica, sitemap, og:url, link[rel=canonical].
 */
export default defineConfig({

  // ── URL canónica ────────────────────────────────────────────────────────
  // Usada por BaseLayout.astro (canonicalURL) y por @astrojs/sitemap.
  // ⚠️ Verificar con el cliente antes del deploy a producción.
  site: 'https://www.helitec.com',

  // ── Modo de salida ──────────────────────────────────────────────────────
  // Pure static — Cloudflare Pages sirve archivos desde dist/ sin adapter.
  output: 'static',

  // ── Integraciones ────────────────────────────────────────────────────────
  integrations: [
    // Genera /sitemap-index.xml + /sitemap-0.xml al hacer `astro build`.
    // Necesita `site` declarado arriba para generar URLs absolutas correctas.
    sitemap(),
  ],

  // ── Optimización de imágenes ─────────────────────────────────────────────
  // Activa el pipeline de Sharp: conversión automática a WebP/AVIF,
  // redimensionado, lazy-loading y srcset en el componente <Image />.
  // Requiere: npm install -D sharp  (ya incluido en package.json).
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    // Formato de salida predeterminado para <Image />
    defaultFormat: 'webp',
  },

  // ── Build ────────────────────────────────────────────────────────────────
  build: {
    // Mantiene /assets/ como directorio de salida para JS/CSS hashed.
    // Coherente con la convención public/assets/ del proyecto.
    assets: 'assets',

    // Inline de CSS < 4 KB directamente en <head>:
    // elimina round-trips de red para hojas de estilos pequeñas.
    inlineStylesheets: 'auto',
  },

  // ── Compresión HTML ──────────────────────────────────────────────────────
  // Minifica el HTML de salida: elimina whitespace, comentarios de HTML,
  // y colapsa atributos booleanos. Ahorra ~10–20% en peso de documentos.
  compressHtml: true,

  // ── Vite (bundler interno) ───────────────────────────────────────────────
  vite: {
    build: {
      cssMinify:            true,   // Minificación de CSS (ya default en Vite, explícito)
      reportCompressedSize: true,   // Reporte brotli/gzip en consola al hacer build
      rollupOptions: {
        output: {
          // Fusiona chunks más pequeños que 20KB en su importador.
          // Evita que el browser descubra 3-4 archivos JS micro en cadena.
          // Solo aplica a los chunks bundleados (Lenis + runtime Astro).
          experimentalMinChunkSize: 20_000,
        },
      },
    },
  },
});
