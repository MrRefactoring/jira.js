import { z } from 'zod';

export const UpdateAtlassianTeamParametersSchema = z.object({
  /** The ID of the plan. */
  planId: z.number().int(),
  /** The ID of the Atlassian team. */
  atlassianTeamId: z.string(),
  body: z.any(),
});

export type UpdateAtlassianTeamParameters = z.infer<typeof UpdateAtlassianTeamParametersSchema>;
