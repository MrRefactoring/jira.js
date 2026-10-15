import { z } from 'zod';
import { apiObject } from '#/core';

export const StatePolicyRuleSchema = apiObject({
  description: z.string().optional(),
  domain: z.string().optional(),
  properties: z.record(z.string(), z.any()).optional(),
  ruleId: z.string().optional(),
  ruleTypeId: z.string().optional(),
});

export type StatePolicyRule = z.infer<typeof StatePolicyRuleSchema>;
