import { z } from 'zod';

export const GetEventActionsSchema = z.object({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
});

export type GetEventActions = z.input<typeof GetEventActionsSchema>;
