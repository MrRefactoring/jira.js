import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { TEST_PROJECT_KEY } from '../setup/fixtures';
import { pngBlob } from '../helpers/image';

/**
 * Live suite for the `avatars` API (`getAllSystemAvatars`, `getAvatars`, `storeAvatar`, `deleteAvatar`,
 * `getAvatarImageByType`, `getAvatarImageByID`, `getAvatarImageByOwner`).
 *
 * Both directions carry bytes, and the specification describes both as JSON, so both are asserted here: an image
 * comes back as an image rather than as a parse failure that reads like a corrupt response, and an upload is accepted
 * as an image rather than as an object. The upload is the one write this file makes — a custom avatar added to the
 * test project and deleted again, which touches nothing else on the site.
 *
 * Fixtures come from endpoints asserted above rather than from guards, so nothing here can quietly stop testing.
 */
describe('Jira Cloud — avatars (live)', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  afterAll(() => tracker.cleanup());

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
    const avatars = await client.avatars.getAllSystemAvatars({ type: 'project' });
    const avatarId = Number(avatars.system![0].id);

    const image = await client.avatars.getAvatarImageByID({ type: 'project', id: avatarId });

    expect(image).toBeInstanceOf(Blob);
    expect(image.type).toMatch(/^image\//);
    expect(image.size).toBeGreaterThan(50);
  });

  it('returns the default avatar image for a type, and the image of an owner', async () => {
    const project = await client.projects.getProject({ projectIdOrKey: TEST_PROJECT_KEY });

    const byType = await client.avatars.getAvatarImageByType({ type: 'project' });
    const byOwner = await client.avatars.getAvatarImageByOwner({ type: 'project', entityId: project.id! });

    for (const image of [byType, byOwner]) {
      expect(image).toBeInstanceOf(Blob);
      expect(image.type).toMatch(/^image\//);
      expect(image.size).toBeGreaterThan(50);
    }
  });

  it('stores a custom avatar from image bytes, and lists it as custom', async () => {
    const project = await client.projects.getProject({ projectIdOrKey: TEST_PROJECT_KEY });

    const stored = await client.avatars.storeAvatar({
      type: 'project',
      entityId: project.id!,
      size: 48,
      x: 0,
      y: 0,
      body: pngBlob(48),
    });

    expect(stored.id).toBeTruthy();
    expect(stored.isSystemAvatar).toBe(false);
    expect(stored.isDeletable).toBe(true);

    tracker.defer(async () => {
      await client.avatars.deleteAvatar({ type: 'project', owningObjectId: project.id!, id: Number(stored.id) });
    });

    const avatars = await client.avatars.getAvatars({ type: 'project', entityId: project.id! });

    expect(avatars.custom?.some(avatar => avatar.id === stored.id)).toBe(true);
  });

  it('serves the avatar it was just given, as the image it was given', async () => {
    const project = await client.projects.getProject({ projectIdOrKey: TEST_PROJECT_KEY });

    const stored = await client.avatars.storeAvatar({
      type: 'project',
      entityId: project.id!,
      size: 48,
      x: 0,
      y: 0,
      body: pngBlob(48),
    });

    tracker.defer(async () => {
      await client.avatars.deleteAvatar({ type: 'project', owningObjectId: project.id!, id: Number(stored.id) });
    });

    const image = await client.avatars.getAvatarImageByID({ type: 'project', id: Number(stored.id) });

    expect(image.type).toMatch(/^image\/png\b/);
    expect(image.size).toBeGreaterThan(50);
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
