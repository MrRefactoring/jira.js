import { z } from 'zod';
import { MembershipAddPayloadSchema } from '../models';

export const AddMembersSchema = z.object(MembershipAddPayloadSchema.shape).extend({
  /** The ID of the organisation of the team you are adding members to. */
  orgId: z.string(),
  /** The ID of the team you are adding members to. */
  teamId: z.string(),
});

export type AddMembers = z.input<typeof AddMembersSchema>;
