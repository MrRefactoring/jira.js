import { z } from 'zod';

export const GetScreenSchemesSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
  /**
   * The list of screen scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example,
   * `id=10000&id=10001`.
   */
  id: z.array(z.number()).optional(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#expansion) include additional
   * information in the response. This parameter accepts `issueTypeScreenSchemes` that, for each screen schemes, returns
   * information about the issue type screen scheme the screen scheme is assigned to.
   */
  expand: z
    .union([
      z.string(),
      z.array(z.string()),
      z.enum(['issueTypeScreenSchemes']),
      z.array(z.enum(['issueTypeScreenSchemes'])),
    ])
    .optional(),
  /** String used to perform a case-insensitive partial match with screen scheme name. */
  queryString: z.string().optional(),
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#ordering) the results by a field:
   *
   * - `id` Sorts by screen scheme ID.
   * - `name` Sorts by screen scheme name.
   */
  orderBy: z.enum(['name', '-name', '+name', 'id', '-id', '+id']).optional(),
});

export type GetScreenSchemes = z.input<typeof GetScreenSchemesSchema>;
