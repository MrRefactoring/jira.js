import { CommentCreate } from '../models/index.mjs';

export interface CreateRequestComment extends CommentCreate {
  /** The ID or key of the customer request to which the comment will be added. */
  issueIdOrKey: string;
}
