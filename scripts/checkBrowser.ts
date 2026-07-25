/**
 * Runs the built package inside a real browser.
 *
 * The static gate (scripts/checkBrowserSafe.ts) proves nothing Node-only is *mentioned*. This proves the package
 * actually loads and works: modules evaluate, a request goes out with the right auth header, a failure arrives as a
 * typed error, and an attachment is encoded as multipart the server can parse.
 *
 * Both shipping shapes are covered, because they fail differently:
 *
 * - `dist/browser.js`, the self-contained bundle, which must work with no resolver at all;
 * - `dist/index.js`, which imports `zod` by bare specifier and stands in for a dependency-resolving CDN — here an
 *   import map does the resolving that esm.sh or jsDelivr would do.
 *
 * Runs on bare `node`; keep the types erasable.
 */
import { createServer } from 'node:http';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { createReadStream, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const MIME: Record<string, string> = {
  '.js': 'text/javascript',
  '.map': 'application/json',
  '.html': 'text/html',
};

type Recorded = { url: string; method: string; auth: string | undefined; contentType: string | undefined; body: string };

const recorded: Recorded[] = [];

function send(res: ServerResponse, status: number, body: string, type = 'application/json'): void {
  res.writeHead(status, {
    'content-type': type,
    'access-control-allow-origin': '*',
    'access-control-allow-headers': '*',
  });
  res.end(body);
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const url = new URL(req.url ?? '/', 'http://localhost');

  if (req.method === 'OPTIONS') return send(res, 204, '');

  if (!url.pathname.startsWith('/rest/')) {
    const file = url.pathname === '/' ? '/harness.html' : url.pathname;
    const onDisk = file === '/harness.html' ? join(root, 'scripts', 'browserHarness.html') : join(root, file);

    if (!existsSync(onDisk)) return send(res, 404, 'not found', 'text/plain');

    const ext = onDisk.slice(onDisk.lastIndexOf('.'));

    res.writeHead(200, { 'content-type': MIME[ext] ?? 'application/octet-stream' });

    return void createReadStream(onDisk).pipe(res);
  }

  const chunks: Uint8Array[] = [];

  req.on('data', chunk => chunks.push(chunk as Uint8Array));
  req.on('end', () => {
    recorded.push({
      url: url.pathname,
      method: req.method ?? '',
      auth: req.headers.authorization,
      contentType: req.headers['content-type'],
      body: Buffer.concat(chunks).toString('utf8'),
    });

    if (url.pathname.endsWith('/missing')) {
      return send(res, 404, JSON.stringify({ message: 'No page with id' }));
    }

    if (url.pathname.includes('/attachments')) {
      return send(res, 200, JSON.stringify([{ id: '1', filename: 'a.txt' }]));
    }

    send(res, 200, JSON.stringify({ id: '1', key: 'TEST-1', fields: {} }));
  });
});

await new Promise<void>(done => server.listen(0, () => done()));

const port = (server.address() as { port: number }).port;
const origin = `http://localhost:${port}`;

const browser = await chromium.launch();
const page = await browser.newPage();
const consoleErrors: string[] = [];

page.on('pageerror', error => consoleErrors.push(String(error)));

await page.goto(`${origin}/?port=${port}`);

const results = (await page.evaluate('window.__run()')) as { name: string; ok: boolean; detail: string }[];

await browser.close();
server.close();

let failed = 0;

for (const result of results) {
  console.log(`${result.ok ? '  PASS' : '  FAIL'}  ${result.name}${result.detail ? ` — ${result.detail}` : ''}`);
  if (!result.ok) failed += 1;
}

for (const error of consoleErrors) {
  console.log(`  FAIL  uncaught in page — ${error}`);
  failed += 1;
}

if (results.length === 0) {
  console.log('  FAIL  the harness reported no results at all');
  failed += 1;
}

console.log('');

if (failed > 0) {
  console.error(`✖ ${failed} browser check(s) failed`);
  process.exit(1);
}

console.log(`✔ browser: ${results.length} checks passed in Chromium`);
