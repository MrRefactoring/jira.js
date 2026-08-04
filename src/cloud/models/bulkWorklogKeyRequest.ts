import { z } from 'zod';
import { apiObject } from '#/core';
import { WorklogCompositeKeySchema } from './worklogCompositeKey';

export const BulkWorklogKeyRequestSchema = apiObject({
  /** A list of issue and worklog ID pairs. */
  requests: z.array(WorklogCompositeKeySchema).optional(),
});

export type BulkWorklogKeyRequest = z.infer<typeof BulkWorklogKeyRequestSchema>;
