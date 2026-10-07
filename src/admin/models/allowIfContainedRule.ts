import { z } from 'zod';
import { apiObject } from '#/core';

/** Applicable when policy type is `ip-allowlist` or `data-residency` */
export const AllowIfContainedRuleSchema = apiObject({
  in: z.array(z.string()).optional(),
  adminApprovalSummary: z.string().optional(),
  consented: z.boolean().optional(),
  notification: z.array(z.record(z.string(), z.any())).optional(),
  off: z.array(z.string()).optional(),
  scopeType: z.string().optional(),
});

export type AllowIfContainedRule = z.infer<typeof AllowIfContainedRuleSchema>;
