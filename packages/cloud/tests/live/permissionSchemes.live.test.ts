import { beforeAll, describe, expect, it, type TestContext } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('permissionSchemes — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('getAllPermissionSchemes', () => {
    it('returns PermissionSchemes with array', async () => {
      const result = await live.client.permissionSchemes.getAllPermissionSchemes();

      expect(result).toBeDefined();
      expect(Array.isArray(result.permissionSchemes)).toBe(true);
      expect(result.permissionSchemes!.length).toBeGreaterThan(0);
    });
  });

  describe('getPermissionScheme', () => {
    it('returns a PermissionScheme by id', async (ctx: TestContext) => {
      const all = await live.client.permissionSchemes.getAllPermissionSchemes();

      if (!all.permissionSchemes || all.permissionSchemes.length === 0) { ctx.skip(); return; }

      const id = all.permissionSchemes[0]!.id!;
      const result = await live.client.permissionSchemes.getPermissionScheme({ schemeId: id });

      expect(result.id).toBe(id);
      expect(typeof result.name).toBe('string');
    });
  });

  describe('getPermissionSchemeGrants', () => {
    it('returns PermissionGrants', async (ctx: TestContext) => {
      const all = await live.client.permissionSchemes.getAllPermissionSchemes();

      if (!all.permissionSchemes || all.permissionSchemes.length === 0) { ctx.skip(); return; }

      const id = all.permissionSchemes[0]!.id!;
      const result = await live.client.permissionSchemes.getPermissionSchemeGrants({ schemeId: id });

      expect(result).toBeDefined();
      expect(Array.isArray(result.permissions)).toBe(true);
    });
  });
});
