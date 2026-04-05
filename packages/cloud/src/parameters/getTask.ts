import { z } from 'zod';

export const GetTaskSchema = z.object({
  /** The ID of the task. */
  taskId: z.string(),
});

export type GetTask = z.input<typeof GetTaskSchema>;
