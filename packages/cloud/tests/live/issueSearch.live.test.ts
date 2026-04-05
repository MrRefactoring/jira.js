import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject, type LiveProjectHandle } from './helpers/liveTestState';
import { uid } from './helpers/namespace';

describe('issueSearch — live', () => {
  let live: LiveCloudClient;
  let handle: LiveProjectHandle;

  beforeAll(() => {
    live = createLiveCloudClient();
    handle = getInjectedLiveProject();
  });

  describe('searchAndReconsileIssuesUsingJql', () => {
    let issueIds: string[] = [];
    let issueKeys: string[] = [];

    beforeAll(async () => {
      const token = uid('sdk-search');
      const results = await Promise.all(
        ['a', 'b', 'c'].map(suffix =>
          live.client.issues.createIssue({
            fields: {
              project: { key: handle.projectKey },
              issuetype: { name: 'Story' },
              summary: `${token}-${suffix}`,
            },
          }),
        ),
      );

      issueIds = results.map(r => r.id);
      issueKeys = results.map(r => r.key);
    }, 120_000);

    afterAll(async () => {
      await Promise.all(issueIds.map(id => live.client.issues.deleteIssue({ issueIdOrKey: id }).catch(() => {})));
    }, 120_000);

    it('returned issues have id, key, and fields populated', async () => {
      const jql = `issue in (${issueKeys.join(', ')})`;

      const result = await live.client.issueSearch.searchAndReconsileIssuesUsingJql({
        jql,
        maxResults: 10,
        fields: ['summary'],
        reconcileIssues: issueIds.map(Number),
      });

      expect(Array.isArray(result.issues)).toBe(true);
      expect((result.issues ?? []).length).toBeGreaterThan(0);

      for (const issue of result.issues ?? []) {
        expect(typeof issue.id).toBe('string');
        expect(typeof issue.key).toBe('string');
        expect(issue.fields?.['summary']).toBeDefined();
      }
    });

    it('created issues appear in project JQL results when reconcileIssues is used for read-after-write consistency', async () => {
      const result = await live.client.issueSearch.searchAndReconsileIssuesUsingJql({
        jql: `project = "${handle.projectKey}" ORDER BY created DESC`,
        maxResults: 50,
        reconcileIssues: issueIds.map(Number),
      });

      const returnedIds = (result.issues ?? []).map(i => i.id);

      for (const id of issueIds) {
        expect(returnedIds).toContain(id);
      }
    });

    it('nextPageToken is present when more results exist than maxResults allows', async () => {
      // 3 issues created; requesting 2 at a time must yield a nextPageToken
      const jql = `issue in (${issueKeys.join(', ')})`;

      const result = await live.client.issueSearch.searchAndReconsileIssuesUsingJql({
        jql,
        maxResults: 2,
        reconcileIssues: issueIds.map(Number),
      });

      expect(typeof result.nextPageToken).toBe('string');
      expect(result.isLast).not.toBe(true);
    });

    it('page 2 via nextPageToken contains different issues than page 1', async () => {
      const jql = `issue in (${issueKeys.join(', ')})`;
      const reconcileIssues = issueIds.map(Number);

      const page1 = await live.client.issueSearch.searchAndReconsileIssuesUsingJql({
        jql,
        maxResults: 2,
        reconcileIssues,
      });

      expect(page1.nextPageToken).toBeDefined();

      const page2 = await live.client.issueSearch.searchAndReconsileIssuesUsingJql({
        jql,
        maxResults: 2,
        nextPageToken: page1.nextPageToken,
      });

      const page1Ids = (page1.issues ?? []).map(i => i.id);
      const page2Ids = (page2.issues ?? []).map(i => i.id);

      expect(page2Ids.length).toBeGreaterThan(0);
      expect(page1Ids.some(id => page2Ids.includes(id))).toBe(false);
    });

    it('isLast is true and nextPageToken is absent on the final page', async () => {
      // All 3 issues fit within maxResults: 10 — this is guaranteed to be the final page
      const jql = `issue in (${issueKeys.join(', ')})`;

      const result = await live.client.issueSearch.searchAndReconsileIssuesUsingJql({
        jql,
        maxResults: 10,
        reconcileIssues: issueIds.map(Number),
      });

      expect(result.isLast).toBe(true);
      expect(result.nextPageToken).toBeUndefined();
    });

    it('maxResults is respected — result length never exceeds the requested limit', async () => {
      const result = await live.client.issueSearch.searchAndReconsileIssuesUsingJql({
        jql: `project = "${handle.projectKey}"`,
        maxResults: 2,
        reconcileIssues: issueIds.map(Number),
      });

      expect((result.issues ?? []).length).toBeLessThanOrEqual(2);
    });
  });

  describe('countIssues', () => {
    it('count is a finite non-negative number', async () => {
      const result = await live.client.issueSearch.countIssues({
        jql: `project = "${handle.projectKey}"`,
      });

      expect(typeof result.count).toBe('number');
      expect(Number.isFinite(result.count)).toBe(true);
      expect(result.count).toBeGreaterThanOrEqual(0);
    });
  });

  describe('getIssuePickerResource', () => {
    it('sections have id and label fields', async () => {
      const result = await live.client.issueSearch.getIssuePickerResource({
        currentProjectId: handle.projectKey,
        query: '',
      });

      expect(Array.isArray(result.sections)).toBe(true);

      for (const section of result.sections ?? []) {
        expect(typeof section.id).toBe('string');
        expect(typeof section.label).toBe('string');
      }
    });

    it('each section contains an issues array', async () => {
      const result = await live.client.issueSearch.getIssuePickerResource({
        currentProjectId: handle.projectKey,
        query: '',
      });

      for (const section of result.sections ?? []) {
        expect(Array.isArray(section.issues)).toBe(true);
      }
    });
  });

  describe('matchIssues', () => {
    let matchIssueId: string;
    let matchIssueNumericId: number;

    beforeAll(async () => {
      const created = await live.client.issues.createIssue({
        fields: {
          project: { key: handle.projectKey },
          issuetype: { name: 'Story' },
          summary: uid('sdk-match-issues'),
        },
      });

      matchIssueId = created.id;
      matchIssueNumericId = parseInt(created.id, 10);
    }, 120_000);

    afterAll(async () => {
      await live.client.issues.deleteIssue({ issueIdOrKey: matchIssueId }).catch(() => {});
    }, 120_000);

    it('returns one match entry per JQL provided', async () => {
      const result = await live.client.issueSearch.matchIssues({
        issueIds: [matchIssueNumericId],
        jqls: [`project = "${handle.projectKey}"`],
      });

      expect(result.matches.length).toBe(1);
    });

    it('known issue matches its own project JQL filter', async () => {
      const result = await live.client.issueSearch.matchIssues({
        issueIds: [matchIssueNumericId],
        jqls: [`project = "${handle.projectKey}"`],
      });

      const match = result.matches[0]!;

      expect(match.matchedIssues).toContain(matchIssueNumericId);
      expect(match.errors).toHaveLength(0);
    });

    it('returns separate match entries for multiple JQLs and issue matches both', async () => {
      const result = await live.client.issueSearch.matchIssues({
        issueIds: [matchIssueNumericId],
        jqls: [
          `project = "${handle.projectKey}"`,
          `project = "${handle.projectKey}" ORDER BY created DESC`,
        ],
      });

      expect(result.matches.length).toBe(2);

      for (const match of result.matches) {
        expect(match.matchedIssues).toContain(matchIssueNumericId);
      }
    });
  });
});
