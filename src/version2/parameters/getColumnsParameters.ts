import { z } from 'zod';

export const GetColumnsParametersSchema = z.object({
  /** The ID of the filter. */
  id: z.number().int(),
});

export type GetColumnsParameters = z.infer<typeof GetColumnsParametersSchema>;
