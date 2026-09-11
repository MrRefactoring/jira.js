import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { reportLiveCoverage } from './lib/liveCoverage.ts';
import { UNCOVERED } from '../tests/live/server/uncovered.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

reportLiveCoverage({
  label: 'Server',
  repoRoot: root,
  apiDirs: [join(root, 'src', 'server', 'api')],
  vitestConfig: 'vitest.config.server.ts',
  recordFile: 'server-coverage.txt',
  uncovered: UNCOVERED,
  urlPrefix: '/rest',
});
