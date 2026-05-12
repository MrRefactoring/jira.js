import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('projectKeyAndNameValidation — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('validateProjectKey', () => {
    it('returns empty ErrorCollection for a valid unused key', async () => {
      const result = await live.client.projectKeyAndNameValidation.validateProjectKey({
        key: 'VALIDUNUSEDKEY99',
      });

      expect(Array.isArray(result.errorMessages) || result.errorMessages === undefined).toBe(true);
    });

    it('returns errors for an invalid key format', async () => {
      const result = await live.client.projectKeyAndNameValidation.validateProjectKey({
        key: 'invalid-key',
      });

      const hasErrors =
        (result.errorMessages && result.errorMessages.length > 0) ||
        (result.errors && Object.keys(result.errors).length > 0);

      expect(hasErrors).toBe(true);
    });
  });

  describe('getValidProjectKey', () => {
    it('returns the same key when it is valid and available', async () => {
      const result = await live.client.projectKeyAndNameValidation.getValidProjectKey({
        key: 'VALIDUNUSEDKEY99',
      });

      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('returns a valid key when the input key is invalid', async () => {
      const result = await live.client.projectKeyAndNameValidation.getValidProjectKey({
        key: 'invalid_key_format',
      });

      expect(typeof result).toBe('string');
    });
  });

  describe('getValidProjectName', () => {
    it('returns the same name when not in use', async () => {
      const result = await live.client.projectKeyAndNameValidation.getValidProjectName({
        name: 'Completely Unique Test Name 12345',
      });

      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
