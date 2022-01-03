export interface GetCommentAttachments {
  /** The ID or key of the customer request that contains the comment. */
  issueIdOrKey: string;
  /** The ID of the comment. */
  commentId: number;
  /**
   * The starting index of the returned comments. Base index: 0. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#pagination) section for more details.
   */
  start?: number;
  /**
   * The maximum number of comments to return per page. Default: 50. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#pagination) section for more details.
   */
  limit?: number;
}
