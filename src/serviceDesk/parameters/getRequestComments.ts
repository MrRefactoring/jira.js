import { z } from 'zod';

export const GetRequestCommentsSchema = z.object({
  /** The ID or key of the customer request whose comments will be retrieved. */
  issueIdOrKey: z.string(),
  /** Specifies whether to return public comments or not. Default: true. */
  public: z.boolean().optional(),
  /** Specifies whether to return internal comments or not. Default: true. */
  internal: z.boolean().optional(),
  /**
   * A multi-value parameter indicating which properties of the comment to expand:
   *
   * - `attachment` returns the attachment details, if any, for each comment. (If you want to get all attachments for a
   *   request, use
   *   [servicedeskapi/request/{issueIdOrKey}/attachment](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#api-request-issueIdOrKey-attachment-get).)
   * - `renderedBody` (Experimental) returns the rendered body in HTML format (in addition to the raw body) for each
   *   comment.
   */
  expand: z.array(z.string()).optional(),
  /**
   * The starting index of the returned comments. Base index: 0. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#pagination) section for more
   * details.
   */
  start: z.number().optional(),
  /**
   * The maximum number of comments to return per page. Default: 50. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#pagination) section for more
   * details.
   */
  limit: z.number().optional(),
});

export type GetRequestComments = z.input<typeof GetRequestCommentsSchema>;
