import test from 'ava';
import type { Avatar } from '../../../src/version3/models/index.js';
import { getVersion3Client } from '../utils/index.js';

const client = getVersion3Client();

let avatar: Avatar | undefined;

test.serial('should get all system avatars', async t => {
  const systemAvatars = await client.avatars.getAllSystemAvatars({ type: 'project' });

  avatar = systemAvatars.system?.[0];

  t.truthy(!!avatar);
});

test.serial('should return avatar image with contentType', async t => {
  const avatarWithDetails = await client.avatars.getAvatarImageByID({ id: avatar!.id, type: 'project' });

  t.is(avatarWithDetails.contentType, 'image/svg+xml');
  t.truthy(avatarWithDetails.avatar instanceof Uint8Array);
});
