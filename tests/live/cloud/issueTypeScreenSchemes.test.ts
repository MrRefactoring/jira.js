import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { TEST_PROJECT_KEY } from '../setup/fixtures';

/**
 * Live suite for the `issueTypeScreenSchemes` API (`getIssueTypeScreenSchemes`,
 * `getIssueTypeScreenSchemeMappings`, `getIssueTypeScreenSchemeProjectAssociations`,
 * `getProjectsForIssueTypeScreenScheme`, and the create/update/assign/delete group).
 *
 * Read-only. This is the top of the chain the `screenSchemes` suite walks: a project has one issue type screen
 * scheme, which maps each issue type to a screen scheme, which maps each operation to a screen. Reassigning it
 * changes every form in the project at once.
 *
 * Covering it separately from `screenSchemes` is worth it for one reason: this is the only layer that is
 * project-associated, so it is where "which forms does *this* project use" is actually answered.
 */
describe('Jira Cloud — issueTypeScreenSchemes (live, read-only)', () => {
  let client: CloudClient;
  let projectId: number;
  let permitted = true;

  beforeAll(async () => {
    client = getCloudClient();
    projectId = Number((await client.projects.getProject({ projectIdOrKey: TEST_PROJECT_KEY })).id);

    permitted = await client.issueTypeScreenSchemes
      .getIssueTypeScreenSchemes({ maxResults: 1 })
      .then(() => true)
      .catch(() => false);
  });

  it('pages the listing, or refuses typed without admin rights', async () => {
    if (!permitted) {
      const error = await client.issueTypeScreenSchemes.getIssueTypeScreenSchemes({}).catch((e: unknown) => e);

      expect(isForbiddenError(error) || (error as { status?: number }).status === 401).toBe(true);

      return;
    }

    const page = await client.issueTypeScreenSchemes.getIssueTypeScreenSchemes({ maxResults: 5 });

    expect(Array.isArray(page.values)).toBe(true);
    expect(page.maxResults).toBe(5);

    for (const scheme of page.values ?? []) {
      expect(typeof scheme.id).toBe('string');
      expect(typeof scheme.name).toBe('string');
    }
  });

  it('names the scheme the test project is associated with', async () => {
    if (!permitted) return;

    const page = await client.issueTypeScreenSchemes
      .getIssueTypeScreenSchemeProjectAssociations({ projectId: [projectId] })
      .catch((e: unknown) => e);

    if (page instanceof Error) return;

    const result = page as Awaited<
      ReturnType<typeof client.issueTypeScreenSchemes.getIssueTypeScreenSchemeProjectAssociations>
    >;

    expect(result.values?.length).toBe(1);

    expect(result.values![0]!.issueTypeScreenScheme?.id).toBeTruthy();
    expect(result.values![0]!.projectIds?.map(Number)).toContain(projectId);
  });

  it('maps issue types to screen schemes', async () => {
    if (!permitted) return;

    const associations = await client.issueTypeScreenSchemes
      .getIssueTypeScreenSchemeProjectAssociations({ projectId: [projectId] })
      .catch(() => undefined);

    const schemeId = Number(associations?.values?.[0]?.issueTypeScreenScheme?.id);

    if (!schemeId) return;

    const mappings = await client.issueTypeScreenSchemes.getIssueTypeScreenSchemeMappings({
      issueTypeScreenSchemeId: [schemeId],
      maxResults: 50,
    });

    expect(Array.isArray(mappings.values)).toBe(true);

    for (const mapping of mappings.values ?? []) {
      expect(typeof mapping.issueTypeId).toBe('string');
      expect(typeof mapping.screenSchemeId).toBe('string');
    }
  });

  it('lists the projects a scheme is used by', async () => {
    if (!permitted) return;

    const associations = await client.issueTypeScreenSchemes
      .getIssueTypeScreenSchemeProjectAssociations({ projectId: [projectId] })
      .catch(() => undefined);

    const schemeId = Number(associations?.values?.[0]?.issueTypeScreenScheme?.id);

    if (!schemeId) return;

    const projects = await client.issueTypeScreenSchemes
      .getProjectsForIssueTypeScreenScheme({ issueTypeScreenSchemeId: schemeId, maxResults: 50 })
      .catch((e: unknown) => e);

    if (projects instanceof Error) return;

    const result = projects as Awaited<
      ReturnType<typeof client.issueTypeScreenSchemes.getProjectsForIssueTypeScreenScheme>
    >;

    expect(result.values?.map(project => Number(project.id))).toContain(projectId);
  });

  it('fails typed on the destructive path, without ever aiming it at a real scheme', async () => {
    const error = await client.issueTypeScreenSchemes
      .deleteIssueTypeScreenScheme({ issueTypeScreenSchemeId: '99999999' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
