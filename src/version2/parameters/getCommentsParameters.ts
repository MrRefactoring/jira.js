import { z } from 'zod';

export const GetCommentsParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#ordering) the results by a field.
   * Accepts _created_ to sort comments by their created date.
   */
  orderBy: z.enum(['created', '-created', '+created']).optional(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information about comments in the response. This parameter accepts `renderedBody`, which returns the comment body
   * rendered in HTML.
   */
  expand: z.string().optional(),
});

export type GetCommentsParameters = z.infer<typeof GetCommentsParametersSchema>;
