import { z } from 'zod';
import { apiObject } from '#/core';

export const JQLCountResultsSchema = apiObject({
  /** Number of issues matching JQL query. */
  count: z.number().optional(),
});

export type JQLCountResults = z.infer<typeof JQLCountResultsSchema>;
