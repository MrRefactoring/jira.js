import { z } from 'zod';
import { ErrorMessageSchema } from '#/models/errorMessage';

export const BulkOperationErrorResponseSchema = z.object({
  errors: z.array(ErrorMessageSchema).optional(),
});

export type BulkOperationErrorResponse = z.infer<typeof BulkOperationErrorResponseSchema>;
