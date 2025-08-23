import { z } from 'zod';

export const UpdatePlanOnlyTeamParametersSchema = z.object({
  /** The ID of the plan. */
  planId: z.number().int(),
  /** The ID of the plan-only team. */
  planOnlyTeamId: z.number().int(),
  body: z.any(),
});

export type UpdatePlanOnlyTeamParameters = z.infer<typeof UpdatePlanOnlyTeamParametersSchema>;
