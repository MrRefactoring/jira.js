import { z } from 'zod';

export const ValidatePolicySchema = z.object({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
  /** Policy ID */
  policyId: z.string(),
});

export type ValidatePolicy = z.input<typeof ValidatePolicySchema>;
