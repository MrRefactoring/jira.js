import { z } from 'zod';
import { AvatarSchema } from './avatar';

/** List of system avatars. */
export const SystemAvatarsSchema = z.object({
  /** A list of avatar details. */
  system: z.array(AvatarSchema).optional(),
});

export type SystemAvatars = z.infer<typeof SystemAvatarsSchema>;
