import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { reportLiveCoverage } from './lib/liveCoverage.ts';
import { uncovered } from '../tests/live/jsm/uncovered.ts';
import { serviceDeskWasLicensed } from '../tests/live/jsm/setup/licenceMarker.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

reportLiveCoverage({
  label: 'Service Management',
  repoRoot: root,
  apiDirs: [join(root, 'src', 'assetsServer', 'api'), join(root, 'src', 'serviceDeskServer', 'api')],
  vitestConfig: 'vitest.config.jsm.ts',
  recordFile: 'jsm-coverage.txt',
  uncovered: () => uncovered(serviceDeskWasLicensed(root)),
  urlPrefix: '/rest',
});
