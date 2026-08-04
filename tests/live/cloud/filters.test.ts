import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { TEST_PROJECT_KEY } from '../setup/fixtures';
import { testName } from '../helpers/naming';

/**
 * Live suite for the `filters` API (`createFilter`, `getFilter`, `updateFilter`, `deleteFilter`,
 * `getFiltersPaginated`, `getMyFilters`, `getFavouriteFilters`, `setFavouriteForFilter`,
 * `deleteFavouriteForFilter`, and the column group).
 *
 * A full write cycle. A filter is owned by the account that created it and is private until shared, so this is one of
 * the few pieces of Jira configuration a test can create without affecting anyone else.
 *
 * Two things here need a live site. A filter stores JQL as a plain string, so how much of it is checked on save is a
 * real question — and the answer turns out to be all of it, semantics included: a query naming a missing field is
 * refused outright, where `parseJqlQueries` with validation off would happily parse it. And "favourite" is per-user
 * state attached to a shared object, which is easy to confuse with a property of the filter itself.
 *
 * Note the shape difference between the two writes: `createFilter` takes the filter fields spread at the top level,
 * while `updateFilter` nests them under `body`. Both are generated from the same model, and getting it wrong produces
 * a bodyless request that Jira answers with 415 rather than a validation error — which reads as a transport problem.
 */
describe('Jira Cloud — filters (live)', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;
  let filterId: number;
  const name = testName('filter');

  beforeAll(() => {
    client = getCloudClient();
  });

  afterAll(() => tracker.cleanup());

  it('creates a private filter owned by the calling account', async () => {
    const filter = await client.filters.createFilter({
      name,
      description: 'created by the live suite',
      jql: `project = ${TEST_PROJECT_KEY} ORDER BY created DESC`,
    });

    expect(filter.id).toMatch(/^\d+$/);
    expect(filter.name).toBe(name);
    expect(filter.owner?.accountId).toBeTruthy();
    expect(filter.sharePermissions ?? []).toEqual([]);

    filterId = Number(filter.id);
    tracker.defer(async () => {
      await client.filters.deleteFilter({ id: filterId });
    });
  });

  it('reads the filter back with its JQL intact', async () => {
    const filter = await client.filters.getFilter({ id: filterId });

    expect(filter.jql).toBe(`project = ${TEST_PROJECT_KEY} ORDER BY created DESC`);
    expect(filter.searchUrl).toMatch(/^https:\/\//);
    expect(filter.viewUrl).toMatch(/^https:\/\//);
    expect(filter.viewUrl).not.toBe(filter.searchUrl);
  });

  it('lists the filter among the ones the account owns', async () => {
    const mine = await client.filters.getMyFilters();

    expect(mine.map(filter => filter.id)).toContain(String(filterId));
  });

  it('finds the filter through the paginated search by name', async () => {
    const page = await client.filters.getFiltersPaginated({ filterName: name, maxResults: 10 });

    expect(page.values?.map(filter => filter.id)).toContain(String(filterId));
    expect(typeof page.total).toBe('number');
  });

  it('replaces the JQL on update', async () => {
    const updated = await client.filters.updateFilter({
      id: filterId,
      body: { name, jql: `project = ${TEST_PROJECT_KEY} AND status != Done` },
    });

    expect(updated.jql).toBe(`project = ${TEST_PROJECT_KEY} AND status != Done`);
  });

  it('rejects JQL naming a field that does not exist', async () => {
    const error = await client.filters
      .updateFilter({ id: filterId, body: { name, jql: 'nosuchfield = 1' } })
      .catch((e: unknown) => e);

    expect((error as { status?: number }).status).toBe(400);
  });

  it('rejects JQL that does not parse', async () => {
    const error = await client.filters
      .updateFilter({ id: filterId, body: { name, jql: 'project = "unterminated' } })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBe(400);
  });

  it('marks the filter as a favourite, which is per-user state', async () => {
    const favourited = await client.filters.setFavouriteForFilter({ id: filterId });

    expect(favourited.favourite).toBe(true);

    const favourites = await client.filters.getFavouriteFilters();

    expect(favourites.map(filter => filter.id)).toContain(String(filterId));

    const unfavourited = await client.filters.deleteFavouriteForFilter({ id: filterId });

    expect(unfavourited.favourite).toBe(false);
  });

  it('rejects a filter whose name collides with an existing one', async () => {
    const error = await client.filters
      .createFilter({ name, jql: `project = ${TEST_PROJECT_KEY}` })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBe(400);
  });

  it('makes the filter unreadable once deleted', async () => {
    const throwaway = await client.filters.createFilter({
      name: `${name}-throwaway`,
      jql: `project = ${TEST_PROJECT_KEY}`,
    });

    await client.filters.deleteFilter({ id: Number(throwaway.id) });

    const error = await client.filters.getFilter({ id: Number(throwaway.id) }).catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });

  it('surfaces an unknown filter as a typed NotFoundError', async () => {
    const error = await client.filters.getFilter({ id: 99999999 }).catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });
});
