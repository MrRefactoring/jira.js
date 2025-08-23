import { z } from 'zod';

export const GetCommentsByIdsParametersSchema = z.object({
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information about comments in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   * - `renderedBody` Returns the comment body rendered in HTML.
   * - `properties` Returns the comment's properties.
   */
  expand: z.string().optional(),
  /** The list of comment IDs. A maximum of 1000 IDs can be specified. */
  ids: z.array(z.number().int()),
});

export type GetCommentsByIdsParameters = z.infer<typeof GetCommentsByIdsParametersSchema>;
