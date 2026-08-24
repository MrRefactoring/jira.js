import { z } from 'zod';
import { PolicyUpdateInputSchema } from '../models';

export const UpdatePolicySchema = z.object(PolicyUpdateInputSchema.shape).extend({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
  /** ID of the policy to update */
  policyId: z.string(),
});

export type UpdatePolicy = z.input<typeof UpdatePolicySchema>;
