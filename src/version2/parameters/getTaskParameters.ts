import { z } from 'zod';

export const GetTaskParametersSchema = z.object({
  /** The ID of the task. */
  taskId: z.string(),
});

export type GetTaskParameters = z.infer<typeof GetTaskParametersSchema>;
