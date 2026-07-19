import { z } from 'zod';
import { apiObject } from '#/core';
import { SingleRedactionResponseSchema } from './singleRedactionResponse';

export const BulkRedactionResponseSchema = apiObject({
  /** Result for requested redactions */
  results: z.array(SingleRedactionResponseSchema),
});

export type BulkRedactionResponse = z.infer<typeof BulkRedactionResponseSchema>;
