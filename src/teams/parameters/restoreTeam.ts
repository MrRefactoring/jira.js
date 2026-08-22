import { z } from 'zod';

export const RestoreTeamSchema = z.object({
  /** The ID of the organisation the team belongs to */
  orgId: z.string(),
  /** The ID of the team to restore */
  teamId: z.string(),
});

export type RestoreTeam = z.input<typeof RestoreTeamSchema>;
