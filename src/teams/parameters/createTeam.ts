import { z } from 'zod';
import { TeamCreationPayloadSchema } from '../models';

export const CreateTeamSchema = z.object(TeamCreationPayloadSchema.shape).extend({
  /** The ID of the organisation the team is to be created under. */
  orgId: z.string(),
});

export type CreateTeam = z.input<typeof CreateTeamSchema>;
