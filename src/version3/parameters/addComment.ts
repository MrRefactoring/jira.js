import type { Comment, Document } from '../models';

export interface AddComment extends Omit<Comment, 'body'> {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#expansion) to include additional
   * information about comments in the response. This parameter accepts `renderedBody`, which returns the comment body
   * rendered in HTML.
   */
  expand?: string;
  /**
   * The comment text in [Atlassian Document
   * Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/).
   */
  comment?: string | Document;
  /** The ID of the comment to which you're replying. */
  parentId?: string;
}
