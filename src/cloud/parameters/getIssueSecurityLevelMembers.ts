import { z } from 'zod';

export const GetIssueSecurityLevelMembersSchema = z.object({
  /**
   * The ID of the issue security scheme. Use the [Get issue security
   * schemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-security-schemes/#api-rest-api-3-issuesecurityschemes-get)
   * operation to get a list of issue security scheme IDs.
   */
  issueSecuritySchemeId: z.number(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
  /**
   * The list of issue security level IDs. To include multiple issue security levels separate IDs with ampersand:
   * `issueSecurityLevelId=10000&issueSecurityLevelId=10001`.
   */
  issueSecurityLevelId: z.array(z.string()).optional(),
  /**
   * Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand
   * options include:
   *
   * - `all` Returns all expandable information.
   * - `field` Returns information about the custom field granted the permission.
   * - `group` Returns information about the group that is granted the permission.
   * - `projectRole` Returns information about the project role granted the permission.
   * - `user` Returns information about the user who is granted the permission.
   */
  expand: z
    .union([
      z.string(),
      z.array(z.string()),
      z.enum(['all', 'field', 'group', 'projectRole', 'user']),
      z.array(z.enum(['all', 'field', 'group', 'projectRole', 'user'])),
    ])
    .optional(),
});

export type GetIssueSecurityLevelMembers = z.input<typeof GetIssueSecurityLevelMembersSchema>;
