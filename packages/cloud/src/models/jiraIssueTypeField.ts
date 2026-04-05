import { z } from 'zod';

export const JiraIssueTypeFieldSchema = z.object({
  issueTypeId: z.string(),
});

export type JiraIssueTypeField = z.infer<typeof JiraIssueTypeFieldSchema>;
