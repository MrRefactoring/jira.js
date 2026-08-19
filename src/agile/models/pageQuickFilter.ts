import { z } from 'zod';
import { apiObject } from '#/core';
import { QuickFilterSchema } from './quickFilter';

export const PageQuickFilterSchema = apiObject({
  isLast: z.boolean().optional(),
  maxResults: z.number().optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
  values: z.array(QuickFilterSchema).optional(),
});

export type PageQuickFilter = z.infer<typeof PageQuickFilterSchema>;
