import { z } from 'zod';

export const GetTeamSchema = z.object({
  /** The ID of the organisation the team is to be retrieved from. */
  orgId: z.string(),
  /** The ID of the team to be retrieved. */
  teamId: z.string(),
  /**
   * [Optional] The ID of the site to retrieve teams which are site scoped. Please note that if the org is site-scoped,
   * teams will not be included in response if siteId is not provided. [Deprecated] Omitting siteId is deprecated. With
   * the introduction of Units, orgId alone is no longer sufficient to resolve the scope of teams. Always provide a
   * valid siteId to ensure this operation continues to work in the future.
   */
  siteId: z.string().max(255, 'siteId must be at most 255 characters').optional(),
});

export type GetTeam = z.input<typeof GetTeamSchema>;
