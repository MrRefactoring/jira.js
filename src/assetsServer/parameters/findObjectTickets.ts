import { z } from 'zod';

export const FindObjectTicketsSchema = z.object({
  /**
   * Filter the tickets based on the filter ID. If filterId is not specified then no filter will be used. In the context
   * of Jira the filterId will be the ID on an existing JQL filter.
   */
  filterId: z.string().optional(),
  xoauth_requestor_id: z.string().optional(),
  /**
   * Limit the result set to the amount of objects. If the limit is not specified all connected tickets will be
   * returned. Unlimited search is discouraged for performance reasons. If the limit is specified, it should not be
   * higher than the max result window configured for the underlying search engine.
   */
  limit: z.string().optional(),
  /** The ID of the object to retrieve tickets for. */
  id: z.string(),
});

export type FindObjectTickets = z.input<typeof FindObjectTicketsSchema>;
