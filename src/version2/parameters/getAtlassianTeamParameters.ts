import { z } from 'zod';

export const GetAtlassianTeamParametersSchema = z.object({
  /** The ID of the plan. */
  planId: z.number().int(),
  /** The ID of the Atlassian team. */
  atlassianTeamId: z.string(),
});

export type GetAtlassianTeamParameters = z.infer<typeof GetAtlassianTeamParametersSchema>;
