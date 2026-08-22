import { z } from 'zod';

export const GetAllProjectAvatarsSchema = z.object({
  /** Project id or project key */
  projectIdOrKey: z.string(),
});

export type GetAllProjectAvatars = z.input<typeof GetAllProjectAvatarsSchema>;
