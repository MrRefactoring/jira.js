import { z } from 'zod';
import { SingleRedactionRequestSchema } from './singleRedactionRequest';

export const BulkRedactionRequestSchema = z.object({
  redactions: z.array(SingleRedactionRequestSchema).optional(),
});

export type BulkRedactionRequest = z.infer<typeof BulkRedactionRequestSchema>;
