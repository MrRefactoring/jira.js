import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { TEST_PROJECT_KEY } from '../setup/fixtures';

/**
 * Live suite for the `projectProperties` API (`getProjectPropertyKeys`, `getProjectProperty`, `setProjectProperty`,
 * `deleteProjectProperty`).
 *
 * The same entity-property mechanism as `issueProperties`, hung off a project instead. Exercised in full because it
 * is scoped to a namespaced key that nothing else reads, and removable.
 *
 * Worth a suite of its own rather than trusting the issue-property one by analogy: these are four separate generated
 * functions against four separate URLs, and "it works for issues" has never been evidence that it works for projects.
 */

const PROPERTY_KEY = 'jira.js.livetest.project';

describe('Jira Cloud — projectProperties (live, round trip)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  afterAll(async () => {
    await client.projectProperties
      .deleteProjectProperty({ projectIdOrKey: TEST_PROJECT_KEY, propertyKey: PROPERTY_KEY })
      .catch(() => undefined);
  });

  it('stores a nested value and reads it back byte for byte', async () => {
    const value = { nested: { list: [1, 'two', null] }, flag: true };

    await client.projectProperties.setProjectProperty({
      projectIdOrKey: TEST_PROJECT_KEY,
      propertyKey: PROPERTY_KEY,
      body: value,
    });

    const property = await client.projectProperties.getProjectProperty({
      projectIdOrKey: TEST_PROJECT_KEY,
      propertyKey: PROPERTY_KEY,
    });

    expect(property.key).toBe(PROPERTY_KEY);
    expect(property.value).toEqual(value);
  });

  it('lists the key with a resolvable self link', async () => {
    const keys = await client.projectProperties.getProjectPropertyKeys({ projectIdOrKey: TEST_PROJECT_KEY });

    const entry = keys.keys?.find(key => key.key === PROPERTY_KEY);

    expect(entry).toBeDefined();
    expect(entry!.self).toMatch(/^https:\/\//);
  });

  it('replaces rather than merges on a second write', async () => {
    await client.projectProperties.setProjectProperty({
      projectIdOrKey: TEST_PROJECT_KEY,
      propertyKey: PROPERTY_KEY,
      body: { only: 'this' },
    });

    const property = await client.projectProperties.getProjectProperty({
      projectIdOrKey: TEST_PROJECT_KEY,
      propertyKey: PROPERTY_KEY,
    });

    expect(property.value).toEqual({ only: 'this' });
  });

  it('addresses the project by id as well as by key', async () => {
    const project = await client.projects.getProject({ projectIdOrKey: TEST_PROJECT_KEY });

    const byId = await client.projectProperties.getProjectProperty({
      projectIdOrKey: project.id!,
      propertyKey: PROPERTY_KEY,
    });

    expect(byId.value).toEqual({ only: 'this' });
  });

  it('makes the property unreadable once deleted', async () => {
    await client.projectProperties.deleteProjectProperty({
      projectIdOrKey: TEST_PROJECT_KEY,
      propertyKey: PROPERTY_KEY,
    });

    const error = await client.projectProperties
      .getProjectProperty({ projectIdOrKey: TEST_PROJECT_KEY, propertyKey: PROPERTY_KEY })
      .catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });

  it('surfaces a property on a missing project as a typed NotFoundError', async () => {
    const error = await client.projectProperties
      .getProjectProperty({ projectIdOrKey: 'NOSUCHPROJECT', propertyKey: PROPERTY_KEY })
      .catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });
});
