import { z } from 'zod';
import { apiObject } from '#/core';
import { BulkRedactionResponseSchema } from './bulkRedactionResponse';

export const RedactionJobStatusResponseSchema = apiObject({
  bulkRedactionResponse: BulkRedactionResponseSchema.optional(),
  jobStatus: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).optional(),
});

export type RedactionJobStatusResponse = z.infer<typeof RedactionJobStatusResponseSchema>;
