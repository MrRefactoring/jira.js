import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { hasCloudAdminPermission } from '../setup/permissions';
import { TEST_ISSUE_TYPE, TEST_PROJECT_KEY } from '../setup/fixtures';

/**
 * Live suite for the `issueTypeSchemes` API (`getAllIssueTypeSchemes`, `getIssueTypeSchemesMapping`,
 * `getIssueTypeSchemeForProjects`, and the create/update/delete/assign group).
 *
 * Read-only. A scheme decides which issue types a project offers, and schemes are shared — the `epic` suite could not
 * run precisely because adding the Epic type here would have meant editing a scheme other projects depend on. This file
 * is the other half of that story: it shows the mapping that made the decision.
 */
describe('Jira Cloud — issueTypeSchemes (live, read-only)', () => {
  let client: CloudClient;
  let projectId: number;
  let permitted = false;

  beforeAll(async () => {
    client = getCloudClient();
    permitted = await hasCloudAdminPermission(client);

    if (!permitted) return;
    projectId = Number((await client.projects.getProject({ projectIdOrKey: TEST_PROJECT_KEY })).id);
  });

  beforeEach(ctx => {
    ctx.skip(!permitted, 'the account lacks the ADMINISTER permission required by this suite');
  });

  it('pages the scheme listing', async () => {
    const page = await client.issueTypeSchemes.getAllIssueTypeSchemes({ maxResults: 5 });

    expect(Array.isArray(page.values)).toBe(true);
    expect(page.values!.length).toBeGreaterThan(0);
    expect(page.maxResults).toBe(5);

    for (const scheme of page.values ?? []) {
      expect(typeof scheme.id).toBe('string');
      expect(typeof scheme.name).toBe('string');
      if (scheme.defaultIssueTypeId !== undefined) expect(typeof scheme.defaultIssueTypeId).toBe('string');
    }
  });

  it('names the scheme the test project is attached to', async () => {
    const page = await client.issueTypeSchemes.getIssueTypeSchemeForProjects({ projectId: [projectId] });

    expect(page.values?.length).toBe(1);
    expect(Number(page.values![0]!.projectIds?.[0] ?? projectId)).toBe(projectId);
    expect(page.values![0]!.issueTypeScheme?.id).toBeTruthy();
  });

  it('explains which issue types the project offers, and which it does not', async () => {
    const forProject = await client.issueTypeSchemes.getIssueTypeSchemeForProjects({ projectId: [projectId] });
    const schemeId = Number(forProject.values![0]!.issueTypeScheme!.id);

    const mapping = await client.issueTypeSchemes.getIssueTypeSchemesMapping({ issueTypeSchemeId: [schemeId] });
    const typeIds = mapping.values!.map(entry => entry.issueTypeId);

    const project = await client.projects.getProject({ projectIdOrKey: TEST_PROJECT_KEY });
    const projectTypeIds = project.issueTypes!.map(type => type.id);

    expect(typeIds.sort()).toEqual(projectTypeIds.sort());
    expect(project.issueTypes!.map(type => type.name)).toContain(TEST_ISSUE_TYPE);
  });

  it('orders the listing by name in both directions', async ctx => {
    const ascending = await client.issueTypeSchemes.getAllIssueTypeSchemes({ orderBy: 'name', maxResults: 50 });
    const descending = await client.issueTypeSchemes.getAllIssueTypeSchemes({ orderBy: '-name', maxResults: 50 });

    ctx.skip((ascending.values?.length ?? 0) < 2, 'sorting needs at least two issue type schemes on this site');
    expect(descending.values?.map(scheme => scheme.id)).toEqual(ascending.values?.map(scheme => scheme.id).reverse());
  });

  it('fails typed on the destructive path, without ever aiming it at a real scheme', async () => {
    const error = await client.issueTypeSchemes.deleteIssueTypeScheme({ issueTypeSchemeId: 99999999 }).catch(e => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
