import { z } from 'zod';

export const GetIssuesForSprintSchema = z.object({
  /** The ID of the sprint that contains the requested issues. */
  sprintId: z.number(),
  /**
   * The starting index of the returned issues. Base index: 0. See the 'Pagination' section at the top of this page for
   * more details.
   */
  startAt: z.number().optional(),
  /**
   * The maximum number of issues to return per page. See the 'Pagination' section at the top of this page for more
   * details. Note, the total number of issues returned is limited by the property 'jira.search.views.default.max' in
   * your Jira instance. If you exceed this limit, your results will be truncated.
   */
  maxResults: z.number().optional(),
  /**
   * Filters results using a JQL query. If you define an order in your JQL query, it will override the default order of
   * the returned issues. Note that `username` and `userkey` can't be used as search terms for this parameter due to
   * privacy reasons. Use `accountId` instead.
   */
  jql: z.string().optional(),
  /** Specifies whether to validate the JQL query or not. Default: true. */
  validateQuery: z.boolean().optional(),
  /** The list of fields to return for each issue. By default, all navigable and Agile fields are returned. */
  fields: z.array(z.record(z.string(), z.any())).optional(),
  /** A comma-separated list of the parameters to expand. */
  expand: z.union([z.string(), z.array(z.string())]).optional(),
});

export type GetIssuesForSprint = z.input<typeof GetIssuesForSprintSchema>;
