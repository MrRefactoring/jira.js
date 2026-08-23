import { z } from 'zod';
import { ResourceUpdateInputSchema } from '../models';

export const UpdatePolicyResourceSchema = z.object(ResourceUpdateInputSchema.shape).extend({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
  /** ID of the policy to query */
  policyId: z.string(),
  /** Resource ID */
  resourceId: z.string(),
});

export type UpdatePolicyResource = z.input<typeof UpdatePolicyResourceSchema>;
