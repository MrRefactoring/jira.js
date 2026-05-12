import { z } from 'zod';
import { SingleRedactionRequestSchema } from '#/models/singleRedactionRequest';

export const BulkRedactionRequestSchema = z.object({
  redactions: z.array(SingleRedactionRequestSchema).optional(),
});

export type BulkRedactionRequest = z.infer<typeof BulkRedactionRequestSchema>;
