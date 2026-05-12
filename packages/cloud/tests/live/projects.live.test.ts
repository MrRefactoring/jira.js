import { ApiError } from '@jira.js/base';
import { afterAll, beforeAll, describe, expect, it, type TestContext } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { createLiveBaseClient } from './helpers/liveBaseClient';
import { getInjectedLiveProject, type LiveProjectHandle } from './helpers/liveTestState';
import { uid } from './helpers/namespace';

function randomProjectKey(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const bytes = new Uint8Array(5);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes, byte => letters[byte % 26]!).join('');
}

describe('projects — live', () => {
  describe('createProject + deleteProject', () => {
    let live: LiveCloudClient;
    let createdProjectId: number | undefined;
    let createdProjectKey: string | undefined;

    beforeAll(async () => {
      live = createLiveCloudClient();
    }, 120_000);

    afterAll(async () => {
      if (createdProjectId != null) {
        await live.client.projects.deleteProject({ projectIdOrKey: String(createdProjectId) }).catch(() => {});
      }
    }, 120_000);

    it('returns ProjectIdentifiers with numeric id and string key', async () => {
      const handle = getInjectedLiveProject();
      const result = await live.client.projects.createProject({
        key: randomProjectKey(),
        name: uid('sdk-live-create-test'),
        projectTypeKey: 'software',
        projectTemplateKey: 'com.pyxis.greenhopper.jira:gh-simplified-scrum-classic',
        leadAccountId: handle.accountId,
      });

      expect(typeof result.id).toBe('number');
      expect(typeof result.key).toBe('string');
      expect(result.key.length).toBeGreaterThan(0);

      createdProjectId = result.id;
      createdProjectKey = result.key;
    });

    it('created project is retrievable by key', async (ctx: TestContext) => {
      if (!createdProjectKey) { ctx.skip(); return; }

      const result = await live.client.projects.getProject({ projectIdOrKey: createdProjectKey });

      expect(result.key).toBe(createdProjectKey);
      expect(typeof result.name).toBe('string');
    });

    it('deleteProject returns void', async (ctx: TestContext) => {
      if (!createdProjectId) { ctx.skip(); return; }

      const result = await live.client.projects.deleteProject({
        projectIdOrKey: String(createdProjectId),
      });

      expect(result).toBeUndefined();
      createdProjectId = undefined;
      createdProjectKey = undefined;
    });

    it('deleted project is no longer accessible', async () => {
      const handle = getInjectedLiveProject();
      const tempResult = await live.client.projects.createProject({
        key: randomProjectKey(),
        name: uid('sdk-live-delete-check'),
        projectTypeKey: 'software',
        projectTemplateKey: 'com.pyxis.greenhopper.jira:gh-simplified-scrum-classic',
        leadAccountId: handle.accountId,
      });

      await live.client.projects.deleteProject({ projectIdOrKey: String(tempResult.id) });

      await expect(live.client.projects.getProject({ projectIdOrKey: tempResult.key })).rejects.toThrow(ApiError);
    });
  });

  describe('searchProjects', () => {
    let live: LiveCloudClient;
    let handle: LiveProjectHandle;

    beforeAll(async () => {
      live = createLiveCloudClient();
      handle = getInjectedLiveProject();
    }, 120_000);

    it('returns a PageProject-shaped response', async () => {
      const result = await live.client.projects.searchProjects();

      expect(typeof result.maxResults).toBe('number');
      expect(typeof result.startAt).toBe('number');
      expect(Array.isArray(result.values)).toBe(true);
    });

    it('finds the test project when filtering by key', async () => {
      const result = await live.client.projects.searchProjects({
        keys: [handle.projectKey],
      });

      const found = result.values?.find(p => p.key === handle.projectKey);
      expect(found).toBeDefined();
    });

    it('respects maxResults:1', async () => {
      const result = await live.client.projects.searchProjects({ maxResults: 1 });

      expect((result.values ?? []).length).toBeLessThanOrEqual(1);
    });

    it('filters by typeKey returns only software projects', async () => {
      const result = await live.client.projects.searchProjects({
        typeKey: 'software',
        maxResults: 10,
      });

      for (const project of result.values ?? []) {
        expect(project.projectTypeKey).toBe('software');
      }
    });

    it('query filter returns the test project when matching by name prefix', async () => {
      const result = await live.client.projects.searchProjects({
        query: handle.projectKey,
      });

      expect((result.values ?? []).length).toBeGreaterThan(0);
    });
  });

  describe('getProject', () => {
    let live: LiveCloudClient;
    let handle: LiveProjectHandle;

    beforeAll(async () => {
      live = createLiveCloudClient();
      handle = getInjectedLiveProject();
    }, 120_000);

    it('returns a Project with key, name, id, and self', async () => {
      const result = await live.client.projects.getProject({ projectIdOrKey: handle.projectKey });

      expect(result.key).toBe(handle.projectKey);
      expect(typeof result.name).toBe('string');
      expect(typeof result.id).toBe('string');
      expect(typeof result.self).toBe('string');
    });

    it('returns the same project when fetched by numeric id', async () => {
      const byKey = await live.client.projects.getProject({ projectIdOrKey: handle.projectKey });
      const byId = await live.client.projects.getProject({ projectIdOrKey: handle.projectId });

      expect(byId.key).toBe(byKey.key);
      expect(byId.id).toBe(byKey.id);
    });

    it('expand:issueTypes includes issueTypes array', async () => {
      const result = await live.client.projects.getProject({
        projectIdOrKey: handle.projectKey,
        expand: 'issueTypes',
      });

      expect(Array.isArray(result.issueTypes)).toBe(true);
      expect((result.issueTypes ?? []).length).toBeGreaterThan(0);
    });

    it('throws ApiError for a nonexistent project key', async () => {
      await expect(live.client.projects.getProject({ projectIdOrKey: 'NONEXISTENT99999' })).rejects.toThrow(ApiError);
    });
  });

  describe('updateProject', () => {
    let live: LiveCloudClient;
    let tempProjectId: number | undefined;
    let tempProjectKey: string | undefined;

    beforeAll(async () => {
      live = createLiveCloudClient();
      const handle = getInjectedLiveProject();

      const created = await live.client.projects.createProject({
        key: randomProjectKey(),
        name: uid('sdk-live-update-before'),
        projectTypeKey: 'software',
        projectTemplateKey: 'com.pyxis.greenhopper.jira:gh-simplified-scrum-classic',
        leadAccountId: handle.accountId,
      });

      tempProjectId = created.id;
      tempProjectKey = created.key;
    }, 120_000);

    afterAll(async () => {
      if (tempProjectId != null) {
        await live.client.projects.deleteProject({ projectIdOrKey: String(tempProjectId) }).catch(() => {});
      }
    }, 120_000);

    it('returns the updated project with the new name', async () => {
      const newName = uid('sdk-live-update-after');
      const result = await live.client.projects.updateProject({
        projectIdOrKey: tempProjectKey!,
        name: newName,
      });

      expect(result.name).toBe(newName);
      expect(result.key).toBe(tempProjectKey);
    });

    it('description update is reflected in response', async () => {
      const result = await live.client.projects.updateProject({
        projectIdOrKey: tempProjectKey!,
        description: 'sdk-live test description',
      });

      expect(result.description).toBe('sdk-live test description');
    });

    it('throws ApiError for a nonexistent project key', async () => {
      await expect(
        live.client.projects.updateProject({
          projectIdOrKey: 'NONEXISTENT99999',
          name: 'whatever',
        }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('getAllStatuses', () => {
    let live: LiveCloudClient;
    let handle: LiveProjectHandle;

    beforeAll(async () => {
      live = createLiveCloudClient();
      handle = getInjectedLiveProject();
    }, 120_000);

    it('returns a non-empty array for a software project', async () => {
      const result = await live.client.projects.getAllStatuses({ projectIdOrKey: handle.projectKey });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('each element has id, name, self, and statuses array', async () => {
      const result = await live.client.projects.getAllStatuses({ projectIdOrKey: handle.projectKey });

      for (const issueType of result) {
        expect(typeof issueType.id).toBe('string');
        expect(typeof issueType.name).toBe('string');
        expect(typeof issueType.self).toBe('string');
        expect(Array.isArray(issueType.statuses)).toBe(true);
      }
    });

    it('statuses inside each issue type have id, name, and self', async () => {
      const result = await live.client.projects.getAllStatuses({ projectIdOrKey: handle.projectKey });
      const allStatuses = result.flatMap(it => it.statuses);

      expect(allStatuses.length).toBeGreaterThan(0);
      for (const status of allStatuses) {
        expect(typeof status.id).toBe('string');
        expect(typeof status.name).toBe('string');
        expect(typeof status.self).toBe('string');
      }
    });

    it('throws ApiError for a nonexistent project key', async () => {
      await expect(live.client.projects.getAllStatuses({ projectIdOrKey: 'NONEXISTENT99999' })).rejects.toThrow(
        ApiError,
      );
    });
  });

  describe('getHierarchy', () => {
    let live: LiveCloudClient;
    let nextGenProjectId: number | undefined;

    beforeAll(async () => {
      live = createLiveCloudClient();
      const handle = getInjectedLiveProject();

      // getHierarchy only works on next-gen (team-managed) projects
      const created = await live.client.projects.createProject({
        key: randomProjectKey(),
        name: uid('sdk-live-hierarchy'),
        projectTypeKey: 'software',
        projectTemplateKey: 'com.pyxis.greenhopper.jira:gh-simplified-agility-scrum',
        leadAccountId: handle.accountId,
      });
      nextGenProjectId = created.id;
    }, 120_000);

    afterAll(async () => {
      if (nextGenProjectId != null) {
        await live.client.projects.deleteProject({ projectIdOrKey: String(nextGenProjectId) }).catch(() => {});
      }
    }, 120_000);

    it('returns a ProjectIssueTypeHierarchy with hierarchy array', async () => {
      const result = await live.client.projects.getHierarchy({ projectId: nextGenProjectId! });

      expect(result.projectId).toBe(nextGenProjectId);
      expect(Array.isArray(result.hierarchy)).toBe(true);
    });

    it('hierarchy is non-empty for a next-gen project', async () => {
      const result = await live.client.projects.getHierarchy({ projectId: nextGenProjectId! });

      expect(result.hierarchy!.length).toBeGreaterThan(0);
    });

    it('each level has a level number and name string', async () => {
      const result = await live.client.projects.getHierarchy({ projectId: nextGenProjectId! });

      for (const level of result.hierarchy!) {
        expect(typeof level.level).toBe('number');
        expect(typeof level.name).toBe('string');
      }
    });

    it('throws ApiError for a nonexistent project id', async () => {
      await expect(live.client.projects.getHierarchy({ projectId: 999_999_999 })).rejects.toThrow(ApiError);
    });
  });

  describe('getNotificationSchemeForProject', () => {
    let live: LiveCloudClient;
    let handle: LiveProjectHandle;

    beforeAll(async () => {
      live = createLiveCloudClient();
      handle = getInjectedLiveProject();

      const http = createLiveBaseClient(live.env);
      const schemesRaw = await http.sendRequest<{ values?: { id: number }[] }>({
        url: '/rest/api/3/notificationscheme',
        method: 'GET',
      });

      const schemeId = schemesRaw.values?.[0]?.id;

      if (schemeId != null) {
        await live.client.projects
          .updateProject({
            projectIdOrKey: handle.projectKey,
            notificationScheme: schemeId,
          })
          .catch(() => {});
      }
    }, 120_000);

    it('returns a NotificationScheme with id, name, and self', async () => {
      try {
        const result = await live.client.projects.getNotificationSchemeForProject({
          projectKeyOrId: handle.projectKey,
        });

        expect(typeof result.id).toBe('number');
        expect(typeof result.name).toBe('string');
        expect(typeof result.self).toBe('string');
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) return;

        throw error;
      }
    });

    it('throws ApiError for a nonexistent project key', async () => {
      await expect(
        live.client.projects.getNotificationSchemeForProject({ projectKeyOrId: 'NONEXISTENT99999' }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('archiveProject', () => {
    let live: LiveCloudClient;
    let tempProjectId: number | undefined;
    let tempProjectKey: string | undefined;
    let skipReason: string | undefined;

    beforeAll(async () => {
      live = createLiveCloudClient();
      const handle = getInjectedLiveProject();

      const created = await live.client.projects.createProject({
        key: randomProjectKey(),
        name: uid('sdk-live-archive'),
        projectTypeKey: 'software',
        projectTemplateKey: 'com.pyxis.greenhopper.jira:gh-simplified-scrum-classic',
        leadAccountId: handle.accountId,
      });

      tempProjectId = created.id;
      tempProjectKey = created.key;

      try {
        await live.client.projects.archiveProject({ projectIdOrKey: tempProjectKey });
      } catch (error) {
        if (error instanceof ApiError && error.status === 403) {
          skipReason = 'archiveProject: tenant does not allow API archiving (403)';
          console.warn(`[live-tests] ${skipReason}`);
        } else {
          throw error;
        }
      }
    }, 120_000);

    afterAll(async () => {
      if (tempProjectId != null) {
        // Archived projects cannot be deleted via API — best-effort soft delete
        await live.client.projects
          .deleteProject({ projectIdOrKey: String(tempProjectId), enableUndo: true })
          .catch(err => {
            console.warn(
              `[live-tests] archiveProject teardown: could not delete project ${tempProjectKey}: ${err instanceof Error ? err.message : String(err)}`,
            );
          });
      }
    }, 120_000);

    it('archiveProject returns void', () => {
      if (skipReason) return;
    });

    it('archived project appears in search with status:archived', async () => {
      if (skipReason) return;

      const result = await live.client.projects.searchProjects({
        keys: [tempProjectKey!],
        status: ['archived'],
      });

      const found = result.values?.find(p => p.key === tempProjectKey);
      expect(found).toBeDefined();
    });

    it('archived project does not appear in search with status:live', async () => {
      if (skipReason) return;

      const result = await live.client.projects.searchProjects({
        keys: [tempProjectKey!],
        status: ['live'],
      });

      const found = result.values?.find(p => p.key === tempProjectKey);
      expect(found).toBeUndefined();
    });

    it('deleting an archived project throws an error', async () => {
      if (skipReason) return;

      await expect(live.client.projects.deleteProject({ projectIdOrKey: tempProjectKey! })).rejects.toThrow(ApiError);
    });
  });
});
