import { z } from 'zod';

export const DeleteTeamSchema = z.object({
  /** The ID of the organisation the team is to be deleted from. */
  orgId: z.string(),
  /** The ID of the team to be deleted. */
  teamId: z.string(),
});

export type DeleteTeam = z.input<typeof DeleteTeamSchema>;
