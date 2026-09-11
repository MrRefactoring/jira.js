import { z } from 'zod';
import { AvatarCroppingSchema } from '../models';

export const CreateUserAvatarFromTemporarySchema = z.object(AvatarCroppingSchema.shape).extend({
  /** Username */
  username: z.string().optional(),
});

export type CreateUserAvatarFromTemporary = z.input<typeof CreateUserAvatarFromTemporarySchema>;
