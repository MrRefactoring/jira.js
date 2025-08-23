import { z } from 'zod';

export const GetStatusParametersSchema = z.object({
  /** The ID or name of the status. */
  idOrName: z.string(),
});

export type GetStatusParameters = z.infer<typeof GetStatusParametersSchema>;
