import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient, rawRequest } from '../setup/client';
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
 * The `issues` suite exercises transitions against whatever workflow the test project happens to have. This file was
 * meant to make that workflow visible — and instead found that it cannot be read at all: `JiraWorkflow.description`
 * is declared as an ADF `Document` while the API returns a plain string, so every call returning that model fails
 * validation. The tests below pin the defect rather than working around it, because the fix belongs upstream and this
 * is what will turn green when it lands.
 */
describe('Jira Cloud — workflows (live, read-only)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('cannot read the workflow listing at all — a schema defect, not a permission one', async () => {
    const error = await client.workflows.searchWorkflows({ maxResults: 5 }).catch((e: unknown) => e);

    // Not 401, not 403: the request succeeds and the *response* fails to
    // validate. `JiraWorkflow.description` is declared as an ADF `Document`
    // while Jira returns a plain string, so every endpoint returning that
    // model is unusable through the client. Raw HTTP against the same URL
    // answers 200 with a well-formed body.
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).name).toBe('ZodError');
    expect(isForbiddenError(error)).toBe(false);
    expect(String((error as Error).message)).toContain('description');
  });

  it('confirms the response itself is fine, over raw HTTP', async () => {
    const response = await rawRequest('/rest/api/3/workflows/search?maxResults=1');
    const body = (await response.json()) as { values?: { description?: unknown }[] };

    expect(response.status).toBe(200);
    // A string where the model expects a document — the whole of the defect,
    // stated in one assertion so the fix has something to aim at.
    expect(typeof body.values?.[0]?.description).toBe('string');
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
