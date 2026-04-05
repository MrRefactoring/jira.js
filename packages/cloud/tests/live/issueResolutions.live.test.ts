import { beforeAll, describe, expect, it } from 'vitest';
import { ApiError } from '@jira.js/base';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

// Resolution IDs are Jira-instance specific.
// 10000 is the default "Done" resolution on fresh Jira Cloud instances.
const KNOWN_RESOLUTION_ID = '10000';

describe('issueResolutions — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getResolution', () => {
    it('returns a Resolution with id, name, and description', async () => {
      const result = await live.client.issueResolutions.getResolution({ id: KNOWN_RESOLUTION_ID });

      expect(result.id).toBe(KNOWN_RESOLUTION_ID);
      expect(typeof result.name).toBe('string');
      expect(typeof result.description).toBe('string');
    });

    it('throws ApiError for an unknown resolution id', async () => {
      await expect(
        live.client.issueResolutions.getResolution({ id: '999999' }),
      ).rejects.toThrow(ApiError);
    });
  });
});
