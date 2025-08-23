import { z } from 'zod';

export const SetColumnsParametersSchema = z.object({
  /** The ID of the filter. */
  id: z.number().int(),
  columns: z.array(z.string()).optional(),
});

export type SetColumnsParameters = z.infer<typeof SetColumnsParametersSchema>;
