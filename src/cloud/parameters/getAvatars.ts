import { z } from 'zod';
import { openEnum } from '#/core';

export const GetAvatarsSchema = z.object({
  /** The avatar type. */
  type: openEnum(['project', 'issuetype', 'priority']),
  /** The ID of the item the avatar is associated with. */
  entityId: z.string(),
});

export type GetAvatars = z.input<typeof GetAvatarsSchema>;
