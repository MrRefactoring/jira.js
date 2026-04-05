// ESM consumer smoke test — validates native ESM import semantics.
// Installed and run by scripts/smoke-consumers.mjs against packed tarballs.
import { createCloudClient } from '@jira.js/cloud';
import { createAgileClient } from '@jira.js/agile';
import { ApiError, createClient } from '@jira.js/base';

const checks = [];

// @jira.js/base — named exports are functions/classes
checks.push({ name: 'ApiError is a constructor', pass: typeof ApiError === 'function' });
checks.push({ name: 'createClient is a function', pass: typeof createClient === 'function' });

// @jira.js/cloud — createCloudClient is a function
checks.push({ name: 'createCloudClient is a function', pass: typeof createCloudClient === 'function' });

// @jira.js/agile — createAgileClient is a function
checks.push({ name: 'createAgileClient is a function', pass: typeof createAgileClient === 'function' });

// ApiError is instantiable and extends Error
const err = new ApiError('test', 404, 'Not Found', null);
checks.push({ name: 'ApiError.message is set', pass: err.message === 'test' });
checks.push({ name: 'ApiError.status is set', pass: err.status === 404 });
checks.push({ name: 'ApiError instanceof Error', pass: err instanceof Error });
checks.push({ name: 'ApiError instanceof ApiError', pass: err instanceof ApiError });

// createCloudClient returns an object with expected namespaces
const client = createCloudClient({ host: 'https://test.atlassian.net', auth: { email: 'x', apiToken: 'y' } });
checks.push({ name: 'client.issues is an object', pass: typeof client.issues === 'object' });
checks.push({ name: 'client.projects is an object', pass: typeof client.projects === 'object' });
checks.push({ name: 'client.users is an object', pass: typeof client.users === 'object' });
checks.push({ name: 'client.issues.getIssue is a function', pass: typeof client.issues.getIssue === 'function' });

// No default export (named-only package)
const cloudMod = await import('@jira.js/cloud');
checks.push({ name: '@jira.js/cloud has no default export', pass: cloudMod.default === undefined });

const failed = checks.filter(c => !c.pass);

for (const c of checks) {
  console.log(`  ${c.pass ? '✅' : '❌'} ${c.name}`);
}

if (failed.length > 0) {
  console.error(`\n  ${failed.length} check(s) failed`);
  process.exit(1);
}

console.log(`\n  All ${checks.length} ESM checks passed`);
