import { z } from 'zod';

export const ArchivePlanParametersSchema = z.object({
  /** The ID of the plan. */
  planId: z.number().int(),
});

export type ArchivePlanParameters = z.infer<typeof ArchivePlanParametersSchema>;
