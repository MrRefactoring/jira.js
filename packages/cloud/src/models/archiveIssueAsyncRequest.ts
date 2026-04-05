import { z } from 'zod';

export const ArchiveIssueAsyncRequestSchema = z.object({
  jql: z.string().optional(),
});

export type ArchiveIssueAsyncRequest = z.infer<typeof ArchiveIssueAsyncRequestSchema>;
