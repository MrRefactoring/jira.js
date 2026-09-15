import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError, isScopeError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient, getStrictCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestIssue, documentOf, TEST_PROJECT_KEY, type TestIssue } from '../setup/fixtures';
import { testName } from '../helpers/naming';
import { waitFor } from '../helpers/poll';

/**
 * The issue lifecycle, end to end.
 *
 * These assert the _contract_ rather than that a call resolves: that what the Zod models declare is what arrives, that
 * a mutation is observable on the next read, that query parameters have an effect, and that a deleted issue surfaces as
 * a typed `NotFoundError` rather than an untyped rejection.
 */
describe('issue lifecycle', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;
  let issue: TestIssue;

  beforeAll(async () => {
    client = getCloudClient();
    issue = await createTestIssue(client, tracker, { summary: testName('lifecycle') });
  });

  afterAll(() => tracker.cleanup());

  it('creates an issue shaped as CreatedIssue declares', () => {
    expect(issue.id).toMatch(/^\d+$/);
    expect(issue.key).toMatch(new RegExp(`^${TEST_PROJECT_KEY}-\\d+$`));
  });

  it('reads it back by key and by id alike', async () => {
    const byKey = await client.issues.getIssue({ issueIdOrKey: issue.key });
    const byId = await client.issues.getIssue({ issueIdOrKey: issue.id });

    expect(byKey.id).toBe(issue.id);
    expect(byId.key).toBe(issue.key);
  });

  it('makes an edit observable on the next read', async () => {
    const summary = testName('edited');

    await client.issues.editIssue({ issueIdOrKey: issue.key, fields: { summary } });

    const fetched = await client.issues.getIssue({ issueIdOrKey: issue.key });

    expect((fetched.fields as { summary?: string }).summary).toBe(summary);
  });

  it('honours the fields parameter instead of returning everything', async () => {
    const trimmed = await client.issues.getIssue({ issueIdOrKey: issue.key, fields: ['summary'] });
    const fields = Object.keys(trimmed.fields ?? {});

    expect(fields).toContain('summary');
    expect(fields.length).toBeLessThan(10);
  });

  it('finds the issue through JQL once indexing catches up', async () => {
    const found = await waitFor(
      () => client.issueSearch.searchIssues({ jql: `key = ${issue.key}`, maxResults: 1 }),
      result => (result.issues?.length ?? 0) > 0,
    );

    expect(found.issues?.[0]?.id).toBe(issue.id);
  });

  it('surfaces a missing issue as NotFoundError', async () => {
    const error = await client.issues
      .getIssue({ issueIdOrKey: `${TEST_PROJECT_KEY}-99999999` })
      .catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
    expect(isScopeError(error)).toBe(false);
  });

  it('rejects an unknown project with a typed error rather than a hang', async () => {
    const error = await client.issues
      .createIssue({
        fields: { project: { key: 'NOSUCHPROJ' }, issuetype: { name: 'Task' }, summary: 'x' },
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('reads an unresolved issue whose fields Jira reports as null without a schema mismatch', async () => {
    const fetched = await getStrictCloudClient().issues.getIssue({ issueIdOrKey: issue.key });

    expect(fetched.fields?.created).toBeInstanceOf(Date);
    expect(fetched.fields?.resolution).toBeNull();
    expect(fetched.fields?.resolutiondate).toBeNull();
    expect(fetched.fields?.duedate).toBeNull();
    expect(fetched.fields?.description).toBeNull();
  });

  it('keeps a null resolution date null rather than the epoch when the rest of the issue parses', async () => {
    const fetched = await getCloudClient().issues.getIssue({ issueIdOrKey: issue.key, fields: ['resolutiondate'] });

    expect(fetched.fields?.resolutiondate).toBeNull();
  });

  it('searches every field of an unresolved issue without a schema mismatch', async () => {
    const found = await waitFor(
      () =>
        getStrictCloudClient().issueSearch.searchIssues({ jql: `key = ${issue.key}`, fields: ['*all'], maxResults: 1 }),
      result => (result.issues?.length ?? 0) > 0,
    );

    expect(found.issues?.[0]?.fields?.resolution).toBeNull();
    expect(found.issues?.[0]?.fields?.created).toBeInstanceOf(Date);
  });

  it('writes wiki markup set through update and reads it back as a document', async () => {
    await client.issues.editIssue({ issueIdOrKey: issue.key, update: { description: [{ set: 'h2. From update' }] } });

    const fetched = await client.issues.getIssue({ issueIdOrKey: issue.key, fields: ['description'] });

    expect(fetched.fields?.description).toMatchObject({ type: 'doc', content: [{ type: 'heading' }] });
  });

  it('refuses wiki markup mixed with a document before either endpoint rejects it', async () => {
    const error = await client.issues
      .editIssue({ issueIdOrKey: issue.key, fields: { description: 'h1. markup', environment: documentOf('adf') } })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(TypeError);
  });
});
