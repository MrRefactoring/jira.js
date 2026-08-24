import { z } from 'zod';

export const GetPoliciesSchema = z.object({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
  /** Sets the starting point for the page of results to return. */
  cursor: z.string().optional(),
  /** Sets the type for the page of policies to return. */
  type: z.string().optional(),
});

export type GetPolicies = z.input<typeof GetPoliciesSchema>;
