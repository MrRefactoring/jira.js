import { z } from 'zod';
import { apiObject } from '#/core';
import { BulkTeamOperationErrorSchema } from './bulkTeamOperationError';

export const BulkOperationResponseSchema = apiObject({
  errors: z.array(BulkTeamOperationErrorSchema),
  successfulTeamIds: z.array(z.string()),
});

export type BulkOperationResponse = z.infer<typeof BulkOperationResponseSchema>;
