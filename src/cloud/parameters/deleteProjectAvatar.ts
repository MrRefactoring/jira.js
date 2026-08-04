import { z } from 'zod';

export const DeleteProjectAvatarSchema = z.object({
  /** The project ID or (case-sensitive) key. */
  projectIdOrKey: z.string(),
  /** The ID of the avatar. */
  id: z.number(),
});

export type DeleteProjectAvatar = z.input<typeof DeleteProjectAvatarSchema>;
