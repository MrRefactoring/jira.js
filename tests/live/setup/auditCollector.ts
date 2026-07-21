import { appendFileSync } from 'node:fs';
import { afterAll } from 'vitest';
import { collectedSchemaDrift } from '#/core/schemaAudit';

/**
 * Carries the audit's findings out of the worker.
 *
 * `core/` ships to browsers and so cannot touch the filesystem — it only accumulates findings in memory. This runs
 * test-side, where `node:fs` is fine, and appends whatever the worker has gathered after each file.
 *
 * Everything is written every time and deduplicated when the report is built. Vitest may re-evaluate a setup file per
 * test file, which would reset any "already written" cursor kept here and silently drop findings; duplicates in a
 * JSONL file are free to remove, dropped findings are not recoverable.
 */
const OUTPUT = process.env.AUDIT_SCHEMAS_OUTPUT;

afterAll(() => {
  if (!OUTPUT) return;

  const drift = collectedSchemaDrift();

  if (drift.length === 0) return;

  appendFileSync(OUTPUT, `${drift.map(entry => JSON.stringify(entry)).join('\n')}\n`, 'utf8');
});
