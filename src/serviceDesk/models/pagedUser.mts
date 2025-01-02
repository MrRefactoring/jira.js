import { PagedLink } from './pagedLink.mjs';
import { User } from './user.mjs';

export interface PagedUser {
  /** Number of items returned in the page. */
  size?: number;
  /** Index of the first item returned in the page. */
  start?: number;
  /** Number of items to be returned per page, up to the maximum set for these objects in the current implementation. */
  limit?: number;
  /** Indicates if this is the last page of records (true) or not (false). */
  isLastPage?: boolean;
  /** Details of the items included in the page. */
  values?: User[];
  Expands?: string[];
  Links?: PagedLink;
}
