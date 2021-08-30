import { IssueCommentListRequest } from '../models';

export interface GetCommentsByIds extends IssueCommentListRequest {
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information about comments in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   * `renderedBody` Returns the comment body rendered in HTML. `properties` Returns the comment's properties.
   */
  expand?: string;
}
