/**
 * Runs the Service Management live suites and reports which of the shipped endpoints they actually called.
 *
 * One run covers two surfaces: both come from the same document and the same container, so counting them apart would
 * mean bringing that container up twice.
 *
 * The reporting itself is in scripts/lib/liveCoverage.ts, shared with the Data Center run.
 *
 * Runs on bare `node` — keep the types here erasable, as in scripts/checkBrowserSafe.ts.
 */
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
