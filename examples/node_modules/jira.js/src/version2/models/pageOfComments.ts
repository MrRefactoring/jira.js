import type { Comment } from './comment';

/** A page of comments. */
export interface PageOfComments {
  /** The list of comments. */
  comments?: Comment[];
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
}
