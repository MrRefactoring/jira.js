export interface GetRequestCommentById {
  /** The ID or key of the customer request that contains the comment. */
  issueIdOrKey: string;
  /** The ID of the comment to retrieve. */
  commentId: number;
  /**
   * A multi-value parameter indicating which properties of the comment to expand:
   *
   * - `attachment` returns the attachment details, if any, for the comment. (If you want to get all attachments for a
   *   request, use [servicedeskapi/request/{issueIdOrKey}/attachment](#api-request-issueIdOrKey-attachment-get).)
   * - `renderedBody` (Experimental) returns the rendered body in HTML format (in addition to the raw body) of the
   *   comment.
   */
  expand?: 'attachment' | 'renderedBody' | ('attachment' | 'renderedBody')[] | string | string[];
}
