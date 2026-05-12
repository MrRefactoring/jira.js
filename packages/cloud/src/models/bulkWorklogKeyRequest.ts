import { z } from 'zod';
import { WorklogCompositeKeySchema } from '#/models/worklogCompositeKey';

export const BulkWorklogKeyRequestSchema = z.object({
  /** A list of issue and worklog ID pairs. */
  requests: z.array(WorklogCompositeKeySchema).optional(),
});

export type BulkWorklogKeyRequest = z.infer<typeof BulkWorklogKeyRequestSchema>;
