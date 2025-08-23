import { z } from 'zod';

export const GetTeamResponseForPageSchema = z.object({
  /** The team ID. */
  id: z.string(),
  /** The team name. This is returned if the type is "PlanOnly". */
  name: z.string().optional(),
  /** The team type. This is "PlanOnly" or "Atlassian". */
  type: z.enum(['PlanOnly', 'Atlassian']),
});

export type GetTeamResponseForPage = z.infer<typeof GetTeamResponseForPageSchema>;
