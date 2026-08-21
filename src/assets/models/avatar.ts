import { z } from 'zod';
import { apiObject } from '#/core';
/**
 * The object avatar is a custom image that represents an object. If the object has no avatar the icon for the object
 * type will be used
 */

export const AvatarSchema = apiObject({
  workspaceId: z.string(),
  globalId: z.string(),
  id: z.string().optional(),
  avatarUUID: z.string().optional(),
  url16: z.string(),
  url48: z.string(),
  url72: z.string(),
  url144: z.string(),
  url288: z.string(),
  /** A reference to the object that this avatar is associated with */
  objectId: z.string(),
});

export type Avatar = z.infer<typeof AvatarSchema>;
