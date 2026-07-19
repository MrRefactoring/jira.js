import { beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

/**
 * Live suite for the `workflowStatuses` API (`getStatuses`, `getStatus`).
 *
 * Read-only by nature — this endpoint pair has no write half. What it is worth asserting is the join: every status
 * carries a `statusCategory`, and that nested object is what a caller actually renders. A status whose category failed
 * to deserialize would still typecheck, because the model marks it optional.
 */
describe('Jira Cloud — workflowStatuses.getStatuses (live)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('returns every status on the site, each joined to a status category', async () => {
    const statuses = await client.workflowStatuses.getStatuses();

    expect(statuses.length).toBeGreaterThan(0);

    for (const status of statuses) {
      expect(status.id).toMatch(/^\d+$/);
      expect(typeof status.name).toBe('string');
      expect(status.name).toBeTruthy();
      // The nested category is optional in the model but never absent in practice —
      // and code that colours a board depends on it being there.
      expect(status.statusCategory).toBeDefined();
      expect(typeof status.statusCategory?.key).toBe('string');
    }
  });

  it('covers the categories a board needs to render', async () => {
    const statuses = await client.workflowStatuses.getStatuses();
    const categories = new Set(statuses.map(status => status.statusCategory?.key));

    // A site with no `done` statuses at all would be broken, not merely unusual.
    expect(categories.has('done')).toBe(true);
  });

  it('resolves a single status by id and by name alike', async () => {
    const statuses = await client.workflowStatuses.getStatuses();
    const sample = statuses[0]!;

    const byId = await client.workflowStatuses.getStatus({ idOrName: sample.id! });
    const byName = await client.workflowStatuses.getStatus({ idOrName: sample.name! });

    expect(byId.id).toBe(sample.id);
    // Names are not globally unique across project-scoped statuses, so this
    // asserts resolution succeeds rather than that it lands on the same row.
    expect(byName.name).toBe(sample.name);
  });

  it('distinguishes global statuses from project-scoped ones', async () => {
    const statuses = await client.workflowStatuses.getStatuses();
    const scoped = statuses.filter(status => status.scope !== undefined);

    for (const status of scoped) {
      // `scope` is what tells a caller the status is not available site-wide;
      // the type allows any string, the API uses these two.
      expect(['GLOBAL', 'PROJECT']).toContain(status.scope?.type);
    }
  });

  it('surfaces an unknown status as a typed NotFoundError', async () => {
    const error = await client.workflowStatuses.getStatus({ idOrName: '99999999' }).catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });
});
