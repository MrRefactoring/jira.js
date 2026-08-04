import { z } from 'zod';

export const GetAllIssueTypeSchemesSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
  /**
   * The list of issue type schemes IDs. To include multiple IDs, provide an ampersand-separated list. For example,
   * `id=10000&id=10001`.
   */
  id: z.array(z.number()).optional(),
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#ordering) the results by a field:
   *
   * - `name` Sorts by issue type scheme name.
   * - `id` Sorts by issue type scheme ID.
   */
  orderBy: z.enum(['name', '-name', '+name', 'id', '-id', '+id']).optional(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#expansion) to include additional
   * information in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   * - `projects` For each issue type schemes, returns information about the projects the issue type scheme is assigned
   *   to.
   * - `issueTypes` For each issue type schemes, returns information about the issueTypes the issue type scheme have.
   */
  expand: z
    .union([
      z.string(),
      z.array(z.string()),
      z.enum(['projects', 'issueTypes']),
      z.array(z.enum(['projects', 'issueTypes'])),
    ])
    .optional(),
  /** String used to perform a case-insensitive partial match with issue type scheme name. */
  queryString: z.string().optional(),
});

export type GetAllIssueTypeSchemes = z.input<typeof GetAllIssueTypeSchemesSchema>;
