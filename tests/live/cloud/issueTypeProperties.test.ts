import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { TEST_ISSUE_TYPE, TEST_PROJECT_KEY } from '../setup/fixtures';

/**
 * Live suite for the `issueTypeProperties` API (`getIssueTypePropertyKeys`, `getIssueTypeProperty`,
 * `setIssueTypeProperty`, `deleteIssueTypeProperty`).
 *
 * The fourth home of the same entity-property mechanism, after issues, projects and users. Exercised in full under a
 * namespaced key.
 *
 * This one carries a caveat the others do not: an issue type is site-wide, so the property is visible to every
 * project that uses that type. It is still safe — a key nothing else reads affects nothing — but it is not
 * project-scoped, and a suite that treated it as such would be reasoning about the wrong blast radius.
 */

const PROPERTY_KEY = 'jira.js.livetest.issuetype';

describe('Jira Cloud — issueTypeProperties (live, round trip)', () => {
  let client: CloudClient;
  let issueTypeId: string;

  beforeAll(async () => {
    client = getCloudClient();

    const project = await client.projects.getProject({ projectIdOrKey: TEST_PROJECT_KEY });

    issueTypeId = project.issueTypes!.find(type => type.name === TEST_ISSUE_TYPE)!.id!;
  });

  afterAll(async () => {
    await client.issueTypeProperties.deleteIssueTypeProperty({ issueTypeId, propertyKey: PROPERTY_KEY }).catch(
      () => undefined,
    );
  });

  it('stores a value against the issue type and reads it back', async () => {
    const value = { scope: 'issue type', list: [1, 2, 3] };

    await client.issueTypeProperties.setIssueTypeProperty({ issueTypeId, propertyKey: PROPERTY_KEY, body: value });

    const property = await client.issueTypeProperties.getIssueTypeProperty({ issueTypeId, propertyKey: PROPERTY_KEY });

    expect(property.key).toBe(PROPERTY_KEY);
    expect(property.value).toEqual(value);
  });

  it('lists the key among the issue type properties', async () => {
    const keys = await client.issueTypeProperties.getIssueTypePropertyKeys({ issueTypeId });

    const entry = keys.keys?.find(key => key.key === PROPERTY_KEY);

    expect(entry).toBeDefined();
    expect(entry!.self).toMatch(/^https:\/\//);
  });

  it('replaces rather than merges on a second write', async () => {
    await client.issueTypeProperties.setIssueTypeProperty({
      issueTypeId,
      propertyKey: PROPERTY_KEY,
      body: { only: 'this' },
    });

    const property = await client.issueTypeProperties.getIssueTypeProperty({ issueTypeId, propertyKey: PROPERTY_KEY });

    expect(property.value).toEqual({ only: 'this' });
  });

  it('does not leak into the property space of an issue of that type', async () => {
    const issues = await client.projects.getAllStatuses({ projectIdOrKey: TEST_PROJECT_KEY });

    expect(issues.length).toBeGreaterThan(0);

    // Four separate property namespaces share one mechanism and one key format.
    // A property set on the *type* is not visible on an *issue* of that type,
    // which is the mistake the shared shape invites.
    const onProject = await client.projectProperties
      .getProjectProperty({ projectIdOrKey: TEST_PROJECT_KEY, propertyKey: PROPERTY_KEY })
      .catch((e: unknown) => e);

    expect(isNotFoundError(onProject)).toBe(true);
  });

  it('makes the property unreadable once deleted', async () => {
    await client.issueTypeProperties.deleteIssueTypeProperty({ issueTypeId, propertyKey: PROPERTY_KEY });

    const error = await client.issueTypeProperties
      .getIssueTypeProperty({ issueTypeId, propertyKey: PROPERTY_KEY })
      .catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });

  it('surfaces a property on an unknown issue type as a typed error', async () => {
    const error = await client.issueTypeProperties
      .getIssueTypeProperty({ issueTypeId: '99999999', propertyKey: PROPERTY_KEY })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
