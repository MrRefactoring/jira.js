import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('serverInfo — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getServerInfo', () => {
    it('returns server information with expected shape', async () => {
      const result = await live.client.serverInfo.getServerInfo();

      expect(typeof result.version).toBe('string');
      expect(Array.isArray(result.versionNumbers)).toBe(true);
      expect(result.versionNumbers!.length).toBe(3);
      expect(result.versionNumbers!.every((n) => typeof n === 'number')).toBe(true);
    });

    it('deploymentType is Cloud', async () => {
      const result = await live.client.serverInfo.getServerInfo();

      expect(result.deploymentType).toBe('Cloud');
    });

    it('baseUrl matches the configured host', async () => {
      const result = await live.client.serverInfo.getServerInfo();

      expect(typeof result.baseUrl).toBe('string');
      expect(result.baseUrl).toContain('atlassian.net');
    });

    it('serverTime is a Date', async () => {
      const result = await live.client.serverInfo.getServerInfo();

      expect(result.serverTime).toBeInstanceOf(Date);
      expect(result.serverTime!.getTime()).not.toBeNaN();
    });

    it('buildNumber is a positive integer', async () => {
      const result = await live.client.serverInfo.getServerInfo();

      expect(typeof result.buildNumber).toBe('number');
      expect(result.buildNumber!).toBeGreaterThan(0);
    });
  });
});
