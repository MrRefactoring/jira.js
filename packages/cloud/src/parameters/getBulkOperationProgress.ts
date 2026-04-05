import { z } from 'zod';

export const GetBulkOperationProgressSchema = z.object({
  /** The ID of the task. */
  taskId: z.string(),
});

export type GetBulkOperationProgress = z.input<typeof GetBulkOperationProgressSchema>;
