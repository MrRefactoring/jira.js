import { z } from 'zod';

export const GetRequestCommentByIdSchema = z.object({
  /** The ID or key of the customer request that contains the comment. */
  issueIdOrKey: z.string(),
  /** The ID of the comment to retrieve. */
  commentId: z.number(),
  /**
   * A multi-value parameter indicating which properties of the comment to expand:
   *
   * - `attachment` returns the attachment details, if any, for the comment. (If you want to get all attachments for a
   *   request, use
   *   [servicedeskapi/request/{issueIdOrKey}/attachment](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#api-request-issueIdOrKey-attachment-get).)
   * - `renderedBody` (Experimental) returns the rendered body in HTML format (in addition to the raw body) of the
   *   comment.
   */
  expand: z.array(z.string()).optional(),
});

export type GetRequestCommentById = z.input<typeof GetRequestCommentByIdSchema>;
