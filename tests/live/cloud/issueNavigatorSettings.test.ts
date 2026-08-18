import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

/**
 * Live suite for the `issueNavigatorSettings` API (`getIssueNavigatorDefaultColumns`,
 * `setIssueNavigatorDefaultColumns`).
 *
 * The one endpoint here writes site-wide state: these are the columns every account sees in the issue navigator until
 * it sets its own. The suite therefore reads the current list first and restores it in `afterAll`, so the site ends
 * the run exactly as it started it.
 *
 * Worth its own file because the write is easy to get wrong in a way that looks like a transport fault. Atlassian
 * declares the body only under a wildcard media type, which generated a shapeless object; Jira answers a bare array
 * with 400 and a form-encoded body with 415, and accepts exactly `{ columns: [...] }` as JSON.
 */
describe('Jira Cloud — issueNavigatorSettings (live)', () => {
  let client: CloudClient;
  let original: string[] = [];

  beforeAll(async () => {
    client = getCloudClient();

    const columns = await client.issueNavigatorSettings.getIssueNavigatorDefaultColumns();

    original = columns.map(column => column.value!).filter(Boolean);

    expect(original.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    if (original.length > 0) {
      await client.issueNavigatorSettings.setIssueNavigatorDefaultColumns({ columns: original });
    }
  });

  it('lists the default columns, each carrying a value and a label', async () => {
    const columns = await client.issueNavigatorSettings.getIssueNavigatorDefaultColumns();

    expect(columns.length).toBeGreaterThan(0);

    for (const column of columns) {
      expect(typeof column.value).toBe('string');
      expect(typeof column.label).toBe('string');
    }
  });

  it('replaces the default columns and reads the replacement back', async () => {
    await client.issueNavigatorSettings.setIssueNavigatorDefaultColumns({ columns: ['summary', 'status'] });

    const columns = await client.issueNavigatorSettings.getIssueNavigatorDefaultColumns();

    expect(columns.map(column => column.value)).toEqual(['summary', 'status']);
  });

  it('rejects a column that does not exist', async () => {
    const error = await client.issueNavigatorSettings
      .setIssueNavigatorDefaultColumns({ columns: ['nosuchcolumn'] })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
