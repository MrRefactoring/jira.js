import { z } from 'zod';
import { apiObject } from '#/core';

export const PagedResultsSchema = apiObject({
  isLast: z.boolean().optional(),
  maxResults: z.number().optional(),
  nextPage: z.url().optional(),
  self: z.url().optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
  values: z.array(z.record(z.string(), z.any())).optional(),
});

export type PagedResults = z.infer<typeof PagedResultsSchema>;
