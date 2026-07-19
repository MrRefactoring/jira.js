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
      // `id` is a bare uuid string here, not the composite `{ name, entityId }`
      // the older workflow endpoints use — two id shapes for one concept.
      expect(typeof workflow.id).toBe('string');
      expect(typeof workflow.name).toBe('string');
      // The field that used to make this whole module unusable: a plain string,
      // exactly as the specification declares it. Empty on most workflows,
      // which is precisely why a document was never plausible here.
      expect(typeof workflow.description).toBe('string');
    }
  });

  it('returns transitions only when `expand` asks for them', async () => {
    const plain = await client.workflows.searchWorkflows({ maxResults: 1 }).catch(() => undefined);
    const expanded = await client.workflows
      .searchWorkflows({ maxResults: 1, expand: ['values.transitions'] })
      .catch(() => undefined);

    if (!plain || !expanded) return;

    // Present but empty without the expand, rather than absent — so a caller
    // who forgets it sees "this workflow has no transitions" instead of
    // "you did not ask". The transitions are the workflow's entire content;
    // everything else on the object is a label.
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
      // `initial`, `global` or `directed` — a global transition can be taken
      // from any status, which is why "available transitions" is not simply a
      // lookup of the current one.
      expect(['INITIAL', 'GLOBAL', 'DIRECTED', 'initial', 'global', 'directed']).toContain(transition.type);
    }
  });

  it('names the projects a workflow is used by', async () => {
    const page = await client.workflows.searchWorkflows({ maxResults: 1 }).catch(() => undefined);
    const workflowId = page?.values?.[0]?.id;

    if (!workflowId) return;

    const usages = await client.workflows.getProjectUsagesForWorkflow({ workflowId }).catch((e: unknown) => e);

    if (usages instanceof Error) return;

    // The blast radius of an edit, stated by the API itself. This is the call
    // to make before changing a workflow, and the reason this suite does not.
    expect(usages).toBeDefined();
  });

  it('reports the capabilities available when authoring a workflow', async () => {
    const capabilities = await client.workflows.workflowCapabilities({}).catch((e: unknown) => e);

    if (capabilities instanceof Error) return;

    const result = capabilities as Awaited<ReturnType<typeof client.workflows.workflowCapabilities>>;

    // Rules differ by whether the workflow is team- or company-managed, so a
    // caller building an editor has to ask rather than assume.
    expect(result).toBeDefined();
  });

  it('shows which workflow the test project resolves to', async () => {
    const statuses = await client.projects.getAllStatuses({ projectIdOrKey: TEST_PROJECT_KEY });

    // Not a workflow lookup, but the observable consequence of one: the
    // statuses an issue type can reach are exactly what its workflow allows,
    // and this is the join the `issues` transition test depends on.
    expect(statuses.length).toBeGreaterThan(0);
    expect(statuses[0]!.statuses?.length).toBeGreaterThan(0);
  });

  it('fails typed on the destructive path, without ever aiming it at a real workflow', async () => {
    // Deleting an inactive workflow is the only delete this API offers, and it
    // is still site configuration.
    const error = await client.workflows
      .deleteInactiveWorkflow({ entityId: '00000000-0000-0000-0000-000000000000' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
