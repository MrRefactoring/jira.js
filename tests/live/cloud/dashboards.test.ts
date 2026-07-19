import { beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

/**
 * Live suite for the `dashboards` API (`getAllDashboards`, `getDashboardsPaginated`, `getDashboard`, and the
 * item-property group).
 *
 * Read-only. A dashboard is a shared workspace: creating one puts it in other people's listings, and the gadget
 * properties hang off gadget ids that only exist on a dashboard someone has configured. Neither is something to
 * manufacture on a working site.
 *
 * The pairing worth pinning is `getAllDashboards` against `getDashboardsPaginated` — two listings of the same thing
 * with different pagination contracts and different filters, easy to reach for interchangeably.
 */
describe('Jira Cloud — dashboards (live, read-only)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('lists dashboards with the older offset pagination', async () => {
    const page = await client.dashboards.getAllDashboards({ maxResults: 5 });

    expect(Array.isArray(page.dashboards)).toBe(true);
    expect(page.startAt).toBe(0);
    expect(page.maxResults).toBe(5);
    // The older listing reports `total`, and the rows live under `dashboards`.
    expect(typeof page.total).toBe('number');

    for (const dashboard of page.dashboards ?? []) {
      expect(dashboard.id).toMatch(/^\d+$/);
      expect(typeof dashboard.name).toBe('string');
      expect(dashboard.self).toMatch(/^https:\/\//);
    }
  });

  it('lists the same dashboards under a different shape when paginated', async () => {
    const page = await client.dashboards.getDashboardsPaginated({ maxResults: 5 });

    // Same objects, different envelope: rows under `values`, and an `isLast`
    // flag instead of arithmetic on `total`. Swapping one call for the other
    // without adjusting the reader silently yields `undefined`.
    expect(Array.isArray(page.values)).toBe(true);
    expect(typeof page.isLast).toBe('boolean');
  });

  it('filters to the dashboards the account owns', async () => {
    const mine = await client.dashboards.getAllDashboards({ filter: 'my', maxResults: 50 });
    const all = await client.dashboards.getAllDashboards({ maxResults: 50 });

    expect(mine.dashboards!.length).toBeLessThanOrEqual(all.dashboards!.length);
  });

  it('filters to favourites, which is per-user state', async () => {
    const favourites = await client.dashboards.getAllDashboards({ filter: 'favourite', maxResults: 50 });

    expect(Array.isArray(favourites.dashboards)).toBe(true);
    // Like filters, "favourite" belongs to the caller rather than the object —
    // two accounts get different answers from the same endpoint.
    for (const dashboard of favourites.dashboards ?? []) expect(dashboard.isFavourite).toBe(true);
  });

  it('searches by name through the paginated listing', async () => {
    const all = await client.dashboards.getDashboardsPaginated({ maxResults: 1 });
    const first = all.values?.[0];

    if (!first) return;

    const found = await client.dashboards.getDashboardsPaginated({ dashboardName: first.name!, maxResults: 10 });

    expect(found.values?.map(dashboard => dashboard.id)).toContain(first.id);
  });

  it('resolves a single dashboard by id', async () => {
    const all = await client.dashboards.getAllDashboards({ maxResults: 1 });
    const first = all.dashboards?.[0];

    if (!first) return;

    const dashboard = await client.dashboards.getDashboard({ id: first.id! });

    expect(dashboard.id).toBe(first.id);
    expect(dashboard.name).toBe(first.name);
  });

  it('surfaces an unknown dashboard as a typed NotFoundError', async () => {
    const error = await client.dashboards.getDashboard({ id: '99999999' }).catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });
});
