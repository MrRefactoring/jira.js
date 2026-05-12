import { z } from 'zod';
import { WorklogKeyResultSchema } from '#/models/worklogKeyResult';

export const BulkWorklogKeyResponseSchema = z.object({
  /** A list of successfully retrieved worklogs with their issue and worklog IDs. */
  worklogs: z.array(WorklogKeyResultSchema).optional(),
});

export type BulkWorklogKeyResponse = z.infer<typeof BulkWorklogKeyResponseSchema>;
