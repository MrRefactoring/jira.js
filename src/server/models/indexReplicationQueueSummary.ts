import { z } from 'zod';
import { apiObject } from '#/core';
import { IndexReplicationQueueEntrySchema } from './indexReplicationQueueEntry';

export const IndexReplicationQueueSummarySchema = apiObject({
  lastConsumedOperation: IndexReplicationQueueEntrySchema.optional(),
  lastOperationInQueue: IndexReplicationQueueEntrySchema.optional(),
  queueSize: z.number().optional(),
});

export type IndexReplicationQueueSummary = z.infer<typeof IndexReplicationQueueSummarySchema>;
