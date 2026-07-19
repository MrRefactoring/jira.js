import { z } from 'zod';
import { apiObject } from '#/core';

export const ArchiveIssueAsyncRequestSchema = apiObject({
  jql: z.string().optional(),
});

export type ArchiveIssueAsyncRequest = z.infer<typeof ArchiveIssueAsyncRequestSchema>;
