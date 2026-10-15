import { z } from 'zod';
import { apiObject } from '#/core';
import { StatePolicyRuleSchema } from './statePolicyRule';

export const StatePolicyDocumentSchema = apiObject({
  id: z.string().optional(),
  isDefault: z.boolean().optional(),
  policyDescription: z.string().optional(),
  policyName: z.string().optional(),
  rulesByDomain: z.record(z.string(), z.array(StatePolicyRuleSchema)).optional(),
  version: z.number().optional(),
});

export type StatePolicyDocument = z.infer<typeof StatePolicyDocumentSchema>;
