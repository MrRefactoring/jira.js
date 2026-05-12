import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('timeTracking — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getAvailableTimeTrackingImplementations', () => {
    it('returns an array of TimeTrackingProvider', async () => {
      const result = await live.client.timeTracking.getAvailableTimeTrackingImplementations();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('each provider has key and name', async () => {
      const result = await live.client.timeTracking.getAvailableTimeTrackingImplementations();

      for (const provider of result) {
        expect(typeof provider.key).toBe('string');
        expect(typeof provider.name).toBe('string');
      }
    });
  });

  describe('getSharedTimeTrackingConfiguration', () => {
    it('returns a TimeTrackingConfiguration', async () => {
      const result = await live.client.timeTracking.getSharedTimeTrackingConfiguration();

      expect(typeof result).toBe('object');
    });

    it('has workingHoursPerDay and workingDaysPerWeek', async () => {
      const result = await live.client.timeTracking.getSharedTimeTrackingConfiguration();

      expect(typeof result.workingHoursPerDay).toBe('number');
      expect(typeof result.workingDaysPerWeek).toBe('number');
    });
  });
});
