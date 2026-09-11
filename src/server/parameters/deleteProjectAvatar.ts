import { z } from 'zod';

export const DeleteProjectAvatarSchema = z.object({
  /** Project id or project key */
  projectIdOrKey: z.string(),
  /** Database id for avatar */
  id: z.number(),
});

export type DeleteProjectAvatar = z.input<typeof DeleteProjectAvatarSchema>;
