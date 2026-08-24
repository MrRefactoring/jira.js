import { z } from 'zod';
import { MembershipRemovePayloadSchema } from '../models';

export const RemoveMembersSchema = z.object(MembershipRemovePayloadSchema.shape).extend({
  /** The ID of the organisation of the team you are removing members from. */
  orgId: z.string(),
  /** The ID of the team you are removing members from. */
  teamId: z.string(),
});

export type RemoveMembers = z.input<typeof RemoveMembersSchema>;
