import { z } from 'zod';

export const GetAllProjectAvatarsSchema = z.object({
  /** The ID or (case-sensitive) key of the project. */
  projectIdOrKey: z.string(),
});

export type GetAllProjectAvatars = z.input<typeof GetAllProjectAvatarsSchema>;
