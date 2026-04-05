import { z } from 'zod';

export const GetCommentsSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#ordering) the results by a field. Accepts
   * _created_ to sort comments by their created date.
   */
  orderBy: z.enum(['created', '-created', '+created']).optional(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#expansion) to include additional
   * information about comments in the response. This parameter accepts `renderedBody`, which returns the comment body
   * rendered in HTML.
   */
  expand: z
    .union([z.string(), z.array(z.string()), z.enum(['renderedBody']), z.array(z.enum(['renderedBody']))])
    .optional(),
});

export type GetComments = z.input<typeof GetCommentsSchema>;
