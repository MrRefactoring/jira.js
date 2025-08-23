import { z } from 'zod';

export const GetAllProjectAvatarsParametersSchema = z.object({
  /** The ID or (case-sensitive) key of the project. */
  projectIdOrKey: z.string(),
});

export type GetAllProjectAvatarsParameters = z.infer<typeof GetAllProjectAvatarsParametersSchema>;
