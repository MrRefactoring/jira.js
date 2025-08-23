import { z } from 'zod';

export const UpdatePlanParametersSchema = z.object({
  /** The ID of the plan. */
  planId: z.number().int(),
  /** Whether to accept group IDs instead of group names. Group names are deprecated. */
  useGroupId: z.boolean().optional(),
  body: z.any(),
});

export type UpdatePlanParameters = z.infer<typeof UpdatePlanParametersSchema>;
