import { z } from 'zod';
import { apiObject } from '#/core';
import { ErrorCollectionSchema } from './errorCollection';

export const BulkOperationErrorResultSchema = apiObject({
  elementErrors: ErrorCollectionSchema.optional(),
  failedElementNumber: z.number().optional(),
  status: z.number().optional(),
});

export type BulkOperationErrorResult = z.infer<typeof BulkOperationErrorResultSchema>;
