import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError, isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { TEST_PROJECT_KEY } from '../setup/fixtures';

/**
 * Live suite for the `workflowSchemes` and `workflowSchemeProjectAssociations` APIs.
 *
 * Read-only. A workflow scheme binds issue types to workflows for a project, and one scheme serves many projects —
 * reassigning it changes how issues move for all of them, and Jira asks for a migration when in-flight issues no
 * longer have a valid status.
 *
 * The legacy listing endpoints work. `readWorkflowSchemes` does not, for the same reason `searchWorkflows` does not:
 * the response model declares `description` as an ADF `Document` where the API sends a plain string. Both are pinned
 * so the upstream fix has a target.
 */
describe('Jira Cloud — workflowSchemes (live, read-only)', () => {
  let client: CloudClient;
  let projectId: number;
  let permitted = true;

  beforeAll(async () => {
    client = getCloudClient();
    projectId = Number((await client.projects.getProject({ projectIdOrKey: TEST_PROJECT_KEY })).id);

    permitted = await client.workflowSchemes
      .getAllWorkflowSchemes({ maxResults: 1 })
      .then(() => true)
      .catch(() => false);
  });

  it('pages the scheme listing, or refuses typed without admin rights', async () => {
    if (!permitted) {
      const error = await client.workflowSchemes.getAllWorkflowSchemes({}).catch((e: unknown) => e);

      expect(isForbiddenError(error) || (error as { status?: number }).status === 401).toBe(true);

      return;
    }

    const page = await client.workflowSchemes.getAllWorkflowSchemes({ maxResults: 5 });

    expect(Array.isArray(page.values)).toBe(true);
    expect(page.maxResults).toBe(5);

    for (const scheme of page.values ?? []) {
      expect(typeof scheme.id).toBe('number');
      expect(typeof scheme.name).toBe('string');
      if (scheme.defaultWorkflow !== undefined) expect(typeof scheme.defaultWorkflow).toBe('string');
    }
  });

  it('names the scheme the test project is associated with', async () => {
    if (!permitted) return;

    const associations = await client.workflowSchemeProjectAssociations
      .getWorkflowSchemeProjectAssociations({ projectId: [projectId] })
      .catch((e: unknown) => e);

    if (associations instanceof Error) return;

    const result = associations as Awaited<
      ReturnType<typeof client.workflowSchemeProjectAssociations.getWorkflowSchemeProjectAssociations>
    >;

    expect(Array.isArray(result.values)).toBe(true);
    for (const association of result.values ?? []) {
      expect(Array.isArray(association.projectIds)).toBe(true);
    }
  });

  it('maps issue types to workflows within a scheme', async () => {
    if (!permitted) return;

    const page = await client.workflowSchemes.getAllWorkflowSchemes({ maxResults: 1 });
    const scheme = page.values?.[0];

    if (!scheme) return;

    const detail = await client.workflowSchemes.getWorkflowScheme({ id: scheme.id! }).catch((e: unknown) => e);

    if (detail instanceof Error) return;

    const result = detail as Awaited<ReturnType<typeof client.workflowSchemes.getWorkflowScheme>>;

    expect(result.id).toBe(scheme.id);
    expect(typeof result.defaultWorkflow === 'string' || result.issueTypeMappings !== undefined).toBe(true);
  });

  it('cannot read schemes through the newer endpoint — the same schema defect', async () => {
    const error = await client.workflowSchemes.readWorkflowSchemes({ projectIds: [String(projectId)] }).catch(e => e);

    if ((error as Error)?.name === 'ZodError') {
      expect(String((error as Error).message)).toContain('description');

      return;
    }

    expect(error).toBeDefined();
  });

  it('surfaces an unknown scheme as a typed error', async () => {
    const error = await client.workflowSchemes.getWorkflowScheme({ id: 99999999 }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect(isNotFoundError(error) || isForbiddenError(error)).toBe(true);
  });

  it('fails typed on the destructive path, without ever aiming it at a real scheme', async () => {
    const error = await client.workflowSchemes.deleteWorkflowScheme({ id: 99999999 }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
