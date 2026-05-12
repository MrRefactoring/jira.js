import { z } from 'zod';
import { ErrorCollectionSchema } from '#/models/errorCollection';

export const BulkOperationErrorResultSchema = z.object({
  elementErrors: ErrorCollectionSchema.optional(),
  failedElementNumber: z.number().optional(),
  status: z.number().optional(),
});

export type BulkOperationErrorResult = z.infer<typeof BulkOperationErrorResultSchema>;
