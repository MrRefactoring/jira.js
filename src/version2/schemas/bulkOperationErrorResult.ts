import { z } from 'zod';
import { ErrorCollectionSchema } from './errorCollection';

export const BulkOperationErrorResultSchema = z.object({
  elementErrors: ErrorCollectionSchema.optional(),
  failedElementNumber: z.number().int().optional(),
  status: z.number().int().optional(),
});

export type BulkOperationErrorResult = z.infer<typeof BulkOperationErrorResultSchema>;
