import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { reportLiveCoverage } from './lib/liveCoverage.ts';
import { UNCOVERED } from '../tests/live/jsm/uncovered.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

reportLiveCoverage({
  label: 'Service Management',
  repoRoot: root,
  apiDirs: [join(root, 'src', 'assetsServer', 'api'), join(root, 'src', 'serviceDeskServer', 'api')],
  vitestConfig: 'vitest.config.jsm.ts',
  recordFile: 'jsm-coverage.txt',
  uncovered: UNCOVERED,
  urlPrefix: '/rest',
});
