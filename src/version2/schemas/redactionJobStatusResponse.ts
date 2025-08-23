import { z } from 'zod';
import { BulkRedactionResponseSchema } from './bulkRedactionResponse';

export const RedactionJobStatusResponseSchema = z.object({
  bulkRedactionResponse: BulkRedactionResponseSchema.optional(),
  jobStatus: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).optional(),
});

export type RedactionJobStatusResponse = z.infer<typeof RedactionJobStatusResponseSchema>;
