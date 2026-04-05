import { z } from 'zod';

export const SubmittedBulkOperationSchema = z.object({
  taskId: z.string().optional(),
});

export type SubmittedBulkOperation = z.infer<typeof SubmittedBulkOperationSchema>;
