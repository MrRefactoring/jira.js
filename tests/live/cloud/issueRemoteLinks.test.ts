import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient, rawRequest } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestIssue, TEST_PROJECT_KEY, type TestIssue } from '../setup/fixtures';
import { runId } from '../helpers/naming';

/**
 * Live suite for the `issueRemoteLinks` API (`createOrUpdateRemoteIssueLink`, `getRemoteIssueLinks`,
 * `getRemoteIssueLinkById`, `updateRemoteIssueLink`, `deleteRemoteIssueLinkById`,
 * `deleteRemoteIssueLinkByGlobalId`).
 *
 * A full write cycle against a fixture issue. Remote links point at things outside Jira — a URL and a label — so
 * nothing is created anywhere else and the whole cycle is contained.
 *
 * The behaviour that makes this API unusual, and that only a live site demonstrates: one endpoint both creates and
 * updates, and which of the two happens is decided by `globalId`. Reusing a `globalId` overwrites; omitting it makes
 * a new link every time. That is a silent difference between "my retry was safe" and "I now have six links".
 *
 * Both delete endpoints are currently unreachable through the client — see the test that pins it. Cleanup therefore
 * goes over raw HTTP, so the rest of the suite still gets real coverage.
 */
describe('Jira Cloud — issueRemoteLinks (live)', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;
  let issue: TestIssue;
  let linkId: string;
  const globalId = `jjs-${runId()}`;

  beforeAll(async () => {
    client = getCloudClient();
    issue = await createTestIssue(client, tracker);
  });

  afterAll(() => tracker.cleanup());

  it('reports a fresh issue as having no remote links', async () => {
    const links = await client.issueRemoteLinks.getRemoteIssueLinks({ issueIdOrKey: issue.key });

    expect(links).toEqual([]);
  });

  it('creates a link pointing outside Jira', async () => {
    const created = await client.issueRemoteLinks.createOrUpdateRemoteIssueLink({
      issueIdOrKey: issue.key,
      globalId,
      relationship: 'documented by',
      object: { url: 'https://example.com/spec', title: 'The specification' },
    });

    expect(created.id).toBeTruthy();
    expect(created.self).toMatch(/^https:\/\//);

    linkId = String(created.id);
  });

  it('reads the link back with its remote object intact', async () => {
    const link = await client.issueRemoteLinks.getRemoteIssueLinkById({ issueIdOrKey: issue.key, linkId });

    expect(link.globalId).toBe(globalId);
    expect(link.relationship).toBe('documented by');
    expect(link.object?.url).toBe('https://example.com/spec');
    expect(link.object?.title).toBe('The specification');
  });

  it('updates in place when the same globalId is reused', async () => {
    await client.issueRemoteLinks.createOrUpdateRemoteIssueLink({
      issueIdOrKey: issue.key,
      globalId,
      relationship: 'documented by',
      object: { url: 'https://example.com/spec-v2', title: 'The specification, revised' },
    });

    const links = await client.issueRemoteLinks.getRemoteIssueLinks({ issueIdOrKey: issue.key });

    // Still one link, not two — this is what makes a retry with a stable
    // globalId safe, and it is the entire reason the field exists.
    expect(links).toHaveLength(1);
    expect(links[0]!.object?.url).toBe('https://example.com/spec-v2');
  });

  it('creates a second link when no globalId is given', async () => {
    const created = await client.issueRemoteLinks.createOrUpdateRemoteIssueLink({
      issueIdOrKey: issue.key,
      object: { url: 'https://example.com/other', title: 'Something else' },
    });

    const links = await client.issueRemoteLinks.getRemoteIssueLinks({ issueIdOrKey: issue.key });

    // The mirror image of the previous test: without a globalId there is nothing
    // to match on, so every call appends. A retrying caller accumulates links.
    expect(links).toHaveLength(2);

    tracker.defer(async () => {
      await rawRequest(`/rest/api/3/issue/${issue.key}/remotelink/${created.id}`, { method: 'DELETE' });
    });
  });

  it('filters the listing by globalId', async () => {
    const filtered = await client.issueRemoteLinks.getRemoteIssueLinks({ issueIdOrKey: issue.key, globalId });

    // Filtering by globalId returns the single link rather than a list — the
    // response shape changes with the parameter, which the types do not convey.
    expect(filtered).toBeDefined();
    expect(JSON.stringify(filtered)).toContain(globalId);
  });

  it('cannot delete through the client — a known defect, not a Jira limitation', async () => {
    const error = await client.issueRemoteLinks
      .deleteRemoteIssueLinkByGlobalId({ issueIdOrKey: issue.key, globalId })
      .catch((e: unknown) => e);

    // 415. This endpoint demands a `Content-Type` header even though a DELETE
    // carries no body, and `core` only sets one when there *is* a body. The
    // same request with `content-type: application/json` is accepted — which is
    // what the next test does, and what proves the fault is on this side.
    // Same root cause as the `addWatcher` defect, different symptom.
    expect((error as { status?: number }).status).toBe(415);
  });

  it('removes a link by its globalId', async () => {
    const response = await rawRequest(
      `/rest/api/3/issue/${issue.key}/remotelink?globalId=${encodeURIComponent(globalId)}`,
      { method: 'DELETE' },
    );

    expect(response.status).toBe(204);

    const error = await client.issueRemoteLinks
      .getRemoteIssueLinkById({ issueIdOrKey: issue.key, linkId })
      .catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);

    const remaining = await client.issueRemoteLinks.getRemoteIssueLinks({ issueIdOrKey: issue.key });

    expect(remaining).toHaveLength(1);
  });

  it('surfaces remote links of a missing issue as a typed NotFoundError', async () => {
    const error = await client.issueRemoteLinks
      .getRemoteIssueLinks({ issueIdOrKey: `${TEST_PROJECT_KEY}-99999999` })
      .catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });
});
