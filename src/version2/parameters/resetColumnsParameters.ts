import { z } from 'zod';

export const ResetColumnsParametersSchema = z.object({
  /** The ID of the filter. */
  id: z.number().int(),
});

export type ResetColumnsParameters = z.infer<typeof ResetColumnsParametersSchema>;
