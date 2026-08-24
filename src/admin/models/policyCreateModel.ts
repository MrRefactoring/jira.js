import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { AllowIfContainedRuleSchema } from './allowIfContainedRule';
import { ResourceInputSchema } from './resourceInput';

export const PolicyCreateModelSchema = apiObject({
  /** Type of this object */
  type: openEnum(['policy']),
  /** Attributes of this object */
  attributes: apiObject({
    /** Type of this Policy */
    type: openEnum(['ip-allowlist', 'data-residency']),
    /** Name of this Policy */
    name: z.string().optional(),
    /** Status of this Policy */
    status: openEnum(['enabled', 'disabled']).optional(),
    /** Rule of the Policy */
    rule: AllowIfContainedRuleSchema.optional(),
    /** List of resources Policy is associated with */
    resources: z.array(ResourceInputSchema).optional(),
  }),
});

export type PolicyCreateModel = z.infer<typeof PolicyCreateModelSchema>;
