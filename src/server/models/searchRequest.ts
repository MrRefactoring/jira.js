import { z } from 'zod';
import { apiObject } from '#/core';

export const SearchRequestSchema = apiObject({
  expand: z.array(z.string()).optional(),
  fields: z.array(z.string()).optional(),
  jql: z.string().optional(),
  maxResults: z.number().optional(),
  startAt: z.number().optional(),
  validateQuery: z.boolean().optional(),
});

export type SearchRequest = z.infer<typeof SearchRequestSchema>;
