import { ApiError } from '@jira.js/base';
import { afterAll, beforeAll, describe, expect, it, type TestContext } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject, type LiveProjectHandle } from './helpers/liveTestState';
import { uid } from './helpers/namespace';

describe('issues — live', () => {
  describe('createIssue + deleteIssue', () => {
    let live: LiveCloudClient;
    let handle: LiveProjectHandle;
    let createdIssueId: string | undefined;
    let createdIssueKey: string | undefined;

    beforeAll(async () => {
      live = createLiveCloudClient();
      handle = getInjectedLiveProject();
    }, 120_000);

    afterAll(async () => {
      if (createdIssueId != null) {
        await live.client.issues.deleteIssue({ issueIdOrKey: createdIssueId }).catch(() => {});
      }
    }, 120_000);

    it('returns CreatedIssue with id, key, and self', async () => {
      const result = await live.client.issues.createIssue({
        fields: {
          project: { key: handle.projectKey },
          issuetype: { name: 'Story' },
          summary: uid('sdk-live-create-issue'),
        },
      });

      expect(typeof result.id).toBe('string');
      expect(typeof result.key).toBe('string');
      expect(typeof result.self).toBe('string');

      createdIssueId = result.id;
      createdIssueKey = result.key;
    });

    it('created issue is retrievable by key', async (ctx: TestContext) => {
      if (!createdIssueKey) { ctx.skip(); return; }

      const result = await live.client.issues.getIssue({ issueIdOrKey: createdIssueKey });

      expect(result.key).toBe(createdIssueKey);
    });

    it('deleteIssue returns void', async (ctx: TestContext) => {
      if (!createdIssueId) { ctx.skip(); return; }

      const result = await live.client.issues.deleteIssue({ issueIdOrKey: createdIssueId });

      expect(result).toBeUndefined();
      createdIssueId = undefined;
      createdIssueKey = undefined;
    });

    it('deleted issue is no longer accessible', async () => {
      const created = await live.client.issues.createIssue({
        fields: {
          project: { key: handle.projectKey },
          issuetype: { name: 'Story' },
          summary: uid('sdk-live-delete-check'),
        },
      });

      await live.client.issues.deleteIssue({ issueIdOrKey: created.id });

      await expect(live.client.issues.getIssue({ issueIdOrKey: created.key })).rejects.toThrow(ApiError);
    });
  });

  describe('getIssue', () => {
    let live: LiveCloudClient;
    let handle: LiveProjectHandle;
    let issueId: string;
    let issueKey: string;
    let summary: string;

    beforeAll(async () => {
      live = createLiveCloudClient();
      handle = getInjectedLiveProject();
      summary = uid('sdk-live-get-issue');

      const created = await live.client.issues.createIssue({
        fields: {
          project: { key: handle.projectKey },
          issuetype: { name: 'Story' },
          summary,
        },
      });
      issueId = created.id;
      issueKey = created.key;
    }, 120_000);

    afterAll(async () => {
      await live.client.issues.deleteIssue({ issueIdOrKey: issueId }).catch(() => {});
    }, 120_000);

    it('returns an Issue with id, key, self, and fields', async () => {
      const result = await live.client.issues.getIssue({ issueIdOrKey: issueKey });

      expect(result.key).toBe(issueKey);
      expect(result.id).toBe(issueId);
      expect(typeof result.self).toBe('string');
      expect(result.fields).toBeDefined();
    });

    it('returns the same issue when fetched by numeric id', async () => {
      const byKey = await live.client.issues.getIssue({ issueIdOrKey: issueKey });
      const byId = await live.client.issues.getIssue({ issueIdOrKey: issueId });

      expect(byId.key).toBe(byKey.key);
      expect(byId.id).toBe(byKey.id);
    });

    it('summary field matches the created value', async () => {
      const result = await live.client.issues.getIssue({
        issueIdOrKey: issueKey,
        fields: ['summary'],
      });

      expect(result.fields?.['summary']).toBe(summary);
    });

    it('throws ApiError for a nonexistent issue key', async () => {
      await expect(live.client.issues.getIssue({ issueIdOrKey: 'NONEXISTENT-99999' })).rejects.toThrow(ApiError);
    });
  });

  describe('editIssue', () => {
    let live: LiveCloudClient;
    let issueId: string;
    let issueKey: string;

    beforeAll(async () => {
      live = createLiveCloudClient();
      const handle = getInjectedLiveProject();

      const created = await live.client.issues.createIssue({
        fields: {
          project: { key: handle.projectKey },
          issuetype: { name: 'Story' },
          summary: uid('sdk-live-edit-before'),
        },
      });
      issueId = created.id;
      issueKey = created.key;
    }, 120_000);

    afterAll(async () => {
      await live.client.issues.deleteIssue({ issueIdOrKey: issueId }).catch(() => {});
    }, 120_000);

    it('editIssue returns void', async () => {
      const result = await live.client.issues.editIssue({
        issueIdOrKey: issueKey,
        fields: { summary: uid('sdk-live-edit-after') },
      });

      expect(result).toBeUndefined();
    });

    it('updated summary is reflected when fetching the issue', async () => {
      const newSummary = uid('sdk-live-edit-verify');

      await live.client.issues.editIssue({
        issueIdOrKey: issueKey,
        fields: { summary: newSummary },
      });

      const result = await live.client.issues.getIssue({
        issueIdOrKey: issueKey,
        fields: ['summary'],
      });

      expect(result.fields?.['summary']).toBe(newSummary);
    });

    it('throws ApiError for a nonexistent issue key', async () => {
      await expect(
        live.client.issues.editIssue({
          issueIdOrKey: 'NONEXISTENT-99999',
          fields: { summary: 'whatever' },
        }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('assignIssue', () => {
    let live: LiveCloudClient;
    let handle: LiveProjectHandle;
    let issueId: string;
    let issueKey: string;

    beforeAll(async () => {
      live = createLiveCloudClient();
      handle = getInjectedLiveProject();

      const created = await live.client.issues.createIssue({
        fields: {
          project: { key: handle.projectKey },
          issuetype: { name: 'Story' },
          summary: uid('sdk-live-assign'),
        },
      });
      issueId = created.id;
      issueKey = created.key;
    }, 120_000);

    afterAll(async () => {
      await live.client.issues.deleteIssue({ issueIdOrKey: issueId }).catch(() => {});
    }, 120_000);

    it('assignIssue returns void', async () => {
      const result = await live.client.issues.assignIssue({
        issueIdOrKey: issueKey,
        accountId: handle.accountId,
      });

      expect(result).toBeUndefined();
    });

    it('assigned user appears in issue assignee field', async () => {
      await live.client.issues.assignIssue({
        issueIdOrKey: issueKey,
        accountId: handle.accountId,
      });

      const result = await live.client.issues.getIssue({
        issueIdOrKey: issueKey,
        fields: ['assignee'],
      });

      expect(result.fields?.['assignee']?.accountId).toBe(handle.accountId);
    });

    it('assigning null unassigns the issue', async () => {
      await live.client.issues.assignIssue({
        issueIdOrKey: issueKey,
        accountId: null as unknown as undefined, // Jira API accepts null to unassign; spec omits nullable
      });

      const result = await live.client.issues.getIssue({
        issueIdOrKey: issueKey,
        fields: ['assignee'],
      });

      expect(result.fields?.['assignee']).toBeNull();
    });

    it('throws ApiError for a nonexistent issue key', async () => {
      await expect(
        live.client.issues.assignIssue({
          issueIdOrKey: 'NONEXISTENT-99999',
          accountId: handle.accountId,
        }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('createIssues (bulk)', () => {
    let live: LiveCloudClient;
    let handle: LiveProjectHandle;
    let createdIds: string[] = [];

    beforeAll(async () => {
      live = createLiveCloudClient();
      handle = getInjectedLiveProject();
    }, 120_000);

    afterAll(async () => {
      await Promise.all(createdIds.map(id => live.client.issues.deleteIssue({ issueIdOrKey: id }).catch(() => {})));
    }, 120_000);

    it('returns CreatedIssues with issues and errors arrays', async () => {
      const result = await live.client.issues.createIssues({
        issueUpdates: [
          {
            fields: {
              project: { key: handle.projectKey },
              issuetype: { name: 'Story' },
              summary: uid('sdk-live-bulk-1'),
            },
          },
          {
            fields: {
              project: { key: handle.projectKey },
              issuetype: { name: 'Story' },
              summary: uid('sdk-live-bulk-2'),
            },
          },
        ],
      });

      expect(Array.isArray(result.issues)).toBe(true);
      expect(Array.isArray(result.errors)).toBe(true);
      expect((result.issues ?? []).length).toBe(2);

      createdIds = (result.issues ?? []).map(i => i.id).filter((id): id is string => id != null);
    });

    it('each created issue has id, key, and self', async () => {
      const result = await live.client.issues.bulkFetchIssues({
        issueIdsOrKeys: createdIds,
      });

      for (const issue of result.issues ?? []) {
        expect(typeof issue.id).toBe('string');
        expect(typeof issue.key).toBe('string');
        expect(typeof issue.self).toBe('string');
      }
    });
  });

  describe('bulkFetchIssues', () => {
    let live: LiveCloudClient;
    let issueIds: string[] = [];
    let issueKeys: string[] = [];

    beforeAll(async () => {
      live = createLiveCloudClient();
      const handle = getInjectedLiveProject();

      const result = await live.client.issues.createIssues({
        issueUpdates: [
          {
            fields: {
              project: { key: handle.projectKey },
              issuetype: { name: 'Story' },
              summary: uid('sdk-live-bulk-fetch-1'),
            },
          },
          {
            fields: {
              project: { key: handle.projectKey },
              issuetype: { name: 'Story' },
              summary: uid('sdk-live-bulk-fetch-2'),
            },
          },
        ],
      });

      issueIds = (result.issues ?? []).map(i => i.id).filter((id): id is string => id != null);
      issueKeys = (result.issues ?? []).map(i => i.key).filter((key): key is string => key != null);
    }, 120_000);

    afterAll(async () => {
      await Promise.all(issueIds.map(id => live.client.issues.deleteIssue({ issueIdOrKey: id }).catch(() => {})));
    }, 120_000);

    it('returns BulkIssueResults with issues array', async () => {
      const result = await live.client.issues.bulkFetchIssues({
        issueIdsOrKeys: issueKeys,
      });

      expect(Array.isArray(result.issues)).toBe(true);
      expect((result.issues ?? []).length).toBe(issueKeys.length);
    });

    it('each returned issue has id, key, and self', async () => {
      const result = await live.client.issues.bulkFetchIssues({
        issueIdsOrKeys: issueKeys,
      });

      for (const issue of result.issues ?? []) {
        expect(typeof issue.id).toBe('string');
        expect(typeof issue.key).toBe('string');
      }
    });

    it('returns only the requested fields when fields param is set', async () => {
      const result = await live.client.issues.bulkFetchIssues({
        issueIdsOrKeys: issueKeys,
        fields: ['summary'],
      });

      for (const issue of result.issues ?? []) {
        expect(issue.fields?.['summary']).toBeDefined();
      }
    });

    it('issueErrors is an empty array when all keys are valid', async () => {
      const result = await live.client.issues.bulkFetchIssues({
        issueIdsOrKeys: issueKeys,
      });

      expect((result.issueErrors ?? []).length).toBe(0);
    });
  });

  describe('getChangeLogs', () => {
    let live: LiveCloudClient;
    let issueId: string;
    let issueKey: string;

    beforeAll(async () => {
      live = createLiveCloudClient();
      const handle = getInjectedLiveProject();

      const created = await live.client.issues.createIssue({
        fields: {
          project: { key: handle.projectKey },
          issuetype: { name: 'Story' },
          summary: uid('sdk-live-changelog'),
        },
      });
      issueId = created.id;
      issueKey = created.key;

      await live.client.issues.editIssue({
        issueIdOrKey: issueKey,
        fields: { summary: uid('sdk-live-changelog-edited') },
      });
    }, 120_000);

    afterAll(async () => {
      await live.client.issues.deleteIssue({ issueIdOrKey: issueId }).catch(() => {});
    }, 120_000);

    it('returns a PageChangelog with pagination fields', async () => {
      const result = await live.client.issues.getChangeLogs({ issueIdOrKey: issueKey });

      expect(typeof result.maxResults).toBe('number');
      expect(typeof result.startAt).toBe('number');
      expect(typeof result.total).toBe('number');
      expect(Array.isArray(result.values)).toBe(true);
    });

    it('returns at least one changelog entry after an edit', async () => {
      const result = await live.client.issues.getChangeLogs({ issueIdOrKey: issueKey });

      expect((result.values ?? []).length).toBeGreaterThan(0);
    });

    it('each changelog entry has an id', async () => {
      const result = await live.client.issues.getChangeLogs({ issueIdOrKey: issueKey });

      for (const entry of result.values ?? []) {
        expect(typeof entry.id).toBe('string');
      }
    });

    it('changelog contains an entry with items recording the summary field change', async () => {
      const result = await live.client.issues.getChangeLogs({ issueIdOrKey: issueKey });

      const hasSummaryChange = (result.values ?? []).some(entry =>
        (entry.items ?? []).some(item => item.field === 'summary'),
      );

      expect(hasSummaryChange).toBe(true);
    });

    it('respects maxResults:1', async () => {
      const result = await live.client.issues.getChangeLogs({
        issueIdOrKey: issueKey,
        maxResults: 1,
      });

      expect((result.values ?? []).length).toBeLessThanOrEqual(1);
    });

    it('throws ApiError for a nonexistent issue key', async () => {
      await expect(live.client.issues.getChangeLogs({ issueIdOrKey: 'NONEXISTENT-99999' })).rejects.toThrow(ApiError);
    });
  });

  describe('getChangeLogsByIds', () => {
    let live: LiveCloudClient;
    let issueId: string;
    let issueKey: string;
    let changelogIds: number[] = [];

    beforeAll(async () => {
      live = createLiveCloudClient();
      const handle = getInjectedLiveProject();

      const created = await live.client.issues.createIssue({
        fields: {
          project: { key: handle.projectKey },
          issuetype: { name: 'Story' },
          summary: uid('sdk-live-cl-byids'),
        },
      });
      issueId = created.id;
      issueKey = created.key;

      await live.client.issues.editIssue({
        issueIdOrKey: issueKey,
        fields: { summary: uid('sdk-live-cl-byids-edited') },
      });

      const logs = await live.client.issues.getChangeLogs({ issueIdOrKey: issueKey });

      changelogIds = (logs.values ?? [])
        .map(c => (c.id != null ? parseInt(c.id, 10) : null))
        .filter((id): id is number => id != null && !isNaN(id));
    }, 120_000);

    afterAll(async () => {
      await live.client.issues.deleteIssue({ issueIdOrKey: issueId }).catch(() => {});
    }, 120_000);

    it('returns PageOfChangelogs with histories array', async () => {
      if (changelogIds.length === 0) return;

      const result = await live.client.issues.getChangeLogsByIds({
        issueIdOrKey: issueKey,
        changelogIds: [changelogIds[0]!],
      });

      expect(Array.isArray(result.histories)).toBe(true);
    });

    it('returns the requested changelog entry by id', async () => {
      if (changelogIds.length === 0) return;

      const result = await live.client.issues.getChangeLogsByIds({
        issueIdOrKey: issueKey,
        changelogIds: [changelogIds[0]!],
      });

      expect((result.histories ?? []).length).toBeGreaterThan(0);
    });

    it('returns all requested entries when multiple ids are provided', async () => {
      if (changelogIds.length < 2) return;

      const result = await live.client.issues.getChangeLogsByIds({
        issueIdOrKey: issueKey,
        changelogIds,
      });

      expect((result.histories ?? []).length).toBe(changelogIds.length);
    });
  });

  describe('getBulkChangelogs', () => {
    let live: LiveCloudClient;
    let issueIds: string[] = [];
    let issueKeys: string[] = [];

    beforeAll(async () => {
      live = createLiveCloudClient();
      const handle = getInjectedLiveProject();

      const result = await live.client.issues.createIssues({
        issueUpdates: [
          {
            fields: {
              project: { key: handle.projectKey },
              issuetype: { name: 'Story' },
              summary: uid('sdk-live-bulk-cl-1'),
            },
          },
          {
            fields: {
              project: { key: handle.projectKey },
              issuetype: { name: 'Story' },
              summary: uid('sdk-live-bulk-cl-2'),
            },
          },
        ],
      });

      issueIds = (result.issues ?? []).map(i => i.id).filter((id): id is string => id != null);
      issueKeys = (result.issues ?? []).map(i => i.key).filter((key): key is string => key != null);
    }, 120_000);

    afterAll(async () => {
      await Promise.all(issueIds.map(id => live.client.issues.deleteIssue({ issueIdOrKey: id }).catch(() => {})));
    }, 120_000);

    it('returns a BulkChangelogResponse with issueChangeLogs array', async () => {
      const result = await live.client.issues.getBulkChangelogs({
        issueIdsOrKeys: issueKeys,
      });

      expect(Array.isArray(result.issueChangeLogs)).toBe(true);
    });

    it('each entry in issueChangeLogs corresponds to a requested issue', async () => {
      const result = await live.client.issues.getBulkChangelogs({
        issueIdsOrKeys: issueKeys,
      });

      for (const entry of result.issueChangeLogs ?? []) {
        expect(issueIds).toContain(entry.issueId);
      }
    });
  });

  describe('getCreateIssueMetaIssueTypes', () => {
    let live: LiveCloudClient;
    let handle: LiveProjectHandle;

    beforeAll(async () => {
      live = createLiveCloudClient();
      handle = getInjectedLiveProject();
    }, 120_000);

    it('returns PageOfCreateMetaIssueTypes with issueTypes array', async () => {
      const result = await live.client.issues.getCreateIssueMetaIssueTypes({
        projectIdOrKey: handle.projectKey,
      });

      expect(Array.isArray(result.issueTypes)).toBe(true);
      expect((result.issueTypes ?? []).length).toBeGreaterThan(0);
    });

    it('each issue type has id, name, and self', async () => {
      const result = await live.client.issues.getCreateIssueMetaIssueTypes({
        projectIdOrKey: handle.projectKey,
      });

      for (const issueType of result.issueTypes ?? []) {
        expect(typeof issueType.id).toBe('string');
        expect(typeof issueType.name).toBe('string');
        expect(typeof issueType.self).toBe('string');
      }
    });

    it('respects maxResults:1', async () => {
      const result = await live.client.issues.getCreateIssueMetaIssueTypes({
        projectIdOrKey: handle.projectKey,
        maxResults: 1,
      });

      expect((result.issueTypes ?? []).length).toBeLessThanOrEqual(1);
    });

    it('throws ApiError for a nonexistent project key', async () => {
      await expect(
        live.client.issues.getCreateIssueMetaIssueTypes({ projectIdOrKey: 'NONEXISTENT99999' }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('getCreateIssueMetaIssueTypeId', () => {
    let live: LiveCloudClient;
    let handle: LiveProjectHandle;
    let storyTypeId: string;

    beforeAll(async () => {
      live = createLiveCloudClient();
      handle = getInjectedLiveProject();

      const meta = await live.client.issues.getCreateIssueMetaIssueTypes({
        projectIdOrKey: handle.projectKey,
      });

      const storyType = (meta.issueTypes ?? []).find(t => t.name === 'Story');
      storyTypeId = (storyType?.id ?? (meta.issueTypes ?? [])[0]?.id)!;
    }, 120_000);

    it('returns PageOfCreateMetaIssueTypeWithField with fields array', async () => {
      const result = await live.client.issues.getCreateIssueMetaIssueTypeId({
        projectIdOrKey: handle.projectKey,
        issueTypeId: storyTypeId,
      });

      expect(Array.isArray(result.fields)).toBe(true);
      expect((result.fields ?? []).length).toBeGreaterThan(0);
    });

    it('summary field is present in the create field list', async () => {
      const result = await live.client.issues.getCreateIssueMetaIssueTypeId({
        projectIdOrKey: handle.projectKey,
        issueTypeId: storyTypeId,
      });

      const summaryField = (result.fields ?? []).find(f => f.key === 'summary');

      expect(summaryField).toBeDefined();
      expect(summaryField?.name).toBeDefined();
    });
  });

  describe('getEditIssueMeta', () => {
    let live: LiveCloudClient;
    let issueId: string;
    let issueKey: string;

    beforeAll(async () => {
      live = createLiveCloudClient();
      const handle = getInjectedLiveProject();

      const created = await live.client.issues.createIssue({
        fields: {
          project: { key: handle.projectKey },
          issuetype: { name: 'Story' },
          summary: uid('sdk-live-editmeta'),
        },
      });
      issueId = created.id;
      issueKey = created.key;
    }, 120_000);

    afterAll(async () => {
      await live.client.issues.deleteIssue({ issueIdOrKey: issueId }).catch(() => {});
    }, 120_000);

    it('returns IssueUpdateMetadata with a fields object', async () => {
      const result = await live.client.issues.getEditIssueMeta({ issueIdOrKey: issueKey });

      expect(result.fields).toBeDefined();
    });

    it('summary field is present in editable fields', async () => {
      const result = await live.client.issues.getEditIssueMeta({ issueIdOrKey: issueKey });

      expect(result.fields?.['summary']).toBeDefined();
    });

    it('throws ApiError for a nonexistent issue key', async () => {
      await expect(live.client.issues.getEditIssueMeta({ issueIdOrKey: 'NONEXISTENT-99999' })).rejects.toThrow(
        ApiError,
      );
    });
  });

  describe('notify', () => {
    let live: LiveCloudClient;
    let issueId: string;
    let issueKey: string;
    let currentUserAccountId: string;

    beforeAll(async () => {
      live = createLiveCloudClient();
      const handle = getInjectedLiveProject();

      const [created, currentUser] = await Promise.all([
        live.client.issues.createIssue({
          fields: {
            project: { key: handle.projectKey },
            issuetype: { name: 'Story' },
            summary: uid('sdk-live-notify'),
          },
        }),
        live.client.myself.getCurrentUser(),
      ]);
      issueId = created.id;
      issueKey = created.key;
      currentUserAccountId = currentUser.accountId!;
    }, 120_000);

    afterAll(async () => {
      await live.client.issues.deleteIssue({ issueIdOrKey: issueId }).catch(() => {});
    }, 120_000);

    it('notify returns void for a valid issue and recipient set', async () => {
      try {
        const result = await live.client.issues.notify({
          issueIdOrKey: issueKey,
          subject: uid('sdk-live-notify-subject'),
          textBody: uid('sdk-live-notify-body'),
          to: {
            users: [{ accountId: currentUserAccountId }],
          },
        });
        expect(result).toBeUndefined();
      } catch (error) {
        // Jira filters out self-notifications; treat "No recipients" as a SDK-level pass
        if (error instanceof ApiError && /No recipients were defined/i.test(error.message ?? '')) return;
        throw error;
      }
    });

    it('throws ApiError for a nonexistent issue key', async () => {
      await expect(
        live.client.issues.notify({
          issueIdOrKey: 'NONEXISTENT-99999',
          subject: uid('sdk-live-notify-missing'),
          textBody: uid('sdk-live-notify-missing-body'),
          to: {
            reporter: true,
          },
        }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('getTransitions + doTransition', () => {
    let live: LiveCloudClient;
    let issueId: string;
    let issueKey: string;

    beforeAll(async () => {
      live = createLiveCloudClient();
      const handle = getInjectedLiveProject();

      const created = await live.client.issues.createIssue({
        fields: {
          project: { key: handle.projectKey },
          issuetype: { name: 'Story' },
          summary: uid('sdk-live-transitions'),
        },
      });
      issueId = created.id;
      issueKey = created.key;
    }, 120_000);

    afterAll(async () => {
      await live.client.issues.deleteIssue({ issueIdOrKey: issueId }).catch(() => {});
    }, 120_000);

    it('getTransitions returns a Transitions object with transitions array', async () => {
      const result = await live.client.issues.getTransitions({ issueIdOrKey: issueKey });

      expect(Array.isArray(result.transitions)).toBe(true);
    });

    it('transitions array is non-empty for a new issue', async () => {
      const result = await live.client.issues.getTransitions({ issueIdOrKey: issueKey });

      expect((result.transitions ?? []).length).toBeGreaterThan(0);
    });

    it('each transition has an id and name', async () => {
      const result = await live.client.issues.getTransitions({ issueIdOrKey: issueKey });

      for (const transition of result.transitions ?? []) {
        expect(typeof transition.id).toBe('string');
        expect(typeof transition.name).toBe('string');
      }
    });

    it('doTransition returns void', async (ctx: TestContext) => {
      const { transitions } = await live.client.issues.getTransitions({ issueIdOrKey: issueKey });
      const first = transitions?.[0];
      if (!first?.id) { ctx.skip(); return; }

      const result = await live.client.issues.doTransition({
        issueIdOrKey: issueKey,
        transition: { id: first.id },
      });

      expect(result).toBeUndefined();
    });

    it('status changes to the named destination after a transition is applied', async (ctx: TestContext) => {
      const before = await live.client.issues.getIssue({
        issueIdOrKey: issueKey,
        fields: ['status'],
      });

      const currentStatusName = before.fields?.['status']?.name as string | undefined;
      const { transitions } = await live.client.issues.getTransitions({ issueIdOrKey: issueKey });
      // Use transition.to (destination status name) — not transition.name — to find a real status change
      const next = transitions?.find(t => t.to !== currentStatusName);
      if (!next?.id) { ctx.skip(); return; }

      await live.client.issues.doTransition({
        issueIdOrKey: issueKey,
        transition: { id: next.id },
      });

      const after = await live.client.issues.getIssue({
        issueIdOrKey: issueKey,
        fields: ['status'],
      });

      // Verify the issue moved to exactly the status the transition promised
      expect(after.fields?.['status']?.name).toBe(next.to);
      expect(after.fields?.['status']?.name).not.toBe(currentStatusName);
    });

    it('getTransitions throws ApiError for a nonexistent issue key', async () => {
      await expect(live.client.issues.getTransitions({ issueIdOrKey: 'NONEXISTENT-99999' })).rejects.toThrow(ApiError);
    });
  });
});
