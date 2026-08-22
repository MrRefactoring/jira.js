import { z } from 'zod';
import { LinkTeamToExternalSourcePayloadSchema } from '../models';

export const LinkTeamToExternalSourceSchema = z.object(LinkTeamToExternalSourcePayloadSchema.shape).extend({
  /** The ID of the organisation the team and external reference to be linked belongs to. */
  orgId: z.string(),
  /** The ID of the team to be linked. */
  teamId: z.string(),
});

export type LinkTeamToExternalSource = z.input<typeof LinkTeamToExternalSourceSchema>;
