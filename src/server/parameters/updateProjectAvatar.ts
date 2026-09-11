import { z } from 'zod';
import { AvatarSchema } from '../models';

export const UpdateProjectAvatarSchema = z.object(AvatarSchema.shape).extend({
  /** Project id or project key */
  projectIdOrKey: z.string(),
});

export type UpdateProjectAvatar = z.input<typeof UpdateProjectAvatarSchema>;
