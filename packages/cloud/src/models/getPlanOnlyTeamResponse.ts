import { z } from 'zod';

export const GetPlanOnlyTeamResponseSchema = z.object({
  /** The capacity for the plan-only team. */
  capacity: z.number().optional(),
  /** The plan-only team ID. */
  id: z.number(),
  /** The ID of the issue source for the plan-only team. */
  issueSourceId: z.number().optional(),
  /** The account IDs of the plan-only team members. */
  memberAccountIds: z.array(z.string()).optional(),
  /** The plan-only team name. */
  name: z.string(),
  /** The planning style for the plan-only team. This is "Scrum" or "Kanban". */
  planningStyle: z.enum(['Scrum', 'Kanban']),
  /** The sprint length for the plan-only team. */
  sprintLength: z.number().optional(),
});

export type GetPlanOnlyTeamResponse = z.infer<typeof GetPlanOnlyTeamResponseSchema>;
