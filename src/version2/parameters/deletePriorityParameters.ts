import { z } from 'zod';

export const DeletePriorityParametersSchema = z.object({
  /** The ID of the issue priority. */
  id: z.string(),
});

export type DeletePriorityParameters = z.infer<typeof DeletePriorityParametersSchema>;
