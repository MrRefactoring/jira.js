import { z } from 'zod';
import { AvatarSchema } from '../models';

export const UpdateProjectAvatarSchema = z
  .object({
    /** The ID or (case-sensitive) key of the project. */
    projectIdOrKey: z.string(),
  })
  .extend(AvatarSchema.shape);

export type UpdateProjectAvatar = z.input<typeof UpdateProjectAvatarSchema>;
