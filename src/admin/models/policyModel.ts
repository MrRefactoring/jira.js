import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { AllowIfContainedRuleSchema } from './allowIfContainedRule';
import { ResourceSchema } from './resource';

export const PolicyModelSchema = apiObject({
  /** Unique identifier of the Policy */
  id: z.string(),
  /** Type of this object */
  type: openEnum(['policy']),
  /** Attributes of this object */
  attributes: apiObject({
    /** Type of this Policy */
    type: openEnum(['ip-allowlist', 'data-residency', 'data-security']),
    /** Name of this Policy */
    name: z.string().optional(),
    /** Status of this Policy */
    status: openEnum(['enabled', 'disabled']).optional(),
    /** Rule of the Policy */
    rule: z.union([AllowIfContainedRuleSchema, z.array(z.unknown())]).optional(),
    /** List of resources Policy is associated with */
    resources: z.array(ResourceSchema).optional(),
  }),
});

export type PolicyModel = z.infer<typeof PolicyModelSchema>;
