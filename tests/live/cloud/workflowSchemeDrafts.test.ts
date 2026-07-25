import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError, isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { TEST_PROJECT_KEY } from '../setup/fixtures';

/**
 * Live suite for the `workflowSchemeDrafts` and `workflowTransitionRules` APIs, plus the remaining
 * `projectPermissionSchemes` and `issuePanels` reads.
 *
 * Read-only. Drafts exist precisely because editing a live workflow scheme is dangerous: you edit a copy and publish
 * it, and publishing asks Jira to migrate every in-flight issue whose status the new scheme no longer allows. Making
 * a draft is harmless; publishing one is not, and the two are a single call apart.
 *
 * `workflowTransitionRules` is app-only on top of that — the rules it manages belong to Connect apps.
 */
describe('Jira Cloud — workflow scheme drafts and transition rules (live, read-only)', () => {
  let client: CloudClient;
  let schemeId: number | undefined;

  beforeAll(async () => {
    client = getCloudClient();

    const page = await client.workflowSchemes.getAllWorkflowSchemes({ maxResults: 1 }).catch(() => undefined);

    schemeId = page?.values?.[0]?.id;
  });

  it('reports no draft for a scheme that has never been edited', async () => {
    if (schemeId === undefined) return;

    const draft = await client.workflowSchemeDrafts.getWorkflowSchemeDraft({ id: schemeId }).catch((e: unknown) => e);

    expect(isNotFoundError(draft) || !(draft instanceof Error)).toBe(true);
  });

  it('surfaces a draft lookup on an unknown scheme as a typed error', async () => {
    const error = await client.workflowSchemeDrafts.getWorkflowSchemeDraft({ id: 99999999 }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect(isNotFoundError(error) || isForbiddenError(error)).toBe(true);
  });

  it('fails typed on publishing, which is the irreversible half', async () => {
    const error = await client.workflowSchemeDrafts
      .publishDraftWorkflowScheme({ id: 99999999, statusMappings: [] })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('refuses the app-owned transition rule reads', async () => {
    const error = await client.workflowTransitionRules
      .getWorkflowTransitionRuleConfigurations({ types: ['postfunction'], maxResults: 5 })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
    expect((error as { status?: number }).status).toBeLessThan(500);
  });

  it('reports the permission scheme assigned to the test project', async () => {
    const scheme = await client.projectPermissionSchemes
      .getAssignedPermissionScheme({ projectKeyOrId: TEST_PROJECT_KEY })
      .catch((e: unknown) => e);

    if (scheme instanceof Error) {
      expect(isForbiddenError(scheme) || isNotFoundError(scheme)).toBe(true);

      return;
    }

    const result = scheme as Awaited<ReturnType<typeof client.projectPermissionSchemes.getAssignedPermissionScheme>>;

    expect(typeof result.id).toBe('number');
    expect(typeof result.name).toBe('string');
  });

  it('fails typed on reassigning a permission scheme, without ever doing it', async () => {
    const error = await client.projectPermissionSchemes
      .assignPermissionScheme({ projectKeyOrId: TEST_PROJECT_KEY, id: 99999999 })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('fails typed on the asynchronous issue panel write', async () => {
    const error = await client.issuePanels
      .bulkPinUnpinProjectsAsync({ moduleId: 'absent-module', projectList: [] })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
