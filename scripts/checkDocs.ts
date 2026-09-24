import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import type { ServerResponse } from 'node:http';
import { dirname, extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'docs', '.vitepress', 'dist');
const base = '/jira.js/';

const mimeTypes: Record<string, string> = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

function notFound(response: ServerResponse): void {
  response.writeHead(404, { 'content-type': 'text/plain' });
  response.end('not found');
}

const server = createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);

  if (!pathname.startsWith(base)) return notFound(response);

  const relative = pathname.slice(base.length);
  let file = join(dist, relative);

  if (pathname.endsWith('/')) file = join(file, 'index.html');
  else if (!extname(file)) file += '.html';

  const resolved = resolve(file);

  if (!resolved.startsWith(`${dist}${sep}`) || !existsSync(resolved) || !statSync(resolved).isFile()) {
    return notFound(response);
  }

  response.writeHead(200, { 'content-type': mimeTypes[extname(resolved)] ?? 'application/octet-stream' });
  createReadStream(resolved).pipe(response);
});

await new Promise<void>(done => server.listen(0, done));

const address = server.address();
if (address === null || typeof address === 'string') throw new Error('Documentation server did not start');

const origin = `http://127.0.0.1:${address.port}`;
const browser = await chromium.launch();
const page = await browser.newPage();
const failures: string[] = [];

async function verifyApiPage(): Promise<void> {
  await page.getByRole('heading', { name: /^jira\.js/ }).waitFor({ state: 'visible' });

  if ((await page.title()).startsWith('404')) throw new Error('VitePress rendered its 404 page');
}

async function check(name: string, run: () => Promise<void>): Promise<void> {
  try {
    await run();
    console.log(`  PASS  ${name}`);
  } catch (error) {
    failures.push(`${name}: ${String(error)}`);
    console.log(`  FAIL  ${name}`);
  }
}

const links = [
  { name: 'English navigation', page: '/', link: 'API' },
  { name: 'English landing action', page: '/', link: 'API Reference' },
  { name: 'English guide', page: '/guide/getting-started', link: 'API Reference' },
  { name: 'Russian navigation', page: '/ru/', link: 'API' },
  { name: 'Russian landing action', page: '/ru/', link: 'API Reference' },
  { name: 'Russian guide', page: '/ru/guide/getting-started', link: 'Справочник API' },
];

for (const link of links) {
  await check(link.name, async () => {
    await page.goto(`${origin}${base.slice(0, -1)}${link.page}`);
    await page.getByRole('link', { name: link.link, exact: true }).first().click();
    await page.waitForURL(`${origin}${base}api/`);
    await verifyApiPage();
  });
}

await check('direct API landing', async () => {
  await page.goto(`${origin}${base}api/`);
  await verifyApiPage();
});

await check('published deep link', async () => {
  await page.goto(`${origin}${base}api/functions/cloud.getAllDashboards.html`);
  await page.getByRole('heading', { name: 'Function: getAllDashboards()' }).waitFor({ state: 'visible' });
});

await check('API local search', async () => {
  await page.goto(`${origin}${base}`);
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByPlaceholder('Search').fill('getAllDashboards');
  await page
    .getByRole('link', { name: /getAllDashboards/ })
    .first()
    .click();
  await page.getByRole('heading', { name: 'Function: getAllDashboards()' }).waitFor({ state: 'visible' });
});

await browser.close();
server.close();

if (failures.length > 0) {
  console.error(`\n${failures.join('\n')}`);
  process.exit(1);
}

console.log(`\n✔ documentation: ${links.length + 3} checks passed in Chromium`);
