import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('userProperties — live', () => {
  let live: LiveCloudClient;
  let accountId: string;

  beforeAll(async () => {
    live = createLiveCloudClient();
    const myself = await live.client.myself.getCurrentUser();
    accountId = myself.accountId!;
  });

  describe('getUserPropertyKeys', () => {
    it('returns PropertyKeys for current user', async () => {
      const result = await live.client.userProperties.getUserPropertyKeys({ accountId });

      expect(result).toBeDefined();
      expect(Array.isArray(result.keys)).toBe(true);
    });
  });

  describe('setUserProperty / getUserProperty / deleteUserProperty', () => {
    it('full property lifecycle', async () => {
      const propertyKey = 'live-test-prop';

      await live.client.userProperties.setUserProperty({
        accountId,
        propertyKey,
        body: { value: 'hello' },
      });

      const got = await live.client.userProperties.getUserProperty({ accountId, propertyKey });

      expect(got.key).toBe(propertyKey);

      await live.client.userProperties.deleteUserProperty({ accountId, propertyKey });
    });
  });
});
