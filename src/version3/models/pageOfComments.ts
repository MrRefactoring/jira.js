import type { Comment } from './comment.js';

/** A page of comments. */
export interface PageOfComments {
  /** The index of the first item returned. */
  startAt?: number;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of comments. */
  comments?: Comment[];
}
