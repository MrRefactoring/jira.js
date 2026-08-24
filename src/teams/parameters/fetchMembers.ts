import { z } from 'zod';
import { MembershipFetchPayloadSchema } from '../models';

export const FetchMembersSchema = z.object(MembershipFetchPayloadSchema.shape).extend({
  /** The ID of the organisation of the team you are fetching members for. */
  orgId: z.string(),
  /** The ID of the team you are fetching members for. */
  teamId: z.string(),
  /**
   * [Optional] The ID of the site you are fetching members for. [Deprecated] Omitting siteId is deprecated. With the
   * introduction of Units, orgId alone is no longer sufficient to resolve the scope of teams. Always provide a valid
   * siteId to ensure this operation continues to work in the future.
   */
  siteId: z.string().max(255, 'siteId must be at most 255 characters').optional(),
});

export type FetchMembers = z.input<typeof FetchMembersSchema>;
