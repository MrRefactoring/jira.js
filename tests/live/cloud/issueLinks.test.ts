import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestIssue, type TestIssue } from '../setup/fixtures';

/**
 * Live suite for the `issueLinks` API (`linkIssues`, `getIssueLink`, `deleteIssueLink`).
 *
 * A complete create-read-delete cycle between two fixture issues. Safe: links exist only between issues this suite
 * created, and the delete half is exercised rather than left to teardown.
 *
 * The endpoint has a quirk that shapes the whole suite — `linkIssues` returns nothing useful, no id, no location. The
 * only way to reach the link you just made is to read it back off one of the issues, and every caller has to do the
 * same. That indirection is the thing worth pinning.
 */
describe('Jira Cloud — issueLinks (live)', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;
  let inward: TestIssue;
  let outward: TestIssue;
  let linkType: { name?: string; inward?: string; outward?: string };
  let linkId: string;

  beforeAll(async () => {
    client = getCloudClient();

    inward = await createTestIssue(client, tracker, { summary: 'link target' });
    outward = await createTestIssue(client, tracker, { summary: 'link source' });

    const types = await client.issueLinkTypes.getIssueLinkTypes();

    linkType = types.issueLinkTypes?.find(type => type.name === 'Relates') ?? types.issueLinkTypes![0]!;
  });

  afterAll(() => tracker.cleanup());

  it('creates a link and answers with an empty body', async () => {
    const result = await client.issueLinks.linkIssues({
      type: { name: linkType.name },
      inwardIssue: { key: inward.key },
      outwardIssue: { key: outward.key },
    });

    expect(result).toBeFalsy();
  });

  it('surfaces the link on both issues, in opposite directions', async () => {
    const source = await client.issues.getIssue({ issueIdOrKey: outward.key, fields: ['issuelinks'] });
    const target = await client.issues.getIssue({ issueIdOrKey: inward.key, fields: ['issuelinks'] });

    const sourceLinks = (source.fields as { issuelinks?: { id?: string; inwardIssue?: { key?: string } }[] }).issuelinks;
    const targetLinks = (target.fields as { issuelinks?: { id?: string; outwardIssue?: { key?: string } }[] })
      .issuelinks;

    expect(sourceLinks).toHaveLength(1);
    expect(targetLinks).toHaveLength(1);

    expect(sourceLinks![0]!.inwardIssue?.key).toBe(inward.key);
    expect(targetLinks![0]!.outwardIssue?.key).toBe(outward.key);
    expect(sourceLinks![0]!.id).toBe(targetLinks![0]!.id);

    linkId = sourceLinks![0]!.id!;
  });

  it('reads the link by id, carrying both endpoints and its type', async () => {
    const link = await client.issueLinks.getIssueLink({ linkId });

    expect(link.id).toBe(linkId);
    expect(link.inwardIssue?.key).toBe(inward.key);
    expect(link.outwardIssue?.key).toBe(outward.key);
    expect(link.type?.name).toBe(linkType.name);
  });

  it('removes the link from both issues when deleted', async () => {
    await client.issueLinks.deleteIssueLink({ linkId });

    const error = await client.issueLinks.getIssueLink({ linkId }).catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);

    const source = await client.issues.getIssue({ issueIdOrKey: outward.key, fields: ['issuelinks'] });

    expect((source.fields as { issuelinks?: unknown[] }).issuelinks).toEqual([]);
  });

  it('rejects a link to an issue that does not exist', async () => {
    const error = await client.issueLinks
      .linkIssues({
        type: { name: linkType.name },
        inwardIssue: { key: 'NOSUCH-1' },
        outwardIssue: { key: outward.key },
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('surfaces an unknown link id as a typed NotFoundError', async () => {
    const error = await client.issueLinks.getIssueLink({ linkId: '99999999' }).catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });
});
