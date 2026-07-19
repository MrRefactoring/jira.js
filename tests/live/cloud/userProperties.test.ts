import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

/**
 * Live suite for the `userProperties` API (`getUserPropertyKeys`, `getUserProperty`, `setUserProperty`,
 * `deleteUserProperty`).
 *
 * The entity-property mechanism again, this time hung off a user. Exercised in full against the authenticating
 * account under a namespaced key, and never against anyone else — writing a property onto another person's account is
 * the one variant of this API with a privacy dimension.
 *
 * The wrinkle worth pinning is that `accountId` is typed optional on every one of these and is not. Omitting it looks
 * like it should mean "the calling user" — the parameter is `z.string().optional()`, inherited from the
 * specification — but Jira refuses the request outright, naming a query parameter the types said was unnecessary.
 * That is a compile-clean call that always fails at runtime.
 */

const PROPERTY_KEY = 'jira.js.livetest.user';

describe('Jira Cloud — userProperties (live, round trip)', () => {
  let client: CloudClient;
  let accountId: string;

  beforeAll(async () => {
    client = getCloudClient();
    accountId = (await client.myself.getCurrentUser()).accountId!;
  });

  afterAll(async () => {
    await client.userProperties.deleteUserProperty({ accountId, propertyKey: PROPERTY_KEY }).catch(() => undefined);
  });

  it('refuses the call when accountId is omitted, though the type allows it', async () => {
    const error = await client.userProperties
      .setUserProperty({ propertyKey: PROPERTY_KEY, body: { written: 'no accountId' } })
      .catch((e: unknown) => e);

    // Typed optional, required in practice. There is no defaulting to "the
    // calling user" — the request is rejected before it reaches any storage,
    // and the message names the very parameter the signature said to skip.
    expect((error as { status?: number }).status).toBe(400);
  });

  it('stores a value when the accountId is named', async () => {
    await client.userProperties.setUserProperty({
      accountId,
      propertyKey: PROPERTY_KEY,
      body: { written: 'with an accountId' },
    });

    const property = await client.userProperties.getUserProperty({ accountId, propertyKey: PROPERTY_KEY });

    expect(property.key).toBe(PROPERTY_KEY);
    expect(property.value).toEqual({ written: 'with an accountId' });
  });

  it('lists the key among the account properties', async () => {
    const keys = await client.userProperties.getUserPropertyKeys({ accountId });

    const entry = keys.keys?.find(key => key.key === PROPERTY_KEY);

    expect(entry).toBeDefined();
    expect(entry!.self).toMatch(/^https:\/\//);
  });

  it('replaces rather than merges on a second write', async () => {
    await client.userProperties.setUserProperty({ accountId, propertyKey: PROPERTY_KEY, body: { only: 'this' } });

    const property = await client.userProperties.getUserProperty({ accountId, propertyKey: PROPERTY_KEY });

    expect(property.value).toEqual({ only: 'this' });
  });

  it('makes the property unreadable once deleted', async () => {
    await client.userProperties.deleteUserProperty({ accountId, propertyKey: PROPERTY_KEY });

    const error = await client.userProperties
      .getUserProperty({ accountId, propertyKey: PROPERTY_KEY })
      .catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });

  it('surfaces a property on an unknown account as a typed error', async () => {
    const error = await client.userProperties
      .getUserProperty({ accountId: 'no-such-account-id', propertyKey: PROPERTY_KEY })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
