import { z } from 'zod';
import { TeamUpdatePayloadSchema } from '../models';

export const UpdateTeamSchema = z.object(TeamUpdatePayloadSchema.shape).extend({
  /** The ID of the organisation the team to be updated belongs to. */
  orgId: z.string(),
  /** The ID of the team to be updated. */
  teamId: z.string(),
});

export type UpdateTeam = z.input<typeof UpdateTeamSchema>;
