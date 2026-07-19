import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError, isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

/**
 * Live suite for the `applicationRoles` API (`getAllApplicationRoles`, `getApplicationRole`).
 *
 * Both endpoints require site administration. A token without it must fail *typed* — that is the part worth pinning,
 * because an untyped rejection here is indistinguishable from a network fault to calling code. Where the token does
 * hold admin, the full shape is asserted instead.
 */
describe('Jira Cloud — applicationRoles (live, admin-gated)', () => {
  let client: CloudClient;
  let hasAdmin = false;

  beforeAll(async () => {
    client = getCloudClient();

    hasAdmin = await client.applicationRoles
      .getAllApplicationRoles()
      .then(() => true)
      .catch(() => false);
  });

  it('lists application roles for an admin, or fails as a typed permission error', async () => {
    const result = await client.applicationRoles.getAllApplicationRoles().catch((e: unknown) => e);

    if (!hasAdmin) {
      // The distinction matters: a caller retries a network fault and re-authorizes
      // a permission fault, and only a typed error lets them tell which happened.
      expect(isForbiddenError(result)).toBe(true);

      return;
    }

    const roles = result as Awaited<ReturnType<typeof client.applicationRoles.getAllApplicationRoles>>;

    expect(Array.isArray(roles)).toBe(true);
    expect(roles.length).toBeGreaterThan(0);

    for (const role of roles) {
      expect(typeof role.key).toBe('string');
      expect(typeof role.name).toBe('string');
      expect(typeof role.numberOfSeats).toBe('number');
    }

    // Every Jira site has the core software role.
    expect(roles.map(role => role.key)).toContain('jira-software');
  });

  it('resolves a single role by key when admin rights allow it', async () => {
    if (!hasAdmin) return;

    const roles = await client.applicationRoles.getAllApplicationRoles();
    const sample = roles[0]!;

    const role = await client.applicationRoles.getApplicationRole({ key: sample.key! });

    expect(role.key).toBe(sample.key);
    expect(role.name).toBe(sample.name);
  });

  it('surfaces an unknown role key as a typed error, never an untyped rejection', async () => {
    const error = await client.applicationRoles.getApplicationRole({ key: 'no-such-role' }).catch((e: unknown) => e);

    // Without admin the request is refused before the key is even looked at, so
    // both typed outcomes are correct — an untyped one never is.
    expect(isNotFoundError(error) || isForbiddenError(error)).toBe(true);
  });
});
