import { z } from 'zod';

export const DeleteUserAvatarSchema = z.object({
  /** Database id for avatar */
  id: z.number(),
  /** Username */
  username: z.string().optional(),
});

export type DeleteUserAvatar = z.input<typeof DeleteUserAvatarSchema>;
