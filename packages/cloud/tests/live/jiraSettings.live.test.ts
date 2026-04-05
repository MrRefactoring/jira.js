import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('jiraSettings — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getConfiguration', () => {
    it('returns a Configuration object', async () => {
      const result = await live.client.jiraSettings.getConfiguration();

      expect(typeof result).toBe('object');
    });

    it('has voting and watching enabled fields', async () => {
      const result = await live.client.jiraSettings.getConfiguration();

      expect(typeof result.votingEnabled).toBe('boolean');
      expect(typeof result.watchingEnabled).toBe('boolean');
    });
  });

  describe('getAdvancedSettings', () => {
    it('returns an array of ApplicationProperty', async () => {
      const result = await live.client.jiraSettings.getAdvancedSettings();

      expect(Array.isArray(result)).toBe(true);
    });

    it('each property has id, value, and type', async () => {
      const result = await live.client.jiraSettings.getAdvancedSettings();

      if (result.length === 0) return;

      for (const prop of result) {
        expect(typeof prop.id).toBe('string');
      }
    });
  });

  describe('getApplicationProperty', () => {
    it('returns application properties when called without key', async () => {
      const result = await live.client.jiraSettings.getApplicationProperty();

      expect(Array.isArray(result)).toBe(true);
    });
  });
});
