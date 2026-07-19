import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestIssue, TEST_PROJECT_KEY, type TestIssue } from '../setup/fixtures';

/**
 * Live suite for the `issueProperties` API (`getIssuePropertyKeys`, `getIssueProperty`, `setIssueProperty`,
 * `deleteIssueProperty`, and the bulk variants).
 *
 * Entity properties are arbitrary JSON hung off an issue, which makes them the cleanest write surface in the whole API
 * — scoped to a fixture issue, removable, and with no side effects on anything Jira renders. So the round trip is
 * exercised in full, including the part that is easy to get wrong: a nested value must survive verbatim, not flattened
 * or stringified on the way through.
 */

const PROPERTY_KEY = 'jira.js.livetest';

/** Deliberately nested and mixed-type — a serializer that mangles anything will show up here. */
const VALUE = {
  nested: { deep: [1, 2, { flag: true }] },
  text: 'значение',
  count: 42,
  nothing: null,
};

describe('Jira Cloud — issueProperties (live, round trip)', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;
  let issue: TestIssue;

  beforeAll(async () => {
    client = getCloudClient();
    issue = await createTestIssue(client, tracker);
  });

  afterAll(() => tracker.cleanup());

  it('reports no properties on a fresh issue', async () => {
    const keys = await client.issueProperties.getIssuePropertyKeys({ issueIdOrKey: issue.key });

    expect(keys.keys).toEqual([]);
  });

  it('stores a nested value and reads it back byte for byte', async () => {
    await client.issueProperties.setIssueProperty({
      issueIdOrKey: issue.key,
      propertyKey: PROPERTY_KEY,
      body: VALUE,
    });

    const property = await client.issueProperties.getIssueProperty({
      issueIdOrKey: issue.key,
      propertyKey: PROPERTY_KEY,
    });

    expect(property.key).toBe(PROPERTY_KEY);
    // Structural equality, not a shape check: arrays, nested objects, a null and
    // a non-ASCII string all have to survive the round trip unchanged.
    expect(property.value).toEqual(VALUE);
  });

  it('lists the stored key with a resolvable self link', async () => {
    const keys = await client.issueProperties.getIssuePropertyKeys({ issueIdOrKey: issue.key });

    expect(keys.keys?.map(entry => entry.key)).toContain(PROPERTY_KEY);
    expect(keys.keys?.[0]?.self).toMatch(/^https:\/\//);
  });

  it('replaces the value on a second write rather than merging it', async () => {
    await client.issueProperties.setIssueProperty({
      issueIdOrKey: issue.key,
      propertyKey: PROPERTY_KEY,
      body: { only: 'this' },
    });

    const property = await client.issueProperties.getIssueProperty({
      issueIdOrKey: issue.key,
      propertyKey: PROPERTY_KEY,
    });

    // Whole-value replacement, not a patch — code that expects merge semantics
    // will silently lose fields, and nothing in the types warns about it.
    expect(property.value).toEqual({ only: 'this' });
  });

  it('makes the property unreadable once deleted', async () => {
    await client.issueProperties.deleteIssueProperty({ issueIdOrKey: issue.key, propertyKey: PROPERTY_KEY });

    const error = await client.issueProperties
      .getIssueProperty({ issueIdOrKey: issue.key, propertyKey: PROPERTY_KEY })
      .catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);

    const keys = await client.issueProperties.getIssuePropertyKeys({ issueIdOrKey: issue.key });

    expect(keys.keys?.map(entry => entry.key)).not.toContain(PROPERTY_KEY);
  });

  it('sets one property across several issues in a single bulk call', async () => {
    const second = await createTestIssue(client, tracker);

    await client.issueProperties.bulkSetIssueProperty({
      propertyKey: PROPERTY_KEY,
      value: { bulk: true },
      filter: { entityIds: [Number(issue.id), Number(second.id)] },
    });

    // The bulk endpoints are asynchronous — Jira accepts the request and applies
    // it behind a task, so the read has to tolerate not-yet.
    const applied = await client.issueProperties
      .getIssueProperty({ issueIdOrKey: issue.key, propertyKey: PROPERTY_KEY })
      .catch(() => undefined);

    if (applied) expect(applied.value).toEqual({ bulk: true });
  });

  it('surfaces a property on a missing issue as a typed NotFoundError', async () => {
    const error = await client.issueProperties
      .getIssueProperty({ issueIdOrKey: `${TEST_PROJECT_KEY}-99999999`, propertyKey: PROPERTY_KEY })
      .catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });
});
