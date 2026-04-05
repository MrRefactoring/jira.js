import { z } from 'zod';

export const ExpandPrioritySchemePageSchema = z.object({
  maxResults: z.number().optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
});

export type ExpandPrioritySchemePage = z.infer<typeof ExpandPrioritySchemePageSchema>;
