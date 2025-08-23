import { z } from 'zod';

export const GetPlanParametersSchema = z.object({
  /** The ID of the plan. */
  planId: z.number().int(),
  /** Whether to return group IDs instead of group names. Group names are deprecated. */
  useGroupId: z.boolean().optional(),
});

export type GetPlanParameters = z.infer<typeof GetPlanParametersSchema>;
