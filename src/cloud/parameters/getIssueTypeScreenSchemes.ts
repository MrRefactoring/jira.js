import { z } from 'zod';

export const GetIssueTypeScreenSchemesSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
  /**
   * The list of issue type screen scheme IDs. To include multiple IDs, provide an ampersand-separated list. For
   * example, `id=10000&id=10001`.
   */
  id: z.array(z.number()).optional(),
  /** String used to perform a case-insensitive partial match with issue type screen scheme name. */
  queryString: z.string().optional(),
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#ordering) the results by a field:
   *
   * - `name` Sorts by issue type screen scheme name.
   * - `id` Sorts by issue type screen scheme ID.
   */
  orderBy: z.enum(['name', '-name', '+name', 'id', '-id', '+id']).optional(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#expansion) to include additional
   * information in the response. This parameter accepts `projects` that, for each issue type screen schemes, returns
   * information about the projects the issue type screen scheme is assigned to.
   */
  expand: z.union([z.string(), z.array(z.string()), z.enum(['projects']), z.array(z.enum(['projects']))]).optional(),
});

export type GetIssueTypeScreenSchemes = z.input<typeof GetIssueTypeScreenSchemesSchema>;
