import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError, isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

/**
 * Live suite for the `issuePriorities` API (`searchPriorities`, `getPriority`, and the admin-only
 * create/update/delete/`setDefaultPriority`/`movePriorities` group).
 *
 * Read-only. Priorities are site-wide: deleting one asks Jira to migrate every issue that used it, and changing the
 * default changes what every new issue gets. Neither belongs in a suite running against a working site.
 *
 * The detail worth a live check is that `searchPriorities` types its pagination as *strings* — `startAt` and
 * `maxResults` are `z.string()` here and numbers everywhere else in the API. That is inherited from the
 * specification, and it is the kind of thing that compiles fine and then serializes to something unexpected.
 */
describe('Jira Cloud — issuePriorities (live, read-only)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('lists the site priorities, each fully typed', async () => {
    const page = await client.issuePriorities.searchPriorities({});

    expect(Array.isArray(page.values)).toBe(true);
    expect(page.values!.length).toBeGreaterThan(0);

    for (const priority of page.values!) {
      expect(priority.id).toMatch(/^\d+$/);
      expect(typeof priority.name).toBe('string');
      // The colour and icon are what a UI renders; both are always populated
      // even though the model marks them optional.
      expect(priority.statusColor).toBeTruthy();
      expect(priority.self).toMatch(/^https:\/\//);
    }
  });

  it('does not mark any priority as the default through this endpoint', async () => {
    const page = await client.issuePriorities.searchPriorities({});

    // `isDefault` is false on every row, including the priority new issues
    // actually get. The field exists and is uniformly unhelpful: the real
    // default lives in the project's field configuration, not here. Code
    // looking for `isDefault === true` finds nothing and has no way to tell
    // that from "the site has no default".
    expect(page.values!.every(priority => priority.isDefault === false)).toBe(true);
  });

  it('honours pagination typed as strings rather than numbers', async () => {
    // `maxResults` is `z.string()` on this endpoint alone. Passing the number
    // a caller would naturally reach for does not typecheck, and passing the
    // string has to actually work — which is what this asserts.
    const page = await client.issuePriorities.searchPriorities({ maxResults: '1' });

    expect(page.values?.length).toBeLessThanOrEqual(1);
    expect(page.maxResults).toBe(1);
    // Note the asymmetry: sent as a string, returned as a number.
    expect(typeof page.maxResults).toBe('number');
  });

  it('filters by name and by id', async () => {
    const all = await client.issuePriorities.searchPriorities({});
    const sample = all.values![0]!;

    const byId = await client.issuePriorities.searchPriorities({ id: [sample.id!] });

    expect(byId.values?.map(priority => priority.id)).toEqual([sample.id]);

    const byName = await client.issuePriorities.searchPriorities({ priorityName: sample.name! });

    expect(byName.values?.map(priority => priority.id)).toContain(sample.id);
  });

  it('resolves a single priority by id, identical to its listing entry', async () => {
    const all = await client.issuePriorities.searchPriorities({});
    const sample = all.values![0]!;

    const priority = await client.issuePriorities.getPriority({ id: sample.id! });

    expect(priority.id).toBe(sample.id);
    expect(priority.name).toBe(sample.name);
  });

  it('surfaces an unknown priority as a typed NotFoundError', async () => {
    const error = await client.issuePriorities.getPriority({ id: '99999999' }).catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });

  it('fails typed on the destructive path, without ever aiming it at a real priority', async () => {
    // Deleting a real priority forces a migration of every issue that used it.
    const error = await client.issuePriorities.deletePriority({ id: '99999999' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect(isNotFoundError(error) || isForbiddenError(error) || (error as { status?: number }).status === 400).toBe(
      true,
    );
  });
});
