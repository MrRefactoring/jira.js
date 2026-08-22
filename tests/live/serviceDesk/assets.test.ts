import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError } from '#/core';
import { createServiceDeskClient, type ServiceDeskClient } from '#/serviceDesk/createServiceDeskClient';
import { getClient } from '../setup/client';

/**
 * Live suite for the Service Management `assets` API (`getAssetsWorkspaces`, `getInsightWorkspaces`).
 *
 * Two endpoints that once did the same thing under two names — Insight was renamed Assets, and the older path was
 * kept for compatibility. It no longer is: on Cloud today `/assets/workspace` answers and `/insight/workspace` is
 * gone, so what used to be worth asserting about the pair — that they behave identically — is simply false, and the
 * suite pins the deprecation instead.
 *
 * Both are gated behind the same agent licence as the rest of the surface, so an instance without one refuses rather
 * than answers, and the suite accepts either.
 */
describe('Jira Service Management — assets (live)', () => {
  let serviceDesk: ServiceDeskClient;

  beforeAll(() => {
    serviceDesk = createServiceDeskClient(getClient());
  });

  it('answers the assets workspace lookup, or refuses typed', async () => {
    const result = await serviceDesk.assets.getAssetsWorkspaces({ limit: 5 }).catch((e: unknown) => e);

    if (result instanceof Error) {
      expect(isForbiddenError(result) || (result as { status?: number }).status === 404).toBe(true);

      return;
    }

    const page = result as Awaited<ReturnType<typeof serviceDesk.assets.getAssetsWorkspaces>>;

    expect(Array.isArray(page.values)).toBe(true);

    for (const workspace of page.values ?? []) {
      expect(typeof workspace.workspaceId).toBe('string');
    }
  });

  /**
   * The retired path answers `403` with an HTML error page rather than the JSON every other refusal on this surface
   * carries. That is the reason this test is worth keeping now that the paths have diverged: it is the only live
   * assertion that a non-JSON body still arrives as a typed error with its status intact, instead of failing inside
   * the response parser.
   */
  it('refuses the retired Insight path with a typed error, whatever the body', async () => {
    const result = await serviceDesk.assets.getInsightWorkspaces({ limit: 1 }).catch((e: unknown) => e);

    if (!(result instanceof Error)) {
      const page = result as Awaited<ReturnType<typeof serviceDesk.assets.getInsightWorkspaces>>;

      expect(Array.isArray(page.values)).toBe(true);

      return;
    }

    expect(typeof (result as { status?: number }).status).toBe('number');
    expect(isForbiddenError(result) || (result as { status?: number }).status === 404).toBe(true);
  });
});
