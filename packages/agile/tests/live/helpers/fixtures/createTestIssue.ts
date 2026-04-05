import { z } from 'zod';
import type { Client } from '@jira.js/base';

export const IssueCreatedSchema = z.object({
  id: z.string(),
  key: z.string(),
});

export async function createTestIssue(
  http: Client,
  projectKey: string,
  issueType = 'Task',
): Promise<{ id: string; key: string }> {
  return http.sendRequest({
    url: '/rest/api/3/issue',
    method: 'POST',
    body: {
      fields: {
        project: { key: projectKey },
        summary: `sdk-live-issue-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        issuetype: { name: issueType },
      },
    },
    schema: IssueCreatedSchema,
  });
}
