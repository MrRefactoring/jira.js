import { z } from 'zod';

/** List of Issue Ids Or Keys that are to be archived or unarchived */
export const IssueArchivalSyncRequestSchema = z.object({
  issueIdsOrKeys: z.array(z.string()).optional(),
});

export type IssueArchivalSyncRequest = z.infer<typeof IssueArchivalSyncRequestSchema>;
