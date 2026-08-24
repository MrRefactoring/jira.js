import { z } from 'zod';

export const DeleteAvatarSchema = z.object({
  /** Database id for avatar */
  id: z.number(),
  type: z.string(),
  /** Entity id where to change avatar */
  owningObjectId: z.string(),
});

export type DeleteAvatar = z.input<typeof DeleteAvatarSchema>;
