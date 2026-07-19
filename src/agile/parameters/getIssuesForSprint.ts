import { z } from 'zod';

export const GetIssuesForSprintSchema = z.object({
  /** The ID of the sprint that contains the requested issues. */
  sprintId: z.number(),
  /**
   * The token for a page to fetch that is not the first page. The first page has a `nextPageToken` of `null`. Use the
   * `nextPageToken` to fetch the next page of issues.
   *
   * Note: The `nextPageToken` field is **not included** in the response for the last page, indicating there is no
   * next page.
   */
  nextPageToken: z.string().optional(),
  /**
   * The maximum number of items to return per page. To manage page size, the API may return fewer items per page
   * where there is a large number of fields or properties returned. It returns max 5000 issues.
   */
  maxResults: z.number().optional(),
  /**
   * Strong consistency issue IDs to be reconciled with search results. Accepts max 50 IDs. This list of IDs should be
   * consistent with each paginated request across different pages.
   */
  reconcileIssues: z.array(z.number()).optional(),
  /**
   * Filters results using a JQL query. If you define an order in your JQL query, it will override the default order
   * of the returned issues. Note that `username` and `userkey` can't be used as search terms for this parameter due
   * to privacy reasons. Use `accountId` instead.
   */
  jql: z.string().optional(),
  /** Specifies whether to validate the JQL query or not. Default: true. */
  validateQuery: z.boolean().optional(),
  /** The list of fields to return for each issue. By default, all navigable and Software project fields are returned. */
  fields: z.array(z.record(z.string(), z.any())).optional(),
  /** A comma-separated list of the parameters to expand. */
  expand: z.union([z.string(), z.array(z.string())]).optional(),
});

export type GetIssuesForSprint = z.input<typeof GetIssuesForSprintSchema>;
