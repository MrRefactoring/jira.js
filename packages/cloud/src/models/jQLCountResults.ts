import { z } from 'zod';

export const JQLCountResultsSchema = z.object({
  /** Number of issues matching JQL query. */
  count: z.number().optional(),
});

export type JQLCountResults = z.infer<typeof JQLCountResultsSchema>;
