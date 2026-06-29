/**
 * Render the social-preview card: docs/public/og-image.svg → docs/public/og-image.png
 * (1200×630, the Open Graph / Twitter standard size).
 *
 * The PNG is committed to the repo and referenced by the VitePress SEO head. This
 * script is run on demand (`pnpm run docs:og`) when the card design changes — it is
 * intentionally NOT part of `docs:build`.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(here, '..', 'docs', 'public');
const svgPath = resolve(publicDir, 'og-image.svg');
const pngPath = resolve(publicDir, 'og-image.png');

const svg = readFileSync(svgPath, 'utf8');

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  font: { loadSystemFonts: true },
});

const png = resvg.render().asPng();
writeFileSync(pngPath, png);

console.log(`[og-image] wrote ${pngPath} (${(png.length / 1024).toFixed(1)} KB)`);
