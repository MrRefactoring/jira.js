import { z } from 'zod';
import { apiObject } from '#/core';

export const ExpandPrioritySchemePageSchema = apiObject({
  maxResults: z.number().optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
});

export type ExpandPrioritySchemePage = z.infer<typeof ExpandPrioritySchemePageSchema>;
