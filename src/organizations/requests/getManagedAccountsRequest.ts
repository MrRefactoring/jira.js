import { z } from 'zod';

export const GetManagedAccountsRequestSchema = z.strictObject({
  /**
   * Your organization is identified by a Unique ID. You get your organization ID and Organization API key simultaneously.
   */
  id: z.string(),
  /**
   * Sets the starting point for the page of results to return.
   */
  cursor: z.string().optional(),
});

export type GetManagedAccountsRequest = z.infer<typeof GetManagedAccountsRequestSchema>;
