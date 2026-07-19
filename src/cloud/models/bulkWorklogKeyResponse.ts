import { z } from 'zod';
import { apiObject } from '#/core';
import { WorklogKeyResultSchema } from './worklogKeyResult';

export const BulkWorklogKeyResponseSchema = apiObject({
  /** A list of successfully retrieved worklogs with their issue and worklog IDs. */
  worklogs: z.array(WorklogKeyResultSchema).optional(),
});

export type BulkWorklogKeyResponse = z.infer<typeof BulkWorklogKeyResponseSchema>;
