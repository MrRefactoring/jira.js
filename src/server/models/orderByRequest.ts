import { z } from 'zod';
import { apiObject } from '#/core';

export const OrderByRequestSchema = apiObject({
  filter: z.string().optional(),
  jql: z.string().optional(),
  maxResults: z.number().optional(),
  query: z.string().optional(),
  sortBy: z.string().optional(),
});

export type OrderByRequest = z.infer<typeof OrderByRequestSchema>;
