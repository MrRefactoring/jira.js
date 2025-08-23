import { z } from 'zod';

export const TrashPlanParametersSchema = z.object({
  /** The ID of the plan. */
  planId: z.number().int(),
});

export type TrashPlanParameters = z.infer<typeof TrashPlanParametersSchema>;
