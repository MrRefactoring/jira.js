import { z } from 'zod';

export const QueryTeamsSchema = z.object({
  /** The ID of the organisation the teams are to be retrieved from. */
  orgId: z.string(),
  /**
   * The ID of the site to retrieve teams which are site scoped. Please note that if the org is site-scoped, teams will
   * not be included in response if siteId is not provided. [Deprecated] Omitting siteId is deprecated. With the
   * introduction of Units, orgId alone is no longer sufficient to resolve the scope of teams. Always provide a valid
   * siteId to ensure this operation continues to work in the future.
   */
  siteId: z.string().max(255, 'siteId must be at most 255 characters'),
  /** The page size for the number of teams to return (max 300) */
  size: z.number().optional(),
  /**
   * An optional cursor token to fetch the next page of results. Leave empty for the first request. Callers must
   * continue querying with the returned cursor until the cursor is null.
   */
  cursor: z.string().max(255, 'cursor must be at most 255 characters').optional(),
});

export type QueryTeams = z.input<typeof QueryTeamsSchema>;
