import { z } from 'zod';
import { AvatarSchema } from '../models';

export const UpdateProjectAvatarSchema = z.object({}).extend(AvatarSchema.shape).extend({
  /** The ID or (case-sensitive) key of the project. */
  projectIdOrKey: z.string(),
});

export type UpdateProjectAvatar = z.input<typeof UpdateProjectAvatarSchema>;
