import { z } from 'zod';

export const SetShouldQueuesIncludeCountOnProjectSchema = z.object({
  /** The key of the project. */
  projectKey: z.string(),
  body: z.boolean().optional(),
});

export type SetShouldQueuesIncludeCountOnProject = z.input<typeof SetShouldQueuesIncludeCountOnProjectSchema>;
