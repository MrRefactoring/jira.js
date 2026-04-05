import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject } from './helpers/liveTestState';

describe('projectAvatars — live', () => {
  let live: LiveCloudClient;
  let projectIdOrKey: string;

  beforeAll(() => {
    live = createLiveCloudClient();
    const handle = getInjectedLiveProject();
    projectIdOrKey = handle.projectKey;
  });

  describe('getAllProjectAvatars', () => {
    it('returns ProjectAvatars', async () => {
      const result = await live.client.projectAvatars.getAllProjectAvatars({ projectIdOrKey });

      expect(result).toBeDefined();
      expect(Array.isArray(result.system)).toBe(true);
    });
  });
});
