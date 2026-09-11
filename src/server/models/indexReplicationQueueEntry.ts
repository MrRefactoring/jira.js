import { z } from 'zod';
import { apiObject } from '#/core';

export const IndexReplicationQueueEntrySchema = apiObject({
  id: z.number().optional(),
  replicationTime: z.coerce.date().optional(),
});

export type IndexReplicationQueueEntry = z.infer<typeof IndexReplicationQueueEntrySchema>;
