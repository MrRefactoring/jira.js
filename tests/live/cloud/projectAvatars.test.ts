import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { TEST_PROJECT_KEY } from '../setup/fixtures';
import { pngBlob } from '../helpers/image';

/**
 * Live suite for the `projectAvatars` API (`createProjectAvatar`, `getAllProjectAvatars`, `deleteProjectAvatar`).
 *
 * `createProjectAvatar` takes image bytes, which the specification describes as an object of arbitrary keys — the
 * shape that made this endpoint unusable before. Adding an avatar to a project is a write, but a contained one: it
 * lands in the project's list of custom avatars and is deleted again here. `updateProjectAvatar`, which would select
 * one as the project's displayed avatar, is deliberately not called — that changes what everyone sees.
 */
describe('Jira Cloud — projectAvatars (live)', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  afterAll(() => tracker.cleanup());

  it('adds an avatar from image bytes and lists it among the custom ones', async () => {
    const created = await client.projectAvatars.createProjectAvatar({
      projectIdOrKey: TEST_PROJECT_KEY,
      size: 48,
      x: 0,
      y: 0,
      body: pngBlob(48),
    });

    expect(created.id).toBeTruthy();
    expect(created.isSystemAvatar).toBe(false);

    tracker.defer(async () => {
      await client.projectAvatars.deleteProjectAvatar({ projectIdOrKey: TEST_PROJECT_KEY, id: Number(created.id) });
    });

    const avatars = await client.projectAvatars.getAllProjectAvatars({ projectIdOrKey: TEST_PROJECT_KEY });

    expect(avatars.system!.length).toBeGreaterThan(0);
    expect(avatars.custom?.some(avatar => avatar.id === created.id)).toBe(true);
  });

  it('refuses bytes that are not an image', async () => {
    const error = await client.projectAvatars
      .createProjectAvatar({
        projectIdOrKey: TEST_PROJECT_KEY,
        size: 48,
        body: new Blob([new Uint8Array([1, 2, 3, 4])], { type: 'image/png' }),
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBe(400);
  });
});
