import { z } from 'zod';
import { apiObject } from '#/core';

export const PolicyApplicationViolationSchema = apiObject({
  entityId: z.string().optional(),
  entityName: z.string().optional(),
  entityType: z.string().optional(),
  remediationHint: z.string().optional(),
  ruleTypeId: z.string().optional(),
});

export type PolicyApplicationViolation = z.infer<typeof PolicyApplicationViolationSchema>;
