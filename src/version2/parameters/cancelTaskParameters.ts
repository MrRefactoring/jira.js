import { z } from 'zod';

export const CancelTaskParametersSchema = z.object({
  /** The ID of the task. */
  taskId: z.string(),
});

export type CancelTaskParameters = z.infer<typeof CancelTaskParametersSchema>;
