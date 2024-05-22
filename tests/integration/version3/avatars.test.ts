import { test } from 'vitest';
import type { Avatar } from '../../../src/version3/models/index.js';
import { getVersion3Client } from '../utils/index.js';

const client = getVersion3Client();

let avatar: Avatar | undefined;

test.sequential('should get all system avatars', async ({ expect }) => {
  const systemAvatars = await client.avatars.getAllSystemAvatars({ type: 'project' });

  avatar = systemAvatars.system?.[0];

  expect(!!avatar).toBeTruthy();
});

test.sequential('should return avatar image with contentType', async ({ expect }) => {
  const avatarWithDetails = await client.avatars.getAvatarImageByID({ id: avatar!.id, type: 'project' });

  expect(avatarWithDetails.contentType).toBe('image/svg+xml');
  expect(avatarWithDetails.avatar instanceof Uint8Array).toBeTruthy();
});
