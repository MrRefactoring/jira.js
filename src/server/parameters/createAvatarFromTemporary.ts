import { z } from 'zod';
import { AvatarCroppingSchema } from '../models';

export const CreateAvatarFromTemporarySchema = z.object(AvatarCroppingSchema.shape).extend({
  type: z.string(),
  /** Entity id where to change avatar */
  owningObjectId: z.string(),
});

export type CreateAvatarFromTemporary = z.input<typeof CreateAvatarFromTemporarySchema>;
