import { z } from 'zod';
import { ErrorsSchema } from '#/models/errors';

/** Number of archived/unarchived issues and list of errors that occurred during the action, if any. */
export const IssueArchivalSyncResponseSchema = z.object({
  errors: ErrorsSchema.optional(),
  numberOfIssuesUpdated: z.number().optional(),
});

export type IssueArchivalSyncResponse = z.infer<typeof IssueArchivalSyncResponseSchema>;
