import { z } from 'zod';

export const GetIssuesForBoardEpicSchema = z.object({
  /** A comma-separated list of the parameters to expand. */
  expand: z.union([z.string(), z.array(z.string())]).optional(),
  /**
   * Filters results using a JQL query. If you define an order in your JQL query, it will override the default order of
   * the returned issues.
   */
  jql: z.string().optional(),
  /** The Id of the epic that contains the requested issues. */
  epicId: z.number(),
  /**
   * The maximum number of issues to return per page. Default: 50. See the 'Pagination' section at the top of this page
   * for more details. Note, the total number of issues returned is limited by the property
   * 'jira.search.views.default.max' in your JIRA instance. If you exceed this limit, your results will be truncated.
   */
  maxResults: z.number().optional(),
  /** Specifies whether to validate the JQL query or not. Default: true. */
  validateQuery: z.boolean().optional(),
  /** The Id of the board that contains the requested issues. */
  boardId: z.number(),
  /** The list of fields to return for each issue. By default, all navigable and Agile fields are returned. */
  fields: z.union([z.string(), z.array(z.string())]).optional(),
  /**
   * The starting index of the returned issues. Base index: 0. See the 'Pagination' section at the top of this page for
   * more details.
   */
  startAt: z.number().optional(),
});

export type GetIssuesForBoardEpic = z.input<typeof GetIssuesForBoardEpicSchema>;
