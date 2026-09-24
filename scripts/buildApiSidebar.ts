import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as {
  exports: Record<string, unknown>;
};

const sidebar = Object.keys(packageJson.exports)
  .filter(subpath => subpath !== './browser' && subpath !== './package.json')
  .map(subpath => {
    const name = subpath === '.' ? 'index' : subpath.slice(2).replaceAll('/', '_');
    const moduleFile = join(root, 'docs', 'api', 'modules', `${name}.md`);

    if (!existsSync(moduleFile)) throw new Error(`TypeDoc did not generate ${moduleFile}`);

    return {
      text: subpath === '.' ? 'jira.js' : subpath.slice(2),
      link: `/api/modules/${name}.md`,
    };
  });

writeFileSync(join(root, 'docs', 'api', 'typedoc-sidebar.json'), `${JSON.stringify(sidebar, null, 2)}\n`);
