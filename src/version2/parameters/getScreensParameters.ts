import { z } from 'zod';

export const GetScreensParametersSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
  /**
   * The list of screen IDs. To include multiple IDs, provide an ampersand-separated list. For example,
   * `id=10000&id=10001`.
   */
  id: z.array(z.number().int()).optional(),
  /** String used to perform a case-insensitive partial match with screen name. */
  queryString: z.string().optional(),
  /**
   * The scope filter string. To filter by multiple scope, provide an ampersand-separated list. For example,
   * `scope=GLOBAL&scope=PROJECT`.
   */
  scope: z.array(z.enum(['GLOBAL', 'TEMPLATE', 'PROJECT'])).optional(),
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#ordering) the results by a field:
   *
   * - `id` Sorts by screen ID.
   * - `name` Sorts by screen name.
   */
  orderBy: z.enum(['name', '-name', '+name', 'id', '-id', '+id']).optional(),
});

export type GetScreensParameters = z.infer<typeof GetScreensParametersSchema>;
