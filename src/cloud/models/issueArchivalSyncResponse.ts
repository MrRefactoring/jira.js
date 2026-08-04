import { z } from 'zod';
import { apiObject } from '#/core';
import { ErrorsSchema } from './errors';
/** Number of archived/unarchived issues and list of errors that occurred during the action, if any. */

export const IssueArchivalSyncResponseSchema = apiObject({
  errors: ErrorsSchema.optional(),
  numberOfIssuesUpdated: z.number().optional(),
});

export type IssueArchivalSyncResponse = z.infer<typeof IssueArchivalSyncResponseSchema>;
