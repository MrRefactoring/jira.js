import { z } from 'zod';

export const CreatePlanOnlyTeamRequestSchema = z.object({
  /** The capacity for the plan-only team. */
  capacity: z.number().optional(),
  /** The ID of the issue source for the plan-only team. */
  issueSourceId: z.number().optional(),
  /** The account IDs of the plan-only team members. */
  memberAccountIds: z.array(z.string()).optional(),
  /** The plan-only team name. */
  name: z.string().max(255, 'name must be at most 255 characters'),
  /** The planning style for the plan-only team. This must be "Scrum" or "Kanban". */
  planningStyle: z.enum(['Scrum', 'Kanban']),
  /** The sprint length for the plan-only team. */
  sprintLength: z.number().optional(),
});

export type CreatePlanOnlyTeamRequest = z.infer<typeof CreatePlanOnlyTeamRequestSchema>;
