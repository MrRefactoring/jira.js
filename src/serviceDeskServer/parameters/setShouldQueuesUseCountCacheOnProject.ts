import { z } from 'zod';

export const SetShouldQueuesUseCountCacheOnProjectSchema = z.object({
  /** The key of the project. */
  projectKey: z.string(),
  body: z.boolean().optional(),
});

export type SetShouldQueuesUseCountCacheOnProject = z.input<typeof SetShouldQueuesUseCountCacheOnProjectSchema>;
