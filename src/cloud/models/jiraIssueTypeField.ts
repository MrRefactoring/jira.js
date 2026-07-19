import { z } from 'zod';
import { apiObject } from '#/core';

export const JiraIssueTypeFieldSchema = apiObject({
  issueTypeId: z.string(),
});

export type JiraIssueTypeField = z.infer<typeof JiraIssueTypeFieldSchema>;
