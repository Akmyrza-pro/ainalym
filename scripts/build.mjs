import { mkdir, writeFile, copyFile, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { siteConfig } from '../src/site.config.mjs';
import { layout } from '../src/layout.mjs';
import { homePage } from '../src/pages/home.mjs';
import { commercePages } from '../src/pages/commerce.mjs';
import { supportPages } from '../src/pages/support.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
const pages = [homePage, ...commercePages, ...supportPages];
// Configured CTA destinations are rendered into HTML so links also work without JS.
function configureButtons(html) {
  return html.replace(/<a\b[^>]*\bdata-action="(publish|view)"[^>]*>/g, (tag, action) => {
    const href = siteConfig.links[action].replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    return tag.replace(/href="[^"]*"/, `href="${href}"`);
  });
}
await mkdir(path.join(dist, 'assets'), { recursive: true });
for (const page of pages) await writeFile(path.join(dist, page.file), configureButtons(layout(page, siteConfig)), 'utf8');
await copyFile(path.join(root, 'src/styles.css'), path.join(dist, 'assets/styles.css'));
await copyFile(path.join(root, 'src/app.js'), path.join(dist, 'assets/app.js'));
await writeFile(path.join(dist, 'assets/config.js'), `window.AINALYM_CONFIG = ${JSON.stringify(siteConfig, null, 2)};\n`, 'utf8');
await cp(path.join(root, 'media-files'), path.join(dist, 'media-files'), { recursive: true });
const origin = siteConfig.baseUrl.replace(/\/$/, '');
await writeFile(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p => `  <url><loc>${origin}/${p.file}</loc></url>`).join('\n')}\n</urlset>\n`);
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`Built ${pages.length} pages in dist/. No framework or dependencies.`);
