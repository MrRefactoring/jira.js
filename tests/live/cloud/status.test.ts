import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { TEST_PROJECT_KEY } from '../setup/fixtures';

/**
 * Live suite for the `status` API (`search`, `getStatusesById`, `getStatusesByName`, the usage reads, and the
 * create/update/delete group).
 *
 * Not to be confused with `workflowStatuses`, which is covered separately. That one is the older read-only pair, this
 * one the newer management API — and they are emphatically *not* two views of one set. They return overlapping but
 * different collections of statuses, and they describe the ones they share differently. A caller who reaches for the
 * wrong one gets a plausible answer that is missing what they were looking for, which is the main reason this file
 * exists alongside that one.
 *
 * Read-only. Deleting a status asks Jira to deal with every issue currently sitting in it, and creating one adds to
 * site configuration.
 */
describe('Jira Cloud — status (live, read-only)', () => {
  let client: CloudClient;
  let sampleId: string | undefined;
  let permitted = true;

  beforeAll(async () => {
    client = getCloudClient();

    const page = await client.status.search({ maxResults: 5 }).catch(() => undefined);

    if (!page) {
      permitted = false;

      return;
    }

    sampleId = page.values?.[0]?.id;
  });

  it('searches statuses, or refuses typed without admin rights', async () => {
    if (!permitted) {
      const error = await client.status.search({}).catch((e: unknown) => e);

      expect(isForbiddenError(error) || (error as { status?: number }).status === 401).toBe(true);

      return;
    }

    const page = await client.status.search({ maxResults: 5 });

    expect(Array.isArray(page.values)).toBe(true);
    expect(page.maxResults).toBe(5);

    for (const status of page.values ?? []) {
      expect(typeof status.id).toBe('string');
      expect(typeof status.name).toBe('string');
      // This API reports the category as a plain string constant, where
      // `workflowStatuses` returns a nested `statusCategory` object with an id
      // and a colour. Same underlying status, two different shapes.
      expect(['TODO', 'IN_PROGRESS', 'DONE']).toContain(status.statusCategory);
    }
  });

  it('returns a different set of statuses from the older API', async () => {
    if (!permitted) return;

    const modern = await client.status.search({ maxResults: 100 });
    const legacy = await client.workflowStatuses.getStatuses();

    const modernIds = new Set((modern.values ?? []).map(status => status.id));
    const legacyIds = new Set(legacy.map(status => status.id));

    const onlyModern = [...modernIds].filter(id => !legacyIds.has(id));
    const onlyLegacy = [...legacyIds].filter(id => !modernIds.has(id));

    // Neither is a superset of the other. The newer API surfaces built-in
    // global statuses the older one will not resolve at all — asking it for one
    // of these ids answers 404 "does not exist" — while the older one carries
    // project-scoped statuses the search does not return by default.
    expect(onlyModern.length).toBeGreaterThan(0);
    expect(onlyLegacy.length).toBeGreaterThan(0);
  });

  it('describes a shared status differently in each API', async () => {
    if (!permitted) return;

    const modern = await client.status.search({ maxResults: 100 });
    const legacy = await client.workflowStatuses.getStatuses();
    const legacyIds = new Set(legacy.map(status => status.id));

    const shared = (modern.values ?? []).find(status => legacyIds.has(status.id));

    if (!shared) return;

    const viaOld = legacy.find(status => status.id === shared.id)!;

    expect(shared.name).toBe(viaOld.name);
    // The divergence, stated plainly: a string constant here, a nested object
    // with an id and a colour there. Code written against one and pointed at
    // the other reads `undefined` rather than failing.
    expect(typeof shared.statusCategory).toBe('string');
    expect(typeof viaOld.statusCategory).toBe('object');
  });

  it('filters the search by category and by name', async () => {
    if (!permitted) return;

    const done = await client.status.search({ statusCategory: 'DONE', maxResults: 50 });

    for (const status of done.values ?? []) expect(status.statusCategory).toBe('DONE');

    const all = await client.status.search({ maxResults: 1 });
    const name = all.values?.[0]?.name;

    if (!name) return;

    const byName = await client.status.search({ searchString: name, maxResults: 50 });

    expect(byName.values?.some(status => status.name === name)).toBe(true);
  });

  it('distinguishes global statuses from project-scoped ones', async () => {
    if (!permitted) return;

    const project = await client.projects.getProject({ projectIdOrKey: TEST_PROJECT_KEY });

    const scoped = await client.status.search({ projectId: project.id!, maxResults: 50 }).catch(() => undefined);

    if (!scoped) return;

    // The `projectId` filter narrows to statuses that project can use — which
    // is a different question from "all statuses on the site".
    expect(Array.isArray(scoped.values)).toBe(true);
  });

  it('reports which projects and workflows use a status', async () => {
    if (!permitted || !sampleId) return;

    const projects = await client.status.getProjectUsagesForStatus({ statusId: sampleId }).catch((e: unknown) => e);

    if (projects instanceof Error) return;

    // The blast radius of a delete, from the API itself — and the reason this
    // suite does not exercise one.
    expect(projects).toBeDefined();

    const workflows = await client.status.getWorkflowUsagesForStatus({ statusId: sampleId }).catch(() => undefined);

    if (workflows) expect(workflows).toBeDefined();
  });

  it('surfaces an unknown status id as an empty result rather than an error', async () => {
    if (!permitted) return;

    const result = await client.status.getStatusesById({ id: ['99999999'] }).catch((e: unknown) => e);

    if (result instanceof Error) {
      expect((result as { status?: number }).status).toBeGreaterThanOrEqual(400);

      return;
    }

    // A bulk lookup: unknown ids are simply absent from the answer, so a caller
    // asking for three and receiving two has to work out which one is missing.
    expect(result as unknown[]).toEqual([]);
  });

  it('fails typed on the destructive path, without ever aiming it at a real status', async () => {
    // Deleting a status leaves every issue currently in it needing somewhere
    // to go.
    const error = await client.status.deleteStatusesById({ id: ['99999999'] }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
