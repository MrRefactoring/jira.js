import { z } from 'zod';

export const GetUsersSchema = z.object({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
  /** Sets the starting point for the page of results to return. */
  cursor: z.string().optional(),
});

export type GetUsers = z.input<typeof GetUsersSchema>;
