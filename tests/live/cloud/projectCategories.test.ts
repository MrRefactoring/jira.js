import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { hasCloudAdminPermission } from '../setup/permissions';
import { ResourceTracker } from '../setup/resources';
import { testName } from '../helpers/naming';

/**
 * Live suite for the `projectCategories` API (`getAllProjectCategories`, `createProjectCategory`,
 * `getProjectCategoryById`, `updateProjectCategory`, `removeProjectCategory`).
 *
 * A full write cycle. A category is site-wide but inert: it is a label projects can be grouped by, it affects no
 * permission and no behaviour, and removing one leaves the projects that referenced it untouched. That combination
 * makes it one of the few pieces of site configuration a test can safely create.
 *
 * The suite deliberately never attaches the category to a project — that would be a write against the project every
 * other suite depends on.
 */
describe('Jira Cloud — projectCategories (live)', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;
  let categoryId: number;
  let permitted = false;
  const name = testName('category').replace(/[[\]]/g, '');

  beforeAll(async () => {
    client = getCloudClient();
    permitted = await hasCloudAdminPermission(client);

    if (!permitted) return;

    const created = await client.projectCategories.createProjectCategory({
      name,
      description: 'created by the live suite',
    });

    categoryId = Number(created.id);
    expect(categoryId).toBeGreaterThan(0);
    tracker.defer(async () => {
      await client.projectCategories.removeProjectCategory({ id: categoryId });
    });
  });

  afterAll(() => tracker.cleanup());

  beforeEach(ctx => {
    ctx.skip(!permitted, 'the account lacks the ADMINISTER permission required by this suite');
  });

  it('creates a category', () => {
    expect(categoryId).toBeGreaterThan(0);
  });

  it('reads the category back by id', async () => {
    const category = await client.projectCategories.getProjectCategoryById({ id: categoryId });

    expect(category.name).toBe(name);
    expect(category.description).toBe('created by the live suite');
    expect(category.self).toMatch(/^https:\/\//);
  });

  it('lists it among the site categories', async () => {
    const all = await client.projectCategories.getAllProjectCategories();

    expect(all.map(category => Number(category.id))).toContain(categoryId);
  });

  it('changes the description on update', async () => {
    await client.projectCategories.updateProjectCategory({ id: categoryId, body: { description: 'edited' } });

    const category = await client.projectCategories.getProjectCategoryById({ id: categoryId });

    expect(category.description).toBe('edited');
    expect(category.name).toBe(name);
  });

  it('rejects a category whose name collides with an existing one', async () => {
    const error = await client.projectCategories.createProjectCategory({ name }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('makes the category unreadable once removed', async () => {
    const throwaway = await client.projectCategories.createProjectCategory({ name: `${name}-throwaway` });
    const id = Number(throwaway.id);

    await client.projectCategories.removeProjectCategory({ id });

    const error = await client.projectCategories.getProjectCategoryById({ id }).catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });

  it('surfaces an unknown category as a typed NotFoundError', async () => {
    const error = await client.projectCategories.getProjectCategoryById({ id: 99999999 }).catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });
});
