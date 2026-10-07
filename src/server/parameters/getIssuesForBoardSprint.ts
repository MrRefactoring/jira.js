import { z } from 'zod';

export const GetIssuesForBoardSprintSchema = z.object({
  /** The Id of the sprint that contains requested issues. */
  sprintId: z.number(),
  /** A comma-separated list of the parameters to expand. */
  expand: z.union([z.string(), z.array(z.string())]).optional(),
  /**
   * Filters results using a JQL query. If you define an order in your JQL query, it will override the default order of
   * the returned issues.
   */
  jql: z.string().optional(),
  /** The maximum number of sprints to return per page. Default: 50. */
  maxResults: z.number().optional(),
  /** Specifies whether to validate the JQL query or not. Default: true. */
  validateQuery: z.boolean().optional(),
  /** The Id of the board that contains requested issues. */
  boardId: z.number(),
  /** The list of fields to return for each issue. By default, all navigable and Agile fields are returned. */
  fields: z.union([z.string(), z.array(z.string())]).optional(),
  /**
   * The starting index of the returned issues. Base index: 0. See the 'Pagination' section at the top of this page for
   * more details.
   */
  startAt: z.number().optional(),
});

export type GetIssuesForBoardSprint = z.input<typeof GetIssuesForBoardSprintSchema>;
