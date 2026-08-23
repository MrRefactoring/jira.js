import { z } from 'zod';

export const GetOrgByIdSchema = z.object({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
});

export type GetOrgById = z.input<typeof GetOrgByIdSchema>;
