import { z } from 'zod';
import { apiObject } from '#/core';
import { PolicySummarySchema } from './policySummary';

export const PolicySummaryResponseSchema = apiObject({
  isLast: z.boolean().optional(),
  maxResults: z.number().optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
  values: z.array(PolicySummarySchema).optional(),
});

export type PolicySummaryResponse = z.infer<typeof PolicySummaryResponseSchema>;
