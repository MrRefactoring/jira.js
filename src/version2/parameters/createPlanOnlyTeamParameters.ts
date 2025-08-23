import { z } from 'zod';

export const CreatePlanOnlyTeamParametersSchema = z.object({
  /** The ID of the plan. */
  planId: z.number().int(),
  /** The capacity for the plan-only team. */
  capacity: z.number().optional(),
  /** The ID of the issue source for the plan-only team. */
  issueSourceId: z.number().int().optional(),
  /** The account IDs of the plan-only team members. */
  memberAccountIds: z.array(z.string()).optional(),
  /** The plan-only team name. */
  name: z.string(),
  /** The planning style for the plan-only team. This must be "Scrum" or "Kanban". */
  planningStyle: z.enum(['Scrum', 'Kanban']),
  /** The sprint length for the plan-only team. */
  sprintLength: z.number().int().optional(),
});

export type CreatePlanOnlyTeamParameters = z.infer<typeof CreatePlanOnlyTeamParametersSchema>;
