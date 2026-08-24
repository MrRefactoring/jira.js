import { z } from 'zod';
import { ExternalTeamCreationPayloadSchema } from '../models';

export const CreateExternalLinkedTeamSchema = z.object(ExternalTeamCreationPayloadSchema.shape).extend({
  /** The ID of the organisation the team is to be created under. */
  orgId: z.string(),
});

export type CreateExternalLinkedTeam = z.input<typeof CreateExternalLinkedTeamSchema>;
