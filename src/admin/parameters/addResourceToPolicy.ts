import { z } from 'zod';
import { ResourceInputSchema } from '../models';

export const AddResourceToPolicySchema = z.object(ResourceInputSchema.shape).extend({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
  /** ID of the policy to query */
  policyId: z.string(),
});

export type AddResourceToPolicy = z.input<typeof AddResourceToPolicySchema>;
