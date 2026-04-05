import { beforeAll, describe, expect, it } from 'vitest';
import { ApiError } from '@jira.js/base';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

// Priority ID 1 is "Highest" on standard Jira Cloud instances.
const KNOWN_PRIORITY_ID = '1';

describe('issuePriorities — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getPriority', () => {
    it('returns a Priority with id, name, and self', async () => {
      const result = await live.client.issuePriorities.getPriority({ id: KNOWN_PRIORITY_ID });

      expect(result.id).toBe(KNOWN_PRIORITY_ID);
      expect(typeof result.name).toBe('string');
      expect(typeof result.self).toBe('string');
    });

    it('throws ApiError for an unknown priority id', async () => {
      await expect(
        live.client.issuePriorities.getPriority({ id: '999999' }),
      ).rejects.toThrow(ApiError);
    });
  });
});
