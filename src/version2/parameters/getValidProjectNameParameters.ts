import { z } from 'zod';

export const GetValidProjectNameParametersSchema = z.object({
  /** The project name. */
  name: z.string(),
});

export type GetValidProjectNameParameters = z.infer<typeof GetValidProjectNameParametersSchema>;
