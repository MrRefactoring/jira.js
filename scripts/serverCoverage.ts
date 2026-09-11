/**
 * Runs the Data Center live suites and reports which of the shipped endpoints they actually called.
 *
 * The reporting itself is in scripts/lib/liveCoverage.ts, shared with the Service Management run.
 *
 * Runs on bare `node` — keep the types here erasable, as in scripts/checkBrowserSafe.ts.
 */
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
