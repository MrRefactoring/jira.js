import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestIssue, TEST_PROJECT_KEY, type TestIssue } from '../setup/fixtures';
import { testName } from '../helpers/naming';
import { waitFor } from '../helpers/poll';

/**
 * Live suite for the `issueSearch` API (`searchAndReconsileIssuesUsingJql`, `searchAndReconsileIssuesUsingJqlPost`,
 * `countIssues`, `matchIssues`, `getIssuePickerResource`).
 *
 * Search is the one part of Jira that is emphatically *not* read-your-write: an issue exists the moment it is created
 * but reaches the index a moment later. Every assertion that expects to find something therefore polls, and the suite
 * says so rather than sprinkling sleeps around.
 *
 * The other thing this file pins is the field-selection contract, which surprises people: without an explicit
 * `fields`, search answers with ids and nothing else.
 */
describe('Jira Cloud — issueSearch (live)', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;
  let issue: TestIssue;
  const summary = testName('searchable');

  beforeAll(async () => {
    client = getCloudClient();
    issue = await createTestIssue(client, tracker, { summary });

    // Everything downstream depends on the issue being indexed; wait for it once.
    await waitFor(
      () => client.issueSearch.searchAndReconsileIssuesUsingJql({ jql: `key = ${issue.key}` }),
      result => (result.issues?.length ?? 0) > 0,
      { maxAttempts: 10 },
    );
  });

  afterAll(() => tracker.cleanup());

  it('returns ids alone when no fields are requested', async () => {
    const result = await client.issueSearch.searchAndReconsileIssuesUsingJql({ jql: `key = ${issue.key}` });

    expect(result.issues).toHaveLength(1);
    expect(result.issues![0]!.id).toBe(issue.id);
    // No summary, no status — a caller that reads `fields.summary` here gets
    // `undefined` and usually blames the wrong thing.
    expect(result.issues![0]!.fields).toBeUndefined();
  });

  it('returns exactly the fields asked for', async () => {
    const result = await client.issueSearch.searchAndReconsileIssuesUsingJql({
      jql: `key = ${issue.key}`,
      fields: ['summary'],
    });

    const fields = result.issues![0]!.fields as Record<string, unknown>;

    expect(fields.summary).toBe(summary);
    expect(Object.keys(fields)).toEqual(['summary']);
  });

  it('finds the issue by text, not only by key', async () => {
    const result = await waitFor(
      () =>
        client.issueSearch.searchAndReconsileIssuesUsingJql({
          jql: `project = ${TEST_PROJECT_KEY} AND summary ~ "searchable"`,
          fields: ['summary'],
        }),
      found => (found.issues ?? []).some(row => row.id === issue.id),
      { maxAttempts: 10 },
    );

    expect(result.issues!.some(row => row.id === issue.id)).toBe(true);
  });

  it('pages with a token rather than an offset', async () => {
    const firstPage = await client.issueSearch.searchAndReconsileIssuesUsingJql({
      jql: `project = ${TEST_PROJECT_KEY} ORDER BY created DESC`,
      maxResults: 1,
    });

    expect(firstPage.issues).toHaveLength(1);

    // This API replaced `startAt` with an opaque cursor — an offset-based caller
    // ported from the old search endpoint silently re-reads page one forever.
    if (firstPage.nextPageToken) {
      const secondPage = await client.issueSearch.searchAndReconsileIssuesUsingJql({
        jql: `project = ${TEST_PROJECT_KEY} ORDER BY created DESC`,
        maxResults: 1,
        nextPageToken: firstPage.nextPageToken,
      });

      expect(secondPage.issues![0]!.id).not.toBe(firstPage.issues![0]!.id);
    }
  });

  it('counts matches without returning them', async () => {
    const count = await client.issueSearch.countIssues({ jql: `key = ${issue.key}` });

    expect(count.count).toBe(1);
  });

  it('tests issues against queries without running a search', async () => {
    const result = await client.issueSearch.matchIssues({
      issueIds: [Number(issue.id)],
      jqls: [`project = ${TEST_PROJECT_KEY}`, 'project = NOSUCHPROJECT'],
    });

    expect(result.matches).toHaveLength(2);
    // Matching is evaluated directly against the issue rather than through the
    // index, so it is immediate where search is not — the useful distinction.
    expect(result.matches![0]!.matchedIssues).toContain(Number(issue.id));
    // A query naming a project that does not exist is not an error here — it
    // simply matches nothing. The `errors` array stays empty, so calling code
    // cannot use it to tell "bad query" from "no match".
    expect(result.matches![1]!.matchedIssues ?? []).toEqual([]);
    expect(result.matches![1]!.errors ?? []).toEqual([]);
  });

  it('suggests issues through the picker', async () => {
    const picker = await client.issueSearch.getIssuePickerResource({ query: issue.key });

    expect(Array.isArray(picker.sections)).toBe(true);
    expect(picker.sections!.length).toBeGreaterThan(0);

    for (const section of picker.sections!) {
      expect(typeof section.label).toBe('string');
      expect(Array.isArray(section.issues ?? [])).toBe(true);
    }
  });

  it('accepts bare words as a text search rather than rejecting them', async () => {
    // Not a syntax error: unquoted free text is a valid JQL query meaning
    // "match this text". Callers who expect validation to catch a malformed
    // query get an empty result set instead, which is far harder to debug.
    const result = await client.issueSearch.searchAndReconsileIssuesUsingJql({ jql: 'this is not jql' });

    expect(result.issues).toEqual([]);
  });

  it('rejects genuinely malformed JQL with a typed 400', async () => {
    const error = await client.issueSearch
      .searchAndReconsileIssuesUsingJql({ jql: 'project = "unterminated' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBe(400);
  });

  it('answers an unmatched query with an empty result, not an error', async () => {
    const result = await client.issueSearch.searchAndReconsileIssuesUsingJql({
      jql: `project = ${TEST_PROJECT_KEY} AND summary ~ "nothingmatchesthisatall"`,
    });

    // Empty is a normal answer here; treating it as failure is a common bug in
    // calling code, and this is the assertion that documents the contract.
    expect(result.issues).toEqual([]);
  });
});
