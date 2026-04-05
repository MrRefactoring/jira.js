import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject } from './helpers/liveTestState';

describe('projectProperties — live', () => {
  let live: LiveCloudClient;
  let projectIdOrKey: string;

  beforeAll(() => {
    live = createLiveCloudClient();
    const handle = getInjectedLiveProject();
    projectIdOrKey = handle.projectKey;
  });

  describe('getProjectPropertyKeys', () => {
    it('returns PropertyKeys', async () => {
      const result = await live.client.projectProperties.getProjectPropertyKeys({ projectIdOrKey });

      expect(result).toBeDefined();
      expect(Array.isArray(result.keys)).toBe(true);
    });
  });

  describe('setProjectProperty / getProjectProperty / deleteProjectProperty', () => {
    it('full property lifecycle', async () => {
      const propertyKey = 'live-test-prop';

      await live.client.projectProperties.setProjectProperty({
        projectIdOrKey,
        propertyKey,
        body: { value: 'test' },
      });

      const got = await live.client.projectProperties.getProjectProperty({ projectIdOrKey, propertyKey });

      expect(got.key).toBe(propertyKey);

      await live.client.projectProperties.deleteProjectProperty({ projectIdOrKey, propertyKey });
    });
  });
});
