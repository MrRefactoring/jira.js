import { z } from 'zod';
import { openEnum } from '#/core';

export const GetAvatarImageByOwnerSchema = z.object({
  /** The icon type of the avatar. */
  type: openEnum(['issuetype', 'project', 'priority']),
  /** The ID of the project or issue type the avatar belongs to. */
  entityId: z.string(),
  /** The size of the avatar image. If not provided the default size is returned. */
  size: openEnum(['xsmall', 'small', 'medium', 'large', 'xlarge']).optional(),
  /** The format to return the avatar image in. If not provided the original content format is returned. */
  format: openEnum(['png', 'svg']).optional(),
});

export type GetAvatarImageByOwner = z.input<typeof GetAvatarImageByOwnerSchema>;
