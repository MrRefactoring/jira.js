import { z } from 'zod';

export const GetIssueSecuritySchemeSchema = z.object({
  /**
   * The ID of the issue security scheme. Use the [Get issue security
   * schemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-security-schemes/#api-rest-api-3-issuesecurityschemes-get)
   * operation to get a list of issue security scheme IDs.
   */
  id: z.number(),
});

export type GetIssueSecurityScheme = z.input<typeof GetIssueSecuritySchemeSchema>;
