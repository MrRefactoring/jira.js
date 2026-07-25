import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError, isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

/**
 * Live suite for the `issueLinkTypes` API (`getIssueLinkTypes`, `getIssueLinkType`, and the admin-only
 * create/update/delete trio).
 *
 * Link types are site-wide configuration, not project state: creating one adds a permanent option to every issue on
 * the tenant, and deleting one silently drops every link that used it. So the write half is deliberately not
 * exercised here — the read half is asserted fully, and the writes are pinned only to the extent that they fail typed
 * without admin rights.
 */
describe('Jira Cloud — issueLinkTypes (live, read-only)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('lists the site link types, each with both directional phrasings', async () => {
    const types = await client.issueLinkTypes.getIssueLinkTypes();

    expect(Array.isArray(types.issueLinkTypes)).toBe(true);
    expect(types.issueLinkTypes!.length).toBeGreaterThan(0);

    for (const type of types.issueLinkTypes!) {
      expect(type.id).toMatch(/^\d+$/);
      expect(typeof type.name).toBe('string');
      expect(type.inward).toBeTruthy();
      expect(type.outward).toBeTruthy();
      expect(type.self).toMatch(/^https:\/\//);
    }
  });

  it('includes the "Relates" type every Jira site ships with', async () => {
    const types = await client.issueLinkTypes.getIssueLinkTypes();
    const relates = types.issueLinkTypes!.find(type => type.name === 'Relates');

    expect(relates).toBeDefined();
    expect(relates!.inward).toBe('relates to');
    expect(relates!.outward).toBe('relates to');
  });

  it('resolves a single type by id, identical to its listing entry', async () => {
    const types = await client.issueLinkTypes.getIssueLinkTypes();
    const sample = types.issueLinkTypes![0]!;

    const fetched = await client.issueLinkTypes.getIssueLinkType({ issueLinkTypeId: sample.id! });

    expect(fetched).toEqual(sample);
  });

  it('surfaces an unknown type id as a typed NotFoundError', async () => {
    const error = await client.issueLinkTypes
      .getIssueLinkType({ issueLinkTypeId: '99999999' })
      .catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });

  it('fails typed on the destructive path, without ever aiming it at a real type', async () => {
    const error = await client.issueLinkTypes.deleteIssueLinkType({ issueLinkTypeId: '99999999' }).catch(e => e);

    expect(error).toBeInstanceOf(Error);
    expect(isNotFoundError(error) || isForbiddenError(error)).toBe(true);
  });
});
