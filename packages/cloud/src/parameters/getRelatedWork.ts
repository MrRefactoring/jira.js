import { z } from 'zod';

export const GetRelatedWorkSchema = z.object({
  /** The ID of the version. */
  id: z.string(),
});

export type GetRelatedWork = z.input<typeof GetRelatedWorkSchema>;
