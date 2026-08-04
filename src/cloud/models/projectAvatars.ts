import { z } from 'zod';
import { apiObject } from '#/core';
import { AvatarSchema } from './avatar';
/** List of project avatars. */

export const ProjectAvatarsSchema = apiObject({
  /** List of avatars added to Jira. These avatars may be deleted. */
  custom: z.array(AvatarSchema).optional(),
  /** List of avatars included with Jira. These avatars cannot be deleted. */
  system: z.array(AvatarSchema).optional(),
});

export type ProjectAvatars = z.infer<typeof ProjectAvatarsSchema>;
