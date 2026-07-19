import { z } from 'zod';
import { apiObject } from '#/core';

export const SubmittedBulkOperationSchema = apiObject({
  taskId: z.string().optional(),
});

export type SubmittedBulkOperation = z.infer<typeof SubmittedBulkOperationSchema>;
