import { z } from 'zod';

export const JQLCountResultsBeanSchema = z.object({
  /** Number of issues matching JQL query. */
  count: z.number().int().optional(),
});

export type JQLCountResultsBean = z.infer<typeof JQLCountResultsBeanSchema>;
