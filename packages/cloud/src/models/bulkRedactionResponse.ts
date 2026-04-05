import { z } from 'zod';
import { SingleRedactionResponseSchema } from '#/models/singleRedactionResponse';

export const BulkRedactionResponseSchema = z.object({
  /** Result for requested redactions */
  results: z.array(SingleRedactionResponseSchema),
});

export type BulkRedactionResponse = z.infer<typeof BulkRedactionResponseSchema>;
