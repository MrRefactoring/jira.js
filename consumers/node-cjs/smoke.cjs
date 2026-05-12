'use strict';
// CJS consumer smoke test — validates CommonJS require() semantics.
// Installed and run by scripts/smoke-consumers.mjs against packed tarballs.
const { createCloudClient } = require('@jira.js/cloud');
const { createAgileClient } = require('@jira.js/agile');
const { ApiError, createClient } = require('@jira.js/base');

const checks = [];

// Named exports resolve from CJS require()
checks.push({ name: 'ApiError is a constructor', pass: typeof ApiError === 'function' });
checks.push({ name: 'createClient is a function', pass: typeof createClient === 'function' });
checks.push({ name: 'createCloudClient is a function', pass: typeof createCloudClient === 'function' });
checks.push({ name: 'createAgileClient is a function', pass: typeof createAgileClient === 'function' });

// ApiError behaves correctly under CJS
const err = new ApiError('test', 500, 'Internal Server Error', { detail: 'boom' });
checks.push({ name: 'ApiError.message is set', pass: err.message === 'test' });
checks.push({ name: 'ApiError.status is set', pass: err.status === 500 });
checks.push({ name: 'ApiError.body is set', pass: err.body !== null });
checks.push({ name: 'ApiError instanceof Error', pass: err instanceof Error });

// createCloudClient works under CJS
const client = createCloudClient({ host: 'https://test.atlassian.net', auth: { email: 'x', apiToken: 'y' } });
checks.push({ name: 'client.issues is an object', pass: typeof client.issues === 'object' });
checks.push({ name: 'client.projects is an object', pass: typeof client.projects === 'object' });
checks.push({ name: 'client.issues.createIssue is a function', pass: typeof client.issues.createIssue === 'function' });

// CJS require returns the named exports object (no default wrapper)
const cloudMod = require('@jira.js/cloud');
checks.push({ name: 'require() returns named exports', pass: typeof cloudMod.createCloudClient === 'function' });

const baseMod = require('@jira.js/base');
checks.push({ name: 'base require() returns named exports', pass: typeof baseMod.ApiError === 'function' });

const failed = checks.filter(c => !c.pass);

for (const c of checks) {
  console.log(`  ${c.pass ? '✅' : '❌'} ${c.name}`);
}

if (failed.length > 0) {
  console.error(`\n  ${failed.length} check(s) failed`);
  process.exit(1);
}

console.log(`\n  All ${checks.length} CJS checks passed`);
