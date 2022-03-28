import { Comment } from '../models';

export interface UpdateComment extends Comment {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
  /** The ID of the comment. */
  id: string;
  /** Whether users are notified when a comment is updated. */
  notifyUsers?: boolean;
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#expansion) to include additional
   * information about comments in the response. This parameter accepts `renderedBody`, which returns the comment body
   * rendered in HTML.
   */
  expand?: 'renderedBody' | ['renderedBody'] | string | string[];
}
