import { Comment } from '../models';

export interface AddComment extends Comment {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
  /** Use [expand](#expansion) to include additional information about comments in the response. This parameter accepts `renderedBody`, which returns the comment body rendered in HTML. */
  expand?: string;
}
