import { z } from 'zod';

export const DeleteProjectAvatarParametersSchema = z.object({
  /** The project ID or (case-sensitive) key. */
  projectIdOrKey: z.string(),
  /** The ID of the avatar. */
  id: z.number().int(),
});

export type DeleteProjectAvatarParameters = z.infer<typeof DeleteProjectAvatarParametersSchema>;
