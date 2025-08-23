import { z } from 'zod';

export const DuplicatePlanParametersSchema = z.object({
  /** The ID of the plan. */
  planId: z.number().int(),
  /** The plan name. */
  name: z.string(),
});

export type DuplicatePlanParameters = z.infer<typeof DuplicatePlanParametersSchema>;
