import { z } from 'zod';
import { apiObject } from '#/core';
import { AvatarSchema } from './avatar';
/** List of system avatars. */

export const SystemAvatarsSchema = apiObject({
  /** A list of avatar details. */
  system: z.array(AvatarSchema).optional(),
});

export type SystemAvatars = z.infer<typeof SystemAvatarsSchema>;
