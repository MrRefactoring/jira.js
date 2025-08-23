import { z } from 'zod';

export const ExpandPrioritySchemePageSchema = z.object({
  maxResults: z.number().int().optional(),
  startAt: z.number().int().optional(),
  total: z.number().int().optional(),
});

export type ExpandPrioritySchemePage = z.infer<typeof ExpandPrioritySchemePageSchema>;
