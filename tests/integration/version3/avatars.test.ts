import type { Avatar } from '@jirajs/version3/models';
import { test } from 'vitest';
import { createSoftwareProject, deleteSoftwareProject, getVersion3Client } from '@tests/integration/utils';

const client = getVersion3Client();

let avatar: Omit<Avatar, 'fileName' | 'owner'>;

test.sequential('should get all system avatars', async ({ expect }) => {
  const systemAvatars = await client.avatars.getAllSystemAvatars({ type: 'project' });

  [avatar] = systemAvatars.system;

  expect(!!avatar).toBeTruthy();
  expect(typeof avatar.id).toBe('string');
  expect(avatar.isSystemAvatar).toBe(true);
  expect(avatar.isSelected).toBe(false);
  expect(avatar.isDeletable).toBe(false);
  expect(typeof avatar.urls['16x16']).toBe('string');
  expect(typeof avatar.urls['24x24']).toBe('string');
  expect(typeof avatar.urls['32x32']).toBe('string');
  expect(typeof avatar.urls['48x48']).toBe('string');
});

// test.sequential('should return avatar image with contentType', async ({ expect }) => {
//   const avatarWithDetails = await client.avatars.getAvatarImageByID({
//     id: avatar.id,
//     type: 'project',
//   });
//
//   expect(avatarWithDetails.contentType).toBe('image/svg+xml');
//   expect(avatarWithDetails.avatar instanceof Uint8Array).toBeTruthy();
// });
//
// test.sequential('should store a new avatar', async ({ expect }) => {
//   const project = await createSoftwareProject();
//
//   let storedAvatar;
//
//   try {
//     const avatarWithDetails = await client.avatars.getAvatarImageByType({
//       type: 'project',
//       format: 'png',
//     });
//
//     storedAvatar = await client.avatars.storeAvatar({
//       entityId: project.id,
//       type: 'project',
//       size: 0,
//       mimeType: avatarWithDetails.contentType,
//       avatar: avatarWithDetails.avatar,
//     });
//   } finally {
//     await deleteSoftwareProject();
//   }
//
//   expect(storedAvatar).toBeDefined();
//   expect(storedAvatar.id).toBeTruthy();
//   expect(storedAvatar.owner).toBeTruthy();
//   expect(storedAvatar.isSystemAvatar).toBeFalsy();
//   expect(storedAvatar.isSelected).toBeFalsy();
//   expect(storedAvatar.isDeletable).toBeTruthy();
// });
