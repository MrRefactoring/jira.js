import { z } from 'zod';

export const RemoveAtlassianTeamParametersSchema = z.object({
  /** The ID of the plan. */
  planId: z.number().int(),
  /** The ID of the Atlassian team. */
  atlassianTeamId: z.string(),
});

export type RemoveAtlassianTeamParameters = z.infer<typeof RemoveAtlassianTeamParametersSchema>;
