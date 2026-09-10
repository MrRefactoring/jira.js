import { z } from 'zod';

export const DeletePolicySchema = z.object({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
  /** ID of the policy to delete */
  policyId: z.string(),
});

export type DeletePolicy = z.input<typeof DeletePolicySchema>;
