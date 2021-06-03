import { UserDetails } from './userDetails';

/**
 * A paged list. To access additional details append `[start-index:end-index]` to the expand request. For example,
 * `?expand=sharedUsers[10:40]` returns a list starting at item 10 and finishing at item 40.
 */
export interface PagedListUserDetailsApplicationUser {
  /** The number of items on the page. */
  size?: number;
  /** The list of items. */
  items?: UserDetails[];
  /** The maximum number of results that could be on the page. */
  'max-results'?: number;
  /** The index of the first item returned on the page. */
  'start-index'?: number;
  /** The index of the last item returned on the page. */
  'end-index'?: number;
}
