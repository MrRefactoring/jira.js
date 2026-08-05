import { z } from 'zod';
import { openEnum } from '#/core';

export const DeleteAvatarSchema = z.object({
  /** The avatar type. */
  type: openEnum(['project', 'issuetype', 'priority']),
  /** The ID of the item the avatar is associated with. */
  owningObjectId: z.string(),
  /** The ID of the avatar. */
  id: z.number(),
});

export type DeleteAvatar = z.input<typeof DeleteAvatarSchema>;
