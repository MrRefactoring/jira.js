import { z } from 'zod';

export const GetRepositorySchema = z.object({
  /** The ID of repository to fetch */
  repositoryId: z.string(),
});

export type GetRepository = z.input<typeof GetRepositorySchema>;
