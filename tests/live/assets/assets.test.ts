import { beforeAll, describe, expect, it } from 'vitest';
import { createAssetsClient, type AssetsClient } from '#/assets/createAssetsClient';
import { createServiceDeskClient } from '#/serviceDesk/createServiceDeskClient';
import { isForbiddenError } from '#/core';
import { getClient } from '../setup/client';
import { requireLiveEnv } from '../setup/env';

/**
 * Live suite for the Assets Cloud API.
 *
 * Assets needs Jira Service Management Premium. On a site without it `getAssetsWorkspaces` answers with an empty list,
 * and on a site with no Service Management at all it refuses the lookup outright. Either way there is no workspace to
 * point a client at — so this stands down, visibly, rather than failing sixty times over a plan. That is the shape
 * `tests/live/setup/entitlement.ts` established for the Cloud suites, and for the same reason: a suite that fails over
 * an entitlement buries the signal it exists to carry.
 *
 * It comes back the moment the site is on Premium, without an edit here.
 *
 * The client is deliberately not `getClient()`. Assets is the one surface that does not answer on the site's own host,
 * so it is built from its own configuration — and that this suite has to do so is itself the thing worth showing a
 * reader.
 */
async function findWorkspace(): Promise<string | undefined> {
  const serviceDesk = createServiceDeskClient(getClient());

  try {
    const page = await serviceDesk.assets.getAssetsWorkspaces({ limit: 1 });

    return page.values?.[0]?.workspaceId;
  } catch {
    return undefined;
  }
}

const workspaceId = await findWorkspace();
const { assetsImportSourceId } = requireLiveEnv();
let accessDenied = false;

if (workspaceId !== undefined) {
  const { email, apiToken } = requireLiveEnv();
  const assets = createAssetsClient({ workspaceId, auth: { type: 'basic', email, apiToken } });

  try {
    await assets.objectSchemas.findSchemas({ maxResults: 1 });
  } catch (error) {
    if (
      isForbiddenError(error) &&
      typeof error.body === 'object' &&
      error.body !== null &&
      'message' in error.body &&
      error.body.message === 'Access to Assets API was denied'
    ) {
      accessDenied = true;
    } else {
      throw error;
    }
  }
}

describe.skipIf(workspaceId === undefined || accessDenied)('Assets — Cloud (live)', () => {
  let assets: AssetsClient;

  beforeAll(() => {
    const { email, apiToken } = requireLiveEnv();

    assets = createAssetsClient({ workspaceId: workspaceId!, auth: { type: 'basic', email, apiToken } });
  });

  it('lists the object schemas of the workspace', async () => {
    const schemas = await assets.objectSchemas.findSchemas({ maxResults: 5 });

    expect(Array.isArray(schemas.values)).toBe(true);
  });

  it('lists the global icons', async () => {
    const icons = await assets.icons.findGlobalIcons();

    expect(Array.isArray(icons)).toBe(true);
  });

  it('lists the status types', async () => {
    const statuses = await assets.statusTypes.findStatusTypes();

    expect(Array.isArray(statuses)).toBe(true);
  });

  it('reports what the tenant is using', async () => {
    const usage = await assets.usage.getTenantUsageInfo();

    expect(usage).toBeTypeOf('object');
  });

  it('counts objects by AQL', async () => {
    const count = await assets.objects.countObjectsByAql({ qlQuery: 'objectType is not empty' });

    expect(count.totalCount).toBeTypeOf('number');
  });

  it.runIf(Boolean(assetsImportSourceId))('validates an import source response', async () => {
    const source = await assets.importSources.getImportSource({ id: assetsImportSourceId! });
    const reasonMaps = [
      source.importStatus?.reasonForInvalidity,
      ...(source.importSourceOTEntries ?? []).map(entry => entry.importStatus?.reasonForInvalidity),
    ].filter((value): value is Record<string, unknown> => value !== null && value !== undefined);

    expect(reasonMaps.length).toBeGreaterThan(0);
    expect(reasonMaps.some(reasons => Object.keys(reasons).length > 0)).toBe(true);
    expect(reasonMaps.every(reasons => Object.values(reasons).every(value => typeof value === 'string'))).toBe(true);
  });
});

describe.runIf(accessDenied)('Assets — Cloud (live)', () => {
  it('stands down: access to the Assets API is denied', () => {
    expect(accessDenied).toBe(true);
  });
});

describe.runIf(workspaceId === undefined)('Assets — Cloud (live)', () => {
  it('stands down: the site has no Assets workspace', () => {
    expect(workspaceId).toBeUndefined();
  });
});
