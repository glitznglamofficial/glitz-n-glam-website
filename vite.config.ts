import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';
import { getSeoForPath, injectSeoIntoHtml, ARTICLE_SEO_MAP } from './src/data/seoConfig';

function seoMetadataPlugin(): Plugin {
  return {
    name: 'seo-metadata-plugin',
    transformIndexHtml(html, ctx) {
      const reqUrl = ctx.originalUrl || ctx.path || '/';
      const seo = getSeoForPath(reqUrl);
      return injectSeoIntoHtml(html, seo);
    },
    closeBundle() {
      try {
        const distDir = path.resolve(__dirname, 'dist');
        const indexPath = path.join(distDir, 'index.html');
        if (fs.existsSync(indexPath)) {
          const baseHtml = fs.readFileSync(indexPath, 'utf8');
          for (const [slug, seo] of Object.entries(ARTICLE_SEO_MAP)) {
            const pageHtml = injectSeoIntoHtml(baseHtml, seo);

            // Create dist/<slug>/index.html
            const pageDir = path.join(distDir, slug);
            if (!fs.existsSync(pageDir)) {
              fs.mkdirSync(pageDir, { recursive: true });
            }
            fs.writeFileSync(path.join(pageDir, 'index.html'), pageHtml, 'utf8');

            // Also create dist/<slug>.html
            fs.writeFileSync(path.join(distDir, `${slug}.html`), pageHtml, 'utf8');
          }
        }
      } catch (err) {
        console.error('Error generating pre-rendered static SEO pages:', err);
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [seoMetadataPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

