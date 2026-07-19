import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError } from '#/core';
import { createServiceDeskClient, type ServiceDeskClient } from '#/serviceDesk/createServiceDeskClient';
import { getClient } from '../setup/client';

/**
 * Live suite for the Service Management `assets` API (`getAssetsWorkspaces`, `getInsightWorkspaces`).
 *
 * Two endpoints that do the same thing under two names — Insight was renamed Assets, and the older path is kept for
 * compatibility. That is the only thing worth asserting about them, and it is the kind of fact that is invisible in
 * the types: a caller reading the client sees two unrelated-looking methods.
 *
 * Both are gated behind the same agent licence as the rest of the surface, so what is pinned is the typed refusal and
 * that the two paths behave identically.
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
      // A workspace id is what every subsequent Assets API call is keyed by,
      // and it lives on a different host entirely — this endpoint exists to
      // hand it over.
      expect(typeof workspace.workspaceId).toBe('string');
    }
  });

  it('behaves identically through the older Insight path', async () => {
    const assets = await serviceDesk.assets.getAssetsWorkspaces({ limit: 1 }).catch((e: unknown) => e);
    const insight = await serviceDesk.assets.getInsightWorkspaces({ limit: 1 }).catch((e: unknown) => e);

    const assetsFailed = assets instanceof Error;
    const insightFailed = insight instanceof Error;

    // Same endpoint, two names, kept for compatibility after Insight was
    // renamed to Assets. If these ever diverge, one of them has been changed
    // without the other — which the types would never reveal.
    expect(assetsFailed).toBe(insightFailed);

    if (assetsFailed && insightFailed) {
      expect((assets as { status?: number }).status).toBe((insight as { status?: number }).status);
    }
  });
});
