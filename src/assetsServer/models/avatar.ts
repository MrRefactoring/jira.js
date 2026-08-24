import { z } from 'zod';
import { apiObject } from '#/core';

export const AvatarSchema = apiObject({
  id: z.number().optional(),
  avatarUUID: z.string().optional(),
  url16: z.string().optional(),
  url48: z.string().optional(),
  url72: z.string().optional(),
  url144: z.string().optional(),
  url288: z.string().optional(),
  objectId: z.number().optional(),
});

export type Avatar = z.infer<typeof AvatarSchema>;
