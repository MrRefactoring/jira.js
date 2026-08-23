import { z } from 'zod';
import { apiObject } from '#/core';
/** Applicable when policy type is `ip-allowlist` or `data-residency` */

export const AllowIfContainedRuleSchema = apiObject({
  in: z.array(z.string()),
});

export type AllowIfContainedRule = z.infer<typeof AllowIfContainedRuleSchema>;
