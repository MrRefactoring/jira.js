import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject } from './helpers/liveTestState';

describe('projectFeatures — live', () => {
  let live: LiveCloudClient;
  let projectKey: string;

  beforeAll(() => {
    live = createLiveCloudClient();
    const handle = getInjectedLiveProject();

    projectKey = handle.projectKey;
  });

  describe('getFeaturesForProject', () => {
    it('returns ContainerForProjectFeatures', async () => {
      const result = await live.client.projectFeatures.getFeaturesForProject({ projectIdOrKey: projectKey });

      expect(result).toBeDefined();
      expect(Array.isArray(result.features)).toBe(true);
    });
  });
});
