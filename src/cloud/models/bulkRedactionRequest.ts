import { z } from 'zod';
import { apiObject } from '#/core';
import { SingleRedactionRequestSchema } from './singleRedactionRequest';

export const BulkRedactionRequestSchema = apiObject({
  redactions: z.array(SingleRedactionRequestSchema).optional(),
});

export type BulkRedactionRequest = z.infer<typeof BulkRedactionRequestSchema>;
