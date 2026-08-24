import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError } from '#/core';
import { createServiceDeskClient, type ServiceDeskClient } from '#/serviceDesk/createServiceDeskClient';
import { getClient } from '../setup/client';

/**
 * Live suite for the Service Management `assets` API (`getAssetsWorkspaces`, `getInsightWorkspaces`).
 *
 * Two endpoints for one thing under two names — Insight was renamed Assets, and the older path is kept for
 * compatibility. The suite used to assert that the pair behaves identically, which stopped being true when
 * `/assets/workspace` began answering on this tenant while `/insight/workspace` did not.
 *
 * That divergence is a licensing fact, not a retirement: the older path refuses with the same 403 as
 * `getServiceDesks`, `getCustomerRequests` and `getOrganizations`, all four carrying a byte-identical copy of Jira's
 * generic HTML error page. Atlassian has announced no removal, and both operations remain in the specification. So
 * each path is pinned on its own terms — answer or typed refusal — rather than against the other.
 *
 * What the refusal is worth asserting for is the body: an HTML page is the one response on any of the three surfaces
 * that the JSON parser has no way to read, and it still has to arrive as a typed error with its status intact.
 */
describe('Jira Service Management — assets (live)', () => {
  let serviceDesk: ServiceDeskClient;

  beforeAll(() => {
    serviceDesk = createServiceDeskClient(getClient());
  });

  /** Both names answer with the same page of workspace ids, so both are read the same way. */
  const lookups: [string, () => Promise<unknown>][] = [
    ['assets.getAssetsWorkspaces', () => serviceDesk.assets.getAssetsWorkspaces({ limit: 5 })],
    ['assets.getInsightWorkspaces', () => serviceDesk.assets.getInsightWorkspaces({ limit: 5 })],
  ];

  it.each(lookups)('answers the %s lookup, or refuses typed', async (_name, lookup) => {
    const result = await lookup().catch((e: unknown) => e);

    if (result instanceof Error) {
      expect(isForbiddenError(result)).toBe(true);
      expect((result as { status?: number }).status).toBe(403);

      return;
    }

    const page = result as Awaited<ReturnType<typeof serviceDesk.assets.getAssetsWorkspaces>>;

    expect(Array.isArray(page.values)).toBe(true);

    for (const workspace of page.values ?? []) {
      expect(typeof workspace.workspaceId).toBe('string');
    }
  });
});
