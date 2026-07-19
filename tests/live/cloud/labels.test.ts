import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestIssue } from '../setup/fixtures';
import { runId } from '../helpers/naming';
import { waitFor } from '../helpers/poll';

/**
 * Live suite for the `labels` API (`getAllLabels`).
 *
 * A single read endpoint, but not a trivial one: labels are site-wide and derived state — nothing creates a label
 * directly, they come into existence by being put on an issue. So the suite makes one for real, then asserts it
 * surfaces in the global listing once indexing catches up, and that paging behaves.
 */

/** Jira labels may not contain whitespace; run-scoped so concurrent runs cannot collide. */
const LABEL = `jjs${runId()}label`.toLowerCase().replace(/[^a-z0-9]/g, '');

describe('Jira Cloud — labels.getAllLabels (live)', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;

  beforeAll(async () => {
    client = getCloudClient();

    // The label exists only as long as some issue carries it; creating the
    // issue is what brings it into the site-wide listing.
    const issue = await createTestIssue(client, tracker);

    await client.issues.editIssue({ issueIdOrKey: issue.key, fields: { labels: [LABEL] } });
  });

  afterAll(() => tracker.cleanup());

  it('returns a well-formed page of site-wide labels', async () => {
    const page = await client.labels.getAllLabels({ maxResults: 50 });

    expect(Array.isArray(page.values)).toBe(true);
    expect(typeof page.total).toBe('number');
    expect(typeof page.isLast).toBe('boolean');
    expect(page.startAt).toBe(0);
    // The page is a list of bare strings, not label objects — an easy thing to
    // get wrong when porting from an API that returns entities.
    for (const label of page.values ?? []) expect(typeof label).toBe('string');
  });

  it('eventually lists the label just put on an issue', async () => {
    // Labels are indexed asynchronously; polling is the honest way to assert it.
    const page = await waitFor(
      () => client.labels.getAllLabels({ maxResults: 1000 }),
      result => (result.values ?? []).includes(LABEL),
      { maxAttempts: 8 },
    );

    expect(page.values).toContain(LABEL);
  });

  it('honours maxResults and startAt', async () => {
    const first = await client.labels.getAllLabels({ maxResults: 2 });

    expect(first.values?.length).toBeLessThanOrEqual(2);
    expect(first.maxResults).toBe(2);

    if ((first.total ?? 0) > 2) {
      const second = await client.labels.getAllLabels({ maxResults: 2, startAt: 2 });

      expect(second.startAt).toBe(2);
      // A moved offset must return different rows, or paging is decorative.
      expect(second.values).not.toEqual(first.values);
    }
  });

  it('reports isLast truthfully at the end of the listing', async () => {
    const all = await client.labels.getAllLabels({ maxResults: 1000 });

    if ((all.total ?? 0) <= 1000) expect(all.isLast).toBe(true);
  });
});
