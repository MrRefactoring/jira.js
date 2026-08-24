import { z } from 'zod';

export const DeletePolicyResourceSchema = z.object({
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

export type DeletePolicyResource = z.input<typeof DeletePolicyResourceSchema>;
