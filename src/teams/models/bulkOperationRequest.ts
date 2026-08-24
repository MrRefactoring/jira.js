import { z } from 'zod';
import { apiObject } from '#/core';

export const BulkOperationRequestSchema = apiObject({
  teamIds: z.array(z.string()),
});

export type BulkOperationRequest = z.infer<typeof BulkOperationRequestSchema>;
