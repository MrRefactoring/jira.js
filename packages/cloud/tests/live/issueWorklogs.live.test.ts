import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Worklog } from '../../src/models';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject } from './helpers/liveTestState';
import { uid } from './helpers/namespace';
import { pollUntil } from './helpers/pollUntil';

describe('issueWorklogs — live', () => {
  let live: LiveCloudClient;
  let issueId: string;
  let issueKey: string;

  beforeAll(async () => {
    live = createLiveCloudClient();
    const handle = getInjectedLiveProject();

    const issue = await live.client.issues.createIssue({
      fields: {
        project: { key: handle.projectKey },
        issuetype: { name: 'Task' },
        summary: uid('sdk-worklog-issue'),
      },
    });

    issueId = issue.id;
    issueKey = issue.key!;
  }, 120_000);

  afterAll(async () => {
    await live.client.issues.deleteIssue({ issueIdOrKey: issueId }).catch(() => {});
  }, 120_000);

  describe('addWorklog', () => {
    let addedWorklog: Worklog;

    beforeAll(async () => {
      addedWorklog = await live.client.issueWorklogs.addWorklog({
        issueIdOrKey: issueKey,
        timeSpentSeconds: 3600,
        started: new Date().toISOString().replace('Z', '+0000'),
      });
    }, 120_000);

    afterAll(async () => {
      if (addedWorklog?.id) {
        await live.client.issueWorklogs.deleteWorklog({ issueIdOrKey: issueKey, id: addedWorklog.id }).catch(() => {});
      }
    }, 120_000);

    it('returns a Worklog with id and timeSpentSeconds matching the input', () => {
      expect(typeof addedWorklog.id).toBe('string');
      expect(addedWorklog.timeSpentSeconds).toBe(3600);
    });

    it('added worklog appears in getIssueWorklog result', async () => {
      const page = await live.client.issueWorklogs.getIssueWorklog({ issueIdOrKey: issueKey });
      const worklogIds = (page.worklogs ?? []).map(w => w.id);

      expect(worklogIds).toContain(addedWorklog.id);
    });

    it('added worklog is retrievable by id via getWorklog', async () => {
      const single = await live.client.issueWorklogs.getWorklog({
        issueIdOrKey: issueKey,
        id: addedWorklog.id!,
      });

      expect(single.id).toBe(addedWorklog.id);
      expect(single.timeSpentSeconds).toBe(3600);
    });
  });

  describe('updateWorklog', () => {
    let worklogId: string;

    beforeAll(async () => {
      const added = await live.client.issueWorklogs.addWorklog({
        issueIdOrKey: issueKey,
        timeSpentSeconds: 3600,
        started: new Date().toISOString().replace('Z', '+0000'),
      });

      worklogId = added.id!;
    }, 120_000);

    afterAll(async () => {
      await live.client.issueWorklogs.deleteWorklog({ issueIdOrKey: issueKey, id: worklogId }).catch(() => {});
    }, 120_000);

    it('returns a Worklog with the updated timeSpentSeconds', async () => {
      const updated = await live.client.issueWorklogs.updateWorklog({
        issueIdOrKey: issueKey,
        id: worklogId,
        timeSpentSeconds: 7200,
      });

      expect(updated.timeSpentSeconds).toBe(7200);
    });

    it('update is reflected when fetching the worklog individually', async () => {
      await live.client.issueWorklogs.updateWorklog({
        issueIdOrKey: issueKey,
        id: worklogId,
        timeSpentSeconds: 5400,
      });

      const fetched = await live.client.issueWorklogs.getWorklog({ issueIdOrKey: issueKey, id: worklogId });

      expect(fetched.timeSpentSeconds).toBe(5400);
    });
  });

  describe('deleteWorklog', () => {
    it('deleteWorklog returns void', async () => {
      const added = await live.client.issueWorklogs.addWorklog({
        issueIdOrKey: issueKey,
        timeSpentSeconds: 900,
        started: new Date().toISOString().replace('Z', '+0000'),
      });

      const result = await live.client.issueWorklogs.deleteWorklog({ issueIdOrKey: issueKey, id: added.id! });

      expect(result).toBeUndefined();
    });

    it('deleted worklog is absent from getIssueWorklog', async () => {
      const added = await live.client.issueWorklogs.addWorklog({
        issueIdOrKey: issueKey,
        timeSpentSeconds: 900,
        started: new Date().toISOString().replace('Z', '+0000'),
      });

      await live.client.issueWorklogs.deleteWorklog({ issueIdOrKey: issueKey, id: added.id! });

      const page = await live.client.issueWorklogs.getIssueWorklog({ issueIdOrKey: issueKey });
      const found = (page.worklogs ?? []).find(w => w.id === added.id);

      expect(found).toBeUndefined();
    });
  });

  describe('getWorklogsForIds', () => {
    let worklogId: string;
    let worklogNumericId: number;

    beforeAll(async () => {
      const added = await live.client.issueWorklogs.addWorklog({
        issueIdOrKey: issueKey,
        timeSpentSeconds: 1800,
        started: new Date().toISOString().replace('Z', '+0000'),
      });

      worklogId = added.id!;
      worklogNumericId = parseInt(added.id!, 10);
    }, 120_000);

    afterAll(async () => {
      await live.client.issueWorklogs.deleteWorklog({ issueIdOrKey: issueKey, id: worklogId }).catch(() => {});
    }, 120_000);

    it('returns one worklog entry for the given numeric ID', async () => {
      const result = await live.client.issueWorklogs.getWorklogsForIds({ ids: [worklogNumericId] });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);
    });

    it('returned worklog has matching id and timeSpentSeconds', async () => {
      const result = await live.client.issueWorklogs.getWorklogsForIds({ ids: [worklogNumericId] });

      const worklog = result[0]!;

      expect(worklog.id).toBe(worklogId);
      expect(worklog.timeSpentSeconds).toBe(1800);
    });
  });

  describe('getIdsOfWorklogsModifiedSince', () => {
    it('values entries have a numeric worklogId field', async () => {
      const result = await live.client.issueWorklogs.getIdsOfWorklogsModifiedSince({
        since: Date.now() - 86400000,
      });

      expect(Array.isArray(result.values)).toBe(true);

      for (const entry of result.values ?? []) {
        expect(typeof entry.worklogId).toBe('number');
      }
    });

    it('worklog created during this session appears in modified-since results', async () => {
      const sinceMs = Date.now();

      const added = await live.client.issueWorklogs.addWorklog({
        issueIdOrKey: issueKey,
        timeSpentSeconds: 300,
        started: new Date().toISOString().replace('Z', '+0000'),
      });

      const numericId = parseInt(added.id!, 10);

      try {
        const result = await pollUntil(
          () => live.client.issueWorklogs.getIdsOfWorklogsModifiedSince({ since: sinceMs }),
          r => (r.values ?? []).some(v => v.worklogId === numericId),
          { maxAttempts: 8, intervalMs: 2000, context: `worklogId=${numericId} in getIdsOfWorklogsModifiedSince` },
        );

        const found = (result.values ?? []).find(v => v.worklogId === numericId);

        expect(found?.worklogId).toBe(numericId);
      } finally {
        await live.client.issueWorklogs.deleteWorklog({ issueIdOrKey: issueKey, id: added.id! }).catch(() => {});
      }
    });
  });
});
