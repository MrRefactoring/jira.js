import { z } from 'zod';
import { apiObject } from '#/core';

export const PolicySummarySchema = apiObject({
  appliedProjectIds: z.array(z.number()).optional(),
  id: z.string().optional(),
  isDefault: z.boolean().optional(),
  policyDescription: z.string().optional(),
  policyName: z.string().optional(),
  version: z.number().optional(),
});

export type PolicySummary = z.infer<typeof PolicySummarySchema>;
