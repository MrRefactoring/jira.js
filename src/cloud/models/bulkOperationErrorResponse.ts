import { z } from 'zod';
import { apiObject } from '#/core';
import { ErrorMessageSchema } from './errorMessage';

export const BulkOperationErrorResponseSchema = apiObject({
  errors: z.array(ErrorMessageSchema).optional(),
});

export type BulkOperationErrorResponse = z.infer<typeof BulkOperationErrorResponseSchema>;
