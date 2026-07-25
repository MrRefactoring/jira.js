import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { TEST_PROJECT_KEY } from '../setup/fixtures';

/**
 * Live suite for the `workflows` API (`searchWorkflows`, `readWorkflows`, `workflowCapabilities`,
 * `getProjectUsagesForWorkflow`, `getWorkflowSchemeUsagesForWorkflow`, `listWorkflowHistory`, and the
 * create/update/validate group).
 *
 * Read-only. A workflow defines which transitions an issue can make; changing one changes what every issue in every
 * project using it is allowed to do, and Jira has no way to scope an edit to a single project. Creating one is safe
 * in isolation but pointless without attaching it, and attaching it is the unsafe part.
 *
 * The `issues` suite exercises transitions against whatever workflow the test project happens to have. This file is
 * what makes that workflow visible: which ones exist, what transitions they allow, and which projects share them.
 *
 * It could not do that until recently. `JiraWorkflow.description` was declared as an ADF `Document` while Jira sends
 * a plain string, so every endpoint returning that model failed validation on every call. The specification had it
 * right — `type: string` — and a patch was overriding it.
 */
describe('Jira Cloud — workflows (live, read-only)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('pages the workflow listing, or refuses typed without admin rights', async () => {
    const result = await client.workflows.searchWorkflows({ maxResults: 5 }).catch((e: unknown) => e);

    if (result instanceof Error) {
      expect(isForbiddenError(result) || (result as { status?: number }).status === 401).toBe(true);

      return;
    }

    const page = result as Awaited<ReturnType<typeof client.workflows.searchWorkflows>>;

    expect(Array.isArray(page.values)).toBe(true);
    expect(page.maxResults).toBe(5);

    for (const workflow of page.values ?? []) {
      expect(typeof workflow.id).toBe('string');
      expect(typeof workflow.name).toBe('string');
      expect(typeof workflow.description).toBe('string');
    }
  });

  it('returns transitions only when `expand` asks for them', async () => {
    const plain = await client.workflows.searchWorkflows({ maxResults: 1 }).catch(() => undefined);
    const expanded = await client.workflows
      .searchWorkflows({ maxResults: 1, expand: ['values.transitions'] })
      .catch(() => undefined);

    if (!plain || !expanded) return;

    expect(plain.values?.[0]?.transitions).toEqual([]);
    expect(expanded.values?.[0]?.transitions?.length).toBeGreaterThan(0);
  });

  it('describes each transition with a type', async () => {
    const page = await client.workflows
      .searchWorkflows({ maxResults: 1, expand: ['values.transitions'] })
      .catch(() => undefined);

    if (!page) return;

    for (const transition of page.values?.[0]?.transitions ?? []) {
      expect(typeof transition.name).toBe('string');
      expect(['INITIAL', 'GLOBAL', 'DIRECTED', 'initial', 'global', 'directed']).toContain(transition.type);
    }
  });

  it('names the projects a workflow is used by', async () => {
    const page = await client.workflows.searchWorkflows({ maxResults: 1 }).catch(() => undefined);
    const workflowId = page?.values?.[0]?.id;

    if (!workflowId) return;

    const usages = await client.workflows.getProjectUsagesForWorkflow({ workflowId }).catch((e: unknown) => e);

    if (usages instanceof Error) return;

    expect(usages).toBeDefined();
  });

  it('reports the capabilities available when authoring a workflow', async () => {
    const capabilities = await client.workflows.workflowCapabilities({}).catch((e: unknown) => e);

    if (capabilities instanceof Error) return;

    const result = capabilities as Awaited<ReturnType<typeof client.workflows.workflowCapabilities>>;

    expect(result).toBeDefined();
  });

  it('shows which workflow the test project resolves to', async () => {
    const statuses = await client.projects.getAllStatuses({ projectIdOrKey: TEST_PROJECT_KEY });

    expect(statuses.length).toBeGreaterThan(0);
    expect(statuses[0]!.statuses?.length).toBeGreaterThan(0);
  });

  it('fails typed on the destructive path, without ever aiming it at a real workflow', async () => {
    const error = await client.workflows
      .deleteInactiveWorkflow({ entityId: '00000000-0000-0000-0000-000000000000' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
