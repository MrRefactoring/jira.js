import { z } from 'zod';
import { PolicyCreateInputSchema } from '../models';

export const CreatePolicySchema = z.object(PolicyCreateInputSchema.shape).extend({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
});

export type CreatePolicy = z.input<typeof CreatePolicySchema>;
