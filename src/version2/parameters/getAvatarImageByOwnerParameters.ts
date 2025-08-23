import { z } from 'zod';

export const GetAvatarImageByOwnerParametersSchema = z.object({
  /** The icon type of the avatar. */
  type: z.enum(['issuetype', 'project', 'priority']),
  /** The ID of the project or issue type the avatar belongs to. */
  entityId: z.string(),
  /** The size of the avatar image. If not provided the default size is returned. */
  size: z.enum(['xsmall', 'small', 'medium', 'large', 'xlarge']).optional(),
  /** The format to return the avatar image in. If not provided the original content format is returned. */
  format: z.enum(['png', 'svg']).optional(),
});

export type GetAvatarImageByOwnerParameters = z.infer<typeof GetAvatarImageByOwnerParametersSchema>;
