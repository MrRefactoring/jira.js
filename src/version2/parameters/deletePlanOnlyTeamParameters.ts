import { z } from 'zod';

export const DeletePlanOnlyTeamParametersSchema = z.object({
  /** The ID of the plan. */
  planId: z.number().int(),
  /** The ID of the plan-only team. */
  planOnlyTeamId: z.number().int(),
});

export type DeletePlanOnlyTeamParameters = z.infer<typeof DeletePlanOnlyTeamParametersSchema>;
