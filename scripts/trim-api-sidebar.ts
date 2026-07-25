
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sidebarPath = resolve(__dirname, '..', 'docs/api/typedoc-sidebar.json');

if (!existsSync(sidebarPath)) {
  console.error(`[trim-api-sidebar] not found: ${sidebarPath}. Run 'typedoc' first.`);
  process.exit(1);
}

const DROP = new Set(['models', 'parameters']);

interface SidebarEntry {
  text: string;
  items?: SidebarEntry[];
  [key: string]: unknown;
}

const sidebar = JSON.parse(readFileSync(sidebarPath, 'utf-8')) as SidebarEntry[];

let removed = 0;
for (const group of sidebar) {
  if (Array.isArray(group.items)) {
    const before = group.items.length;
    group.items = group.items.filter((item) => !DROP.has(item.text));
    removed += before - group.items.length;
  }
}

writeFileSync(sidebarPath, JSON.stringify(sidebar));

const sizeKb = (Buffer.byteLength(JSON.stringify(sidebar)) / 1024).toFixed(0);
console.log(
  `[trim-api-sidebar] dropped ${removed} models/parameters subgroup(s); sidebar now ${sizeKb} KB ` +
    `(groups: ${sidebar.map((g) => `${g.text}(${g.items?.length ?? 0})`).join(', ')})`,
);
