import { z } from 'zod';
import { apiObject } from '#/core';
/** List of Issue Ids Or Keys that are to be archived or unarchived */

export const IssueArchivalSyncRequestSchema = apiObject({
  issueIdsOrKeys: z.array(z.string()).optional(),
});

export type IssueArchivalSyncRequest = z.infer<typeof IssueArchivalSyncRequestSchema>;
