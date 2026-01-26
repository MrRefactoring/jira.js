import type { Comment } from '../models';

export interface AddComment extends Comment {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information about comments in the response. This parameter accepts `renderedBody`, which returns the comment body
   * rendered in HTML.
   */
  expand?: string;
  /** The ID of the comment to which you're replying. */
  parentId?: string;
}
