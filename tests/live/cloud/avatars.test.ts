import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError, isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { TEST_PROJECT_KEY } from '../setup/fixtures';

/**
 * Live suite for the `avatars` API (`getAllSystemAvatars`, `getAvatars`, `storeAvatar`, `deleteAvatar`,
 * `getAvatarImageByType`, `getAvatarImageByID`, `getAvatarImageByOwner`).
 *
 * Read-only. Uploading an avatar is a binary write against site or project configuration, and the image endpoints
 * return raw bytes rather than JSON — which is the part worth asserting here, because a client that tries to parse an
 * image as JSON fails in a way that looks like a corrupt response.
 */
describe('Jira Cloud — avatars (live, read-only)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('lists the system avatars for each type', async () => {
    for (const type of ['project', 'issuetype', 'user', 'priority'] as const) {
      const avatars = await client.avatars.getAllSystemAvatars({ type });

      expect(Array.isArray(avatars.system)).toBe(true);
      expect(avatars.system!.length).toBeGreaterThan(0);

      for (const avatar of avatars.system!) {
        expect(avatar.id).toBeTruthy();
        expect(avatar.isSystemAvatar).toBe(true);
        expect(avatar.isDeletable).toBe(false);
      }
    }
  });

  it('separates system from custom avatars for a project', async () => {
    const project = await client.projects.getProject({ projectIdOrKey: TEST_PROJECT_KEY });

    const avatars = await client.avatars.getAvatars({ type: 'project', entityId: project.id! });

    expect(Array.isArray(avatars.system)).toBe(true);
    expect(Array.isArray(avatars.custom)).toBe(true);

    for (const avatar of avatars.custom ?? []) expect(avatar.isSystemAvatar).toBe(false);
  });

  it('returns an avatar image as bytes, not JSON', async () => {
    const project = await client.projects.getProject({ projectIdOrKey: TEST_PROJECT_KEY });
    const avatarId = (project.avatarUrls?.['48x48'] ?? '').match(/avatarId=(\d+)/)?.[1];

    if (!avatarId) return;

    const image = await client.avatars
      .getAvatarImageByID({ type: 'project', id: Number(avatarId) })
      .catch((e: unknown) => e);

    if (image instanceof Error) {
      expect(isForbiddenError(image) || isNotFoundError(image)).toBe(true);

      return;
    }

    const bytes = new Uint8Array(image as ArrayBufferLike);

    expect(bytes.byteLength).toBeGreaterThan(0);
    expect(bytes.byteLength).toBeGreaterThan(50);
  });

  it('answers an unknown avatar type with an empty list rather than an error', async () => {
    const avatars = await client.avatars.getAllSystemAvatars({ type: 'nosuchtype' as 'project' });

    expect(avatars.system).toEqual([]);
  });

  it('answers an unknown entity with the whole system catalogue', async () => {
    const avatars = await client.avatars.getAvatars({ type: 'project', entityId: '99999999' });

    expect(avatars.system!.length).toBeGreaterThan(0);
    expect(avatars.custom ?? []).toEqual([]);
  });

  it('fails typed on the destructive path, without ever aiming it at a real avatar', async () => {
    const error = await client.avatars
      .deleteAvatar({ type: 'project', owningObjectId: '99999999', id: 99999999 })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
