import { z } from 'zod';

export const GetPriorityParametersSchema = z.object({
  /** The ID of the issue priority. */
  id: z.string(),
});

export type GetPriorityParameters = z.infer<typeof GetPriorityParametersSchema>;
