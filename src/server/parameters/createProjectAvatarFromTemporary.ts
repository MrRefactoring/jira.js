import { z } from 'zod';
import { AvatarCroppingSchema } from '../models';

export const CreateProjectAvatarFromTemporarySchema = z.object(AvatarCroppingSchema.shape).extend({
  /** Project id or project key */
  projectIdOrKey: z.string(),
});

export type CreateProjectAvatarFromTemporary = z.input<typeof CreateProjectAvatarFromTemporarySchema>;
