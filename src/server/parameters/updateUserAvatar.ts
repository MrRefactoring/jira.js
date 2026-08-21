import { z } from 'zod';
import { AvatarSchema } from '../models';

export const UpdateUserAvatarSchema = z.object(AvatarSchema.shape).extend({
  /** Username */
  username: z.string().optional(),
});

export type UpdateUserAvatar = z.input<typeof UpdateUserAvatarSchema>;
