import { beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

/**
 * Live suite for the `workflowStatusCategories` API (`getStatusCategories`, `getStatusCategory`).
 *
 * Status categories are the fixed three-value vocabulary every Jira workflow ultimately maps onto, so this is a rare
 * endpoint where the exact contents can be asserted rather than merely their shape — and where a drift would break
 * every board and report built on top of them.
 */
describe('Jira Cloud — workflowStatusCategories (live)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('returns the four categories Jira defines, each fully typed', async () => {
    const categories = await client.workflowStatusCategories.getStatusCategories();

    expect(Array.isArray(categories)).toBe(true);

    for (const category of categories) {
      expect(typeof category.id).toBe('number');
      expect(typeof category.key).toBe('string');
      expect(typeof category.name).toBe('string');
      expect(typeof category.colorName).toBe('string');
      expect(category.self).toMatch(/^https:\/\//);
    }

    // `undefined` is the placeholder category; the other three are the ones
    // boards colour by. This vocabulary is closed — new members would be news.
    expect(categories.map(category => category.key).sort()).toEqual(['done', 'indeterminate', 'new', 'undefined']);
  });

  it('resolves a single category by id and by key alike', async () => {
    const categories = await client.workflowStatusCategories.getStatusCategories();
    const done = categories.find(category => category.key === 'done')!;

    const byId = await client.workflowStatusCategories.getStatusCategory({ idOrKey: String(done.id) });
    const byKey = await client.workflowStatusCategories.getStatusCategory({ idOrKey: 'done' });

    // The parameter is named `idOrKey` and both halves of that promise are live.
    expect(byId).toEqual(done);
    expect(byKey.id).toBe(done.id);
  });

  it('surfaces an unknown category as a typed NotFoundError', async () => {
    const error = await client.workflowStatusCategories
      .getStatusCategory({ idOrKey: 'no-such-category' })
      .catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });
});
