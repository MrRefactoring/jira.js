import { z } from 'zod';
import { apiObject } from '#/core';

export const GetTeamResponseForPageSchema = apiObject({
  /** The team ID. */
  id: z.string(),
  /** The team name. This is returned if the type is "PlanOnly". */
  name: z.string().optional(),
  /** The team type. This is "PlanOnly" or "Atlassian". */
  type: z.enum(['PlanOnly', 'Atlassian']),
});

export type GetTeamResponseForPage = z.infer<typeof GetTeamResponseForPageSchema>;
