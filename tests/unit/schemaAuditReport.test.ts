import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

const workspaces: string[] = [];

function audit(entries: unknown[], reportOnly = true) {
  const root = mkdtempSync(join(tmpdir(), 'jira-audit-report-'));
  workspaces.push(root);
  const cache = join(root, 'node_modules', '.cache');
  mkdirSync(join(root, 'scripts'), { recursive: true });
  mkdirSync(cache, { recursive: true });
  copyFileSync(resolve('scripts/schemaAudit.ts'), join(root, 'scripts', 'schemaAudit.ts'));
  writeFileSync(join(cache, 'schema-audit.jsonl'), entries.map(entry => JSON.stringify(entry)).join('\n'));
  const bin = join(root, 'bin');
  mkdirSync(bin);
  writeFileSync(join(bin, 'npx'), '#!/usr/bin/env node\nprocess.exit(17);\n', { mode: 0o755 });
  const summary = join(root, 'summary.md');
  const result = spawnSync(
    process.execPath,
    [join(root, 'scripts', 'schemaAudit.ts'), ...(reportOnly ? ['--report-only'] : [])],
    {
      encoding: 'utf8',
      env: { ...process.env, PATH: `${bin}:${process.env.PATH}`, GITHUB_STEP_SUMMARY: summary },
    },
  );

  return {
    ...result,
    report: readFileSync(join(cache, 'schema-audit-report.md'), 'utf8'),
    summary: readFileSync(summary, 'utf8'),
  };
}

afterEach(() => {
  for (const workspace of workspaces.splice(0)) rmSync(workspace, { recursive: true, force: true });
});

describe('schema audit report output', () => {
  it('prints the complete report even when GitHub captures a step summary', () => {
    const result = audit([
      {
        kind: 'keys',
        endpoint: 'GET /rest/api/3/project/10001',
        path: 'values.0',
        keys: ['isLiveTemplate'],
        types: { isLiveTemplate: 'boolean' },
      },
      {
        kind: 'keys',
        endpoint: 'GET /rest/api/3/project/10002',
        path: 'values.1',
        keys: ['isLiveTemplate'],
        types: { isLiveTemplate: 'boolean' },
      },
    ]);

    expect(result.status).toBe(1);
    expect(result.stdout).toContain(result.report);
    expect(result.summary).toBe(result.report);
    expect(result.report).toContain('| `values.[].isLiveTemplate` | `boolean` | 1 | GET /rest/api/3/project/{id} |');
    expect(result.report).not.toContain('10001');
    expect(result.stderr).toContain('1 undocumented fields across 1 endpoints');
  });

  it('retains undocumented value diagnostics and a failing exit code', () => {
    const result = audit([
      { kind: 'value', endpoint: 'GET /rest/api/3/example', path: 'type', value: 'new', documented: ['old'] },
    ]);

    expect(result.status).toBe(1);
    expect(result.stdout).toContain(result.report);
    expect(result.report).toContain('| `type` | `new` | `old` | 1 |');
    expect(result.stderr).toContain('1 fields holding values their schema does not list');
  });

  it('saves the clean report and succeeds when there is no drift', () => {
    const result = audit([]);

    expect(result.status).toBe(0);
    expect(result.stdout).toContain(result.report);
    expect(result.report).toContain('No drift: every response matched the schema that describes it.');
    expect(result.stderr).toBe('');
  });

  it('preserves a failed live suite status after saving the report', () => {
    const result = audit([], false);

    expect(result.status).toBe(17);
    expect(result.stdout).toContain(result.report);
    expect(result.stderr).toContain('The audit suite itself failed');
  });
});
