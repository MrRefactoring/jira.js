import { z } from 'zod';

export const GetPolicyByIdSchema = z.object({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
  /** ID of the policy to query */
  policyId: z.string(),
});

export type GetPolicyById = z.input<typeof GetPolicyByIdSchema>;
