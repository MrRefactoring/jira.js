import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { BulkRedactionResponseSchema } from './bulkRedactionResponse';

export const RedactionJobStatusResponseSchema = apiObject({
  bulkRedactionResponse: BulkRedactionResponseSchema.optional(),
  jobStatus: openEnum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).optional(),
});

export type RedactionJobStatusResponse = z.infer<typeof RedactionJobStatusResponseSchema>;
